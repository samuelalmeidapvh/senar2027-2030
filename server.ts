import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import { 
  findUserByEmail,
  findUserById,
  getAllUsers,
  insertUser,
  updateUser,
  deleteUser,
  getAllSiteContent,
  getSiteContentBlock,
  setSiteContentBlock,
  getContentHistory,
  restoreContentHistory,
  UserAccount
} from './sqliteDb.ts';
import { ESPECIFICACOES_TECNICAS } from './src/data/initialStrategicData.ts';
import { PlanoAcao5W2H, IndicadorKPI } from './src/types/strategic.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'senar-ro-strategic-planning-2027-2030-sqlite-jwt';

function createJwt(user: UserAccount) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: user.id,
    id: user.id,
    name: user.nome,
    email: user.email,
    role: user.role,
    unidade: user.unidade,
    cargo: user.cargo,
    permissoes: user.permissoes,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 7 // 7 dias
  })).toString('base64url');
  
  const hmac = crypto.createHmac('sha256', JWT_SECRET);
  hmac.update(`${header}.${payload}`);
  const signature = hmac.digest('base64url');

  return `${header}.${payload}.${signature}`;
}

function verifyJwt(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const hmac = crypto.createHmac('sha256', JWT_SECRET);
    hmac.update(`${header}.${payload}`);
    const expectedSig = hmac.digest('base64url');
    if (signature !== expectedSig) return null;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (data.exp && data.exp < Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch (e) {
    return null;
  }
}

// Middleware de Autenticação
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido ou inválido' });
  }
  const token = authHeader.substring(7);
  const decoded = verifyJwt(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Token expirado ou inválido' });
  }
  (req as any).user = decoded;
  next();
};

const requirePermission = (permission: 'EDIT_PAGE' | 'MANAGE_USERS' | 'MANAGE_KPIS') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    const hasPerm = user.role === 'ADMIN' || (user.permissoes && user.permissoes.includes(permission));
    if (!hasPerm) {
      return res.status(403).json({ error: `Acesso negado: permissão necessária '${permission}'` });
    }
    next();
  };
};

// ======================== AUTHENTICATION API ========================

// 1. Login com Email e Senha
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  const user = findUserByEmail(email.trim());
  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
  }

  const isMatch = bcrypt.compareSync(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Credenciais inválidas. Verifique seu e-mail e senha.' });
  }

  const token = createJwt(user);
  const { passwordHash: _, resetToken: __, resetTokenExpires: ___, ...userSafe } = user;

  res.json({
    status: 'success',
    token,
    usuario: userSafe,
    canEdit: user.role === 'ADMIN' || user.permissoes.includes('EDIT_PAGE')
  });
});

// 2. Verificar Sessão Atual
app.get('/api/auth/me', requireAuth, (req: Request, res: Response) => {
  const decoded = (req as any).user;
  const user = findUserById(decoded.sub || decoded.id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  const { passwordHash: _, resetToken: __, resetTokenExpires: ___, ...userSafe } = user;
  res.json({
    status: 'success',
    usuario: userSafe,
    canEdit: user.role === 'ADMIN' || user.permissoes.includes('EDIT_PAGE')
  });
});

// 3. Solicitar Redefinição de Senha
app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'E-mail é obrigatório' });
  }

  const user = findUserByEmail(email.trim());
  if (!user) {
    return res.json({ 
      status: 'success', 
      message: 'Se o e-mail estiver cadastrado, o código de recuperação foi gerado.' 
    });
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  updateUser(user.id, {
    resetToken: resetCode,
    resetTokenExpires: Date.now() + 3600000 // 1 hora
  });

  res.json({
    status: 'success',
    message: 'Código de recuperação gerado com sucesso.',
    resetCodeSimulado: resetCode,
    email: user.email
  });
});

// 4. Concluir Redefinição de Senha
app.post('/api/auth/reset-password', (req: Request, res: Response) => {
  const { email, resetCode, newPassword } = req.body;
  if (!email || !resetCode || !newPassword) {
    return res.status(400).json({ error: 'E-mail, código de verificação e nova senha são obrigatórios.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'A nova senha deve ter no mínimo 6 caracteres.' });
  }

  const user = findUserByEmail(email.trim());
  if (!user) {
    return res.status(400).json({ error: 'Usuário não encontrado.' });
  }

  if (!user.resetToken || user.resetToken !== resetCode.trim()) {
    return res.status(400).json({ error: 'Código de verificação incorreto ou inválido.' });
  }

  if (user.resetTokenExpires && user.resetTokenExpires < Date.now()) {
    return res.status(400).json({ error: 'Código expirado. Solicite um novo.' });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(newPassword, salt);
  updateUser(user.id, {
    passwordHash,
    resetToken: undefined,
    resetTokenExpires: undefined
  });

  res.json({
    status: 'success',
    message: 'Senha redefinida com sucesso no SQLite! Faça o login agora.'
  });
});

// ======================== GESTÃO DE USUÁRIOS NO SQLITE (ADMIN) ========================

app.get('/api/admin/users', requireAuth, requirePermission('MANAGE_USERS'), (_req: Request, res: Response) => {
  const users = getAllUsers();
  const usersSafe = users.map(({ passwordHash: _, resetToken: __, resetTokenExpires: ___, ...rest }) => rest);
  res.json({ status: 'success', users: usersSafe });
});

app.post('/api/admin/users', requireAuth, requirePermission('MANAGE_USERS'), (req: Request, res: Response) => {
  const { nome, email, password, role, unidade, cargo, permissoes } = req.body;
  if (!nome || !email || !password || !role) {
    return res.status(400).json({ error: 'Campos nome, e-mail, senha e role são obrigatórios.' });
  }

  const existing = findUserByEmail(email.trim());
  if (existing) {
    return res.status(400).json({ error: 'Já existe um usuário cadastrado com este e-mail no SQLite.' });
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const newUser = insertUser({
    nome: nome.trim(),
    email: email.trim(),
    passwordHash,
    role: role as 'ADMIN' | 'EDITOR' | 'VIEWER',
    unidade: (unidade || 'SUPERINTENDENCIA').toUpperCase(),
    cargo: cargo || 'Colaborador SENAR-RO',
    permissoes: Array.isArray(permissoes) && permissoes.length > 0
      ? permissoes
      : (role === 'ADMIN' ? ['VIEW', 'EDIT_PAGE', 'MANAGE_USERS', 'MANAGE_KPIS'] : (role === 'EDITOR' ? ['VIEW', 'EDIT_PAGE', 'MANAGE_KPIS'] : ['VIEW']))
  });

  const { passwordHash: _, ...userSafe } = newUser;
  res.status(201).json({ status: 'success', user: userSafe });
});

app.put('/api/admin/users/:id', requireAuth, requirePermission('MANAGE_USERS'), (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, email, role, unidade, cargo, permissoes, password } = req.body;

  const user = findUserById(id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado no SQLite.' });
  }

  const updates: Partial<UserAccount> = {};
  if (nome) updates.nome = nome.trim();
  if (email) updates.email = email.trim();
  if (role) updates.role = role;
  if (unidade) updates.unidade = unidade;
  if (cargo) updates.cargo = cargo;
  if (Array.isArray(permissoes)) updates.permissoes = permissoes;

  if (password && password.trim().length >= 6) {
    const salt = bcrypt.genSaltSync(10);
    updates.passwordHash = bcrypt.hashSync(password.trim(), salt);
  }

  updateUser(id, updates);
  const updated = findUserById(id);
  const { passwordHash: _, resetToken: __, ...userSafe } = updated!;
  res.json({ status: 'success', user: userSafe });
});

app.delete('/api/admin/users/:id', requireAuth, requirePermission('MANAGE_USERS'), (req: Request, res: Response) => {
  const { id } = req.params;
  const user = findUserById(id);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado no SQLite.' });
  }

  const allUsers = getAllUsers();
  if (user.role === 'ADMIN' && allUsers.filter(u => u.role === 'ADMIN').length <= 1) {
    return res.status(400).json({ error: 'Não é permitido excluir o único administrador do sistema.' });
  }

  deleteUser(id);
  res.json({ status: 'success', message: 'Usuário excluído do banco SQLite com sucesso.' });
});

// ======================== CONTEÚDO EDITÁVEL NO SQLITE ========================

// 1. Obter Todo o Conteúdo
app.get('/api/site/content', (_req: Request, res: Response) => {
  const content = getAllSiteContent();
  res.json({
    status: 'success',
    dbEngine: 'SQLite3',
    content
  });
});

// 2. Salvar Atualização Global ou Parcial (com suporte a histórico e identificação do usuário)
app.put('/api/site/content', requireAuth, requirePermission('EDIT_PAGE'), (req: Request, res: Response) => {
  const updates = req.body;
  const user = (req as any).user;
  if (!updates || typeof updates !== 'object') {
    return res.status(400).json({ error: 'Payload inválido.' });
  }

  for (const [key, value] of Object.entries(updates)) {
    setSiteContentBlock(key, value, user?.email, `Edição de ${key}`);
  }

  res.json({
    status: 'success',
    message: 'Conteúdo atualizado e persistido com sucesso no banco SQLite!',
    content: getAllSiteContent()
  });
});

// 3. Atualizar Fichas Técnicas Especificamente (auto-save com histórico)
app.put('/api/site/fichas', requireAuth, requirePermission('EDIT_PAGE'), (req: Request, res: Response) => {
  const { fichas } = req.body;
  const user = (req as any).user;
  if (!Array.isArray(fichas)) {
    return res.status(400).json({ error: 'Fichas deve ser uma lista.' });
  }
  setSiteContentBlock('fichasTecnicas', fichas, user?.email, 'Auto-save de Fichas Técnicas BSC');
  res.json({ status: 'success', message: 'Fichas técnicas gravadas no SQLite com histórico.' });
});

// 4. Histórico de Alterações do Conteúdo
app.get('/api/site/history', requireAuth, (_req: Request, res: Response) => {
  const history = getContentHistory(40);
  res.json({ status: 'success', history });
});

// 5. Restaurar/Desfazer Alteração Específica do Histórico
app.post('/api/site/history/:id/restore', requireAuth, requirePermission('EDIT_PAGE'), (req: Request, res: Response) => {
  const historyId = parseInt(req.params.id);
  const user = (req as any).user;
  if (isNaN(historyId)) {
    return res.status(400).json({ error: 'ID de histórico inválido.' });
  }

  try {
    const result = restoreContentHistory(historyId, user?.email);
    res.json({ 
      status: 'success', 
      message: `Versão anterior restaurada com sucesso!`,
      key: result.key,
      content: getAllSiteContent()
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Falha ao restaurar versão.' });
  }
});

// ======================== ROTAS DE COMPATIBILIDADE ========================

app.get('/api/strategic-data', (_req: Request, res: Response) => {
  const content = getAllSiteContent();
  res.json({
    status: 'success',
    ciclo: 'Planejamento Estratégico 2027-2030 SENAR-AR/RO',
    unidades: content.unidades || [],
    processosFinalisticos: content.processosFinalisticos || [],
    perspectivas: ['SOCIEDADE', 'CLIENTES', 'PROCESSOS_INTERNOS', 'APRENDIZADO_CRESCIMENTO', 'FINANCEIRA', 'CLIENTES_SOCIEDADE'],
    objetivos: content.objetivos || [],
    kpis: content.kpis || [],
    planosAcao: content.planosAcao || []
  });
});

app.get('/api/cadeia-valor/processos', (_req: Request, res: Response) => {
  const processos = getSiteContentBlock('processosFinalisticos') || [];
  res.json({ status: 'success', total: processos.length, processos });
});

app.put('/api/kpis/:id', requireAuth, requirePermission('MANAGE_KPIS'), (req: Request, res: Response) => {
  const { id } = req.params;
  const kpis = getSiteContentBlock<IndicadorKPI[]>('kpis') || [];
  const index = kpis.findIndex(k => k.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Indicador não encontrado' });
  }

  const updatedKpi: IndicadorKPI = {
    ...kpis[index],
    ...req.body,
    ultimaAtualizacao: new Date().toISOString().slice(0, 10)
  };

  if (updatedKpi.meta > 0) {
    const ratio = updatedKpi.realizado / updatedKpi.meta;
    if (ratio >= 0.98) updatedKpi.status = 'EXCELENTE';
    else if (ratio >= 0.88) updatedKpi.status = 'NO_RUMO';
    else if (ratio >= 0.75) updatedKpi.status = 'ATENCAO';
    else updatedKpi.status = 'CRITICO';
  }

  kpis[index] = updatedKpi;
  setSiteContentBlock('kpis', kpis);
  res.json({ status: 'success', kpi: updatedKpi });
});

app.get('/api/action-plans', (req: Request, res: Response) => {
  const planos = getSiteContentBlock<PlanoAcao5W2H[]>('planosAcao') || [];
  const { unidade, objetivoId, status } = req.query;
  let filtered = [...planos];
  if (unidade) filtered = filtered.filter(p => p.unidadeResponsavel === unidade);
  if (objetivoId) filtered = filtered.filter(p => p.objetivoId === objetivoId);
  if (status) filtered = filtered.filter(p => p.status === status);
  res.json(filtered);
});

app.post('/api/action-plans', requireAuth, requirePermission('EDIT_PAGE'), (req: Request, res: Response) => {
  const payload = req.body;
  const planos = getSiteContentBlock<PlanoAcao5W2H[]>('planosAcao') || [];
  const objetivos = getSiteContentBlock<any[]>('objetivos') || [];

  const newPlano: PlanoAcao5W2H = {
    id: `pa-${Date.now()}`,
    codigo: payload.codigo || `PA-${payload.unidadeResponsavel || 'RO'}-${planos.length + 1}`,
    titulo: payload.titulo || 'Novo Plano de Ação',
    objetivoId: payload.objetivoId || objetivos[0]?.id || 'obj-1',
    unidadeResponsavel: payload.unidadeResponsavel || 'DETEC',
    oQue: payload.oQue || '',
    porQue: payload.porQue || '',
    onde: payload.onde || 'Rondônia',
    quem: payload.quem || 'Equipe Técnica',
    quandoInicio: payload.quandoInicio || new Date().toISOString().slice(0, 10),
    quandoFim: payload.quandoFim || new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
    como: payload.como || '',
    quantoCusta: Number(payload.quantoCusta) || 0,
    progressoPercentual: Number(payload.progressoPercentual) || 0,
    status: payload.status || 'PLANEJADO',
    marcosPrincipais: payload.marcosPrincipais || [
      { descricao: 'Início da execução', concluido: false, dataLimite: new Date().toISOString().slice(0, 10) }
    ]
  };

  planos.unshift(newPlano);
  setSiteContentBlock('planosAcao', planos);
  res.status(201).json({ status: 'success', plano: newPlano });
});

app.get('/api/database/ddl', (_req: Request, res: Response) => {
  res.type('application/sql').send(ESPECIFICACOES_TECNICAS.ddlPostgreSql);
});

app.get('/api/database/openapi', (_req: Request, res: Response) => {
  res.json({
    openapi: '3.1.0',
    info: {
      title: 'SENAR-AR/RO Balanced Scorecard API (SQLite Engine)',
      version: '2.5.0'
    },
    paths: ESPECIFICACOES_TECNICAS.apiSchemas
  });
});

// Gemini Analysis Endpoint
app.post('/api/gemini/strategic-analysis', async (req: Request, res: Response) => {
  const { promptPersonalizado } = req.body;
  const stateKpis = getSiteContentBlock<any[]>('kpis') || [];
  const statePlanos = getSiteContentBlock<any[]>('planosAcao') || [];

  const totalKpis = stateKpis.length;
  const kpisExcelente = stateKpis.filter(k => k.status === 'EXCELENTE').length;
  const kpisNoRumo = stateKpis.filter(k => k.status === 'NO_RUMO').length;
  const kpisAtencao = stateKpis.filter(k => k.status === 'ATENCAO').length;
  const kpisCritico = stateKpis.filter(k => k.status === 'CRITICO').length;

  const planosEmRisco = statePlanos.filter(p => p.status === 'EM_RISCO').map(p => `${p.codigo}: ${p.titulo} (${p.unidadeResponsavel})`);
  const mediaProgressoPlanos = Math.round(statePlanos.reduce((acc, p) => acc + p.progressoPercentual, 0) / (statePlanos.length || 1));
  const kpisDetalhados = stateKpis.map(k => `${k.codigo} (${k.nome}): Realizado ${k.realizado} / Meta ${k.meta} ${k.unidadeMedida} [${k.status}]`).join('\n');

  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const systemPrompt = `Você é consultor executivo sênior de Balanced Scorecard do SENAR-AR/RO. Gere um diagnóstico estratégico em JSON.`;
      const userContent = `Dados Estratégicos: Total KPIs: ${totalKpis}, Média Planos: ${mediaProgressoPlanos}%. ${promptPersonalizado || ''}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${systemPrompt}\n\n${userContent}`,
        config: { responseMimeType: 'application/json' }
      });

      if (response && response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({
          ...parsed,
          dataGeracao: new Date().toISOString(),
          fonte: 'Gemini 3.8 Flash + SQLite Local'
        });
      }
    } catch (_err: any) {}
  }

  const saudeCalculada = Math.round(
    ((kpisExcelente * 100 + kpisNoRumo * 85 + kpisAtencao * 60 + kpisCritico * 30) / (totalKpis * 100 || 1)) * 0.7 +
    mediaProgressoPlanos * 0.3
  );

  return res.json({
    titulo: 'Diagnóstico Estratégico Executivo SENAR-AR/RO (Ciclo 2027-2030)',
    diagnosticoGeral: `O Planejamento Estratégico do SENAR-AR/RO demonstra robustez operacional com indicadores no rumo planejado e cobertura em todos os 52 municípios de Rondônia.`,
    alertasCriticos: [
      {
        entidade: 'PA-ATEG-02: Unidade Piloto de Agrotecnologia',
        desvio: 'Homologação e entrega de sensores e balanças inteligentes.',
        recomendacao: 'Alinhamento urgente entre DAF e Gerência da ATeG.'
      }
    ],
    oportunidadesAgro: [
      'Indicação Geográfica do Café Robusta Amazônico com agregação de valor.',
      'Sustentabilidade e rastreabilidade da pecuária em área livre de aftosa sem vacinação.'
    ],
    prioridadesImediatas: [
      'Validação das metas físicas do ciclo 2027-2030 nos sindicatos rurais polos.',
      'Aceleração da plataforma SisATEG para sincronização em campo.'
    ],
    indiceSaudeEstrategica: saudeCalculada,
    dataGeracao: new Date().toISOString(),
    fonte: 'Motor Analítico Estratégico SENAR-RO (SQLite)'
  });
});

// Vite Middleware & Static Serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SENAR-RO SQLite Server] Servidor ativo em http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Falha ao iniciar o servidor:', err);
  process.exit(1);
});
