import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
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

const DB_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
const DB_FILE = path.join(DB_DIR, 'senar.sqlite');

export const sqlite = new Database(DB_FILE);

// Enable WAL mode for high performance and integrity
sqlite.pragma('journal_mode = WAL');

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

// 1. Initialize Tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'VIEWER',
    unidade TEXT NOT NULL DEFAULT 'SUPERINTENDENCIA',
    cargo TEXT NOT NULL DEFAULT 'Colaborador SENAR-RO',
    permissoes TEXT NOT NULL DEFAULT '["VIEW"]',
    reset_token TEXT,
    reset_token_expires INTEGER,
    criado_em TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT,
    action TEXT NOT NULL,
    details TEXT,
    timestamp TEXT NOT NULL
  );
`);

// 2. Seed initial data if empty
function seedInitialData() {
  const usersCount = (sqlite.prepare('SELECT COUNT(*) as count FROM users').get() as any).count;
  if (usersCount === 0) {
    console.log('[SQLite] Criando usuário administrador inicial...');
    const salt = bcrypt.genSaltSync(10);
    const adminPass = bcrypt.hashSync('senar2027', salt);

    sqlite.prepare(`
      INSERT INTO users (id, nome, email, password_hash, role, unidade, cargo, permissoes, criado_em)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'usr-admin-initial',
      'Administrador SENAR-RO',
      'admin@senar-ro.org.br',
      adminPass,
      'ADMIN',
      'SUPERINTENDENCIA',
      'Superintendência / Administrador Geral',
      JSON.stringify(['VIEW', 'EDIT_PAGE', 'MANAGE_USERS', 'MANAGE_KPIS']),
      new Date().toISOString()
    );
  }

  // Seed site content blocks if not exists
  const initialBlocks = [
    { key: 'proposito', data: PROPOSITO_INSTITUCIONAL },
    { key: 'resultadosSociedade', data: RESULTADOS_SOCIEDADE },
    { key: 'pilaresAprendizado', data: PILARES_APRENDIZADO },
    { key: 'objetivos', data: OBJETIVOS_ESTRATEGICOS },
    { key: 'kpis', data: INDICADORES_KPIS },
    { key: 'planosAcao', data: PLANOS_ACAO },
    { key: 'processosFinalisticos', data: PROCESSOS_FINALISTICOS },
    { key: 'fichasTecnicas', data: FICHAS_TECNICAS_INICIAIS },
    { key: 'unidades', data: UNIDADES_ORGANIZACIONAIS }
  ];

  const checkStmt = sqlite.prepare('SELECT key FROM site_content WHERE key = ?');
  const insertStmt = sqlite.prepare('INSERT INTO site_content (key, data, updated_at) VALUES (?, ?, ?)');

  for (const block of initialBlocks) {
    const existing = checkStmt.get(block.key);
    if (!existing) {
      insertStmt.run(block.key, JSON.stringify(block.data), new Date().toISOString());
    }
  }
}

seedInitialData();

// ================= User Data Access =================

export function findUserByEmail(email: string): UserAccount | null {
  const row = sqlite.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)').get(email) as any;
  if (!row) return null;
  return {
    id: row.id,
    nome: row.nome,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    unidade: row.unidade,
    cargo: row.cargo,
    permissoes: JSON.parse(row.permissoes || '["VIEW"]'),
    resetToken: row.reset_token || undefined,
    resetTokenExpires: row.reset_token_expires || undefined,
    criadoEm: row.criado_em
  };
}

export function findUserById(id: string): UserAccount | null {
  const row = sqlite.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;
  if (!row) return null;
  return {
    id: row.id,
    nome: row.nome,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    unidade: row.unidade,
    cargo: row.cargo,
    permissoes: JSON.parse(row.permissoes || '["VIEW"]'),
    resetToken: row.reset_token || undefined,
    resetTokenExpires: row.reset_token_expires || undefined,
    criadoEm: row.criado_em
  };
}

export function getAllUsers(): UserAccount[] {
  const rows = sqlite.prepare('SELECT * FROM users ORDER BY criado_em DESC').all() as any[];
  return rows.map(row => ({
    id: row.id,
    nome: row.nome,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    unidade: row.unidade,
    cargo: row.cargo,
    permissoes: JSON.parse(row.permissoes || '["VIEW"]'),
    resetToken: row.reset_token || undefined,
    resetTokenExpires: row.reset_token_expires || undefined,
    criadoEm: row.criado_em
  }));
}

export function insertUser(user: {
  nome: string;
  email: string;
  passwordHash: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  unidade: string;
  cargo: string;
  permissoes: string[];
}): UserAccount {
  const id = `usr-${Date.now()}`;
  const criadoEm = new Date().toISOString();
  sqlite.prepare(`
    INSERT INTO users (id, nome, email, password_hash, role, unidade, cargo, permissoes, criado_em)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    user.nome,
    user.email.toLowerCase().trim(),
    user.passwordHash,
    user.role,
    user.unidade,
    user.cargo,
    JSON.stringify(user.permissoes),
    criadoEm
  );

  return {
    id,
    nome: user.nome,
    email: user.email.toLowerCase().trim(),
    passwordHash: user.passwordHash,
    role: user.role,
    unidade: user.unidade,
    cargo: user.cargo,
    permissoes: user.permissoes as any,
    criadoEm
  };
}

export function updateUser(id: string, updates: Partial<UserAccount>): void {
  const current = findUserById(id);
  if (!current) throw new Error('Usuário não encontrado');

  const nome = updates.nome !== undefined ? updates.nome : current.nome;
  const email = updates.email !== undefined ? updates.email.toLowerCase().trim() : current.email;
  const passwordHash = updates.passwordHash !== undefined ? updates.passwordHash : current.passwordHash;
  const role = updates.role !== undefined ? updates.role : current.role;
  const unidade = updates.unidade !== undefined ? updates.unidade : current.unidade;
  const cargo = updates.cargo !== undefined ? updates.cargo : current.cargo;
  const permissoes = updates.permissoes !== undefined ? JSON.stringify(updates.permissoes) : JSON.stringify(current.permissoes);
  const resetToken = updates.resetToken !== undefined ? updates.resetToken : (current.resetToken || null);
  const resetTokenExpires = updates.resetTokenExpires !== undefined ? updates.resetTokenExpires : (current.resetTokenExpires || null);

  sqlite.prepare(`
    UPDATE users 
    SET nome = ?, email = ?, password_hash = ?, role = ?, unidade = ?, cargo = ?, permissoes = ?, reset_token = ?, reset_token_expires = ?
    WHERE id = ?
  `).run(nome, email, passwordHash, role, unidade, cargo, permissoes, resetToken, resetTokenExpires, id);
}

export function deleteUser(id: string): void {
  sqlite.prepare('DELETE FROM users WHERE id = ?').run(id);
}

// ================= Site Content Data Access =================

export function getSiteContentBlock<T = any>(key: string): T | null {
  const row = sqlite.prepare('SELECT data FROM site_content WHERE key = ?').get(key) as any;
  if (!row) return null;
  return JSON.parse(row.data);
}

export function setSiteContentBlock(key: string, data: any): void {
  sqlite.prepare(`
    INSERT INTO site_content (key, data, updated_at) 
    VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at
  `).run(key, JSON.stringify(data), new Date().toISOString());
}

export function getAllSiteContent() {
  const rows = sqlite.prepare('SELECT key, data FROM site_content').all() as any[];
  const content: any = {};
  for (const r of rows) {
    content[r.key] = JSON.parse(r.data);
  }
  return content;
}
