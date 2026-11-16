import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { 
  UNIDADES_ORGANIZACIONAIS, 
  PROCESSOS_FINALISTICOS, 
  OBJETIVOS_ESTRATEGICOS, 
  INDICADORES_KPIS, 
  PLANOS_ACAO,
  PROPOSITO_INSTITUCIONAL,
  RESULTADOS_SOCIEDADE,
  PILARES_APRENDIZADO
} from './src/data/initialStrategicData.ts';
import { FICHAS_TECNICAS_INICIAIS } from './src/data/fichasTecnicasData.ts';

const DB_FILE = path.resolve(process.cwd(), 'data', 'db.json');

export interface UserAccount {
  id: string;
  nome: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  unidade: string;
  cargo: string;
  permissoes: ('VIEW' | 'EDIT_PAGE' | 'MANAGE_USERS' | 'MANAGE_KPIS')[];
  resetToken?: string;
  resetTokenExpires?: number;
  criadoEm: string;
}

export interface SiteContent {
  proposito: typeof PROPOSITO_INSTITUCIONAL;
  resultadosSociedade: typeof RESULTADOS_SOCIEDADE;
  pilaresAprendizado: typeof PILARES_APRENDIZADO;
  objetivos: typeof OBJETIVOS_ESTRATEGICOS;
  kpis: typeof INDICADORES_KPIS;
  planosAcao: typeof PLANOS_ACAO;
  processosFinalisticos: typeof PROCESSOS_FINALISTICOS;
  fichasTecnicas: typeof FICHAS_TECNICAS_INICIAIS;
  unidades: typeof UNIDADES_ORGANIZACIONAIS;
}

export interface AppDatabase {
  users: UserAccount[];
  content: SiteContent;
  lastUpdated: string;
}

function initializeDefaultDatabase(): AppDatabase {
  // Salt default passwords (admin123, editor123, viewer123)
  const salt = bcrypt.genSaltSync(10);

  const initialUsers: UserAccount[] = [
    {
      id: 'usr-admin-1',
      nome: 'Dr. Emerson Lira',
      email: 'emerson.lira@senar-ro.org.br',
      passwordHash: bcrypt.hashSync('admin123', salt),
      role: 'ADMIN',
      unidade: 'SUPERINTENDENCIA',
      cargo: 'Superintendente do SENAR-AR/RO',
      permissoes: ['VIEW', 'EDIT_PAGE', 'MANAGE_USERS', 'MANAGE_KPIS'],
      criadoEm: new Date().toISOString()
    },
    {
      id: 'usr-editor-1',
      nome: 'Eng. Marcelo Carvalho',
      email: 'marcelo.carvalho@senar-ro.org.br',
      passwordHash: bcrypt.hashSync('editor123', salt),
      role: 'EDITOR',
      unidade: 'DETEC',
      cargo: 'Chefe do Departamento Técnico',
      permissoes: ['VIEW', 'EDIT_PAGE', 'MANAGE_KPIS'],
      criadoEm: new Date().toISOString()
    },
    {
      id: 'usr-editor-2',
      nome: 'Esp. Renata Fontenelle',
      email: 'renata.fontenelle@senar-ro.org.br',
      passwordHash: bcrypt.hashSync('editor123', salt),
      role: 'EDITOR',
      unidade: 'ATEG',
      cargo: 'Gerente da ATeG Rondônia',
      permissoes: ['VIEW', 'EDIT_PAGE', 'MANAGE_KPIS'],
      criadoEm: new Date().toISOString()
    },
    {
      id: 'usr-editor-3',
      nome: 'Dra. Vanessa Mendonça',
      email: 'vanessa.mendonca@senar-ro.org.br',
      passwordHash: bcrypt.hashSync('editor123', salt),
      role: 'EDITOR',
      unidade: 'DAF',
      cargo: 'Chefe do DAF',
      permissoes: ['VIEW', 'EDIT_PAGE', 'MANAGE_KPIS'],
      criadoEm: new Date().toISOString()
    },
    {
      id: 'usr-viewer-1',
      nome: 'Visitante / Auditor',
      email: 'visualizador@senar-ro.org.br',
      passwordHash: bcrypt.hashSync('viewer123', salt),
      role: 'VIEWER',
      unidade: 'CONSELHO',
      cargo: 'Observador Institucional',
      permissoes: ['VIEW'],
      criadoEm: new Date().toISOString()
    }
  ];

  return {
    users: initialUsers,
    content: {
      proposito: { ...PROPOSITO_INSTITUCIONAL },
      resultadosSociedade: [...RESULTADOS_SOCIEDADE],
      pilaresAprendizado: [...PILARES_APRENDIZADO],
      objetivos: [...OBJETIVOS_ESTRATEGICOS],
      kpis: [...INDICADORES_KPIS],
      planosAcao: [...PLANOS_ACAO],
      processosFinalisticos: [...PROCESSOS_FINALISTICOS],
      fichasTecnicas: [...FICHAS_TECNICAS_INICIAIS],
      unidades: [...UNIDADES_ORGANIZACIONAIS]
    },
    lastUpdated: new Date().toISOString()
  };
}

export function getDatabase(): AppDatabase {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const db = initializeDefaultDatabase();
      saveDatabase(db);
      return db;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const db: AppDatabase = JSON.parse(raw);
    return db;
  } catch (err) {
    console.error('Erro ao ler banco local, recriando default:', err);
    const db = initializeDefaultDatabase();
    saveDatabase(db);
    return db;
  }
}

export function saveDatabase(db: AppDatabase): void {
  try {
    db.lastUpdated = new Date().toISOString();
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Falha ao salvar banco local no disco:', err);
  }
}
