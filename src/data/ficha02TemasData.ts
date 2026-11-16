import { FichaTemaObjetivo } from '../types/strategic';

export const FICHA_02_TEMAS: FichaTemaObjetivo[] = [
  // =========================================================================
  // TEMA 05 — GOVERNANÇA, PLANEJAMENTO E GESTÃO ESTRATÉGICA
  // =========================================================================
  {
    id: 'tema-05-governanca',
    codigoTema: '05',
    nomeTema: 'Governança, Planejamento e Gestão Estratégica',
    unidadeResponsavelLider:
      'Superintendência / Comissão de Planejamento Estratégico (com apoio técnico do DAF / Contabilidade e Finanças)',
    unidadesParceiras:
      'Gestores de Todas as Áreas (DETEC, DATeG, DAF, Assessoria de Controle Interno — ACI, Setor Jurídico — AJU, DAF / TI, Assessoria de Comunicação — ACS, DPO), Sindicatos Rurais e Parceiros Institucionais.',
    responsavelPreenchimento: 'Superintendência / Gerência do DAF',
    cargoResponsavel: 'Comissão de Planejamento Estratégico',
    dataElaboracaoRevisao: 'Novembro de 2026 (Ciclo de Planejamento 2027–2030)',
    diretrizesResultados: [
      'Executar o Planejamento 2027–2030: Assegurar o desdobramento institucional e setorial das metas do Planejamento Estratégico 2027–2030 por todas as unidades gestoras da Regional, elevando a maturidade administrativa e operacional ao Nível 5.',
      'Fortalecer a governança e a gestão por indicadores: Consolidar ritos sistemáticos de acompanhamento estratégico e operacional com base em indicadores de desempenho (KPIs), painéis gerenciais em tempo real (dashboards no TOTVS RM / BI) e prestação de contas transparente.',
      'Aprimorar o planejamento orçamentário, o monitoramento dos resultados e a gestão de riscos: Instituir rotina de planejamento orçamentário integrado entre o DAF e as áreas finalísticas (com responsabilidade de cada área pelo planejamento e pela execução do seu respectivo orçamento anual e Plano Anual de Trabalho — PAT via SISTEGO e Sistema Ping, respeitando a proporcionalidade regimental de 80%/20%), promovendo reuniões periódicas de alinhamento, monitoramento da execução orçamentária via dashboards, apoio à tomada de decisão baseada em informações gerenciais em tempo real, gestão preventiva de riscos e conformidade com a LGPD.',
      'Fortalecer parcerias estratégicas (Sebrae, sindicatos e cooperativas): Ampliar a articulação institucional e a execução de convênios, acordos de cooperação técnica e ações integradas com Sindicatos Rurais, FAPERON, SEBRAE/RO, cooperativas agropecuárias, órgãos públicos, entre outros parceiros.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-t05-1',
        codigo: '05.1',
        solucaoIniciativa:
          'Desdobramento, Monitoramento Trimestral e Revisão Anual do Planejamento Estratégico 2027–2030 (Maturidade Nível 5)',
        vinculoResultadoEsperado: 'Executar o Planejamento 2027–2030',
        unidadeResponsavel:
          'Superintendência / Comissão de Planejamento Estratégico e Gestores de Cada Área',
        unidadesParceiras: 'DAF, DETEC, DATEG, ACI, AJU e Todas as Unidades',
        detalhamentoTecnico:
          'Institucionalização do calendário anual de execução, monitoramento trimestral e revisão das Fichas Técnicas dos Objetivos Estratégicos (01 a 09) e dos Planos Setoriais sob responsabilidade de cada unidade gestora, assegurando o alinhamento permanente entre os projetos táticos e a estratégia da Regional rumo ao Nível 5 de maturidade de gestão.'
      },
      {
        id: 'sol-t05-2',
        codigo: '05.2',
        solucaoIniciativa:
          'Sistema de Governança Corporativa, Gestão por Indicadores (KPIs) e Painéis Gerenciais (Dashboards)',
        vinculoResultadoEsperado: 'Fortalecer a governança e a gestão por indicadores',
        unidadeResponsavel: 'Superintendência, Comissão de Planejamento e DAF / TI',
        unidadesParceiras: 'Gestores de Cada Área, ACI e ACS',
        detalhamentoTecnico:
          'Padronização do catálogo institucional de indicadores de desempenho (KPIs), implantação de painéis gerenciais (dashboards integrados ao TOTVS RM, SISTEGO e bases operacionais) para acompanhamento em tempo real de metas físicas, financeiras e administrativas de cada unidade, subsidiando as reuniões decisórias da Superintendência.'
      },
      {
        id: 'sol-t05-3',
        codigo: '05.3',
        solucaoIniciativa:
          'Aprimoramento do Planejamento e Acompanhamento Orçamentário Institucional Integrado (Dashboards / Tempo Real) e Matriz de Riscos',
        vinculoResultadoEsperado:
          'Aprimorar o planejamento orçamentário, monitoramento dos resultados e gestão de riscos',
        unidadeResponsavel:
          'Gestores de Cada Área (Planejamento e Execução) e DAF / Contabilidade (Consolidação e Suporte Gerencial)',
        unidadesParceiras: 'Superintendência, Comissão de Planejamento, ACI, AJU e DPO',
        detalhamentoTecnico:
          'Instituir rotina de planejamento orçamentário integrado entre o DAF e as áreas finalísticas, promovendo reuniões periódicas de alinhamento, monitoramento da execução orçamentária via dashboards e apoio à tomada de decisão baseada em informações gerenciais em tempo real; operacionalizada no fluxo anual (julho a outubro) e de reformulação semestral (junho a agosto) via sistema SISTEGO e Sistema Ping, no qual cada área planeja e executa seu próprio orçamento, metas físicas e Plano Anual de Contratações — PAC (observando a proporcionalidade regimental de 80% atividade-fim / 20% custeio e investimentos), cabendo ao DAF (Gerência e Contabilidade/Financeiro) a consolidação técnica, a disponibilização dos painéis gerenciais de acompanhamento e o encaminhamento aos Conselhos Fiscal, Administrativo e SENAR Central; somada à operacionalização da matriz corporativa de gestão de riscos com controles preventivos da ACI e conformidade LGPD.'
      },
      {
        id: 'sol-t05-4',
        codigo: '05.4',
        solucaoIniciativa:
          'Programa de Articulação Institucional e Gestão de Parcerias Estratégicas (Sindicatos, SEBRAE e Cooperativas)',
        vinculoResultadoEsperado:
          'Fortalecer parcerias estratégicas (Sebrae, sindicatos, cooperativas, entre outros parceiros.)',
        unidadeResponsavel:
          'Superintendência e Áreas Finalísticas / Gestoras (DETEC, DATEG e Unidades Demandantes)',
        unidadesParceiras: 'DAF (Contratos/Convênios), AJU, ACS e Sindicatos Rurais',
        detalhamentoTecnico:
          'Estruturação de agenda executiva e gestão formal de convênios, acordos de cooperação e planos de trabalho conjuntos conduzidos pelas respectivas áreas gestoras junto aos Sindicatos Rurais, FAPERON, SEBRAE/RO, cooperativas e instituições públicas/privadas, ampliando a capilaridade e o alcance dos programas institucionais em Rondônia.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-t05-1',
        codigo: '05.1',
        nome: 'Índice Geral de Execução das Iniciativas do Planejamento Estratégico 2027–2030',
        unidadeMedida: '%',
        linhaBase2026: '0,0% (Novo Ciclo)',
        meta2027: '80,0%',
        meta2028: '88,0%',
        meta2029: '93,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Relatórios Trimestrais de Monitoramento e Atas da Comissão'
      },
      {
        id: 'kpi-t05-2',
        codigo: '05.2',
        nome: 'Percentual de Objetivos Estratégicos Monitorados com KPIs Ativos e Dashboards Gerenciais',
        unidadeMedida: '%',
        linhaBase2026: '0,0%',
        meta2027: '50,0%',
        meta2028: '75,0%',
        meta2029: '95,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Painéis BI / TOTVS RM e Relatórios de Gestão'
      },
      {
        id: 'kpi-t05-3',
        codigo: '05.3',
        nome: 'Aderência entre Planejamento Orçamentário Integrado / PAT e Execução Anual (Dashboards em Tempo Real)',
        unidadeMedida: '%',
        linhaBase2026: 'Apuração fechamento 2026 (SISTEGO)',
        meta2027: '90,0%',
        meta2028: '93,0%',
        meta2029: '95,0%',
        meta2030: '≥97,0%',
        fonteVerificacao: 'Dashboards Gerenciais, SISTEGO, Balancetes TOTVS RM e Relatório ACI'
      },
      {
        id: 'kpi-t05-4',
        codigo: '05.4',
        nome: 'Taxa de Execução de Parcerias, Convênios e Acordos Estratégicos Firmados',
        unidadeMedida: '%',
        linhaBase2026: 'Levantamento base Dez/2026',
        meta2027: '85,0%',
        meta2028: '90,0%',
        meta2029: '95,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'ContratosGov, Relatórios de Convênios e Prestação de Contas'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-t05-1',
        codigo: '05.1',
        iniciativaEstrategica: 'Desdobramento e Monitoramento do Planejamento Estratégico 2027–2030',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 0,
        orcamento2028: 0,
        orcamento2029: 0,
        orcamento2030: 0,
        total: 0
      },
      {
        id: 'cron-t05-2',
        codigo: '05.2',
        iniciativaEstrategica: 'Governança Corporativa, KPIs e Painéis Gerenciais (Dashboards)',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 0,
        orcamento2028: 0,
        orcamento2029: 0,
        orcamento2030: 0,
        total: 0
      },
      {
        id: 'cron-t05-3',
        codigo: '05.3',
        iniciativaEstrategica: 'Planejamento e Acompanhamento Orçamentário Integrado (Dashboards) e Riscos',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 0,
        orcamento2028: 0,
        orcamento2029: 0,
        orcamento2030: 0,
        total: 0
      },
      {
        id: 'cron-t05-4',
        codigo: '05.4',
        iniciativaEstrategica: 'Articulação Institucional e Parcerias Estratégicas (SEBRAE/Sindicatos/Coop.)',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 0,
        orcamento2028: 0,
        orcamento2029: 0,
        orcamento2030: 0,
        total: 0,
        valorTexto2027: 'Conforme Convênios',
        valorTexto2028: 'Conforme Convênios',
        valorTexto2029: 'Conforme Convênios',
        valorTexto2030: 'Conforme Convênios',
        valorTextoTotal: 'Conforme Convênios'
      }
    ],
    notaMetodologicaOrcamento:
      'Nota Metodológica: As iniciativas 05.1, 05.2 e 05.3 são executadas com a estrutura técnica e gerencial interna de cada unidade e da governança do SENAR-AR/RO, sem desembolso orçamentário adicional específico (os investimentos em ferramentas de TI/BI integram a Ficha Técnica 08 — Tecnologia da Informação e Dados). Os recursos de contrapartida ou repasse da iniciativa 05.4 seguem os planos de trabalho de cada instrumento de parceria aprovado na Proposta Orçamentária anual da respectiva área gestora.',
    governanca: {
      statusGeral: 'Não iniciada (Ciclo Inicia em 2027)',
      percentualExecucao: 0.0,
      periodicidadeMonitoramento: 'Trimestral (com reuniões periódicas de alinhamento orçamentário)',
      ultimaAtualizacao: 'Novembro/2026',
      ritosInstitucionais: [
        '1. Reuniões Periódicas de Alinhamento e Acompanhamento Orçamentário Integrado: Encontros sistemáticos entre o DAF (Gerência e Contabilidade/Financeiro) e as áreas finalísticas para alinhamento orçamentário, monitoramento da execução por unidade via dashboards em tempo real (SISTEGO / TOTVS RM), observância da proporcionalidade 80%/20% e apoio à tomada de decisão gerencial.',
        '2. Reunião Trimestral de Avaliação Estratégica (RAE): Apresentação consolidada por cada unidade responsável do desempenho de todos os Objetivos Estratégicos (Fichas 01 a 09), análise crítica dos KPIs e deliberação de ações corretivas junto à Superintendência e à Comissão de Planejamento Estratégico.',
        '3. Revisão Anual de Planejamento, Riscos e Prestação de Contas: Balanço anual dos resultados alcançados por área, atualização da matriz de riscos junto à Assessoria de Controle Interno (ACI) e submissão da Proposta Orçamentária e do PAT aos Conselhos Fiscal, Administrativo e SENAR Central.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-t05-1',
        fatorCritico:
          'Desalinhamento entre o planejamento orçamentário de cada área e sua execução (ou descumprimento do 80/20)',
        impactoPotencial:
          'Subexecução de metas físicas, remanejamentos emergenciais e risco de apontamento pelo Conselho Fiscal ou SENAR Central.',
        providenciaMitigadora:
          'Institucionalização das reuniões periódicas de planejamento orçamentário integrado entre DAF e áreas finalísticas, monitoramento via dashboards em tempo real e vinculação ao PAC.'
      },
      {
        id: 'risk-t05-2',
        fatorCritico:
          'Falta de padronização ou atraso na atualização dos indicadores estratégicos (KPIs) pelas unidades',
        impactoPotencial:
          'Dificuldade na tomada de decisão baseada em evidências e perda de visibilidade sobre gargalos operacionais.',
        providenciaMitigadora:
          'Implantação de painéis gerenciais (dashboards) automatizados e obrigatoriedade de reporte trimestral por cada área nas Reuniões de Avaliação Estratégica.'
      },
      {
        id: 'risk-t05-3',
        fatorCritico:
          'Materialização de riscos operacionais, jurídicos ou de conformidade sem tratamento preventivo',
        impactoPotencial: 'Apontamentos de auditoria, glosas ou exposição institucional.',
        providenciaMitigadora:
          'Monitoramento contínuo da matriz de riscos pela ACI, AJU e DPO, com planos de mitigação vinculados aos gestores responsáveis de cada objetivo.'
      }
    ],
    fundamentacaoTecnica:
      'As ações deste objetivo alinham-se ao Mapa Estratégico do SENAR-AR/RO (2027–2030), ao Planejamento Estratégico Setorial do DAF (2027–2030), ao Regimento Interno do SENAR-AR/RO, às rotinas institucionais da Proposta Orçamentária e Plano Anual de Trabalho — PAT (SISTEGO e Sistema Ping), às Normas de Orçamento e Contabilidade do Sistema CNA/SENAR e à Lei nº 13.709/2018 (LGPD).'
  },

  // =========================================================================
  // TEMA 06 — GESTÃO DE PESSOAS
  // =========================================================================
  {
    id: 'tema-06-pessoas',
    codigoTema: '06',
    nomeTema: 'Gestão de Pessoas',
    unidadeResponsavelLider: 'Departamento Administrativo e Financeiro (DAF / RH)',
    unidadesParceiras:
      'Setor Jurídico (AJU), Assessoria de Controle Interno (ACI), Assessoria de Comunicação (ACS), DAF/TI, Superintendência, DETEC, DATEG e DPO (Encarregado de Dados)',
    responsavelPreenchimento: 'Gerência do DAF / Setor de Recursos Humanos',
    cargoResponsavel: 'Gerência do DAF / Setor de Recursos Humanos',
    dataElaboracaoRevisao: 'Novembro de 2026 (Ciclo de Planejamento 2027–2030)',
    diretrizesResultados: [
      'Adequar a estrutura de pessoal às demandas institucionais: Transicionar a área de Recursos Humanos de um modelo estritamente cartorário/operacional (DP) para uma Gestão de Pessoas Estratégica, mediante estudo de dimensionamento técnico do quadro funcional (gestão centralizada da folha, encargos, benefícios e subsídios de toda a Regional), segregação de atribuições, mapeamento de cargos/competências e dos fluxos internos de Gestão de Pessoas, e reestruturação/modernização do Plano de Cargos, Carreiras e Remunerações (PCCR — 2022).',
      'Capacitar e desenvolver equipes (técnicas e gestão): Instituir a Política de Educação Continuada e estruturar o Plano Anual de Capacitação (PAC-RH), assegurando o aperfeiçoamento técnico, gerencial, normativo e comportamental contínuo dos colaboradores de todas as unidades da Regional.',
      'Fortalecer a cultura de inovação, colaboração e resultados: Promover ações sistemáticas voltadas ao desenvolvimento de lideranças, clima organizacional (elevando o IFT diagnosticado de 3,8 / 76,0% e convertendo a faixa de 60,0% de colaboradores neutros em comprometidos), integração intersetorial, endomarketing e cultura de feedback contínuo, eliminando controles manuais e planilhas paralelas através da automação sistêmica integrada ao TOTVS RM.',
      'Valorizar talentos e retenção de profissionais: Implantar ferramentas modernas e transparentes de Avaliação de Desempenho vinculadas aos critérios de progressão horizontal e promoção vertical do PCCR modernizado (respondendo diretamente às oportunidades identificadas na Pesquisa de Clima quanto à clareza nos critérios de promoção e reconhecimento), Plano de Desenvolvimento Individual (PDI) e programas de reconhecimento institucional, garantindo o tratamento seguro e ético dos dados pessoais dos colaboradores em estrito alinhamento com o Setor Jurídico (AJU) e a DPO (Encarregado de Dados).'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-t06-1',
        codigo: '06.1',
        solucaoIniciativa:
          'Reestruturação Funcional do RH (DP vs. RH Estratégico), Dimensionamento, Mapeamento de Cargos/Atribuições e Modernização do PCCR',
        vinculoResultadoEsperado: 'Adequar a estrutura de pessoal às demandas institucionais',
        unidadeResponsavel: 'DAF / Recursos Humanos',
        unidadesParceiras: 'Todas as Unidades (DETEC, DATEG, ACI, AJU, TI)',
        detalhamentoTecnico:
          'Divisão formal da atuação do setor entre Departamento Pessoal (folha, encargos e obrigações acessórias) e RH Estratégico (desenvolvimento, carreira, clima e recrutamento), respaldada por estudo técnico de dimensionamento institucional para acréscimo de 1 (um) colaborador no RH (e consolidação da demanda de reforço técnico das áreas críticas). Levantamento funcional das descrições de cargos, atividades e competências de todas as unidades (eliminando sobreposições de funções), mapeamento dos fluxos internos de Gestão de Pessoas (atuando em interface com os gestores de área e a TI, responsáveis pelos respectivos fluxos operacionais) e revisão estrutural do PCCR vigente (2022 — Documento Ping A-8EC95), contemplando nova pesquisa salarial de mercado e readequação da estrutura de carreiras e vagas à realidade atual do SENAR-AR/RO, para submissão e aprovação pelo Conselho Administrativo.'
      },
      {
        id: 'sol-t06-2',
        codigo: '06.2',
        solucaoIniciativa:
          'Implantação de Plataforma Especializada de Gestão de Pessoas Integrada ao TOTVS RM (Avaliação de Desempenho / PCCR)',
        vinculoResultadoEsperado: 'Fortalecer a cultura de resultados e valorizar talentos',
        unidadeResponsavel: 'DAF / Recursos Humanos',
        unidadesParceiras: 'DAF / TI e Fornecedor especializado',
        detalhamentoTecnico:
          'Contratação (já em 2027) e parametrização de plataforma especialista de Gestão de Pessoas com integração nativa ou via API ao TOTVS RM para automação completa de Avaliação de Desempenho (operacionalizando os critérios de interstício, progressão horizontal e promoção vertical do PCCR modernizado), Pesquisas de Clima, PDI, Gestão de Treinamentos e Recrutamento & Seleção, extinguindo controles manuais em planilhas.'
      },
      {
        id: 'sol-t06-3',
        codigo: '06.3',
        solucaoIniciativa:
          'Adequação e Compliance Operacional da LGPD e Saúde Ocupacional nas Rotinas de Pessoas',
        vinculoResultadoEsperado: 'Garantir segurança jurídica e conformidade nas rotinas de RH',
        unidadeResponsavel: 'DAF / Recursos Humanos',
        unidadesParceiras: 'Setor Jurídico (AJU), DPO e Operadoras de Saúde/Benefícios Contratadas',
        detalhamentoTecnico:
          'Observância rigorosa das Portarias e Políticas de Privacidade vigentes na Regional no tratamento de dados de colaboradores, dependentes, estagiários e candidatos, alinhando as operações do TOTVS RM, saúde ocupacional (PCMSO, PGR, LTCAT, eSocial SST e exames ocupacionais) e contratos licitados com as operadoras de planos de saúde e benefícios às orientações do Setor Jurídico (AJU) e da DPO (Encarregado de Dados).'
      },
      {
        id: 'sol-t06-4',
        codigo: '06.4',
        solucaoIniciativa: 'Programa Anual de Capacitação (PAC-RH) e Política de Educação Continuada',
        vinculoResultadoEsperado: 'Capacitar e desenvolver equipes técnicas e de gestão',
        unidadeResponsavel: 'DAF / Recursos Humanos',
        unidadesParceiras: 'DAF / Contabilidade, ACI, ACS e Superintendência',
        detalhamentoTecnico:
          'Institucionalização da Política de Educação Continuada e execução anual estruturada do Plano Anual de Capacitação (PAC-RH), contemplando trilhas de desenvolvimento técnico, gerencial, normativo, comportamental e de ferramentas digitais alinhadas às necessidades mapeadas em todas as áreas da Regional, com apoio da Assessoria de Comunicação (ACS) na divulgação e mobilização interna.'
      },
      {
        id: 'sol-t06-5',
        codigo: '06.5',
        solucaoIniciativa: 'Programa de Cultura Organizacional, Clima, Liderança e Reconhecimento',
        vinculoResultadoEsperado:
          'Fortalecer a cultura de colaboração e retenção de profissionais',
        unidadeResponsavel: 'DAF / Recursos Humanos',
        unidadesParceiras: 'Assessoria de Comunicação (ACS), Superintendência e Gestores',
        detalhamentoTecnico:
          'Execução de ciclos estruturados de pesquisa de clima organizacional, programas de integração (onboarding), capacitação de lideranças e ações de endomarketing, saúde emocional no trabalho e reconhecimento interno em parceria com a Assessoria de Comunicação (ACS), atuando sobre os pontos de melhoria diagnosticados na Pesquisa de Clima.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-t06-1',
        codigo: '06.1',
        nome: 'Índice de Mapeamento de Cargos/Atribuições, Rotinas de RH e Reestruturação do PCCR',
        unidadeMedida: '%',
        linhaBase2026: '0,0% (PCCR 2022 vigente)',
        meta2027: '60,0%',
        meta2028: '100,0%',
        meta2029: '100,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Manual de Cargos/Rotinas RH e Novo PCCR Homologados'
      },
      {
        id: 'kpi-t06-2',
        codigo: '06.2',
        nome: 'Grau de Automação dos Subsistemas de RH e Avaliação PCCR (Plataforma Integrada ao TOTVS RM)',
        unidadeMedida: '%',
        linhaBase2026: '0,0% (Controles manuais/planilhas)',
        meta2027: '50,0%',
        meta2028: '85,0%',
        meta2029: '100,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Relatórios da Plataforma de RH e Logs de Integração (TOTVS RM)'
      },
      {
        id: 'kpi-t06-3',
        codigo: '06.3',
        nome: 'Taxa de Conformidade LGPD nos Fluxos e Contratos de Pessoas',
        unidadeMedida: '%',
        linhaBase2026: 'Apuração base Dez/2026 (RH / DPO)',
        meta2027: '90,0%',
        meta2028: '100,0%',
        meta2029: '100,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Relatório de Monitoramento (RH / AJU / DPO)'
      },
      {
        id: 'kpi-t06-4',
        codigo: '06.4',
        nome: 'Taxa de Execução do Plano Anual de Capacitação (PAC-RH)',
        unidadeMedida: '%',
        linhaBase2026: 'Apuração fechamento 2026 (RH)',
        meta2027: '80,0%',
        meta2028: '85,0%',
        meta2029: '90,0%',
        meta2030: '≥95,0%',
        fonteVerificacao: 'Relatórios de Execução do PAC e Certificados'
      },
      {
        id: 'kpi-t06-5',
        codigo: '06.5',
        nome: 'Índice Geral de Clima Organizacional (IFT — Pesquisa de Clima)',
        unidadeMedida: 'Nota (1–5) / %',
        linhaBase2026: '3,8 (76,0%) — 2025',
        meta2027: '4,0 (80,0%)',
        meta2028: '4,2 (84,0%)',
        meta2029: '4,3 (86,0%)',
        meta2030: '≥4,5 (≥90,0%)',
        fonteVerificacao: 'Relatório da Pesquisa Anual de Clima Organizacional'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-t06-1',
        codigo: '06.1',
        iniciativaEstrategica: 'Reestruturação RH, Mapeamento e Revisão PCCR',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 20000.0,
        orcamento2028: 20900.0,
        orcamento2029: 21840.5,
        orcamento2030: 22823.32,
        total: 85563.82
      },
      {
        id: 'cron-t06-2',
        codigo: '06.2',
        iniciativaEstrategica: 'Plataforma de Gestão de Pessoas (TOTVS RM)',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 24000.0,
        orcamento2028: 25080.0,
        orcamento2029: 26208.6,
        orcamento2030: 27387.99,
        total: 102676.59
      },
      {
        id: 'cron-t06-3',
        codigo: '06.3',
        iniciativaEstrategica: 'Compliance LGPD e Saúde Ocupacional',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 40000.0,
        orcamento2028: 41800.0,
        orcamento2029: 43681.0,
        orcamento2030: 45646.64,
        total: 171127.64
      },
      {
        id: 'cron-t06-4',
        codigo: '06.4',
        iniciativaEstrategica: 'Programa Anual de Capacitação (PAC-RH)',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 121600.0,
        orcamento2028: 127072.0,
        orcamento2029: 132790.24,
        orcamento2030: 138765.8,
        total: 520228.04
      },
      {
        id: 'cron-t06-5',
        codigo: '06.5',
        iniciativaEstrategica: 'Cultura Organizacional, Clima e Liderança',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 20000.0,
        orcamento2028: 20900.0,
        orcamento2029: 21840.5,
        orcamento2030: 22823.32,
        total: 85563.82
      }
    ],
    notaMetodologicaOrcamento:
      'Nota Metodológica: Base 2027 composta pelas rubricas da Proposta Orçamentária 2027 — Capacitação (R$ 121.600,00), Saúde Ocupacional (R$ 40.000,00), Serviços Técnicos/Consultorias (R$ 40.000,00) — acrescida da assinatura anual da Plataforma de Gestão de Pessoas (R$ 2.000,00/mês = R$ 24.000,00/ano), com projeções de 2028 a 2030 reajustadas pela média de 4,5% a.a. do IPCA. A folha de pagamento, encargos, benefícios e subsídios de toda a Regional (R$ 10.575.756,14 em 2027) integram o custeio fixo de pessoal.',
    governanca: {
      statusGeral: 'Não iniciada (Ciclo Inicia em 2027)',
      percentualExecucao: 0.0,
      periodicidadeMonitoramento: 'Trimestral (com reportes mensais internos)',
      ultimaAtualizacao: 'Novembro/2026',
      ritosInstitucionais: [
        '1. Reporte Operacional Mensal: Acompanhamento interno pela Gerência do DAF dos indicadores de folha, capacitações e andamento dos cronogramas de implantação sistêmica e revisão do PCCR.',
        '2. Monitoramento Trimestral de Desempenho: Apresentação dos resultados consolidados do PAC-RH, execução das avaliações de desempenho e evolução do mapeamento de cargos/PCCR à Superintendência e ao Comitê de Planejamento.',
        '3. Auditoria de Conformidade: Validação semestral junto ao Setor Jurídico (AJU), à DPO (Encarregado de Dados) e à Assessoria de Controle Interno (ACI) quanto à aderência dos fluxos de pessoal aos normativos internos, ao PCCR e à LGPD.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-t06-1',
        fatorCritico: 'Defasagem do PCCR vigente (2022) frente às novas demandas e cargos da Regional',
        impactoPotencial:
          'Dificuldade na retenção de talentos, enquadramentos desalinhados com o mercado e sobrecarga de funções.',
        providenciaMitigadora:
          'Condução de estudo técnico de dimensionamento, pesquisa salarial de mercado e submissão da proposta de modernização do PCCR ao Conselho Administrativo até 2028.'
      },
      {
        id: 'risk-t06-2',
        fatorCritico: 'Sobrecarga operacional das rotinas mensais de folha (DP)',
        impactoPotencial:
          'Atraso na execução das entregas estratégicas (mapeamento de cargos, avaliações de desempenho do PCCR e programas de clima).',
        providenciaMitigadora:
          'Aprovação do estudo de dimensionamento técnico para acréscimo de 1 colaborador e segregação formal das equipes de DP e RH Estratégico.'
      },
      {
        id: 'risk-t06-3',
        fatorCritico: 'Baixa adesão dos gestores às ferramentas de avaliação e PDI',
        impactoPotencial:
          'Subutilização da plataforma integrada ao TOTVS RM e perda de efetividade na gestão por competências e progressões de carreira.',
        providenciaMitigadora:
          'Realização de workshops obrigatórios de alinhamento com lideranças e vinculação da avaliação de desempenho ao plano de capacitação.'
      },
      {
        id: 'risk-t06-4',
        fatorCritico: 'Vulnerabilidade no tratamento de dados sensíveis de saúde/benefícios',
        impactoPotencial:
          'Risco de incidentes de segurança da informação e não conformidade com a Lei nº 13.709/2018 (LGPD).',
        providenciaMitigadora:
          'Aplicação rigorosa de controles de acesso no TOTVS RM e formalização de cláusulas/aditivos de operadores nos contratos licitados de saúde e benefícios sob orientação do Setor Jurídico (AJU) e da DPO.'
      }
    ],
    fundamentacaoTecnica:
      'As ações deste objetivo alinham-se à revisão e modernização do Plano de Cargos, Carreiras e Remunerações (PCCR) do SENAR-AR/RO (homologado originalmente pelo Conselho Administrativo em 12/12/2022 via Documento Ping A-8EC95), ao diagnóstico institucional da Pesquisa de Clima Organizacional (2025), ao Regulamento de Contratação de Pessoal, ao Regulamento de Licitações e Contratos, à Consolidação das Leis do Trabalho (CLT), à Lei nº 13.709/2018 (LGPD) e às normas internas de gestão de processos e capacitação.'
  },

  // =========================================================================
  // TEMA 07 — INFRAESTRUTURA E PATRIMÔNIO
  // =========================================================================
  {
    id: 'tema-07-infraestrutura',
    codigoTema: '07',
    nomeTema: 'Infraestrutura e Patrimônio',
    unidadeResponsavelLider:
      'Departamento Administrativo e Financeiro (DAF / Patrimônio e Transporte)',
    unidadesParceiras:
      'Comissão Permanente de Material e Patrimônio (CPMP — Portaria nº 48/2026), Comissão Permanente de Licitação (CPL — Portaria nº 47/2026), DAF / Contabilidade, DAF / TI, Setor Jurídico (AJU), Assessoria de Controle Interno (ACI), DPO, Superintendência, DETEC e DATEG',
    responsavelPreenchimento: 'Gerência do DAF / Setores de Patrimônio e Transporte',
    cargoResponsavel: 'Gerência do DAF / Setores de Patrimônio e Transporte',
    dataElaboracaoRevisao: 'Novembro de 2026 (Ciclo de Planejamento 2027–2030)',
    diretrizesResultados: [
      'Manter e modernizar a infraestrutura predial e os polos: Normatizar os fluxos de chamados e executar adequações estruturais e tecnológicas na Sede em Porto Velho, na Regional de Ji-Paraná e nos polos do interior, assegurando ambientes modernos, acessíveis e funcionais.',
      'Garantir manutenção preventiva e gestão dos ativos: Implantar o Plano de Manutenção Predial Preventiva Programada e consolidar a governança patrimonial (conciliação físico-contábil no TOTVS RM, atuação da CPMP — Portaria nº 48/2026 e controle digital de bens itinerantes via Sistema Ping).',
      'Ampliar a infraestrutura nos sindicatos e regiões: Apoiar a estruturação física e o aparelhamento dos escritórios avançados e unidades parceiras nos municípios rurais do Estado, ampliando a capilaridade institucional.',
      'Assegurar condições adequadas para expansão das ações: Modernizar a gestão tecnológica da frota (sistema de controle, rastreamento e automação de pedágios na BR-364) e garantir conformidade em segurança eletrônica (CFTV), prevenção contra incêndio (PPCI/AVCB) e sustentabilidade.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-t07-1',
        codigo: '07.1',
        solucaoIniciativa:
          'Normatização (IS) e Plano de Manutenção Predial Preventiva e Corretiva (Sede Porto Velho, Regional Ji-Paraná e Polos)',
        vinculoResultadoEsperado: 'Manter e modernizar a infraestrutura predial e os polos',
        unidadeResponsavel: 'DAF / Patrimônio',
        unidadesParceiras: 'CPL (Portaria 47/2026), ACI, Compras, AJU e Empresas Licitadas',
        detalhamentoTecnico:
          'Criação da Instrução de Serviço (IS) de Manutenção Predial para formalizar o fluxo de chamados (preventivos e corretivos) com critérios de priorização e matriz de prazos, implantando o Plano de Manutenção Preventiva Programada na Sede (Porto Velho), na Regional de Ji-Paraná e nos escritórios avançados do interior.'
      },
      {
        id: 'sol-t07-2',
        codigo: '07.2',
        solucaoIniciativa:
          'Governança Patrimonial, Atuação da CPMP, Bens Itinerantes (Ping) e Conciliação Físico-Contábil (TOTVS RM)',
        vinculoResultadoEsperado: 'Garantir manutenção preventiva e gestão dos ativos',
        unidadeResponsavel: 'DAF / Patrimônio',
        unidadesParceiras: 'CPMP (Portaria 48/2026), DAF / Contabilidade, Compras, TI e ACI',
        detalhamentoTecnico:
          'Atualização da IS do Patrimônio instituindo o Termo de Responsabilidade Individual e a obrigatoriedade do Termo de Cautela e Transferência Temporária (via formulário digital no Sistema Ping) para retirada de equipamentos em viagens e eventos no interior. Fortalecimento da Comissão Permanente de Material e Patrimônio (CPMP — Portaria nº 48/2026) em vistorias situacionais, emplaquetamento, inventários físicos anuais, conciliação contábil/depreciação no TOTVS RM e alienação/leilão de bens.'
      },
      {
        id: 'sol-t07-3',
        codigo: '07.3',
        solucaoIniciativa:
          'Gestão Tecnológica da Frota (Sistema de Controle, Rastreamento e Tags de Pedágio) e Dimensionamento do Transporte',
        vinculoResultadoEsperado: 'Assegurar condições adequadas para expansão das ações',
        unidadeResponsavel: 'DAF / Transporte',
        unidadesParceiras: 'DETEC, DATeG, Compras, CPL, DPO e Operadoras Licitadas',
        detalhamentoTecnico:
          'Aquisição e implantação de sistema especializado de controle de frota integrado ao rastreamento veicular (com conformidade LGPD no tratamento de dados de condutores), aprimoramento do checklist de veículos (nível de combustível, limpeza e registro visual de avarias), automação do pagamento de pedágios na BR-364 via tags/cartões corporativos e estudo de dimensionamento técnico do quadro de transporte.'
      },
      {
        id: 'sol-t07-4',
        codigo: '07.4',
        solucaoIniciativa:
          'Segurança Eletrônica (CFTV), Prevenção contra Incêndio (PPCI/AVCB), Acessibilidade e Apoio aos Polos Regionais',
        vinculoResultadoEsperado: 'Ampliar a infraestrutura nos sindicatos e regiões',
        unidadeResponsavel: 'DAF / Patrimônio',
        unidadesParceiras: 'AJU, ACI, DAF / TI, Compras, Sindicatos Rurais e Superintendência',
        detalhamentoTecnico:
          'Manutenção e modernização dos sistemas de videomonitoramento eletrônico (CFTV), alarmes e controle de acesso (contratados via licitação), regularização contínua de extintores, hidrantes, iluminação de emergência e Auto de Vistoria do Corpo de Bombeiros (AVCB), adequações de acessibilidade (ABNT NBR 9050) e suporte estrutural aos polos regionais.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-t07-1',
        codigo: '07.1',
        nome: 'Taxa de Execução do Plano de Manutenção Predial Preventiva (Sede e Unidades)',
        unidadeMedida: '%',
        linhaBase2026: '0,0% (Novo Plano Preventivo)',
        meta2027: '85,0%',
        meta2028: '90,0%',
        meta2029: '95,0%',
        meta2030: '≥98,0%',
        fonteVerificacao: 'IS de Manutenção Predial e Ordens de Serviço'
      },
      {
        id: 'kpi-t07-2',
        codigo: '07.2',
        nome: 'Índice de Acuracidade do Inventário Físico-Contábil e Rastreabilidade de Bens Itinerantes',
        unidadeMedida: '%',
        linhaBase2026: 'Inventário Anual 2026 (CPMP)',
        meta2027: '90,0%',
        meta2028: '95,0%',
        meta2029: '98,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Relatório Anual da CPMP, Ping e Conciliação TOTVS RM'
      },
      {
        id: 'kpi-t07-3',
        codigo: '07.3',
        nome: 'Índice de Automação, Rastreamento e Controle Digital da Frota Institucional',
        unidadeMedida: '%',
        linhaBase2026: 'Apuração base Dez/2026 (Transporte)',
        meta2027: '85,0%',
        meta2028: '95,0%',
        meta2029: '100,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Relatórios do Sistema de Frota, Rastreamento e Checklists'
      },
      {
        id: 'kpi-t07-4',
        codigo: '07.4',
        nome: 'Índice de Conformidade em Segurança Eletrônica, PPCI (AVCB) e Acessibilidade',
        unidadeMedida: '%',
        linhaBase2026: 'Laudo base Dez/2026 (Patrimônio)',
        meta2027: '80,0%',
        meta2028: '90,0%',
        meta2029: '95,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Laudos Técnicos, AVCB Vigente e Relatório ACI'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-t07-1',
        codigo: '07.1',
        iniciativaEstrategica:
          'Manutenção Predial Preventiva e Corretiva (Sede/Ji-Paraná/Polos)',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 180000.0,
        orcamento2028: 188100.0,
        orcamento2029: 196564.5,
        orcamento2030: 205409.9,
        total: 770074.4
      },
      {
        id: 'cron-t07-2',
        codigo: '07.2',
        iniciativaEstrategica: 'Governança Patrimonial, CPMP e Bens Itinerantes (TOTVS RM)',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 25000.0,
        orcamento2028: 26125.0,
        orcamento2029: 27300.62,
        orcamento2030: 28529.15,
        total: 106954.77
      },
      {
        id: 'cron-t07-3',
        codigo: '07.3',
        iniciativaEstrategica:
          'Gestão Tecnológica da Frota (Sistema, Rastreamento e Pedágios)',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 44280.83,
        orcamento2028: 46273.47,
        orcamento2029: 48355.78,
        orcamento2030: 50531.79,
        total: 189441.87
      },
      {
        id: 'cron-t07-4',
        codigo: '07.4',
        iniciativaEstrategica:
          'Segurança Eletrônica (CFTV), PPCI (AVCB), Acessibilidade e Polos',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 40000.0,
        orcamento2028: 41800.0,
        orcamento2029: 43681.0,
        orcamento2030: 45646.64,
        total: 171127.64
      }
    ],
    notaMetodologicaOrcamento:
      'Nota Metodológica: Base 2027 calibrada com dados reais do SENAR-AR/RO para frota (pedágios R$ 20.374,00 + rastreamento R$ 16.000,00 + sistema de gestão R$ 6.000,00 em 2026 = R$ 42.374,00 + 4,5% IPCA = R$ 44.280,83) e monitoramento eletrônico/PPCI (R$ 2.000,00/mês de monitoramento corrigido pelo IPCA = R$ 25.080,00 + R$ 14.920,00 para extintores/laudos AVCB/acessibilidade = R$ 40.000,00), somados às estimativas para manutenção predial (R$ 180.000,00) e patrimônio/CPMP (R$ 25.000,00). Os custos de Almoxarifado e Logística/Fretes (R$ 120.000,00) foram alocados exclusivamente na Ficha Técnica 09 (Processos, Logística e Suprimentos) para evitar duplicidade orçamentária. Despesas ordinárias de combustível, manutenção mecânica de rotina e energia elétrica integram o custeio operacional fixo da Regional. Todas as projeções de 2028 a 2030 foram reajustadas pela média de 4,5% a.a. do IPCA.',
    governanca: {
      statusGeral: 'Não iniciada (Ciclo Inicia em 2027)',
      percentualExecucao: 0.0,
      periodicidadeMonitoramento: 'Trimestral (com reportes mensais internos)',
      ultimaAtualizacao: 'Novembro/2026',
      ritosInstitucionais: [
        '1. Reporte Operacional Mensal: Acompanhamento interno pela Gerência do DAF da execução dos contratos prediais, telemetria/rastreamento e pedágios da frota, monitoramento eletrônico e controle de cautelas de bens itinerantes no Sistema Ping.',
        '2. Monitoramento Trimestral de Desempenho: Apresentação dos indicadores de manutenção preventiva, disponibilidade da frota, segurança predial e vistorias da CPMP à Superintendência e ao Comitê de Planejamento.',
        '3. Auditoria de Conformidade: Validação semestral/anual junto à Contabilidade, à Comissão Permanente de Material e Patrimônio (CPMP — Portaria nº 48/2026), ao Setor Jurídico (AJU) e à Assessoria de Controle Interno (ACI) quanto à acuracidade físico-contábil no TOTVS RM e conformidade contratual.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-t07-1',
        fatorCritico: 'Saída de equipamentos para eventos/viagens no interior sem controle formal',
        impactoPotencial:
          'Extravio de ativos, danos não identificados e apontamentos de auditoria no inventário anual.',
        providenciaMitigadora:
          'Obrigatoriedade do Termo de Cautela e Transferência Temporária no Sistema Ping, com bloqueio de retirada sem ciência prévia da CPMP.'
      },
      {
        id: 'risk-t07-2',
        fatorCritico: 'Desgaste acelerado da frota nas estradas vicinais do interior e falhas no controle de uso',
        impactoPotencial:
          'Indisponibilidade de veículos para atendimento técnico e elevação de custos corretivos.',
        providenciaMitigadora:
          'Implantação do Sistema de Controle de Frota integrado ao rastreamento, exigência do checklist ampliado (combustível, limpeza e avarias) a cada viagem e estudo de dimensionamento do transporte.'
      },
      {
        id: 'risk-t07-3',
        fatorCritico: 'Pendências em adequações de PPCI/AVCB ou falhas nos sistemas de monitoramento predial',
        impactoPotencial:
          'Vulnerabilidade patrimonial e risco de notificações ou sanções por órgãos de fiscalização.',
        providenciaMitigadora:
          'Cronograma preventivo anual de recarga de extintores, manutenção de CFTV e renovação antecipada dos laudos técnicos e do AVCB.'
      },
      {
        id: 'risk-t07-4',
        fatorCritico: 'Atrasos em contratações de manutenção predial ou serviços contínuos de infraestrutura',
        impactoPotencial:
          'Descontinuidade da conservação física na Sede, Ji-Paraná ou escritórios avançados.',
        providenciaMitigadora:
          'Planejamento antecipado junto à CPL (Portaria nº 47/2026) e execução rigorosa do Plano de Manutenção Predial Preventiva Programada.'
      }
    ],
    fundamentacaoTecnica:
      'As ações deste objetivo alinham-se ao Mapa Estratégico do SENAR-AR/RO (2027–2030), ao Planejamento Estratégico Setorial do DAF (2027–2030), às Portarias nº 47/2026 (CPL) e nº 48/2026 (CPMP), ao Regulamento de Licitações e Contratos do SENAR, às Normas Brasileiras de Contabilidade Aplicadas ao Setor Público (NBC TSP), às Normas Regulamentadoras (NR-10, NR-17 e NR-23) e à Lei nº 13.709/2018 (LGPD).'
  },

  // =========================================================================
  // TEMA 09 — PROCESSOS, LOGÍSTICA E SUPRIMENTOS
  // =========================================================================
  {
    id: 'tema-09-processos',
    codigoTema: '09',
    nomeTema: 'Processos, Logística e Suprimentos',
    unidadeResponsavelLider:
      'Departamento Administrativo e Financeiro (DAF / Gerência, Compras, Almoxarifado, Contabilidade/Financeiro e Arrecadação)',
    unidadesParceiras:
      'Comissão Permanente de Licitação (CPL — Portaria nº 47/2026), Setor Jurídico (AJU), Assessoria de Controle Interno (ACI), DAF / TI, DPO e Comitê Multidisciplinar LGPD, Superintendência, DETEC, DATEG e Sindicatos Rurais',
    responsavelPreenchimento:
      'Gerência do DAF / Setores de Compras, Almoxarifado, Contabilidade/Financeiro e Arrecadação',
    cargoResponsavel: 'Gerência do DAF / Setores de Compras, Almoxarifado, Financeiro e Arrecadação',
    dataElaboracaoRevisao: 'Novembro de 2026 (Ciclo de Planejamento 2027–2030)',
    diretrizesResultados: [
      'Automatizar e padronizar fluxos administrativos: Padronizar os fluxos internos de aquisição, contratação, abastecimento, pagamentos e arrecadação, eliminando o retrabalho documental entre o ERP TOTVS RM e o Sistema Ping, implantando o ciclo completo no TOTVS RM, remessa bancária em lote (CNAB) com baixa automática e inteligência fiscal/cadastral.',
      'Fortalecer a gestão de compras, contratos e almoxarifado: Institucionalizar o Plano Anual de Contratações (PAC) junto à CPL (Portaria nº 47/2026), padronizar artefatos técnicos (Planos de Ação e Termos de Referência) no Ping, modernizar o acompanhamento contratual via plataforma ContratosGov com cláusulas LGPD, e implantar controle de validade PVPS e política de desfazimento no Almoxarifado.',
      'Aprimorar a logística de entregas aos sindicatos e regiões: Estruturar a cadeia de expedição e distribuição para os Sindicatos Rurais, Regional de Ji-Paraná e polos do interior, bem como a atuação descentralizada de visitas orientativas de arrecadação nas macrorregiões Norte, Central e Sul.',
      'Garantir conformidade, rastreabilidade e eficiência nos processos: Consolidar barreiras preventivas de conformidade fiscal, documental e contábil (Barreira Contábil e ordem cronológica), ativar trilhas de auditoria (logs) no TOTVS RM, atualizar a norma interna do Fundo Fixo e assegurar estrita conformidade com a LGPD no tratamento de dados cadastrais.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-t09-1',
        codigo: '09.1',
        solucaoIniciativa:
          'Revisão Normativa, Simplificação de Fluxos (TOTVS RM / Ping), Redução de Prazos e Ciclo Completo Financeiro/CNAB',
        vinculoResultadoEsperado: 'Automatizar e padronizar fluxos administrativos',
        unidadeResponsavel:
          'DAF / Gerência, Compras, Almoxarifado e Contabilidade/Financeiro',
        unidadesParceiras:
          'CPL (Portaria 47/2026), DAF / TI, ACI, Superintendência, DETEC e DATEG',
        detalhamentoTecnico:
          'Revisão e normatização interna dos fluxos operacionais de requisições de compra e pedidos ao Almoxarifado, eliminando o retrabalho entre o lançamento no TOTVS RM e a tramitação do mesmo documento no Sistema Ping; simplificação das etapas internas de compras e licitações junto à CPL para reduzir os prazos médios de contratação; parametrização integral do TOTVS RM para cobrir todo o ciclo operacional (cadastramento contratual, liquidação fiscal/contábil até o efetivo pagamento); e migração dos pagamentos para remessa bancária em lote (CNAB) com leitura do arquivo de retorno no TOTVS RM para baixa automatizada de Notas Fiscais e conciliação diária sem digitação manual.'
      },
      {
        id: 'sol-t09-2',
        codigo: '09.2',
        solucaoIniciativa:
          'Plano Anual de Contratações (PAC), Padronização de Artefatos (PA/TR) e Gestão de Contratos (ContratosGov / LGPD)',
        vinculoResultadoEsperado: 'Fortalecer a gestão de compras, contratos e almoxarifado',
        unidadeResponsavel: 'DAF / Gerência e Compras',
        unidadesParceiras: 'CPL (Portaria 47/2026), AJU, DPO e ACI, DETEC, DATEG',
        detalhamentoTecnico:
          'Consolidação do Plano Anual de Contratações (PAC) integrado à proposta orçamentária para evitar compras fracionadas ou emergenciais; padronização no Sistema Ping dos modelos de Planos de Ação e Termos de Referência, assegurando estimativas de valores fundamentadas por meio de pesquisas de preços em múltiplas fontes; atuação coordenada com a CPL (Portaria nº 47/2026); operação da plataforma especializada de gestão de contratos (ContratosGov) pela Gerência do DAF e Setor de Compras com alertas preventivos de vigência, saldo e reajuste; padronização da fiscalização contratual; e adequação integral dos instrumentos à Lei Geral de Proteção de Dados (LGPD).'
      },
      {
        id: 'sol-t09-3',
        codigo: '09.3',
        solucaoIniciativa:
          'Inteligência de Estoques (PVPS), Desfazimento, Barreira Contábil e Atualização da Norma do Fundo Fixo',
        vinculoResultadoEsperado:
          'Garantir conformidade, rastreabilidade e eficiência nos processos',
        unidadeResponsavel: 'DAF / Almoxarifado e Contabilidade/Financeiro',
        unidadesParceiras:
          'DETEC, DATEG, Assessoria de Controle Interno (ACI) e Setor Jurídico (AJU)',
        detalhamentoTecnico:
          'Aplicação rigorosa das Instruções de Serviço vigentes com bloqueio sistêmico no TOTVS RM para notas fiscais com divergência física ou tributária; ativação de logs auditáveis de edição/exclusão de requisições; gestão de giro e validade PVPS (Primeiro que Vence, Primeiro que Sai); execução anual da Política de Desfazimento e baixa contábil de insumos e materiais gráficos/didáticos obsoletos do Almoxarifado mediante parecer e aval formal das áreas técnicas detentoras (DETEC e DATeG) e validação da Gerência do DAF, Contabilidade e ACI; implantação da Barreira Contábil com exigência de ordem cronológica e checklist documental obrigatório (devolvendo à origem processos com instrução incompleta ou falta de assinaturas/relatórios), acompanhada de capacitações periódicas com as áreas demandantes sobre montagem de processos no Sistema Ping; e revisão e atualização da norma interna do Fundo Fixo, mantendo a sistemática de adiantamento, readequando tetos operacionais, simplificando a prestação de contas e treinando as áreas demandantes.'
      },
      {
        id: 'sol-t09-4',
        codigo: '09.4',
        solucaoIniciativa:
          'Gestão da Cadeia Logística, Roteirização e Distribuição aos Sindicatos e Polos do Interior',
        vinculoResultadoEsperado: 'Aprimorar a logística de entregas aos sindicatos e regiões',
        unidadeResponsavel: 'DAF / Almoxarifado',
        unidadesParceiras:
          'DAF / Compras, DETEC, DATEG, Sindicatos Rurais e Transportadoras',
        detalhamentoTecnico:
          'Estruturação do calendário mensal de abastecimento e expedição para os Sindicatos Rurais, Regional de Ji-Paraná e escritórios avançados; implantação de protocolo digital de despacho e confirmação de recebimento no destino; e gestão de desempenho (prazos e integridade) das transportadoras terceirizadas.'
      },
      {
        id: 'sol-t09-5',
        codigo: '09.5',
        solucaoIniciativa:
          'Inteligência Fiscal, Gestão Operacional da Arrecadação, Governança LGPD e Visitas Orientativas nas Macrorregiões',
        vinculoResultadoEsperado:
          'Automatizar e padronizar fluxos administrativos / Aprimorar a logística nas regiões',
        unidadeResponsavel: 'DAF / Gerência e Arrecadação',
        unidadesParceiras:
          'DAF / TI, DAF / Compras, CPL (Portaria 47/2026), DPO, Comitê LGPD, AJU, ACI e Sindicatos Rurais',
        detalhamentoTecnico:
          'Aquisição/contratação de solução tecnológica de inteligência fiscal e cruzamento de bases de dados públicas, cadastrais e convênios institucionais autorizados (como CAR, CAF/DAP, dados públicos da Receita Federal, cadastros estaduais/IDARON e bases próprias do Sistema CNA/SENAR) para identificar, mapear e localizar potenciais contribuintes rurais e empresas do agronegócio em Rondônia; implantação de sistema interno de gestão operacional da Arrecadação integrando Cadastro Unificado (histórico completo da base de contribuintes ativos e prospectados) e Módulo de Gestão de Visitas e Terceirizados (agendamento, roteirização, registro de relatórios de visitas orientativas de campo e controle de desempenho/entregas das empresas terceirizadas); operação em estrita conformidade com a LGPD em alinhamento com a DPO e o Comitê Multidisciplinar (sob hipóteses legais válidas e controle rigoroso de privilégios de acesso); e estruturação de modelo de credenciamento/terceirização para execução descentralizada de visitas orientativas e preventivas aos contribuintes nas 3 macrorregiões do estado (Norte, Central e Sul).'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-t09-1',
        codigo: '09.1',
        nome: 'Fluxos Padronizados (TOTVS RM/Ping), Pagamentos via CNAB Automático e Redução de Prazos',
        unidadeMedida: '%',
        linhaBase2026: 'Apuração base Dez/2026 (RM/Ping/CPL)',
        meta2027: '75% fluxos / 80% CNAB (-10% prazo)',
        meta2028: '85% fluxos / 90% CNAB (-15% prazo)',
        meta2029: '95% fluxos / 95% CNAB (-18% prazo)',
        meta2030: '100% fluxos / 100% CNAB (-20% prazo)',
        fonteVerificacao: 'TOTVS RM, Arquivos CNAB, Sistema Ping e Relatório CPL'
      },
      {
        id: 'kpi-t09-2',
        codigo: '09.2',
        nome: 'Taxa de Execução do PAC, Artefatos Padronizados (PA/TR) e Contratos Vigentes (ContratosGov)',
        unidadeMedida: '%',
        linhaBase2026: '0,0% (Novo PAC e Padronização 2027)',
        meta2027: '80,0%',
        meta2028: '90,0%',
        meta2029: '95,0%',
        meta2030: '≥98,0%',
        fonteVerificacao: 'Relatório PAC, Ping, CPL, ContratosGov e AJU'
      },
      {
        id: 'kpi-t09-3',
        codigo: '09.3',
        nome: 'Conformidade Documental (Barreira Contábil), Acuracidade PVPS e Norma do Fundo Fixo Atualizada',
        unidadeMedida: '%',
        linhaBase2026: 'Apuração base Dez/2026 (Almox./Contab.)',
        meta2027: '92,0% (Fundo Fixo 100%)',
        meta2028: '96,0%',
        meta2029: '98,0%',
        meta2030: '≥99,0%',
        fonteVerificacao: 'Logs TOTVS RM, Pareceres (DETEC/DATEG), Contabilidade e ACI'
      },
      {
        id: 'kpi-t09-4',
        codigo: '09.4',
        nome: 'Taxa de Entregas Logísticas aos Sindicatos e Interior Concluídas Dentro do Prazo',
        unidadeMedida: '%',
        linhaBase2026: 'Apuração base Dez/2026 (Protocolos Frete)',
        meta2027: '85,0%',
        meta2028: '90,0%',
        meta2029: '95,0%',
        meta2030: '≥98,0%',
        fonteVerificacao: 'Protocolos Digitais de Expedição e Relatórios de Frete'
      },
      {
        id: 'kpi-t09-5',
        codigo: '09.5',
        nome: 'Cobertura das Visitas Orientativas nas 3 Macrorregiões e Operação do Sistema de Arrecadação (LGPD)',
        unidadeMedida: '%',
        linhaBase2026: '0,0% (Novo Sistema e Terceirização)',
        meta2027: '80,0% (Sistema 100%)',
        meta2028: '90,0%',
        meta2029: '95,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Sistema de Gestão da Arrecadação, Relatórios de Campo, DPO e ACI'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-t09-1',
        codigo: '09.1',
        iniciativaEstrategica:
          'Simplificação de Fluxos, Redução de Prazos e Ciclo Completo/CNAB (TOTVS RM)',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 0,
        orcamento2028: 0,
        orcamento2029: 0,
        orcamento2030: 0,
        total: 0
      },
      {
        id: 'cron-t09-2',
        codigo: '09.2',
        iniciativaEstrategica:
          'Plano Anual de Contratações (PAC), Artefatos (PA/TR) e Contratos (ContratosGov/LGPD)',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 50000.0,
        orcamento2028: 52250.0,
        orcamento2029: 54601.25,
        orcamento2030: 57058.31,
        total: 213909.56
      },
      {
        id: 'cron-t09-3',
        codigo: '09.3',
        iniciativaEstrategica:
          'Estoques (PVPS), Desfazimento, Barreira Contábil e Atualização do Fundo Fixo',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 0,
        orcamento2028: 0,
        orcamento2029: 0,
        orcamento2030: 0,
        total: 0
      },
      {
        id: 'cron-t09-4',
        codigo: '09.4',
        iniciativaEstrategica:
          'Cadeia Logística, Roteirização e Distribuição aos Sindicatos e Interior (Fretes)',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 120000.0,
        orcamento2028: 125400.0,
        orcamento2029: 131043.0,
        orcamento2030: 136939.93,
        total: 513382.93
      },
      {
        id: 'cron-t09-5',
        codigo: '09.5',
        iniciativaEstrategica:
          'Inteligência Fiscal, Sistema de Gestão da Arrecadação e Terceirização de Visitas',
        ano2027: 'Q1–Q4',
        ano2028: 'Q1–Q4',
        ano2029: 'Q1–Q4',
        ano2030: 'Q1–Q4',
        orcamento2027: 626000.0,
        orcamento2028: 654170.0,
        orcamento2029: 683607.65,
        orcamento2030: 714369.99,
        total: 2678147.64
      }
    ],
    notaMetodologicaOrcamento:
      'Nota Metodológica: As iniciativas 09.1 e 09.3 são executadas com recursos e equipes internas do SENAR-AR/RO, sem desembolso orçamentário adicional. A linha 09.2 reflete o custo anual real da plataforma ContratosGov (base R$ 50.000,00 em 2027). A linha 09.4 utiliza a base real de despesas com fretes e envio de materiais extraída do TOTVS RM (frete.XLSX: R$ 123.720,32 em 2024; R$ 131.236,43 em 2025; R$ 101.567,19 até novembro/2026), fixada em R$ 120.000,00 para 2027. A linha 09.5 consolida o orçamento anual base de R$ 626.000,00 em 2027, composto por R$ 576.000,00 destinados às empresas terceirizadas de visitas orientativas nas 3 macrorregiões (Norte, Central e Sul) e R$ 50.000,00 para o sistema de gestão/inteligência da Arrecadação. Todas as projeções de 2028 a 2030 foram reajustadas pela média de 4,5% a.a. do IPCA.',
    governanca: {
      statusGeral: 'Não iniciada (Ciclo Inicia em 2027)',
      percentualExecucao: 0.0,
      periodicidadeMonitoramento: 'Trimestral (com reportes mensais internos)',
      ultimaAtualizacao: 'Novembro/2026',
      ritosInstitucionais: [
        '1. Reporte Operacional Mensal: Acompanhamento interno pela Gerência do DAF do cumprimento dos prazos de requisições e contratações (TOTVS RM/Ping/CPL), baixa automática CNAB, vencimentos de contratos (do setor DAF) no ContratosGov, giro/validade PVPS no Almoxarifado, prazos de fretes e relatórios das visitas orientativas da Arrecadação.',
        '2. Monitoramento Trimestral de Desempenho: Apresentação dos indicadores (KPIs) de processos, compras, contratos, cadeia logística e expansão da arrecadação à Superintendência e ao Comitê de Planejamento.',
        '3. Auditoria de Conformidade e LGPD: Validação semestral/anual junto à CPL (Portaria nº 47/2026), Setor Jurídico (AJU), DPO/Comitê LGPD e Assessoria de Controle Interno (ACI) quanto à aderência aos normativos internos vigentes e à proteção de dados cadastrais.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-t09-1',
        fatorCritico: 'Fluxos administrativos informais, retrabalho manual ou requisições fora do PAC',
        impactoPotencial:
          'Fracionamento de despesa, sobrecarga da CPL, falhas de conciliação e dilatação dos prazos de contratação.',
        providenciaMitigadora:
          'Padronização entre TOTVS RM e Ping, implantação do ciclo completo financeiro e remessa CNAB automática no TOTVS RM, e bloqueio de solicitações fora do PAC sem aval da Gerência do DAF.'
      },
      {
        id: 'risk-t09-2',
        fatorCritico:
          'Artefatos técnicos incompletos, perda de vigência contratual ou processos mal instruídos',
        impactoPotencial:
          'Retrabalho contábil, quebra da ordem cronológica e execução sem cobertura contratual.',
        providenciaMitigadora:
          'Padronização de Planos de Ação e Termos de Referência no Ping, aplicação rigorosa da Barreira Contábil com capacitação das áreas demandantes, revisão da norma do Fundo Fixo e alertas automáticos no ContratosGov.'
      },
      {
        id: 'risk-t09-3',
        fatorCritico:
          'Divergência fiscal/física no recebimento, perda por vencimento ou atrasos em fretes',
        impactoPotencial:
          'Glosas contábeis, desperdício de materiais didáticos e comprometimento das ações nos Sindicatos.',
        providenciaMitigadora:
          'Bloqueio sistêmico no TOTVS RM para NF divergente, controle PVPS, desfazimento anual mediante aval técnico (DETEC/DATEG), protocolo digital de expedição e avaliação das transportadoras.'
      },
      {
        id: 'risk-t09-4',
        fatorCritico: 'Exposição indevida de dados cadastrais ou baixa cobertura nas visitas de Arrecadação',
        impactoPotencial:
          'Riscos de não conformidade com a LGPD e perda de potencial de expansão da receita.',
        providenciaMitigadora:
          'Governança estrita das bases fiscais junto à DPO e Comitê LGPD (controle de acessos e hipóteses legais válidas), sistema operacional de arrecadação e gestão de metas das terceirizadas nas macrorregiões Norte, Central e Sul.'
      }
    ],
    fundamentacaoTecnica:
      'As ações deste objetivo alinham-se ao Mapa Estratégico do SENAR-AR/RO (2027–2030), ao Planejamento Estratégico Setorial do DAF (2027–2030), à Portaria nº 47/2026 (CPL), ao Regulamento de Licitações e Contratos do SENAR, às Instruções de Serviço vigentes, às Normas Brasileiras de Contabilidade Aplicadas ao Setor Público (NBC TSP) e à Lei nº 13.709/2018 (LGPD).'
  }
];
