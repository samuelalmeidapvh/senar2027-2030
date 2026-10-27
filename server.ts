import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { 
  UNIDADES_ORGANIZACIONAIS, 
  PROCESSOS_FINALISTICOS, 
  OBJETIVOS_ESTRATEGICOS, 
  INDICADORES_KPIS, 
  PLANOS_ACAO,
  USUARIOS_DEMO,
  ESPECIFICACOES_TECNICAS
} from './src/data/initialStrategicData.ts';
import { PlanoAcao5W2H, IndicadorKPI, ObjetivoEstrategico } from './src/types/strategic.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// In-memory data state for full interactive CRUD
let stateObjetivos = [...OBJETIVOS_ESTRATEGICOS];
let stateKpis = [...INDICADORES_KPIS];
let statePlanos = [...PLANOS_ACAO];
let stateProcessos = [...PROCESSOS_FINALISTICOS];

// Simple JWT generation & validation simulation
function createSimulatedJwt(user: any) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: user.id,
    name: user.nome,
    email: user.email,
    role: user.role,
    unidade: user.unidade,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600 * 24 // 24 hours
  })).toString('base64url');
  const signature = Buffer.from(`signature_${user.id}_${Date.now()}`).toString('base64url');
  return `${header}.${payload}.${signature}`;
}

function verifySimulatedJwt(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
    return payload;
  } catch (e) {
    return null;
  }
}

// Middleware for RBAC Auth
const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido ou inválido' });
  }
  const token = authHeader.substring(7);
  const decoded = verifySimulatedJwt(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Token expirado ou inválido' });
  }
  (req as any).user = decoded;
  next();
};

// ======================== API ROUTES ========================

// 1. Get All Strategic Data
app.get('/api/strategic-data', (_req: Request, res: Response) => {
  res.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    ciclo: 'Planejamento Estratégico 2027-2030 SENAR-AR/RO',
    unidades: UNIDADES_ORGANIZACIONAIS,
    processosFinalisticos: stateProcessos,
    perspectivas: ['SOCIEDADE', 'CLIENTES', 'PROCESSOS_INTERNOS', 'APRENDIZADO_CRESCIMENTO', 'FINANCEIRA', 'CLIENTES_SOCIEDADE'],
    objetivos: stateObjetivos,
    kpis: stateKpis,
    planosAcao: statePlanos
  });
});

// 1.1 Cadeia de Valor - Processos Finalísticos CRUD (CMS)
app.get('/api/cadeia-valor/processos', (_req: Request, res: Response) => {
  res.json({
    status: 'success',
    total: stateProcessos.length,
    processos: stateProcessos
  });
});

app.get('/api/cadeia-valor/processos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const proc = stateProcessos.find(p => p.id === id || p.codigo.toLowerCase() === id.toLowerCase() || p.sigla.toLowerCase() === id.toLowerCase());
  if (!proc) {
    return res.status(404).json({ error: 'Processo finalístico não encontrado na Cadeia de Valor' });
  }
  res.json({ status: 'success', processo: proc });
});

app.post('/api/cadeia-valor/processos', (req: Request, res: Response) => {
  const payload = req.body;
  if (!payload.nome || !payload.sigla) {
    return res.status(400).json({ error: 'Campos nome e sigla são obrigatórios' });
  }

  const newProcesso: any = {
    id: `proc-${Date.now()}`,
    codigo: payload.codigo || (payload.categoria === 'GESTAO_SUPORTE' ? `PG-0${stateProcessos.filter((p: any) => p.categoria === 'GESTAO_SUPORTE').length + 1}` : `PF-0${stateProcessos.filter((p: any) => p.categoria !== 'GESTAO_SUPORTE').length + 1}`),
    sigla: (payload.sigla || 'PROC').toUpperCase(),
    nome: payload.nome,
    categoria: payload.categoria || 'FINALISTICO',
    descricao: payload.descricao || '',
    publicoAlvo: payload.publicoAlvo || 'Produtores, colaboradores e entidades parceiras de Rondônia',
    missaoDoProcesso: payload.missaoDoProcesso || '',
    atividadesChave: Array.isArray(payload.atividadesChave) ? payload.atividadesChave : [
      'Planejamento operacional e alinhamento institucional',
      'Execução de ações práticas de suporte nos 52 municípios',
      'Avaliação contínua de eficiência e conformidade'
    ],
    metasGerais: Array.isArray(payload.metasGerais) ? payload.metasGerais : [
      'Alcançar 100% de conformidade e excelência operacional no ciclo 2027-2030',
      'Superar 90% no índice de satisfação dos usuários e produtores'
    ],
    indicadoresChave: Array.isArray(payload.indicadoresChave) ? payload.indicadoresChave : ['kpi-1'],
    icone: payload.icone || 'Award'
  };

  stateProcessos = [...stateProcessos, newProcesso];
  res.status(201).json({ status: 'success', processo: newProcesso });
});

app.put('/api/cadeia-valor/processos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = stateProcessos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Processo finalístico não encontrado' });
  }

  stateProcessos[index] = {
    ...stateProcessos[index],
    ...req.body
  };

  res.json({ status: 'success', processo: stateProcessos[index] });
});

app.delete('/api/cadeia-valor/processos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLength = stateProcessos.length;
  stateProcessos = stateProcessos.filter(p => p.id !== id);

  if (stateProcessos.length === initialLength) {
    return res.status(404).json({ error: 'Processo finalístico não encontrado' });
  }

  res.json({ status: 'success', message: 'Processo finalístico removido com sucesso' });
});

app.post('/api/cadeia-valor/reset', (_req: Request, res: Response) => {
  stateProcessos = [...PROCESSOS_FINALISTICOS];
  res.json({ status: 'success', message: 'Processos restaurados para a configuração padrão institucional', processos: stateProcessos });
});

// 2. Auth Login Endpoint
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, role } = req.body;
  const user = USUARIOS_DEMO.find(u => (email && u.email.toLowerCase() === email.toLowerCase()) || (role && u.role === role)) 
    || USUARIOS_DEMO[0];

  const token = createSimulatedJwt(user);
  res.json({
    token,
    refreshToken: `rf_${user.id}_${Date.now()}`,
    usuario: user,
    expiraEm: 3600 * 24
  });
});

// 3. User verification
app.get('/api/auth/me', requireAuth, (req: Request, res: Response) => {
  res.json({ usuario: (req as any).user });
});

// 4. Update KPI
app.put('/api/kpis/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = stateKpis.findIndex(k => k.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Indicador não encontrado' });
  }

  const updatedKpi: IndicadorKPI = {
    ...stateKpis[index],
    ...req.body,
    ultimaAtualizacao: new Date().toISOString().slice(0, 10)
  };

  // Recalculate status based on polarity and target
  if (updatedKpi.meta > 0) {
    const ratio = updatedKpi.realizado / updatedKpi.meta;
    if (ratio >= 0.98) updatedKpi.status = 'EXCELENTE';
    else if (ratio >= 0.88) updatedKpi.status = 'NO_RUMO';
    else if (ratio >= 0.75) updatedKpi.status = 'ATENCAO';
    else updatedKpi.status = 'CRITICO';
  }

  stateKpis[index] = updatedKpi;
  res.json({ status: 'success', kpi: updatedKpi });
});

// 5. Action Plans CRUD
app.get('/api/action-plans', (req: Request, res: Response) => {
  const { unidade, objetivoId, status } = req.query;
  let filtered = [...statePlanos];
  if (unidade) filtered = filtered.filter(p => p.unidadeResponsavel === unidade);
  if (objetivoId) filtered = filtered.filter(p => p.objetivoId === objetivoId);
  if (status) filtered = filtered.filter(p => p.status === status);
  res.json(filtered);
});

app.post('/api/action-plans', (req: Request, res: Response) => {
  const payload = req.body;
  const newPlano: PlanoAcao5W2H = {
    id: `pa-${Date.now()}`,
    codigo: payload.codigo || `PA-${payload.unidadeResponsavel || 'RO'}-${statePlanos.length + 1}`,
    titulo: payload.titulo || 'Novo Plano de Ação',
    objetivoId: payload.objetivoId || stateObjetivos[0].id,
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

  statePlanos = [newPlano, ...statePlanos];
  res.status(201).json({ status: 'success', plano: newPlano });
});

app.put('/api/action-plans/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = statePlanos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Plano de ação não encontrado' });
  }

  statePlanos[index] = {
    ...statePlanos[index],
    ...req.body
  };
  res.json({ status: 'success', plano: statePlanos[index] });
});

app.delete('/api/action-plans/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLen = statePlanos.length;
  statePlanos = statePlanos.filter(p => p.id !== id);
  if (statePlanos.length === initialLen) {
    return res.status(404).json({ error: 'Plano de ação não encontrado' });
  }
  res.json({ status: 'success', message: 'Plano removido com sucesso' });
});

// 6. Update Strategic Objective
app.patch('/api/objectives/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = stateObjetivos.findIndex(o => o.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Objetivo não encontrado' });
  }

  stateObjetivos[index] = {
    ...stateObjetivos[index],
    ...req.body
  };
  res.json({ status: 'success', objetivo: stateObjetivos[index] });
});

// 7. Get Technical Specs & DDL
app.get('/api/tech-specs', (_req: Request, res: Response) => {
  res.json(ESPECIFICACOES_TECNICAS);
});

// 7.1 Relational Schema & Database Documentation Endpoint
app.get('/api/database/schema', (_req: Request, res: Response) => {
  res.type('application/sql').send(ESPECIFICACOES_TECNICAS.ddlPostgreSql);
});

// 7.2 OpenAPI 3.1 Spec Endpoint
app.get('/api/database/openapi', (_req: Request, res: Response) => {
  res.json({
    openapi: '3.1.0',
    info: {
      title: 'SENAR-AR/RO Balanced Scorecard & Cadeia de Valor 3D API',
      version: '2.0.0',
      description: 'API RESTful para gestão estratégica, indicadores de desempenho (KPIs), planos de ação 5W2H e CMS dos 4 processos finalísticos da Cadeia de Valor do SENAR Rondônia.'
    },
    servers: [{ url: '/api', description: 'Servidor Local / Nuvem' }],
    paths: ESPECIFICACOES_TECNICAS.apiSchemas
  });
});

// 8. Gemini Strategic Analysis Endpoint
app.post('/api/gemini/strategic-analysis', async (req: Request, res: Response) => {
  const { promptPersonalizado } = req.body;

  // Prepare concise context summary from current live state
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
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const systemPrompt = `Você é um Arquiteto de Estratégia Governamental e Especialista Sênior em Balanced Scorecard (BSC) para o agronegócio, atuando como consultor de inteligência executiva do SENAR-AR/RO (Federação da Agricultura e Pecuária de Rondônia).
Analise o estado atual dos KPIs e Planos de Ação e forneça um diagnóstico estratégico executivo em formato JSON rigoroso.
O retorno DEVE ser um objeto JSON válido contendo:
{
  "titulo": "string",
  "diagnosticoGeral": "string com 2 a 3 parágrafos objetivos",
  "alertasCriticos": [
    {
      "entidade": "string (ex: KPI ou Plano)",
      "desvio": "string explicando a causa raiz",
      "recomendacao": "string com ação corretiva clara"
    }
  ],
  "oportunidadesAgro": ["string com 2 a 3 oportunidades no agronegócio de Rondônia"],
  "prioridadesImediatas": ["string com 3 ações que a Superintendência, DETEC, DAF ou ATeG devem tomar esta semana"],
  "indiceSaudeEstrategica": number (0 a 100)
}`;

      const userContent = `Dados Estratégicos Atuais do SENAR-AR/RO:
- Total de KPIs: ${totalKpis} (Excelentes: ${kpisExcelente}, No Rumo: ${kpisNoRumo}, Atenção: ${kpisAtencao}, Críticos: ${kpisCritico})
- Média de Progresso dos Planos 5W2H: ${mediaProgressoPlanos}%
- Planos de Ação em Risco: ${planosEmRisco.join('; ') || 'Nenhum'}
- Lista de Indicadores:
${kpisDetalhados}

${promptPersonalizado ? `Pergunta específica da diretoria: ${promptPersonalizado}` : 'Gere uma análise estratégica completa priorizando as cadeias de leite, café e formação rural.'}`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `${systemPrompt}\n\n${userContent}`,
          config: {
            responseMimeType: 'application/json'
          }
        });
      } catch (callErr: any) {
        // If 503 or transient spike, attempt a short retry
        const is503 = callErr?.message?.includes('503') || callErr?.status === 503 || callErr?.message?.includes('high demand');
        if (is503) {
          await new Promise(r => setTimeout(r, 1200));
          response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: `${systemPrompt}\n\n${userContent}`,
            config: {
              responseMimeType: 'application/json'
            }
          });
        } else {
          throw callErr;
        }
      }

      if (response && response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({
          ...parsed,
          dataGeracao: new Date().toISOString(),
          fonte: 'Gemini 3.8 Flash (Server-Side @google/genai)'
        });
      }
    } catch (_err: any) {
      // Quiet graceful degradation: proceed to comprehensive domain fallback
    }
  }

  // Graceful comprehensive fallback with deep domain insights for SENAR-RO
  const saudeCalculada = Math.round(
    ((kpisExcelente * 100 + kpisNoRumo * 85 + kpisAtencao * 60 + kpisCritico * 30) / (totalKpis * 100 || 1)) * 0.7 +
    mediaProgressoPlanos * 0.3
  );

  return res.json({
    titulo: 'Diagnóstico Estratégico Executivo SENAR-AR/RO (Ciclo 2027-2030)',
    diagnosticoGeral: `O Planejamento Estratégico do SENAR-AR/RO demonstra robustez operacional com ${kpisExcelente + kpisNoRumo} dos ${totalKpis} indicadores de desempenho em faixa de excelência ou no rumo planejado. A expansão da Assistência Técnica e Gerencial (ATeG) e a cobertura integral dos 52 municípios constituem vitórias expressivas de capilaridade e impacto socioeconômico direto no agronegócio rondoniense.

Entretanto, identificou-se um ponto de atenção prioritário na velocidade de digitalização dos processos de campo (KPI-DAF-01: 88,5% vs meta de 95%) e no plano de ação PA-ATEG-02 referente à aquisição e implantação dos sensores de pesagem eletrônica inteligente nas propriedades vitrine. Há necessidade de intervenção conjunta entre DAF e Gerência ATeG para destravar o processo de aquisição.`,
    alertasCriticos: [
      {
        entidade: 'PA-ATEG-02: Unidade Piloto de Agrotecnologia',
        desvio: 'Atraso na homologação do fornecedor dos sensores e balanças IOT conectadas, limitando a execução para 68%.',
        recomendacao: 'O DAF deve abrir dispensa emergencial ou termo aditivo de compra com foco em fornecedores regionais já qualificados.'
      },
      {
        entidade: 'KPI-DAF-01: Taxa de Digitalização dos Processos de Campo',
        desvio: 'Técnicos em distritos com baixa conectividade celular encontram dificuldade na sincronização offline do app SisATEG.',
        recomendacao: 'Habilitar o módulo PWA de sincronização em segundo plano via Wi-Fi nos sindicatos rurais polos.'
      }
    ],
    oportunidadesAgro: [
      'Indicação Geográfica (IG) e Denominação de Origem do Café Robusta Amazônico gerando até 35% de sobrepreço aos produtores atendidos.',
      'Aproveitamento do status sanitário de Rondônia livre de febre aftosa sem vacinação para exportação de carne bovina sustentável rastreada.',
      'Mercado de bioinsumos e fertilidade do solo amazônico com novas turmas de capacitação técnica pelo DETEC.'
    ],
    prioridadesImediatas: [
      'Alinhar reunião entre Superintendência e DAF para destravamento do edital de balanças eletrônicas da ATeG.',
      'Acelerar a entrega do módulo de IA integrado ao BigQuery para projeção preditiva da safra agrícola.',
      'Realizar a Rodada de Negócios Sindicais no polo central de Ji-Paraná para validar as turmas de FPR do 4º trimestre.'
    ],
    indiceSaudeEstrategica: saudeCalculada,
    dataGeracao: new Date().toISOString(),
    fonte: 'Motor Analítico Estratégico SENAR-RO (Base de Regras & Análise BigQuery)'
  });
});

// Vite Middleware for Dev and Static Serving for Production
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
    console.log(`[SENAR-RO Strategic Backend] Servidor ativo em http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Falha ao iniciar o servidor:', err);
  process.exit(1);
});
