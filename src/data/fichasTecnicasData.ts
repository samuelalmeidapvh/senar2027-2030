import { FichaTecnicaObjetivo } from '../types/strategic';
import { FICHA_02_TEMAS } from './ficha02TemasData';

export const FICHAS_TECNICAS_INICIAIS: FichaTecnicaObjetivo[] = [
  // =========================================================================
  // 1. PERSPECTIVA: SOCIEDADE
  // =========================================================================
  {
    id: 'ficha-oe-sociedade-01',
    codigoObjetivo: '01',
    nomeObjetivo: 'IMPACTO E RESULTADOS PARA A SOCIEDADE',
    enunciado:
      'Maximizar o valor público entregue pelo SENAR-AR/RO através do aumento da produtividade, renda no campo, competitividade sustentável e melhoria contínua da qualidade de vida das famílias rurais de Rondônia.',
    perspectivaBsc: 'SOCIEDADE',
    unidadeResponsavelLider: 'Superintendência e Diretorias Técnicas - SENAR-AR/RO',
    unidadesParceiras:
      'FAPERON, Sindicatos dos Produtores Rurais, DETEC, DATEG, DAF, ACI e Parceiros Institucionais',
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
        detalhamentoTecnico:
          'Articulação interinstitucional para entrega coordenada de assistência técnica, qualificação profissional e promoção da saúde preventiva em todos os 52 municípios de Rondônia.'
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
        orcamento2029: 350000,
        orcamento2030: 350000,
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
        providenciaMitigadora:
          'Difusão de práticas agrícolas regenerativas, seguro rural e gestão financeira preventiva.'
      }
    ],
    fundamentacaoTecnica:
      'Constituição Federal de 1988 (Art. 187), Lei nº 8.315/1991 e Diretrizes Estratégicas do Sistema CNA/SENAR.',
    assinaturaResponsavel: 'Superintendência Regional do SENAR-AR/RO'
  },

  // =========================================================================
  // 2. PERSPECTIVA: CLIENTES — 01 FORMAÇÃO PROFISSIONAL E EDUCAÇÃO (DETEC)
  // =========================================================================
  {
    id: 'ficha-oe-01-detec-fpr',
    codigoObjetivo: '01',
    nomeObjetivo: 'FORMAÇÃO PROFISSIONAL E EDUCAÇÃO',
    enunciado:
      'Fortalecer e ampliar a assistência técnica rural, a promoção social, a capacitação e a formação profissional por meio de uma gestão ágil, moderna e de qualidade nos resultados.',
    perspectivaBsc: 'CLIENTES',
    unidadeResponsavelLider: 'Departamento Técnico (DETEC)',
    unidadesParceiras:
      'Setor Jurídico, DAF, DATeg, Controle Interno, Gestão de Pessoas (RH), TI, Comitê de Governança e Riscos',
    responsavelPreenchimento: 'Anderson Leite',
    cargoResponsavel: 'Gerente Técnico – Detec SENAR-AR/RO',
    dataElaboracaoRevisao: 'Outubro de 2026 (Ciclo de Planejamento Estratégico 2027–2030)',
    diretrizesResultados: [
      'Ampliar a oferta de cursos alinhados às demandas regionais: A ampliação da oferta de cursos será orientada pela análise dos cursos de maior demanda e execução em cada região, dos indicadores populacionais e das principais cadeias produtivas e atividades econômicas locais, de forma a direcionar as ações de Formação Profissional Rural às necessidades específicas de cada território. Essa abordagem permitirá ampliar a efetividade das capacitações, fortalecer o atendimento aos produtores e trabalhadores rurais e contribuir para o desenvolvimento de competências relacionadas às cadeias produtivas de maior relevância regional.',
      'Aumentar a aplicação prática do conhecimento: Ampliar a efetividade das ações de Formação Profissional Rural, promovendo a aplicação prática dos conhecimentos adquiridos pelos produtores e trabalhadores rurais em suas atividades produtivas. Priorizar metodologias que integrem teoria e prática, considerando as necessidades das cadeias produtivas e as especificidades regionais, de modo a transformar a capacitação em melhoria efetiva dos processos, da produtividade, da gestão e da geração de resultados no meio rural.',
      'Fortalecer programas de Promoção Social e educação de base: Ampliando o acesso das famílias rurais a conhecimentos, competências e oportunidades que contribuam para a melhoria da qualidade de vida, inclusão social, autonomia e desenvolvimento sustentável. Direcionar os programas às necessidades identificadas nos territórios, fortalecendo parcerias e ações integradas que promovam o desenvolvimento social e educacional das comunidades rurais.',
      'Estimular a participação recorrente e trilhas de aprendizagem: Estruturar mecanismos que estimulem a participação contínua do público rural nas ações do SENAR, evoluindo de uma oferta pontual de cursos para jornadas estruturadas de desenvolvimento de competências. Implantar e fortalecer trilhas de aprendizagem articuladas às diferentes etapas de desenvolvimento profissional e às necessidades das cadeias produtivas, incentivando a continuidade da formação, o aperfeiçoamento progressivo e a permanência do produtor e trabalhador rural nas ações da instituição.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-detec-02-1',
        codigo: '02.1',
        solucaoIniciativa: 'Incorporação de novas tecnologias e inovação.',
        vinculoResultadoEsperado:
          'Ampliar a eficiência, a qualidade e a capacidade de inovação das ações do Departamento Técnico, por meio da adoção de tecnologias que aprimorem o planejamento, a execução, o monitoramento e a avaliação dos serviços prestados ao público-alvo.',
        unidadeResponsavel: 'Departamento de TI.',
        unidadesParceiras: 'Todas as Unidades',
        detalhamentoTecnico:
          'Adoção progressiva de ferramentas digitais e soluções tecnológicas voltadas ao planejamento, execução em campo, monitoramento e avaliação da Formação Profissional Rural e Promoção Social.'
      },
      {
        id: 'sol-detec-02-2',
        codigo: '02.2',
        solucaoIniciativa: 'Modernização dos sistemas produtivos.',
        vinculoResultadoEsperado:
          'Sistemas produtivos promover a modernização e a melhoria contínua dos processos e sistemas utilizados na execução das ações técnicas, assegurando maior integração, confiabilidade dos dados, agilidade operacional e suporte à tomada de decisão.',
        unidadeResponsavel:
          'Departamento de TI, DOT Suporte do Sistema de Gestão de cursos Senar nas Nuvens Plus e Senar Central.',
        unidadesParceiras: 'DETEC, DATeG, TI.',
        detalhamentoTecnico:
          'Evolução e integração contínua entre Senar nas Nuvens Plus (SNN+), Sistego e painéis corporativos para maior confiabilidade de dados e agilidade operacional.'
      },
      {
        id: 'sol-detec-02-3',
        codigo: '02.3',
        solucaoIniciativa: 'Comunicação',
        vinculoResultadoEsperado:
          'Fortalecer a comunicação institucional e técnica, ampliando a disseminação das ações, resultados, oportunidades e informações.',
        unidadeResponsavel: 'Senar Rondônia',
        unidadesParceiras: 'Todas as Unidades',
        detalhamentoTecnico:
          'Alinhamento da comunicação institucional e técnica junto aos sindicatos, produtores e trabalhadores rurais para maior alcance das programações e resultados.'
      },
      {
        id: 'sol-detec-02-4',
        codigo: '02.4',
        solucaoIniciativa: 'Desburocratização de processos operacionais',
        vinculoResultadoEsperado:
          'Simplificar e padronizar os processos operacionais, reduzindo etapas, retrabalho, inconsistências e tempo de tramitação, com maior segurança, transparência e eficiência na execução das atividades do Departamento Técnico.',
        unidadeResponsavel: 'Departamento Técnico, Controle Interno e Jurídico.',
        unidadesParceiras: 'Todas as Unidades, Setor Jurídico, Planejamento, Contabilidade, TI',
        detalhamentoTecnico:
          'Simplificação e padronização dos fluxos documentais e administrativos da FPR, PE-FPR, OA, PS e PE-PS com segurança jurídica e celeridade.'
      },
      {
        id: 'sol-detec-02-5',
        codigo: '02.5',
        solucaoIniciativa: 'Atualização e diversificação de catálogo de cursos.',
        vinculoResultadoEsperado:
          'Ampliar e atualizar a oferta de cursos, alinhando o catálogo às demandas atuais e futuras do setor produtivo rural e às necessidades dos produtores e trabalhadores rurais, aumentando a aderência e a efetividade das ações de formação.',
        unidadeResponsavel: 'Departamento Técnico.',
        unidadesParceiras: 'DETEC, DATeG',
        detalhamentoTecnico:
          'Revisão periódica do portfólio de capacitações de acordo com a vocação econômica territorial e evolução tecnológica das cadeias produtivas.'
      },
      {
        id: 'sol-detec-02-6',
        codigo: '02.6',
        solucaoIniciativa: 'Redução e flexibilização de carga horária',
        vinculoResultadoEsperado:
          'Adequar a carga horária das ações de formação às características e necessidades do público-alvo, proporcionando maior flexibilidade de acesso, participação e conclusão, sem comprometer a qualidade e os objetivos educacionais.',
        unidadeResponsavel: 'Departamento Técnico.',
        unidadesParceiras: 'DETEC, DATeG',
        detalhamentoTecnico:
          'Adequação modular e flexibilização de carga horária para facilitar a adesão e permanência do produtor e trabalhador rural sem perda de rigor pedagógico.'
      },
      {
        id: 'sol-detec-02-7',
        codigo: '02.7',
        solucaoIniciativa: 'Formação híbrida',
        vinculoResultadoEsperado:
          'Ampliar o acesso e a flexibilidade das ações de formação por meio da integração de modalidades presencial e a distância, aumentando o alcance territorial, a participação do público-alvo e a eficiência na oferta educacional.',
        unidadeResponsavel: 'Departamento Técnico.',
        unidadesParceiras: 'DETEC, DATeG',
        detalhamentoTecnico:
          'Integração de conteúdos presenciais práticos e momentos a distância para maximizar a capilaridade educacional nos municípios rondonienses.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-detec-03-1',
        codigo: '03.1',
        nome: 'Índice de projeção de turmas.',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '15%',
        meta2027: '1.574',
        meta2028: '1.810',
        meta2029: '2.082',
        meta2030: '2.394',
        fonteVerificacao: 'Relatório consolidado Senar nas Nuvens Plus (SNN+) e Sistego.'
      },
      {
        id: 'kpi-detec-03-2',
        codigo: '03.2',
        nome: 'Índice de projeção de participantes.',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '15%',
        meta2027: '28.148',
        meta2028: '32.370',
        meta2029: '37.226',
        meta2030: '42.809',
        fonteVerificacao: 'Relatório consolidado Senar nas Nuvens Plus (SNN+) e Sistego.'
      },
      {
        id: 'kpi-detec-03-3',
        codigo: '03.3',
        nome: 'Projeção de Produtores Rurais Atendidos.',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '30%',
        meta2027: '8.444',
        meta2028: '9.711',
        meta2029: '11.168',
        meta2030: '12.843',
        fonteVerificacao: 'Relatório consolidado Senar nas Nuvens Plus (SNN+) e Sistego.'
      },
      {
        id: 'kpi-detec-03-4',
        codigo: '03.4',
        nome: 'Crescimento Orçamentário.',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '15%',
        meta2027: 'R$ 11.857.576,00',
        meta2028: 'R$ 13.636.212,40',
        meta2029: 'R$ 15.681.644,26',
        meta2030: 'R$ 18.033.890,90',
        fonteVerificacao: 'Relatório consolidado Sistego.'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-detec-01-1',
        codigo: '01.1',
        tipoPlano: 'FPR',
        iniciativaEstrategica: 'Formação Profissional Rural (FPR)',
        ano2027: '18.126',
        ano2028: '20.845',
        ano2029: '23.972',
        ano2030: '27.567',
        orcamento2027: 7713070.0,
        orcamento2028: 8870030.5,
        orcamento2029: 10200535.08,
        orcamento2030: 11730615.34,
        total: 38514250.92
      },
      {
        id: 'cron-detec-01-2',
        codigo: '01.2',
        tipoPlano: 'PE-FPR',
        iniciativaEstrategica: 'Programas Especiais – FPR (PE-FPR)',
        ano2027: '450',
        ano2028: '518',
        ano2029: '595',
        ano2030: '684',
        orcamento2027: 348400.0,
        orcamento2028: 400660.0,
        orcamento2029: 460759.0,
        orcamento2030: 529872.85,
        total: 1739691.85
      },
      {
        id: 'cron-detec-01-3',
        codigo: '01.3',
        tipoPlano: 'OA',
        iniciativaEstrategica: 'Outras Ações (OA)',
        ano2027: '3.667',
        ano2028: '4.217',
        ano2029: '4.850',
        ano2030: '5.577',
        orcamento2027: 832750.0,
        orcamento2028: 957662.5,
        orcamento2029: 1101311.88,
        orcamento2030: 1266508.66,
        total: 4158233.04
      },
      {
        id: 'cron-detec-01-4',
        codigo: '01.04',
        tipoPlano: 'PS',
        iniciativaEstrategica: 'Promoção Social (PS)',
        ano2027: '5.385',
        ano2028: '6.193',
        ano2029: '7.122',
        ano2030: '8.190',
        orcamento2027: 2337786.0,
        orcamento2028: 2688453.9,
        orcamento2029: 3091721.99,
        orcamento2030: 3555480.28,
        total: 11673442.17
      },
      {
        id: 'cron-detec-01-5',
        codigo: '01.05',
        tipoPlano: 'PE-PS',
        iniciativaEstrategica: 'Programas Especiais – PS (PE-PS)',
        ano2027: '520',
        ano2028: '598',
        ano2029: '688',
        ano2030: '791',
        orcamento2027: 625570.0,
        orcamento2028: 719405.5,
        orcamento2029: 827316.33,
        orcamento2030: 951413.77,
        total: 3123705.6
      }
    ],
    governanca: {
      statusGeral: 'Planejado / Em Estruturação',
      percentualExecucao: 0.0,
      periodicidadeMonitoramento: 'Trimestral',
      ultimaAtualizacao: '26/10/2026',
      ritosInstitucionais: [
        '1. Monitoramento trimestral das metas físicas (turmas, participantes e produtores atendidos) via SNN+ e Sistego.',
        '2. Análise comparativa trimestral da execução física e financeira por Tipo de Plano (FPR, PE-FPR, OA, PS, PE-PS).',
        '3. Reporte deliberativo aos comitês de governança e alinhamento com sindicatos rurais e unidades parceiras.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-detec-06-2',
        codigo: '06.2',
        fatorCritico: 'Ampliação da oferta',
        observacaoRisco:
          'O crescimento projetado de turmas, participantes e produtores atendidos exige aumento proporcional da capacidade de planejamento, mobilização, execução e acompanhamento.',
        impactoPotencial:
          'Sobrecarga operacional, redução da qualidade e dificuldade no cumprimento das metas.',
        providenciaMitigadora:
          'Realizar expansão gradual e monitorada da oferta, compatibilizando metas físicas, orçamento, capacidade operacional e disponibilidade de instrutores, parceiros e infraestrutura.'
      },
      {
        id: 'risk-detec-06-4',
        codigo: '06.4',
        fatorCritico: 'Participação recorrente e trilhas de aprendizagem',
        observacaoRisco:
          'A participação do público pode permanecer concentrada em ações isoladas, dificultando a consolidação de jornadas de desenvolvimento profissional.',
        impactoPotencial:
          'Baixa recorrência dos participantes e menor desenvolvimento progressivo de competências.',
        providenciaMitigadora:
          'Estruturar trilhas de aprendizagem por perfil profissional e cadeia produtiva, criando estratégias de acompanhamento e incentivo à continuidade da formação.'
      },
      {
        id: 'risk-detec-06-5',
        codigo: '06.5',
        fatorCritico: 'Modernização e integração dos sistemas',
        observacaoRisco:
          'Dependência da evolução dos sistemas de gestão e da integração das informações utilizadas no planejamento, execução e prestação de contas.',
        impactoPotencial:
          'Inconsistências, retrabalho, perda de confiabilidade dos dados e atraso na tomada de decisão.',
        providenciaMitigadora:
          'Priorizar a integração e modernização dos sistemas, definir requisitos junto às áreas responsáveis e estabelecer rotinas de validação e conciliação das informações.'
      },
      {
        id: 'risk-detec-06-7',
        codigo: '06.7',
        fatorCritico: 'Capacidade técnica e operacional',
        observacaoRisco:
          'O aumento da oferta poderá exigir adequação da capacidade das equipes e maior articulação entre os departamentos envolvidos.',
        impactoPotencial: 'Gargalos na execução, análise e acompanhamento das ações.',
        providenciaMitigadora:
          'Avaliar continuamente a capacidade operacional, promover capacitação das equipes e alinhar a expansão das metas à disponibilidade de recursos humanos e tecnológicos.'
      },
      {
        id: 'risk-detec-06-8',
        codigo: '06.8',
        fatorCritico: 'Execução orçamentária',
        observacaoRisco:
          'O crescimento das metas físicas deve ser acompanhado do adequado dimensionamento dos recursos financeiros e da capacidade de execução do orçamento.',
        impactoPotencial:
          'Desequilíbrio entre execução física e financeira, comprometendo a sustentabilidade do planejamento.',
        providenciaMitigadora:
          'Monitorar trimestralmente a execução física e financeira, analisar desvios e promover ajustes tempestivos na programação e na alocação dos recursos.'
      },
      {
        id: 'risk-detec-06-9',
        codigo: '06.9',
        fatorCritico: 'Articulação com sindicatos e parceiros',
        observacaoRisco:
          'A execução das ações depende da capacidade dos sindicatos e parceiros de identificar demandas, mobilizar o público e apoiar a realização das atividades.',
        impactoPotencial:
          'Baixa mobilização, redução da participação e dificuldade de alcance das metas territoriais.',
        providenciaMitigadora:
          'Fortalecer a comunicação e o alinhamento estratégico com sindicatos e parceiros, promovendo orientação, capacitação e acompanhamento dos resultados.'
      },
      {
        id: 'risk-detec-06-10',
        codigo: '06.10',
        fatorCritico: 'Mudanças normativas e institucionais',
        observacaoRisco:
          'Alterações em normas, metodologias, sistemas, diretrizes da Administração Central ou condições orçamentárias podem afetar as metas estabelecidas.',
        impactoPotencial:
          'Necessidade de revisão das estratégias, cronogramas e metas durante o ciclo.',
        providenciaMitigadora:
          'Manter acompanhamento sistemático das alterações normativas e institucionais e realizar revisões periódicas do planejamento, assegurando flexibilidade e aderência às novas diretrizes.'
      },
      {
        id: 'risk-detec-06-11',
        codigo: '06.11',
        fatorCritico: 'Monitoramento e governança',
        observacaoRisco:
          'O alcance dos resultados depende de acompanhamento sistemático e atuação integrada das áreas corresponsáveis.',
        impactoPotencial:
          'Ineficiência na identificação de desvios e capacidade de resposta limitada no curso da implementação.',
        providenciaMitigadora:
          'Implementar processo de monitoramento trimestral de metas e indicadores, contemplando mapeamento de desvios, prazos, plano corretivo e reporte deliberativo aos comitês de governança.'
      }
    ],
    fundamentacaoTecnica:
      'A execução dos objetivos estratégicos será conduzida de forma gradual, integrada e orientada por resultados, considerando a capacidade operacional, tecnológica e orçamentária do SENAR-AR/RO. O acompanhamento trimestral dos indicadores permitirá identificar desvios, avaliar riscos e promover ajustes tempestivos nas ações, assegurando a aderência das metas às necessidades dos produtores e trabalhadores rurais e às diretrizes estratégicas estabelecidas para o ciclo 2027–2030.',
    assinaturaResponsavel: 'Anderson Leite – Gerente Técnico – Detec SENAR-AR/RO'
  },

  // =========================================================================
  // 3. PERSPECTIVA: CLIENTES — 02 ASSISTÊNCIA TÉCNICA E GERENCIAL (DATEG)
  // =========================================================================
  {
    id: 'ficha-oe-02-dateg-ateg',
    codigoObjetivo: '02',
    nomeObjetivo: 'ASSISTÊNCIA TÉCNICA E GERENCIAL (ATeG)',
    enunciado:
      'Fortalecer e ampliar a assistência técnica rural, a promoção social, a capacitação e a formação profissional por meio de uma gestão ágil, moderna e de qualidade nos resultados.',
    desdobramento:
      'Consolidar a ATeG de Excelência em Rondônia, transformando a propriedade assistida em um negócio rural rentável e sustentável, por meio do aumento da margem líquida, do fortalecimento da gestão financeira e do acesso facilitado a crédito, mercados e tecnologias de precisão.',
    perspectivaBsc: 'CLIENTES',
    unidadeResponsavelLider: 'DATEG (Departamento de Assistência Técnica e Gerencial)',
    unidadesParceiras:
      'DETEC (FPR / Rede e-Tec), DAF (TI / Financeiro), ASCOM, FAPERON e Sindicatos dos Produtores Rurais (SPRs)',
    responsavelPreenchimento: 'Gerência e Coordenação Técnica do DATEG',
    cargoResponsavel:
      'Luiz Maurício dos Santos Leal (Gerente da ATeG) · Leonardo Mendes Cabral (Coordenador Adm. Financeiro - DATeG)',
    dataElaboracaoRevisao: '12/11/2026',
    diretrizesResultados: [
      'Ampliar a efetividade da ATeG (91,5% → ≥ 93%): mantendo a liderança em aplicação prática na propriedade (atualmente em 96,2%) e elevando a percepção de ganho econômico direto (atualmente em 72,2%).',
      'Expandir e especializar o atendimento nas cadeias produtivas estratégicas do estado: (Cafeicultura, Bovinocultura de Leite e Corte, Cacau, Piscicultura e Olericultura), adaptando a metodologia às realidades regionais e climáticas.',
      'Integrar a ATeG com cursos de Formação Profissional Rural (FPR), acesso a crédito rural e gestão empresarial ("além da porteira"): superando o atual índice de apenas 7,1% de produtores da ATeG que fazem cursos do SENAR.',
      'Aprimorar o uso de tecnologias, ferramentas digitais (coleta offline/georreferenciamento) e inteligência de dados (BI) no campo e na sede: reduzindo a burocracia interna.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-dateg-02-1',
        codigo: '02.1',
        solucaoIniciativa: 'Programa "ATeG Negócios & Excelência" (Gestão, Crédito e Mercado)',
        vinculoResultadoEsperado:
          'Eleva a maturidade empresarial do produtor, garante o controle de custos (COE) e conecta as propriedades a crédito rural e compras/vendas coletivas, respondendo aos 23,6% dos produtores que demandam gestão e crédito.',
        unidadeResponsavel: 'DATEG (Gerência e Supervisão)',
        unidadesParceiras:
          'FAPERON, Sindicatos Rurais (SPRs), Cooperativas de Crédito e Agroindústrias',
        detalhamentoTecnico:
          'Estruturação de convênios bancários e matriz de gestão (2027), expansão de compras/vendas coletivas e selo de referência (2028), consolidação nos 52 municípios e rodadas de negócios (2029) e auditoria de impacto econômico ROI (2030).'
      },
      {
        id: 'sol-dateg-02-2',
        codigo: '02.2',
        solucaoIniciativa: 'Trilhas Integradas de Capacitação & "SENAR Serviços"',
        vinculoResultadoEsperado:
          'Constrói a ponte entre ATeG e FPR (elevando a recorrência que aumenta a efetividade em até +20 pontos) e oferta consultorias pontuais de alta especialização (regularização ambiental, outorgas e análises laboratoriais) via Sindicatos.',
        unidadeResponsavel: 'DATEG e DETEC',
        unidadesParceiras: 'Sindicatos Rurais (SPRs), Rede e-Tec e Instituições de Pesquisa (Embrapa/Idaron)',
        detalhamentoTecnico:
          'Mapeamento de demandas e piloto do catálogo SENAR Serviços (2027), lançamento oficial das trilhas integradas por cadeia produtiva (2028), ampliação via Sindicatos Rurais como polos irradiadores (2029) e revisão de portfólio por cadeia (2030).'
      },
      {
        id: 'sol-dateg-02-3',
        codigo: '02.3',
        solucaoIniciativa: 'Transformação Digital, Painel de BI e Gestão Enxuta (Lean DATEG)',
        vinculoResultadoEsperado:
          'Substitui controles manuais por Dashboards de BI em tempo real, implanta coleta offline no campo, automatiza a checagem de certidões (RPA) e elimina gargalos no fluxo de pagamento entre empresas credenciadas e sede.',
        unidadeResponsavel: 'DATEG e TI (DAF)',
        unidadesParceiras: 'Controle Interno, Jurídico e ASCOM',
        detalhamentoTecnico:
          'Redesenho do fluxo de pagamento, robô de CNDs e piloto BI (2027), implantação do App offline e Painéis de BI em 80% das turmas (2028), automação total de contratos e Avaliação 360° da supervisão (2029) e operação 100% digital integrada ao sistema nacional (2030).'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-dateg-1',
        codigo: '02.1',
        nome: 'Índice de Efetividade Geral da ATeG (Aplicou, mudou e atribui ao SENAR)',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '91,5%',
        meta2027: '92,0%',
        meta2028: '92,5%',
        meta2029: '93,0%',
        meta2030: '93,5%',
        fonteVerificacao: 'Pesquisa Bienal de Efetividade / BI'
      },
      {
        id: 'kpi-dateg-2',
        codigo: '02.1',
        nome: 'Propriedades com Ganho Econômico Comprovado (Aumento de Margem Líquida/Produtividade)',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '72,2%',
        meta2027: '74,0%',
        meta2028: '76,0%',
        meta2029: '78,0%',
        meta2030: '80,0%',
        fonteVerificacao: 'Painel de BI ATeG / Relatórios Gerenciais'
      },
      {
        id: 'kpi-dateg-3',
        codigo: '02.1',
        nome: 'Volume de Crédito Rural e Negócios Coletivos Viabilizados via Laudo ATeG',
        unidadeMedida: 'R$ Milhões (Acumulado)',
        linhaBase2026: 'A mapear (R$ 0 base)',
        meta2027: 'R$ 6 Mi',
        meta2028: 'R$ 14 Mi',
        meta2029: 'R$ 26 Mi',
        meta2030: 'R$ 40 Mi',
        fonteVerificacao: 'Relatórios de Agentes de Negócios e Convênios'
      },
      {
        id: 'kpi-dateg-4',
        codigo: '02.2',
        nome: 'Taxa de Integração ATeG + FPR (Produtores ATeG que realizam cursos complementares)',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '7,1%',
        meta2027: '15,0%',
        meta2028: '25,0%',
        meta2029: '35,0%',
        meta2030: '45,0%',
        fonteVerificacao: 'Cruzamento de Cadastro (SISATEG x Sistema FPR)'
      },
      {
        id: 'kpi-dateg-5',
        codigo: '02.2',
        nome: 'Taxa de Retenção / Permanência de Produtores até o fim do ciclo',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: 'A consolidar (~78%)',
        meta2027: '80,0%',
        meta2028: '82,0%',
        meta2029: '84,0%',
        meta2030: '86,0%',
        fonteVerificacao: 'Controle de Turmas / SISATEG'
      },
      {
        id: 'kpi-dateg-6',
        codigo: '02.3',
        nome: 'Cobertura de Monitoramento via BI e Coleta Offline nas propriedades ativas',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: 'Em implantação',
        meta2027: '50,0%',
        meta2028: '80,0%',
        meta2029: '95,0%',
        meta2030: '100,0%',
        fonteVerificacao: 'Painel BI Institucional / TI'
      },
      {
        id: 'kpi-dateg-7',
        codigo: '02.3',
        nome: 'SLA de Tramitação Administrativa e Pagamentos (após encerramento técnico)',
        unidadeMedida: 'Dias úteis',
        linhaBase2026: '~15 dias',
        meta2027: '8 dias',
        meta2028: '6 dias',
        meta2029: '5 dias',
        meta2030: '4 dias',
        fonteVerificacao: 'Sistema de Protocolo / Financeiro (DAF)'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-dateg-02-1',
        codigo: '02.1',
        iniciativaEstrategica: '(ATeG Negócios, Crédito & Mercado)',
        ano2027: 'Estruturação de convênios bancários e matriz de gestão',
        ano2028: 'Expansão das compras/vendas coletivas e selo de referência',
        ano2029: 'Consolidação nos 52 municípios e rodadas de negócios',
        ano2030: 'Escala estadual e auditoria de impacto econômico (ROI)',
        orcamento2027: 100000,
        orcamento2028: 150000,
        orcamento2029: 200000,
        orcamento2030: 250000,
        total: 700000
      },
      {
        id: 'cron-dateg-02-2',
        codigo: '02.2',
        iniciativaEstrategica: '(Trilhas FPR+ATeG & SENAR Serviços)',
        ano2027: 'Mapeamento de demandas e piloto do catálogo SENAR Serviços',
        ano2028: 'Lançamento oficial das trilhas integradas por cadeia produtiva',
        ano2029: 'Ampliação via Sindicatos Rurais como polos irradiadores',
        ano2030: 'Consolidação e revisão de portfólio por cadeia',
        orcamento2027: 180000,
        orcamento2028: 220000,
        orcamento2029: 250000,
        orcamento2030: 280000,
        total: 930000
      },
      {
        id: 'cron-dateg-02-3',
        codigo: '02.3',
        iniciativaEstrategica: '(BI, Coleta Offline e Automação Lean)',
        ano2027: 'Redesenho de fluxo de pagamento, robô de CNDs e piloto BI',
        ano2028: 'Implantação do App offline e Painéis de BI em 80% das turmas',
        ano2029: 'Automação total de contratos e Avaliação 360° da supervisão',
        ano2030: 'Operação 100% digital e integrada ao sistema nacional',
        orcamento2027: 200000,
        orcamento2028: 200000,
        orcamento2029: 150000,
        orcamento2030: 150000,
        total: 700000
      }
    ],
    governanca: {
      statusGeral: 'Em andamento (Fase de estruturação do Planejamento 2027–2030)',
      percentualExecucao: 10.0,
      periodicidadeMonitoramento: 'Trimestral (Acompanhamento tático) / Bienal (Pesquisa de Efetividade)',
      ultimaAtualizacao: '12/11/2026',
      ritosInstitucionais: [
        '1. Acompanhamento Tático Trimestral dos indicadores de efetividade, crédito rural e integração ATeG+FPR.',
        '2. Replicação bienal da Pesquisa de Efetividade (2028 e 2030) incorporando variação percentual de renda líquida.',
        '3. Comitê Mensal DATEG + DETEC para cruzamento de diagnósticos de campo com o calendário de cursos FPR.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-dateg-1',
        fatorCritico: '1. Instabilidade sistêmica e conectividade rural',
        impactoPotencial:
          'Falhas no SISATEG e falta de sinal de internet em propriedades isoladas de Rondônia (apontado por 35,9% na Rede E-Tec e pelos supervisores de campo).',
        providenciaMitigadora:
          'Implantação do App de coleta offline com sincronização posterior e monitoramento via Painel BI.'
      },
      {
        id: 'risk-dateg-2',
        fatorCritico: '2. Gargalos "além da porteira" e sucessão familiar',
        impactoPotencial:
          'Falta de capital para investir (citada por 28,2% dos respondentes que não aplicaram conteúdos), oscilações climáticas/de mercado e envelhecimento no campo.',
        providenciaMitigadora:
          'Conexão a linhas de crédito rural via laudo ATeG, compras/vendas coletivas e trilhas focadas em gestão empresarial.'
      },
      {
        id: 'risk-dateg-3',
        fatorCritico: '3. Alinhamento sindical e capacitação técnica',
        impactoPotencial:
          'Necessidade de nivelar a atuação dos Sindicatos Rurais na mobilização e garantir perfil consultivo/gerencial aos técnicos de campo.',
        providenciaMitigadora:
          'Capacitação continuada dos técnicos, protocolo formal de comunicação sede-campo e Matriz de Avaliação 360° para supervisores e técnicos.'
      },
      {
        id: 'risk-dateg-4',
        fatorCritico: '4. Burocracia interna e sobrecarga',
        impactoPotencial:
          'Retenção de processos de pagamento na mesa da supervisão e acúmulo de tarefas administrativas pelos analistas da sede.',
        providenciaMitigadora:
          'Alteração imediata do fluxo sistêmico de pagamento (após endosso técnico do supervisor, segue direto para o administrativo/financeiro do DATEG) e automação de CNDs via RPA.'
      }
    ],
    premissasNotas: [
      {
        titulo: 'Providências Imediatas (Q4 2026 / Q1 2027)',
        itens: [
          'Fluxo de Pagamento: Alterar imediatamente o trâmite sistêmico para que, após o endosso técnico do supervisor, o processo siga direto do técnico de campo para o administrativo/financeiro do DATEG.',
          'Comitê DATEG + DETEC: Instituir agenda mensal fixa para cruzar o diagnóstico das propriedades assistidas com o calendário de cursos da FPR (foco inicial em Bovinocultura, Cafeicultura e Gestão/Crédito).',
          'Protocolo de Comunicação e Avaliação Qualitativa: Formalizar os canais de comunicação sede-campo (fim de demandas urgentes via mensagens informais) e implantar a Matriz de Avaliação 360° (técnica e comportamental) para supervisores e técnicos.',
          'Monitoramento Contínuo: Replicar a Pesquisa de Efetividade em 2028 e 2030 mantendo a mesma metodologia, incorporando pergunta objetiva sobre variação percentual de renda líquida.'
        ]
      }
    ],
    fundamentacaoTecnica:
      'A elaboração da Ficha Técnica do Objetivo Estratégico do DATEG (2027–2030) fundamenta-se na triangulação técnica entre os indicadores empíricos da Pesquisa de Efetividade (Sebrae/Ótima Inteligência), os diagnósticos participativos realizados com os supervisores de campo e colaboradores internos, e os direcionadores estratégicos do Sistema FAPERON/SENAR-RO. Esse alinhamento garante que as metas propostas superem a simples contagem de atividades operacionais e convirjam para um único propósito de negócio: modernizar a gestão interna e automatizar processos para transformar a propriedade rural assistida em um empreendimento rentável, sustentável e conectado ao mercado, ao crédito e às tecnologias de precisão em Rondônia.',
    assinaturaResponsavel:
      'Luiz Maurício dos Santos Leal (Gerente da Assistência Técnica e Gerencial) | Leonardo Mendes Cabral (Coordenador Administrativo Financeiro - DATeG)'
  },

  // =========================================================================
  // 4. PERSPECTIVA: CLIENTES — 03 Rede e-Tec E EDUCAÇÃO A DISTÂNCIA (DETEC)
  // =========================================================================
  {
    id: 'ficha-oe-03-detec-etec',
    codigoObjetivo: '03',
    nomeObjetivo: 'Rede e-Tec E EDUCAÇÃO A DISTÂNCIA',
    enunciado:
      'Fortalecer e ampliar a assistência técnica rural, a promoção social, a capacitação e a formação profissional por meio de uma gestão ágil, moderna e de qualidade nos resultados.',
    perspectivaBsc: 'CLIENTES',
    unidadeResponsavelLider: 'Departamento Técnico (DETEC) – Rede e-Tec',
    unidadesParceiras:
      'Setor Jurídico, DAF, DATeg, Controle Interno, Gestão de Pessoas (RH), TI, Comitê de Governança e Riscos',
    responsavelPreenchimento: 'Anderson Leite',
    cargoResponsavel: 'Gerente Técnico – Detec SENAR-AR/RO',
    dataElaboracaoRevisao: 'Outubro de 2026 (Ciclo de Planejamento Estratégico 2027–2030)',
    diretrizesResultados: [
      'Reduzir a evasão (29,2% → <15%): A retenção de alunos é um dos pilares fundamentais para a sustentabilidade e o sucesso de qualquer programa educacional. Para alcançar essa meta, é crucial implementar modelos como a flexibilização curricular e a modularização de disciplinas, permitindo que os estudantes tenham alternativas viáveis para recuperar conteúdos perdidos ou repor aulas, em vez de abandonarem o curso definitivamente; também deve ter um comprometimento da coordenação do polo no acompanhamento semanal dos diários de classes, a situação de cada aluno e o alinhamento constante com os tutores. Esse esforço de acolhimento e adaptação à realidade do aluno do campo é o que garantirá a continuidade de sua jornada acadêmica.',
      'Melhorar a plataforma e a conectividade: Isso significa investir em sistemas de gestão acadêmica que integrem coordenadores e tutores em tempo real, além de garantir que as ferramentas digitais sejam leves, intuitivas e resilientes, capazes de funcionar adequadamente mesmo em regiões onde o acesso à internet ainda representa um desafio logístico.',
      'Ampliar a oferta de cursos técnicos demandados (ex.: Zootecnia): Para que a instituição se mantenha relevante e cumpra seu papel social e econômico, o portfólio educacional deve estar em perfeita sintonia com a vocação produtiva da região, gerando um alinhamento direto com as necessidades do mercado agropecuário. Essa expansão não apenas atrai novos estudantes interessados em ingressar ou permanecer no setor rural, mas também fortalece a sucessão familiar nas propriedades, entregando ao mercado profissionais capacitados para aplicar novas tecnologias e impulsionar a produtividade local.',
      'Aumentar a efetividade entre concluintes e cursistas (56,2% → 70%): O desafio de elevar a efetividade (taxa de sucesso) exige um salto de qualidade pedagógica. Isso engloba o aprimoramento contínuo dos materiais didáticos, a intensificação de aulas práticas de excelência e a capacitação rigorosa do corpo docente. Quando o aluno percebe o valor prático do que está aprendendo e conta com tutores engajados, sua motivação para concluir a formação aumenta exponencialmente.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-etec-02-1',
        codigo: '02.1',
        solucaoIniciativa:
          'Flexibilização Curricular e Reposição: Modularizar unidades curriculares como cursos independentes para facilitar o ingresso de novos alunos em vagas de desistentes e permitir a reposição/pagamento de matérias isoladas.',
        vinculoResultadoEsperado:
          'Reduzir a evasão (29,2% → <15%) e Aumentar a efetividade entre concluintes e cursistas (56,2% → 70%).',
        unidadeResponsavel: 'DETEC (Rede e-Tec)',
        unidadesParceiras: 'Sindicato dos Produtores Rurais',
        detalhamentoTecnico:
          'Adaptação do sistema de gestão escolar para matrículas e faturamentos modulares, com módulo de nivelamento rápido e capacitação dos tutores para acolhimento dos ingressantes.'
      },
      {
        id: 'sol-etec-02-2',
        codigo: '02.2',
        solucaoIniciativa:
          'Sistema de Gestão Acadêmica Integrado: Implementar plataforma de gerenciamento de calendário para os 30 polos com acesso por coordenadores, acompanhamento de disponibilidade de tutores em tempo real, emissão de diário de classe e aprimoramento da comunicação.',
        vinculoResultadoEsperado: 'Melhorar a plataforma e a conectividade',
        unidadeResponsavel: 'DETEC (Rede e-Tec)',
        unidadesParceiras: 'Sindicato dos Produtores Rurais',
        detalhamentoTecnico:
          'Integração em tempo real dos 30 polos presenciais para gestão de agenda, disponibilidade docente e acompanhamento semanal dos diários de classe.'
      },
      {
        id: 'sol-etec-02-3',
        codigo: '02.3',
        solucaoIniciativa:
          'Monitoramento e Comprovação Georreferenciada: Desenvolver mecanismo de relatório fotográfico via sistema, integrado ao diário de classe, exigindo check-in/check-out com fotos georreferenciadas do tutor no início e fim das aulas.',
        vinculoResultadoEsperado:
          'Melhorar a plataforma e a conectividade e Aumentar a efetividade entre concluintes e cursistas (garantia de prestação do serviço).',
        unidadeResponsavel: 'DETEC (Rede e-Tec)',
        unidadesParceiras: 'Sindicato dos Produtores Rurais',
        detalhamentoTecnico:
          'Aplicativo com funcionamento offline e registro de coordenadas GPS integradas ao relatório fotográfico do tutor PJ, garantindo compliance e comprovação da aula prática/presencial.'
      },
      {
        id: 'sol-etec-02-4',
        codigo: '02.4',
        solucaoIniciativa:
          'Expansão e Sucessão Rural: Ampliar e modernizar a oferta de cursos, com foco no fortalecimento da formação de jovens e sucessores rurais para a permanência no campo.',
        vinculoResultadoEsperado: 'Ampliar a oferta de cursos técnicos demandados.',
        unidadeResponsavel: 'DETEC (Rede e-Tec)',
        unidadesParceiras: 'Sindicato dos Produtores Rurais',
        detalhamentoTecnico:
          'Inclusão de cursos técnicos alinhados às vocações produtivas de Rondônia (como Zootecnia), conectando jovens sucessores às tecnologias do agronegócio.'
      },
      {
        id: 'sol-etec-02-5',
        codigo: '02.5',
        solucaoIniciativa:
          'Qualidade Pedagógica e Prática: Fortalecer as aulas práticas, atualizar materiais didáticos e promover a melhoria contínua na seleção e capacitação de tutores e instrutores.',
        vinculoResultadoEsperado:
          'Aumentar a efetividade entre concluintes e cursistas (56,2% → 70%).',
        unidadeResponsavel: 'DETEC (Rede e-Tec)',
        unidadesParceiras: 'Sindicato dos Produtores Rurais',
        detalhamentoTecnico:
          'Parcerias com fazendas, cooperativas e empresas do agro local para aulas práticas de alto impacto somadas a programa contínuo de capacitação docente.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-etec-03-1',
        codigo: '03.1',
        nome: 'Índice de projeção de turmas.',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '15%',
        meta2027: '47',
        meta2028: '54',
        meta2029: '62',
        meta2030: '71',
        fonteVerificacao: 'Relatório consolidado Senar nas Nuvens Plus (SNN+) e Sistego.'
      },
      {
        id: 'kpi-etec-03-2',
        codigo: '03.2',
        nome: 'Índice de projeção de participantes.',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '15%',
        meta2027: '744',
        meta2028: '856',
        meta2029: '984',
        meta2030: '1.132',
        fonteVerificacao: 'Relatório consolidado Senar nas Nuvens Plus (SNN+) e Sistego.'
      },
      {
        id: 'kpi-etec-03-3',
        codigo: '03.3',
        nome: 'Projeção de Produtores Rurais Atendidos.',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '30%',
        meta2027: '223',
        meta2028: '257',
        meta2029: '295',
        meta2030: '339',
        fonteVerificacao: 'Relatório consolidado Senar nas Nuvens Plus (SNN+) e Sistego.'
      },
      {
        id: 'kpi-etec-03-4',
        codigo: '03.4',
        nome: 'Crescimento Orçamentário.',
        unidadeMedida: 'Percentual (%)',
        linhaBase2026: '15%',
        meta2027: 'R$ 3.078.902,00',
        meta2028: 'R$ 3.540.737,30',
        meta2029: 'R$ 4.071.847,90',
        meta2030: 'R$ 4.682.625,08',
        fonteVerificacao: 'Relatório consolidado Sistego.'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-etec-01-1',
        codigo: '01.1',
        tipoPlano: 'EF',
        iniciativaEstrategica: 'Educação Formal / Rede e-Tec (Execução Participantes)',
        ano2027: '744',
        ano2028: '856',
        ano2029: '984',
        ano2030: '1.132',
        orcamento2027: 3078902.0,
        orcamento2028: 3540737.3,
        orcamento2029: 4071847.9,
        orcamento2030: 4682625.08,
        total: 15374112.27
      }
    ],
    governanca: {
      statusGeral: 'Planejado / Em Estruturação',
      percentualExecucao: 0.0,
      periodicidadeMonitoramento: 'Trimestral',
      ultimaAtualizacao: '26/10/2026',
      ritosInstitucionais: [
        '1. Acompanhamento semanal dos diários de classe e retenção acadêmica nos 30 polos pela coordenação da Rede e-Tec.',
        '2. Monitoramento trimestral dos indicadores de turmas, participantes, evasão (<15%) e efetividade (70%).',
        '3. Prestação de contas técnico-financeira da Educação Formal (EF) junto ao Sistego e SNN+.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-etec-06-2',
        codigo: '06.2',
        fatorCritico: 'Flexibilização Curricular e Modularização',
        observacaoRisco:
          'A transformação de unidades curriculares em módulos independentes é uma estratégia inovadora. Ela permite que a instituição ocupe vagas ociosas deixadas por desistentes e crie uma nova esteira de arrecadação, já que os alunos poderão pagar por disciplinas isoladas para repor perdas.',
        impactoPotencial:
          'Necessidade de adequação sistêmica para matrículas e faturamentos modulares e acolhimento pedagógico de ingressantes intermediários.',
        providenciaMitigadora:
          'É necessário adaptar o sistema de gestão escolar para suportar matrículas e faturamentos modulares antes do lançamento. Do ponto de vista pedagógico, deve-se criar um "módulo de nivelamento" rápido para alunos que entram no meio do processo e capacitar os tutores para o acolhimento desses novos integrantes.'
      },
      {
        id: 'risk-etec-06-4',
        codigo: '06.4',
        fatorCritico: 'Gestão Acadêmica Integrada e Monitoramento Georreferenciado',
        observacaoRisco:
          'A implementação de um sistema único para gerir a agenda dos 30 polos em tempo real e o mecanismo de relatório fotográfico (check-in/check-out com geolocalização) trarão um salto de compliance, otimização de tempo e garantia da prestação de serviço dos tutores PJ.',
        impactoPotencial:
          'Falhas de conectividade em áreas rurais durante o registro e eventual resistência operacional inicial à nova rotina de check-in/check-out.',
        providenciaMitigadora:
          'O aplicativo ou sistema de monitoramento deve obrigatoriamente possuir uma funcionalidade offline, permitindo que o tutor tire a foto com o registro do GPS salvo no aparelho e sincronize os dados assim que tiver conexão. Para lidar com a resistência, deve-se realizar uma campanha de comunicação interna focada em transparência e segurança jurídica, seguida de um projeto-piloto em polos selecionados antes da expansão para toda a rede.'
      },
      {
        id: 'risk-etec-06-5',
        codigo: '06.5',
        fatorCritico: 'Qualidade Pedagógica e Sucessão Rural',
        observacaoRisco:
          'O foco na modernização dos cursos (ex: Zootecnia), atualização de materiais, fortalecimento de aulas práticas e foco na sucessão rural ataca a raiz da evasão, entregando valor real e conectando o jovem ao futuro do agronegócio.',
        impactoPotencial:
          'Custo elevado para estruturação exclusiva de ambientes práticos e risco de rotatividade ou defasagem técnica de instrutores/tutores.',
        providenciaMitigadora:
          'Para viabilizar as aulas práticas sem onerar excessivamente a instituição, deve-se buscar parcerias estratégicas (unidades parceiras/corresponsáveis) com fazendas, cooperativas e empresas do agronegócio local. Para a atração de talentos, é crucial estabelecer um programa robusto de capacitação contínua e incentivos para os instrutores, garantindo que eles sejam os primeiros a dominar as atualizações dos materiais didáticos.'
      }
    ],
    fundamentacaoTecnica:
      'Diretrizes da Rede e-Tec Brasil / SENAR Central, planejamento de expansão da Educação Formal (EF) nos 30 polos de Rondônia e metas de redução da evasão (<15%) e elevação da taxa de concluintes (70%) para o ciclo 2027–2030.',
    assinaturaResponsavel: 'Anderson Leite – Gerente Técnico – Detec SENAR-AR/RO'
  },

  // =========================================================================
  // 5. PERSPECTIVA: PROCESSOS INTERNOS — 02 EXCELÊNCIA NA GESTÃO (DAF)
  // Organizada por Temas Oficiais (05, 06, 07 e 09)
  // =========================================================================
  {
    id: 'ficha-oe-02-gestao',
    codigoObjetivo: '02',
    nomeObjetivo: 'EXCELÊNCIA NA GESTÃO',
    enunciado:
      'Gerir com excelência as finanças, a operação e os recursos humanos com foco no aumento da maturidade de gestão.',
    perspectivaBsc: 'PROCESSOS_INTERNOS',
    unidadeResponsavelLider:
      'Superintendência / Comissão de Planejamento Estratégico e Departamento Administrativo e Financeiro (DAF)',
    unidadesParceiras:
      'DETEC, DATEG, Setor Jurídico (AJU), Assessoria de Controle Interno (ACI), DAF / TI, Assessoria de Comunicação (ACS), DPO, CPL (Portaria nº 47/2026), CPMP (Portaria nº 48/2026) e Sindicatos Rurais',
    responsavelPreenchimento: 'Superintendência / Gerência do DAF',
    cargoResponsavel: 'Comissão de Planejamento Estratégico & Gerência Administrativa e Financeira',
    dataElaboracaoRevisao: 'Novembro de 2026 (Ciclo de Planejamento 2027–2030)',
    diretrizesResultados: FICHA_02_TEMAS.flatMap(t =>
      t.diretrizesResultados.map(d => `[Tema ${t.codigoTema} — ${t.nomeTema}] ${d}`)
    ),
    solucoesIniciativas: FICHA_02_TEMAS.flatMap(t => t.solucoesIniciativas),
    indicadoresMetas: FICHA_02_TEMAS.flatMap(t => t.indicadoresMetas),
    cronogramaOrcamento: FICHA_02_TEMAS.flatMap(t => t.cronogramaOrcamento),
    notaMetodologicaOrcamento:
      'Consolidado dos 4 Temas Estruturantes do Objetivo Estratégico Excelência na Gestão (Tema 05 Governança, Planejamento e Gestão Estratégica; Tema 06 Gestão de Pessoas; Tema 07 Infraestrutura e Patrimônio; Tema 09 Processos, Logística e Suprimentos). Selecione um tema específico acima para visualizar o detalhamento individual e sua nota metodológica própria.',
    governanca: {
      statusGeral: 'Não iniciada (Ciclo Inicia em 2027)',
      percentualExecucao: 0.0,
      periodicidadeMonitoramento: 'Trimestral (com reportes mensais internos e alinhamento orçamentário)',
      ultimaAtualizacao: 'Novembro/2026',
      ritosInstitucionais: [
        '1. Reuniões Periódicas de Alinhamento e Acompanhamento Orçamentário Integrado (SISTEGO / TOTVS RM, proporcionalidade 80%/20%).',
        '2. Reporte Operacional Mensal da Gerência do DAF (RH, PCCR, Contratos Prediais, Frota/Cautelas, CNAB, ContratosGov, PVPS e Visitas da Arrecadação).',
        '3. Reunião Trimestral de Avaliação Estratégica (RAE) e Auditorias Semestrais/Anuais de Conformidade junto a ACI, AJU, DPO, CPMP e CPL.'
      ]
    },
    analiseRiscos: FICHA_02_TEMAS.flatMap(t =>
      t.analiseRiscos.map(r => ({
        ...r,
        codigo: r.codigo || `Tema ${t.codigoTema}`
      }))
    ),
    temas: FICHA_02_TEMAS,
    fundamentacaoTecnica:
      'Alinhamento integral ao Mapa Estratégico do SENAR-AR/RO (2027–2030), Planejamento Estratégico Setorial do DAF (2027–2030), Regimento Interno, PCCR (Doc. Ping A-8EC95), Portarias nº 47/2026 (CPL) e nº 48/2026 (CPMP), Regulamento de Licitações e Contratos do SENAR, Normas Brasileiras de Contabilidade (NBC TSP), NRs aplicáveis e Lei nº 13.709/2018 (LGPD).',
    assinaturaResponsavel: 'Superintendência / Departamento Administrativo e Financeiro (DAF) - SENAR-AR/RO'
  },

  // =========================================================================
  // 6. PERSPECTIVA: PROCESSOS INTERNOS — 04 SEGURANÇA JURÍDICA, INTEGRIDADE E CONFORMIDADE (ACI)
  // =========================================================================
  {
    id: 'ficha-oe-04-aci',
    codigoObjetivo: '04',
    nomeObjetivo: 'SEGURANÇA JURÍDICA, INTEGRIDADE E CONFORMIDADE',
    enunciado:
      'Garantir a segurança jurídica, a integridade da gestão e assegurar a conformidade legal, ética e operacional da organização.',
    perspectivaBsc: 'PROCESSOS_INTERNOS',
    unidadeResponsavelLider: 'Assessoria de Controle Interno (ACI) - SENAR-AR/RO',
    unidadesParceiras:
      'Setor Jurídico, DAF, DETEC, DATeG, Gestão de Pessoas (RH), TI, Comitê de Governança e Riscos e Conselho Fiscal',
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
        solucaoIniciativa:
          'Implantação do Programa Integrado de Gestão de Riscos Corporativos (ERM) e Inventário Único de Riscos',
        vinculoResultadoEsperado: 'Aperfeiçoar a gestão de riscos e fortalecer a auditoria preventiva interna',
        unidadeResponsavel: 'Assessoria de Controle Interno (ACI)',
        unidadesParceiras: 'Comitê de Riscos, DAF, DETEC, DATeG, TI, Conselho Fiscal',
        detalhamentoTecnico:
          'Estruturação da Política Formal de Gestão de Riscos do SENAR-AR/RO, aprovação da Declaração Formal de Apetite ao Risco pelo Conselho Deliberativo e criação do "Risk Register" unificado (inventário corporativo de riscos operacionais, financeiros, de conformidade e de integridade). Elevação do nível de maturidade ERM (hoje na Dimensão 2 em 2,24 - Inicial) para patamares gerenciados e otimizados até 2030, apoiado no framework COSO ERM 2017 e ISO 31000.'
      },
      {
        id: 'sol-04-2',
        codigo: '04.2',
        solucaoIniciativa:
          'Plano Anual de Auditoria Preventiva e Sistematização dos Testes de Compliance (TC) via PDCA',
        vinculoResultadoEsperado:
          'Aperfeiçoar a gestão de riscos / Ampliar o escopo das auditorias e due diligence',
        unidadeResponsavel: 'Assessoria de Controle Interno (ACI)',
        unidadesParceiras: 'DAF, DETEC, DATeG, Jurídico, Auditoria Central',
        detalhamentoTecnico:
          'Consolidação e fidelidade ao Plano de Trabalho de Controles Internos (PTCI) aprovado anualmente pela Superintendência e alinhado à Auditoria Interna Central (Manual dos Assessores de Controles Internos). Execução cíclica pelo método PDCA com aplicação de Testes de Compliance (TC) parametrizados e emissão do Ranking Interno de Conformidade dos departamentos, com foco nos macroprocessos críticos de contratação, pagamentos e repasses.'
      },
      {
        id: 'sol-04-3',
        codigo: '04.3',
        solucaoIniciativa:
          'Protocolo de Due Diligence de Fornecedores, Regularidade Fiscal e Gestão Digital de Contratos (ContratosGOV)',
        vinculoResultadoEsperado:
          'Ampliar o escopo das auditorias e due diligence / Proteger reputação e patrimônio',
        unidadeResponsavel: 'Assessoria de Controle Interno (ACI)',
        unidadesParceiras: 'Setor Jurídico, Compras/Licitações (DAF), Fiscais de Contrato, TI',
        detalhamentoTecnico:
          'Instituição de rotina rigorosa de verificação prévia e contínua de idoneidade jurídica, fiscal e trabalhista de fornecedores e parceiros (mitigando os riscos apontados em acórdãos históricos do TCU, como 457/2005 e 1782/2010). Integração mandatória à plataforma digital ContratosGOV para monitoramento de prazos de vigência, reajustes, limites de termos aditivos e relatórios mensais dos fiscais de contrato.'
      },
      {
        id: 'sol-04-4',
        codigo: '04.4',
        solucaoIniciativa:
          'Fortalecimento da Blindagem Regulatória, Rastreabilidade Processual e Filtro de Governança Orçamentária',
        vinculoResultadoEsperado:
          'Garantir a conformidade legal e regulatória e Proteger a reputação e o patrimônio',
        unidadeResponsavel: 'Assessoria de Controle Interno (ACI)',
        unidadesParceiras: 'Todas as Unidades, Setor Jurídico, Planejamento, Contabilidade, TI',
        detalhamentoTecnico:
          'Garantia da imutabilidade processual no Sistema PING (Manual Detalhado de Normativas / IS 09/2024), assegurando despachos explicativos motivados e erratas formais em caso de correções. Atuação da ACI como filtro estratégico nas peças orçamentárias (PAT e Reformulações) mediante a verificação dos 5 Filtros de Decisão (clareza de justificativas, impacto físico, coerência financeira, estabilidade de indicadores e custos unitários).'
      },
      {
        id: 'sol-04-5',
        codigo: '04.5',
        solucaoIniciativa:
          'Consolidação do Programa de Integridade, Gestão da Ética Corporativa e Gestão do Canal de Denúncias',
        vinculoResultadoEsperado: 'Promover a cultura de ética e integridade',
        unidadeResponsavel: 'Assessoria de Controle Interno (ACI)',
        unidadesParceiras: 'Comissão de Ética, Gestão de Pessoas (RH), Comunicação, Ouvidoria',
        detalhamentoTecnico:
          'Instituição formal da Comissão de Ética do SENAR-AR/RO, revisão bienal do Código de Conduta Ética, consolidação da Política Anticorrupção e de Prevenção a Conflitos de Interesse e disponibilização de Canal de Denúncias anônimo e protegido (integrado à Ouvidoria/e-CGU), com plano continuado de capacitação técnica dos colaboradores.'
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
        orcamento2029: 17500,
        orcamento2030: 17500,
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
        orcamento2029: 15000,
        orcamento2030: 15000,
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
        orcamento2029: 15000,
        orcamento2030: 15000,
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
        orcamento2029: 10000,
        orcamento2030: 10000,
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
        orcamento2029: 12500,
        orcamento2030: 12500,
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
        impactoPotencial:
          'Adesão superficial aos testes de compliance, ocultação de gargalos operacionais e baixa colaboração interdepartamental.',
        providenciaMitigadora:
          'Atuação orientativa da ACI pelo modelo "Advisory" (consultoria interna amigável), destacando o controle como parceiro de blindagem jurídica individual e institucional.'
      },
      {
        id: 'risk-04-2',
        fatorCritico: 'Defasagem Tecnológica e Ausência de Analytics/BI',
        impactoPotencial:
          'Dificuldade de rastrear tendências em tempo real, dependência de conferências manuais e perda de agilidade (pontuado com nota crítica 2,13 no diagnóstico).',
        providenciaMitigadora:
          'Estruturação de dashboards executivos em Power BI, integração automatizada de dados do Sistego/SNN+ e uso sistemático da plataforma ContratosGOV.'
      },
      {
        id: 'risk-04-3',
        fatorCritico: 'Sobrecarga e Rotatividade em Áreas Operacionais (DAF/DETEC)',
        impactoPotencial:
          'Falhas na formalização de processos, geração de dados fictícios por linha de ação (chamado SNNSUPORTE-21406) e atrasos na instrução probatória.',
        providenciaMitigadora:
          'Padronização exaustiva de fluxos via manuais práticos (IS 09/2024 e IS 10/2024), checklists pré-formatados e treinamentos obrigatórios contínuos.'
      },
      {
        id: 'risk-04-4',
        fatorCritico: 'Risco de Descumprimento de Acórdãos e Precedentes do TCU',
        impactoPotencial:
          'Rejeição de contas pelo Tribunal de Contas da União, responsabilização pessoal dos gestores e aplicação de multas do art. 268 do RI/TCU.',
        providenciaMitigadora:
          'Auditoria prévia compulsória sobre 100% dos processos de dispensa e inexigibilidade, com exigência irrestrita de regularidade fiscal e de seguridade social (art. 195, § 3º, CF).'
      }
    ],
    fundamentacaoTecnica:
      'O presente detalhamento alinha-se estritamente às diretrizes do Manual dos Assessores de Controles Internos da Administração Central do SENAR (2018), ao Regulamento de Licitações e Contratos (Resolução 30/2024/CD), às Instruções de Serviço Regionais (IS 09/2024, IS 10/2024, IS 11/2024, IS 14/2024 e IS 004/2026), e às recomendações da Auditoria. A implementação das soluções propostas assegura a transição definitiva da regional para uma governança de alta maturidade, garantindo segurança jurídica e máxima efetividade social aos produtores rurais de Rondônia.',
    assinaturaResponsavel: 'Rafael Bezerra Ferreira de Araújo - Assessor de Controle Interno SENAR-AR/RO'
  },

  // =========================================================================
  // 7. PERSPECTIVA: PROCESSOS INTERNOS — 08 TECNOLOGIA DA INFORMAÇÃO E DADOS (TI)
  // =========================================================================
  {
    id: 'ficha-oe-08-ti-dados',
    codigoObjetivo: '08',
    nomeObjetivo: 'TECNOLOGIA DA INFORMAÇÃO E DADOS',
    enunciado: 'Viabilizar uma arquitetura de TI moderna, integrada e de inteligência estratégica de Dados',
    perspectivaBsc: 'PROCESSOS_INTERNOS',
    unidadeResponsavelLider: 'Tecnologia da Informação (TI)',
    unidadesParceiras:
      'Superintendência; DAF (Orçamento, Compras/Licitações, Contratos, Almoxarifado, Patrimônio, Frota, RH, Financeiro/Contabilidade); DETEC (FPR/PS e Rede e-Tec); DATEG/ATeG; Jurídico; Controle Interno; Comunicação',
    responsavelPreenchimento: 'Dari Ricardo da Silva Neto',
    cargoResponsavel: 'Responsável pela TI',
    dataElaboracaoRevisao: '13/11/2026 (versão 2.0 – teto de R$ 5,6 mi, alinhada aos Direcionadores)',
    diretrizesResultados: [
      'Integrar sistemas e bases de dados (TOTVS e outros): Eliminar redigitação, controles paralelos e ilhas informacionais entre ERP RM TOTVS, PING/GED, Senar nas Nuvens, Sistego, SISATEG, uMov e SIGE.',
      'Implantar Business Intelligence e dashboards gerenciais: Materializar decisões orientadas por evidências, transparência, prestação de contas e painéis executivos em tempo real por unidade e município.',
      'Estabelecer políticas e projetos de Inteligência Artificial: Implantar uso responsável de IA com retorno mensurado (ROI), governança ética, proteção de dados e letramento corporativo.',
      'Fortalecer a segurança da informação e a conformidade com a LGPD: Adotar controles CIS v8 (IG1 completo e IG2 parcial), backup imutável 3-2-1, SIEM/SOC gerenciado e programa completo de privacidade.',
      'Automatizar processos e eliminar controles manuais: Reduzir burocracia documental, substituir planilhas críticas com Low-code/RPA e viabilizar tramitação 100% digital com formulários offline em campo.'
    ],
    solucoesIniciativas: [
      {
        id: 'sol-ti-08-1',
        codigo: '08.1',
        solucaoIniciativa: 'Arquitetura integrada de sistemas e uso pleno do ERP RM TOTVS',
        vinculoResultadoEsperado:
          'Diretriz 1 – Integrar sistemas e bases de dados (TOTVS e outros). Responde ao desafio "Sistemas Corporativos e Conectividade" (Direcionadores). Elimina redigitação e controles paralelos; base única para BI e IA.',
        unidadeResponsavel: 'TI',
        unidadesParceiras: 'DAF (todas as coordenações), DETEC, DATEG, Controle Interno',
        detalhamentoTecnico:
          'Inventário e mapa de integrações (RM TOTVS, PING/GED, Senar nas Nuvens, Sistego, SISATEG, uMov, SIGE); Camada de integração por APIs/ETL e cadastro mestre único (produtor/CPF, instrutor, sindicato, curso, município); Implantação dos módulos subutilizados do ERP: compras, contratos/ARP, almoxarifado, patrimônio, frota, orçamento e ordens de pagamento (priorizando suporte TOTVS já contratado e equipe interna).'
      },
      {
        id: 'sol-ti-08-2',
        codigo: '08.2',
        solucaoIniciativa: 'Inteligência de Dados e Business Intelligence',
        vinculoResultadoEsperado:
          'Diretriz 2 – Implantar BI e dashboards gerenciais. Materializa os princípios "Decisões orientadas por evidências", "Transparência e prestação de contas" e "Responsabilidade pelos resultados"; viabiliza a "ATeG por resultados mensuráveis" e a informação em tempo real pedida pelos sindicatos.',
        unidadeResponsavel: 'TI',
        unidadesParceiras: 'Superintendência/Planejamento, DETEC, DATEG, DAF, Jurídico, Comunicação',
        detalhamentoTecnico:
          'Governança de dados: donos dos dados, dicionário, catálogo e regras de qualidade; Repositório analítico corporativo (data warehouse) alimentado automaticamente; Painel Estratégico do PE 2027–2030 e painéis gerenciais por unidade (Power BI); Mapa de necessidades por município e cadeia produtiva.'
      },
      {
        id: 'sol-ti-08-3',
        codigo: '08.3',
        solucaoIniciativa: 'Programa de Automação de Processos e Transformação Digital',
        vinculoResultadoEsperado:
          'Diretriz 5 – Automatizar processos e eliminar controles manuais. Ataca o 2º maior desafio operacional dos Direcionadores ("Burocracia e Processos Operacionais", 18 votos) e reduz retrabalho e tempo de tramitação.',
        unidadeResponsavel: 'TI',
        unidadesParceiras: 'DAF, DETEC (Rede e-Tec), DATEG, Jurídico, Controle Interno',
        detalhamentoTecnico:
          'Mapeamento (BPMN) e priorização do backlog de automação levantado no diagnóstico; Low-code/RPA para substituir planilhas críticas (prestação de contas TCU, contratos/ARP, frota, calendário escolar, certificados, inscrições); Documentos nato-digitais com assinatura eletrônica e formulários de campo que funcionam off-line; Redução da burocracia documental para sindicatos, instrutores e técnicos: menos formulários, avisos automáticos de início e fim de UCs, substituição de alunos desistentes e lista de espera em fluxo digital.'
      },
      {
        id: 'sol-ti-08-4',
        codigo: '08.4',
        solucaoIniciativa: 'Segurança da Informação, Privacidade e Conformidade LGPD',
        vinculoResultadoEsperado:
          'Diretriz 4 – Fortalecer a segurança da informação e a conformidade com a LGPD. Protege dados de produtores, alunos e colaboradores e a reputação institucional.',
        unidadeResponsavel: 'TI',
        unidadesParceiras: 'Jurídico (Encarregado/LGPD), Controle Interno, RH, Comunicação',
        detalhamentoTecnico:
          'Política de Segurança da Informação (PSI) e normas complementares; Controles CIS v8 (IG1 completo e IG2 parcial): MFA, EDR, backup imutável 3-2-1, gestão de vulnerabilidades, SIEM/SOC gerenciado; Programa LGPD: inventário de tratamentos (ROPA), RIPD, gestão de consentimento, resposta a incidentes e Encarregado (DPO); Plano de Continuidade de Negócios e Recuperação de Desastres (PCN/DR) testado.'
      },
      {
        id: 'sol-ti-08-5',
        codigo: '08.5',
        solucaoIniciativa: 'Política e Programa de Inteligência Artificial',
        vinculoResultadoEsperado:
          'Diretriz 3 – Estabelecer políticas e projetos de IA. Responde a "Tecnologia e Inovação" (3º maior desafio nos Direcionadores) com riscos controlados.',
        unidadeResponsavel: 'TI',
        unidadesParceiras: 'Jurídico, Superintendência, DETEC, DATEG, DAF, RH',
        detalhamentoTecnico:
          'Política de uso responsável de IA (ética, LGPD, sigilo, supervisão humana) e Comitê de IA; Portfólio enxuto de casos de uso com ROI medido, aproveitando licenças já existentes (Microsoft 365): assistente normativo/jurídico, análise de prestação de contas, triagem documental, predição de evasão (Rede e-Tec); Letramento em IA para colaboradores e apoio ao DETEC em conteúdos de IA aplicada à gestão rural.'
      },
      {
        id: 'sol-ti-08-6',
        codigo: '08.6',
        solucaoIniciativa: 'Infraestrutura, Conectividade e Governança de TI',
        vinculoResultadoEsperado:
          'Base habilitadora de todas as diretrizes; apoia os objetivos de educação (evasão, plataforma, ensino híbrido e conectividade) e de infraestrutura. Responde a "Sistemas Corporativos e Conectividade" e "Infraestrutura e TI".',
        unidadeResponsavel: 'TI',
        unidadesParceiras: 'DAF (Patrimônio, Compras), DETEC/Rede e-Tec, sindicatos rurais',
        detalhamentoTecnico:
          'PDTI 2027–2030 e Comitê de Governança Digital e Dados; Catálogo de serviços e central de atendimento com SLA (práticas ITIL 4); Modernização de rede, Wi-Fi, links redundantes, nuvem híbrida e renovação do parque (ciclo estendido para 6 anos); Conectividade e padrão mínimo de TI em polos, Rede e-Tec e sindicatos prioritários.'
      }
    ],
    indicadoresMetas: [
      {
        id: 'kpi-ti-08-1a',
        codigo: '08.1',
        nome: 'Integrações priorizadas operando de forma automática (API/ETL), sem redigitação',
        unidadeMedida: '% do mapa de integrações',
        linhaBase2026: 'Não mensurado; integrações hoje majoritariamente manuais (inventário no 1º tri/2027)',
        meta2027: '25%',
        meta2028: '50%',
        meta2029: '75%',
        meta2030: '90%',
        fonteVerificacao: 'Mapa de integrações; logs da plataforma de integração'
      },
      {
        id: 'kpi-ti-08-1b',
        codigo: '08.1',
        nome: 'Processos administrativos executados integralmente no ERP RM TOTVS',
        unidadeMedida: '% dos processos-alvo',
        linhaBase2026:
          'A apurar (DAF relata uso parcial do ERP, ordens de pagamento manuais e controles em planilha)',
        meta2027: '55%',
        meta2028: '75%',
        meta2029: '90%',
        meta2030: '95%',
        fonteVerificacao: 'Matriz processo × módulo; auditoria trimestral TI/Controle Interno'
      },
      {
        id: 'kpi-ti-08-1c',
        codigo: '08.1',
        nome: 'Satisfação dos usuários com os sistemas',
        unidadeMedida: 'Nota média (1 a 5)',
        linhaBase2026: '3,55 (Diagnóstico 2026, n=42: DAF 3,41; DETEC 3,56; ATeG 3,86)',
        meta2027: '3,7',
        meta2028: '3,9',
        meta2029: '4,1',
        meta2030: '4,3',
        fonteVerificacao: 'Pesquisa anual (mesma pergunta do diagnóstico)'
      },
      {
        id: 'kpi-ti-08-2a',
        codigo: '08.2',
        nome: 'Indicadores do PE 2027–2030 monitorados em painel automatizado',
        unidadeMedida: '% dos indicadores do PE',
        linhaBase2026: '0% (apuração manual em planilhas)',
        meta2027: '40%',
        meta2028: '70%',
        meta2029: '90%',
        meta2030: '100%',
        fonteVerificacao: 'Painel Estratégico (Power BI); atas das reuniões de avaliação'
      },
      {
        id: 'kpi-ti-08-2b',
        codigo: '08.2',
        nome: 'Unidades com indicadores definidos e painel gerencial oficial',
        unidadeMedida: '% das unidades',
        linhaBase2026:
          '23,8% declaram indicadores definidos; Power BI só em uso pontual (Diagnóstico 2026)',
        meta2027: '40%',
        meta2028: '70%',
        meta2029: '100%',
        meta2030: '100%',
        fonteVerificacao: 'Catálogo oficial de painéis'
      },
      {
        id: 'kpi-ti-08-2c',
        codigo: '08.2',
        nome: 'Qualidade dos dados mestres (completude e consistência)',
        unidadeMedida: '% de conformidade',
        linhaBase2026: 'A apurar (perfilamento no 1º sem/2027)',
        meta2027: '85%',
        meta2028: '90%',
        meta2029: '95%',
        meta2030: '98%',
        fonteVerificacao: 'Relatório de qualidade de dados'
      },
      {
        id: 'kpi-ti-08-3a',
        codigo: '08.3',
        nome: 'Processos automatizados/digitalizados do backlog priorizado',
        unidadeMedida: 'Nº acumulado',
        linhaBase2026: '0 (backlog inicial de ~25 demandas identificadas no diagnóstico)',
        meta2027: '6',
        meta2028: '13',
        meta2029: '20',
        meta2030: '26',
        fonteVerificacao: 'Portfólio de automação; termo de entrega'
      },
      {
        id: 'kpi-ti-08-3b',
        codigo: '08.3',
        nome: 'Colaboradores que relatam atividades manuais automatizáveis',
        unidadeMedida: '% dos respondentes',
        linhaBase2026: '71,4% (30 de 42 – Diagnóstico 2026)',
        meta2027: '62%',
        meta2028: '48%',
        meta2029: '35%',
        meta2030: '25%',
        fonteVerificacao: 'Pesquisa anual de diagnóstico'
      },
      {
        id: 'kpi-ti-08-3c',
        codigo: '08.3',
        nome: 'Processos com tramitação 100% digital (nato-digital e assinatura eletrônica)',
        unidadeMedida: '% dos processos mapeados',
        linhaBase2026: 'A apurar (PING/GED em uso; campo ainda depende de papel)',
        meta2027: '45%',
        meta2028: '65%',
        meta2029: '80%',
        meta2030: '90%',
        fonteVerificacao: 'PING/GED; relatório de processos'
      },
      {
        id: 'kpi-ti-08-4a',
        codigo: '08.4',
        nome: 'Salvaguardas CIS Controls v8 implementadas',
        unidadeMedida: '% IG1 / % IG2',
        linhaBase2026: 'A apurar (avaliação no 1º tri/2027)',
        meta2027: 'IG1 70%',
        meta2028: 'IG1 100%',
        meta2029: 'IG1 100% / IG2 40%',
        meta2030: 'IG1 100% / IG2 60%',
        fonteVerificacao: 'Relatório de avaliação de maturidade (interna/externa)'
      },
      {
        id: 'kpi-ti-08-4b',
        codigo: '08.4',
        nome: 'Tratamentos de dados pessoais com registro (ROPA), base legal e RIPD quando aplicável',
        unidadeMedida: '% dos processos',
        linhaBase2026: 'A apurar',
        meta2027: '50%',
        meta2028: '80%',
        meta2029: '100%',
        meta2030: '100%',
        fonteVerificacao: 'Inventário LGPD; relatório do Encarregado'
      },
      {
        id: 'kpi-ti-08-4c',
        codigo: '08.4',
        nome: 'Colaboradores capacitados em SI/LGPD / taxa de clique em simulação de phishing',
        unidadeMedida: '% / %',
        linhaBase2026: 'Sem programa estruturado',
        meta2027: '80% / ≤15%',
        meta2028: '90% / ≤10%',
        meta2029: '95% / ≤7%',
        meta2030: '95% / ≤5%',
        fonteVerificacao: 'Plataforma de conscientização'
      },
      {
        id: 'kpi-ti-08-4d',
        codigo: '08.4',
        nome: 'Incidentes de segurança com indisponibilidade de serviço crítico superior a 4h',
        unidadeMedida: 'Nº/ano',
        linhaBase2026: 'A apurar',
        meta2027: '≤ 2',
        meta2028: '≤ 1',
        meta2029: '0',
        meta2030: '0',
        fonteVerificacao: 'Registro de incidentes; relatório SOC'
      },
      {
        id: 'kpi-ti-08-5a',
        codigo: '08.5',
        nome: 'Política de IA e Comitê de IA',
        unidadeMedida: 'Marco',
        linhaBase2026: 'Inexistente',
        meta2027: 'Aprovada e comitê instituído',
        meta2028: 'Revisada',
        meta2029: 'Revisada',
        meta2030: 'Revisada',
        fonteVerificacao: 'Portaria/ato da Superintendência'
      },
      {
        id: 'kpi-ti-08-5b',
        codigo: '08.5',
        nome: 'Casos de uso de IA em produção com ganho mensurado',
        unidadeMedida: 'Nº acumulado',
        linhaBase2026: '0 (uso individual, não governado)',
        meta2027: '1',
        meta2028: '3',
        meta2029: '5',
        meta2030: '6',
        fonteVerificacao: 'Portfólio de IA; relatório de benefícios'
      },
      {
        id: 'kpi-ti-08-5c',
        codigo: '08.5',
        nome: 'Colaboradores capacitados em uso responsável de IA',
        unidadeMedida: '% do quadro',
        linhaBase2026: '0%',
        meta2027: '30%',
        meta2028: '50%',
        meta2029: '70%',
        meta2030: '85%',
        fonteVerificacao: 'Registros de capacitação (RH)'
      },
      {
        id: 'kpi-ti-08-6a',
        codigo: '08.6',
        nome: 'Disponibilidade dos serviços críticos (ERP, PING, rede, e-mail/Teams, plataforma EAD)',
        unidadeMedida: '% mensal',
        linhaBase2026: 'A apurar (monitoramento a implantar)',
        meta2027: '99,0%',
        meta2028: '99,5%',
        meta2029: '99,5%',
        meta2030: '99,7%',
        fonteVerificacao: 'Ferramenta de monitoramento'
      },
      {
        id: 'kpi-ti-08-6b',
        codigo: '08.6',
        nome: 'Chamados atendidos dentro do SLA',
        unidadeMedida: '%',
        linhaBase2026: 'A apurar (SLA a formalizar)',
        meta2027: '80%',
        meta2028: '85%',
        meta2029: '90%',
        meta2030: '95%',
        fonteVerificacao: 'Sistema de service desk'
      },
      {
        id: 'kpi-ti-08-6c',
        codigo: '08.6',
        nome: 'Polos e sindicatos prioritários com conectividade e equipamentos no padrão mínimo',
        unidadeMedida: '% das unidades',
        linhaBase2026: 'A apurar (diagnóstico em 2027)',
        meta2027: '35%',
        meta2028: '55%',
        meta2029: '75%',
        meta2030: '90%',
        fonteVerificacao: 'Inventário de ativos; teste de link'
      },
      {
        id: 'kpi-ti-08-6d',
        codigo: '08.6',
        nome: 'Execução do PDTI',
        unidadeMedida: '% das ações do ano',
        linhaBase2026: 'PDTI 2027–2030 a aprovar',
        meta2027: '≥ 85%',
        meta2028: '≥ 85%',
        meta2029: '≥ 90%',
        meta2030: '≥ 90%',
        fonteVerificacao: 'Relatório anual do PDTI'
      }
    ],
    cronogramaOrcamento: [
      {
        id: 'cron-ti-08-1',
        codigo: '08.1',
        iniciativaEstrategica: 'Arquitetura integrada de sistemas e uso pleno do ERP RM TOTVS',
        ano2027:
          'Inventário e mapa de integrações; arquitetura de referência; plataforma de integração; ERP: compras, contratos/ARP e almoxarifado',
        ano2028:
          'Integração SNN, Sistego, SISATEG e uMov ao repositório de dados; ERP: patrimônio, frota e orçamento; cadastro mestre',
        ano2029: 'Integração PING ↔ ERP (fluxo processo-pagamento fim a fim); portal único do colaborador',
        ano2030: 'Descontinuação de controles paralelos e legados; otimização',
        orcamento2027: 380000,
        orcamento2028: 320000,
        orcamento2029: 200000,
        orcamento2030: 100000,
        total: 1000000
      },
      {
        id: 'cron-ti-08-2',
        codigo: '08.2',
        iniciativaEstrategica: 'Inteligência de Dados e Business Intelligence',
        ano2027:
          'Governança de dados; data warehouse v1; Painel Estratégico do PE; painéis DETEC e ATeG',
        ano2028:
          'Painéis DAF (orçamento, compras, frota, patrimônio, logística), Jurídico e Rede e-Tec; qualidade de dados',
        ano2029:
          'Análises preditivas (evasão, demanda por município/cadeia); mapa de necessidades georreferenciado',
        ano2030: 'Autosserviço analítico; indicadores de impacto junto ao produtor',
        orcamento2027: 220000,
        orcamento2028: 200000,
        orcamento2029: 170000,
        orcamento2030: 150000,
        total: 740000
      },
      {
        id: 'cron-ti-08-3',
        codigo: '08.3',
        iniciativaEstrategica: 'Programa de Automação de Processos e Transformação Digital',
        ano2027:
          'Mapeamento BPMN e priorização; entregas rápidas: certificados, inscrições digitais, prestação de contas TCU, calendário escolar, avisos automáticos de UCs',
        ano2028:
          'Formulários de campo off-line e enxutos (ATeG/DETEC); assinatura eletrônica; substituição de alunos/lista de espera; contratos/ARP e frota',
        ano2029: 'Gestão processual jurídica fim a fim; PAC; prestação de contas de parceiros',
        ano2030: 'Automações residuais e melhoria contínua',
        orcamento2027: 200000,
        orcamento2028: 200000,
        orcamento2029: 150000,
        orcamento2030: 110000,
        total: 660000
      },
      {
        id: 'cron-ti-08-4',
        codigo: '08.4',
        iniciativaEstrategica: 'Segurança da Informação, Privacidade e Conformidade LGPD',
        ano2027:
          'PSI e normas; avaliação CIS; MFA 100%; EDR; backup imutável; ROPA; Encarregado designado',
        ano2028:
          'SIEM/SOC gerenciado; gestão de vulnerabilidades; PCN/DR testado; RIPD',
        ano2029: 'CIS IG2 parcial; teste de intrusão; classificação da informação',
        ano2030: 'Auditoria interna de SI/LGPD com Controle Interno; sustentação',
        orcamento2027: 340000,
        orcamento2028: 320000,
        orcamento2029: 270000,
        orcamento2030: 240000,
        total: 1170000
      },
      {
        id: 'cron-ti-08-5',
        codigo: '08.5',
        iniciativaEstrategica: 'Política e Programa de Inteligência Artificial',
        ano2027:
          'Política e Comitê de IA; capacitação; piloto com licenças existentes (assistente normativo/jurídico)',
        ano2028: 'Análise automatizada de prestação de contas; triagem documental',
        ano2029: 'Modelo preditivo de evasão (Rede e-Tec)',
        ano2030: 'Escala dos casos de sucesso; avaliação de resultados',
        orcamento2027: 80000,
        orcamento2028: 140000,
        orcamento2029: 160000,
        orcamento2030: 140000,
        total: 520000
      },
      {
        id: 'cron-ti-08-6',
        codigo: '08.6',
        iniciativaEstrategica: 'Infraestrutura, Conectividade e Governança de TI',
        ano2027:
          'PDTI 2027–2030; catálogo de serviços e SLA; monitoramento; diagnóstico de conectividade dos polos',
        ano2028:
          'Modernização de rede/Wi-Fi; links redundantes; renovação do parque (ciclo 6 anos); nuvem híbrida',
        ano2029: 'Conectividade de polos e sindicatos prioritários; DR em nuvem',
        ano2030: 'Consolidação; revisão do PDTI e preparação do ciclo 2031+',
        orcamento2027: 440000,
        orcamento2028: 400000,
        orcamento2029: 350000,
        orcamento2030: 320000,
        total: 1510000
      }
    ],
    governanca: {
      statusGeral: 'Não iniciada (início previsto: jan/2027; ações preparatórias em curso em 2026)',
      percentualExecucao: 0.0,
      periodicidadeMonitoramento: 'Trimestral (indicadores operacionais de TI: mensal)',
      ultimaAtualizacao: '13/11/2026',
      ritosInstitucionais: [
        'Comitê de Governança Digital e Dados (CGDD): Superintendência (presidência), TI (secretaria executiva), DAF, DETEC, DATEG, Jurídico e Controle Interno. Reunião trimestral para priorizar o portfólio, aprovar o PDTI e acompanhar os indicadores desta ficha.',
        'PDTI 2027–2030: instrumento de desdobramento desta ficha, revisado anualmente junto ao ciclo orçamentário.',
        'Donos dos dados (data owners): um responsável por domínio (produtor/atendimento, cursos/turmas, ATeG, orçamento/financeiro, compras/contratos, pessoas), que responde pela qualidade e pelas regras de acesso.',
        'Rituais: status mensal dos projetos na TI; relatório trimestral ao CGDD com KPIs, riscos e execução orçamentária; avaliação anual com a pesquisa de satisfação (mesma métrica do diagnóstico, para comparação).',
        'Referências técnicas: COBIT 2019 (governança), ITIL 4 (serviços), ABNT NBR ISO/IEC 27001/27701 e CIS Controls v8 (segurança e privacidade), DAMA-DMBOK (dados), LGPD (Lei 13.709/2018) e normas internas do Sistema CNA/SENAR.'
      ]
    },
    analiseRiscos: [
      {
        id: 'risk-ti-08-1',
        fatorCritico: 'Baixa adesão das áreas e resistência à mudança (manutenção de planilhas paralelas)',
        probabilidade: 'Alta',
        impacto: 'Alto',
        impactoPotencial: 'Manutenção de retrabalho, ilhas de dados em Excel e perda de retorno sobre o ERP/BI.',
        providenciaMitigadora:
          'Patrocínio da Superintendência; donos de processo nomeados; descontinuação formal das planilhas após cada entrega; capacitação.',
        responsavel: 'CGDD / gestores das áreas'
      },
      {
        id: 'risk-ti-08-2',
        fatorCritico: 'Equipe de TI insuficiente ou dependência de pessoas-chave',
        probabilidade: 'Alta',
        impacto: 'Alto',
        impactoPotencial: 'Gargalos no atendimento da carteira de projetos e sustentação operacional.',
        providenciaMitigadora:
          'Dimensionamento no objetivo de Pessoas; serviços gerenciados (SOC, BI); documentação e transferência de conhecimento.',
        responsavel: 'TI / RH'
      },
      {
        id: 'risk-ti-08-3',
        fatorCritico: 'Restrição ou contingenciamento orçamentário (queda de arrecadação)',
        probabilidade: 'Média',
        impacto: 'Alto',
        impactoPotencial: 'Necessidade de repriorização e alongamento de entregas do portfólio digital.',
        providenciaMitigadora:
          'Priorização por valor e risco no PDTI; entregas incrementais; preferência por modelos de assinatura escaláveis.',
        responsavel: 'CGDD / DAF'
      },
      {
        id: 'risk-ti-08-4',
        fatorCritico: 'Incidente cibernético (ransomware, vazamento de dados pessoais)',
        probabilidade: 'Média',
        impacto: 'Muito alto',
        impactoPotencial: 'Paralisação de sistemas críticos, exposição de dados LGPD e dano reputacional.',
        providenciaMitigadora:
          'Controles CIS, MFA, EDR, backup imutável, SOC, PCN/DR testado, plano de resposta a incidentes e comunicação à ANPD.',
        responsavel: 'TI / Jurídico (Encarregado)'
      },
      {
        id: 'risk-ti-08-5',
        fatorCritico: 'Limitações de APIs e de acesso a dados dos sistemas nacionais',
        probabilidade: 'Média',
        impacto: 'Médio',
        impactoPotencial: 'Restrições de integração direta com Senar nas Nuvens, Sistego e SISATEG.',
        providenciaMitigadora:
          'Articulação com a Administração Central; extrações agendadas como contingência; padrões de dados comuns.',
        responsavel: 'TI / Superintendência'
      },
      {
        id: 'risk-ti-08-6',
        fatorCritico: 'Baixa qualidade dos dados de origem comprometendo painéis e IA',
        probabilidade: 'Alta',
        impacto: 'Alto',
        impactoPotencial: 'Indicadores inconsistentes em Power BI e baixa confiabilidade de análises preditivas.',
        providenciaMitigadora:
          'Donos dos dados; regras de validação na entrada; perfilamento e indicador de qualidade de dados.',
        responsavel: 'TI / donos dos dados'
      },
      {
        id: 'risk-ti-08-7',
        fatorCritico: 'Uso de IA sem governança (exposição de dados, decisões sem supervisão)',
        probabilidade: 'Média',
        impacto: 'Alto',
        impactoPotencial: 'Vazamento de informações sigilosas ou decisões automatizadas sem lastro normativo.',
        providenciaMitigadora:
          'Política de IA; ferramentas homologadas; proibição de dados pessoais em IA não contratada; revisão humana obrigatória.',
        responsavel: 'Comitê de IA / Jurídico'
      },
      {
        id: 'risk-ti-08-8',
        fatorCritico: 'Conectividade precária no campo e em polos do interior',
        probabilidade: 'Alta',
        impacto: 'Médio',
        impactoPotencial: 'Dificuldade de operação síncrona em campo pelos técnicos da ATeG e tutores Rede e-Tec.',
        providenciaMitigadora:
          'Aplicações com modo off-line e sincronização posterior; links redundantes; soluções satelitais onde necessário.',
        responsavel: 'TI / DATEG / DETEC'
      },
      {
        id: 'risk-ti-08-9',
        fatorCritico: 'Dependência de fornecedor (lock-in) e atrasos em contratações',
        probabilidade: 'Média',
        impacto: 'Médio',
        impactoPotencial: 'Aumento de custos de troca e atrasos no cronograma físico-financeiro.',
        providenciaMitigadora:
          'Planejamento no PAC; cláusulas de portabilidade e SLA; arquitetura baseada em padrões abertos.',
        responsavel: 'TI / Compras / Jurídico'
      }
    ],
    premissasNotas: [
      {
        titulo: 'Premissas do Objetivo 08 (Teto R$ 5,6 milhões)',
        itens: [
          'Patrocínio da Superintendência e participação efetiva dos donos de processo (DAF, DETEC, DATEG, Jurídico); a TI lidera a solução, mas a mudança de processo é das áreas.',
          'Quadro de TI dimensionado para a carteira (estimativa mínima: +1 analista de dados/BI e +1 analista de segurança/infraestrutura, ou serviço gerenciado equivalente), tratado no objetivo de Gestão de Pessoas.',
          'Teto orçamentário do objetivo 08: R$ 5,6 milhões (2027–2030), definido pelo responsável. Em relação à versão 1 (R$ 6,78 mi), o corte de R$ 1,18 mi (-17%) foi obtido sem eliminar iniciativas: (a) ERP com suporte TOTVS já contratado e equipe interna, em vez de consultoria extensiva; (b) IA com licenças existentes e 6 casos de uso em vez de 8; (c) CIS IG2 limitado a 60% e auditoria de SI/LGPD interna; (d) renovação do parque em ciclo de 6 anos e conectividade concentrada nos 90% de polos/sindicatos prioritários; (e) metas de automação e integração recalibradas.',
          'Valores do item 4 são estimativas paramétricas de mercado (licenças, serviços especializados, equipamentos e links), sem custo de pessoal efetivo; devem ser validados com a DAF/Orçamento e por pesquisa de preços. Verificar adesão a contratações nacionais ou ARP do Sistema CNA/SENAR quando houver.',
          'Linhas de base marcadas como "a apurar" serão medidas no 1º trimestre de 2027 (T0) e submetidas ao CGDD; as metas podem ser recalibradas uma única vez após o T0.',
          'Sistemas nacionais (Senar nas Nuvens, Sistego, SISATEG) são integrados por consumo de dados/APIs disponibilizados pela Administração Central; não há alteração desses sistemas pelo SENAR-RO.'
        ]
      },
      {
        titulo: 'Providências Imediatas (Primeiros 90 dias de 2027) e Preservação Orçamentária',
        itens: [
          'Instituir o CGDD e aprovar o PDTI 2027–2030.',
          'Realizar o inventário de sistemas, integrações e planilhas críticas e a avaliação CIS/LGPD (linhas de base).',
          'Ativar MFA em 100% das contas e validar a restauração do backup dos sistemas críticos.',
          'Publicar a primeira versão do Painel Estratégico do PE com os indicadores já disponíveis.',
          'Concluir as automações em andamento (certificados, planilha TCU, arrecadação sem processo físico).',
          'Ordem de preservação em caso de novo contingenciamento: 1º segurança e LGPD (08.4) e continuidade dos serviços (08.6); 2º integração/ERP (08.1) e automação (08.3); 3º BI (08.2); 4º IA (08.5), que pode ser postergada sem comprometer as demais.'
        ]
      },
      {
        titulo: 'Anexo A – Alinhamento aos Direcionadores Estratégicos 2027–2030',
        itens: [
          'Maiores desafios (votação Mentimeter, out/2026): Tecnologia e Inovação (20 votos), Burocracia e Processos Operacionais (18), Sistemas Corporativos e Conectividade (10), Infraestrutura e TI (3) e IA e Data Analytics (1) somam 52 votos e são tratados diretamente nesta ficha (08.1, 08.3, 08.5 e 08.6).',
          'Leitura para a TI: IA e Data Analytics recebeu só 1 voto, indicando baixa percepção do valor dos dados — por isso a ficha prioriza governança de dados, painéis (08.2) e letramento em IA (08.5). "Disponibilidade de Recursos" (21 votos) justifica o teto de R$ 5,6 mi.',
          'Demandas do campo: redução da burocracia documental (FPR, ATeG e PS); ATeG em tempo real e por resultados mensuráveis; ensino híbrido, ambientação 100% EAD e SIGE mais simples; avisos automáticos de UCs e substituição digital de desistentes.',
          'Princípios atendidos: Excelência e qualidade (23 votos), Responsabilidade pelos resultados (13), Transparência e prestação de contas (11) e Decisões orientadas por evidências (3).'
        ]
      },
      {
        titulo: 'Anexo B – Evidências do Diagnóstico Organizacional 2026 (n=42 respondentes)',
        itens: [
          'Aderência dos sistemas: nota média 3,55 de 5 (DAF 3,41; DETEC 3,56; ATeG 3,86); apenas 55% avaliam os sistemas com nota 4 ou 5.',
          'Automação: 71,4% (30 de 42) apontam atividades manuais automatizáveis (ATeG 6/7, DETEC 13/18, DAF 11/17).',
          'Indicadores: só 23,8% afirmam que os objetivos da unidade têm indicadores definidos (DAF: 1 de 17); 52,4% dizem "parcialmente".',
          'Ecossistema atual: RM TOTVS (ERP), PING (processo eletrônico/GED), Senar nas Nuvens, Sistego, SISATEG, uMov, SIGE (Rede e-Tec), Power BI (pontual), Teams e uso intensivo de Excel.',
          'Backlog citado pelas áreas: prestação de contas TCU, contratos/ARP, ordens de pagamento no RM, frota, planilhas orçamentárias/PAC, calendário escolar, inscrições/certificados, certidões ATeG, almoxarifado RM, relatórios PAT/PING e gestão jurídica fim a fim.'
        ]
      }
    ],
    fundamentacaoTecnica:
      'COBIT 2019 (governança), ITIL 4 (serviços), ABNT NBR ISO/IEC 27001/27701 e CIS Controls v8 (segurança e privacidade), DAMA-DMBOK (dados), LGPD (Lei 13.709/2018), Direcionadores Estratégicos 2027–2030 (out/2026), Diagnóstico Organizacional 2026 (n=42) e normas internas do Sistema CNA/SENAR.',
    assinaturaResponsavel: 'Dari Ricardo da Silva Neto – Responsável pela TI – SENAR-AR/RO'
  },

  // =========================================================================
  // 8. PERSPECTIVA: APRENDIZADO E CRESCIMENTO
  // =========================================================================
  {
    id: 'ficha-oe-aprendizado-01',
    codigoObjetivo: '01',
    nomeObjetivo: 'BASE PARA A EXECUÇÃO DA ESTRATÉGIA: PESSOAS, INOVAÇÃO E COMPETÊNCIAS',
    enunciado:
      'Capacitar e engajar continuamente os colaboradores e corpo técnico, consolidar uma cultura de melhoria contínua, inovação e excelência no atendimento ao meio rural.',
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
        detalhamentoTecnico:
          'Trilhas de aprendizagem continuada, pós-graduações setoriais em agronegócio e avaliação de desempenho por competências 360 graus.'
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
        orcamento2029: 100000,
        orcamento2030: 100000,
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
        providenciaMitigadora:
          'Programas de qualidade de vida no trabalho, ginástica laboral e balanceamento de metas operacionais.'
      }
    ],
    fundamentacaoTecnica:
      'Normas Internas de Recursos Humanos do SENAR-AR/RO e Diretrizes de Educação Corporativa da CNA.',
    assinaturaResponsavel: 'Gerência de Gestão de Pessoas - SENAR-AR/RO'
  }
];
