import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MapPin,
  Search,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  RotateCcw,
  Map as MapIcon,
  Layers,
  Copy
} from 'lucide-react';
import {
  MUNICIPIOS_RONDONIA,
  INITIAL_MUNICIPIO_NUMEROS,
  SENAR_NUMEROS_ESTADUAL_OFICIAL,
  RONDONIA_SILHOUETTE_PATH,
  BR364_EIXO_PATH,
  MUNICIPIO_TERRITORIOS,
  MunicipioRondonia,
  SenarNumerosMunicipio,
  SenarNumerosBloco,
  RegiaoRondonia
} from '../../data/rondoniaMunicipiosData';

export const ANOS_CONSOLIDADO = ['2025', '2026', '2027', '2028', '2029', '2030'] as const;
export type AnoConsolidado = (typeof ANOS_CONSOLIDADO)[number];

export interface MapaRondoniaOpenRequest {
  ano?: AnoConsolidado;
  focusResumo?: boolean;
  nonce: number;
}

interface MapaRondoniaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRequest?: MapaRondoniaOpenRequest | null;
}

const STORAGE_KEY_MUNICIPIOS = 'senar_rondonia_municipios_v1';
const STORAGE_KEY_ESTADUAL_ANOS = 'senar_rondonia_estadual_por_ano_v1';
const STORAGE_KEY_METAS_TABELA = 'senar_consolidado_metas_2027_2030_v1';

interface MetaAnualRow {
  id: string;
  meta: string;
  prev2027: string;
  exec2027: string;
  prev2028: string;
  exec2028: string;
  prev2029: string;
  exec2029: string;
  prev2030: string;
  exec2030: string;
}

interface ConsolidadoBloco {
  id: string;
  tituloGrupo: string;
  linhas: MetaAnualRow[];
}

const DEFAULT_BLOCO_ATEG: ConsolidadoBloco = {
  id: 'bloco-ateg',
  tituloGrupo: 'Assistência Técnica e Gerencial (ATeG)',
  linhas: [
    {
      id: 'meta-ateg-1',
      meta: 'Número de propriedades atendidas',
      prev2027: '5.750',
      exec2027: '',
      prev2028: '6.613',
      exec2028: '',
      prev2029: '7.604',
      exec2029: '',
      prev2030: '8.749',
      exec2030: ''
    }
  ]
};

const DEFAULT_BLOCO_FPA: ConsolidadoBloco = {
  id: 'bloco-fpa',
  tituloGrupo: 'Formação Profissional e Aprendizagem',
  linhas: [
    {
      id: 'meta-fpa-1',
      meta: 'Número de produtores atendidos',
      prev2027: '8.444',
      exec2027: '',
      prev2028: '9.711',
      exec2028: '',
      prev2029: '11.168',
      exec2029: '',
      prev2030: '12.843',
      exec2030: ''
    }
  ]
};

const DEFAULT_BLOCO_ETEC: ConsolidadoBloco = {
  id: 'bloco-etec',
  tituloGrupo: 'Rede e-Tec E EDUCAÇÃO A DISTÂNCIA',
  linhas: [
    {
      id: 'meta-etec-1',
      meta: 'Número de turmas',
      prev2027: '47',
      exec2027: '',
      prev2028: '54',
      exec2028: '',
      prev2029: '62',
      exec2029: '',
      prev2030: '71',
      exec2030: ''
    }
  ]
};

const DEFAULT_CONSOLIDADO_TABELAS: Record<string, ConsolidadoBloco[]> = {
  ESTADUAL: [DEFAULT_BLOCO_ATEG, DEFAULT_BLOCO_FPA, DEFAULT_BLOCO_ETEC]
};

function normalizeConsolidadoStorage(raw: unknown): Record<string, ConsolidadoBloco[]> {
  if (!raw || typeof raw !== 'object') return DEFAULT_CONSOLIDADO_TABELAS;
  const input = raw as Record<string, unknown>;
  const normalized: Record<string, ConsolidadoBloco[]> = {};

  for (const [scopeKey, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      normalized[scopeKey] = value.filter(
        (b): b is ConsolidadoBloco =>
          Boolean(b && typeof b === 'object' && 'tituloGrupo' in b && Array.isArray((b as ConsolidadoBloco).linhas))
      );
    } else if (value && typeof value === 'object' && 'tituloGrupo' in value && Array.isArray((value as { linhas?: unknown }).linhas)) {
      const legacy = value as { tituloGrupo: string; linhas: MetaAnualRow[] };
      normalized[scopeKey] = [
        {
          id: `bloco-${scopeKey}-1`,
          tituloGrupo: legacy.tituloGrupo,
          linhas: legacy.linhas
        }
      ];
    }
  }

  if (!normalized.ESTADUAL || normalized.ESTADUAL.length === 0) {
    normalized.ESTADUAL = DEFAULT_CONSOLIDADO_TABELAS.ESTADUAL;
  } else {
    const hasFpa = normalized.ESTADUAL.some(
      (b) =>
        b.id === DEFAULT_BLOCO_FPA.id ||
        b.tituloGrupo.toLowerCase().includes('formação profissional')
    );
    if (!hasFpa) {
      normalized.ESTADUAL = [...normalized.ESTADUAL, DEFAULT_BLOCO_FPA];
    }

    const seededEtec =
      typeof window !== 'undefined' &&
      localStorage.getItem('senar_consolidado_seeded_etec_v1') === '1';
    const hasEtec = normalized.ESTADUAL.some(
      (b) =>
        b.id === DEFAULT_BLOCO_ETEC.id ||
        b.tituloGrupo.toLowerCase().includes('rede e-tec')
    );
    if (!hasEtec && !seededEtec) {
      normalized.ESTADUAL = [...normalized.ESTADUAL, DEFAULT_BLOCO_ETEC];
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('senar_consolidado_seeded_etec_v1', '1');
      } catch {
        // ignore storage errors
      }
    }
  }

  return normalized;
}

const REGIOES: Array<'TODAS' | RegiaoRondonia> = [
  'TODAS',
  'Madeira-Guaporé',
  'Vale do Jamari',
  'Central',
  'Zona da Mata',
  'Vale do Guaporé',
  'Cone Sul'
];

function createEmptyMunicipioData(): SenarNumerosMunicipio {
  return {
    ateg: {
      titulo: 'Assistência Técnica e Gerencial (ATeG)',
      destaquePrincipal: '0 propriedades atendidas',
      itens: ['0 visitas realizadas', '0 técnicos de campo']
    },
    formacaoProfissional: {
      titulo: 'Formação Profissional e Aprendizagem',
      destaquePrincipal: '0 participantes',
      itens: ['Presencial – 0 participantes, em 0 turmas']
    },
    formacaoTecnica: {
      titulo: 'Formação Técnica Profissionalizante',
      destaquePrincipal: '0 alunos matriculados',
      subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
      itens: ['0 polos de ensino', '0 cursos técnicos ofertados']
    },
    saudePromocaoSocial: {
      titulo: 'Saúde e Promoção Social',
      destaquePrincipal: '0 participantes',
      itens: [
        'Promoção Social: 0 participantes, em 0 turmas',
        'Atendimento à Saúde: 0 beneficiários atendidos'
      ]
    },
    atualizadoEm: 'Ciclo 2027–2030'
  };
}

function createProjectedYearData(
  ano: '2026' | '2027' | '2028' | '2029' | '2030',
  ategProps: string,
  fpaProdutores: string,
  fpaTurmas: string,
  fpaAtendimentos: string,
  etecTurmas: string
): SenarNumerosMunicipio {
  if (ano === '2026') {
    return {
      ateg: {
        titulo: 'Assistência Técnica e Gerencial (ATeG)',
        destaquePrincipal: '0 propriedades atendidas',
        itens: ['Dados de 2026 em consolidação — clique em Alterar para preencher']
      },
      formacaoProfissional: {
        titulo: 'Formação Profissional e Aprendizagem',
        destaquePrincipal: '0 produtores atendidos',
        itens: ['Dados de 2026 em consolidação — clique em Alterar para preencher']
      },
      formacaoTecnica: {
        titulo: 'Formação Técnica Profissionalizante',
        destaquePrincipal: '0 turmas / alunos',
        subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
        itens: ['Dados de 2026 em consolidação — clique em Alterar para preencher']
      },
      saudePromocaoSocial: {
        titulo: 'Saúde e Promoção Social',
        destaquePrincipal: '0 participantes',
        itens: ['Dados de 2026 em consolidação — clique em Alterar para preencher']
      },
      atualizadoEm: 'Ano 2026'
    };
  }

  return {
    ateg: {
      titulo: 'Assistência Técnica e Gerencial (ATeG)',
      destaquePrincipal: `${ategProps} propriedades atendidas`,
      itens: [
        `Meta prevista para ${ano}: ${ategProps} propriedades atendidas`,
        'Consultoria gerencial e técnica continuada nos 52 municípios'
      ]
    },
    formacaoProfissional: {
      titulo: 'Formação Profissional e Aprendizagem',
      destaquePrincipal: `${fpaProdutores} produtores atendidos`,
      itens: [
        `${fpaTurmas} turmas previstas em ${ano}`,
        `${fpaAtendimentos} atendimentos previstos em ${ano}`
      ]
    },
    formacaoTecnica: {
      titulo: 'Formação Técnica Profissionalizante',
      destaquePrincipal: `${etecTurmas} turmas`,
      subtitulo: 'Rede de Ensino Rede e-Tec e Educação a Distância',
      itens: [`Meta prevista para ${ano}: ${etecTurmas} turmas ofertadas`]
    },
    saudePromocaoSocial: {
      titulo: 'Saúde e Promoção Social',
      destaquePrincipal: '0 participantes',
      itens: [`Consolidado de ${ano} — clique em Alterar para preencher`]
    },
    atualizadoEm: `Ano ${ano}`
  };
}

const DEFAULT_ESTADUAL_POR_ANO: Record<AnoConsolidado, SenarNumerosMunicipio> = {
  '2025': SENAR_NUMEROS_ESTADUAL_OFICIAL,
  '2026': createProjectedYearData('2026', '0', '0', '0', '0', '0'),
  '2027': createProjectedYearData('2027', '5.750', '8.444', '1.574', '28.184', '47'),
  '2028': createProjectedYearData('2028', '6.613', '9.711', '1.810', '32.370', '54'),
  '2029': createProjectedYearData('2029', '7.604', '11.168', '2.082', '37.226', '62'),
  '2030': createProjectedYearData('2030', '8.749', '12.843', '2.384', '42.809', '71')
};

export const MapaRondoniaModal: React.FC<MapaRondoniaModalProps> = ({
  isOpen,
  onClose,
  initialRequest
}) => {
  const resumoEstadualRef = useRef<HTMLDivElement | null>(null);
  const lastHandledNonceRef = useRef<number | null>(null);

  const [dadosPorMunicipio, setDadosPorMunicipio] = useState<Record<string, SenarNumerosMunicipio>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MUNICIPIOS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_MUNICIPIO_NUMEROS;
  });

  const [selectedAnoConsolidado, setSelectedAnoConsolidado] = useState<AnoConsolidado>('2025');
  const [estadualPorAno, setEstadualPorAno] = useState<Record<AnoConsolidado, SenarNumerosMunicipio>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ESTADUAL_ANOS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_ESTADUAL_POR_ANO, ...parsed };
        }
      }
      const legacy2025 = localStorage.getItem(`${STORAGE_KEY_MUNICIPIOS}_estadual`);
      if (legacy2025) {
        const parsedLegacy = JSON.parse(legacy2025);
        if (parsedLegacy && parsedLegacy.ateg) {
          return { ...DEFAULT_ESTADUAL_POR_ANO, '2025': parsedLegacy };
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_ESTADUAL_POR_ANO;
  });

  const estadualData = estadualPorAno[selectedAnoConsolidado] || DEFAULT_ESTADUAL_POR_ANO[selectedAnoConsolidado];

  const [viewTab, setViewTab] = useState<'mapa' | 'estadual'>('mapa');
  const [consolidadoScope, setConsolidadoScope] = useState<string>('ESTADUAL');
  const [metasTabelaMap, setMetasTabelaMap] = useState<Record<string, ConsolidadoBloco[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_METAS_TABELA);
      if (saved) {
        return normalizeConsolidadoStorage(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
    return DEFAULT_CONSOLIDADO_TABELAS;
  });

  const [editingMetaKey, setEditingMetaKey] = useState<{ blocoId: string; rowId: string } | null>(null);
  const [draftMetaRow, setDraftMetaRow] = useState<MetaAnualRow | null>(null);
  const [addingInBlocoId, setAddingInBlocoId] = useState<string | null>(null);
  const [editingGroupBlocoId, setEditingGroupBlocoId] = useState<string | null>(null);
  const [draftGroupTitle, setDraftGroupTitle] = useState('');
  const [isAddingBloco, setIsAddingBloco] = useState(false);
  const [newBlocoTitle, setNewBlocoTitle] = useState('');

  const [selectedMunicipioId, setSelectedMunicipioId] = useState<string>('porto-velho');
  const [hoveredMunicipioId, setHoveredMunicipioId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regiaoFilter, setRegiaoFilter] = useState<'TODAS' | RegiaoRondonia>('TODAS');

  const [isEditing, setIsEditing] = useState(false);
  const [draftData, setDraftData] = useState<SenarNumerosMunicipio | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MUNICIPIOS, JSON.stringify(dadosPorMunicipio));
    } catch {
      // ignore storage errors
    }
  }, [dadosPorMunicipio]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ESTADUAL_ANOS, JSON.stringify(estadualPorAno));
    } catch {
      // ignore storage errors
    }
  }, [estadualPorAno]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_METAS_TABELA, JSON.stringify(metasTabelaMap));
    } catch {
      // ignore storage errors
    }
  }, [metasTabelaMap]);

  useEffect(() => {
    if (!isOpen || !initialRequest) return;
    if (lastHandledNonceRef.current === initialRequest.nonce) return;
    lastHandledNonceRef.current = initialRequest.nonce;

    setViewTab('estadual');
    setConsolidadoScope('ESTADUAL');
    if (initialRequest.ano) {
      setSelectedAnoConsolidado(initialRequest.ano);
    }
    setIsEditing(false);
    setDraftData(null);

    if (initialRequest.focusResumo) {
      const timer = window.setTimeout(() => {
        resumoEstadualRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, initialRequest]);

  const filteredMunicipios = useMemo(() => {
    return MUNICIPIOS_RONDONIA.filter((m) => {
      const matchSearch = m.nome.toLowerCase().includes(searchTerm.trim().toLowerCase());
      const matchRegiao = regiaoFilter === 'TODAS' || m.regiao === regiaoFilter;
      return matchSearch && matchRegiao;
    });
  }, [searchTerm, regiaoFilter]);

  const selectedMunicipio: MunicipioRondonia =
    MUNICIPIOS_RONDONIA.find((m) => m.id === selectedMunicipioId) || MUNICIPIOS_RONDONIA[0];

  const hoveredMunicipio = hoveredMunicipioId
    ? MUNICIPIOS_RONDONIA.find((m) => m.id === hoveredMunicipioId) || null
    : null;

  const currentMunicipioData = dadosPorMunicipio[selectedMunicipio.id] || null;
  const totalComDados = Object.keys(dadosPorMunicipio).length;

  if (!isOpen) return null;

  const handleSelectMunicipio = (id: string) => {
    setSelectedMunicipioId(id);
    setIsEditing(false);
    setDraftData(null);
  };

  const handleStartInclude = (usarModeloEstadual = false) => {
    const base = usarModeloEstadual
      ? JSON.parse(JSON.stringify(SENAR_NUMEROS_ESTADUAL_OFICIAL))
      : createEmptyMunicipioData();
    setDraftData(base);
    setIsEditing(true);
  };

  const handleStartEdit = () => {
    const source =
      viewTab === 'estadual'
        ? estadualData
        : currentMunicipioData || createEmptyMunicipioData();
    setDraftData(JSON.parse(JSON.stringify(source)));
    setIsEditing(true);
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftData) return;

    const cleanBlock = (b: SenarNumerosBloco): SenarNumerosBloco => ({
      ...b,
      itens: b.itens.map((it) => it.trim()).filter(Boolean)
    });

    const sanitized: SenarNumerosMunicipio = {
      ...draftData,
      ateg: cleanBlock(draftData.ateg),
      formacaoProfissional: cleanBlock(draftData.formacaoProfissional),
      formacaoTecnica: cleanBlock(draftData.formacaoTecnica),
      saudePromocaoSocial: cleanBlock(draftData.saudePromocaoSocial),
      atualizadoEm: new Date().toLocaleDateString('pt-BR')
    };

    if (viewTab === 'estadual') {
      setEstadualPorAno((prev) => ({
        ...prev,
        [selectedAnoConsolidado]: sanitized
      }));
    } else {
      setDadosPorMunicipio((prev) => ({
        ...prev,
        [selectedMunicipio.id]: sanitized
      }));
    }
    setIsEditing(false);
    setDraftData(null);
  };

  const handleDeleteMunicipioData = (id: string) => {
    setDadosPorMunicipio((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setIsEditing(false);
    setDraftData(null);
  };

  const handleResetAll = () => {
    setDadosPorMunicipio(INITIAL_MUNICIPIO_NUMEROS);
    setEstadualPorAno(DEFAULT_ESTADUAL_POR_ANO);
    setSelectedAnoConsolidado('2025');
    setMetasTabelaMap(DEFAULT_CONSOLIDADO_TABELAS);
    setIsEditing(false);
    setDraftData(null);
    setEditingMetaKey(null);
    setDraftMetaRow(null);
    setAddingInBlocoId(null);
    setEditingGroupBlocoId(null);
    setIsAddingBloco(false);
    setNewBlocoTitle('');
  };

  // Helpers para os blocos da tabela Prevista x Executada (2027-2030) na aba Consolidado Estadual
  const activeScopeBlocos: ConsolidadoBloco[] = metasTabelaMap[consolidadoScope] || [];

  const handleChangeScope = (scopeId: string) => {
    setConsolidadoScope(scopeId);
    setEditingMetaKey(null);
    setDraftMetaRow(null);
    setAddingInBlocoId(null);
    setEditingGroupBlocoId(null);
    setIsAddingBloco(false);
    setNewBlocoTitle('');
  };

  const handleStartAddMetaRow = (blocoId: string) => {
    setEditingMetaKey(null);
    setAddingInBlocoId(blocoId);
    setDraftMetaRow({
      id: `meta-${Date.now()}`,
      meta: '',
      prev2027: '',
      exec2027: '',
      prev2028: '',
      exec2028: '',
      prev2029: '',
      exec2029: '',
      prev2030: '',
      exec2030: ''
    });
  };

  const handleStartEditMetaRow = (blocoId: string, row: MetaAnualRow) => {
    setAddingInBlocoId(null);
    setEditingMetaKey({ blocoId, rowId: row.id });
    setDraftMetaRow({ ...row });
  };

  const handleSaveMetaRow = (blocoId: string) => {
    if (!draftMetaRow || !draftMetaRow.meta.trim()) return;
    setMetasTabelaMap((prev) => {
      const currentBlocos = prev[consolidadoScope] || [];
      const nextBlocos = currentBlocos.map((bloco) => {
        if (bloco.id !== blocoId) return bloco;
        const exists = bloco.linhas.some((r) => r.id === draftMetaRow.id);
        return {
          ...bloco,
          linhas: exists
            ? bloco.linhas.map((r) => (r.id === draftMetaRow.id ? draftMetaRow : r))
            : [...bloco.linhas, draftMetaRow]
        };
      });
      return {
        ...prev,
        [consolidadoScope]: nextBlocos
      };
    });
    setEditingMetaKey(null);
    setDraftMetaRow(null);
    setAddingInBlocoId(null);
  };

  const handleDeleteMetaRow = (blocoId: string, rowId: string) => {
    setMetasTabelaMap((prev) => {
      const currentBlocos = prev[consolidadoScope];
      if (!currentBlocos) return prev;
      return {
        ...prev,
        [consolidadoScope]: currentBlocos.map((bloco) =>
          bloco.id === blocoId
            ? { ...bloco, linhas: bloco.linhas.filter((r) => r.id !== rowId) }
            : bloco
        )
      };
    });
    if (editingMetaKey?.blocoId === blocoId && editingMetaKey?.rowId === rowId) {
      setEditingMetaKey(null);
      setDraftMetaRow(null);
    }
  };

  const handleSaveGroupTitle = (blocoId: string) => {
    const cleanTitle = draftGroupTitle.trim() || 'Novo Bloco de Metas';
    setMetasTabelaMap((prev) => {
      const currentBlocos = prev[consolidadoScope] || [];
      return {
        ...prev,
        [consolidadoScope]: currentBlocos.map((bloco) =>
          bloco.id === blocoId ? { ...bloco, tituloGrupo: cleanTitle } : bloco
        )
      };
    });
    setEditingGroupBlocoId(null);
  };

  const handleAddBloco = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = newBlocoTitle.trim();
    if (!cleanTitle) return;
    const novoBlocoId = `bloco-${Date.now()}`;
    setMetasTabelaMap((prev) => {
      const currentBlocos = prev[consolidadoScope] || [];
      return {
        ...prev,
        [consolidadoScope]: [
          ...currentBlocos,
          {
            id: novoBlocoId,
            tituloGrupo: cleanTitle,
            linhas: []
          }
        ]
      };
    });
    setNewBlocoTitle('');
    setIsAddingBloco(false);
    handleStartAddMetaRow(novoBlocoId);
  };

  const handleDeleteBloco = (blocoId: string) => {
    setMetasTabelaMap((prev) => {
      const currentBlocos = prev[consolidadoScope] || [];
      return {
        ...prev,
        [consolidadoScope]: currentBlocos.filter((b) => b.id !== blocoId)
      };
    });
    if (addingInBlocoId === blocoId) {
      setAddingInBlocoId(null);
      setDraftMetaRow(null);
    }
    if (editingMetaKey?.blocoId === blocoId) {
      setEditingMetaKey(null);
      setDraftMetaRow(null);
    }
    if (editingGroupBlocoId === blocoId) {
      setEditingGroupBlocoId(null);
    }
  };

  const handleCopyEstadualTemplate = () => {
    const baseBlocos = metasTabelaMap.ESTADUAL || DEFAULT_CONSOLIDADO_TABELAS.ESTADUAL;
    setMetasTabelaMap((prev) => ({
      ...prev,
      [consolidadoScope]: baseBlocos.map((bloco, bIdx) => ({
        id: `bloco-${consolidadoScope}-${Date.now()}-${bIdx}`,
        tituloGrupo: bloco.tituloGrupo,
        linhas: bloco.linhas.map((l, lIdx) => ({
          ...l,
          id: `meta-${consolidadoScope}-${Date.now()}-${bIdx}-${lIdx}`
        }))
      }))
    }));
  };

  const updateDraftBlockField = (
    blockKey: keyof Pick<
      SenarNumerosMunicipio,
      'ateg' | 'formacaoProfissional' | 'formacaoTecnica' | 'saudePromocaoSocial'
    >,
    field: 'titulo' | 'destaquePrincipal' | 'subtitulo',
    value: string
  ) => {
    if (!draftData) return;
    setDraftData({
      ...draftData,
      [blockKey]: {
        ...draftData[blockKey],
        [field]: value
      }
    });
  };

  const updateDraftBlockItem = (
    blockKey: keyof Pick<
      SenarNumerosMunicipio,
      'ateg' | 'formacaoProfissional' | 'formacaoTecnica' | 'saudePromocaoSocial'
    >,
    idx: number,
    value: string
  ) => {
    if (!draftData) return;
    const nextItens = [...draftData[blockKey].itens];
    nextItens[idx] = value;
    setDraftData({
      ...draftData,
      [blockKey]: {
        ...draftData[blockKey],
        itens: nextItens
      }
    });
  };

  const addDraftBlockItem = (
    blockKey: keyof Pick<
      SenarNumerosMunicipio,
      'ateg' | 'formacaoProfissional' | 'formacaoTecnica' | 'saudePromocaoSocial'
    >
  ) => {
    if (!draftData) return;
    setDraftData({
      ...draftData,
      [blockKey]: {
        ...draftData[blockKey],
        itens: [...draftData[blockKey].itens, '']
      }
    });
  };

  const removeDraftBlockItem = (
    blockKey: keyof Pick<
      SenarNumerosMunicipio,
      'ateg' | 'formacaoProfissional' | 'formacaoTecnica' | 'saudePromocaoSocial'
    >,
    idx: number
  ) => {
    if (!draftData) return;
    setDraftData({
      ...draftData,
      [blockKey]: {
        ...draftData[blockKey],
        itens: draftData[blockKey].itens.filter((_, i) => i !== idx)
      }
    });
  };

  const renderSenarCards = (data: SenarNumerosMunicipio) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      {/* 1. ATeG */}
      <div className="p-4 rounded-2xl bg-[#dce9bd] border border-[#bfd48e] text-[#284b26] shadow-xs">
        <h5 className="text-sm font-bold leading-snug text-[#254d27]">{data.ateg.titulo}</h5>
        <p className="text-base font-black text-[#1d441f] mt-1">{data.ateg.destaquePrincipal}</p>
        <ul className="mt-2.5 space-y-1 text-xs font-medium text-[#2f5730]">
          {data.ateg.itens.map((item, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="mt-1 w-1 h-1 rounded-full bg-[#2f5730] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Formação Profissional e Aprendizagem */}
      <div className="p-4 rounded-2xl bg-[#486e46] border border-[#3a5a38] text-white shadow-xs">
        <h5 className="text-sm font-bold leading-snug text-emerald-50">
          {data.formacaoProfissional.titulo}
        </h5>
        <p className="text-base font-black text-white mt-1">
          {data.formacaoProfissional.destaquePrincipal}
        </p>
        <ul className="mt-2.5 space-y-1 text-xs text-emerald-50/95">
          {data.formacaoProfissional.itens.map((item, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="mt-1 w-1 h-1 rounded-full bg-emerald-200 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Formação Técnica Profissionalizante */}
      <div className="p-4 rounded-2xl bg-[#486e46] border border-[#3a5a38] text-white shadow-xs">
        <h5 className="text-sm font-bold leading-snug text-emerald-50">
          {data.formacaoTecnica.titulo}
        </h5>
        <p className="text-base font-black text-white mt-1">
          {data.formacaoTecnica.destaquePrincipal}
        </p>
        {data.formacaoTecnica.subtitulo && (
          <p className="text-[11px] text-emerald-100/90 mt-2 font-medium">
            {data.formacaoTecnica.subtitulo}
          </p>
        )}
        <ul className="mt-2 space-y-1 text-xs text-emerald-50/95">
          {data.formacaoTecnica.itens.map((item, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="mt-1 w-1 h-1 rounded-full bg-emerald-200 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Saúde e Promoção Social */}
      <div className="p-4 rounded-2xl bg-[#dce9bd] border border-[#bfd48e] text-[#284b26] shadow-xs">
        <h5 className="text-sm font-bold leading-snug text-[#254d27]">
          {data.saudePromocaoSocial.titulo}
        </h5>
        <p className="text-base font-black text-[#1d441f] mt-1">
          {data.saudePromocaoSocial.destaquePrincipal}
        </p>
        <ul className="mt-2.5 space-y-1.5 text-xs font-medium text-[#2f5730]">
          {data.saudePromocaoSocial.itens.map((item, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="mt-1 w-1 h-1 rounded-full bg-[#2f5730] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderEditForm = () => {
    if (!draftData) return null;

    const blocks: Array<{
      key: keyof Pick<
        SenarNumerosMunicipio,
        'ateg' | 'formacaoProfissional' | 'formacaoTecnica' | 'saudePromocaoSocial'
      >;
      label: string;
      hasSubtitle?: boolean;
    }> = [
      { key: 'ateg', label: '1. Assistência Técnica e Gerencial (ATeG)' },
      { key: 'formacaoProfissional', label: '2. Formação Profissional e Aprendizagem' },
      { key: 'formacaoTecnica', label: '3. Formação Técnica Profissionalizante', hasSubtitle: true },
      { key: 'saudePromocaoSocial', label: '4. Saúde e Promoção Social' }
    ];

    return (
      <form onSubmit={handleSaveDraft} className="space-y-4">
        <div className="grid grid-cols-1 gap-3.5">
          {blocks.map(({ key, label, hasSubtitle }) => {
            const bloco = draftData[key];
            return (
              <div
                key={key}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#006837]">
                    {label}
                  </span>
                  <button
                    type="button"
                    onClick={() => addDraftBlockItem(key)}
                    className="px-2 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-[#006837] border border-emerald-200 text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Adicionar Linha</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                      Título do Card
                    </label>
                    <input
                      type="text"
                      value={bloco.titulo}
                      onChange={(e) => updateDraftBlockField(key, 'titulo', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                      Destaque Principal
                    </label>
                    <input
                      type="text"
                      value={bloco.destaquePrincipal}
                      onChange={(e) => updateDraftBlockField(key, 'destaquePrincipal', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                    />
                  </div>
                </div>

                {hasSubtitle && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">
                      Subtítulo / Rede
                    </label>
                    <input
                      type="text"
                      value={bloco.subtitulo || ''}
                      onChange={(e) => updateDraftBlockField(key, 'subtitulo', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-600">
                    Itens / Métricas ({bloco.itens.length})
                  </label>
                  {bloco.itens.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateDraftBlockItem(key, idx, e.target.value)}
                        placeholder="Ex.: 50.257 visitas realizadas"
                        className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                      />
                      <button
                        type="button"
                        onClick={() => removeDraftBlockItem(key, idx)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                        title="Excluir item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-end gap-2 sticky bottom-0 bg-white py-2">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setDraftData(null);
            }}
            className="px-3.5 py-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 text-xs font-semibold cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Salvar Conteúdo</span>
          </button>
        </div>
      </form>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-7xl bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[93vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-emerald-950 via-[#004d26] to-[#006837] text-white flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <MapIcon className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-200 font-bold block">
                Capilaridade Estadual · 52 / 52 Municípios de Rondônia
              </span>
              <h4 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                Mapa de Rondônia — SENAR em Números por Município
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setViewTab('mapa');
                setIsEditing(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                viewTab === 'mapa'
                  ? 'bg-white text-[#006837] border-white shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/25'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Mapa por Município (52)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewTab('estadual');
                setIsEditing(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                viewTab === 'estadual'
                  ? 'bg-white text-[#006837] border-white shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/25'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Consolidado Estadual</span>
            </button>

            <button
              type="button"
              onClick={handleResetAll}
              title="Restaurar dados iniciais"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-emerald-100 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/70">
          {viewTab === 'estadual' ? (
            <div className="space-y-5">
              {/* TABELA DE METAS ANUAIS (PREVISTA x EXECUTADA 2027-2030) POR MUNICÍPIO OU ESTADUAL */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#006837] block">
                      Monitoramento Anual (2027–2030) · Prevista vs. Executada
                    </span>
                    <h5 className="text-lg sm:text-xl font-black text-slate-900">
                      {consolidadoScope === 'ESTADUAL'
                        ? 'Consolidado Estadual (52 Municípios)'
                        : `${MUNICIPIOS_RONDONIA.find((m) => m.id === consolidadoScope)?.nome || ''} — Metas por Município`}
                    </h5>
                  </div>

                  {/* Seletor de Município + Botões de Ação */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="flex flex-col">
                      <label className="text-[10px] font-mono font-bold uppercase text-slate-500 mb-0.5">
                        Selecionar Município / Escopo
                      </label>
                      <select
                        value={consolidadoScope}
                        onChange={(e) => handleChangeScope(e.target.value)}
                        className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#006837] min-w-[240px]"
                      >
                        <option value="ESTADUAL">Consolidado Estadual (Todos os 52 Municípios)</option>
                        {MUNICIPIOS_RONDONIA.map((m) => {
                          const count = (metasTabelaMap[m.id] || []).reduce(
                            (acc, b) => acc + b.linhas.length,
                            0
                          );
                          return (
                            <option key={m.id} value={m.id}>
                              {m.nome} ({m.regiao}){count > 0 ? ` · ${count} meta(s)` : ''}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingBloco(true);
                        setNewBlocoTitle('');
                      }}
                      className="mt-4 px-3.5 py-2 rounded-xl bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Incluir Bloco</span>
                    </button>

                    {consolidadoScope !== 'ESTADUAL' && activeScopeBlocos.length === 0 && (
                      <button
                        type="button"
                        onClick={handleCopyEstadualTemplate}
                        className="mt-4 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#006837] border border-emerald-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Modelo Estadual</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Formulário inline para incluir novo bloco */}
                {isAddingBloco && (
                  <form
                    onSubmit={handleAddBloco}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200"
                  >
                    <input
                      type="text"
                      value={newBlocoTitle}
                      onChange={(e) => setNewBlocoTitle(e.target.value)}
                      placeholder="Nome do novo bloco (ex.: Formação Técnica Profissionalizante)"
                      className="flex-1 px-3 py-2 text-xs rounded-lg border border-emerald-300 bg-white focus:outline-none focus:border-[#006837]"
                      autoFocus
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="px-3.5 py-2 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Criar Bloco</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingBloco(false);
                          setNewBlocoTitle('');
                        }}
                        className="px-3 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}

                {/* Estado vazio quando município ainda não possui blocos */}
                {activeScopeBlocos.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 py-8 px-4 text-center text-xs text-slate-500">
                    Nenhum bloco de metas cadastrado para este município. Clique em{' '}
                    <strong>Incluir Bloco</strong> ou <strong>Copiar Modelo Estadual</strong> acima para começar.
                  </div>
                )}

                {/* Blocos de Tabelas Estruturadas (2027–2030) */}
                <div className="space-y-5">
                  {activeScopeBlocos.map((bloco) => {
                    const isAddingRowHere = addingInBlocoId === bloco.id && draftMetaRow;
                    const isEditingTitleHere = editingGroupBlocoId === bloco.id;

                    return (
                      <div key={bloco.id} className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                            {bloco.tituloGrupo}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleStartAddMetaRow(bloco.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#006837] border border-emerald-200 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Incluir Meta</span>
                            </button>
                            {activeScopeBlocos.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteBloco(bloco.id)}
                                className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                                title="Excluir este bloco"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Excluir Bloco</span>
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-slate-300 shadow-2xs">
                          <table className="w-full text-xs sm:text-sm border-collapse">
                            <thead>
                              {/* Linha 1 do Cabeçalho */}
                              <tr className="bg-slate-50 text-slate-900 border-b border-slate-300">
                                <th className="text-left py-2.5 px-3.5 font-semibold border-r border-slate-300 min-w-[230px]">
                                  {isEditingTitleHere ? (
                                    <div className="flex items-center gap-1.5">
                                      <input
                                        type="text"
                                        value={draftGroupTitle}
                                        onChange={(e) => setDraftGroupTitle(e.target.value)}
                                        className="flex-1 px-2 py-1 text-xs rounded border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleSaveGroupTitle(bloco.id)}
                                        className="p-1 rounded bg-[#006837] text-white cursor-pointer"
                                        title="Salvar título"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditingGroupBlocoId(null)}
                                        className="p-1 rounded bg-slate-200 text-slate-700 cursor-pointer"
                                        title="Cancelar"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-between gap-2">
                                      <span>{bloco.tituloGrupo}</span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setDraftGroupTitle(bloco.tituloGrupo);
                                          setEditingGroupBlocoId(bloco.id);
                                        }}
                                        className="p-1 rounded text-slate-400 hover:text-[#006837] hover:bg-emerald-50 cursor-pointer"
                                        title="Alterar título do grupo"
                                      >
                                        <Edit3 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </th>
                                <th colSpan={2} className="text-center py-2.5 px-2 font-semibold border-r border-slate-300">
                                  2027
                                </th>
                                <th colSpan={2} className="text-center py-2.5 px-2 font-semibold border-r border-slate-300">
                                  2028
                                </th>
                                <th colSpan={2} className="text-center py-2.5 px-2 font-semibold border-r border-slate-300">
                                  2029
                                </th>
                                <th colSpan={2} className="text-center py-2.5 px-2 font-semibold border-r border-slate-300">
                                  2030
                                </th>
                                <th rowSpan={2} className="text-center py-2.5 px-2.5 font-bold bg-slate-100 text-slate-700 w-24">
                                  Ações
                                </th>
                              </tr>

                              {/* Linha 2 do Cabeçalho */}
                              <tr className="bg-slate-100/80 text-slate-900 border-b border-slate-300">
                                <th className="text-center py-2 px-3.5 font-bold border-r border-slate-300">
                                  Meta
                                </th>
                                <th className="text-center py-2 px-2.5 font-bold border-r border-slate-300 whitespace-nowrap">
                                  Prevista
                                </th>
                                <th className="text-center py-2 px-2.5 font-bold border-r border-slate-300 whitespace-nowrap">
                                  Executada
                                </th>
                                <th className="text-center py-2 px-2.5 font-bold border-r border-slate-300 whitespace-nowrap">
                                  Prevista
                                </th>
                                <th className="text-center py-2 px-2.5 font-bold border-r border-slate-300 whitespace-nowrap">
                                  Executada
                                </th>
                                <th className="text-center py-2 px-2.5 font-bold border-r border-slate-300 whitespace-nowrap">
                                  Prevista
                                </th>
                                <th className="text-center py-2 px-2.5 font-bold border-r border-slate-300 whitespace-nowrap">
                                  Executada
                                </th>
                                <th className="text-center py-2 px-2.5 font-bold border-r border-slate-300 whitespace-nowrap">
                                  Prevista
                                </th>
                                <th className="text-center py-2 px-2.5 font-bold border-r border-slate-300 whitespace-nowrap">
                                  Executada
                                </th>
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-300 bg-white">
                              {bloco.linhas.length === 0 && !isAddingRowHere && (
                                <tr>
                                  <td colSpan={10} className="py-6 px-4 text-center text-xs text-slate-500">
                                    Nenhuma meta cadastrada neste bloco. Clique em <strong>Incluir Meta</strong> acima para adicionar.
                                  </td>
                                </tr>
                              )}

                              {bloco.linhas.map((row) => {
                                const isRowEditing =
                                  editingMetaKey?.blocoId === bloco.id &&
                                  editingMetaKey?.rowId === row.id &&
                                  draftMetaRow;
                                return (
                                  <tr key={row.id} className="hover:bg-emerald-50/30 transition-colors">
                                    <td className="py-2.5 px-3.5 border-r border-slate-300 font-medium text-slate-900">
                                      {isRowEditing ? (
                                        <input
                                          type="text"
                                          value={draftMetaRow.meta}
                                          onChange={(e) =>
                                            setDraftMetaRow({ ...draftMetaRow, meta: e.target.value })
                                          }
                                          placeholder="Descrição da Meta"
                                          className="w-full px-2 py-1 text-xs rounded border border-slate-300 focus:outline-none focus:border-[#006837]"
                                        />
                                      ) : (
                                        row.meta
                                      )}
                                    </td>

                                    {(
                                      [
                                        'prev2027',
                                        'exec2027',
                                        'prev2028',
                                        'exec2028',
                                        'prev2029',
                                        'exec2029',
                                        'prev2030',
                                        'exec2030'
                                      ] as const
                                    ).map((field) => (
                                      <td
                                        key={field}
                                        className={`py-2 px-2 text-center border-r border-slate-300 tabular-nums ${
                                          field.startsWith('prev')
                                            ? 'font-semibold text-slate-900'
                                            : 'font-medium text-emerald-800 bg-emerald-50/20'
                                        }`}
                                      >
                                        {isRowEditing ? (
                                          <input
                                            type="text"
                                            value={draftMetaRow[field]}
                                            onChange={(e) =>
                                              setDraftMetaRow({ ...draftMetaRow, [field]: e.target.value })
                                            }
                                            placeholder="-"
                                            className="w-16 sm:w-20 text-center px-1.5 py-1 text-xs rounded border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                                          />
                                        ) : (
                                          <span>{row[field] || <span className="text-slate-300">—</span>}</span>
                                        )}
                                      </td>
                                    ))}

                                    <td className="py-2 px-2 text-center">
                                      {isRowEditing ? (
                                        <div className="flex items-center justify-center gap-1">
                                          <button
                                            type="button"
                                            onClick={() => handleSaveMetaRow(bloco.id)}
                                            className="p-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white cursor-pointer"
                                            title="Salvar"
                                          >
                                            <Check className="w-3.5 h-3.5" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setEditingMetaKey(null);
                                              setDraftMetaRow(null);
                                            }}
                                            className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                                            title="Cancelar"
                                          >
                                            <X className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="flex items-center justify-center gap-1">
                                          <button
                                            type="button"
                                            onClick={() => handleStartEditMetaRow(bloco.id, row)}
                                            className="p-1.5 rounded-lg text-[#006837] hover:bg-emerald-50 border border-transparent hover:border-emerald-200 cursor-pointer"
                                            title="Alterar meta, previsto e executado"
                                          >
                                            <Edit3 className="w-3.5 h-3.5" />
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleDeleteMetaRow(bloco.id, row.id)}
                                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 cursor-pointer"
                                            title="Excluir linha"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}

                              {/* Linha de Inclusão */}
                              {isAddingRowHere && (
                                <tr className="bg-emerald-50/60">
                                  <td className="py-2.5 px-3.5 border-r border-slate-300">
                                    <input
                                      type="text"
                                      value={draftMetaRow.meta}
                                      onChange={(e) =>
                                        setDraftMetaRow({ ...draftMetaRow, meta: e.target.value })
                                      }
                                      placeholder="Nova meta (ex.: Número de produtores atendidos)"
                                      className="w-full px-2 py-1 text-xs rounded border border-emerald-400 bg-white focus:outline-none focus:border-[#006837]"
                                      autoFocus
                                    />
                                  </td>
                                  {(
                                    [
                                      'prev2027',
                                      'exec2027',
                                      'prev2028',
                                      'exec2028',
                                      'prev2029',
                                      'exec2029',
                                      'prev2030',
                                      'exec2030'
                                    ] as const
                                  ).map((field) => (
                                    <td key={field} className="py-2 px-2 text-center border-r border-slate-300">
                                      <input
                                        type="text"
                                        value={draftMetaRow[field]}
                                        onChange={(e) =>
                                          setDraftMetaRow({ ...draftMetaRow, [field]: e.target.value })
                                        }
                                        placeholder={field.startsWith('prev') ? 'Prev.' : 'Exec.'}
                                        className="w-16 sm:w-20 text-center px-1.5 py-1 text-xs rounded border border-emerald-300 bg-white focus:outline-none focus:border-[#006837]"
                                      />
                                    </td>
                                  ))}
                                  <td className="py-2 px-2 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() => handleSaveMetaRow(bloco.id)}
                                        className="p-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white cursor-pointer"
                                        title="Incluir meta"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setAddingInBlocoId(null);
                                          setDraftMetaRow(null);
                                        }}
                                        className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                                        title="Cancelar"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RESUMO SENAR EM NÚMEROS (ESTADUAL) */}
              {consolidadoScope === 'ESTADUAL' && (
                <div
                  id="senar-numeros-consolidado-estadual"
                  ref={resumoEstadualRef}
                  className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5 scroll-mt-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                    <div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#006837] block">
                        Estado de Rondônia · 52 Municípios · Ano {selectedAnoConsolidado}
                      </span>
                      <h5 className="text-lg font-black text-slate-900">
                        Senar em Números — Consolidado Estadual ({selectedAnoConsolidado})
                      </h5>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
                          Selecionar Ano
                        </span>
                        <div
                          className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200"
                          role="group"
                          aria-label="Seleção de ano do Consolidado Estadual (2025 a 2030)"
                        >
                          {ANOS_CONSOLIDADO.map((ano) => {
                            const isActive = ano === selectedAnoConsolidado;
                            return (
                              <button
                                key={ano}
                                type="button"
                                onClick={() => {
                                  setSelectedAnoConsolidado(ano);
                                  setIsEditing(false);
                                  setDraftData(null);
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                                  isActive
                                    ? 'bg-[#006837] text-white shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                                }`}
                              >
                                {ano}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {!isEditing && (
                        <button
                          type="button"
                          onClick={handleStartEdit}
                          className="lg:mt-4 px-3.5 py-2 rounded-xl bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs cursor-pointer self-start lg:self-auto"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Alterar Consolidado ({selectedAnoConsolidado})</span>
                        </button>
                      )}
                    </div>
                  </div>
                  {isEditing ? renderEditForm() : renderSenarCards(estadualData)}
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* LEFT: INTERACTIVE MAP OF RONDÔNIA (52 MUNICIPALITIES) */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                {/* Search + Region Filter */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar entre os 52 municípios..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#006837]"
                    />
                  </div>
                  <select
                    value={regiaoFilter}
                    onChange={(e) => setRegiaoFilter(e.target.value as 'TODAS' | RegiaoRondonia)}
                    className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#006837]"
                  >
                    {REGIOES.map((reg) => (
                      <option key={reg} value={reg}>
                        {reg === 'TODAS' ? 'Todas as Regiões (52)' : reg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SVG Map Container */}
                <div className="relative rounded-xl bg-slate-50/70 border border-slate-200 overflow-hidden p-2">
                  <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-600">
                    <span className="font-mono font-bold text-[#006837]">
                      RONDÔNIA · 52 MUNICÍPIOS
                    </span>
                    <span className="text-[11px] font-medium">
                      <strong className="text-[#006837]">{totalComDados}</strong> com números cadastrados
                    </span>
                  </div>

                  <svg
                    viewBox="40 0 580 508"
                    className="w-full h-auto max-h-[430px] select-none"
                    role="img"
                    aria-label="Mapa político-territorial interativo dos 52 municípios de Rondônia"
                  >
                    <defs>
                      <clipPath id="roStateClip">
                        <path d={RONDONIA_SILHOUETTE_PATH} />
                      </clipPath>
                      <filter id="roShadow" x="-5%" y="-5%" width="110%" height="110%">
                        <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#004d26" floodOpacity="0.14" />
                      </filter>
                    </defs>

                    {/* Subtle coordinate grid */}
                    <g stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.45">
                      <line x1="50" y1="120" x2="610" y2="120" />
                      <line x1="50" y1="240" x2="610" y2="240" />
                      <line x1="50" y1="360" x2="610" y2="360" />
                      <line x1="160" y1="15" x2="160" y2="495" />
                      <line x1="320" y1="15" x2="320" y2="495" />
                      <line x1="480" y1="15" x2="480" y2="495" />
                    </g>

                    {/* Base State Silhouette Shadow */}
                    <path
                      d={RONDONIA_SILHOUETTE_PATH}
                      fill="#ffffff"
                      filter="url(#roShadow)"
                    />

                    {/* 52 Municipal Territories (monochrome institutional app pattern) */}
                    <g clipPath="url(#roStateClip)">
                      {MUNICIPIOS_RONDONIA.map((m) => {
                        const terr = MUNICIPIO_TERRITORIOS[m.id];
                        if (!terr) return null;
                        const isSelected = m.id === selectedMunicipio.id;
                        const isHovered = m.id === hoveredMunicipioId;
                        const hasData = Boolean(dadosPorMunicipio[m.id]);
                        const matchesFilter = filteredMunicipios.some((fm) => fm.id === m.id);

                        const fillColor = isSelected
                          ? '#006837'
                          : isHovered
                          ? '#d1fae5'
                          : hasData
                          ? '#ecfdf5'
                          : '#ffffff';

                        return (
                          <g
                            key={m.id}
                            onClick={() => handleSelectMunicipio(m.id)}
                            onMouseEnter={() => setHoveredMunicipioId(m.id)}
                            onMouseLeave={() => setHoveredMunicipioId(null)}
                            className="cursor-pointer transition-opacity duration-150"
                            opacity={matchesFilter ? 1 : 0.25}
                          >
                            <title>{`${m.nome} (${m.regiao})`}</title>
                            {terr.polygons.map((pts, idx) => (
                              <polygon
                                key={`${m.id}-poly-${idx}`}
                                points={pts}
                                fill={fillColor}
                                stroke={fillColor}
                                strokeWidth="0.6"
                                strokeLinejoin="round"
                              />
                            ))}
                          </g>
                        );
                      })}

                      {/* Municipal Boundary Divisions */}
                      {MUNICIPIOS_RONDONIA.map((m) => {
                        const terr = MUNICIPIO_TERRITORIOS[m.id];
                        if (!terr || !terr.borderPath) return null;
                        const matchesFilter = filteredMunicipios.some((fm) => fm.id === m.id);
                        return (
                          <path
                            key={`${m.id}-border`}
                            d={terr.borderPath}
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="0.85"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            opacity={matchesFilter ? 0.72 : 0.25}
                            className="pointer-events-none"
                          />
                        );
                      })}

                      {/* Highlighted Border for Hovered / Selected Municipality */}
                      {hoveredMunicipioId &&
                        hoveredMunicipioId !== selectedMunicipio.id &&
                        MUNICIPIO_TERRITORIOS[hoveredMunicipioId]?.borderPath && (
                          <path
                            d={MUNICIPIO_TERRITORIOS[hoveredMunicipioId].borderPath}
                            fill="none"
                            stroke="#0f766e"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                            className="pointer-events-none"
                          />
                        )}
                      {MUNICIPIO_TERRITORIOS[selectedMunicipio.id]?.borderPath && (
                        <path
                          d={MUNICIPIO_TERRITORIOS[selectedMunicipio.id].borderPath}
                          fill="none"
                          stroke="#064e3b"
                          strokeWidth="1.9"
                          strokeLinejoin="round"
                          className="pointer-events-none"
                        />
                      )}
                    </g>

                    {/* Outer State Silhouette Border of Rondônia */}
                    <path
                      d={RONDONIA_SILHOUETTE_PATH}
                      fill="none"
                      stroke="#006837"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                      className="pointer-events-none"
                    />

                    {/* Subtle BR-364 Axis */}
                    <path
                      d={BR364_EIXO_PATH}
                      fill="none"
                      stroke="#0f766e"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                      opacity="0.35"
                      className="pointer-events-none"
                    />

                    {/* Neighboring Territory Context Labels */}
                    <text x="58" y="100" className="fill-slate-400 text-[9.5px] font-mono font-semibold pointer-events-none">
                      AC / AM
                    </text>
                    <text x="498" y="88" className="fill-slate-400 text-[9.5px] font-mono font-semibold pointer-events-none">
                      AMAZONAS
                    </text>
                    <text x="514" y="218" className="fill-slate-400 text-[9.5px] font-mono font-semibold pointer-events-none">
                      MATO GROSSO
                    </text>
                    <text x="90" y="392" className="fill-slate-400 text-[9.5px] font-mono font-semibold pointer-events-none">
                      BOLÍVIA (Rio Guaporé)
                    </text>

                    {/* Municipal Seat Dots & Key Labels */}
                    {MUNICIPIOS_RONDONIA.map((m) => {
                      const terr = MUNICIPIO_TERRITORIOS[m.id];
                      if (!terr) return null;
                      const isSelected = m.id === selectedMunicipio.id;
                      const isHovered = m.id === hoveredMunicipioId;
                      const hasData = Boolean(dadosPorMunicipio[m.id]);
                      const matchesFilter = filteredMunicipios.some((fm) => fm.id === m.id);

                      return (
                        <g
                          key={`${m.id}-seat`}
                          transform={`translate(${terr.seatX}, ${terr.seatY})`}
                          className="pointer-events-none"
                          opacity={matchesFilter ? 1 : 0.25}
                        >
                          {isSelected && (
                            <circle
                              r={9}
                              fill="#ffffff"
                              opacity={0.35}
                              className="animate-ping"
                            />
                          )}
                          <circle
                            r={isSelected ? 4.8 : isHovered ? 3.8 : hasData ? 2.8 : m.polo ? 2.5 : 1.8}
                            fill={
                              isSelected
                                ? '#ffffff'
                                : hasData || isHovered
                                ? '#006837'
                                : '#64748b'
                            }
                            stroke={isSelected ? '#064e3b' : '#ffffff'}
                            strokeWidth={isSelected ? 1.8 : 0.9}
                          />

                          {(m.polo || isSelected || isHovered) && (
                            <text
                              x={6}
                              y={-4}
                              className={`text-[9px] font-bold ${
                                isSelected
                                  ? 'fill-[#064e3b] font-extrabold'
                                  : 'fill-slate-800'
                              }`}
                              style={{
                                paintOrder: 'stroke',
                                stroke: '#ffffff',
                                strokeWidth: '2.6px',
                                strokeLinejoin: 'round'
                              }}
                            >
                              {m.nome}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Hover Tooltip & Map Legend */}
                  <div className="px-2.5 py-2 border-t border-slate-200 bg-white/90 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-slate-700">
                        <span className="w-3 h-3 rounded-xs bg-[#006837] border border-emerald-950 inline-block" />
                        Selecionado
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-slate-700">
                        <span className="w-3 h-3 rounded-xs bg-emerald-50 border border-[#006837] inline-block" />
                        Com dados ({totalComDados})
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-slate-700">
                        <span className="w-3 h-3 rounded-xs bg-white border border-slate-400 inline-block" />
                        Demais municípios (52)
                      </span>
                    </div>

                    {hoveredMunicipio && (
                      <span className="font-semibold text-[#006837]">
                        {hoveredMunicipio.nome} · {hoveredMunicipio.regiao}
                      </span>
                    )}
                  </div>
                </div>

                {/* Clickable list of filtered municipalities */}
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Lista Rápida de Municípios ({filteredMunicipios.length})
                  </span>
                  <div className="max-h-36 overflow-y-auto flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
                    {filteredMunicipios.map((m) => {
                      const isSel = m.id === selectedMunicipio.id;
                      const hasData = Boolean(dadosPorMunicipio[m.id]);
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleSelectMunicipio(m.id)}
                          className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer inline-flex items-center gap-1 ${
                            isSel
                              ? 'bg-[#006837] text-white shadow-xs'
                              : hasData
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSel ? 'bg-amber-300' : hasData ? 'bg-emerald-600' : 'bg-slate-300'
                            }`}
                          />
                          <span>{m.nome}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT: SELECTED MUNICIPALITY "SENAR EM NÚMEROS" CRUD PANEL */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-[#006837]">
                        {selectedMunicipio.regiao}
                      </span>
                      {currentMunicipioData ? (
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                          Com Registro
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          Sem Registro
                        </span>
                      )}
                    </div>
                    <h5 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                      {selectedMunicipio.nome} — Senar em Números
                    </h5>
                  </div>

                  {/* CRUD Action Buttons */}
                  {!isEditing && (
                    <div className="flex flex-wrap items-center gap-2">
                      {currentMunicipioData ? (
                        <>
                          <button
                            type="button"
                            onClick={handleStartEdit}
                            className="px-3 py-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Alterar</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMunicipioData(selectedMunicipio.id)}
                            className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Excluir</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleStartInclude(false)}
                            className="px-3 py-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Incluir Dados</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStartInclude(true)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#006837] border border-emerald-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                            title="Preencher com o modelo oficial da imagem anexada"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Usar Modelo da Imagem</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Content or Editor */}
                {isEditing ? (
                  renderEditForm()
                ) : currentMunicipioData ? (
                  renderSenarCards(currentMunicipioData)
                ) : (
                  <div className="py-10 px-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#006837] flex items-center justify-center mx-auto">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h6 className="text-sm font-bold text-slate-900">
                        Nenhum dado de “Senar em números” cadastrado para {selectedMunicipio.nome}
                      </h6>
                      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                        Clique abaixo para incluir os números de ATeG, Formação Profissional, Rede e-Tec e Saúde e Promoção Social deste município.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleStartInclude(false)}
                        className="px-4 py-2 rounded-xl bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Incluir Novo Registro</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStartInclude(true)}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 text-[#006837] border border-emerald-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Preencher com Modelo da Imagem</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            SENAR Rondônia · Cobertura Estadual nos 52 Municípios ({totalComDados}/52 com registros detalhados)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors cursor-pointer"
          >
            Fechar Mapa
          </button>
        </div>
      </div>
    </div>
  );
};
