import { 
  UnidadeOrganizacional, 
  ProcessoFinalistico, 
  ObjetivoEstrategico, 
  IndicadorKPI, 
  PlanoAcao5W2H,
  UsuarioAutenticado
} from '../types/strategic';

export const UNIDADES_ORGANIZACIONAIS: UnidadeOrganizacional[] = [
  {
    id: 'unid-1',
    sigla: 'SUPERINTENDENCIA',
    nome: 'Superintendência Regional',
    responsavel: 'Dr. Emerson Lira',
    cargo: 'Superintendente do SENAR-AR/RO',
    descricao: 'Responsável pela liderança executiva, articulação institucional com a FAPERON, CNA, Sindicatos Rurais e órgãos governamentais, assegurando a consecução do propósito estratégico.',
    atribuicoesPrincipais: [
      'Alinhamento com o Conselho Administrativo e Federação FAPERON',
      'Definição e monitoramento das diretrizes estratégicas e governança corporativa',
      'Relações institucionais, captação de parcerias e expansão da atuação no estado',
      'Gestão de riscos estratégicos e compliance'
    ],
    orcamentoAno: 12500000
  },
  {
    id: 'unid-2',
    sigla: 'DAF',
    nome: 'Departamento Administrativo e Financeiro',
    responsavel: 'Dra. Vanessa Mendonça',
    cargo: 'Chefe do DAF',
    descricao: 'Gestão dos recursos financeiros, arrecadação da contribuição do agronegócio, recursos humanos, compras públicas, logística, patrimônio e tecnologia da informação.',
    atribuicoesPrincipais: [
      'Execução orçamentária e sustentabilidade financeira institucional',
      'Gestão de folha, capacitação de colaboradores e clima organizacional',
      'Auditoria interna, conformidade com o Tribunal de Contas da União (TCU)',
      'Infraestrutura tecnológica, suporte e modernização digital'
    ],
    orcamentoAno: 8900000
  },
  {
    id: 'unid-3',
    sigla: 'DETEC',
    nome: 'Departamento Técnico',
    responsavel: 'Eng. Agrônomo Marcelo Carvalho',
    cargo: 'Chefe do Departamento Técnico',
    descricao: 'Coordenação e execução dos programas de Formação Profissional Rural (FPR), Promoção Social (PS), Educação Formal e eventos técnicos em todo o território rondoniense.',
    atribuicoesPrincipais: [
      'Planejamento e supervisão pedagógica dos cursos de Formação Profissional Rural',
      'Desenvolvimento de ações e programas de Promoção Social (Saúde e Cidadania)',
      'Credenciamento, capacitação contínua e avaliação de instrutores',
      'Articulação direta com os Sindicatos Rurais para demandas municipais'
    ],
    orcamentoAno: 18400000
  },
  {
    id: 'unid-4',
    sigla: 'ATEG',
    nome: 'Gerência de Assistência Técnica e Gerencial',
    responsavel: 'Esp. Renata Fontenelle',
    cargo: 'Gerente da ATeG Rondônia',
    descricao: 'Planejamento e operacionalização da metodologia ATeG do SENAR, fornecendo consultoria técnica e gerencial contínua aos produtores de café, leite, corte, cacau e piscicultura.',
    atribuicoesPrincipais: [
      'Gestão da malha de técnicos de campo e supervisores em Rondônia',
      'Aplicação da metodologia de gestão de custos e zootécnica/agronômica no campo',
      'Acompanhamento de indicadores de rentabilidade e produtividade das propriedades rurais',
      'Integração com a plataforma SisATEG e análise de dados produtivos'
    ],
    orcamentoAno: 22600000
  }
];

export const PROCESSOS_FINALISTICOS: ProcessoFinalistico[] = [
  {
    id: 'proc-1',
    codigo: 'PF-01',
    sigla: 'FPR',
    nome: 'Formação Profissional Rural',
    categoria: 'FINALISTICO',
    descricao: 'Capacitação prática e profissional do produtor e trabalhador rural em técnicas produtivas modernas, operação de maquinários, manejo sustentável e sustentabilidade hídrica.',
    publicoAlvo: 'Produtores rurais, trabalhadores do campo e jovens rurais em busca de qualificação.',
    missaoDoProcesso: 'Desenvolver competências técnico-operacionais para elevar a competitividade e sustentabilidade das cadeias agropecuárias.',
    atividadesChave: [
      'Diagnóstico de demandas municipais em conjunto com os Sindicatos Rurais',
      'Cursos nas cadeias de Cafeicultura, Bovinocultura de Corte e Leite, Cacau e Piscicultura',
      'Treinamentos de NR-31, Mecanização Agrícola de Precisão e Drones de Pulverização',
      'Emissão e controle de certificados de qualificação profissional'
    ],
    metasGerais: [
      'Capacitar mais de 28.000 profissionais do campo em 2026',
      'Alcançar 100% dos 52 municípios de Rondônia',
      'Manter índice de aplicabilidade prática acima de 92%'
    ],
    indicadoresChave: ['kpi-1', 'kpi-2'],
    icone: 'GraduationCap'
  },
  {
    id: 'proc-2',
    codigo: 'PF-02',
    sigla: 'PS',
    nome: 'Promoção Social Rural',
    categoria: 'FINALISTICO',
    descricao: 'Ações socioeducativas voltadas à melhoria da qualidade de vida, nutrição, prevenção em saúde da família rural, saneamento básico no campo e empreendedorismo feminino.',
    publicoAlvo: 'Famílias rurais, mulheres do campo e comunidades tradicionais do agronegócio de Rondônia.',
    missaoDoProcesso: 'Fomentar a cidadania, dignidade humana, saúde preventiva e valorização da família no ambiente rural.',
    atividadesChave: [
      'Programa Saúde do Homem e Saúde da Mulher Rural (exames preventivos)',
      'Oficinas de alimentação saudável e aproveitamento integral dos alimentos',
      'Inclusão digital e programas de empreendedorismo rural para mulheres e jovens',
      'Atividades de artesanato rural, associativismo e sustentabilidade comunitária'
    ],
    metasGerais: [
      'Realizar 15.000 atendimentos de saúde e cidadania',
      'Expandir programa Mulheres em Campo em 30 novos municípios',
      'Promover feiras e encontros de integração social agropecuária'
    ],
    indicadoresChave: ['kpi-3', 'kpi-4'],
    icone: 'HeartHandshake'
  },
  {
    id: 'proc-3',
    codigo: 'PF-03',
    sigla: 'ATEG',
    nome: 'Assistência Técnica e Gerencial',
    categoria: 'FINALISTICO',
    descricao: 'Metodologia exclusiva de 24 a 36 meses baseada em 5 etapas: Diagnóstico Produtivo, Planejamento Estratégico, Adequação Tecnológica, Capacitação Complementar e Avaliação Sistemática.',
    publicoAlvo: 'Pequenos e médios produtores rurais de Rondônia com vocação para geração de renda e crescimento sustentável.',
    missaoDoProcesso: 'Transformar propriedades rurais em empresas sustentáveis e altamente rentáveis através da gestão técnico-econômica de precisão.',
    atividadesChave: [
      'Visitas mensais individuais de 4 horas por propriedade com técnico credenciado',
      'Coleta e escrituração detalhada de receitas, custos fixos e custos variáveis',
      'Implantação de boas práticas agropecuárias e correção de solo baseada em laudos',
      'Dias de Campo com apresentação de resultados econômicos e zootécnicos comparativos'
    ],
    metasGerais: [
      'Assistir 6.500 propriedades rurais ativas em Rondônia',
      'Garantir incremento médio de margem líquida da atividade de no mínimo 25%',
      'Monitorar 100% dos dados zootécnicos e financeiros na nuvem SisATEG'
    ],
    indicadoresChave: ['kpi-5', 'kpi-6', 'kpi-7'],
    icone: 'TrendingUp'
  },
  {
    id: 'proc-4',
    codigo: 'PF-04',
    sigla: 'EDUC-INOV',
    nome: 'Educação Formal e Inovação Agropecuária',
    categoria: 'FINALISTICO',
    descricao: 'Ensino técnico de nível médio regular (Rede e-Tec), programas de pós-graduação aplicados ao agro e difusão de tecnologias inovadoras (AgTechs, bioinsumos e agricultura de precisão).',
    publicoAlvo: 'Estudantes rurais, técnicos agropecuários, graduados e líderes cooperativistas.',
    missaoDoProcesso: 'Formar quadros técnicos de liderança para acelerar a inovação tecnológica no campo rondoniense.',
    atividadesChave: [
      'Cursos Técnicos em Agronegócio, Zootecnia, Fruticultura e Cafeicultura',
      'Polo de Inovação Agropecuária e parcerias com EMBRAPA e UNIR',
      'Desafios de inovação aberta para startups agro (AgTech Rondônia Challenge)',
      'Laboratórios práticos de agricultura digital e conectividade rural'
    ],
    metasGerais: [
      'Formar 800 novos técnicos diplomados por ano',
      'Taxa de empregabilidade no agronegócio superior a 85%',
      'Incubação e aceleração de 12 soluções tecnológicas voltadas ao bioma amazônico'
    ],
    indicadoresChave: ['kpi-8', 'kpi-9'],
    icone: 'Lightbulb'
  },
  // PROCESSOS DE GESTÃO E SUPORTE OPERACIONAL (ALICERCE E HABILITAÇÃO ESTRATÉGICA)
  {
    id: 'proc-5',
    codigo: 'PG-01',
    sigla: 'GE-PPF',
    nome: 'Gestão de Excelência em Pessoas, Processos e Finanças',
    categoria: 'GESTAO_SUPORTE',
    descricao: 'Planejamento orçamentário participativo, alocação inteligente de recursos arrecadados, valorização contínua do capital humano e padronização e automação de fluxos operacionais internos.',
    publicoAlvo: 'Corpo de colaboradores e instrutores do SENAR-AR/RO, gestores departamentais e Conselho Administrativo.',
    missaoDoProcesso: 'Assegurar sustentabilidade financeiro-orçamentária com rigor fiscal, processos administrativos eficientes e um ambiente corporativo de alto desempenho e desenvolvimento humano.',
    atividadesChave: [
      'Execução e monitoramento contínuo do orçamento anual com custeio por programa e unidade regional',
      'Plano de carreira, avaliação de desempenho 360°, clima organizacional e programas de saúde do trabalhador',
      'Mapeamento, redesenho contínuo e desburocratização dos fluxos operacionais e administrativos',
      'Gestão da folha de pagamento, contabilidade pública do Sistema S e atendimento às diretrizes do TCU'
    ],
    metasGerais: [
      '100% de execução orçamentária dentro dos limites legais e metas pactuadas',
      'Índice de engajamento e clima organizacional favorável acima de 90%',
      'Redução de 30% no tempo médio de tramitação de processos administrativos internos'
    ],
    indicadoresChave: ['kpi-10', 'kpi-12'],
    icone: 'Users'
  },
  {
    id: 'proc-6',
    codigo: 'PG-02',
    sigla: 'GIT',
    nome: 'Gestão de Infraestrutura Tecnológica',
    categoria: 'GESTAO_SUPORTE',
    descricao: 'Infraestrutura de redes de alta velocidade, parque computacional moderno, governança de TI, suporte operacional e sistemas integrados em nuvem para viabilizar as ações no campo.',
    publicoAlvo: 'Técnicos de campo da ATeG, instrutores de formação rural, unidades regionais e os 52 Sindicatos Rurais.',
    missaoDoProcesso: 'Prover conectividade resiliente, plataformas digitais estáveis e suporte tecnológico tempestivo para potencializar as atividades em todos os 52 municípios de Rondônia.',
    atividadesChave: [
      'Manutenção e sustentação da infraestrutura de conectividade, servidores e segurança em nuvem',
      'Suporte técnico e operacional às plataformas corporativas e aplicativo móvel de campo do SisATEG',
      'Implementação de políticas de segurança cibernética, rotinas de backup e conformidade com a LGPD',
      'Modernização contínua de equipamentos (notebooks, tablets e coletores) fornecidos às equipes de campo'
    ],
    metasGerais: [
      'Disponibilidade de 99,8% para sistemas de missão crítica, portal e nuvem SisATEG',
      '100% das equipes de campo com equipamentos homologados e suporte técnico em até 4 horas',
      'Zero incidentes de segurança cibernética ou violação de dados corporativos'
    ],
    indicadoresChave: ['kpi-11', 'kpi-9'],
    icone: 'Cpu'
  },
  {
    id: 'proc-7',
    codigo: 'PG-03',
    sigla: 'CCI',
    nome: 'Compliance e Controle Interno',
    categoria: 'GESTAO_SUPORTE',
    descricao: 'Auditoria preventiva, gestão integrada de riscos corporativos, conformidade jurídica de contratos e licitações, ouvidoria e fortalecimento da integridade institucional.',
    publicoAlvo: 'Sociedade civil rondoniense, produtores rurais, órgãos fiscalizadores (TCU, CGU) e colaboradores.',
    missaoDoProcesso: 'Garantir conformidade regulatória plena, transparência ativa, mitigação proativa de riscos e aplicação rigorosa das melhores práticas de governança corporativa pública.',
    atividadesChave: [
      'Auditorias internas preventivas em contratos, convênios sindicais e processos de suprimentos',
      'Gestão da matriz corporativa de riscos e monitoramento de planos de mitigação',
      'Operacionalização do Canal de Integridade/Ouvidoria e difusão do Código de Ética e Conduta',
      'Acompanhamento de auditorias do TCU/CGU e emissão do Relatório de Gestão Integrada Anual'
    ],
    metasGerais: [
      '100% dos processos de contratação e parcerias com análise prévia de conformidade legal',
      'Aprovação das contas anuais pelo TCU sem quaisquer ressalvas ou recomendações gravosas',
      '100% dos colaboradores certificados no programa bienal de Integridade, Ética e Compliance'
    ],
    indicadoresChave: ['kpi-10'],
    icone: 'ShieldCheck'
  },
  {
    id: 'proc-8',
    codigo: 'PG-04',
    sigla: 'GSA',
    nome: 'Governança, Suprimentos e Articulação Institucional',
    categoria: 'GESTAO_SUPORTE',
    descricao: 'Compras e licitações eficientes, gestão da frota de veículos para atendimento ao interior, logística de insumos pedagógicos e articulação institucional com a FAPERON e os 52 Sindicatos Rurais.',
    publicoAlvo: 'Federação FAPERON, Sistema CNA, 52 Sindicatos dos Produtores Rurais de Rondônia e parceiros estratégicos.',
    missaoDoProcesso: 'Viabilizar a logística operacional e suprimentos com agilidade, zelando pelo patrimônio público e fortalecendo a representatividade do Sistema Sindical Rural rondoniense.',
    atividadesChave: [
      'Planejamento de contratações públicas, pregões e fornecimento de material didático e EPIs',
      'Gestão da frota veicular institucional e logística de deslocamento das equipes técnicas pelo estado',
      'Articulação contínua e suporte operacional aos 52 Sindicatos Rurais de Rondônia',
      'Comunicação institucional, assessoria de imprensa e gestão do patrimônio físico'
    ],
    metasGerais: [
      'Redução de 25% no ciclo de aquisição e entrega de insumos para cursos nos municípios',
      'Atendimento logístico e de transporte a 100% dos eventos, treinamentos e dias de campo',
      'Índice de satisfação dos 52 Sindicatos Rurais parceiros superior a 92%'
    ],
    indicadoresChave: ['kpi-1', 'kpi-3'],
    icone: 'Briefcase'
  }
];

export const PROPOSITO_INSTITUCIONAL = {
  proposito: "Transformar vidas e fortalecer o campo, criando oportunidades para que as pessoas prosperem por meio do conhecimento, do trabalho e do desenvolvimento sustentável.",
  visao: "Alcançar a excelência na atuação rural, por meio da assistência, capacitação, formação e promoção social gerando resultados efetivos aos produtores",
  missao: "Transformar conhecimento em oportunidades para o meio rural, por meio da educação profissional, da assistência técnica, da inovação e do fortalecimento da gestão, gerando valor para as pessoas, as propriedades rurais e a sociedade.",
  lema: "Conhecimento que transforma, campo que prospera.",
  subtitulo: "Conhecimento, tecnologia e pessoas por um agro mais forte e sustentável.",
  slogan: "JUNTOS, FORTALECENDO O PRODUTOR RURAL DE RONDÔNIA.",
  valores: "Excelência e Qualidade, Cooperação e Parceria, Compromisso com o Público Rural, Responsabilidade pelos Resultados e Valorização das Pessoas."
};

export const RESULTADOS_SOCIEDADE: Array<{
  id: string;
  titulo: string;
  icone: string;
  descricao: string;
}> = [
  {
    id: 'rs-1',
    titulo: 'Produtores rurais mais capacitados',
    icone: 'Sprout',
    descricao: 'Formação continuada e domínio de técnicas modernas de cultivo, manejo e gestão da propriedade.'
  },
  {
    id: 'rs-2',
    titulo: 'Aumento da produtividade e renda no campo',
    icone: 'TrendingUp',
    descricao: 'Elevação da margem líquida, redução de custos e aumento do rendimento zootécnico e agronômico.'
  },
  {
    id: 'rs-3',
    titulo: 'Mais qualidade de vida para as famílias rurais',
    icone: 'Users',
    descricao: 'Ações contínuas de saúde preventiva, inclusão social, cidadania e valorização da mulher e jovem no campo.'
  },
  {
    id: 'rs-4',
    titulo: 'Agro de Rondônia mais competitivo e sustentável',
    icone: 'Globe2',
    descricao: 'Práticas de baixo carbono, rastreabilidade, certificações e expansão comercial nos mercados nacional e global.'
  }
];

export const PILARES_APRENDIZADO: Array<{
  id: string;
  titulo: string;
  icone: string;
  descricao: string;
}> = [
  {
    id: 'pa-base-1',
    titulo: 'Pessoas mais capacitadas e engajadas',
    icone: 'Users',
    descricao: 'Equipes técnicas e colaboradores de alto rendimento, valorizados e motivados pelo propósito do campo.'
  },
  {
    id: 'pa-base-2',
    titulo: 'Inovação e cultura de melhoria contínua',
    icone: 'Lightbulb',
    descricao: 'Metodologias ágeis, testes de novas tecnologias e constante aperfeiçoamento dos processos de atendimento.'
  },
  {
    id: 'pa-base-3',
    titulo: 'Tecnologia e inteligência de dados',
    icone: 'Cpu',
    descricao: 'Plataformas digitais na nuvem, telemetria a campo e governança de dados para apoio à tomada de decisão.'
  },
  {
    id: 'pa-base-4',
    titulo: 'Conhecimento e desenvolvimento de competências',
    icone: 'GraduationCap',
    descricao: 'Atualização técnica continuada dos instrutores credenciados, supervisores e técnicos de campo da ATeG.'
  }
];

export const IMPACTOS_GERAIS: Array<{
  id: string;
  titulo: string;
  icone: string;
}> = [
  { id: 'imp-1', titulo: 'PRODUTIVIDADE SUSTENTÁVEL', icone: 'Sprout' },
  { id: 'imp-2', titulo: 'DESENVOLVIMENTO HUMANO', icone: 'Users' },
  { id: 'imp-3', titulo: 'INOVAÇÃO', icone: 'Lightbulb' },
  { id: 'imp-4', titulo: 'COMPETITIVIDADE DO CAMPO', icone: 'TrendingUp' },
  { id: 'imp-5', titulo: 'QUALIDADE DE VIDA', icone: 'Heart' }
];

export const OBJETIVOS_ESTRATEGICOS: ObjetivoEstrategico[] = [
  // 01. Assistência Técnica, Promoção Social e Formação Profissional
  {
    id: 'obj-1',
    codigo: 'OE-01',
    perspectiva: 'PROCESSOS_INTERNOS',
    titulo: 'Assistência Técnica, Promoção Social e Formação Profissional',
    descricao: 'Fortalecer e ampliar a assistência técnica rural, a promoção social, a capacitação e a formação profissional por meio de uma gestão ágil, moderna e de qualidade nos resultados.',
    unidadeLider: 'DETEC',
    progressoPercentual: 92,
    status: 'EXCELENTE',
    kpisAssociados: ['kpi-1', 'kpi-3', 'kpi-5', 'kpi-7'],
    processoFinalisticoId: 'proc-1',
    impactoEstrategico: 'Impacto direto para a Sociedade e Produtores: produtores capacitados, renda ampliada e qualidade de vida no campo.',
    causaEfeitoIds: ['obj-2', 'obj-3']
  },
  // 02. Gestão Institucional e Comunicação e Marketing
  {
    id: 'obj-2',
    codigo: 'OE-02',
    perspectiva: 'PROCESSOS_INTERNOS',
    titulo: 'Gestão Institucional e Comunicação e Marketing',
    descricao: 'Aperfeiçoar a Gestão Integrada Institucional e o fortalecimento do Marketing e da Comunicação.',
    unidadeLider: 'SUPERINTENDENCIA',
    progressoPercentual: 88,
    status: 'NO_RUMO',
    kpisAssociados: ['kpi-2', 'kpi-6'],
    impactoEstrategico: 'Fortalecimento da marca FAPERON/SENAR, reputação institucional e integração com os 52 Sindicatos Rurais.',
    causaEfeitoIds: ['obj-1', 'obj-3']
  },
  // 03. Excelência na Gestão
  {
    id: 'obj-3',
    codigo: 'OE-03',
    perspectiva: 'PROCESSOS_INTERNOS',
    titulo: 'Excelência na Gestão',
    descricao: 'Gerir com excelência os recursos financeiros e humanos, os processos operacionais com foco no aumento da maturidade de gestão.',
    unidadeLider: 'DAF',
    progressoPercentual: 94,
    status: 'EXCELENTE',
    kpisAssociados: ['kpi-10', 'kpi-8'],
    impactoEstrategico: 'Sustentabilidade orçamentária, eficiência administrativa, meritocracia e maturidade na gestão corporativa.',
    causaEfeitoIds: ['obj-4', 'obj-5']
  },
  // 04. Tecnologia e Inteligência de Dados
  {
    id: 'obj-4',
    codigo: 'OE-04',
    perspectiva: 'PROCESSOS_INTERNOS',
    titulo: 'Tecnologia e Inteligência de Dados',
    descricao: 'Viabilizar uma arquitetura de TI moderna, integrada e de inteligência estratégica de dados.',
    unidadeLider: 'DAF',
    progressoPercentual: 85,
    status: 'NO_RUMO',
    kpisAssociados: ['kpi-9'],
    impactoEstrategico: 'Nuvem analítica, telemetria a campo e inteligência de dados subsidiando decisões ágeis de gestão.',
    causaEfeitoIds: ['obj-1', 'obj-3']
  },
  // 05. Segurança Jurídica, Integridade e Conformidade
  {
    id: 'obj-5',
    codigo: 'OE-05',
    perspectiva: 'PROCESSOS_INTERNOS',
    titulo: 'Segurança Jurídica, Integridade e Conformidade',
    descricao: 'Garantir a segurança jurídica, a integridade da gestão e assegurar a conformidade legal, ética e operacional da organização.',
    unidadeLider: 'SUPERINTENDENCIA',
    progressoPercentual: 96,
    status: 'EXCELENTE',
    kpisAssociados: ['kpi-10'],
    impactoEstrategico: 'Compliance integral, governança corporativa, mitigação de riscos e plena conformidade com as normas do TCU.',
    causaEfeitoIds: ['obj-3']
  }
];

export const INDICADORES_KPIS: IndicadorKPI[] = [
  {
    id: 'kpi-1',
    codigo: 'KPI-DETEC-01',
    nome: 'Produtores e Trabalhadores Capacitados (FPR)',
    descricao: 'Número consolidado de participantes que concluíram com aproveitamento os cursos de Formação Profissional Rural.',
    objetivoId: 'obj-5',
    unidadeId: 'DETEC',
    meta: 28000,
    realizado: 26450,
    linhaDeBase: 22100,
    unidadeMedida: 'pessoas',
    polaridade: 'MAIOR_MELHOR',
    frequencia: 'TRIMESTRAL',
    status: 'NO_RUMO',
    responsavel: 'Coordenação de FPR / DETEC',
    ultimaAtualizacao: '2026-Q3',
    historico: [
      { periodo: '2025-Q1', realizado: 5200, meta: 5000 },
      { periodo: '2025-Q2', realizado: 11400, meta: 11000 },
      { periodo: '2025-Q3', realizado: 17800, meta: 17500 },
      { periodo: '2025-Q4', realizado: 24200, meta: 24000 },
      { periodo: '2026-Q1', realizado: 7100, meta: 6800 },
      { periodo: '2026-Q2', realizado: 15900, meta: 15500 },
      { periodo: '2026-Q3', realizado: 26450, meta: 28000 }
    ]
  },
  {
    id: 'kpi-2',
    codigo: 'KPI-DETEC-02',
    nome: 'Índice de Aplicabilidade Prática do Treinamento',
    descricao: 'Percentual de alunos que aplicam as técnicas aprendidas no dia a dia da propriedade após 90 dias da conclusão.',
    objetivoId: 'obj-6',
    unidadeId: 'DETEC',
    meta: 92,
    realizado: 89.4,
    linhaDeBase: 82.0,
    unidadeMedida: '%',
    polaridade: 'MAIOR_MELHOR',
    frequencia: 'TRIMESTRAL',
    status: 'NO_RUMO',
    responsavel: 'Núcleo de Avaliação Pedagógica',
    ultimaAtualizacao: '2026-Q3',
    historico: [
      { periodo: '2025-Q1', realizado: 84.1, meta: 88.0 },
      { periodo: '2025-Q2', realizado: 86.3, meta: 89.0 },
      { periodo: '2025-Q3', realizado: 87.5, meta: 90.0 },
      { periodo: '2025-Q4', realizado: 88.2, meta: 90.0 },
      { periodo: '2026-Q1', realizado: 88.8, meta: 91.0 },
      { periodo: '2026-Q2', realizado: 89.1, meta: 91.5 },
      { periodo: '2026-Q3', realizado: 89.4, meta: 92.0 }
    ]
  },
  {
    id: 'kpi-3',
    codigo: 'KPI-DETEC-03',
    nome: 'Atendimentos em Promoção Social e Cidadania Rural',
    descricao: 'Total de pessoas beneficiadas por ações preventivas de saúde, inclusão e qualidade de vida da família rural.',
    objetivoId: 'obj-4',
    unidadeId: 'DETEC',
    meta: 15000,
    realizado: 14820,
    linhaDeBase: 11300,
    unidadeMedida: 'atendimentos',
    polaridade: 'MAIOR_MELHOR',
    frequencia: 'TRIMESTRAL',
    status: 'EXCELENTE',
    responsavel: 'Coordenação de Promoção Social',
    ultimaAtualizacao: '2026-Q3',
    historico: [
      { periodo: '2025-Q1', realizado: 2800, meta: 2600 },
      { periodo: '2025-Q2', realizado: 6500, meta: 6200 },
      { periodo: '2025-Q3', realizado: 9800, meta: 9500 },
      { periodo: '2025-Q4', realizado: 13100, meta: 13000 },
      { periodo: '2026-Q1', realizado: 3900, meta: 3600 },
      { periodo: '2026-Q2', realizado: 8900, meta: 8500 },
      { periodo: '2026-Q3', realizado: 14820, meta: 15000 }
    ]
  },
  {
    id: 'kpi-4',
    codigo: 'KPI-DETEC-04',
    nome: 'Municípios Atendidos com Ações Estratégicas',
    descricao: 'Número de municípios rondonienses com pelo menos 3 ações do SENAR concluídas no ano.',
    objetivoId: 'obj-4',
    unidadeId: 'DETEC',
    meta: 52,
    realizado: 52,
    linhaDeBase: 46,
    unidadeMedida: 'municípios',
    polaridade: 'MAIOR_MELHOR',
    frequencia: 'ANUAL',
    status: 'EXCELENTE',
    responsavel: 'Coordenação Regional / Sindicatos Rurais',
    ultimaAtualizacao: '2026-Q3',
    historico: [
      { periodo: '2025-Q1', realizado: 38, meta: 40 },
      { periodo: '2025-Q2', realizado: 45, meta: 48 },
      { periodo: '2025-Q3', realizado: 49, meta: 50 },
      { periodo: '2025-Q4', realizado: 52, meta: 52 },
      { periodo: '2026-Q1', realizado: 44, meta: 45 },
      { periodo: '2026-Q2', realizado: 50, meta: 50 },
      { periodo: '2026-Q3', realizado: 52, meta: 52 }
    ]
  },
  {
    id: 'kpi-5',
    codigo: 'KPI-ATEG-01',
    nome: 'Propriedades Rurais Atendidas Ativamente na ATeG',
    descricao: 'Propriedades rurais sob acompanhamento técnico mensal contínuo em Rondônia.',
    objetivoId: 'obj-1',
    unidadeId: 'ATEG',
    meta: 6500,
    realizado: 6180,
    linhaDeBase: 4200,
    unidadeMedida: 'propriedades',
    polaridade: 'MAIOR_MELHOR',
    frequencia: 'MENSAL',
    status: 'NO_RUMO',
    responsavel: 'Gerência ATeG / Supervisores de Campo',
    ultimaAtualizacao: '2026-Q3',
    historico: [
      { periodo: '2025-Q1', realizado: 4300, meta: 4500 },
      { periodo: '2025-Q2', realizado: 4750, meta: 4900 },
      { periodo: '2025-Q3', realizado: 5120, meta: 5300 },
      { periodo: '2025-Q4', realizado: 5490, meta: 5600 },
      { periodo: '2026-Q1', realizado: 5780, meta: 5900 },
      { periodo: '2026-Q2', realizado: 6010, meta: 6200 },
      { periodo: '2026-Q3', realizado: 6180, meta: 6500 }
    ]
  },
  {
    id: 'kpi-6',
    codigo: 'KPI-SUP-01',
    nome: 'Net Promoter Score (NPS) do Produtor Rural',
    descricao: 'Índice geral de lealdade e recomendação dos serviços do SENAR pelos produtores rurais.',
    objetivoId: 'obj-2',
    unidadeId: 'SUPERINTENDENCIA',
    meta: 85,
    realizado: 91.2,
    linhaDeBase: 78.0,
    unidadeMedida: 'pontos',
    polaridade: 'MAIOR_MELHOR',
    frequencia: 'SEMESTRAL',
    status: 'EXCELENTE',
    responsavel: 'Superintendência / Ouvidoria FAPERON',
    ultimaAtualizacao: '2026-Q3',
    historico: [
      { periodo: '2025-Q1', realizado: 82.0, meta: 80.0 },
      { periodo: '2025-Q2', realizado: 84.5, meta: 82.0 },
      { periodo: '2025-Q3', realizado: 87.0, meta: 83.0 },
      { periodo: '2025-Q4', realizado: 88.5, meta: 84.0 },
      { periodo: '2026-Q1', realizado: 89.8, meta: 85.0 },
      { periodo: '2026-Q2', realizado: 90.5, meta: 85.0 },
      { periodo: '2026-Q3', realizado: 91.2, meta: 85.0 }
    ]
  },
  {
    id: 'kpi-7',
    codigo: 'KPI-ATEG-02',
    nome: 'Crescimento Médio da Margem Líquida da Propriedade',
    descricao: 'Evolução percentual da rentabilidade econômica líquida da atividade rural após 12 meses de ATeG.',
    objetivoId: 'obj-1',
    unidadeId: 'ATEG',
    meta: 25.0,
    realizado: 28.7,
    linhaDeBase: 12.0,
    unidadeMedida: '%',
    polaridade: 'MAIOR_MELHOR',
    frequencia: 'SEMESTRAL',
    status: 'EXCELENTE',
    responsavel: 'Coordenação Econômica SisATEG',
    ultimaAtualizacao: '2026-Q3',
    historico: [
      { periodo: '2025-Q1', realizado: 18.2, meta: 18.0 },
      { periodo: '2025-Q2', realizado: 21.4, meta: 20.0 },
      { periodo: '2025-Q3', realizado: 23.9, meta: 22.0 },
      { periodo: '2025-Q4', realizado: 25.1, meta: 24.0 },
      { periodo: '2026-Q1', realizado: 26.8, meta: 24.5 },
      { periodo: '2026-Q2', realizado: 27.9, meta: 25.0 },
      { periodo: '2026-Q3', realizado: 28.7, meta: 25.0 }
    ]
  },
  {
    id: 'kpi-8',
    codigo: 'KPI-DETEC-05',
    nome: 'Horas de Atualização Técnica Continuada dos Instrutores',
    descricao: 'Média de horas anuais dedicadas a reciclagem e certificação dos instrutores credenciados.',
    objetivoId: 'obj-3',
    unidadeId: 'DETEC',
    meta: 80,
    realizado: 84,
    linhaDeBase: 48,
    unidadeMedida: 'horas/instrutor',
    polaridade: 'MAIOR_MELHOR',
    frequencia: 'ANUAL',
    status: 'EXCELENTE',
    responsavel: 'Coordenação Pedagógica DETEC',
    ultimaAtualizacao: '2026-Q3',
    historico: [
      { periodo: '2025-Q1', realizado: 18, meta: 20 },
      { periodo: '2025-Q2', realizado: 42, meta: 40 },
      { periodo: '2025-Q3', realizado: 65, meta: 60 },
      { periodo: '2025-Q4', realizado: 82, meta: 75 },
      { periodo: '2026-Q1', realizado: 24, meta: 20 },
      { periodo: '2026-Q2', realizado: 55, meta: 50 },
      { periodo: '2026-Q3', realizado: 84, meta: 80 }
    ]
  },
  {
    id: 'kpi-9',
    codigo: 'KPI-DAF-01',
    nome: 'Taxa de Digitalização dos Relatórios e Processos de Campo',
    descricao: 'Percentual de relatórios de visita técnica e turmas de FPR submetidos e validados 100% via plataforma digital/mobile.',
    objetivoId: 'obj-4',
    unidadeId: 'DAF',
    meta: 95.0,
    realizado: 88.5,
    linhaDeBase: 54.0,
    unidadeMedida: '%',
    polaridade: 'MAIOR_MELHOR',
    frequencia: 'MENSAL',
    status: 'ATENCAO',
    responsavel: 'Divisão de TI / DAF',
    ultimaAtualizacao: '2026-Q3',
    historico: [
      { periodo: '2025-Q1', realizado: 62.0, meta: 70.0 },
      { periodo: '2025-Q2', realizado: 71.5, meta: 78.0 },
      { periodo: '2025-Q3', realizado: 79.0, meta: 85.0 },
      { periodo: '2025-Q4', realizado: 82.5, meta: 90.0 },
      { periodo: '2026-Q1', realizado: 85.0, meta: 92.0 },
      { periodo: '2026-Q2', realizado: 86.8, meta: 94.0 },
      { periodo: '2026-Q3', realizado: 88.5, meta: 95.0 }
    ]
  },
  {
    id: 'kpi-10',
    codigo: 'KPI-DAF-02',
    nome: 'Índice de Execução Orçamentária em Processos Finalísticos',
    descricao: 'Percentual do orçamento total executado estritamente nas pontas (FPR, PS, ATeG e Ensino Técnico) versus custos de meio.',
    objetivoId: 'obj-3',
    unidadeId: 'DAF',
    meta: 82.0,
    realizado: 84.6,
    linhaDeBase: 76.0,
    unidadeMedida: '%',
    polaridade: 'MAIOR_MELHOR',
    frequencia: 'TRIMESTRAL',
    status: 'EXCELENTE',
    responsavel: 'Divisão Orçamentária e Financeira / DAF',
    ultimaAtualizacao: '2026-Q3',
    historico: [
      { periodo: '2025-Q1', realizado: 78.5, meta: 78.0 },
      { periodo: '2025-Q2', realizado: 80.2, meta: 79.5 },
      { periodo: '2025-Q3', realizado: 81.8, meta: 80.0 },
      { periodo: '2025-Q4', realizado: 83.2, meta: 81.0 },
      { periodo: '2026-Q1', realizado: 83.5, meta: 81.5 },
      { periodo: '2026-Q2', realizado: 84.1, meta: 82.0 },
      { periodo: '2026-Q3', realizado: 84.6, meta: 82.0 }
    ]
  }
];

export const PLANOS_ACAO: PlanoAcao5W2H[] = [
  // 1. SUPERINTENDÊNCIA
  {
    id: 'pa-1',
    codigo: 'PA-SUP-01',
    titulo: 'Pacto Estadual de Modernização da Cafeicultura Robusta Amazônica',
    objetivoId: 'obj-1',
    unidadeResponsavel: 'SUPERINTENDENCIA',
    oQue: 'Articulação interinstitucional com Governo de RO, EMBRAPA e Cooperativas para fomento dos cafés finos amazônicos.',
    porQue: 'A cafeicultura sustentável é carro-chefe de exportação e gera agregação de valor direta ao produtor familiar.',
    onde: 'Polo Regional de Cacoal, Rolim de Moura e Zona da Mata rondoniense.',
    quem: 'Dr. Emerson Lira (Superintendente) e Assessoria de Relações Institucionais.',
    quandoInicio: '2025-02-01',
    quandoFim: '2026-11-30',
    como: 'Acordos de cooperação técnica, subsídios de certificação sustentável e participação em feiras nacionais (Semana Internacional do Café).',
    quantoCusta: 1850000,
    progressoPercentual: 85,
    status: 'EM_ANDAMENTO',
    marcosPrincipais: [
      { descricao: 'Assinatura do Memorando de Entendimento Tripartite', concluido: true, dataLimite: '2025-04-15' },
      { descricao: 'Lançamento do Selo de Indicação Geográfica Matas de Rondônia', concluido: true, dataLimite: '2025-09-20' },
      { descricao: 'Rodada Internacional de Negócios e Exportação', concluido: false, dataLimite: '2026-10-15' }
    ]
  },
  {
    id: 'pa-2',
    codigo: 'PA-SUP-02',
    titulo: 'Fortalecimento da Rede Sindical e Governança do Sistema FAPERON/SENAR',
    objetivoId: 'obj-2',
    unidadeResponsavel: 'SUPERINTENDENCIA',
    oQue: 'Programa de modernização e digitalização das secretarias dos 52 Sindicatos Rurais filiados à FAPERON.',
    porQue: 'Garantir que as demandas do homem do campo cheguem com agilidade e integridade aos planejamentos do SENAR.',
    onde: 'Sindicatos Rurais de todo o estado de Rondônia.',
    quem: 'Coordenação Sindical e Ouvidoria.',
    quandoInicio: '2025-03-01',
    quandoFim: '2026-12-15',
    como: 'Instalação de pontos digitais de autoatendimento, capacitação de líderes sindicais e encontros regionais trimestrais.',
    quantoCusta: 920000,
    progressoPercentual: 90,
    status: 'EM_ANDAMENTO',
    marcosPrincipais: [
      { descricao: 'Censo de Conectividade e Infraestrutura Sindical', concluido: true, dataLimite: '2025-06-30' },
      { descricao: 'Entrega de kits tecnológicos aos sindicatos do interior', concluido: true, dataLimite: '2025-11-30' },
      { descricao: 'Encontro Estadual de Lideranças Rurais de Rondônia', concluido: false, dataLimite: '2026-11-20' }
    ]
  },

  // 2. DAF (Departamento Administrativo e Financeiro)
  {
    id: 'pa-3',
    codigo: 'PA-DAF-01',
    titulo: 'Implementação da Arquitetura de Nuvem Estratégica (GCP + BigQuery + Gemini AI)',
    objetivoId: 'obj-4',
    unidadeResponsavel: 'DAF',
    oQue: 'Construção da esteira analítica em Google Cloud Platform integrando SisATEG, ERP e dados de capacitação.',
    porQue: 'Substituir planilhas dispersas por governança em Data Warehouse com relatórios automatizados e projeções preditivas.',
    onde: 'Sede Administrativa em Porto Velho e acessos remotos via web/mobile.',
    quem: 'Dra. Vanessa Mendonça (Chefe DAF) e Equipe de Engenharia de Dados.',
    quandoInicio: '2025-01-15',
    quandoFim: '2026-10-31',
    como: 'Contratação de instâncias GCP, pipeline de ingestão segura de dados, modelagem Star Schema e integração de APIs REST.',
    quantoCusta: 1450000,
    progressoPercentual: 80,
    status: 'EM_ANDAMENTO',
    marcosPrincipais: [
      { descricao: 'Data Lakehouse estruturado no BigQuery com particionamento', concluido: true, dataLimite: '2025-08-30' },
      { descricao: 'Conexão dos pipelines dos 4 Processos Finalísticos', concluido: true, dataLimite: '2026-03-31' },
      { descricao: 'Motor de Insights Preditivos com Gemini API e visualização 3D', concluido: false, dataLimite: '2026-10-25' }
    ]
  },
  {
    id: 'pa-4',
    codigo: 'PA-DAF-02',
    titulo: 'Plano de Racionalização de Custos e Alocação Máxima na Ponta Produtiva',
    objetivoId: 'obj-3',
    unidadeResponsavel: 'DAF',
    oQue: 'Revisão dos contratos de suprimentos, logística e locação com foco na migração orçamentária para custeio de ATeG e FPR.',
    porQue: 'Manter a diretriz de aplicar mais de 82% do orçamento institucional diretamente nas atividades finalísticas de campo.',
    onde: 'Todas as unidades operacionais e polos regionais.',
    quem: 'Coordenação Orçamentária e Compras.',
    quandoInicio: '2025-01-02',
    quandoFim: '2026-12-31',
    como: 'Implementação de pregão eletrônico, auditoria prévia e automação de pagamentos a técnicos e instrutores.',
    quantoCusta: 380000,
    progressoPercentual: 95,
    status: 'EM_ANDAMENTO',
    marcosPrincipais: [
      { descricao: 'Auditoria de contratos de médio e grande porte', concluido: true, dataLimite: '2025-05-15' },
      { descricao: 'Implantação do módulo de medição eletrônica de prestação de contas', concluido: true, dataLimite: '2025-10-30' },
      { descricao: 'Relatório Anual de Sustentabilidade Fiscal para o TCU', concluido: false, dataLimite: '2026-12-10' }
    ]
  },

  // 3. DETEC (Departamento Técnico)
  {
    id: 'pa-5',
    codigo: 'PA-DETEC-01',
    titulo: 'Expansão da Formação em Tecnologias de Precisão e Mecanização Avançada',
    objetivoId: 'obj-1',
    unidadeResponsavel: 'DETEC',
    oQue: 'Aquisição de simuladores de tratores agrícolas, drones certificados para mapeamento e novos cursos de agricultura digital.',
    porQue: 'A nova fronteira agrícola de Rondônia exige operadores qualificados em GPS, telemetria e pulverização inteligente.',
    onde: 'Polos de Vilhena, Ji-Paraná, Ariquemes e Porto Velho.',
    quem: 'Eng. Agrônomo Marcelo Carvalho e Coordenação de FPR.',
    quandoInicio: '2025-02-15',
    quandoFim: '2026-11-20',
    como: 'Credenciamento de instrutores especialistas, aquisição de equipamentos móveis e parcerias com revendas de máquinas.',
    quantoCusta: 2900000,
    progressoPercentual: 75,
    status: 'EM_ANDAMENTO',
    marcosPrincipais: [
      { descricao: 'Aprovação das ementas pedagógicas pelo Conselho Regional', concluido: true, dataLimite: '2025-06-15' },
      { descricao: 'Capacitação inicial dos 30 instrutores máster em drones agro', concluido: true, dataLimite: '2025-11-15' },
      { descricao: 'Formação de 120 turmas práticas em 40 municípios', concluido: false, dataLimite: '2026-10-30' }
    ]
  },
  {
    id: 'pa-6',
    codigo: 'PA-DETEC-02',
    titulo: 'Programa Caravana da Saúde do Produtor e Promoção Social Familiar',
    objetivoId: 'obj-1',
    unidadeResponsavel: 'DETEC',
    oQue: 'Unidades móveis multidisciplinares oferecendo exames de saúde preventiva, odontologia, palestras de ergonomia rural e cidadania.',
    porQue: 'A saúde preventiva do produtor e da trabalhadora rural evita afastamentos no trabalho e promove bem-estar e dignidade.',
    onde: 'Distritos e assentamentos rurais nos 52 municípios.',
    quem: 'Coordenação de Promoção Social e profissionais de saúde conveniados.',
    quandoInicio: '2025-03-10',
    quandoFim: '2026-12-05',
    como: 'Cronograma itinerante com carretas adaptadas em parceria com prefeituras e sindicatos rurais.',
    quantoCusta: 2150000,
    progressoPercentual: 88,
    status: 'EM_ANDAMENTO',
    marcosPrincipais: [
      { descricao: 'Reforma e homologação sanitária das unidades móveis', concluido: true, dataLimite: '2025-05-30' },
      { descricao: 'Atendimento de 8.000 produtores na 1ª fase', concluido: true, dataLimite: '2025-12-15' },
      { descricao: 'Conclusão da 2ª fase com 15.000 atendimentos somados', concluido: false, dataLimite: '2026-11-30' }
    ]
  },

  // 4. ATEG (Gerência de Assistência Técnica e Gerencial)
  {
    id: 'pa-7',
    codigo: 'PA-ATEG-01',
    titulo: 'Expansão da Rede ATeG Leite e Corte para 6.500 Propriedades em Rondônia',
    objetivoId: 'obj-1',
    unidadeResponsavel: 'ATEG',
    oQue: 'Contratação e alocação de 80 novos técnicos de campo para atendimento mensal contínuo aos pecuaristas familiares.',
    porQue: 'Rondônia é área livre de febre aftosa sem vacinação e possui imenso potencial de produtividade por hectare e pastejo rotacionado.',
    onde: 'Bacia Leiteira de Jaru, Ouro Preto do Oeste, São Miguel do Guaporé e Alta Floresta d\'Oeste.',
    quem: 'Esp. Renata Fontenelle e Equipe de Supervisão ATeG.',
    quandoInicio: '2025-01-20',
    quandoFim: '2026-11-30',
    como: 'Edital público de credenciamento técnico, nivelamento metodológico SisATEG e início das visitas diagnósticas.',
    quantoCusta: 5400000,
    progressoPercentual: 82,
    status: 'EM_ANDAMENTO',
    marcosPrincipais: [
      { descricao: 'Credenciamento e treinamento intensivo de 80 técnicos', concluido: true, dataLimite: '2025-04-30' },
      { descricao: 'Conclusão do Diagnóstico Produtivo Individualizado de 6.000 propriedades', concluido: true, dataLimite: '2026-02-28' },
      { descricao: 'Balanço comparativo de margem líquida e produção por matriz', concluido: false, dataLimite: '2026-10-31' }
    ]
  },
  {
    id: 'pa-8',
    codigo: 'PA-ATEG-02',
    titulo: 'Implantação da Unidade Piloto de Agrotecnologia e Métricas Zootécnicas em Tempo Real',
    objetivoId: 'obj-4',
    unidadeResponsavel: 'ATEG',
    oQue: 'Instalação de balanças eletrônicas conectadas e sensores meteorológicos em 50 propriedades vitrine da ATeG.',
    porQue: 'Gerar dados comprobatórios em tempo real para dias de campo, acelerando a adoção de boas práticas pelo produtor vizinho.',
    onde: 'Propriedades modelo distribuídas nas 4 mesorregiões de Rondônia.',
    quem: 'Supervisores Técnicos ATeG e Consultores Especialistas.',
    quandoInicio: '2025-04-01',
    quandoFim: '2026-12-15',
    como: 'Termos de adesão com produtores líderes de referência, instalação de kits IOT e painéis públicos de benchmarking.',
    quantoCusta: 860000,
    progressoPercentual: 68,
    status: 'EM_RISCO',
    marcosPrincipais: [
      { descricao: 'Seleção das 50 propriedades vitrine participantes', concluido: true, dataLimite: '2025-08-30' },
      { descricao: 'Recebimento e calibração dos equipamentos de pesagem inteligente', concluido: false, dataLimite: '2026-06-30' },
      { descricao: 'Realização de 4 Dias de Campo Regionais com dados ao vivo', concluido: false, dataLimite: '2026-11-15' }
    ]
  }
];

export const USUARIOS_DEMO: UsuarioAutenticado[] = [
  {
    id: 'user-1',
    nome: 'Dr. Emerson Lira',
    email: 'superintendencia@senar-ro.org.br',
    cargo: 'Superintendente Regional',
    role: 'SUPERINTENDENCIA',
    unidade: 'SUPERINTENDENCIA'
  },
  {
    id: 'user-2',
    nome: 'Dra. Vanessa Mendonça',
    email: 'vanessa.daf@senar-ro.org.br',
    cargo: 'Chefe do DAF',
    role: 'GESTOR_DAF',
    unidade: 'DAF'
  },
  {
    id: 'user-3',
    nome: 'Eng. Marcelo Carvalho',
    email: 'marcelo.detec@senar-ro.org.br',
    cargo: 'Chefe do DETEC',
    role: 'GESTOR_DETEC',
    unidade: 'DETEC'
  },
  {
    id: 'user-4',
    nome: 'Esp. Renata Fontenelle',
    email: 'renata.ateg@senar-ro.org.br',
    cargo: 'Gerente da ATeG',
    role: 'GESTOR_ATEG',
    unidade: 'ATEG'
  },
  {
    id: 'user-5',
    nome: 'Visitante Institucional',
    email: 'visitante@agro.org.br',
    cargo: 'Cidadão / Produtor Rural',
    role: 'VISITANTE_PUBLICO',
    unidade: 'SUPERINTENDENCIA'
  }
];

// Documentação Técnica Formal e Esquemas exigidos nos Entregáveis A, B, C e D
export const ESPECIFICACOES_TECNICAS = {
  // A) Modelagem de Banco de Dados
  ddlPostgreSql: `-- ====================================================================
-- BANCO DE DADOS: senar_rondonia_bsc
-- SGBD: PostgreSQL 16+ / Google Cloud SQL
-- ARQUITETURA: Balanced Scorecard (BSC) Estratégico & Cadeia de Valor SENAR-AR/RO
-- ====================================================================

CREATE SCHEMA IF NOT EXISTS bsc_gestao;
SET search_path TO bsc_gestao, public;

-- 1. Tabela de Unidades Organizacionais (Superintendência, DAF, DETEC, ATeG)
CREATE TABLE unidades_organizacionais (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sigla VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(150) NOT NULL,
    responsavel_nome VARCHAR(120) NOT NULL,
    responsavel_cargo VARCHAR(100) NOT NULL,
    descricao TEXT,
    orcamento_anual NUMERIC(15,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Perspectivas do BSC
CREATE TYPE perspectiva_bsc_enum AS ENUM (
    'FINANCEIRA', 
    'CLIENTES_SOCIEDADE', 
    'PROCESSOS_INTERNOS', 
    'APRENDIZADO_CRESCIMENTO'
);

-- 3. Tabela de Macroprocessos da Cadeia de Valor (4 Processos Finalísticos)
CREATE TABLE processos_finalisticos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(20) NOT NULL UNIQUE,
    sigla VARCHAR(20) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    publico_alvo TEXT NOT NULL,
    missao_processo TEXT NOT NULL,
    icone_lucide VARCHAR(50) DEFAULT 'Award',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Objetivos Estratégicos (Mapa Estratégico BSC)
CREATE TYPE status_estrategico_enum AS ENUM ('EXCELENTE', 'NO_RUMO', 'ATENCAO', 'CRITICO');

CREATE TABLE objetivos_estrategicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(20) NOT NULL UNIQUE,
    perspectiva perspectiva_bsc_enum NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    unidade_lider_id UUID NOT NULL REFERENCES unidades_organizacionais(id),
    processo_finalistico_id UUID REFERENCES processos_finalisticos(id),
    progresso_percentual NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    status status_estrategico_enum NOT NULL DEFAULT 'NO_RUMO',
    impacto_estrategico TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Relações de Causa e Efeito (Diagrama BSC)
CREATE TABLE causa_efeito_objetivos (
    objetivo_origem_id UUID NOT NULL REFERENCES objetivos_estrategicos(id) ON DELETE CASCADE,
    objetivo_impactado_id UUID NOT NULL REFERENCES objetivos_estrategicos(id) ON DELETE CASCADE,
    PRIMARY KEY (objetivo_origem_id, objetivo_impactado_id)
);

-- 6. Tabela de Indicadores de Desempenho (KPIs)
CREATE TYPE polaridade_kpi_enum AS ENUM ('MAIOR_MELHOR', 'MENOR_MELHOR');
CREATE TYPE frequencia_kpi_enum AS ENUM ('MENSAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL');

CREATE TABLE indicadores_kpi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(30) NOT NULL UNIQUE,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    objetivo_id UUID NOT NULL REFERENCES objetivos_estrategicos(id) ON DELETE RESTRICT,
    unidade_id UUID NOT NULL REFERENCES unidades_organizacionais(id),
    meta NUMERIC(15,2) NOT NULL,
    realizado_atual NUMERIC(15,2) NOT NULL DEFAULT 0.00,
    linha_de_base NUMERIC(15,2) NOT NULL DEFAULT 0.00,
    unidade_medida VARCHAR(30) NOT NULL,
    polaridade polaridade_kpi_enum NOT NULL DEFAULT 'MAIOR_MELHOR',
    frequencia frequencia_kpi_enum NOT NULL DEFAULT 'TRIMESTRAL',
    status status_estrategico_enum NOT NULL DEFAULT 'NO_RUMO',
    responsavel_medicao VARCHAR(120) NOT NULL,
    ultima_atualizacao DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tabela de Histórico e Medições Temporais de KPIs (alimenta BigQuery / BI)
CREATE TABLE medicoes_historicas_kpi (
    id BIGSERIAL PRIMARY KEY,
    indicador_id UUID NOT NULL REFERENCES indicadores_kpi(id) ON DELETE CASCADE,
    periodo VARCHAR(10) NOT NULL, -- Ex: '2026-Q1'
    data_apuracao DATE NOT NULL,
    valor_realizado NUMERIC(15,2) NOT NULL,
    valor_meta NUMERIC(15,2) NOT NULL,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_kpi_periodo UNIQUE(indicador_id, periodo)
);

-- 8. Tabela de Planos de Ação (Metodologia 5W2H)
CREATE TYPE status_plano_acao_enum AS ENUM ('PLANEJADO', 'EM_ANDAMENTO', 'CONCLUIDO', 'EM_RISCO');

CREATE TABLE planos_acao_5w2h (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(30) NOT NULL UNIQUE,
    titulo VARCHAR(255) NOT NULL,
    objetivo_id UUID NOT NULL REFERENCES objetivos_estrategicos(id),
    unidade_responsavel_id UUID NOT NULL REFERENCES unidades_organizacionais(id),
    o_que TEXT NOT NULL,          -- What
    por_que TEXT NOT NULL,        -- Why
    onde TEXT NOT NULL,           -- Where
    quem VARCHAR(150) NOT NULL,   -- Who
    quando_inicio DATE NOT NULL,  -- When Start
    quando_fim DATE NOT NULL,     -- When End
    como TEXT NOT NULL,           -- How
    quanto_custa NUMERIC(15,2) NOT NULL DEFAULT 0.00, -- How Much
    progresso_percentual NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    status status_plano_acao_enum NOT NULL DEFAULT 'PLANEJADO',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Tabela de Marcos/Entregas dos Planos de Ação
CREATE TABLE marcos_plano_acao (
    id BIGSERIAL PRIMARY KEY,
    plano_acao_id UUID NOT NULL REFERENCES planos_acao_5w2h(id) ON DELETE CASCADE,
    descricao VARCHAR(255) NOT NULL,
    data_limite DATE NOT NULL,
    concluido BOOLEAN NOT NULL DEFAULT FALSE,
    concluido_em TIMESTAMP WITH TIME ZONE
);

-- 10. Segurança, Usuários e Auditoria RBAC
CREATE TYPE role_usuario_enum AS ENUM (
    'SUPERINTENDENCIA', 
    'GESTOR_DETEC', 
    'GESTOR_ATEG', 
    'GESTOR_DAF', 
    'VISITANTE_PUBLICO'
);

CREATE TABLE usuarios_sistema (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    role role_usuario_enum NOT NULL DEFAULT 'VISITANTE_PUBLICO',
    unidade_id UUID REFERENCES unidades_organizacionais(id),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    ultimo_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trilha_auditoria (
    id BIGSERIAL PRIMARY KEY,
    usuario_id UUID REFERENCES usuarios_sistema(id),
    tabela_afetada VARCHAR(60) NOT NULL,
    operacao VARCHAR(20) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    registro_id UUID,
    dados_anteriores JSONB,
    dados_novos JSONB,
    ip_origem VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices de Alta Performance
CREATE INDEX idx_kpi_objetivo ON indicadores_kpi(objetivo_id);
CREATE INDEX idx_kpi_unidade ON indicadores_kpi(unidade_id);
CREATE INDEX idx_medicoes_kpi_periodo ON medicoes_historicas_kpi(indicador_id, periodo);
CREATE INDEX idx_planos_unidade ON planos_acao_5w2h(unidade_responsavel_id);
CREATE INDEX idx_planos_status ON planos_acao_5w2h(status);`,

  // B) Estrutura Frontend (React / Tailwind)
  frontendArchitectureMarkdown: `### Estrutura de Componentes Frontend (React / TypeScript / Tailwind CSS)

\`\`\`
src/
├── components/
│   ├── layout/
│   │   ├── HeaderFixed.tsx         # Cabeçalho fixo no topo com navegação âncora e smooth scroll
│   │   ├── FooterInstitutional.tsx # Rodapé governamental SENAR-RO / FAPERON com transparência
│   │   └── ZebraSection.tsx        # Wrapper de seções alternadas (White vs. Light Green/Muted Slate)
│   ├── sections/
│   │   ├── HeroProposito.tsx       # 1. Missão, Visão e Valores institucionais com hero imagery
│   │   ├── CadeiaValor3D.tsx       # 2. Fluxo dos 4 Processos Finalísticos (FPR, PS, ATeG, Inovação)
│   │   ├── MapaEstrategicoBSC.tsx  # 3. Diagrama do Mapa BSC interativo com conexões de causa e efeito
│   │   ├── KpiDashboard.tsx        # 4. Dashboards de KPIs com mini-gráficos temporais e filtros
│   │   ├── PlanosAcaoUnidade.tsx   # 5. Planos de Ação 5W2H por unidade do organograma
│   │   ├── PainelGeminiAI.tsx      # 6. Diagnóstico Estratégico com Gemini API (@google/genai)
│   │   └── GestaoCmsModal.tsx      # 7. Painel CMS simplificado para CRUD de metas, KPIs e planos
│   ├── modals/
│   │   ├── ObjetivoPopoverModal.tsx# Popover avançado de detalhes e histórico do objetivo
│   │   ├── AuthModal.tsx           # Login JWT com simulação de perfis RBAC
│   │   └── TechSpecsDrawer.tsx     # Visualizador interativo de DDL, Schemas JSON e APIs
│   └── ui/
│       ├── MiniSparklineChart.tsx  # Gráficos SVG interativos para séries temporais de KPIs
│       └── StatusBadge.tsx         # Indicadores visuais acessíveis com ícones e rótulos
\`\`\`

#### Diretrizes Implementadas:
1. **Navegação Âncora Suave**: Header com \`position: fixed; z-index: 50\` com \`scroll-behavior: smooth\` e compensação de \`scroll-margin-top: 5rem\`.
2. **Efeito Zebra Striping**: Seções intercaladas entre \`bg-white\` e \`bg-[#f8faf8] / bg-emerald-50/30\`.
3. **Interatividade BSC**: Clique nos nós do Mapa Estratégico abre popovers avançados com métricas e histórico real.
4. **Sem Badges Clichês**: Tipografia cristalina, 60-30-10 de cores institucionais do SENAR.`,

  // C) Payload de API (JSON Schemas)
  apiSchemas: {
    getCadeiaValorProcessos: {
      endpoint: "GET /api/cadeia-valor/processos",
      descricao: "Lista os 4 macroprocessos finalísticos essenciais da Cadeia de Valor do SENAR-AR/RO.",
      exemploResponse: {
        status: "success",
        total: 4,
        processos: [
          {
            id: "proc-1",
            codigo: "PF-01",
            sigla: "FPR",
            nome: "Formação Profissional Rural",
            publicoAlvo: "Produtores rurais, trabalhadores do campo e jovens rurais.",
            missaoDoProcesso: "Desenvolver competências técnico-operacionais para elevar a competitividade.",
            atividadesChave: ["Diagnóstico de demandas municipais", "Treinamentos de NR-31 e Mecanização"],
            metasGerais: ["Capacitar mais de 28.000 profissionais", "Cobertura em todos os 52 municípios"]
          }
        ]
      }
    },
    postProcessoFinalistico: {
      endpoint: "POST /api/cadeia-valor/processos",
      descricao: "Cadastra ou atualiza um processo finalístico na Cadeia de Valor através do CMS institucional (Requer perfil de Gestor).",
      payloadRequest: {
        codigo: "PF-05",
        sigla: "AGRO-TECH",
        nome: "Inovação Agrotecnológica & Bioeconomia",
        descricao: "Fomento a startups agritech e transição energética no agro amazônico.",
        publicoAlvo: "Cooperativas, técnicos e produtores rurais.",
        missaoDoProcesso: "Acelerar a adoção de tecnologias de baixo carbono no campo.",
        atividadesChave: [
          "Mapeamento de desafios do agronegócio rondoniense",
          "Pilotos em propriedades rurais assistidas pela ATeG"
        ],
        metasGerais: [
          "15 soluções de inteligência artificial aplicadas ao campo até 2030"
        ]
      }
    },
    getStrategicData: {
      endpoint: "GET /api/strategic-data",
      descricao: "Retorna a estrutura completa do Planejamento Estratégico, BSC, KPIs e Planos de Ação.",
      exemploResponse: {
        timestamp: "2026-10-10T14:30:00Z",
        versaoCiclo: "2027-2030",
        unidades: [
          {
            sigla: "SUPERINTENDENCIA",
            nome: "Superintendência Regional",
            responsavel: "Dr. Emerson Lira",
            orcamentoAno: 12500000
          }
        ],
        processosFinalisticos: [
          {
            codigo: "PF-01",
            sigla: "FPR",
            nome: "Formação Profissional Rural",
            metasGerais: ["Capacitar mais de 28.000 profissionais em 2026"]
          }
        ],
        perspectivasBsc: ["FINANCEIRA", "CLIENTES_SOCIEDADE", "PROCESSOS_INTERNOS", "APRENDIZADO_CRESCIMENTO"],
        objetivos: [
          {
            id: "obj-1",
            codigo: "OE-01",
            perspectiva: "FINANCEIRA",
            titulo: "Garantir a Sustentabilidade e Eficiência Orçamentária",
            unidadeLider: "DAF",
            progressoPercentual: 92,
            status: "EXCELENTE"
          }
        ],
        kpis: [
          {
            codigo: "KPI-ATEG-01",
            nome: "Propriedades Rurais Atendidas Ativamente na ATeG",
            meta: 6500,
            realizado: 6180,
            unidadeMedida: "propriedades",
            historico: [
              { periodo: "2026-Q1", realizado: 5780, meta: 5900 },
              { periodo: "2026-Q2", realizado: 6010, meta: 6200 },
              { periodo: "2026-Q3", realizado: 6180, meta: 6500 }
            ]
          }
        ]
      }
    },
    postPlanoAcao: {
      endpoint: "POST /api/action-plans",
      descricao: "Cria um novo plano de ação 5W2H vinculado a um objetivo estratégico (Requer autenticação JWT).",
      payloadRequest: {
        codigo: "PA-DETEC-03",
        titulo: "Capacitação em Boas Práticas Agrícolas para Cacauicultores",
        objetivoId: "obj-5",
        unidadeResponsavel: "DETEC",
        oQue: "Implementação de 40 turmas de manejo sustentável da vassoura de bruxa no cacau.",
        porQue: "Aumentar a produtividade por hectare e sanidade das lavouras em Rondônia.",
        onde: "Vale do Jamari e Ouro Preto do Oeste.",
        quem: "Eng. Agrônomo Marcelo Carvalho",
        quandoInicio: "2026-11-01",
        quandoFim: "2027-05-30",
        como: "Dias de campo, fornecimento de mudas clonais e acompanhamento técnico.",
        quantoCusta: 650000,
        status: "PLANEJADO"
      }
    },
    postGeminiAnalysis: {
      endpoint: "POST /api/gemini/strategic-analysis",
      descricao: "Submete os dados consolidados do BSC ao modelo Gemini 3.8 Flash para auditoria preditiva e recomendações.",
      payloadRequest: {
        perspectivaFiltro: "TODAS",
        incluirPlanosEmRisco: true
      },
      exemploResponse: {
        indiceSaudeEstrategica: 88,
        titulo: "Diagnóstico Executivo do Plano Estratégico SENAR-RO 2026",
        diagnosticoGeral: "A execução orçamentária e a expansão da ATeG apresentam excelente aderência às metas fiscais...",
        alertasCriticos: [
          {
            entidade: "PA-ATEG-02: Unidade Piloto de Agrotecnologia",
            desvio: "Atraso no recebimento de sensores de pesagem eletrônica inteligente.",
            recomendacao: "Reunir o comitê de compras do DAF para revisão do prazo de entrega do fornecedor."
          }
        ],
        prioridadesImediatas: [
          "Acelerar homologação digital da plataforma mobile de campo",
          "Garantir fechamento da safra cafeeira com publicação dos dados zootécnicos"
        ]
      }
    }
  },

  // D) Segurança & Matriz RBAC
  segurancaERbac: {
    mecanismoAutenticacao: "JSON Web Token (JWT) com assinatura HMAC-SHA256 e Access + Refresh Tokens",
    tempoExpiracaoToken: "Access Token: 30 minutos | Refresh Token: 7 dias",
    fluxoCabecalho: "Authorization: Bearer <jwt_access_token>",
    matrizPermissoes: [
      {
        perfil: "SUPERINTENDENCIA",
        descricao: "Superintendente Regional e Conselho Administrativo",
        permissoes: ["* (Acesso Total)", "Aprovar Planos de Ação", "Editar Objetivos", "Editar Metas de KPIs", "Executar IA"]
      },
      {
        perfil: "GESTOR_DETEC",
        descricao: "Chefe do DETEC e Coordenação Pedagógica",
        permissoes: ["CRUD Planos de Ação DETEC", "Lançar Medições de FPR e PS", "Visualizar Todos os Indicadores"]
      },
      {
        perfil: "GESTOR_ATEG",
        descricao: "Gerente e Supervisores da ATeG",
        permissoes: ["CRUD Planos de Ação ATeG", "Lançar Medições de Produtores e Visitas", "Exportar Relatórios SisATEG"]
      },
      {
        perfil: "GESTOR_DAF",
        descricao: "Chefe do DAF e Controladoria",
        permissoes: ["CRUD Planos de Ação DAF", "Lançar Execução Orçamentária", "Gerenciar Contratos e Usuários"]
      },
      {
        perfil: "VISITANTE_PUBLICO",
        descricao: "Produtores, Alunos e Cidadãos",
        permissoes: ["Leitura Pública do Mapa BSC", "Consulta de Indicadores", "Visualização da Cadeia de Valor"]
      }
    ]
  }
};

export const INSIGHT_INICIAL_ESTRATEGICO: import('../types/strategic').InsightEstrategicoIA = {
  titulo: 'Diagnóstico Estratégico Executivo SENAR-AR/RO (Ciclo 2027-2030)',
  diagnosticoGeral: `O Planejamento Estratégico do SENAR-AR/RO para o novo ciclo 2027-2030 demonstra solidez e maturidade operacional, com ampla maioria dos indicadores em faixa de excelência e pleno alinhamento às diretrizes da FAPERON. A assistência técnica contínua e a interiorização nos 52 municípios garantem capilaridade decisiva para o agronegócio de Rondônia.

O painel aponta oportunidade de aceleração na modernização digital integrada entre campo e sede, com foco na infraestrutura analítica do BigQuery e no cumprimento tempestivo das metas de equipamentos de precisão da ATeG.`,
  alertasCriticos: [
    {
      entidade: 'PA-ATEG-02: Unidade Piloto de Agrotecnologia',
      desvio: 'Homologação e aquisição de balanças e sensores de conectividade rural demandando alinhamento com fornecedores.',
      recomendacao: 'Comitê integrado entre DAF e Gerência ATeG para revisão ágil do cronograma de entregas.'
    },
    {
      entidade: 'KPI-DAF-01: Taxa de Digitalização dos Processos de Campo',
      desvio: 'Oscilações de sinal em regiões isoladas afetam a sincronização em tempo real das visitas.',
      recomendacao: 'Priorizar sincronização inteligente em segundo plano e apoio presencial nos Sindicatos Rurais.'
    }
  ],
  oportunidadesAgro: [
    'Consolidação da Indicação Geográfica (IG) dos Cafés Robustas Amazônicos de Rondônia.',
    'Sustentabilidade e rastreabilidade na pecuária com certificação internacional sem vacinação.',
    'Expansão das turmas técnicas de mecanização de precisão e drones pelo DETEC.'
  ],
  prioridadesImediatas: [
    'Validar o plano de trabalho anual junto ao Conselho da FAPERON para o ciclo 2027-2030.',
    'Garantir alocação orçamentária dos 80 novos técnicos de campo para a ATeG.',
    'Apresentar balanço semestral de resultados econômicos aos produtores assistidos.'
  ],
  indiceSaudeEstrategica: 92,
  dataGeracao: new Date().toISOString(),
  fonte: 'Motor Analítico Estratégico SENAR-RO (Ciclo 2027-2030)'
};
