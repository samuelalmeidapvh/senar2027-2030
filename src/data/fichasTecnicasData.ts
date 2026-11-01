import { FichaTecnicaObjetivo } from '../types/strategic';

export const FICHAS_TECNICAS_INICIAIS: FichaTecnicaObjetivo[] = [
  // 1. FICHA TÉCNICA OFICIAL: OBJETIVO 04 - SEGURANÇA JURÍDICA, INTEGRIDADE E CONFORMIDADE (ACI)
  {
    id: 'ficha-oe-04-aci',
    codigoObjetivo: '04',
    nomeObjetivo: 'SEGURANÇA JURÍDICA, INTEGRIDADE E CONFORMIDADE',
    enunciado: 'Garantir a segurança jurídica, a integridade da gestão e assegurar a conformidade legal, ética e operacional da organização.',
    perspectivaBsc: 'PROCESSOS_INTERNOS',
    unidadeResponsavelLider: 'Assessoria de Controle Interno (ACI) - SENAR-AR/RO',
    unidadesParceiras: 'Setor Jurídico, DAF, DETEC, DATeG, Gestão de Pessoas (RH), TI, Comitê de Governança e Riscos e Conselho Fiscal',
    responsavelPreenchimento: 'Rafael Bezerra Ferreira de Araújo',
    cargoResponsavel: 'Assessor de Controle Interno',
    dataElaboracaoRevisao: 'Outubro de 2026 (Ciclo de Planejamento Estratégico 2027–2030)',
    diretrizesResultados: [
      'Aperfeiçoar a gestão de riscos e fortalecer a auditoria preventiva interna: Foco na evolução do nível de maturidade em gestão de riscos corporativos (COSO ERM 2017 e ISO 31000), superando a nota de maturidade estruturada (2,50/5,00) aferida no diagnóstico de 2026. Transição de controles reativos para um modelo proativo de consultoria interna (advisory) e mapeamento preventivo de vulnerabilidades.',
      'Ampliar o escopo das auditorias internas e o due diligence: Consolidação do Plano de Trabalho de Controles Internos (PTCI) com base no ciclo PDCA, abrangendo 100% dos macroprocessos da entidade por meio de Testes de Compliance (TC). Aplicação sistemática de due diligence de integridade e regularidade fiscal prévia e contínua de fornecedores, credenciados e parceiros institucionais (em consonância com o RLC e acórdãos do TCU).',
      'Garantir a conformidade legal e regulatória e Proteger a reputação e o patrimônio: Assegurar a estrita legalidade e conformidade dos atos de gestão (licitações, compras, contratos, diárias, convênios e reformulações orçamentárias). Blindagem institucional mediante a política mandatória de rastreabilidade do Sistema PING (proibição de cancelamento de documentos e exigência de despachos motivados) e monitoramento por painéis automatizados.',
      'Promover a cultura de ética e integridade: Fortalecimento do ambiente de controle institucional por meio da efetivação da Comissão de Ética, revisão periódica do Código de Conduta Ética, consolidação do Programa de Integridade, operação contínua e segura do Canal de Denúncias e disseminação permanente de capacitações para 100% dos colaboradores e lideranças.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-04-1',
        codigo: '04.1',
        solucaoIniciativa: 'Implantação do Programa Integrado de Gestão de Riscos Corporativos (ERM) e Inventário Único de Riscos',
        vinculoResultadoEsperado: 'Aperfeiçoar a gestão de riscos e fortalecer a auditoria preventiva interna',
        unidadeResponsavel: 'Assessoria de Controle Interno (ACI)',
        unidadesParceiras: 'Comitê de Riscos, DAF, DETEC, DATeG, TI, Conselho Fiscal',
        detalhamentoTecnico: 'Estruturação da Política Formal de Gestão de Riscos do SENAR-AR/RO, aprovação da Declaração Formal de Apetite ao Risco pelo Conselho Deliberativo e criação do "Risk Register" unificado (inventário corporativo de riscos operacionais, financeiros, de conformidade e de integridade). Elevação do nível de maturidade ERM (hoje na Dimensão 2 em 2,24 - Inicial) para patamares gerenciados e otimizados até 2030, apoiado no framework COSO ERM 2017 e ISO 31000.'
      },
      {
        id: 'sol-04-2',
        codigo: '04.2',
        solucaoIniciativa: 'Plano Anual de Auditoria Preventiva e Sistematização dos Testes de Compliance (TC) via PDCA',
        vinculoResultadoEsperado: 'Aperfeiçoar a gestão de riscos / Ampliar o escopo das auditorias e due diligence',
        unidadeResponsavel: 'Assessoria de Controle Interno (ACI)',
        unidadesParceiras: 'DAF, DETEC, DATeG, Jurídico, Auditoria Central',
        detalhamentoTecnico: 'Consolidação e fidelidade ao Plano de Trabalho de Controles Internos (PTCI) aprovado anualmente pela Superintendência e alinhado à Auditoria Interna Central (Manual dos Assessores de Controles Internos). Execução cíclica pelo método PDCA com aplicação de Testes de Compliance (TC) parametrizados e emissão do Ranking Interno de Conformidade dos departamentos, com foco nos macroprocessos críticos de contratação, pagamentos e repasses.'
      },
      {
        id: 'sol-04-3',
        codigo: '04.3',
        solucaoIniciativa: 'Protocolo de Due Diligence de Fornecedores, Regularidade Fiscal e Gestão Digital de Contratos (ContratosGOV)',
        vinculoResultadoEsperado: 'Ampliar o escopo das auditorias e due diligence / Proteger reputação e patrimônio',
        unidadeResponsavel: 'Assessoria de Controle Interno (ACI)',
        unidadesParceiras: 'Setor Jurídico, Compras/Licitações (DAF), Fiscais de Contrato, TI',
        detalhamentoTecnico: 'Instituição de rotina rigorosa de verificação prévia e contínua de idoneidade jurídica, fiscal e trabalhista de fornecedores e parceiros (mitigando os riscos apontados em acórdãos históricos do TCU, como 457/2005 e 1782/2010). Integração mandatória à plataforma digital ContratosGOV para monitoramento de prazos de vigência, reajustes, limites de termos aditivos e relatórios mensais dos fiscais de contrato.'
      },
      {
        id: 'sol-04-4',
        codigo: '04.4',
        solucaoIniciativa: 'Fortalecimento da Blindagem Regulatória, Rastreabilidade Processual e Filtro de Governança Orçamentária',
        vinculoResultadoEsperado: 'Garantir a conformidade legal e regulatória e Proteger a reputação e o patrimônio',
        unidadeResponsavel: 'Assessoria de Controle Interno (ACI)',
        unidadesParceiras: 'Todas as Unidades, Setor Jurídico, Planejamento, Contabilidade, TI',
        detalhamentoTecnico: 'Garantia da imutabilidade processual no Sistema PING (Manual Detalhado de Normativas / IS 09/2024), assegurando despachos explicativos motivados e erratas formais em caso de correções. Atuação da ACI como filtro estratégico nas peças orçamentárias (PAT e Reformulações) mediante a verificação dos 5 Filtros de Decisão (clareza de justificativas, impacto físico, coerência financeira, estabilidade de indicadores e custos unitários).'
      },
      {
        id: 'sol-04-5',
        codigo: '04.5',
        solucaoIniciativa: 'Consolidação do Programa de Integridade, Gestão da Ética Corporativa e Gestão do Canal de Denúncias',
        vinculoResultadoEsperado: 'Promover a cultura de ética e integridade',
        unidadeResponsavel: 'Assessoria de Controle Interno (ACI)',
        unidadesParceiras: 'Comissão de Ética, Gestão de Pessoas (RH), Comunicação, Ouvidoria',
        detalhamentoTecnico: 'Instituição formal da Comissão de Ética do SENAR-AR/RO, revisão bienal do Código de Conduta Ética, consolidação da Política Anticorrupção e de Prevenção a Conflitos de Interesse e disponibilização de Canal de Denúncias anônimo e protegido (integrado à Ouvidoria/e-CGU), com plano continuado de capacitação técnica dos colaboradores.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-f-04-1',
        codigo: '04.1',
        nome: 'Índice Consolidado de Maturidade em Gestão de Riscos (COSO ERM / ISO 31000)',
        unidadeMedida: 'Escala 1 a 5',
        linhaBase2026: '2,50 (Fase 1 Estruturado)',
        meta2027: '3,20',
        meta2028: '3,80',
        meta2029: '4,40',
        meta2030: '4,80',
        fonteVerificacao: 'Relatório Consolidado de Diagnóstico ERM / ACI'
      },
      {
        id: 'kpi-f-04-2',
        codigo: '04.2',
        nome: 'Taxa de Aderência Normativa nos Testes de Compliance (Índice de Conformidade Geral)',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '78,0%',
        meta2027: '85,0%',
        meta2028: '90,0%',
        meta2029: '95,0%',
        meta2030: '≥ 98,0%',
        fonteVerificacao: 'Planilhas e Relatórios de Testes de Compliance (TC)'
      },
      {
        id: 'kpi-f-04-3',
        codigo: '04.3',
        nome: 'Índice de Cobertura de Due Diligence e Regularidade Fiscal Contratual',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '65,0%',
        meta2027: '85,0%',
        meta2028: '95,0%',
        meta2029: '100,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Plataforma ContratosGOV e Dossiês Licitatórios'
      },
      {
        id: 'kpi-f-04-4',
        codigo: '04.4',
        nome: 'Índice de Eficácia no Tratamento de Recomendações de Controle (Interno/Externo)',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '70,0%',
        meta2027: '85,0%',
        meta2028: '92,0%',
        meta2029: '96,0%',
        meta2030: '≥ 98,0%',
        fonteVerificacao: 'Painel de Monitoramento de Recomendações e TCU'
      },
      {
        id: 'kpi-f-04-5',
        codigo: '04.5',
        nome: 'Taxa de Engajamento e Capacitação em Ética, Riscos e Integridade Institucional',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '25,0%',
        meta2027: '70,0%',
        meta2028: '85,0%',
        meta2029: '95,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Relatórios de Capacitação (RH / ACI / SNN+)'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-04-1',
        codigo: '04.1',
        iniciativaEstrategica: 'Gestão de Riscos ERM / Risk Register',
        ano2027: 'Q1-Q4',
        ano2028: 'Q1-Q4',
        ano2029: 'Q1-Q4',
        ano2030: 'Q1-Q4',
        orcamento2027: 0,
        orcamento2028: 35000,
        orcamento2029_30: 35000,
        total: 70000
      },
      {
        id: 'cron-04-2',
        codigo: '04.2',
        iniciativaEstrategica: 'Auditoria Preventiva & Testes Compliance',
        ano2027: 'Q1-Q4',
        ano2028: 'Q1-Q4',
        ano2029: 'Q1-Q4',
        ano2030: 'Q1-Q4',
        orcamento2027: 0,
        orcamento2028: 30000,
        orcamento2029_30: 30000,
        total: 60000
      },
      {
        id: 'cron-04-3',
        codigo: '04.3',
        iniciativaEstrategica: 'Due Diligence & ContratosGOV',
        ano2027: 'Q1-Q4',
        ano2028: 'Q1-Q4',
        ano2029: 'Q1-Q4',
        ano2030: 'Q1-Q4',
        orcamento2027: 0,
        orcamento2028: 30000,
        orcamento2029_30: 30000,
        total: 60000
      },
      {
        id: 'cron-04-4',
        codigo: '04.4',
        iniciativaEstrategica: 'Blindagem Processual (PING / Orçamento)',
        ano2027: 'Q1-Q4',
        ano2028: 'Q1-Q4',
        ano2029: 'Q1-Q4',
        ano2030: 'Q1-Q4',
        orcamento2027: 0,
        orcamento2028: 20000,
        orcamento2029_30: 20000,
        total: 40000
      },
      {
        id: 'cron-04-5',
        codigo: '04.5',
        iniciativaEstrategica: 'Integridade, Ética & Canal de Denúncias',
        ano2027: 'Q1-Q4',
        ano2028: 'Q1-Q4',
        ano2029: 'Q1-Q4',
        ano2030: 'Q1-Q4',
        orcamento2027: 0,
        orcamento2028: 25000,
        orcamento2029_30: 25000,
        total: 50000
      }
    ],
    governanca: {
      statusGeral: 'Planejado / Em Estruturação',
      percentualExecucao: 0.0,
      periodicidadeMonitoramento: 'Trimestral (com reportes mensais)',
      ultimaAtualizacao: '23/10/2026',
      ritosInstitucionais: [
        '1. Reporte Executivo Mensal: Encaminhamento de relatórios gerenciais e dashboards de conformidade à Superintendência Regional.',
        '2. Painel Trimestral de Riscos: Apresentação ao Comitê de Governança e Riscos e à Auditoria Interna do SENAR Central.',
        '3. Prestação de Contas Trimestral e Anual: Submissão de relatórios formais e pareceres prévios ao Conselho Fiscal e Conselho Administrativo Regional.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-04-1',
        fatorCritico: 'Resistência Cultural e Percepção Punitiva do Controle',
        impactoPotencial: 'Adesão superficial aos testes de compliance, ocultação de gargalos operacionais e baixa colaboração interdepartamental.',
        providenciaMitigadora: 'Atuação orientativa da ACI pelo modelo "Advisory" (consultoria interna amigável), destacando o controle como parceiro de blindagem jurídica individual e institucional.'
      },
      {
        id: 'risk-04-2',
        fatorCritico: 'Defasagem Tecnológica e Ausência de Analytics/BI',
        impactoPotencial: 'Dificuldade de rastrear tendências em tempo real, dependência de conferências manuais e perda de agilidade (pontuado com nota crítica 2,13 no diagnóstico).',
        providenciaMitigadora: 'Estruturação de dashboards executivos em Power BI, integração automatizada de dados do Sistego/SNN+ e uso sistemático da plataforma ContratosGOV.'
      },
      {
        id: 'risk-04-3',
        fatorCritico: 'Sobrecarga e Rotatividade em Áreas Operacionais (DAF/DETEC)',
        impactoPotencial: 'Falhas na formalização de processos, geração de dados fictícios por linha de ação (chamado SNNSUPORTE-21406) e atrasos na instrução probatória.',
        providenciaMitigadora: 'Padronização exaustiva de fluxos via manuais práticos (IS 09/2024 e IS 10/2024), checklists pré-formatados e treinamentos obrigatórios contínuos.'
      },
      {
        id: 'risk-04-4',
        fatorCritico: 'Risco de Descumprimento de Acórdãos e Precedentes do TCU',
        impactoPotencial: 'Rejeição de contas pelo Tribunal de Contas da União, responsabilização pessoal dos gestores e aplicação de multas do art. 268 do RI/TCU.',
        providenciaMitigadora: 'Auditoria prévia compulsória sobre 100% dos processos de dispensa e inexigibilidade, com exigência irrestrita de regularidade fiscal e de seguridade social (art. 195, § 3º, CF).'
      }
    ],
    fundamentacaoTecnica: 'O presente detalhamento alinha-se estritamente às diretrizes do Manual dos Assessores de Controles Internos da Administração Central do SENAR (2018), ao Regulamento de Licitações e Contratos (Resolução 30/2024/CD), às Instruções de Serviço Regionais (IS 09/2024, IS 10/2024, IS 11/2024, IS 14/2024 e IS 004/2026), e às recomendações da Auditoria. A implementação das soluções propostas assegura a transição definitiva da regional para uma governança de alta maturidade, garantindo segurança jurídica e máxima efetividade social aos produtores rurais de Rondônia.',
    assinaturaResponsavel: 'Rafael Bezerra Ferreira de Araújo - Assessor de Controle Interno SENAR-AR/RO'
  },

  // 2. FICHA TÉCNICA: OBJETIVO 01 (CLIENTES) - ASSISTÊNCIA TÉCNICA, PROMOÇÃO SOCIAL E FORMAÇÃO PROFISSIONAL
  {
    id: 'ficha-oe-01-clientes',
    codigoObjetivo: '01',
    nomeObjetivo: 'ASSISTÊNCIA TÉCNICA, PROMOÇÃO SOCIAL E FORMAÇÃO PROFISSIONAL',
    enunciado: 'Fortalecer e ampliar a assistência técnica rural, a promoção social, a capacitação e a formação profissional por meio de uma gestão ágil, moderna e de qualidade nos resultados.',
    perspectivaBsc: 'CLIENTES',
    unidadeResponsavelLider: 'Departamento Técnico (DETEC) e Gerência de Assistência Técnica (DATeG)',
    unidadesParceiras: 'Superintendência, DAF, Sindicatos dos Produtores Rurais, FAPERON, TI e Comunicação',
    responsavelPreenchimento: 'Coordenação Técnica e Operacional de Campo',
    cargoResponsavel: 'Coordenador Técnico DETEC/DATeG',
    dataElaboracaoRevisao: 'Outubro de 2026 (Ciclo de Planejamento Estratégico 2027–2030)',
    diretrizesResultados: [
      'Expansão da Assistência Técnica e Gerencial (ATeG): Elevação do número de propriedades rurais atendidas com foco em cadeias de valor prioritárias (Cafeicultura, Pecuária de Leite e Corte, Cacau e Piscicultura).',
      'Modernização da Formação Profissional Rural (FPR): Inserção de tecnologias de agricultura de precisão, drones agrícolas, NR-31 e certificações profissionais alinhadas ao mercado de trabalho do agronegócio.',
      'Fortalecimento da Promoção Social e Cidadania: Ampliação dos programas de saúde preventiva (Saúde do Homem e da Mulher Rural), inclusão produtiva e empoderamento das famílias no campo.',
      'Avaliação de Impacto e Rentabilidade no Campo: Monitoramento contínuo da margem líquida e geração de renda nas propriedades atendidas pelo SENAR em Rondônia.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-01-1',
        codigo: '01.1',
        solucaoIniciativa: 'Expansão Metodológica da ATeG em 52 Municípios de Rondônia',
        vinculoResultadoEsperado: 'Elevação da renda líquida e produtividade das propriedades rurais',
        unidadeResponsavel: 'Gerência DATEG',
        unidadesParceiras: 'Sindicatos Rurais, DAF, DETEC',
        detalhamentoTecnico: 'Contratação e treinamento contínuo de supervisores e técnicos de campo para assistência individualizada mensal de 4 horas por produtor rural.'
      },
      {
        id: 'sol-01-2',
        codigo: '01.2',
        solucaoIniciativa: 'Plataforma Digital de Acompanhamento Zootécnico e Agronômico SisATEG Mobile',
        vinculoResultadoEsperado: 'Gestão ágil, telemetria a campo e inteligência de dados',
        unidadeResponsavel: 'DETEC / TI',
        unidadesParceiras: 'DATEG, ACI',
        detalhamentoTecnico: 'Utilização offline e sincronização em nuvem de diagnósticos produtivos e custos operacionais.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-f-01-1',
        codigo: '01.1',
        nome: 'Propriedades Rurais Atendidas Continuamente pela ATeG',
        unidadeMedida: 'Propriedades',
        linhaBase2026: '4.850',
        meta2027: '5.500',
        meta2028: '6.200',
        meta2029: '7.000',
        meta2030: '8.000',
        fonteVerificacao: 'Relatórios Mensais SisATEG e Termos de Adesão'
      },
      {
        id: 'kpi-f-01-2',
        codigo: '01.2',
        nome: 'Incremento Médio da Margem Líquida nas Propriedades Assistidas',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '22,5%',
        meta2027: '25,0%',
        meta2028: '27,0%',
        meta2029: '29,0%',
        meta2030: '≥ 30,0%',
        fonteVerificacao: 'Balanço Econômico-Financeiro das Propriedades'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-01-1',
        codigo: '01.1',
        iniciativaEstrategica: 'Consultoria Continuada ATeG e Supervisão de Campo',
        ano2027: 'Q1-Q4',
        ano2028: 'Q1-Q4',
        ano2029: 'Q1-Q4',
        ano2030: 'Q1-Q4',
        orcamento2027: 18500000,
        orcamento2028: 20000000,
        orcamento2029_30: 22000000,
        total: 60500000
      }
    ],
    governanca: {
      statusGeral: 'Em Execução / Ciclo Contínuo',
      percentualExecucao: 92.0,
      periodicidadeMonitoramento: 'Mensal',
      ultimaAtualizacao: '25/10/2026',
      ritosInstitucionais: [
        '1. Comitê Técnico Mensal de Avaliação da ATeG e Formação Rural.',
        '2. Encontro Semestral de Alinhamento com Presidentes de Sindicatos Rurais.',
        '3. Prestação de Contas à Administração Central e CNA.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-01-1',
        fatorCritico: 'Dificuldade de Conectividade em Regiões Remotas de Rondônia',
        impactoPotencial: 'Atraso no sincronismo de laudos e escrituração de custos.',
        providenciaMitigadora: 'Módulo offline nativo no aplicativo dos técnicos com sincronização automática em rede local.'
      }
    ],
    fundamentacaoTecnica: 'Alinhamento às diretrizes do Regimento Geral do SENAR, aos Manuais Metodológicos da Assistência Técnica e Gerencial (CNA/SENAR) e ao Plano Plurianual de Metas 2027–2030.',
    assinaturaResponsavel: 'Diretoria Técnica Regional - SENAR Rondônia'
  },

  // 3. FICHA TÉCNICA: OBJETIVO 02 (PROCESSOS INTERNOS) - EXCELÊNCIA NA GESTÃO
  {
    id: 'ficha-oe-02-gestao',
    codigoObjetivo: '02',
    nomeObjetivo: 'EXCELÊNCIA NA GESTÃO',
    enunciado: 'Gerir com excelência os recursos financeiros e humanos, os processos operacionais com foco no aumento da maturidade de gestão.',
    perspectivaBsc: 'PROCESSOS_INTERNOS',
    unidadeResponsavelLider: 'Departamento Administrativo e Financeiro (DAF)',
    unidadesParceiras: 'Superintendência, Recursos Humanos, Contabilidade, Compras e ACI',
    responsavelPreenchimento: 'Gerência Administrativa e Financeira',
    cargoResponsavel: 'Gerente DAF - SENAR-AR/RO',
    dataElaboracaoRevisao: 'Outubro de 2026 (Ciclo de Planejamento Estratégico 2027–2030)',
    diretrizesResultados: [
      'Equilíbrio Orçamentário e Financeiro: Execução eficiente do orçamento com observância estrita aos limites regimentais e otimização dos recursos arrecadados.',
      'Gestão de Pessoas e Desenvolvimento de Competências: Plano de cargos e salários, capacitação continuada e retenção de talentos estratégicos.',
      'Celeridade nos Processos de Aquisições e Suprimentos: Redução do lead time de compras para atendimento tempestivo das demandas das unidades no interior.',
      'Maturidade dos Processos de Suporte Operacional: Padronização de fluxos de trabalho e conformidade com manuais e instruções normativas.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-02-1',
        codigo: '02.1',
        solucaoIniciativa: 'Modernização do Sistema Integrado de Gestão Orçamentária e Financeira (ERP)',
        vinculoResultadoEsperado: 'Transparência, eficiência orçamentária e fechamento tempestivo de contas',
        unidadeResponsavel: 'DAF / Contabilidade',
        unidadesParceiras: 'TI, ACI',
        detalhamentoTecnico: 'Integração em tempo real das conciliações bancárias, liquidações e demonstrativos de execução do PAT.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-f-02-1',
        codigo: '02.1',
        nome: 'Índice de Eficiência na Execução Orçamentária do PAT',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '91,5%',
        meta2027: '94,0%',
        meta2028: '96,0%',
        meta2029: '98,0%',
        meta2030: '≥ 98,5%',
        fonteVerificacao: 'Balancetes Contábeis e Demonstrativos Físico-Financeiros'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-02-1',
        codigo: '02.1',
        iniciativaEstrategica: 'Aperfeiçoamento da Gestão Orçamentária e Capacitação de Fiscais de Contratos',
        ano2027: 'Q1-Q4',
        ano2028: 'Q1-Q4',
        ano2029: 'Q1-Q4',
        ano2030: 'Q1-Q4',
        orcamento2027: 120000,
        orcamento2028: 150000,
        orcamento2029_30: 180000,
        total: 450000
      }
    ],
    governanca: {
      statusGeral: 'Em Execução / Eficiência Alta',
      percentualExecucao: 94.0,
      periodicidadeMonitoramento: 'Mensal',
      ultimaAtualizacao: '20/10/2026',
      ritosInstitucionais: [
        '1. Reunião de Acompanhamento Orçamentário e Financeiro Mensal com a Superintendência.',
        '2. Prestação de Contas Mensal e Parecer do Conselho Fiscal.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-02-1',
        fatorCritico: 'Flutuações na Arrecadação da Contribuição Previdenciária Rural',
        impactoPotencial: 'Necessidade de contingenciamento preventivo no Plano Anual de Trabalho.',
        providenciaMitigadora: 'Monitoramento semanal de ingressos e constituição de reserva estratégica orçamentária.'
      }
    ],
    fundamentacaoTecnica: 'Normas de Contabilidade Aplicadas ao Setor Público, Resoluções do Conselho Deliberativo do SENAR e Instruções de Serviço de Gestão Financeira.',
    assinaturaResponsavel: 'Departamento Administrativo e Financeiro (DAF) - SENAR-AR/RO'
  },

  // 4. FICHA TÉCNICA: OBJETIVO 03 (PROCESSOS INTERNOS) - TECNOLOGIA E INTELIGÊNCIA DE DADOS
  {
    id: 'ficha-oe-03-ti',
    codigoObjetivo: '03',
    nomeObjetivo: 'TECNOLOGIA E INTELIGÊNCIA DE DADOS',
    enunciado: 'Viabilizar uma arquitetura de TI moderna, integrada e de inteligência estratégica de dados.',
    perspectivaBsc: 'PROCESSOS_INTERNOS',
    unidadeResponsavelLider: 'Gerência de Infraestrutura Tecnológica e Dados (GIT)',
    unidadesParceiras: 'Superintendência, DAF, DETEC, DATEG, ACI e Sindicatos Rurais',
    responsavelPreenchimento: 'Coordenação de Tecnologia da Informação',
    cargoResponsavel: 'Líder de TIC e Inteligência de Dados',
    dataElaboracaoRevisao: 'Outubro de 2026 (Ciclo de Planejamento Estratégico 2027–2030)',
    diretrizesResultados: [
      'Arquitetura de Dados em Nuvem e BigQuery: Consolidação do data warehouse estratégico integrando dados do SisATEG, FPR, Promoção Social e arrecadação.',
      'Segurança Cibernética e Conformidade LGPD: Blindagem das redes, autenticação segura e governança de privacidade de dados de produtores e parceiros.',
      'Conectividade Rural e Mobilidade Operacional: Disponibilização de tecnologia robusta e suporte ágil aos técnicos que operam nos 52 municípios.',
      'Painéis Analíticos em Tempo Real (Business Intelligence): Disponibilização de dashboards dinâmicos para a tomada de decisão da gestão.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-03-1',
        codigo: '03.1',
        solucaoIniciativa: 'Implantação do Data Lakehouse Estratégico SENAR Rondônia',
        vinculoResultadoEsperado: 'Inteligência analítica unificada e apoio à tomada de decisão executiva',
        unidadeResponsavel: 'Gerência de TI',
        unidadesParceiras: 'DETEC, DAF, ACI',
        detalhamentoTecnico: 'Pipelines automatizados de ingestão de dados, dashboards em Power BI e integração com IA generativa para diagnóstico preditivo de safras e custos.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-f-03-1',
        codigo: '03.1',
        nome: 'Índice de Disponibilidade dos Sistemas Críticos e Plataformas de Campo',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '99,1%',
        meta2027: '99,5%',
        meta2028: '99,7%',
        meta2029: '99,8%',
        meta2030: '≥ 99,9%',
        fonteVerificacao: 'Painel de Monitoramento SLA Cloud e Incidentes de TIC'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-03-1',
        codigo: '03.1',
        iniciativaEstrategica: 'Infraestrutura Cloud, Telecom e Segurança Cibernética',
        ano2027: 'Q1-Q4',
        ano2028: 'Q1-Q4',
        ano2029: 'Q1-Q4',
        ano2030: 'Q1-Q4',
        orcamento2027: 450000,
        orcamento2028: 500000,
        orcamento2029_30: 550000,
        total: 1500000
      }
    ],
    governanca: {
      statusGeral: 'Em Execução / Modernização',
      percentualExecucao: 85.0,
      periodicidadeMonitoramento: 'Quinzenal / Mensal',
      ultimaAtualizacao: '22/10/2026',
      ritosInstitucionais: [
        '1. Comitê de Governança Digital e Segurança da Informação.',
        '2. Relatório Mensal de Disponibilidade e Indicadores de TIC.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-03-1',
        fatorCritico: 'Ameaças de Segurança Cibernética e Ransomware',
        impactoPotencial: 'Indisponibilidade de serviços e vazamento de dados cadastrais.',
        providenciaMitigadora: 'Implementação de arquitetura Zero Trust, backup imutável em nuvem e autenticação multifator compulsória.'
      }
    ],
    fundamentacaoTecnica: 'Marco Civil da Internet, Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018) e Padrões de Governança de TI do Sistema CNA/SENAR.',
    assinaturaResponsavel: 'Coordenação de Tecnologia da Informação - SENAR-AR/RO'
  },

  // 5. FICHA TÉCNICA: PERSPECTIVA SOCIEDADE - IMPACTO E RESULTADOS PARA A SOCIEDADE
  {
    id: 'ficha-oe-sociedade-01',
    codigoObjetivo: '01',
    nomeObjetivo: 'IMPACTO E RESULTADOS PARA A SOCIEDADE',
    enunciado: 'Maximizar o valor público entregue pelo SENAR-AR/RO através do aumento da produtividade, renda no campo, competitividade sustentável e melhoria contínua da qualidade de vida das famílias rurais de Rondônia.',
    perspectivaBsc: 'SOCIEDADE',
    unidadeResponsavelLider: 'Superintendência e Diretorias Técnicas - SENAR-AR/RO',
    unidadesParceiras: 'FAPERON, Sindicatos dos Produtores Rurais, DETEC, DATEG, DAF, ACI e Parceiros Institucionais',
    responsavelPreenchimento: 'Superintendência Regional do SENAR-AR/RO',
    cargoResponsavel: 'Superintendente Regional',
    dataElaboracaoRevisao: 'Outubro de 2026 (Ciclo de Planejamento Estratégico 2027–2030)',
    diretrizesResultados: [
      'Produtores rurais mais capacitados: Formação continuada e domínio de técnicas modernas de cultivo, manejo e gestão da propriedade.',
      'Aumento da produtividade e renda no campo: Elevação da margem líquida, redução de custos e aumento do rendimento zootécnico e agronômico.',
      'Mais qualidade de vida para as famílias rurais: Ações contínuas de saúde preventiva, inclusão social, cidadania e valorização da mulher e jovem no campo.',
      'Agro de Rondônia mais competitivo e sustentável: Práticas de baixo carbono, rastreabilidade, certificações e expansão comercial nos mercados nacional e global.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-soc-1',
        codigo: '01.1',
        solucaoIniciativa: 'Programa Integrado de Valor Público e Desenvolvimento do Campo Rondoniense',
        vinculoResultadoEsperado: 'Elevação da renda, sustentabilidade e qualidade de vida no campo',
        unidadeResponsavel: 'Superintendência / DETEC / DATEG',
        unidadesParceiras: 'Sindicatos Rurais, FAPERON',
        detalhamentoTecnico: 'Articulação interinstitucional para entrega coordenada de assistência técnica, qualificação profissional e promoção da saúde preventiva em todos os 52 municípios de Rondônia.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-f-soc-1',
        codigo: '01.1',
        nome: 'Famílias Rurais Beneficiadas Diretamente por Ações do SENAR-RO',
        unidadeMedida: 'Famílias',
        linhaBase2026: '25.000',
        meta2027: '28.000',
        meta2028: '32.000',
        meta2029: '36.000',
        meta2030: '≥ 40.000',
        fonteVerificacao: 'Relatórios Anuais de Gestão e Censo do Agro'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-soc-1',
        codigo: '01.1',
        iniciativaEstrategica: 'Ações de Impacto Social e Econômico Integrado no Campo',
        ano2027: 'Q1-Q4',
        ano2028: 'Q1-Q4',
        ano2029: 'Q1-Q4',
        ano2030: 'Q1-Q4',
        orcamento2027: 500000,
        orcamento2028: 600000,
        orcamento2029_30: 700000,
        total: 1800000
      }
    ],
    governanca: {
      statusGeral: 'Em Execução / Alinhamento Alto',
      percentualExecucao: 95.0,
      periodicidadeMonitoramento: 'Semestral / Anual',
      ultimaAtualizacao: '24/10/2026',
      ritosInstitucionais: [
        '1. Reunião Anual do Conselho Administrativo Regional.',
        '2. Prestação de Contas Social perante os 52 Sindicatos Rurais.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-soc-1',
        fatorCritico: 'Vulnerabilidades Climáticas e Oscilações nos Preços das Commodities',
        impactoPotencial: 'Impacto na renda do produtor e retenção nas cadeias produtivas.',
        providenciaMitigadora: 'Difusão de práticas agrícolas regenerativas, seguro rural e gestão financeira preventiva.'
      }
    ],
    fundamentacaoTecnica: 'Constituição Federal de 1988 (Art. 187), Lei nº 8.315/1991 e Diretrizes Estratégicas do Sistema CNA/SENAR.',
    assinaturaResponsavel: 'Superintendência Regional do SENAR-AR/RO'
  },

  // 6. FICHA TÉCNICA: PERSPECTIVA APRENDIZADO E CRESCIMENTO - PESSOAS, INOVAÇÃO E COMPETÊNCIAS
  {
    id: 'ficha-oe-aprendizado-01',
    codigoObjetivo: '01',
    nomeObjetivo: 'BASE PARA A EXECUÇÃO DA ESTRATÉGIA: PESSOAS, INOVAÇÃO E COMPETÊNCIAS',
    enunciado: 'Capacitar e engajar continuamente os colaboradores e corpo técnico, consolidar uma cultura de melhoria contínua, inovação e excelência no atendimento ao meio rural.',
    perspectivaBsc: 'APRENDIZADO_CRESCIMENTO',
    unidadeResponsavelLider: 'Gerência de Gestão de Pessoas (RH) e Inovação',
    unidadesParceiras: 'Superintendência, DAF, DETEC, DATEG, ACI e Sindicatos Rurais',
    responsavelPreenchimento: 'Coordenação de Recursos Humanos e Desenvolvimento Organizacional',
    cargoResponsavel: 'Coordenador de Gestão de Pessoas',
    dataElaboracaoRevisao: 'Outubro de 2026 (Ciclo de Planejamento Estratégico 2027–2030)',
    diretrizesResultados: [
      'Pessoas mais capacitadas e engajadas: Equipes técnicas e colaboradores de alto rendimento, valorizados e motivados pelo propósito do campo.',
      'Inovação e cultura de melhoria contínua: Metodologias ágeis, testes de novas tecnologias e constante aperfeiçoamento dos processos de atendimento.',
      'Tecnologia e inteligência de dados: Capacitação das equipes no manuseio de ferramentas analíticas, Power BI e plataformas digitais de campo.',
      'Conhecimento e desenvolvimento de competências: Atualização técnica continuada dos instrutores credenciados, supervisores e técnicos de campo.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-apr-1',
        codigo: '01.1',
        solucaoIniciativa: 'Programa de Desenvolvimento de Lideranças e Competências Técnicas do SENAR-RO',
        vinculoResultadoEsperado: 'Engajamento, produtividade corporativa e retenção de talentos',
        unidadeResponsavel: 'Gestão de Pessoas (RH)',
        unidadesParceiras: 'Todas as Diretorias',
        detalhamentoTecnico: 'Trilhas de aprendizagem continuada, pós-graduações setoriais em agronegócio e avaliação de desempenho por competências 360 graus.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-f-apr-1',
        codigo: '01.1',
        nome: 'Índice de Clima Organizacional e Engajamento dos Colaboradores',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '84,0%',
        meta2027: '88,0%',
        meta2028: '90,0%',
        meta2029: '93,0%',
        meta2030: '≥ 95,0%',
        fonteVerificacao: 'Pesquisa Bienal de Clima Organizacional (GPTW/Interna)'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-apr-1',
        codigo: '01.1',
        iniciativaEstrategica: 'Capacitações Corporativas e Trilhas de Competências',
        ano2027: 'Q1-Q4',
        ano2028: 'Q1-Q4',
        ano2029: 'Q1-Q4',
        ano2030: 'Q1-Q4',
        orcamento2027: 150000,
        orcamento2028: 180000,
        orcamento2029_30: 200000,
        total: 530000
      }
    ],
    governanca: {
      statusGeral: 'Em Execução / Alta Adesão',
      percentualExecucao: 88.0,
      periodicidadeMonitoramento: 'Trimestral',
      ultimaAtualizacao: '21/10/2026',
      ritosInstitucionais: [
        '1. Comitê de Gestão de Pessoas e Desenvolvimento de Competências.',
        '2. Devolutivas trimestrais de avaliação e plano de desenvolvimento individual (PDI).'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-apr-1',
        fatorCritico: 'Sobrecarga de Trabalho e Burnout Operacional',
        impactoPotencial: 'Perda de motivação e queda na qualidade do atendimento aos produtores.',
        providenciaMitigadora: 'Programas de qualidade de vida no trabalho, ginástica laboral e balanceamento de metas operacionais.'
      }
    ],
    fundamentacaoTecnica: 'Normas Internas de Recursos Humanos do SENAR-AR/RO e Diretrizes de Educação Corporativa da CNA.',
    assinaturaResponsavel: 'Gerência de Gestão de Pessoas - SENAR-AR/RO'
  }
];

