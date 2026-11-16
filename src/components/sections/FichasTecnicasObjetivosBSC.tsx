import React, { useState, useEffect, useRef } from 'react';
import { 
  FichaTecnicaObjetivo, 
  FichaTemaObjetivo,
  IniciativaEstrategicaFicha, 
  IndicadorMetaFicha, 
  CronogramaOrcamentoFicha, 
  RiscoMitigadoFicha, 
  BlocoNotaFicha,
  PerspectivaBSCType,
  UsuarioAutenticado
} from '../../types/strategic';
import { FICHAS_TECNICAS_INICIAIS } from '../../data/fichasTecnicasData';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  Calendar, 
  DollarSign, 
  Users, 
  Building2, 
  ChevronRight, 
  Sparkles, 
  X,
  ExternalLink,
  Layers,
  ArrowRight,
  ArrowUp,
  TrendingUp,
  Download
} from 'lucide-react';

interface FichasTecnicasProps {
  usuarioAtivo: UsuarioAutenticado | null;
  fichasProp?: FichaTecnicaObjetivo[];
  onChangeFichas?: React.Dispatch<React.SetStateAction<FichaTecnicaObjetivo[]>>;
}

const STORAGE_KEY = 'senar_fichas_tecnicas_objetivos_v3';

export const FichasTecnicasObjetivosBSC: React.FC<FichasTecnicasProps> = ({
  usuarioAtivo,
  fichasProp,
  onChangeFichas
}) => {
  // Load from localStorage or fallback to official initial data when uncontrolled
  const [internalFichas, setInternalFichas] = useState<FichaTecnicaObjetivo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((f: FichaTecnicaObjetivo) => {
            if (f.id === 'ficha-oe-02-gestao' && (!f.temas || f.temas.length === 0)) {
              const official = FICHAS_TECNICAS_INICIAIS.find(o => o.id === 'ficha-oe-02-gestao');
              return official || f;
            }
            return f;
          });
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar fichas salvas, usando dados oficiais', e);
    }
    return FICHAS_TECNICAS_INICIAIS;
  });

  const fichas = fichasProp ?? internalFichas;
  const setFichas = onChangeFichas ?? setInternalFichas;

  const [selectedPerspectiva, setSelectedPerspectiva] = useState<string>('TODAS');
  const [selectedFichaId, setSelectedFichaId] = useState<string>(() => {
    return (
      fichas.find(f => f.id === 'ficha-oe-01-detec-fpr')?.id ||
      fichas.find(f => f.codigoObjetivo === '04')?.id ||
      fichas[0]?.id ||
      ''
    );
  });
  const [selectedTemaId, setSelectedTemaId] = useState<string>('tema-05-governanca');

  const sectionTopRef = useRef<HTMLDivElement>(null);
  const fichaDocumentRef = useRef<HTMLDivElement>(null);

  // Modal States
  const [isEditHeaderOpen, setIsEditHeaderOpen] = useState(false);
  const [isEditIniciativaOpen, setIsEditIniciativaOpen] = useState(false);
  const [editingIniciativa, setEditingIniciativa] = useState<IniciativaEstrategicaFicha | null>(null);
  
  const [isEditKpiOpen, setIsEditKpiOpen] = useState(false);
  const [editingKpi, setEditingKpi] = useState<IndicadorMetaFicha | null>(null);

  const [isEditCronogramaOpen, setIsEditCronogramaOpen] = useState(false);
  const [editingCronograma, setEditingCronograma] = useState<CronogramaOrcamentoFicha | null>(null);

  const [isEditRiscoOpen, setIsEditRiscoOpen] = useState(false);
  const [editingRisco, setEditingRisco] = useState<RiscoMitigadoFicha | null>(null);

  const [isEditGovernancaOpen, setIsEditGovernancaOpen] = useState(false);
  const [isEditDiretrizesOpen, setIsEditDiretrizesOpen] = useState(false);
  const [isEditNotasOpen, setIsEditNotasOpen] = useState(false);
  const [editingNotaIdx, setEditingNotaIdx] = useState<number | null>(null);
  const [isNovaFichaModalOpen, setIsNovaFichaModalOpen] = useState(false);

  // Auto-save to localStorage only when uncontrolled (parent handles persistence when controlled)
  useEffect(() => {
    if (fichasProp !== undefined) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(internalFichas));
    } catch (e) {
      console.error('Erro ao salvar fichas no localStorage', e);
    }
  }, [internalFichas, fichasProp]);

  // Current active Ficha
  const activeFicha = fichas.find(f => f.id === selectedFichaId) || fichas[0];

  // Filtering
  const filteredFichas = fichas.filter(f => {
    if (selectedPerspectiva === 'TODAS') return true;
    return f.perspectivaBsc === selectedPerspectiva;
  });

  const handleSelectPerspectiva = (persp: string) => {
    setSelectedPerspectiva(persp);
    if (persp !== 'TODAS') {
      const matching = fichas.filter(f => f.perspectivaBsc === persp);
      if (matching.length > 0 && !matching.some(m => m.id === selectedFichaId)) {
        const target = matching[0];
        setSelectedFichaId(target.id);
        if (target.temas && target.temas.length > 0) {
          setSelectedTemaId(target.temas[0].id);
        }
      }
    }
  };

  const handleSelectFichaAndScroll = (fichaId: string) => {
    setSelectedFichaId(fichaId);
    const target = fichas.find(f => f.id === fichaId);
    if (target?.temas && target.temas.length > 0) {
      setSelectedTemaId(target.temas[0].id);
    }
    requestAnimationFrame(() => {
      fichaDocumentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const scrollToPlanosBsc = () => {
    sectionTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Safe check if activeFicha exists
  if (!activeFicha) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-600">Nenhuma ficha técnica cadastrada.</p>
        <button
          onClick={() => {
            setFichas(FICHAS_TECNICAS_INICIAIS);
            setSelectedFichaId(FICHAS_TECNICAS_INICIAIS[0].id);
          }}
          className="mt-4 px-4 py-2 bg-[#006837] text-white rounded-lg text-sm font-semibold cursor-pointer"
        >
          Restaurar Dados Oficiais do SENAR-RO
        </button>
      </div>
    );
  }

  // Temas support (Objetivo 02 - Excelência na Gestão)
  const temasList = activeFicha.temas && activeFicha.temas.length > 0 ? activeFicha.temas : null;
  const isConsolidadoTemas = Boolean(temasList && selectedTemaId === 'CONSOLIDADO');
  const activeTema: FichaTemaObjetivo | null =
    temasList && !isConsolidadoTemas
      ? temasList.find(t => t.id === selectedTemaId) || temasList[0]
      : null;

  // View data reflects activeTema when viewing a specific Theme, or activeFicha otherwise
  const viewData = activeTema
    ? {
        ...activeFicha,
        unidadeResponsavelLider: activeTema.unidadeResponsavelLider,
        unidadesParceiras: activeTema.unidadesParceiras,
        responsavelPreenchimento: activeTema.responsavelPreenchimento,
        cargoResponsavel: activeTema.cargoResponsavel,
        dataElaboracaoRevisao: activeTema.dataElaboracaoRevisao,
        diretrizesResultados: activeTema.diretrizesResultados,
        solucoesIniciativas: activeTema.solucoesIniciativas,
        indicadoresMetas: activeTema.indicadoresMetas,
        cronogramaOrcamento: activeTema.cronogramaOrcamento,
        notaMetodologicaOrcamento: activeTema.notaMetodologicaOrcamento,
        governanca: activeTema.governanca,
        analiseRiscos: activeTema.analiseRiscos,
        fundamentacaoTecnica: activeTema.fundamentacaoTecnica
      }
    : activeFicha;

  // Helpers for annual 2029 and 2030 budgets (backward-compatible with orcamento2029_30)
  const getOrc2029 = (curr: CronogramaOrcamentoFicha) =>
    curr.orcamento2029 !== undefined
      ? Number(curr.orcamento2029) || 0
      : (Number(curr.orcamento2029_30) || 0) / 2;

  const getOrc2030 = (curr: CronogramaOrcamentoFicha) =>
    curr.orcamento2030 !== undefined
      ? Number(curr.orcamento2030) || 0
      : (Number(curr.orcamento2029_30) || 0) / 2;

  // Calculate totals for Cronograma & Orçamento
  const totalOrcamento2027 = viewData.cronogramaOrcamento.reduce((acc, curr) => acc + (Number(curr.orcamento2027) || 0), 0);
  const totalOrcamento2028 = viewData.cronogramaOrcamento.reduce((acc, curr) => acc + (Number(curr.orcamento2028) || 0), 0);
  const totalOrcamento2029 = viewData.cronogramaOrcamento.reduce((acc, curr) => acc + getOrc2029(curr), 0);
  const totalOrcamento2030 = viewData.cronogramaOrcamento.reduce((acc, curr) => acc + getOrc2030(curr), 0);
  const totalGeralOrcamento = viewData.cronogramaOrcamento.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
  const hasTipoPlanoColumn = viewData.cronogramaOrcamento.some(c => Boolean(c.tipoPlano));
  const hasValorTextoConvenios = viewData.cronogramaOrcamento.some(c => Boolean(c.valorTextoTotal));

  // Format currency (supports decimals for DETEC plans while keeping round numbers clean)
  const formatMoney = (val: number) => {
    const hasCents = Math.abs(val - Math.round(val)) > 0.001;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: 2
    }).format(val);
  };

  const reaggregateFichaFromTemas = (
    f: FichaTecnicaObjetivo,
    updatedTemas: FichaTemaObjetivo[]
  ): FichaTecnicaObjetivo => ({
    ...f,
    temas: updatedTemas,
    diretrizesResultados: updatedTemas.flatMap(t =>
      t.diretrizesResultados.map(d => `[Tema ${t.codigoTema} — ${t.nomeTema}] ${d}`)
    ),
    solucoesIniciativas: updatedTemas.flatMap(t => t.solucoesIniciativas),
    indicadoresMetas: updatedTemas.flatMap(t => t.indicadoresMetas),
    cronogramaOrcamento: updatedTemas.flatMap(t => t.cronogramaOrcamento),
    analiseRiscos: updatedTemas.flatMap(t =>
      t.analiseRiscos.map(r => ({
        ...r,
        codigo: r.codigo || `Tema ${t.codigoTema}`
      }))
    )
  });

  // Helper to update current active ficha
  const updateActiveFicha = (updater: (prev: FichaTecnicaObjetivo) => FichaTecnicaObjetivo) => {
    setFichas(prev => prev.map(f => f.id === activeFicha.id ? updater(f) : f));
  };

  // Helper to update activeTema inside activeFicha (or activeFicha directly if no temas)
  const updateActiveScope = (
    temaUpdater: (prevTema: FichaTemaObjetivo) => FichaTemaObjetivo,
    fichaUpdater: (prevFicha: FichaTecnicaObjetivo) => FichaTecnicaObjetivo,
    targetItemId?: string
  ) => {
    updateActiveFicha(f => {
      if (f.temas && f.temas.length > 0) {
        const targetTemaId =
          activeTema?.id ||
          (targetItemId
            ? f.temas.find(
                t =>
                  t.solucoesIniciativas.some(i => i.id === targetItemId) ||
                  t.indicadoresMetas.some(k => k.id === targetItemId) ||
                  t.cronogramaOrcamento.some(c => c.id === targetItemId) ||
                  t.analiseRiscos.some(r => r.id === targetItemId)
              )?.id
            : undefined) ||
          f.temas[0].id;
        const updatedTemas = f.temas.map(t => (t.id === targetTemaId ? temaUpdater(t) : t));
        return reaggregateFichaFromTemas(f, updatedTemas);
      }
      return fichaUpdater(f);
    });
  };

  // Handlers for Iniciativas
  const handleSaveIniciativa = (iniciativa: IniciativaEstrategicaFicha) => {
    const upsert = (list: IniciativaEstrategicaFicha[]) =>
      list.some(i => i.id === iniciativa.id)
        ? list.map(i => (i.id === iniciativa.id ? iniciativa : i))
        : [...list, iniciativa];

    updateActiveScope(
      t => ({ ...t, solucoesIniciativas: upsert(t.solucoesIniciativas) }),
      f => ({ ...f, solucoesIniciativas: upsert(f.solucoesIniciativas) }),
      iniciativa.id
    );
    setIsEditIniciativaOpen(false);
    setEditingIniciativa(null);
  };

  const handleDeleteIniciativa = (id: string) => {
    if (confirm('Deseja realmente excluir esta Solução / Iniciativa Estratégica?')) {
      updateActiveScope(
        t => ({ ...t, solucoesIniciativas: t.solucoesIniciativas.filter(i => i.id !== id) }),
        f => ({ ...f, solucoesIniciativas: f.solucoesIniciativas.filter(i => i.id !== id) }),
        id
      );
    }
  };

  // Handlers for KPIs
  const handleSaveKpi = (kpi: IndicadorMetaFicha) => {
    const upsert = (list: IndicadorMetaFicha[]) =>
      list.some(k => k.id === kpi.id)
        ? list.map(k => (k.id === kpi.id ? kpi : k))
        : [...list, kpi];

    updateActiveScope(
      t => ({ ...t, indicadoresMetas: upsert(t.indicadoresMetas) }),
      f => ({ ...f, indicadoresMetas: upsert(f.indicadoresMetas) }),
      kpi.id
    );
    setIsEditKpiOpen(false);
    setEditingKpi(null);
  };

  const handleDeleteKpi = (id: string) => {
    if (confirm('Deseja excluir este Indicador de Desempenho e Metas?')) {
      updateActiveScope(
        t => ({ ...t, indicadoresMetas: t.indicadoresMetas.filter(k => k.id !== id) }),
        f => ({ ...f, indicadoresMetas: f.indicadoresMetas.filter(k => k.id !== id) }),
        id
      );
    }
  };

  // Handlers for Cronograma
  const handleSaveCronograma = (cron: CronogramaOrcamentoFicha) => {
    const v2027 = Number(cron.orcamento2027) || 0;
    const v2028 = Number(cron.orcamento2028) || 0;
    const v2029 = getOrc2029(cron);
    const v2030 = getOrc2030(cron);
    const totalCalc = Number((v2027 + v2028 + v2029 + v2030).toFixed(2));
    const cronComTotal: CronogramaOrcamentoFicha = {
      ...cron,
      orcamento2027: v2027,
      orcamento2028: v2028,
      orcamento2029: v2029,
      orcamento2030: v2030,
      orcamento2029_30: v2029 + v2030,
      total: totalCalc
    };

    const upsert = (list: CronogramaOrcamentoFicha[]) =>
      list.some(c => c.id === cron.id)
        ? list.map(c => (c.id === cron.id ? cronComTotal : c))
        : [...list, cronComTotal];

    updateActiveScope(
      t => ({ ...t, cronogramaOrcamento: upsert(t.cronogramaOrcamento) }),
      f => ({ ...f, cronogramaOrcamento: upsert(f.cronogramaOrcamento) }),
      cron.id
    );
    setIsEditCronogramaOpen(false);
    setEditingCronograma(null);
  };

  const handleDeleteCronograma = (id: string) => {
    if (confirm('Deseja excluir esta linha de cronograma e orçamento?')) {
      updateActiveScope(
        t => ({ ...t, cronogramaOrcamento: t.cronogramaOrcamento.filter(c => c.id !== id) }),
        f => ({ ...f, cronogramaOrcamento: f.cronogramaOrcamento.filter(c => c.id !== id) }),
        id
      );
    }
  };

  // Handlers for Riscos
  const handleSaveRisco = (risco: RiscoMitigadoFicha) => {
    const upsert = (list: RiscoMitigadoFicha[]) =>
      list.some(r => r.id === risco.id)
        ? list.map(r => (r.id === risco.id ? risco : r))
        : [...list, risco];

    updateActiveScope(
      t => ({ ...t, analiseRiscos: upsert(t.analiseRiscos) }),
      f => ({ ...f, analiseRiscos: upsert(f.analiseRiscos) }),
      risco.id
    );
    setIsEditRiscoOpen(false);
    setEditingRisco(null);
  };

  const handleDeleteRisco = (id: string) => {
    if (confirm('Deseja excluir esta análise de risco e mitigação?')) {
      updateActiveScope(
        t => ({ ...t, analiseRiscos: t.analiseRiscos.filter(r => r.id !== id) }),
        f => ({ ...f, analiseRiscos: f.analiseRiscos.filter(r => r.id !== id) }),
        id
      );
    }
  };

  const handleDeleteFicha = (id: string) => {
    if (fichas.length <= 1) return;
    if (confirm(`Deseja excluir a Ficha Técnica "${activeFicha.codigoObjetivo} ${activeFicha.nomeObjetivo}"?`)) {
      const remaining = fichas.filter(f => f.id !== id);
      setFichas(remaining);
      setSelectedFichaId(remaining[0]?.id || '');
    }
  };

  const handleDeleteNota = (idx: number) => {
    if (confirm('Deseja excluir este bloco de premissas/notas complementares?')) {
      updateActiveFicha(f => ({
        ...f,
        premissasNotas: (f.premissasNotas || []).filter((_, i) => i !== idx)
      }));
    }
  };

  // Reset to original SENAR data
  const handleResetToDefault = () => {
    if (confirm('Deseja restaurar todas as Fichas Técnicas para os dados originais oficiais do Planejamento 2027–2030 do SENAR-AR/RO? As alterações salvas serão substituídas.')) {
      setFichas(FICHAS_TECNICAS_INICIAIS);
      setSelectedFichaId(FICHAS_TECNICAS_INICIAIS.find(f => f.id === 'ficha-oe-01-detec-fpr')?.id || FICHAS_TECNICAS_INICIAIS[0].id);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Print view
  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="fichas-tecnicas-objetivos" ref={sectionTopRef} className="w-full scroll-mt-20">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Planejamento Estratégico 2027–2030</span>
            <span aria-hidden="true">·</span>
            <span>Balanced Scorecard (BSC)</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#006837] font-bold">Fichas Técnicas & Planos de Ação</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
            Planos de Ação por Objetivo Estratégico do BSC
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
            Estrutura executiva oficial e gerenciável para cada Objetivo Estratégico nas perspectivas do Balanced Scorecard:
            Diretrizes do Mapa, Cadastro de Soluções/Iniciativas, Indicadores & Metas Anuais (2027–2030), Cronograma Físico-Financeiro, Governança de Reporte e Análise de Riscos Mitigados.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsNovaFichaModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
            title="Cadastrar nova Ficha Técnica de Objetivo Estratégico"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Objetivo Estratégico</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
            title="Imprimir / Exportar Ficha Técnica Atual"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Imprimir Ficha</span>
          </button>

          <button
            onClick={handleResetToDefault}
            className="p-2 text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Restaurar dados originais oficiais do SENAR-RO"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* BSC PERSPECTIVE SELECTOR BAR */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-400 flex items-center gap-1 mr-1 px-1">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Perspectiva BSC:</span>
          </span>
          <button
            onClick={() => handleSelectPerspectiva('TODAS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              selectedPerspectiva === 'TODAS'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Todas as Perspectivas ({fichas.length})
          </button>
          
          {/* 1. Perspectiva Sociedade */}
          <button
            onClick={() => handleSelectPerspectiva('SOCIEDADE')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedPerspectiva === 'SOCIEDADE'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-teal-800 hover:bg-teal-50 hover:text-teal-950'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span>Sociedade</span>
            <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-white/20">
              {fichas.filter(f => f.perspectivaBsc === 'SOCIEDADE').length}
            </span>
          </button>

          {/* 2. Perspectiva Clientes */}
          <button
            onClick={() => handleSelectPerspectiva('CLIENTES')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedPerspectiva === 'CLIENTES'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'text-sky-800 hover:bg-sky-50 hover:text-sky-950'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Clientes</span>
            <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-white/20">
              {fichas.filter(f => f.perspectivaBsc === 'CLIENTES').length}
            </span>
          </button>

          {/* 3. Perspectiva Processos Internos */}
          <button
            onClick={() => handleSelectPerspectiva('PROCESSOS_INTERNOS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedPerspectiva === 'PROCESSOS_INTERNOS'
                ? 'bg-[#006837] text-white shadow-xs'
                : 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-950'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Processos Internos</span>
            <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-white/20">
              {fichas.filter(f => f.perspectivaBsc === 'PROCESSOS_INTERNOS').length}
            </span>
          </button>

          {/* 4. Perspectiva Aprendizado e Crescimento */}
          <button
            onClick={() => handleSelectPerspectiva('APRENDIZADO_CRESCIMENTO')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedPerspectiva === 'APRENDIZADO_CRESCIMENTO'
                ? 'bg-indigo-700 text-white shadow-xs'
                : 'text-indigo-800 hover:bg-indigo-50 hover:text-indigo-950'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span>Aprendizado e Crescimento</span>
            <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-white/20">
              {fichas.filter(f => f.perspectivaBsc === 'APRENDIZADO_CRESCIMENTO').length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 px-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Estrutura Editável & Gerenciável</span>
        </div>
      </div>

      {/* OBJECTIVES SWITCHER CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
        {filteredFichas.map(ficha => {
          const isSelected = ficha.id === activeFicha.id;
          return (
            <button
              key={ficha.id}
              onClick={() => handleSelectFichaAndScroll(ficha.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#006837] ring-2 ring-[#006837]/25 shadow-md -translate-y-1'
                  : 'bg-white/80 border-slate-200 hover:border-emerald-300 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#006837] text-white font-mono font-bold text-xs flex items-center justify-center">
                      {ficha.codigoObjetivo}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      {ficha.perspectivaBsc.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {ficha.temas && ficha.temas.length > 0
                      ? `${ficha.temas.length} Temas · ${ficha.solucoesIniciativas.length} Soluções`
                      : `${ficha.solucoesIniciativas.length} Soluções`}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                  {ficha.nomeObjetivo}
                </h4>

                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {ficha.unidadeResponsavelLider}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-600 font-medium">
                  {ficha.indicadoresMetas.length} Indicadores
                </span>
                <span className="text-[#006837] font-bold inline-flex items-center gap-1">
                  Ver Ficha <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL EXECUTIVE DOCUMENT VIEW (MIRRORING ATTACHED PDF STRUCTURE) */}
      {/* ========================================================================= */}
      <div
        ref={fichaDocumentRef}
        className="mt-8 scroll-mt-20 bg-white rounded-3xl border border-slate-300 shadow-xl overflow-hidden print:border-none print:shadow-none"
      >
        
        {/* DOCUMENT TOP BAR (INSTITUTIONAL STRIP) */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#004d26] to-[#006837] text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border-b border-emerald-800">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-2xl border border-white/20 shrink-0">
              <img
                src="/assets/aistudio/logo_sistema_branco.png"
                alt="Sistema FAPERON SENAR Rondônia"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                SENAR RONDÔNIA · PLANEJAMENTO ESTRATÉGICO 2027–2030
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">
                FICHA TÉCNICA DO OBJETIVO ESTRATÉGICO
              </h3>
              <p className="text-xs text-emerald-100 font-medium mt-0.5">
                Plano de Ação Tático-Operacional · Ciclo Plurianual 2027–2030
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
            <button
              type="button"
              onClick={scrollToPlanosBsc}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-emerald-400/20 hover:bg-emerald-400/35 text-emerald-50 border border-emerald-300/40 backdrop-blur-xs flex items-center gap-1.5 cursor-pointer transition-all print:hidden"
              title="Retornar ao Plano de Ação por Objetivo Estratégico do BSC"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Voltar ao Plano de Ação BSC</span>
            </button>
            <button
              onClick={() => setIsEditHeaderOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-xs flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Cabeçalho</span>
            </button>
            {fichas.length > 1 && (
              <button
                onClick={() => handleDeleteFicha(activeFicha.id)}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-rose-500/20 hover:bg-rose-500/35 text-rose-100 border border-rose-300/30 backdrop-blur-xs flex items-center gap-1.5 cursor-pointer transition-all"
                title="Excluir esta Ficha Técnica"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Excluir Ficha</span>
              </button>
            )}
          </div>
        </div>

        {/* DOCUMENT HEADER / METADATA TABLE */}
        <div className="p-6 sm:p-8 bg-slate-50/60 border-b border-slate-200">
          
          {/* Objective Title Banner */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-2xl border border-emerald-300 shadow-2xs mb-6">
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-lg bg-[#006837] text-white font-mono text-xs font-black uppercase tracking-wider shadow-xs">
                OBJETIVO ESTRATÉGICO {activeFicha.codigoObjetivo}
              </span>
              {activeTema && (
                <span className="px-3 py-1 rounded-lg bg-emerald-800 text-emerald-50 font-mono text-xs font-bold uppercase tracking-wider shadow-xs">
                  TEMA {activeTema.codigoTema} — {activeTema.nomeTema}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                PERSPECTIVA: {activeFicha.perspectivaBsc.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
              {activeTema
                ? `TEMA ${activeTema.codigoTema} — ${activeTema.nomeTema}`
                : `${activeFicha.codigoObjetivo} ${activeFicha.nomeObjetivo}`}
            </h2>
            <p className="text-base sm:text-lg font-semibold text-emerald-950 mt-2 italic border-l-4 border-[#006837] pl-3.5 leading-snug">
              “{activeFicha.enunciado.replace(/^"|"$/g, '')}”
            </p>
            {activeFicha.desdobramento && (
              <div className="mt-3 pt-3 border-t border-emerald-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-[#006837] font-extrabold uppercase tracking-wide text-[11px] block mb-0.5">
                  Desdobramento Foco da Unidade:
                </strong>
                <span>{activeFicha.desdobramento}</span>
              </div>
            )}
          </div>

          {/* Institutional Identification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
              <span className="font-mono font-bold uppercase text-slate-400 block text-[10px] tracking-wider">
                Unidade Responsável / Líder
              </span>
              <p className="font-bold text-slate-900 text-sm">
                {viewData.unidadeResponsavelLider}
              </p>
              <span className="font-mono font-bold uppercase text-slate-400 block text-[10px] tracking-wider pt-2">
                Unidades Parceiras / Corresponsáveis
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {viewData.unidadesParceiras}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
              <span className="font-mono font-bold uppercase text-slate-400 block text-[10px] tracking-wider">
                Responsável pelo Preenchimento / Cargo
              </span>
              <p className="font-bold text-slate-900 text-sm">
                {viewData.responsavelPreenchimento}
              </p>
              <p className="text-slate-600 font-medium">
                {viewData.cargoResponsavel}
              </p>
              <span className="font-mono font-bold uppercase text-slate-400 block text-[10px] tracking-wider pt-2">
                Data de Elaboração / Revisão
              </span>
              <p className="text-emerald-800 font-mono font-bold">
                {viewData.dataElaboracaoRevisao}
              </p>
            </div>
          </div>
        </div>

        {/* THEME SELECTOR BUTTONS BAR (BELOW DOCUMENT HEADER METADATA DIV) */}
        {temasList && (
          <div className="px-6 sm:px-8 py-4 bg-emerald-50/70 border-b border-emerald-200 space-y-3 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
                <Layers className="w-4 h-4 text-[#006837]" />
                <span>Selecione o Tema da Ficha Técnica ({temasList.length} Temas Oficiais):</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-800 font-semibold">
                {activeTema
                  ? `Visualizando Tema ${activeTema.codigoTema} · ${activeTema.solucoesIniciativas.length} Iniciativas · ${activeTema.indicadoresMetas.length} Indicadores`
                  : `Visão Consolidada · ${activeFicha.solucoesIniciativas.length} Iniciativas · ${activeFicha.indicadoresMetas.length} Indicadores`}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {temasList.map((tema) => {
                const isSelectedTema = activeTema?.id === tema.id;
                return (
                  <button
                    key={tema.id}
                    type="button"
                    onClick={() => setSelectedTemaId(tema.id)}
                    className={`px-3.5 py-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      isSelectedTema
                        ? 'bg-[#006837] text-white border-[#004d26] shadow-md'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                    }`}
                  >
                    <span
                      className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-black ${
                        isSelectedTema
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-100 text-[#006837]'
                      }`}
                    >
                      Tema {tema.codigoTema}
                    </span>
                    <span>{tema.nomeTema}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setSelectedTemaId('CONSOLIDADO')}
                className={`px-3.5 py-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isConsolidadoTemas
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                <span
                  className={`px-1.5 py-0.5 rounded font-mono text-[10px] font-black ${
                    isConsolidadoTemas ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Geral
                </span>
                <span>Visão Consolidada (Todos os Temas)</span>
              </button>
            </div>
          </div>
        )}

        {/* DOCUMENT BODY SECTIONS */}
        <div className="p-6 sm:p-8 space-y-10">

          {/* ========================================================================= */}
          {/* SEÇÃO 1: RESULTADOS / DIRETRIZES DO MAPA ESTRATÉGICO */}
          {/* ========================================================================= */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#006837] text-white font-mono font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                  RESULTADOS / DIRETRIZES DO MAPA ESTRATÉGICO
                </h3>
              </div>
              <button
                onClick={() => setIsEditDiretrizesOpen(true)}
                className="px-3 py-1 text-xs font-semibold text-[#006837] hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Gerenciar Diretrizes</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Conforme estabelecido na arquitetura corporativa do Mapa Estratégico do SENAR-AR/RO para o ciclo 2027–2030,
              as diretrizes e resultados esperados para {activeTema ? `o Tema ${activeTema.codigoTema} (${activeTema.nomeTema})` : `o Objetivo Estratégico ${activeFicha.codigoObjetivo}`} estruturam-se em eixos norteadores permanentes:
            </p>

            <div className="space-y-3">
              {viewData.diretrizesResultados.map((diretriz, idx) => {
                const parts = diretriz.split(':');
                const title = parts[0];
                const content = parts.slice(1).join(':');

                return (
                  <div key={idx} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all text-xs leading-relaxed flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#006837] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-bold block sm:inline">
                        {title}{parts.length > 1 ? ':' : ''}
                      </strong>
                      <span className="text-slate-700"> {content}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SEÇÃO 2: CADASTRO DE SOLUÇÕES / INICIATIVAS ESTRATÉGICAS */}
          {/* ========================================================================= */}
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#006837] text-white font-mono font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                  CADASTRO DE SOLUÇÕES / INICIATIVAS ESTRATÉGICAS
                </h3>
              </div>
              <button
                onClick={() => {
                  const prefix = activeTema ? activeTema.codigoTema : activeFicha.codigoObjetivo;
                  setEditingIniciativa({
                    id: `sol-${Date.now()}`,
                    codigo: `${prefix}.${viewData.solucoesIniciativas.length + 1}`,
                    solucaoIniciativa: '',
                    vinculoResultadoEsperado: '',
                    unidadeResponsavel: viewData.unidadeResponsavelLider,
                    unidadesParceiras: '',
                    detalhamentoTecnico: ''
                  });
                  setIsEditIniciativaOpen(true);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Adicionar Solução / Iniciativa</span>
              </button>
            </div>

            {/* Table of Solutions */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-900 to-[#006837] text-white font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 w-16 text-center">ID</th>
                    <th className="p-3.5 min-w-[240px]">Solução / Iniciativa</th>
                    <th className="p-3.5 min-w-[200px]">Vínculo com Resultado Esperado</th>
                    <th className="p-3.5 min-w-[150px]">Unidade Responsável</th>
                    <th className="p-3.5 min-w-[160px]">Unidades Parceiras</th>
                    <th className="p-3.5 w-24 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  {viewData.solucoesIniciativas.map((iniciativa) => (
                    <tr key={iniciativa.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-center text-[#006837] bg-slate-50/60">
                        {iniciativa.codigo}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        {iniciativa.solucaoIniciativa}
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {iniciativa.vinculoResultadoEsperado}
                      </td>
                      <td className="p-3.5 text-slate-800 font-medium">
                        {iniciativa.unidadeResponsavel}
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {iniciativa.unidadesParceiras}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setEditingIniciativa(iniciativa);
                              setIsEditIniciativaOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-[#006837] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            title="Editar iniciativa"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteIniciativa(iniciativa.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Excluir iniciativa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Technical Breakdown of Solutions */}
            <div className="mt-6 space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Detalhamento Técnico das Soluções Propostas:</span>
              </h4>
              <div className="space-y-3.5 divide-y divide-slate-200 text-xs text-slate-700 leading-relaxed">
                {viewData.solucoesIniciativas.map((sol) => (
                  <div key={sol.id} className="pt-3 first:pt-0">
                    <p>
                      <strong className="text-slate-900 font-bold">
                        Iniciativa {sol.codigo} ({sol.solucaoIniciativa}):
                      </strong>{' '}
                      {sol.detalhamentoTecnico || 'Detalhamento técnico operacional em elaboração pela unidade gestora.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SEÇÃO 3: INDICADORES, LINHA DE BASE E METAS ANUAIS (2027–2030) */}
          {/* ========================================================================= */}
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#006837] text-white font-mono font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                  INDICADORES, LINHA DE BASE E METAS ANUAIS (2027–2030)
                </h3>
              </div>
              <button
                onClick={() => {
                  const prefix = activeTema ? activeTema.codigoTema : activeFicha.codigoObjetivo;
                  setEditingKpi({
                    id: `kpi-${Date.now()}`,
                    codigo: `${prefix}.${viewData.indicadoresMetas.length + 1}`,
                    nome: '',
                    unidadeMedida: 'Percentual (%)',
                    linhaBase2026: '',
                    meta2027: '',
                    meta2028: '',
                    meta2029: '',
                    meta2030: '',
                    fonteVerificacao: ''
                  });
                  setIsEditKpiOpen(true);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Adicionar Indicador / Meta</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-900 to-[#006837] text-white font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 w-16 text-center">ID</th>
                    <th className="p-3.5 min-w-[220px]">Indicador de Desempenho (KPI)</th>
                    <th className="p-3.5 min-w-[100px]">Unidade</th>
                    <th className="p-3.5 min-w-[110px] text-center bg-emerald-950/40">Linha Base (2026)</th>
                    <th className="p-3.5 min-w-[85px] text-center bg-emerald-950/30">Exec. 2025</th>
                    <th className="p-3.5 min-w-[85px] text-center bg-emerald-950/30">Exec. 2026</th>
                    <th className="p-3.5 min-w-[90px] text-center">2027 (Prev / Exec)</th>
                    <th className="p-3.5 min-w-[90px] text-center">2028 (Prev / Exec)</th>
                    <th className="p-3.5 min-w-[90px] text-center">2029 (Prev / Exec)</th>
                    <th className="p-3.5 min-w-[95px] text-center bg-emerald-950/40 font-bold">2030 (Prev / Exec)</th>
                    <th className="p-3.5 min-w-[160px]">Fonte de Verificação</th>
                    <th className="p-3.5 w-24 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  {viewData.indicadoresMetas.map((kpi) => (
                    <tr key={kpi.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-center text-[#006837] bg-slate-50/60">
                        {kpi.codigo}
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        {kpi.nome}
                      </td>
                      <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                        {kpi.unidadeMedida}
                      </td>
                      <td className="p-3.5 text-center font-mono font-semibold text-slate-700 bg-slate-50/40">
                        {kpi.linhaBase2026}
                      </td>
                      <td className="p-3.5 text-center font-mono text-slate-700 bg-slate-50/30">
                        {kpi.exec2025 || '—'}
                      </td>
                      <td className="p-3.5 text-center font-mono text-slate-700 bg-slate-50/30">
                        {kpi.exec2026 || '—'}
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-[#006837]">
                        <div>{kpi.meta2027}</div>
                        {kpi.exec2027 && (
                          <div className="text-[10px] font-semibold text-teal-700 mt-0.5">Exec: {kpi.exec2027}</div>
                        )}
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-[#006837]">
                        <div>{kpi.meta2028}</div>
                        {kpi.exec2028 && (
                          <div className="text-[10px] font-semibold text-teal-700 mt-0.5">Exec: {kpi.exec2028}</div>
                        )}
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-[#006837]">
                        <div>{kpi.meta2029}</div>
                        {kpi.exec2029 && (
                          <div className="text-[10px] font-semibold text-teal-700 mt-0.5">Exec: {kpi.exec2029}</div>
                        )}
                      </td>
                      <td className="p-3.5 text-center font-mono font-black text-emerald-900 bg-emerald-50/60">
                        <div>{kpi.meta2030}</div>
                        {kpi.exec2030 && (
                          <div className="text-[10px] font-semibold text-teal-700 mt-0.5">Exec: {kpi.exec2030}</div>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-600 text-[11px]">
                        {kpi.fonteVerificacao}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setEditingKpi(kpi);
                              setIsEditKpiOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-[#006837] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            title="Editar indicador"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteKpi(kpi.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Excluir indicador"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SEÇÃO 4: CRONOGRAMA DE EXECUÇÃO E ORÇAMENTO PREVISTO (2027–2030) */}
          {/* ========================================================================= */}
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#006837] text-white font-mono font-bold text-xs flex items-center justify-center">
                  4
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                  CRONOGRAMA DE EXECUÇÃO E ORÇAMENTO PREVISTO (2027–2030)
                </h3>
              </div>
              <button
                onClick={() => {
                  const prefix = activeTema ? activeTema.codigoTema : activeFicha.codigoObjetivo;
                  setEditingCronograma({
                    id: `cron-${Date.now()}`,
                    codigo: `${prefix}.${viewData.cronogramaOrcamento.length + 1}`,
                    tipoPlano: '',
                    iniciativaEstrategica: '',
                    ano2027: 'Q1-Q4',
                    ano2028: 'Q1-Q4',
                    ano2029: 'Q1-Q4',
                    ano2030: 'Q1-Q4',
                    orcamento2027: 0,
                    orcamento2028: 0,
                    orcamento2029: 0,
                    orcamento2030: 0,
                    total: 0
                  });
                  setIsEditCronogramaOpen(true);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-center"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Adicionar Linha de Orçamento</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-900 to-[#006837] text-white font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 w-16 text-center">ID</th>
                    {hasTipoPlanoColumn && (
                      <th className="p-3.5 w-24 text-center">Tipo Plano</th>
                    )}
                    <th className="p-3.5 min-w-[200px]">Solução / Iniciativa</th>
                    <th className="p-3.5 text-center min-w-[100px]">Exec. 2027</th>
                    <th className="p-3.5 text-center min-w-[100px]">Exec. 2028</th>
                    <th className="p-3.5 text-center min-w-[100px]">Exec. 2029</th>
                    <th className="p-3.5 text-center min-w-[100px]">Exec. 2030</th>
                    <th className="p-3.5 min-w-[110px] text-right">Valor 2027</th>
                    <th className="p-3.5 min-w-[110px] text-right">Valor 2028</th>
                    <th className="p-3.5 min-w-[110px] text-right">Valor 2029</th>
                    <th className="p-3.5 min-w-[110px] text-right">Valor 2030</th>
                    <th className="p-3.5 min-w-[125px] text-right bg-emerald-950/40 font-bold">Total (R$)</th>
                    <th className="p-3.5 w-20 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  {viewData.cronogramaOrcamento.map((cron) => (
                    <tr key={cron.id} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-center text-[#006837] bg-slate-50/60">
                        {cron.codigo}
                      </td>
                      {hasTipoPlanoColumn && (
                        <td className="p-3.5 text-center font-mono font-bold text-emerald-900">
                          {cron.tipoPlano ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[11px]">
                              {cron.tipoPlano}
                            </span>
                          ) : '—'}
                        </td>
                      )}
                      <td className="p-3.5 font-bold text-slate-900">
                        {cron.iniciativaEstrategica}
                      </td>
                      <td className="p-3.5 text-center text-[11px] text-slate-600 leading-snug">{cron.ano2027}</td>
                      <td className="p-3.5 text-center text-[11px] text-slate-600 leading-snug">{cron.ano2028}</td>
                      <td className="p-3.5 text-center text-[11px] text-slate-600 leading-snug">{cron.ano2029}</td>
                      <td className="p-3.5 text-center text-[11px] text-slate-600 leading-snug">{cron.ano2030}</td>
                      <td className="p-3.5 text-right font-mono text-slate-700 whitespace-nowrap">
                        {cron.valorTexto2027 || formatMoney(Number(cron.orcamento2027) || 0)}
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-700 whitespace-nowrap">
                        {cron.valorTexto2028 || formatMoney(Number(cron.orcamento2028) || 0)}
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-700 whitespace-nowrap">
                        {cron.valorTexto2029 || formatMoney(getOrc2029(cron))}
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-700 whitespace-nowrap">
                        {cron.valorTexto2030 || formatMoney(getOrc2030(cron))}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-emerald-950 bg-emerald-50/50 whitespace-nowrap">
                        {cron.valorTextoTotal || formatMoney(Number(cron.total) || 0)}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setEditingCronograma(cron);
                              setIsEditCronogramaOpen(true);
                            }}
                            className="p-1 text-slate-500 hover:text-[#006837] hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCronograma(cron.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {/* Total Consolidation Row */}
                  <tr className="bg-emerald-50/90 font-bold text-slate-900 border-t-2 border-emerald-600">
                    <td className="p-3.5 text-center font-mono text-emerald-900">TOTAL</td>
                    {hasTipoPlanoColumn && <td className="p-3.5 text-center text-slate-400">—</td>}
                    <td className="p-3.5 uppercase tracking-wide text-emerald-950">
                      {activeTema
                        ? `Investimento Estratégico Consolidado (${activeTema.nomeTema})`
                        : `Investimento Estratégico Consolidado (${activeFicha.codigoObjetivo})`}
                    </td>
                    <td colSpan={4} className="p-3.5 text-center text-slate-400">—</td>
                    <td className="p-3.5 text-right font-mono text-emerald-900 whitespace-nowrap">
                      {formatMoney(totalOrcamento2027)}{hasValorTextoConvenios ? '*' : ''}
                    </td>
                    <td className="p-3.5 text-right font-mono text-emerald-900 whitespace-nowrap">
                      {formatMoney(totalOrcamento2028)}{hasValorTextoConvenios ? '*' : ''}
                    </td>
                    <td className="p-3.5 text-right font-mono text-emerald-900 whitespace-nowrap">
                      {formatMoney(totalOrcamento2029)}{hasValorTextoConvenios ? '*' : ''}
                    </td>
                    <td className="p-3.5 text-right font-mono text-emerald-900 whitespace-nowrap">
                      {formatMoney(totalOrcamento2030)}{hasValorTextoConvenios ? '*' : ''}
                    </td>
                    <td className="p-3.5 text-right font-mono font-black text-emerald-950 bg-emerald-100/80 whitespace-nowrap">
                      {formatMoney(totalGeralOrcamento)}{hasValorTextoConvenios ? '*' : ''}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            {viewData.notaMetodologicaOrcamento && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
                {viewData.notaMetodologicaOrcamento}
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* SEÇÃO 5: ACOMPANHAMENTO, GOVERNANÇA E PRESTAÇÃO DE CONTAS */}
          {/* ========================================================================= */}
          <section className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#006837] text-white font-mono font-bold text-xs flex items-center justify-center">
                  5
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                  ACOMPANHAMENTO, GOVERNANÇA E PRESTAÇÃO DE CONTAS
                </h3>
              </div>
              <button
                onClick={() => setIsEditGovernancaOpen(true)}
                className="px-3 py-1 text-xs font-semibold text-[#006837] hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors cursor-pointer inline-flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Governança</span>
              </button>
            </div>

            {/* 4 Cards Grid of Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-mono text-slate-400 uppercase text-[10px] font-bold block mb-1">
                  Status Geral
                </span>
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  {viewData.governanca.statusGeral}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-mono text-slate-400 uppercase text-[10px] font-bold block mb-1">
                  Percentual de Execução
                </span>
                <span className="font-mono font-black text-slate-900 text-base text-[#006837]">
                  {viewData.governanca.percentualExecucao.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Ciclo Inicia em 2027</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-mono text-slate-400 uppercase text-[10px] font-bold block mb-1">
                  Periodicidade de Monitoramento
                </span>
                <span className="font-semibold text-slate-800 text-xs leading-snug">
                  {viewData.governanca.periodicidadeMonitoramento}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-mono text-slate-400 uppercase text-[10px] font-bold block mb-1">
                  Última Atualização
                </span>
                <span className="font-mono font-bold text-emerald-800 text-sm">
                  {viewData.governanca.ultimaAtualizacao}
                </span>
              </div>
            </div>

            {/* Institutional Reporting Rites */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                Ritos Institucionais de Reporte e Governança Corporativa:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {viewData.governanca.ritosInstitucionais.map((rito, i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#006837] shrink-0 mt-0.5" />
                    <span>{rito}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SEÇÃO 6: OBSERVAÇÕES, ANÁLISE DE RISCOS E PROVIDÊNCIAS MITIGADORAS */}
          {/* ========================================================================= */}
          <section className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-[#006837] text-white font-mono font-bold text-xs flex items-center justify-center">
                  6
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                  OBSERVAÇÕES, ANÁLISE DE RISCOS E PROVIDÊNCIAS MITIGADORAS
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                <button
                  onClick={() => {
                    setEditingNotaIdx(null);
                    setIsEditNotasOpen(true);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-[#006837] hover:bg-emerald-50 border border-emerald-200 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Nota / Providência</span>
                </button>
                <button
                  onClick={() => {
                    setEditingRisco({
                      id: `risk-${Date.now()}`,
                      codigo: '',
                      fatorCritico: '',
                      observacaoRisco: '',
                      probabilidade: '',
                      impacto: '',
                      impactoPotencial: '',
                      providenciaMitigadora: '',
                      responsavel: ''
                    });
                    setIsEditRiscoOpen(true);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Adicionar Risco & Mitigação</span>
                </button>
              </div>
            </div>

            {/* Risk Analysis Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-900 to-[#006837] text-white font-mono text-[11px] uppercase tracking-wider">
                    <th className="p-3.5 min-w-[220px]">Fator Crítico / Risco Inerente</th>
                    <th className="p-3.5 min-w-[230px]">Impacto Potencial na Gestão</th>
                    <th className="p-3.5 min-w-[270px]">Providência Mitigadora Obrigatória</th>
                    <th className="p-3.5 w-20 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  {viewData.analiseRiscos.map((risco) => (
                    <tr key={risco.id} className="hover:bg-amber-50/30 transition-colors align-top">
                      <td className="p-3.5 font-bold text-slate-900">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {risco.codigo && (
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-[#006837] border border-emerald-200">
                                  {risco.codigo}
                                </span>
                              )}
                              <span>{risco.fatorCritico}</span>
                            </div>
                            {(risco.probabilidade || risco.impacto) && (
                              <div className="flex flex-wrap gap-1.5 font-mono text-[10px] font-semibold">
                                {risco.probabilidade && (
                                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                                    Prob.: {risco.probabilidade}
                                  </span>
                                )}
                                {risco.impacto && (
                                  <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-900 border border-rose-200">
                                    Imp.: {risco.impacto}
                                  </span>
                                )}
                              </div>
                            )}
                            {risco.observacaoRisco && (
                              <p className="font-normal text-slate-600 leading-relaxed text-[11px]">
                                {risco.observacaoRisco}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-600 leading-relaxed">
                        {risco.impactoPotencial}
                      </td>
                      <td className="p-3.5 text-slate-800 leading-relaxed bg-emerald-50/20 font-medium space-y-1.5">
                        <p>{risco.providenciaMitigadora}</p>
                        {risco.responsavel && (
                          <span className="inline-block font-mono text-[10px] font-bold text-[#006837] bg-white px-2 py-0.5 rounded border border-emerald-200">
                            Resp.: {risco.responsavel}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setEditingRisco(risco);
                              setIsEditRiscoOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-[#006837] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRisco(risco.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Premissas, Providências Imediatas e Anexos Complementares */}
            {activeFicha.premissasNotas && activeFicha.premissasNotas.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeFicha.premissasNotas.map((bloco, idx) => (
                  <div key={idx} className="p-5 bg-emerald-50/40 rounded-2xl border border-emerald-200 space-y-2.5 text-xs">
                    <div className="flex items-start justify-between gap-2 border-b border-emerald-200/70 pb-2">
                      <h4 className="font-black text-emerald-950 uppercase tracking-wide text-[11px]">
                        {bloco.titulo}
                      </h4>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingNotaIdx(idx);
                            setIsEditNotasOpen(true);
                          }}
                          className="p-1 text-slate-500 hover:text-[#006837] hover:bg-white rounded cursor-pointer"
                          title="Editar bloco"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNota(idx)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-white rounded cursor-pointer"
                          title="Excluir bloco"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <ul className="space-y-1.5 text-slate-700 leading-relaxed">
                      {bloco.itens.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#006837] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Technical Foundation & Institutional Alignment */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs leading-relaxed text-slate-700">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide">
                Fundamentação Técnica e Alinhamento Estratégico:
              </h4>
              <p>{viewData.fundamentacaoTecnica}</p>
            </div>

            {/* Signature & Technical Validation */}
            <div className="pt-6 border-t border-slate-200 flex flex-col items-center justify-center text-center">
              <div className="w-72 border-b border-slate-400 mb-2" />
              <p className="font-bold text-slate-900 text-xs sm:text-sm">
                {activeFicha.assinaturaResponsavel || viewData.responsavelPreenchimento}
              </p>
              <p className="text-xs text-slate-500">
                {viewData.cargoResponsavel}
              </p>
              <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider mt-1">
                SENAR-AR/RO · Ciclo 2027–2030
              </span>

              <button
                type="button"
                onClick={scrollToPlanosBsc}
                className="mt-5 px-4 py-2 text-xs font-semibold rounded-xl bg-[#006837] hover:bg-[#004d26] text-white shadow-xs inline-flex items-center gap-1.5 cursor-pointer transition-all print:hidden"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Retornar para Planos de Ação por Objetivo Estratégico do BSC</span>
              </button>
            </div>

          </section>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODALS FOR EDITING AND MANAGING ALL FIELDS */}
      {/* ========================================================================= */}

      {/* MODAL 1: EDIT HEADER & METADATA */}
      {isEditHeaderOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Editar Cabeçalho do Objetivo Estratégico</h3>
              <button onClick={() => setIsEditHeaderOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const metaPatch = {
                unidadeResponsavelLider: formData.get('unidadeResponsavelLider') as string,
                unidadesParceiras: formData.get('unidadesParceiras') as string,
                responsavelPreenchimento: formData.get('responsavelPreenchimento') as string,
                cargoResponsavel: formData.get('cargoResponsavel') as string,
                dataElaboracaoRevisao: formData.get('dataElaboracaoRevisao') as string,
                fundamentacaoTecnica: formData.get('fundamentacaoTecnica') as string
              };
              const objPatch = {
                codigoObjetivo: formData.get('codigoObjetivo') as string,
                nomeObjetivo: formData.get('nomeObjetivo') as string,
                enunciado: formData.get('enunciado') as string,
                desdobramento: (formData.get('desdobramento') as string) || undefined,
                perspectivaBsc: formData.get('perspectivaBsc') as PerspectivaBSCType
              };

              updateActiveFicha(f => {
                const base = {
                  ...f,
                  ...objPatch,
                  assinaturaResponsavel: (formData.get('assinaturaResponsavel') as string) || f.assinaturaResponsavel
                };
                if (f.temas && f.temas.length > 0 && activeTema) {
                  const updatedTemas = f.temas.map(t =>
                    t.id === activeTema.id ? { ...t, ...metaPatch } : t
                  );
                  return { ...base, temas: updatedTemas };
                }
                return { ...base, ...metaPatch };
              });
              setIsEditHeaderOpen(false);
            }} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Código do Objetivo</label>
                  <input name="codigoObjetivo" defaultValue={activeFicha.codigoObjetivo} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Perspectiva BSC</label>
                  <select name="perspectivaBsc" defaultValue={activeFicha.perspectivaBsc} className="w-full p-2 border rounded-lg">
                    <option value="PROCESSOS_INTERNOS">Processos Internos</option>
                    <option value="CLIENTES">Clientes</option>
                    <option value="SOCIEDADE">Sociedade</option>
                    <option value="APRENDIZADO_CRESCIMENTO">Aprendizado e Crescimento</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nome do Objetivo</label>
                <input name="nomeObjetivo" defaultValue={activeFicha.nomeObjetivo} required className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Enunciado Oficial</label>
                <textarea name="enunciado" defaultValue={activeFicha.enunciado} rows={2} required className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Desdobramento Foco da Unidade (Opcional)</label>
                <textarea name="desdobramento" defaultValue={activeFicha.desdobramento || ''} rows={2} className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Unidade Responsável / Líder</label>
                <input name="unidadeResponsavelLider" defaultValue={viewData.unidadeResponsavelLider} required className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Unidades Parceiras / Corresponsáveis</label>
                <textarea name="unidadesParceiras" defaultValue={viewData.unidadesParceiras} rows={2} className="w-full p-2 border rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Responsável Preenchimento</label>
                  <input name="responsavelPreenchimento" defaultValue={viewData.responsavelPreenchimento} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cargo</label>
                  <input name="cargoResponsavel" defaultValue={viewData.cargoResponsavel} required className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Data Elaboração / Revisão</label>
                  <input name="dataElaboracaoRevisao" defaultValue={viewData.dataElaboracaoRevisao} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assinatura Institucional</label>
                  <input name="assinaturaResponsavel" defaultValue={activeFicha.assinaturaResponsavel} className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Fundamentação Técnica e Alinhamento Estratégico</label>
                <textarea name="fundamentacaoTecnica" defaultValue={viewData.fundamentacaoTecnica} rows={3} className="w-full p-2 border rounded-lg" />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsEditHeaderOpen(false)} className="px-4 py-2 border rounded-lg text-slate-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#006837] text-white rounded-lg font-bold">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT INICIATIVA / SOLUÇÃO */}
      {isEditIniciativaOpen && editingIniciativa && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingIniciativa.solucaoIniciativa ? 'Editar Iniciativa Estratégica' : 'Nova Iniciativa Estratégica'}
              </h3>
              <button onClick={() => setIsEditIniciativaOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              handleSaveIniciativa({
                id: editingIniciativa.id,
                codigo: formData.get('codigo') as string,
                solucaoIniciativa: formData.get('solucaoIniciativa') as string,
                vinculoResultadoEsperado: formData.get('vinculoResultadoEsperado') as string,
                unidadeResponsavel: formData.get('unidadeResponsavel') as string,
                unidadesParceiras: formData.get('unidadesParceiras') as string,
                detalhamentoTecnico: formData.get('detalhamentoTecnico') as string
              });
            }} className="space-y-3.5 mt-4 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ID / Código</label>
                  <input name="codigo" defaultValue={editingIniciativa.codigo} required className="w-full p-2 border rounded-lg" />
                </div>
                <div className="col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Unidade Responsável</label>
                  <input name="unidadeResponsavel" defaultValue={editingIniciativa.unidadeResponsavel} required className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Solução / Iniciativa</label>
                <input name="solucaoIniciativa" defaultValue={editingIniciativa.solucaoIniciativa} required className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Vínculo com Resultado Esperado</label>
                <input name="vinculoResultadoEsperado" defaultValue={editingIniciativa.vinculoResultadoEsperado} required className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Unidades Parceiras</label>
                <input name="unidadesParceiras" defaultValue={editingIniciativa.unidadesParceiras} className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detalhamento Técnico da Solução</label>
                <textarea name="detalhamentoTecnico" defaultValue={editingIniciativa.detalhamentoTecnico} rows={4} className="w-full p-2 border rounded-lg" />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsEditIniciativaOpen(false)} className="px-4 py-2 border rounded-lg text-slate-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#006837] text-white rounded-lg font-bold">Salvar Iniciativa</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT INDICADOR / METAS */}
      {isEditKpiOpen && editingKpi && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingKpi.nome ? 'Editar Indicador e Metas' : 'Novo Indicador e Metas'}
              </h3>
              <button onClick={() => setIsEditKpiOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              handleSaveKpi({
                id: editingKpi.id,
                codigo: formData.get('codigo') as string,
                nome: formData.get('nome') as string,
                unidadeMedida: formData.get('unidadeMedida') as string,
                linhaBase2026: formData.get('linhaBase2026') as string,
                exec2025: (formData.get('exec2025') as string) || '',
                exec2026: (formData.get('exec2026') as string) || '',
                meta2027: formData.get('meta2027') as string,
                exec2027: (formData.get('exec2027') as string) || '',
                meta2028: formData.get('meta2028') as string,
                exec2028: (formData.get('exec2028') as string) || '',
                meta2029: formData.get('meta2029') as string,
                exec2029: (formData.get('exec2029') as string) || '',
                meta2030: formData.get('meta2030') as string,
                exec2030: (formData.get('exec2030') as string) || '',
                fonteVerificacao: formData.get('fonteVerificacao') as string
              });
            }} className="space-y-3.5 mt-4 text-xs">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ID / Código</label>
                  <input name="codigo" defaultValue={editingKpi.codigo} required className="w-full p-2 border rounded-lg" />
                </div>
                <div className="col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Unidade de Medida</label>
                  <input name="unidadeMedida" defaultValue={editingKpi.unidadeMedida} required className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nome do Indicador (KPI)</label>
                <input name="nome" defaultValue={editingKpi.nome} required className="w-full p-2 border rounded-lg" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Linha de Base (2026)</label>
                  <input name="linhaBase2026" defaultValue={editingKpi.linhaBase2026} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Execução 2025</label>
                  <input name="exec2025" defaultValue={editingKpi.exec2025 || ''} placeholder="Ex: 1.420" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Execução 2026</label>
                  <input name="exec2026" defaultValue={editingKpi.exec2026 || ''} placeholder="Ex: 1.574" className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Prev. 2027</label>
                  <input name="meta2027" defaultValue={editingKpi.meta2027} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Prev. 2028</label>
                  <input name="meta2028" defaultValue={editingKpi.meta2028} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Prev. 2029</label>
                  <input name="meta2029" defaultValue={editingKpi.meta2029} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Prev. 2030</label>
                  <input name="meta2030" defaultValue={editingKpi.meta2030} required className="w-full p-2 border rounded-lg font-bold text-emerald-900" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Exec. 2027</label>
                  <input name="exec2027" defaultValue={editingKpi.exec2027 || ''} placeholder="Realizado" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Exec. 2028</label>
                  <input name="exec2028" defaultValue={editingKpi.exec2028 || ''} placeholder="Realizado" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Exec. 2029</label>
                  <input name="exec2029" defaultValue={editingKpi.exec2029 || ''} placeholder="Realizado" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Exec. 2030</label>
                  <input name="exec2030" defaultValue={editingKpi.exec2030 || ''} placeholder="Realizado" className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Fonte de Verificação</label>
                <input name="fonteVerificacao" defaultValue={editingKpi.fonteVerificacao} required className="w-full p-2 border rounded-lg" />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsEditKpiOpen(false)} className="px-4 py-2 border rounded-lg text-slate-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#006837] text-white rounded-lg font-bold">Salvar Indicador</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: EDIT CRONOGRAMA & ORÇAMENTO */}
      {isEditCronogramaOpen && editingCronograma && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingCronograma.iniciativaEstrategica ? 'Editar Orçamento & Cronograma' : 'Nova Linha de Orçamento'}
              </h3>
              <button onClick={() => setIsEditCronogramaOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              handleSaveCronograma({
                id: editingCronograma.id,
                codigo: formData.get('codigo') as string,
                tipoPlano: (formData.get('tipoPlano') as string) || undefined,
                iniciativaEstrategica: formData.get('iniciativaEstrategica') as string,
                ano2027: formData.get('ano2027') as string,
                ano2028: formData.get('ano2028') as string,
                ano2029: formData.get('ano2029') as string,
                ano2030: formData.get('ano2030') as string,
                orcamento2027: Number(formData.get('orcamento2027')) || 0,
                orcamento2028: Number(formData.get('orcamento2028')) || 0,
                orcamento2029: Number(formData.get('orcamento2029')) || 0,
                orcamento2030: Number(formData.get('orcamento2030')) || 0,
                total: 0
              });
            }} className="space-y-3.5 mt-4 text-xs">
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ID</label>
                  <input name="codigo" defaultValue={editingCronograma.codigo} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipo Plano (Opcional)</label>
                  <input name="tipoPlano" defaultValue={editingCronograma.tipoPlano || ''} placeholder="Ex: FPR, EF" className="w-full p-2 border rounded-lg" />
                </div>
                <div className="col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Solução / Iniciativa Estratégica</label>
                  <input name="iniciativaEstrategica" defaultValue={editingCronograma.iniciativaEstrategica} required className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Execução 2027</label>
                  <input name="ano2027" defaultValue={editingCronograma.ano2027} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Execução 2028</label>
                  <input name="ano2028" defaultValue={editingCronograma.ano2028} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Execução 2029</label>
                  <input name="ano2029" defaultValue={editingCronograma.ano2029} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Execução 2030</label>
                  <input name="ano2030" defaultValue={editingCronograma.ano2030} required className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Valor 2027 (R$)</label>
                  <input type="number" step="0.01" name="orcamento2027" defaultValue={editingCronograma.orcamento2027} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Valor 2028 (R$)</label>
                  <input type="number" step="0.01" name="orcamento2028" defaultValue={editingCronograma.orcamento2028} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Valor 2029 (R$)</label>
                  <input type="number" step="0.01" name="orcamento2029" defaultValue={getOrc2029(editingCronograma)} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Valor 2030 (R$)</label>
                  <input type="number" step="0.01" name="orcamento2030" defaultValue={getOrc2030(editingCronograma)} required className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsEditCronogramaOpen(false)} className="px-4 py-2 border rounded-lg text-slate-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#006837] text-white rounded-lg font-bold">Salvar Cronograma</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: EDIT RISCOS & MITIGAÇÃO */}
      {isEditRiscoOpen && editingRisco && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingRisco.fatorCritico ? 'Editar Fator Crítico / Risco' : 'Novo Fator Crítico / Risco'}
              </h3>
              <button onClick={() => setIsEditRiscoOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              handleSaveRisco({
                id: editingRisco.id,
                codigo: (formData.get('codigo') as string) || undefined,
                fatorCritico: formData.get('fatorCritico') as string,
                observacaoRisco: (formData.get('observacaoRisco') as string) || undefined,
                probabilidade: (formData.get('probabilidade') as string) || undefined,
                impacto: (formData.get('impacto') as string) || undefined,
                impactoPotencial: formData.get('impactoPotencial') as string,
                providenciaMitigadora: formData.get('providenciaMitigadora') as string,
                responsavel: (formData.get('responsavel') as string) || undefined
              });
            }} className="space-y-3.5 mt-4 text-xs">
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ID (Opcional)</label>
                  <input name="codigo" defaultValue={editingRisco.codigo || ''} placeholder="Ex: 06.2" className="w-full p-2 border rounded-lg" />
                </div>
                <div className="col-span-3">
                  <label className="font-bold text-slate-700 block mb-1">Fator Crítico / Risco Inerente</label>
                  <input name="fatorCritico" defaultValue={editingRisco.fatorCritico} required className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Probabilidade (Opcional)</label>
                  <input name="probabilidade" defaultValue={editingRisco.probabilidade || ''} placeholder="Alta / Média" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Impacto (Opcional)</label>
                  <input name="impacto" defaultValue={editingRisco.impacto || ''} placeholder="Alto / Muito alto" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Responsável (Opcional)</label>
                  <input name="responsavel" defaultValue={editingRisco.responsavel || ''} placeholder="Ex: TI / DAF" className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Observações / Descrição do Risco (Opcional)</label>
                <textarea name="observacaoRisco" defaultValue={editingRisco.observacaoRisco || ''} rows={2} className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Impacto Potencial na Gestão</label>
                <textarea name="impactoPotencial" defaultValue={editingRisco.impactoPotencial} rows={2} required className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Providência Mitigadora Obrigatória</label>
                <textarea name="providenciaMitigadora" defaultValue={editingRisco.providenciaMitigadora} rows={3} required className="w-full p-2 border rounded-lg" />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsEditRiscoOpen(false)} className="px-4 py-2 border rounded-lg text-slate-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#006837] text-white rounded-lg font-bold">Salvar Risco</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: EDIT GOVERNANÇA & RITOS */}
      {isEditGovernancaOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Editar Governança & Ritos de Reporte</h3>
              <button onClick={() => setIsEditGovernancaOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const ritosRaw = formData.get('ritos') as string;
              const ritosArray = ritosRaw.split('\n').filter(r => r.trim().length > 0);
              const nextGov = {
                statusGeral: formData.get('statusGeral') as string,
                percentualExecucao: Number(formData.get('percentualExecucao')) || 0,
                periodicidadeMonitoramento: formData.get('periodicidadeMonitoramento') as string,
                ultimaAtualizacao: formData.get('ultimaAtualizacao') as string,
                ritosInstitucionais: ritosArray
              };

              updateActiveScope(
                t => ({ ...t, governanca: nextGov }),
                f => ({ ...f, governanca: nextGov })
              );
              setIsEditGovernancaOpen(false);
            }} className="space-y-3.5 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status Geral</label>
                  <input name="statusGeral" defaultValue={viewData.governanca.statusGeral} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Percentual Execução (%)</label>
                  <input type="number" step="0.1" name="percentualExecucao" defaultValue={viewData.governanca.percentualExecucao} required className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Periodicidade</label>
                  <input name="periodicidadeMonitoramento" defaultValue={viewData.governanca.periodicidadeMonitoramento} required className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Última Atualização</label>
                  <input name="ultimaAtualizacao" defaultValue={viewData.governanca.ultimaAtualizacao} required className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Ritos Institucionais de Reporte (um por linha)</label>
                <textarea name="ritos" defaultValue={viewData.governanca.ritosInstitucionais.join('\n')} rows={5} className="w-full p-2 border rounded-lg" />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsEditGovernancaOpen(false)} className="px-4 py-2 border rounded-lg text-slate-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#006837] text-white rounded-lg font-bold">Salvar Governança</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 7: EDIT DIRETRIZES / RESULTADOS */}
      {isEditDiretrizesOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Gerenciar Diretrizes do Mapa Estratégico</h3>
              <button onClick={() => setIsEditDiretrizesOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const text = formData.get('diretrizes') as string;
              const list = text.split('\n\n').map(t => t.trim()).filter(t => t.length > 0);
              updateActiveScope(
                t => ({ ...t, diretrizesResultados: list }),
                f => ({ ...f, diretrizesResultados: list })
              );
              setIsEditDiretrizesOpen(false);
            }} className="space-y-4 mt-4 text-xs">
              <p className="text-slate-600">
                Insira ou edite as diretrizes e eixos norteadores permanentes do Objetivo Estratégico. Separe cada diretriz por uma linha em branco dupla (Enter duas vezes).
              </p>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Eixos Norteadores / Diretrizes</label>
                <textarea
                  name="diretrizes"
                  defaultValue={viewData.diretrizesResultados.join('\n\n')}
                  rows={10}
                  className="w-full p-3 border rounded-xl font-sans"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsEditDiretrizesOpen(false)} className="px-4 py-2 border rounded-lg text-slate-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#006837] text-white rounded-lg font-bold">Salvar Diretrizes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 8: NOVA FICHA DE OBJETIVO ESTRATÉGICO */}
      {isNovaFichaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">Cadastrar Nova Ficha de Objetivo Estratégico</h3>
              <button onClick={() => setIsNovaFichaModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const newId = `ficha-${Date.now()}`;
              const cod = formData.get('codigoObjetivo') as string;
              const nome = formData.get('nomeObjetivo') as string;

              const novaFicha: FichaTecnicaObjetivo = {
                id: newId,
                codigoObjetivo: cod,
                nomeObjetivo: nome,
                enunciado: formData.get('enunciado') as string,
                perspectivaBsc: formData.get('perspectivaBsc') as PerspectivaBSCType,
                unidadeResponsavelLider: formData.get('unidadeResponsavelLider') as string,
                unidadesParceiras: formData.get('unidadesParceiras') as string || 'Unidades Operacionais e Administrativas',
                responsavelPreenchimento: formData.get('responsavelPreenchimento') as string || usuarioAtivo?.nome || 'Gestor Responsável',
                cargoResponsavel: formData.get('cargoResponsavel') as string || 'Coordenador / Assessor',
                dataElaboracaoRevisao: 'Outubro de 2026 (Ciclo de Planejamento Estratégico 2027–2030)',
                diretrizesResultados: [
                  'Diretriz 01: Foco em resultados de excelência e alinhamento às diretrizes estratégicas institucionais.',
                  'Diretriz 02: Monitoramento contínuo de metas, eficiência no uso dos recursos e melhoria nos serviços prestados aos produtores rurais.'
                ],
                solucoesIniciativas: [
                  {
                    id: `sol-${Date.now()}-1`,
                    codigo: `${cod}.1`,
                    solucaoIniciativa: `Plano Tático Integrado de Execução do Objetivo ${cod}`,
                    vinculoResultadoEsperado: 'Atingimento das metas e fortalecimento da capacidade institucional',
                    unidadeResponsavel: formData.get('unidadeResponsavelLider') as string,
                    unidadesParceiras: 'TI, DAF, DETEC',
                    detalhamentoTecnico: 'Implementação de ações coordenadas para execução plena do objetivo estratégico.'
                  }
                ],
                indicadoresMetas: [
                  {
                    id: `kpi-${Date.now()}-1`,
                    codigo: `${cod}.1`,
                    nome: `Índice de Eficácia do Objetivo ${cod}`,
                    unidadeMedida: 'Percentual (%)',
                    linhaBase2026: '75,0%',
                    meta2027: '85,0%',
                    meta2028: '90,0%',
                    meta2029: '95,0%',
                    meta2030: '≥ 98,0%',
                    fonteVerificacao: 'Relatórios de Gestão e Painéis de Monitoramento'
                  }
                ],
                cronogramaOrcamento: [
                  {
                    id: `cron-${Date.now()}-1`,
                    codigo: `${cod}.1`,
                    iniciativaEstrategica: `Ações Táticas do Objetivo ${cod}`,
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
                  periodicidadeMonitoramento: 'Trimestral',
                  ultimaAtualizacao: 'Outubro/2026',
                  ritosInstitucionais: [
                    '1. Reporte mensal de indicadores à Superintendência.',
                    '2. Avaliação trimestral no Comitê de Governança Estratégica.'
                  ]
                },
                analiseRiscos: [
                  {
                    id: `risk-${Date.now()}-1`,
                    fatorCritico: 'Resistência a Mudanças ou Gargalos Operacionais',
                    impactoPotencial: 'Atraso no cumprimento do cronograma estipulado.',
                    providenciaMitigadora: 'Capacitação contínua, governança próxima e comunicação transparente.'
                  }
                ],
                fundamentacaoTecnica: 'Alinhamento integral ao Mapa Estratégico 2027–2030 do SENAR-AR/RO e aos normativos institucionais vigentes.',
                assinaturaResponsavel: `${formData.get('responsavelPreenchimento')} - SENAR-AR/RO`
              };

              setFichas(prev => [...prev, novaFicha]);
              setSelectedFichaId(novaFicha.id);
              setIsNovaFichaModalOpen(false);
            }} className="space-y-3.5 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Código do Objetivo (ex: 05)</label>
                  <input name="codigoObjetivo" required placeholder="Ex: 05" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Perspectiva BSC</label>
                  <select name="perspectivaBsc" className="w-full p-2 border rounded-lg">
                    <option value="PROCESSOS_INTERNOS">Processos Internos</option>
                    <option value="CLIENTES">Clientes</option>
                    <option value="SOCIEDADE">Sociedade</option>
                    <option value="APRENDIZADO_CRESCIMENTO">Aprendizado e Crescimento</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nome do Objetivo Estratégico</label>
                <input name="nomeObjetivo" required placeholder="Ex: INOVAÇÃO TECNOLÓGICA E TRANSFORMAÇÃO DIGITAL" className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Enunciado Oficial</label>
                <textarea name="enunciado" required rows={2} placeholder="Ex: Desenvolver e aplicar soluções de ponta..." className="w-full p-2 border rounded-lg" />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Unidade Responsável / Líder</label>
                <input name="unidadeResponsavelLider" required placeholder="Ex: Assessoria de Inovação e TI" className="w-full p-2 border rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Responsável Preenchimento</label>
                  <input name="responsavelPreenchimento" placeholder="Nome do gestor" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cargo</label>
                  <input name="cargoResponsavel" placeholder="Ex: Coordenador" className="w-full p-2 border rounded-lg" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsNovaFichaModalOpen(false)} className="px-4 py-2 border rounded-lg text-slate-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#006837] text-white rounded-lg font-bold">Criar Nova Ficha</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 9: EDITAR / INCLUIR PREMISSAS, PROVIDÊNCIAS OU ANEXOS */}
      {isEditNotasOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-base text-slate-900">
                {editingNotaIdx !== null ? 'Editar Nota / Providência / Anexo' : 'Adicionar Nota / Providência / Anexo'}
              </h3>
              <button onClick={() => setIsEditNotasOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const titulo = (formData.get('titulo') as string).trim();
              const itens = (formData.get('itens') as string)
                .split('\n')
                .map(s => s.trim())
                .filter(Boolean);

              const novoBloco: BlocoNotaFicha = { titulo, itens };
              updateActiveFicha(f => {
                const atuais = [...(f.premissasNotas || [])];
                if (editingNotaIdx !== null && atuais[editingNotaIdx]) {
                  atuais[editingNotaIdx] = novoBloco;
                } else {
                  atuais.push(novoBloco);
                }
                return { ...f, premissasNotas: atuais };
              });
              setIsEditNotasOpen(false);
              setEditingNotaIdx(null);
            }} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Título do Bloco</label>
                <input
                  name="titulo"
                  defaultValue={editingNotaIdx !== null ? activeFicha.premissasNotas?.[editingNotaIdx]?.titulo || '' : ''}
                  placeholder="Ex: Premissas / Providências Imediatas / Anexos"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Itens (um por linha)</label>
                <textarea
                  name="itens"
                  defaultValue={editingNotaIdx !== null ? (activeFicha.premissasNotas?.[editingNotaIdx]?.itens || []).join('\n') : ''}
                  rows={8}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setIsEditNotasOpen(false)} className="px-4 py-2 border rounded-lg text-slate-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-[#006837] text-white rounded-lg font-bold">Salvar Bloco</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
