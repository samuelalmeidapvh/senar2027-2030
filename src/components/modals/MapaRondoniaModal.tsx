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
  Layers,
  Copy,
  Target,
  ChevronUp,
  ChevronDown,
  TrendingUp
} from 'lucide-react';
import { FichaTecnicaObjetivo, IndicadorMetaFicha } from '../../types/strategic';
import { FICHAS_TECNICAS_INICIAIS } from '../../data/fichasTecnicasData';
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
  fichas?: FichaTecnicaObjetivo[];
  onChangeFichas?: React.Dispatch<React.SetStateAction<FichaTecnicaObjetivo[]>>;
}

interface MapaRondoniaSectionProps {
  fichas?: FichaTecnicaObjetivo[];
  onChangeFichas?: React.Dispatch<React.SetStateAction<FichaTecnicaObjetivo[]>>;
}

interface MapaRondoniaContentProps {
  mode: 'section' | 'modal';
  isActive: boolean;
  onClose?: () => void;
  initialRequest?: MapaRondoniaOpenRequest | null;
  fichas?: FichaTecnicaObjetivo[];
  onChangeFichas?: React.Dispatch<React.SetStateAction<FichaTecnicaObjetivo[]>>;
}

const MAPA_SYNC_EVENT = 'senar_rondonia_mapa_sync_v1';

const STORAGE_KEY_MUNICIPIOS = 'senar_rondonia_municipios_v1';
const STORAGE_KEY_MUNICIPIOS_ANOS = 'senar_rondonia_municipios_por_ano_v1';
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

const MapaRondoniaContent: React.FC<MapaRondoniaContentProps> = ({
  mode,
  isActive,
  onClose,
  initialRequest,
  fichas,
  onChangeFichas
}) => {
  const resumoEstadualRef = useRef<HTMLDivElement | null>(null);
  const lastHandledNonceRef = useRef<number | null>(null);
  const instanceIdRef = useRef<string>(`mapa-${Math.random().toString(36).slice(2)}`);
  const isSyncingFromExternalRef = useRef(false);

  const [localFichas, setLocalFichas] = useState<FichaTecnicaObjetivo[]>(FICHAS_TECNICAS_INICIAIS);
  const activeFichasList = fichas ?? localFichas;
  const setActiveFichasList = onChangeFichas ?? setLocalFichas;

  const fichaAteg = useMemo(() => {
    return (
      activeFichasList.find(
        (f) =>
          f.id === 'ficha-oe-02-dateg-ateg' ||
          (f.codigoObjetivo === '02' && f.nomeObjetivo.toUpperCase().includes('ATEG'))
      ) || FICHAS_TECNICAS_INICIAIS.find((f) => f.id === 'ficha-oe-02-dateg-ateg')
    );
  }, [activeFichasList]);

  const [showAtegIndicadores, setShowAtegIndicadores] = useState(true);
  const [editingAtegKpiId, setEditingAtegKpiId] = useState<string | null>(null);
  const [isAddingAtegKpi, setIsAddingAtegKpi] = useState(false);
  const [draftAtegKpi, setDraftAtegKpi] = useState<IndicadorMetaFicha | null>(null);

  const [selectedAnoMunicipio, setSelectedAnoMunicipio] = useState<AnoConsolidado>('2025');
  const [municipiosPorAno, setMunicipiosPorAno] = useState<
    Record<AnoConsolidado, Record<string, SenarNumerosMunicipio>>
  >(() => {
    const emptyYears: Record<AnoConsolidado, Record<string, SenarNumerosMunicipio>> = {
      '2025': INITIAL_MUNICIPIO_NUMEROS,
      '2026': {},
      '2027': {},
      '2028': {},
      '2029': {},
      '2030': {}
    };
    try {
      const savedByYear = localStorage.getItem(STORAGE_KEY_MUNICIPIOS_ANOS);
      if (savedByYear) {
        const parsed = JSON.parse(savedByYear);
        if (parsed && typeof parsed === 'object') {
          return { ...emptyYears, ...parsed };
        }
      }
      const savedLegacy2025 = localStorage.getItem(STORAGE_KEY_MUNICIPIOS);
      if (savedLegacy2025) {
        const parsedLegacy = JSON.parse(savedLegacy2025);
        if (parsedLegacy && typeof parsedLegacy === 'object') {
          return { ...emptyYears, '2025': parsedLegacy };
        }
      }
    } catch {
      // fallback
    }
    return emptyYears;
  });

  const dadosPorMunicipio = municipiosPorAno[selectedAnoMunicipio] || {};

  const [selectedAnoConsolidado, setSelectedAnoConsolidado] = useState<AnoConsolidado>('2025');
  const [estadualPorAno, setEstadualPorAno] = useState<
    Partial<Record<AnoConsolidado, SenarNumerosMunicipio>>
  >(() => {
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
    const handleExternalSync = (e: Event) => {
      const detail = (e as CustomEvent<{ sourceId: string; key: string }>).detail;
      if (!detail || detail.sourceId === instanceIdRef.current) return;
      isSyncingFromExternalRef.current = true;
      try {
        if (detail.key === STORAGE_KEY_MUNICIPIOS_ANOS) {
          const saved = localStorage.getItem(STORAGE_KEY_MUNICIPIOS_ANOS);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && typeof parsed === 'object') {
              setMunicipiosPorAno((prev) => ({ ...prev, ...parsed }));
            }
          }
        } else if (detail.key === STORAGE_KEY_ESTADUAL_ANOS) {
          const saved = localStorage.getItem(STORAGE_KEY_ESTADUAL_ANOS);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && typeof parsed === 'object') {
              setEstadualPorAno({ ...DEFAULT_ESTADUAL_POR_ANO, ...parsed });
            }
          }
        } else if (detail.key === STORAGE_KEY_METAS_TABELA) {
          const saved = localStorage.getItem(STORAGE_KEY_METAS_TABELA);
          if (saved) {
            setMetasTabelaMap(normalizeConsolidadoStorage(JSON.parse(saved)));
          }
        }
      } catch {
        // ignore parse errors
      } finally {
        window.setTimeout(() => {
          isSyncingFromExternalRef.current = false;
        }, 0);
      }
    };
    window.addEventListener(MAPA_SYNC_EVENT, handleExternalSync);
    return () => window.removeEventListener(MAPA_SYNC_EVENT, handleExternalSync);
  }, []);

  useEffect(() => {
    if (isSyncingFromExternalRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY_MUNICIPIOS_ANOS, JSON.stringify(municipiosPorAno));
      localStorage.setItem(STORAGE_KEY_MUNICIPIOS, JSON.stringify(municipiosPorAno['2025'] || {}));
      window.dispatchEvent(
        new CustomEvent(MAPA_SYNC_EVENT, {
          detail: { sourceId: instanceIdRef.current, key: STORAGE_KEY_MUNICIPIOS_ANOS }
        })
      );
    } catch {
      // ignore storage errors
    }
  }, [municipiosPorAno]);

  useEffect(() => {
    if (isSyncingFromExternalRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY_ESTADUAL_ANOS, JSON.stringify(estadualPorAno));
      window.dispatchEvent(
        new CustomEvent(MAPA_SYNC_EVENT, {
          detail: { sourceId: instanceIdRef.current, key: STORAGE_KEY_ESTADUAL_ANOS }
        })
      );
    } catch {
      // ignore storage errors
    }
  }, [estadualPorAno]);

  useEffect(() => {
    if (isSyncingFromExternalRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY_METAS_TABELA, JSON.stringify(metasTabelaMap));
      window.dispatchEvent(
        new CustomEvent(MAPA_SYNC_EVENT, {
          detail: { sourceId: instanceIdRef.current, key: STORAGE_KEY_METAS_TABELA }
        })
      );
    } catch {
      // ignore storage errors
    }
  }, [metasTabelaMap]);

  useEffect(() => {
    if (!isActive || !initialRequest) return;
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
  }, [isActive, initialRequest]);

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

  const handleSelectMunicipio = (id: string) => {
    setSelectedMunicipioId(id);
    setIsEditing(false);
    setDraftData(null);
  };

  const activePanelScope = viewTab === 'estadual' ? consolidadoScope : selectedMunicipio.id;
  const activePanelAno = viewTab === 'estadual' ? selectedAnoConsolidado : selectedAnoMunicipio;

  const getPanelData = (scopeId: string, ano: AnoConsolidado): SenarNumerosMunicipio | null => {
    if (scopeId === 'ESTADUAL') {
      return estadualPorAno[ano] || null;
    }
    return (municipiosPorAno[ano] || {})[scopeId] || null;
  };

  const handleStartInclude = (usarModeloEstadual = false) => {
    const base = usarModeloEstadual
      ? JSON.parse(JSON.stringify(SENAR_NUMEROS_ESTADUAL_OFICIAL))
      : createEmptyMunicipioData();
    setDraftData(base);
    setIsEditing(true);
  };

  const handleStartEdit = () => {
    const source = getPanelData(activePanelScope, activePanelAno) || createEmptyMunicipioData();
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

    if (activePanelScope === 'ESTADUAL') {
      setEstadualPorAno((prev) => ({
        ...prev,
        [activePanelAno]: sanitized
      }));
    } else {
      setMunicipiosPorAno((prev) => ({
        ...prev,
        [activePanelAno]: {
          ...(prev[activePanelAno] || {}),
          [activePanelScope]: sanitized
        }
      }));
    }
    setIsEditing(false);
    setDraftData(null);
  };

  const handleDeletePanelData = (scopeId: string, ano: AnoConsolidado) => {
    if (scopeId === 'ESTADUAL') {
      setEstadualPorAno((prev) => {
        const next = { ...prev };
        delete next[ano];
        return next;
      });
    } else {
      setMunicipiosPorAno((prev) => {
        const yearMap = { ...(prev[ano] || {}) };
        delete yearMap[scopeId];
        return {
          ...prev,
          [ano]: yearMap
        };
      });
    }
    setIsEditing(false);
    setDraftData(null);
  };

  const handleResetAll = () => {
    setMunicipiosPorAno({
      '2025': INITIAL_MUNICIPIO_NUMEROS,
      '2026': {},
      '2027': {},
      '2028': {},
      '2029': {},
      '2030': {}
    });
    setSelectedAnoMunicipio('2025');
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

  // Helpers para Indicadores, Linha de Base e Metas Anuais (2027-2030) da Ficha Técnica 02 (ATeG)
  const handleStartAddAtegKpi = () => {
    const nextIdx = (fichaAteg?.indicadoresMetas.length || 0) + 1;
    setEditingAtegKpiId(null);
    setIsAddingAtegKpi(true);
    setShowAtegIndicadores(true);
    setDraftAtegKpi({
      id: `kpi-dateg-${Date.now()}`,
      codigo: `02.${nextIdx}`,
      nome: '',
      unidadeMedida: 'Percentual (%)',
      linhaBase2026: '',
      exec2025: '',
      exec2026: '',
      meta2027: '',
      exec2027: '',
      meta2028: '',
      exec2028: '',
      meta2029: '',
      exec2029: '',
      meta2030: '',
      exec2030: '',
      fonteVerificacao: ''
    });
  };

  const handleStartEditAtegKpi = (kpi: IndicadorMetaFicha) => {
    setIsAddingAtegKpi(false);
    setEditingAtegKpiId(kpi.id);
    setDraftAtegKpi({ ...kpi });
  };

  const handleSaveAtegKpi = () => {
    if (!draftAtegKpi || !draftAtegKpi.nome.trim() || !fichaAteg) return;
    setActiveFichasList((prev) =>
      prev.map((f) => {
        if (f.id !== fichaAteg.id) return f;
        const exists = f.indicadoresMetas.some((k) => k.id === draftAtegKpi.id);
        return {
          ...f,
          indicadoresMetas: exists
            ? f.indicadoresMetas.map((k) => (k.id === draftAtegKpi.id ? draftAtegKpi : k))
            : [...f.indicadoresMetas, draftAtegKpi]
        };
      })
    );
    setEditingAtegKpiId(null);
    setIsAddingAtegKpi(false);
    setDraftAtegKpi(null);
  };

  const handleDeleteAtegKpi = (kpiId: string) => {
    if (!fichaAteg) return;
    setActiveFichasList((prev) =>
      prev.map((f) =>
        f.id === fichaAteg.id
          ? { ...f, indicadoresMetas: f.indicadoresMetas.filter((k) => k.id !== kpiId) }
          : f
      )
    );
    if (editingAtegKpiId === kpiId) {
      setEditingAtegKpiId(null);
      setDraftAtegKpi(null);
    }
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
    <>
      {/* Body */}
      <div
        className={
          mode === 'modal'
            ? 'flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/70 space-y-5'
            : 'space-y-5'
        }
      >
          {mode === 'section' && (
            <nav
              aria-label="Navegação do Mapa de Rondônia e Senar em Números"
              className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-xs"
            >
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewTab('mapa');
                    setIsEditing(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                    viewTab === 'mapa'
                      ? 'bg-[#006837] text-white border-[#006837] shadow-2xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
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
                      ? 'bg-[#006837] text-white border-[#006837] shadow-2xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Consolidado Estadual</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {viewTab === 'estadual' && (
                  <select
                    aria-label="Selecionar Município ou Escopo Estadual"
                    value={consolidadoScope}
                    onChange={(e) => handleChangeScope(e.target.value)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#006837] min-w-[220px]"
                  >
                    <option value="ESTADUAL">Consolidado Estadual (52 Municípios)</option>
                    {MUNICIPIOS_RONDONIA.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.nome} ({m.regiao})
                      </option>
                    ))}
                  </select>
                )}

                <button
                  type="button"
                  onClick={handleResetAll}
                  title="Restaurar dados iniciais"
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </nav>
          )}

          {/* BLOCO INSERIDO ACIMA: INDICADORES, LINHA DE BASE E METAS ANUAIS (2027-2030) - FICHA TÉCNICA 02 ATeG */}
          {mode === 'modal' && fichaAteg && (
            <div
              id="ficha-02-ateg-indicadores"
              className="bg-white rounded-2xl border border-emerald-200/90 p-4 sm:p-5 shadow-xs space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#006837] text-white font-mono font-bold text-[10px] uppercase tracking-wider">
                      <Target className="w-3 h-3" />
                      <span>Ficha Técnica {fichaAteg.codigoObjetivo}</span>
                    </span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {fichaAteg.nomeObjetivo}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      · {fichaAteg.indicadoresMetas.length} indicador(es)
                    </span>
                  </div>
                  <h5 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">
                    INDICADORES, LINHA DE BASE E METAS ANUAIS (2027–2030)
                  </h5>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setViewTab('mapa');
                      setIsEditing(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                      viewTab === 'mapa'
                        ? 'bg-[#006837] text-white border-[#006837] shadow-2xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
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
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                      viewTab === 'estadual'
                        ? 'bg-[#006837] text-white border-[#006837] shadow-2xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Consolidado Estadual</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStartAddAtegKpi}
                    className="px-3 py-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Indicador</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAtegIndicadores((prev) => !prev)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {showAtegIndicadores ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" />
                        <span>Recolher</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5" />
                        <span>Expandir</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetAll}
                    title="Restaurar dados iniciais"
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {mode === 'modal' && onClose && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-700 transition-colors cursor-pointer"
                      title="Fechar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {showAtegIndicadores && (
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gradient-to-r from-emerald-900 to-[#006837] text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
                        <th className="p-2.5 sm:p-3 w-14 text-center">ID</th>
                        <th className="p-2.5 sm:p-3 min-w-[210px]">Indicador de Desempenho (KPI)</th>
                        <th className="p-2.5 sm:p-3 min-w-[95px]">Unidade</th>
                        <th className="p-2.5 sm:p-3 min-w-[105px] text-center bg-emerald-950/40">Linha Base (2026)</th>
                        <th className="p-2.5 sm:p-3 min-w-[80px] text-center bg-emerald-950/30">Exec. 2025</th>
                        <th className="p-2.5 sm:p-3 min-w-[80px] text-center bg-emerald-950/30">Exec. 2026</th>
                        <th className="p-2.5 sm:p-3 min-w-[88px] text-center">2027 (Prev / Exec)</th>
                        <th className="p-2.5 sm:p-3 min-w-[88px] text-center">2028 (Prev / Exec)</th>
                        <th className="p-2.5 sm:p-3 min-w-[88px] text-center">2029 (Prev / Exec)</th>
                        <th className="p-2.5 sm:p-3 min-w-[92px] text-center bg-emerald-950/40 font-bold">2030 (Prev / Exec)</th>
                        <th className="p-2.5 sm:p-3 min-w-[150px]">Fonte de Verificação</th>
                        <th className="p-2.5 sm:p-3 w-20 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                      {fichaAteg.indicadoresMetas.map((kpi) => {
                        const isRowEditing = editingAtegKpiId === kpi.id && draftAtegKpi;
                        return (
                          <tr key={kpi.id} className="hover:bg-emerald-50/40 transition-colors">
                            <td className="p-2.5 sm:p-3 font-mono font-bold text-center text-[#006837] bg-slate-50/60">
                              {isRowEditing ? (
                                <input
                                  type="text"
                                  value={draftAtegKpi.codigo}
                                  onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, codigo: e.target.value })}
                                  className="w-12 text-center px-1.5 py-1 text-xs rounded border border-slate-300 bg-white"
                                />
                              ) : (
                                kpi.codigo
                              )}
                            </td>
                            <td className="p-2.5 sm:p-3 font-bold text-slate-900">
                              {isRowEditing ? (
                                <input
                                  type="text"
                                  value={draftAtegKpi.nome}
                                  onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, nome: e.target.value })}
                                  className="w-full px-2 py-1 text-xs rounded border border-slate-300 bg-white"
                                />
                              ) : (
                                kpi.nome
                              )}
                            </td>
                            <td className="p-2.5 sm:p-3 text-slate-600 font-mono text-[11px]">
                              {isRowEditing ? (
                                <input
                                  type="text"
                                  value={draftAtegKpi.unidadeMedida}
                                  onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, unidadeMedida: e.target.value })}
                                  className="w-24 px-1.5 py-1 text-xs rounded border border-slate-300 bg-white"
                                />
                              ) : (
                                kpi.unidadeMedida
                              )}
                            </td>
                            <td className="p-2.5 sm:p-3 text-center font-mono font-semibold text-slate-700 bg-slate-50/40">
                              {isRowEditing ? (
                                <input
                                  type="text"
                                  value={draftAtegKpi.linhaBase2026}
                                  onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, linhaBase2026: e.target.value })}
                                  className="w-24 text-center px-1.5 py-1 text-xs rounded border border-slate-300 bg-white"
                                />
                              ) : (
                                kpi.linhaBase2026
                              )}
                            </td>
                            <td className="p-2.5 sm:p-3 text-center font-mono text-slate-700 bg-slate-50/30">
                              {isRowEditing ? (
                                <input
                                  type="text"
                                  value={draftAtegKpi.exec2025 || ''}
                                  onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, exec2025: e.target.value })}
                                  placeholder="-"
                                  className="w-16 text-center px-1.5 py-1 text-xs rounded border border-slate-300 bg-white"
                                />
                              ) : (
                                kpi.exec2025 || '—'
                              )}
                            </td>
                            <td className="p-2.5 sm:p-3 text-center font-mono text-slate-700 bg-slate-50/30">
                              {isRowEditing ? (
                                <input
                                  type="text"
                                  value={draftAtegKpi.exec2026 || ''}
                                  onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, exec2026: e.target.value })}
                                  placeholder="-"
                                  className="w-16 text-center px-1.5 py-1 text-xs rounded border border-slate-300 bg-white"
                                />
                              ) : (
                                kpi.exec2026 || '—'
                              )}
                            </td>
                            {(
                              [
                                ['meta2027', 'exec2027'],
                                ['meta2028', 'exec2028'],
                                ['meta2029', 'exec2029'],
                                ['meta2030', 'exec2030']
                              ] as const
                            ).map(([metaField, execField], idx) => (
                              <td
                                key={metaField}
                                className={`p-2.5 sm:p-3 text-center font-mono ${
                                  idx === 3
                                    ? 'font-black text-emerald-900 bg-emerald-50/60'
                                    : 'font-bold text-[#006837]'
                                }`}
                              >
                                {isRowEditing ? (
                                  <div className="space-y-1">
                                    <input
                                      type="text"
                                      value={draftAtegKpi[metaField]}
                                      onChange={(e) =>
                                        setDraftAtegKpi({ ...draftAtegKpi, [metaField]: e.target.value })
                                      }
                                      placeholder="Prev."
                                      className="w-16 text-center px-1 py-0.5 text-[11px] rounded border border-slate-300 bg-white"
                                    />
                                    <input
                                      type="text"
                                      value={draftAtegKpi[execField] || ''}
                                      onChange={(e) =>
                                        setDraftAtegKpi({ ...draftAtegKpi, [execField]: e.target.value })
                                      }
                                      placeholder="Exec."
                                      className="w-16 text-center px-1 py-0.5 text-[10px] rounded border border-teal-300 bg-teal-50/50 text-teal-800"
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <div>{kpi[metaField]}</div>
                                    {kpi[execField] && (
                                      <div className="text-[10px] font-semibold text-teal-700 mt-0.5">
                                        Exec: {kpi[execField]}
                                      </div>
                                    )}
                                  </>
                                )}
                              </td>
                            ))}
                            <td className="p-2.5 sm:p-3 text-slate-600 text-[11px]">
                              {isRowEditing ? (
                                <input
                                  type="text"
                                  value={draftAtegKpi.fonteVerificacao}
                                  onChange={(e) =>
                                    setDraftAtegKpi({ ...draftAtegKpi, fonteVerificacao: e.target.value })
                                  }
                                  className="w-full px-1.5 py-1 text-xs rounded border border-slate-300 bg-white"
                                />
                              ) : (
                                kpi.fonteVerificacao
                              )}
                            </td>
                            <td className="p-2.5 sm:p-3 text-right whitespace-nowrap">
                              {isRowEditing ? (
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={handleSaveAtegKpi}
                                    className="p-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white cursor-pointer"
                                    title="Salvar indicador"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingAtegKpiId(null);
                                      setDraftAtegKpi(null);
                                    }}
                                    className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                                    title="Cancelar"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditAtegKpi(kpi)}
                                    className="p-1.5 text-slate-500 hover:text-[#006837] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                                    title="Editar indicador"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAtegKpi(kpi.id)}
                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                    title="Excluir indicador"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      {isAddingAtegKpi && draftAtegKpi && (
                        <tr className="bg-emerald-50/70">
                          <td className="p-2.5 sm:p-3 text-center">
                            <input
                              type="text"
                              value={draftAtegKpi.codigo}
                              onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, codigo: e.target.value })}
                              className="w-12 text-center px-1.5 py-1 text-xs rounded border border-emerald-300 bg-white"
                            />
                          </td>
                          <td className="p-2.5 sm:p-3">
                            <input
                              type="text"
                              value={draftAtegKpi.nome}
                              onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, nome: e.target.value })}
                              placeholder="Nome do indicador"
                              className="w-full px-2 py-1 text-xs rounded border border-emerald-400 bg-white"
                              autoFocus
                            />
                          </td>
                          <td className="p-2.5 sm:p-3">
                            <input
                              type="text"
                              value={draftAtegKpi.unidadeMedida}
                              onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, unidadeMedida: e.target.value })}
                              className="w-24 px-1.5 py-1 text-xs rounded border border-emerald-300 bg-white"
                            />
                          </td>
                          <td className="p-2.5 sm:p-3 text-center">
                            <input
                              type="text"
                              value={draftAtegKpi.linhaBase2026}
                              onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, linhaBase2026: e.target.value })}
                              placeholder="Base 2026"
                              className="w-24 text-center px-1.5 py-1 text-xs rounded border border-emerald-300 bg-white"
                            />
                          </td>
                          <td className="p-2.5 sm:p-3 text-center">
                            <input
                              type="text"
                              value={draftAtegKpi.exec2025 || ''}
                              onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, exec2025: e.target.value })}
                              placeholder="2025"
                              className="w-16 text-center px-1.5 py-1 text-xs rounded border border-emerald-300 bg-white"
                            />
                          </td>
                          <td className="p-2.5 sm:p-3 text-center">
                            <input
                              type="text"
                              value={draftAtegKpi.exec2026 || ''}
                              onChange={(e) => setDraftAtegKpi({ ...draftAtegKpi, exec2026: e.target.value })}
                              placeholder="2026"
                              className="w-16 text-center px-1.5 py-1 text-xs rounded border border-emerald-300 bg-white"
                            />
                          </td>
                          {(
                            [
                              ['meta2027', 'exec2027'],
                              ['meta2028', 'exec2028'],
                              ['meta2029', 'exec2029'],
                              ['meta2030', 'exec2030']
                            ] as const
                          ).map(([metaField, execField]) => (
                            <td key={metaField} className="p-2.5 sm:p-3 text-center">
                              <div className="space-y-1">
                                <input
                                  type="text"
                                  value={draftAtegKpi[metaField]}
                                  onChange={(e) =>
                                    setDraftAtegKpi({ ...draftAtegKpi, [metaField]: e.target.value })
                                  }
                                  placeholder="Prev."
                                  className="w-16 text-center px-1 py-0.5 text-[11px] rounded border border-emerald-300 bg-white"
                                />
                                <input
                                  type="text"
                                  value={draftAtegKpi[execField] || ''}
                                  onChange={(e) =>
                                    setDraftAtegKpi({ ...draftAtegKpi, [execField]: e.target.value })
                                  }
                                  placeholder="Exec."
                                  className="w-16 text-center px-1 py-0.5 text-[10px] rounded border border-teal-300 bg-white"
                                />
                              </div>
                            </td>
                          ))}
                          <td className="p-2.5 sm:p-3">
                            <input
                              type="text"
                              value={draftAtegKpi.fonteVerificacao}
                              onChange={(e) =>
                                setDraftAtegKpi({ ...draftAtegKpi, fonteVerificacao: e.target.value })
                              }
                              placeholder="Fonte"
                              className="w-full px-1.5 py-1 text-xs rounded border border-emerald-300 bg-white"
                            />
                          </td>
                          <td className="p-2.5 sm:p-3 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                onClick={handleSaveAtegKpi}
                                className="p-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white cursor-pointer"
                                title="Salvar indicador"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsAddingAtegKpi(false);
                                  setDraftAtegKpi(null);
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
              )}
            </div>
          )}

          {viewTab === 'estadual' ? (
            <div className="space-y-5">
              {/* TABELA DE METAS ANUAIS (PREVISTA x EXECUTADA 2027-2030) POR MUNICÍPIO OU ESTADUAL */}
              {mode === 'modal' && (
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
              )}

              {/* SENAR EM NÚMEROS (INTEGRADO DO MAPA POR MUNICÍPIO / CONSOLIDADO ESTADUAL) */}
              {(() => {
                const targetMunicipio =
                  consolidadoScope === 'ESTADUAL'
                    ? null
                    : MUNICIPIOS_RONDONIA.find((m) => m.id === consolidadoScope) || null;
                const panelData = getPanelData(consolidadoScope, selectedAnoConsolidado);
                const scopeTitle = targetMunicipio
                  ? `${targetMunicipio.nome} — Senar em Números (${selectedAnoConsolidado})`
                  : `Consolidado Estadual — Senar em Números (${selectedAnoConsolidado})`;
                const regiaoBadge = targetMunicipio ? targetMunicipio.regiao : 'Estado de Rondônia · 52 Municípios';

                return (
                  <div
                    id="senar-numeros-consolidado-estadual"
                    ref={resumoEstadualRef}
                    className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4 scroll-mt-4"
                  >
                    <div className="flex flex-col gap-3 pb-3.5 border-b border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-[#006837]">
                              {regiaoBadge}
                            </span>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              Ano {selectedAnoConsolidado}
                            </span>
                            {panelData ? (
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
                            {scopeTitle}
                          </h5>
                        </div>

                        {!isEditing && (
                          <div className="flex flex-wrap items-center gap-2">
                            {panelData ? (
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
                                  onClick={() => handleDeletePanelData(consolidadoScope, selectedAnoConsolidado)}
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

                      {/* Seletor Anual (2025 a 2030) */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          Selecionar Ano ({targetMunicipio ? targetMunicipio.nome : 'Consolidado Estadual'}):
                        </span>
                        <div
                          className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200"
                          role="group"
                          aria-label="Seleção anual do Senar em Números (2025 a 2030)"
                        >
                          {ANOS_CONSOLIDADO.map((ano) => {
                            const isActive = ano === selectedAnoConsolidado;
                            const hasYearRecord = Boolean(getPanelData(consolidadoScope, ano));
                            return (
                              <button
                                key={ano}
                                type="button"
                                onClick={() => {
                                  setSelectedAnoConsolidado(ano);
                                  setIsEditing(false);
                                  setDraftData(null);
                                }}
                                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer inline-flex items-center gap-1 ${
                                  isActive
                                    ? 'bg-[#006837] text-white shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                                }`}
                              >
                                <span>{ano}</span>
                                {hasYearRecord && !isActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {isEditing ? (
                      renderEditForm()
                    ) : panelData ? (
                      renderSenarCards(panelData)
                    ) : (
                      <div className="py-10 px-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 text-center space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#006837] flex items-center justify-center mx-auto">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <h6 className="text-sm font-bold text-slate-900">
                            Nenhum dado de “Senar em números” cadastrado para {targetMunicipio ? targetMunicipio.nome : 'Consolidado Estadual'} ({selectedAnoConsolidado})
                          </h6>
                          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                            Clique abaixo para incluir os números de ATeG, Formação Profissional, Rede e-Tec e Saúde e Promoção Social.
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
                );
              })()}
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
                <div className="flex flex-col gap-3 pb-3.5 border-b border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-[#006837]">
                          {selectedMunicipio.regiao}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          Ano {selectedAnoMunicipio}
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
                        {selectedMunicipio.nome} — Senar em Números ({selectedAnoMunicipio})
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
                              onClick={() => handleDeletePanelData(selectedMunicipio.id, selectedAnoMunicipio)}
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

                  {/* Seletor Anual (2025 a 2030) para os dados do Município */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      Selecionar Ano ({selectedMunicipio.nome}):
                    </span>
                    <div
                      className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200"
                      role="group"
                      aria-label="Seleção anual dos dados do município (2025 a 2030)"
                    >
                      {ANOS_CONSOLIDADO.map((ano) => {
                        const isActive = ano === selectedAnoMunicipio;
                        const hasYearRecord = Boolean((municipiosPorAno[ano] || {})[selectedMunicipio.id]);
                        return (
                          <button
                            key={ano}
                            type="button"
                            onClick={() => {
                              setSelectedAnoMunicipio(ano);
                              setIsEditing(false);
                              setDraftData(null);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer inline-flex items-center gap-1 ${
                              isActive
                                ? 'bg-[#006837] text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                            }`}
                          >
                            <span>{ano}</span>
                            {hasYearRecord && !isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
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

      {mode === 'modal' && onClose && (
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
      )}
    </>
  );
};

const DEFAULT_FAIXA_HEADER = {
  kicker: 'Impacto Institucional Comprovado',
  titulo: 'Indicadores de Transformação no Agro de Rondônia'
};

function loadFaixaHeaderFromStorage() {
  try {
    const saved = localStorage.getItem('senar_faixa_metricas_v4');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return {
          kicker: parsed.kicker || DEFAULT_FAIXA_HEADER.kicker,
          titulo: parsed.titulo || DEFAULT_FAIXA_HEADER.titulo
        };
      }
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_FAIXA_HEADER;
}

export const MapaRondoniaSection: React.FC<MapaRondoniaSectionProps> = ({
  fichas,
  onChangeFichas
}) => {
  const [faixaHeader, setFaixaHeader] = useState(loadFaixaHeaderFromStorage);

  useEffect(() => {
    const handleSync = () => {
      setFaixaHeader(loadFaixaHeaderFromStorage());
    };
    window.addEventListener('senar_faixa_metricas_sync_v1', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('senar_faixa_metricas_sync_v1', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  return (
    <section
      id="mapa-rondonia-numeros"
      className="bg-slate-50 border-t border-slate-200/80 scroll-mt-16"
    >
      {/* Faixa verde destacando o início da Section */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#004d26] to-[#006837] text-white py-5 border-b border-emerald-800 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/20 flex items-center justify-center text-emerald-300">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300 font-bold block">
                {faixaHeader.kicker}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {faixaHeader.titulo}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <MapaRondoniaContent
          mode="section"
          isActive={true}
          fichas={fichas}
          onChangeFichas={onChangeFichas}
        />
      </div>
    </section>
  );
};

export const MapaRondoniaModal: React.FC<MapaRondoniaModalProps> = ({
  isOpen,
  onClose,
  initialRequest,
  fichas,
  onChangeFichas
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-7xl bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[93vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <MapaRondoniaContent
          mode="modal"
          isActive={isOpen}
          onClose={onClose}
          initialRequest={initialRequest}
          fichas={fichas}
          onChangeFichas={onChangeFichas}
        />
      </div>
    </div>
  );
};
