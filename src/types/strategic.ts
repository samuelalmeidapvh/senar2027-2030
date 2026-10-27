export type PerspectivaBSCType = 
  | 'SOCIEDADE'
  | 'CLIENTES'
  | 'CLIENTES_SOCIEDADE'
  | 'PROCESSOS_INTERNOS' 
  | 'APRENDIZADO_CRESCIMENTO'
  | 'FINANCEIRA';

export interface ResultadoSociedade {
  id: string;
  titulo: string;
  icone: string;
  descricao?: string;
}

export interface PilarAprendizado {
  id: string;
  titulo: string;
  icone: string;
  descricao?: string;
}

export interface ImpactoGeral {
  id: string;
  titulo: string;
  icone: string;
}

export type StatusEstrategico = 'EXCELENTE' | 'NO_RUMO' | 'ATENCAO' | 'CRITICO';

export type StatusPlanoAcao = 'PLANEJADO' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'EM_RISCO';

export type SiglaUnidade = 'SUPERINTENDENCIA' | 'DAF' | 'DETEC' | 'ATEG';

export interface UnidadeOrganizacional {
  id: string;
  sigla: SiglaUnidade;
  nome: string;
  responsavel: string;
  cargo: string;
  descricao: string;
  atribuicoesPrincipais: string[];
  orcamentoAno: number;
}

export interface HistoricoMedicao {
  periodo: string; // Ex: '2025-Q1', '2025-Q2', etc.
  realizado: number;
  meta: number;
}

export interface IndicadorKPI {
  id: string;
  codigo: string;
  nome: string;
  descricao: string;
  objetivoId: string;
  unidadeId: SiglaUnidade;
  meta: number;
  realizado: number;
  linhaDeBase: number;
  unidadeMedida: string;
  polaridade: 'MAIOR_MELHOR' | 'MENOR_MELHOR';
  frequencia: 'MENSAL' | 'TRIMESTRAL' | 'SEMESTRAL' | 'ANUAL';
  status: StatusEstrategico;
  historico: HistoricoMedicao[];
  responsavel: string;
  ultimaAtualizacao: string;
}

export interface ObjetivoEstrategico {
  id: string;
  codigo: string;
  perspectiva: PerspectivaBSCType;
  titulo: string;
  descricao: string;
  unidadeLider: SiglaUnidade;
  progressoPercentual: number;
  status: StatusEstrategico;
  kpisAssociados: string[]; // IDs dos KPIs
  processoFinalisticoId?: string;
  impactoEstrategico: string;
  causaEfeitoIds: string[]; // Conexões com outros objetivos (BSC cause-effect chain)
}

export interface PlanoAcao5W2H {
  id: string;
  codigo: string;
  titulo: string;
  objetivoId: string;
  unidadeResponsavel: SiglaUnidade;
  oQue: string; // What
  porQue: string; // Why
  onde: string; // Where
  quem: string; // Who
  quandoInicio: string; // When Start
  quandoFim: string; // When End
  como: string; // How
  quantoCusta: number; // How much (R$)
  progressoPercentual: number;
  status: StatusPlanoAcao;
  marcosPrincipais: Array<{
    descricao: string;
    concluido: boolean;
    dataLimite: string;
  }>;
}

export type CategoriaProcessoCadeia = 'FINALISTICO' | 'GESTAO_SUPORTE';

export interface ProcessoFinalistico {
  id: string;
  codigo: string;
  sigla: string;
  nome: string;
  categoria?: CategoriaProcessoCadeia;
  descricao: string;
  publicoAlvo: string;
  missaoDoProcesso: string;
  atividadesChave: string[];
  metasGerais: string[];
  indicadoresChave: string[];
  icone: string;
}

export type RoleUsuario = 
  | 'SUPERINTENDENCIA' 
  | 'GESTOR_DETEC' 
  | 'GESTOR_ATEG' 
  | 'GESTOR_DAF' 
  | 'VISITANTE_PUBLICO';

export interface UsuarioAutenticado {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  role: RoleUsuario;
  unidade: SiglaUnidade;
  avatarUrl?: string;
}

export interface RespostaAuthJWT {
  token: string;
  refreshToken: string;
  usuario: UsuarioAutenticado;
  expiraEm: number;
}

export interface InsightEstrategicoIA {
  titulo: string;
  diagnosticoGeral: string;
  alertasCriticos: Array<{
    entidade: string;
    desvio: string;
    recomendacao: string;
  }>;
  oportunidadesAgro: string[];
  prioridadesImediatas: string[];
  indiceSaudeEstrategica: number; // 0-100
  dataGeracao: string;
  fonte?: string;
  avisoDemanda?: string;
}
