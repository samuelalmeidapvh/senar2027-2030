import React, { useMemo, useState } from 'react';
import {
  FichaTecnicaObjetivo,
  IndicadorKPI,
  IndicadorMetaFicha,
  ObjetivoEstrategico,
  PerspectivaBSCType,
  SiglaUnidade,
  StatusEstrategico,
  UsuarioAutenticado
} from '../../types/strategic';
import { StatusBadge } from '../ui/StatusBadge';
import { MiniSparklineChart } from '../ui/MiniSparklineChart';
import {
  buildComplementaryKpiPoints,
  buildFichaKpiAnalytics,
  parseKpiNumericValue
} from '../../utils/kpiChartUtils';
import {
  TrendingUp,
  Edit3,
  Clock,
  Search,
  Plus,
  Trash2,
  X,
  Save,
  SlidersHorizontal,
  Check,
  Target,
  Layers
} from 'lucide-react';

interface KpiDashboardProps {
  fichas: FichaTecnicaObjetivo[];
  onChangeFichas: React.Dispatch<React.SetStateAction<FichaTecnicaObjetivo[]>>;
  kpis: IndicadorKPI[];
  objetivos: ObjetivoEstrategico[];
  usuarioAtivo: UsuarioAutenticado | null;
  onSaveComplementaryKpi: (kpi: IndicadorKPI, isNew?: boolean) => void;
  onDeleteComplementaryKpi: (kpiId: string) => void;
}

const PERSPECTIVA_LABEL: Record<PerspectivaBSCType, string> = {
  SOCIEDADE: 'Sociedade',
  CLIENTES: 'Clientes',
  CLIENTES_SOCIEDADE: 'Clientes e Sociedade',
  PROCESSOS_INTERNOS: 'Processos Internos',
  APRENDIZADO_CRESCIMENTO: 'Aprendizado e Crescimento',
  FINANCEIRA: 'Financeira'
};

interface FichaKpiItem {
  kind: 'FICHA';
  fichaId: string;
  codigoObjetivo: string;
  nomeObjetivo: string;
  perspectivaBsc: PerspectivaBSCType;
  unidadeLider: string;
  indicador: IndicadorMetaFicha;
}

interface ComplementaryKpiItem {
  kind: 'COMPLEMENTAR';
  kpi: IndicadorKPI;
  objetivoTitulo: string;
}

type UnifiedKpiItem = FichaKpiItem | ComplementaryKpiItem;

interface ModalFormState {
  mode: 'CREATE' | 'EDIT_FICHA' | 'EDIT_COMPLEMENTAR';
  targetScope: string; // 'FICHA:<id>' or 'COMPLEMENTAR'
  originalFichaId?: string;
  id: string;
  codigo: string;
  nome: string;
  unidadeMedida: string;
  linhaBase2026: string;
  meta2025: string;
  exec2025: string;
  meta2026: string;
  exec2026: string;
  meta2027: string;
  exec2027: string;
  meta2028: string;
  exec2028: string;
  meta2029: string;
  exec2029: string;
  meta2030: string;
  exec2030: string;
  fonteVerificacao: string;
  // Extra fields for complementary KPIs
  objetivoId: string;
  unidadeId: SiglaUnidade;
  realizadoAtual: string;
  metaAtual: string;
}

export const KpiDashboard: React.FC<KpiDashboardProps> = ({
  fichas,
  onChangeFichas,
  kpis,
  objetivos,
  onSaveComplementaryKpi,
  onDeleteComplementaryKpi
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('TODOS');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inlineEditKey, setInlineEditKey] = useState<string | null>(null);
  const [confirmDeleteKey, setConfirmDeleteKey] = useState<string | null>(null);
  const [modalForm, setModalForm] = useState<ModalFormState | null>(null);

  // Build unified list: Ficha Técnica indicators (primary scope) + Complementary section KPIs
  const allItems = useMemo<UnifiedKpiItem[]>(() => {
    const fromFichas: FichaKpiItem[] = fichas.flatMap((ficha) =>
      ficha.indicadoresMetas.map((indicador) => ({
        kind: 'FICHA' as const,
        fichaId: ficha.id,
        codigoObjetivo: ficha.codigoObjetivo,
        nomeObjetivo: ficha.nomeObjetivo,
        perspectivaBsc: ficha.perspectivaBsc,
        unidadeLider: ficha.unidadeResponsavelLider,
        indicador
      }))
    );

    const fromPainel: ComplementaryKpiItem[] = kpis.map((kpi) => {
      const obj = objetivos.find((o) => o.id === kpi.objetivoId);
      return {
        kind: 'COMPLEMENTAR' as const,
        kpi,
        objetivoTitulo: obj ? `${obj.codigo} — ${obj.titulo}` : 'Indicador Complementar do Painel'
      };
    });

    return [...fromFichas, ...fromPainel];
  }, [fichas, kpis, objetivos]);

  const totalFichaKpis = useMemo(
    () => fichas.reduce((acc, f) => acc + f.indicadoresMetas.length, 0),
    [fichas]
  );

  // Filter items based on dropdown selection and search query
  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return allItems.filter((item) => {
      let matchScope = true;
      if (selectedFilter === 'COMPLEMENTARES') {
        matchScope = item.kind === 'COMPLEMENTAR';
      } else if (selectedFilter.startsWith('FICHA:')) {
        const targetFichaId = selectedFilter.replace('FICHA:', '');
        matchScope = item.kind === 'FICHA' && item.fichaId === targetFichaId;
      } else if (selectedFilter.startsWith('OBJ:')) {
        const targetObjId = selectedFilter.replace('OBJ:', '');
        matchScope = item.kind === 'COMPLEMENTAR' && item.kpi.objetivoId === targetObjId;
      }

      if (!matchScope) return false;
      if (!query) return true;

      if (item.kind === 'FICHA') {
        return (
          item.indicador.nome.toLowerCase().includes(query) ||
          item.indicador.codigo.toLowerCase().includes(query) ||
          item.nomeObjetivo.toLowerCase().includes(query) ||
          item.indicador.fonteVerificacao.toLowerCase().includes(query)
        );
      }
      return (
        item.kpi.nome.toLowerCase().includes(query) ||
        item.kpi.codigo.toLowerCase().includes(query) ||
        item.kpi.descricao.toLowerCase().includes(query) ||
        item.objetivoTitulo.toLowerCase().includes(query)
      );
    });
  }, [allItems, selectedFilter, searchTerm]);

  // Global metrics across all visible or total indicators
  const summaryStats = useMemo(() => {
    const total = allItems.length;
    let onTrack = 0;

    allItems.forEach((item) => {
      if (item.kind === 'FICHA') {
        const analytics = buildFichaKpiAnalytics(item.indicador);
        if (analytics.status === 'EXCELENTE' || analytics.status === 'NO_RUMO') {
          onTrack += 1;
        }
      } else {
        if (item.kpi.status === 'EXCELENTE' || item.kpi.status === 'NO_RUMO') {
          onTrack += 1;
        }
      }
    });

    const aderencia = total > 0 ? Math.round((onTrack / total) * 100) : 0;
    return { total, onTrack, aderencia };
  }, [allItems]);

  // Live update for Ficha Técnica indicator field
  const handleLiveUpdateFichaIndicator = (
    fichaId: string,
    indicadorId: string,
    patch: Partial<IndicadorMetaFicha>
  ) => {
    onChangeFichas((prev) =>
      prev.map((f) => {
        if (f.id !== fichaId) return f;
        return {
          ...f,
          indicadoresMetas: f.indicadoresMetas.map((ind) =>
            ind.id === indicadorId ? { ...ind, ...patch } : ind
          )
        };
      })
    );
  };

  // Delete Ficha Técnica indicator
  const handleDeleteFichaIndicator = (fichaId: string, indicadorId: string) => {
    onChangeFichas((prev) =>
      prev.map((f) => {
        if (f.id !== fichaId) return f;
        return {
          ...f,
          indicadoresMetas: f.indicadoresMetas.filter((ind) => ind.id !== indicadorId)
        };
      })
    );
    setConfirmDeleteKey(null);
    if (inlineEditKey === `FICHA:${fichaId}:${indicadorId}`) {
      setInlineEditKey(null);
    }
  };

  // Recompute complementary KPI status dynamically when forecast or execution changes
  const computeComplementaryStatus = (
    realizadoVal: number,
    metaVal: number,
    polaridade: IndicadorKPI['polaridade']
  ): StatusEstrategico => {
    if (metaVal <= 0) return 'NO_RUMO';
    const ratio =
      polaridade === 'MENOR_MELHOR'
        ? realizadoVal <= 0
          ? 1
          : metaVal / realizadoVal
        : realizadoVal / metaVal;
    if (ratio >= 0.98) return 'EXCELENTE';
    if (ratio >= 0.88) return 'NO_RUMO';
    if (ratio >= 0.72) return 'ATENCAO';
    return 'CRITICO';
  };

  // Live update for Complementary KPI
  const handleLiveUpdateComplementaryKpi = (
    kpi: IndicadorKPI,
    patch: Partial<IndicadorKPI>
  ) => {
    const nextKpi: IndicadorKPI = { ...kpi, ...patch };

    // Sync numeric realizado / meta with latest executed / forecast values when updated
    const latestExecStr =
      nextKpi.exec2030 ||
      nextKpi.exec2029 ||
      nextKpi.exec2028 ||
      nextKpi.exec2027 ||
      nextKpi.exec2026 ||
      nextKpi.exec2025;
    const latestMetaStr =
      nextKpi.exec2030
        ? nextKpi.meta2030
        : nextKpi.exec2029
        ? nextKpi.meta2029
        : nextKpi.exec2028
        ? nextKpi.meta2028
        : nextKpi.exec2027
        ? nextKpi.meta2027
        : nextKpi.exec2026
        ? nextKpi.meta2026
        : nextKpi.meta2026 || nextKpi.meta2027 || nextKpi.meta2025;

    if (patch.exec2026 !== undefined) {
      const parsed2026 = parseKpiNumericValue(patch.exec2026);
      if (parsed2026 !== null && !nextKpi.exec2027 && !nextKpi.exec2028 && !nextKpi.exec2029 && !nextKpi.exec2030) {
        nextKpi.realizado = parsed2026;
      }
    }
    if (latestExecStr !== undefined) {
      const parsedLatestExec = parseKpiNumericValue(latestExecStr);
      if (parsedLatestExec !== null) {
        nextKpi.realizado = parsedLatestExec;
      }
    }
    if (latestMetaStr !== undefined) {
      const parsedLatestMeta = parseKpiNumericValue(latestMetaStr);
      if (parsedLatestMeta !== null) {
        nextKpi.meta = parsedLatestMeta;
      }
    }

    nextKpi.status = computeComplementaryStatus(
      nextKpi.realizado,
      nextKpi.meta,
      nextKpi.polaridade
    );
    nextKpi.ultimaAtualizacao = new Date().toLocaleDateString('pt-BR');

    onSaveComplementaryKpi(nextKpi, false);
  };

  const openCreateModal = () => {
    const defaultScope = selectedFilter.startsWith('FICHA:')
      ? selectedFilter
      : selectedFilter === 'COMPLEMENTARES' || selectedFilter.startsWith('OBJ:')
      ? 'COMPLEMENTAR'
      : fichas[0]
      ? `FICHA:${fichas[0].id}`
      : 'COMPLEMENTAR';

    const defaultFichaId = defaultScope.startsWith('FICHA:')
      ? defaultScope.replace('FICHA:', '')
      : fichas[0]?.id || '';
    const defaultFicha = fichas.find((f) => f.id === defaultFichaId);
    const nextIdx = defaultFicha ? defaultFicha.indicadoresMetas.length + 1 : kpis.length + 1;

    setModalForm({
      mode: 'CREATE',
      targetScope: defaultScope,
      id: `kpi-${Date.now()}`,
      codigo: defaultFicha ? `${defaultFicha.codigoObjetivo}.${nextIdx}` : `KPI-RO-${nextIdx}`,
      nome: '',
      unidadeMedida: '%',
      linhaBase2026: '',
      meta2025: '',
      exec2025: '',
      meta2026: '',
      exec2026: '',
      meta2027: '',
      exec2027: '',
      meta2028: '',
      exec2028: '',
      meta2029: '',
      exec2029: '',
      meta2030: '',
      exec2030: '',
      fonteVerificacao: '',
      objetivoId: objetivos[0]?.id || 'obj-1',
      unidadeId: 'DETEC',
      realizadoAtual: '',
      metaAtual: ''
    });
  };

  const openEditFichaModal = (item: FichaKpiItem) => {
    setModalForm({
      mode: 'EDIT_FICHA',
      targetScope: `FICHA:${item.fichaId}`,
      originalFichaId: item.fichaId,
      id: item.indicador.id,
      codigo: item.indicador.codigo,
      nome: item.indicador.nome,
      unidadeMedida: item.indicador.unidadeMedida,
      linhaBase2026: item.indicador.linhaBase2026,
      meta2025: item.indicador.meta2025 || '',
      exec2025: item.indicador.exec2025 || '',
      meta2026: item.indicador.meta2026 || item.indicador.linhaBase2026 || '',
      exec2026: item.indicador.exec2026 || '',
      meta2027: item.indicador.meta2027,
      exec2027: item.indicador.exec2027 || '',
      meta2028: item.indicador.meta2028,
      exec2028: item.indicador.exec2028 || '',
      meta2029: item.indicador.meta2029,
      exec2029: item.indicador.exec2029 || '',
      meta2030: item.indicador.meta2030,
      exec2030: item.indicador.exec2030 || '',
      fonteVerificacao: item.indicador.fonteVerificacao,
      objetivoId: objetivos[0]?.id || 'obj-1',
      unidadeId: 'DETEC',
      realizadoAtual: '',
      metaAtual: ''
    });
  };

  const openEditComplementaryModal = (kpi: IndicadorKPI) => {
    const hist2025 = kpi.historico?.filter((h) => h.periodo.startsWith('2025'));
    const last2025 = hist2025 && hist2025.length > 0 ? hist2025[hist2025.length - 1] : null;

    setModalForm({
      mode: 'EDIT_COMPLEMENTAR',
      targetScope: 'COMPLEMENTAR',
      id: kpi.id,
      codigo: kpi.codigo,
      nome: kpi.nome,
      unidadeMedida: kpi.unidadeMedida,
      linhaBase2026: String(kpi.linhaDeBase),
      meta2025: kpi.meta2025 ?? (last2025 ? String(last2025.meta) : String(kpi.linhaDeBase || '')),
      exec2025: kpi.exec2025 ?? (last2025 ? String(last2025.realizado) : ''),
      meta2026: kpi.meta2026 ?? String(kpi.meta),
      exec2026: kpi.exec2026 ?? String(kpi.realizado),
      meta2027: kpi.meta2027 ?? '',
      exec2027: kpi.exec2027 ?? '',
      meta2028: kpi.meta2028 ?? '',
      exec2028: kpi.exec2028 ?? '',
      meta2029: kpi.meta2029 ?? '',
      exec2029: kpi.exec2029 ?? '',
      meta2030: kpi.meta2030 ?? '',
      exec2030: kpi.exec2030 ?? '',
      fonteVerificacao: kpi.descricao,
      objetivoId: kpi.objetivoId,
      unidadeId: kpi.unidadeId,
      realizadoAtual: String(kpi.realizado),
      metaAtual: String(kpi.meta)
    });
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm) return;

    if (modalForm.targetScope.startsWith('FICHA:')) {
      const targetFichaId = modalForm.targetScope.replace('FICHA:', '');
      const updatedInd: IndicadorMetaFicha = {
        id: modalForm.id,
        codigo: modalForm.codigo.trim(),
        nome: modalForm.nome.trim(),
        unidadeMedida: modalForm.unidadeMedida.trim(),
        linhaBase2026: modalForm.linhaBase2026.trim(),
        meta2025: modalForm.meta2025.trim(),
        exec2025: modalForm.exec2025.trim(),
        meta2026: modalForm.meta2026.trim(),
        exec2026: modalForm.exec2026.trim(),
        meta2027: modalForm.meta2027.trim(),
        exec2027: modalForm.exec2027.trim(),
        meta2028: modalForm.meta2028.trim(),
        exec2028: modalForm.exec2028.trim(),
        meta2029: modalForm.meta2029.trim(),
        exec2029: modalForm.exec2029.trim(),
        meta2030: modalForm.meta2030.trim(),
        exec2030: modalForm.exec2030.trim(),
        fonteVerificacao: modalForm.fonteVerificacao.trim()
      };

      onChangeFichas((prev) =>
        prev.map((f) => {
          // If moved from another ficha, remove from original
          if (modalForm.originalFichaId && modalForm.originalFichaId !== targetFichaId && f.id === modalForm.originalFichaId) {
            return {
              ...f,
              indicadoresMetas: f.indicadoresMetas.filter((ind) => ind.id !== updatedInd.id)
            };
          }
          if (f.id !== targetFichaId) return f;
          const exists = f.indicadoresMetas.some((ind) => ind.id === updatedInd.id);
          return {
            ...f,
            indicadoresMetas: exists
              ? f.indicadoresMetas.map((ind) => (ind.id === updatedInd.id ? updatedInd : ind))
              : [...f.indicadoresMetas, updatedInd]
          };
        })
      );
    } else {
      const existing = kpis.find((k) => k.id === modalForm.id);
      const baseNum = parseKpiNumericValue(modalForm.linhaBase2026) ?? existing?.linhaDeBase ?? 0;
      const metaNum =
        parseKpiNumericValue(modalForm.metaAtual) ??
        parseKpiNumericValue(modalForm.meta2026) ??
        parseKpiNumericValue(modalForm.meta2027) ??
        existing?.meta ??
        100;
      const realNum =
        parseKpiNumericValue(modalForm.realizadoAtual) ??
        parseKpiNumericValue(modalForm.exec2026) ??
        parseKpiNumericValue(modalForm.exec2025) ??
        existing?.realizado ??
        0;
      const polaridade = existing?.polaridade || 'MAIOR_MELHOR';

      const newKpi: IndicadorKPI = {
        id: modalForm.id,
        codigo: modalForm.codigo.trim(),
        nome: modalForm.nome.trim(),
        descricao: modalForm.fonteVerificacao.trim() || existing?.descricao || 'Indicador estratégico complementar do painel.',
        objetivoId: modalForm.objetivoId,
        unidadeId: modalForm.unidadeId,
        meta: metaNum,
        realizado: realNum,
        linhaDeBase: baseNum,
        unidadeMedida: modalForm.unidadeMedida.trim(),
        polaridade,
        frequencia: existing?.frequencia || 'ANUAL',
        status: computeComplementaryStatus(realNum, metaNum, polaridade),
        responsavel: existing?.responsavel || 'Gestão Estratégica SENAR-RO',
        ultimaAtualizacao: new Date().toLocaleDateString('pt-BR'),
        historico: existing?.historico || [
          { periodo: '2025', realizado: parseKpiNumericValue(modalForm.exec2025) ?? baseNum, meta: parseKpiNumericValue(modalForm.meta2025) ?? metaNum },
          { periodo: '2026', realizado: realNum, meta: metaNum }
        ],
        meta2025: modalForm.meta2025.trim(),
        exec2025: modalForm.exec2025.trim(),
        meta2026: modalForm.meta2026.trim(),
        exec2026: modalForm.exec2026.trim(),
        meta2027: modalForm.meta2027.trim(),
        exec2027: modalForm.exec2027.trim(),
        meta2028: modalForm.meta2028.trim(),
        exec2028: modalForm.exec2028.trim(),
        meta2029: modalForm.meta2029.trim(),
        exec2029: modalForm.exec2029.trim(),
        meta2030: modalForm.meta2030.trim(),
        exec2030: modalForm.exec2030.trim()
      };

      onSaveComplementaryKpi(newKpi, modalForm.mode === 'CREATE');
    }

    setModalForm(null);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Métricas e Resultados</span>
            <span aria-hidden="true">·</span>
            <span>Fichas Técnicas & Painel Executivo (2025–2030)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
            Indicadores de Desempenho, Linhas de Base e Metas Anuais
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Escopo integrado às metas definidas nas Fichas Técnicas de cada Objetivo Estratégico (2027–2030), com acompanhamento da execução de 2025 e 2026 e atualização automática dos gráficos em tempo real.
          </p>
        </div>

        {/* Global Summary Strip */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center min-w-[115px] shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">Aderência Global</span>
            <span className="text-xl font-extrabold text-[#006837] font-mono tabular-nums">
              {summaryStats.aderencia}%
            </span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center min-w-[115px] shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">No Rumo / Meta</span>
            <span className="text-xl font-extrabold text-teal-700 font-mono tabular-nums">
              {summaryStats.onTrack} / {summaryStats.total}
            </span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center min-w-[115px] shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">Exibidos</span>
            <span className="text-xl font-extrabold text-slate-800 font-mono tabular-nums">
              {filteredItems.length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar with Dropdown Menu by Strategic Objective + Search + Include */}
      <div className="mt-8 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        {/* Dropdown Menu by Strategic Objective */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 min-w-0">
          <label
            htmlFor="kpi-objetivo-select"
            className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5 shrink-0"
          >
            <Target className="w-4 h-4 text-[#006837]" />
            <span>Objetivo Estratégico:</span>
          </label>
          <select
            id="kpi-objetivo-select"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full lg:max-w-xl px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006837]/30 cursor-pointer"
          >
            <option value="TODOS">
              Todos os Indicadores ({totalFichaKpis + kpis.length} metas: {totalFichaKpis} das Fichas Técnicas + {kpis.length} do Painel)
            </option>

            <optgroup label="Fichas Técnicas por Objetivo Estratégico (2027–2030)">
              {fichas.map((ficha) => (
                <option key={ficha.id} value={`FICHA:${ficha.id}`}>
                  {PERSPECTIVA_LABEL[ficha.perspectivaBsc]} · OE {ficha.codigoObjetivo} — {ficha.nomeObjetivo} ({ficha.indicadoresMetas.length})
                </option>
              ))}
            </optgroup>

            <optgroup label="Metas do Painel (Não constantes nas Fichas Técnicas)">
              <option value="COMPLEMENTARES">
                Todas as Metas Complementares do Painel ({kpis.length})
              </option>
              {objetivos.map((obj) => {
                const count = kpis.filter((k) => k.objetivoId === obj.id).length;
                if (count === 0) return null;
                return (
                  <option key={obj.id} value={`OBJ:${obj.id}`}>
                    Painel · {obj.codigo} — {obj.titulo} ({count})
                  </option>
                );
              })}
            </optgroup>
          </select>
        </div>

        {/* Search + Add Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por código, meta ou fonte..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006837]/30 transition-all"
            />
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="px-3.5 py-2 text-xs font-bold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Incluir Meta</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="mt-6 p-10 bg-white rounded-xl border border-slate-200 text-center">
          <Layers className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-800">
            Nenhum indicador encontrado para este filtro.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Selecione outro objetivo estratégico no menu suspenso ou clique em &ldquo;Incluir Meta&rdquo;.
          </p>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
        {filteredItems.map((item) => {
          if (item.kind === 'FICHA') {
            const { fichaId, codigoObjetivo, nomeObjetivo, perspectivaBsc, indicador } = item;
            const itemKey = `FICHA:${fichaId}:${indicador.id}`;
            const isInlineEditing = inlineEditKey === itemKey;
            const isConfirmingDelete = confirmDeleteKey === itemKey;
            const analytics = buildFichaKpiAnalytics(indicador);

            return (
              <div
                key={itemKey}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Header: Code, Objective Badge & Dynamic Status */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-white bg-[#006837] px-2 py-0.5 rounded">
                        {indicador.codigo}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                        OE {codigoObjetivo} · {PERSPECTIVA_LABEL[perspectivaBsc]}
                      </span>
                    </div>
                    <StatusBadge status={analytics.status} />
                  </div>

                  {/* Objective & Indicator Title */}
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate" title={nomeObjetivo}>
                    {nomeObjetivo}
                  </p>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mt-0.5">
                    {indicador.nome}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Unidade: <strong className="text-slate-700">{indicador.unidadeMedida}</strong> · Fonte: {indicador.fonteVerificacao || '—'}
                  </p>

                  {/* 2025 / 2026 Execution & Linha Base Summary */}
                  <div className="mt-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2.5">
                    {/* 2025–2030 Forecast vs Execution Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center">
                      {(['2025', '2026', '2027', '2028', '2029', '2030'] as const).map((yr) => {
                        const metaKey = `meta${yr}` as keyof IndicadorMetaFicha;
                        const execKey = `exec${yr}` as keyof IndicadorMetaFicha;
                        const metaVal =
                          (indicador[metaKey] as string) ||
                          (yr === '2026' ? indicador.linhaBase2026 : '') ||
                          '';
                        const execVal = (indicador[execKey] as string) || '';

                        return (
                          <div
                            key={yr}
                            className={`rounded-md p-1.5 border ${
                              yr === '2030'
                                ? 'bg-emerald-50/70 border-emerald-200'
                                : 'bg-white border-slate-200/80'
                            }`}
                          >
                            <span className="text-[10px] font-mono font-bold text-slate-600 block">
                              {yr}
                            </span>
                            {isInlineEditing ? (
                              <div className="space-y-1 mt-1">
                                <input
                                  type="text"
                                  value={metaVal}
                                  onChange={(e) =>
                                    handleLiveUpdateFichaIndicator(fichaId, indicador.id, {
                                      [metaKey]: e.target.value
                                    })
                                  }
                                  placeholder="Prev."
                                  title={`Previsão ${yr}`}
                                  className="w-full px-1 py-0.5 text-[11px] font-mono text-center border border-sky-300 rounded bg-sky-50/40 focus:outline-none"
                                />
                                <input
                                  type="text"
                                  value={execVal}
                                  onChange={(e) =>
                                    handleLiveUpdateFichaIndicator(fichaId, indicador.id, {
                                      [execKey]: e.target.value
                                    })
                                  }
                                  placeholder="Exec."
                                  title={`Execução ${yr}`}
                                  className="w-full px-1 py-0.5 text-[11px] font-mono font-bold text-center border border-emerald-400 rounded bg-emerald-50/40 focus:outline-none"
                                />
                              </div>
                            ) : (
                              <>
                                <div className="text-[11px] font-mono font-bold text-sky-700 truncate" title={`Previsão ${yr}: ${metaVal || 'Não informada'}`}>
                                  {metaVal || '—'}
                                </div>
                                <div
                                  className={`text-[10px] font-mono truncate ${
                                    execVal ? 'font-bold text-[#006837]' : 'text-slate-400'
                                  }`}
                                  title={`Execução ${yr}: ${execVal || 'Não informada'}`}
                                >
                                  {execVal ? `Ex: ${execVal}` : 'Ex: —'}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between items-center text-[11px] text-slate-600 mb-1">
                        <span>
                          Último ({analytics.latestExecYear}):{' '}
                          <strong className="text-slate-900 font-mono">{analytics.latestExecLabel}</strong>
                        </span>
                        <span className="font-mono font-bold text-slate-900 tabular-nums">
                          {analytics.ratioPercent.toFixed(1)}% da meta ({analytics.latestMetaYear})
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            analytics.ratioPercent >= 98
                              ? 'bg-[#008744]'
                              : analytics.ratioPercent >= 85
                              ? 'bg-teal-600'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(100, analytics.ratioPercent)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Sparkline Chart (updates automatically with forecast & execution changes) */}
                  <div className="mt-3.5">
                    <div className="text-[11px] font-semibold text-slate-500 mb-1">
                      Evolução Previsão vs. Execução (2025–2030):
                    </div>
                    <MiniSparklineChart
                      historico={analytics.points}
                      unidadeMedida={indicador.unidadeMedida}
                      height={58}
                      showLabels={true}
                      showAxisPeriods={true}
                    />
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setInlineEditKey(isInlineEditing ? null : itemKey)}
                    className={`font-semibold inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      isInlineEditing
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'text-emerald-800 hover:bg-emerald-50'
                    }`}
                  >
                    {isInlineEditing ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Concluir Edição Rápida</span>
                      </>
                    ) : (
                      <>
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Atualizar Valores</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEditFichaModal(item)}
                      className="font-semibold text-slate-700 hover:text-[#006837] hover:bg-slate-100 px-2 py-1 rounded-md inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Alterar</span>
                    </button>

                    {isConfirmingDelete ? (
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDeleteFichaIndicator(fichaId, indicador.id)}
                          className="px-2 py-1 rounded bg-rose-600 text-white font-bold hover:bg-rose-700 cursor-pointer"
                        >
                          Confirmar
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteKey(null)}
                          className="px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteKey(itemKey)}
                        className="font-semibold text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-md inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Excluir</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          // Complementary Panel KPI Card (kept from original section, enhanced with 2025/2026 & 2027-2030 + full CRUD)
          const { kpi, objetivoTitulo } = item;
          const itemKey = `COMP:${kpi.id}`;
          const isInlineEditing = inlineEditKey === itemKey;
          const isConfirmingDelete = confirmDeleteKey === itemKey;
          const chartPoints = buildComplementaryKpiPoints(kpi);
          const ratio = kpi.meta > 0 ? (kpi.realizado / kpi.meta) * 100 : 0;

          const hist2025 = kpi.historico?.filter((h) => h.periodo.startsWith('2025'));
          const defaultExec2025 =
            hist2025 && hist2025.length > 0 ? String(hist2025[hist2025.length - 1].realizado) : '';
          const displayExec2025 = kpi.exec2025 !== undefined ? kpi.exec2025 : defaultExec2025;
          const displayExec2026 = kpi.exec2026 !== undefined ? kpi.exec2026 : String(kpi.realizado);

          return (
            <div
              key={itemKey}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      {kpi.codigo}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono">
                      Painel · {kpi.unidadeId}
                    </span>
                  </div>
                  <StatusBadge status={kpi.status} />
                </div>

                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide truncate" title={objetivoTitulo}>
                  {objetivoTitulo}
                </p>
                <h3 className="text-sm font-bold text-slate-900 leading-snug mt-0.5">
                  {kpi.nome}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {kpi.descricao}
                </p>

                {/* Metrics Box */}
                <div className="mt-3.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2.5">
                  {/* Annual 2025-2030 Forecast / Exec Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center">
                    {(['2025', '2026', '2027', '2028', '2029', '2030'] as const).map((yr) => {
                      const metaKey = `meta${yr}` as keyof IndicadorKPI;
                      const execKey = `exec${yr}` as keyof IndicadorKPI;
                      const defaultMeta2025 =
                        hist2025 && hist2025.length > 0
                          ? String(hist2025[hist2025.length - 1].meta)
                          : String(kpi.linhaDeBase || '');
                      const metaVal =
                        kpi[metaKey] !== undefined
                          ? String(kpi[metaKey])
                          : yr === '2025'
                          ? defaultMeta2025
                          : yr === '2026'
                          ? String(kpi.meta)
                          : '';
                      const execVal =
                        kpi[execKey] !== undefined
                          ? String(kpi[execKey])
                          : yr === '2025'
                          ? defaultExec2025
                          : yr === '2026'
                          ? String(kpi.realizado)
                          : '';

                      return (
                        <div key={yr} className="rounded-md p-1.5 border bg-white border-slate-200/80">
                          <span className="text-[10px] font-mono font-bold text-slate-600 block">
                            {yr}
                          </span>
                          {isInlineEditing ? (
                            <div className="space-y-1 mt-1">
                              <input
                                type="text"
                                value={metaVal}
                                onChange={(e) =>
                                  handleLiveUpdateComplementaryKpi(kpi, {
                                    [metaKey]: e.target.value
                                  })
                                }
                                placeholder="Prev."
                                title={`Previsão ${yr}`}
                                className="w-full px-1 py-0.5 text-[11px] font-mono text-center border border-sky-300 rounded bg-sky-50/40 focus:outline-none"
                              />
                              <input
                                type="text"
                                value={execVal}
                                onChange={(e) =>
                                  handleLiveUpdateComplementaryKpi(kpi, {
                                    [execKey]: e.target.value
                                  })
                                }
                                placeholder="Exec."
                                title={`Execução ${yr}`}
                                className="w-full px-1 py-0.5 text-[11px] font-mono font-bold text-center border border-emerald-400 rounded bg-emerald-50/40 focus:outline-none"
                              />
                            </div>
                          ) : (
                            <>
                              <div className="text-[11px] font-mono font-bold text-sky-700 truncate" title={`Previsão ${yr}: ${metaVal || '—'}`}>
                                {metaVal || '—'}
                              </div>
                              <div
                                className={`text-[10px] font-mono truncate ${
                                  execVal ? 'font-bold text-[#006837]' : 'text-slate-400'
                                }`}
                                title={`Execução ${yr}: ${execVal || '—'}`}
                              >
                                {execVal ? `Ex: ${execVal}` : 'Ex: —'}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress percentage */}
                  <div>
                    <div className="flex justify-between items-center text-[11px] text-slate-600 mb-1">
                      <span>Execução da Meta</span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        {ratio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          ratio >= 98 ? 'bg-[#008744]' : ratio >= 88 ? 'bg-teal-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, ratio)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Live Chart */}
                <div className="mt-3.5">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1">
                    Histórico e Projeção vs. Meta:
                  </div>
                  <MiniSparklineChart
                    historico={chartPoints}
                    unidadeMedida={kpi.unidadeMedida}
                    height={58}
                    showLabels={true}
                    showAxisPeriods={chartPoints.length <= 8}
                  />
                </div>
              </div>

              {/* Footer actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                <button
                  type="button"
                  onClick={() => setInlineEditKey(isInlineEditing ? null : itemKey)}
                  className={`font-semibold inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    isInlineEditing
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'text-emerald-800 hover:bg-emerald-50'
                  }`}
                >
                  {isInlineEditing ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Concluir</span>
                    </>
                  ) : (
                    <>
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Atualizar Valores</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-slate-400 mr-1">
                    <Clock className="w-3 h-3" />
                    {kpi.ultimaAtualizacao}
                  </span>

                  <button
                    type="button"
                    onClick={() => openEditComplementaryModal(kpi)}
                    className="font-semibold text-slate-700 hover:text-[#006837] hover:bg-slate-100 px-2 py-1 rounded-md inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Alterar</span>
                  </button>

                  {isConfirmingDelete ? (
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteComplementaryKpi(kpi.id);
                          setConfirmDeleteKey(null);
                        }}
                        className="px-2 py-1 rounded bg-rose-600 text-white font-bold hover:bg-rose-700 cursor-pointer"
                      >
                        Confirmar
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteKey(null)}
                        className="px-2 py-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteKey(itemKey)}
                      className="font-semibold text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-md inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Excluir</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Modal */}
      {modalForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setModalForm(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="font-mono text-xs font-bold text-[#006837] bg-emerald-50 px-2 py-0.5 rounded">
                  {modalForm.mode === 'CREATE' ? 'NOVA META / INDICADOR' : modalForm.codigo}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {modalForm.mode === 'CREATE'
                    ? 'Incluir Indicador e Metas (2025–2030)'
                    : 'Alterar Indicador, Execução e Metas Anuais'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalForm(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="p-6 space-y-4 text-xs">
              {/* Target Objective Scope */}
              {modalForm.mode !== 'EDIT_COMPLEMENTAR' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Objetivo Estratégico / Ficha Técnica
                  </label>
                  <select
                    value={modalForm.targetScope}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, targetScope: e.target.value })
                    }
                    className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 font-semibold text-slate-900"
                  >
                    <optgroup label="Fichas Técnicas dos Objetivos Estratégicos">
                      {fichas.map((f) => (
                        <option key={f.id} value={`FICHA:${f.id}`}>
                          {PERSPECTIVA_LABEL[f.perspectivaBsc]} · OE {f.codigoObjetivo} — {f.nomeObjetivo}
                        </option>
                      ))}
                    </optgroup>
                    {modalForm.mode === 'CREATE' && (
                      <optgroup label="Metas Complementares do Painel">
                        <option value="COMPLEMENTAR">
                          Indicador Complementar do Painel (Fora das Fichas Técnicas)
                        </option>
                      </optgroup>
                    )}
                  </select>
                </div>
              )}

              {modalForm.targetScope === 'COMPLEMENTAR' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Objetivo do Painel</label>
                    <select
                      value={modalForm.objetivoId}
                      onChange={(e) =>
                        setModalForm({ ...modalForm, objetivoId: e.target.value })
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    >
                      {objetivos.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.codigo} — {o.titulo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Unidade Responsável</label>
                    <select
                      value={modalForm.unidadeId}
                      onChange={(e) =>
                        setModalForm({
                          ...modalForm,
                          unidadeId: e.target.value as SiglaUnidade
                        })
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    >
                      <option value="SUPERINTENDENCIA">SUPERINTENDENCIA</option>
                      <option value="DETEC">DETEC</option>
                      <option value="ATEG">ATEG</option>
                      <option value="DAF">DAF</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Código</label>
                  <input
                    required
                    value={modalForm.codigo}
                    onChange={(e) => setModalForm({ ...modalForm, codigo: e.target.value })}
                    placeholder="Ex: 03.5"
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Unidade de Medida</label>
                  <input
                    required
                    value={modalForm.unidadeMedida}
                    onChange={(e) =>
                      setModalForm({ ...modalForm, unidadeMedida: e.target.value })
                    }
                    placeholder="Ex: %, produtores, R$, dias"
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nome do Indicador (KPI)</label>
                <input
                  required
                  value={modalForm.nome}
                  onChange={(e) => setModalForm({ ...modalForm, nome: e.target.value })}
                  placeholder="Descreva o indicador de desempenho..."
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              {/* Linha de Base */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <label className="font-bold text-slate-700 block mb-1">Linha de Base (2026)</label>
                <input
                  required={modalForm.targetScope.startsWith('FICHA:')}
                  value={modalForm.linhaBase2026}
                  onChange={(e) =>
                    setModalForm({ ...modalForm, linhaBase2026: e.target.value })
                  }
                  placeholder="Ex: 1.574"
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white font-mono"
                />
              </div>

              {/* Previsão 2025-2030 */}
              <div>
                <label className="font-bold text-sky-900 block mb-1.5">
                  Previsão Anual (2025–2030)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {(['2025', '2026', '2027', '2028', '2029', '2030'] as const).map((yr) => {
                    const key = `meta${yr}` as keyof ModalFormState;
                    const isRequired =
                      modalForm.targetScope.startsWith('FICHA:') &&
                      Number(yr) >= 2027;
                    return (
                      <div key={yr}>
                        <span className="text-[11px] font-semibold text-sky-800 block mb-1">
                          Prev. {yr}
                        </span>
                        <input
                          required={isRequired}
                          value={modalForm[key] as string}
                          onChange={(e) =>
                            setModalForm({ ...modalForm, [key]: e.target.value })
                          }
                          placeholder="Prev."
                          className="w-full p-2 border border-sky-300 bg-sky-50/40 rounded-lg font-mono text-center"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Execução 2025-2030 */}
              <div>
                <label className="font-bold text-emerald-900 block mb-1.5">
                  Execução Realizada Anual (2025–2030)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {(['2025', '2026', '2027', '2028', '2029', '2030'] as const).map((yr) => {
                    const key = `exec${yr}` as keyof ModalFormState;
                    return (
                      <div key={yr}>
                        <span className="text-[11px] font-semibold text-emerald-800 block mb-1">
                          Exec. {yr}
                        </span>
                        <input
                          value={modalForm[key] as string}
                          onChange={(e) =>
                            setModalForm({ ...modalForm, [key]: e.target.value })
                          }
                          placeholder="Exec."
                          className="w-full p-2 border border-emerald-300 bg-emerald-50/40 rounded-lg font-mono text-center"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {modalForm.targetScope === 'COMPLEMENTAR' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Realizado Atual (Painel)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={modalForm.realizadoAtual}
                      onChange={(e) =>
                        setModalForm({ ...modalForm, realizadoAtual: e.target.value })
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Meta Contratada Atual (Painel)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={modalForm.metaAtual}
                      onChange={(e) =>
                        setModalForm({ ...modalForm, metaAtual: e.target.value })
                      }
                      className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {modalForm.targetScope === 'COMPLEMENTAR'
                    ? 'Descrição / Memória de Cálculo'
                    : 'Fonte de Verificação'}
                </label>
                <input
                  required={modalForm.targetScope.startsWith('FICHA:')}
                  value={modalForm.fonteVerificacao}
                  onChange={(e) =>
                    setModalForm({ ...modalForm, fonteVerificacao: e.target.value })
                  }
                  placeholder="Ex: Relatório SisATEG / Sistema de Gestão"
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalForm(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#006837] hover:bg-[#004d26] text-white rounded-lg font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Indicador</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
