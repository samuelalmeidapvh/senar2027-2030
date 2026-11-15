import React, { useState, useEffect } from 'react';
import {
  ObjetivoEstrategico,
  IndicadorKPI,
  IndicadorMetaFicha,
  FichaTecnicaObjetivo,
  PlanoAcao5W2H,
  PerspectivaBSCType,
  StatusEstrategico
} from '../../types/strategic';
import { StatusBadge } from '../ui/StatusBadge';
import { MiniSparklineChart } from '../ui/MiniSparklineChart';
import {
  buildComplementaryKpiPoints,
  buildFichaKpiAnalytics,
  parseKpiNumericValue
} from '../../utils/kpiChartUtils';
import {
  X,
  ArrowRight,
  Target,
  Briefcase,
  Plus,
  Edit3,
  Check,
  Trash2
} from 'lucide-react';

const ANOS_SERIE = ['2025', '2026', '2027', '2028', '2029', '2030'] as const;
type AnoSerie = (typeof ANOS_SERIE)[number];

const PERSPECTIVA_LABEL: Record<PerspectivaBSCType, string> = {
  SOCIEDADE: 'Sociedade',
  CLIENTES: 'Clientes',
  CLIENTES_SOCIEDADE: 'Clientes e Sociedade',
  PROCESSOS_INTERNOS: 'Processos Internos',
  APRENDIZADO_CRESCIMENTO: 'Aprendizado e Crescimento',
  FINANCEIRA: 'Financeira'
};

interface ObjetivoPopoverModalProps {
  objetivo: ObjetivoEstrategico | null;
  kpis: IndicadorKPI[];
  planos: PlanoAcao5W2H[];
  fichas?: FichaTecnicaObjetivo[];
  onChangeFichas?: React.Dispatch<React.SetStateAction<FichaTecnicaObjetivo[]>>;
  onClose: () => void;
  onNavigateToPlanos: (unidade: string) => void;
  onSaveKpi?: (kpi: IndicadorKPI, isNew?: boolean, targetObjetivoId?: string) => void;
  onDeleteKpi?: (kpiId: string, targetObjetivoId?: string) => void;
}

interface NewKpiDraft {
  targetFichaId: string;
  codigo: string;
  nome: string;
  descricao: string;
  unidadeMedida: string;
  linhaBase2026: string;
  fonteVerificacao: string;
  polaridade: 'MAIOR_MELHOR' | 'MENOR_MELHOR';
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
}

function getDefaultYearMeta(kpi: IndicadorKPI, yr: AnoSerie): string {
  const key = `meta${yr}` as keyof IndicadorKPI;
  const explicit = kpi[key] as string | undefined;
  if (explicit !== undefined) return explicit;
  if (yr === '2025') {
    const h25 = kpi.historico?.filter(h => h.periodo.startsWith('2025'));
    if (h25 && h25.length > 0) return String(h25[h25.length - 1].meta);
    return kpi.linhaDeBase ? String(kpi.linhaDeBase) : '';
  }
  if (yr === '2026') {
    return Number.isFinite(kpi.meta) ? String(kpi.meta) : '';
  }
  return '';
}

function getDefaultYearExec(kpi: IndicadorKPI, yr: AnoSerie): string {
  const key = `exec${yr}` as keyof IndicadorKPI;
  const explicit = kpi[key] as string | undefined;
  if (explicit !== undefined) return explicit;
  if (yr === '2025') {
    const h25 = kpi.historico?.filter(h => h.periodo.startsWith('2025'));
    if (h25 && h25.length > 0) return String(h25[h25.length - 1].realizado);
    return '';
  }
  if (yr === '2026') {
    return Number.isFinite(kpi.realizado) ? String(kpi.realizado) : '';
  }
  return '';
}

function computeStatus(
  realizadoVal: number,
  metaVal: number,
  polaridade: IndicadorKPI['polaridade']
): StatusEstrategico {
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
}

function syncKpiSummaryFields(kpi: IndicadorKPI): IndicadorKPI {
  const yearsDesc: AnoSerie[] = ['2030', '2029', '2028', '2027', '2026', '2025'];
  let latestExecNum: number | null = null;
  let matchingMetaNum: number | null = null;

  for (const yr of yearsDesc) {
    const eStr = getDefaultYearExec(kpi, yr);
    const eNum = parseKpiNumericValue(eStr);
    if (eNum !== null) {
      latestExecNum = eNum;
      const mStr = getDefaultYearMeta(kpi, yr);
      const mNum = parseKpiNumericValue(mStr);
      if (mNum !== null) matchingMetaNum = mNum;
      break;
    }
  }

  if (matchingMetaNum === null) {
    for (const yr of yearsDesc) {
      const mNum = parseKpiNumericValue(getDefaultYearMeta(kpi, yr));
      if (mNum !== null) {
        matchingMetaNum = mNum;
        break;
      }
    }
  }

  const nextRealizado = latestExecNum ?? kpi.realizado;
  const nextMeta = matchingMetaNum ?? kpi.meta;
  const nextBase = parseKpiNumericValue(kpi.meta2025) ?? parseKpiNumericValue(kpi.exec2025) ?? kpi.linhaDeBase;

  return {
    ...kpi,
    realizado: nextRealizado,
    meta: nextMeta,
    linhaDeBase: nextBase,
    status: computeStatus(nextRealizado, nextMeta, kpi.polaridade),
    ultimaAtualizacao: new Date().toLocaleDateString('pt-BR')
  };
}

export const ObjetivoPopoverModal: React.FC<ObjetivoPopoverModalProps> = ({
  objetivo,
  kpis,
  planos,
  fichas = [],
  onChangeFichas,
  onClose,
  onNavigateToPlanos,
  onSaveKpi,
  onDeleteKpi
}) => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [confirmDeleteKey, setConfirmDeleteKey] = useState<string | null>(null);
  const [selectedFichaFilter, setSelectedFichaFilter] = useState<string>('ALL');
  const [newDraft, setNewDraft] = useState<NewKpiDraft | null>(null);

  useEffect(() => {
    setEditingKey(null);
    setIsAddingNew(false);
    setConfirmDeleteKey(null);
    setSelectedFichaFilter('ALL');
    setNewDraft(null);
  }, [objetivo?.id]);

  if (!objetivo) return null;

  const effectivePerspectiva: PerspectivaBSCType =
    objetivo.id === 'obj-1' || objetivo.codigo === 'OE-01'
      ? 'CLIENTES'
      : objetivo.perspectiva;

  const isClientesObjective = effectivePerspectiva === 'CLIENTES';

  const clientesFichas = fichas.filter(f => f.perspectivaBsc === 'CLIENTES');
  const useFichasMode = isClientesObjective && clientesFichas.length > 0;

  const visibleClientesFichas =
    selectedFichaFilter === 'ALL'
      ? clientesFichas
      : clientesFichas.filter(f => f.id === selectedFichaFilter);

  const totalClientesIndicadores = clientesFichas.reduce(
    (acc, f) => acc + f.indicadoresMetas.length,
    0
  );

  const kpisAssociados = kpis.filter(k =>
    objetivo.kpisAssociados.includes(k.id)
  );
  const planosAssociados = planos.filter(p => p.objetivoId === objetivo.id);

  const handleOpenAddNew = () => {
    const defaultFichaId =
      selectedFichaFilter !== 'ALL'
        ? selectedFichaFilter
        : clientesFichas[0]?.id || '';
    const nextNum = useFichasMode
      ? totalClientesIndicadores + 1
      : kpisAssociados.length + 1;

    setEditingKey(null);
    setIsAddingNew(true);
    setNewDraft({
      targetFichaId: defaultFichaId,
      codigo: useFichasMode ? `0${nextNum}` : `KPI-${objetivo.codigo}-0${nextNum}`,
      nome: '',
      descricao: '',
      unidadeMedida: useFichasMode ? 'Percentual (%)' : '%',
      linhaBase2026: '',
      fonteVerificacao: 'Relatórios Gerenciais / Painel BI SENAR-RO',
      polaridade: 'MAIOR_MELHOR',
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
      exec2030: ''
    });
  };

  const handleFichaIndicatorPatch = (
    fichaId: string,
    indicadorId: string,
    patch: Partial<IndicadorMetaFicha>
  ) => {
    if (!onChangeFichas) return;
    onChangeFichas(prev =>
      prev.map(f => {
        if (f.id !== fichaId) return f;
        return {
          ...f,
          indicadoresMetas: f.indicadoresMetas.map(ind =>
            ind.id === indicadorId ? { ...ind, ...patch } : ind
          )
        };
      })
    );
  };

  const handleDeleteFichaIndicator = (fichaId: string, indicadorId: string) => {
    if (!onChangeFichas) return;
    onChangeFichas(prev =>
      prev.map(f => {
        if (f.id !== fichaId) return f;
        return {
          ...f,
          indicadoresMetas: f.indicadoresMetas.filter(ind => ind.id !== indicadorId)
        };
      })
    );
    setConfirmDeleteKey(null);
    if (editingKey === `${fichaId}:${indicadorId}`) {
      setEditingKey(null);
    }
  };

  const handleComplementaryFieldChange = (
    kpi: IndicadorKPI,
    field: `meta${AnoSerie}` | `exec${AnoSerie}`,
    value: string
  ) => {
    if (!onSaveKpi) return;
    const baseKpi: IndicadorKPI = {
      ...kpi,
      meta2025: kpi.meta2025 ?? getDefaultYearMeta(kpi, '2025'),
      exec2025: kpi.exec2025 ?? getDefaultYearExec(kpi, '2025'),
      meta2026: kpi.meta2026 ?? getDefaultYearMeta(kpi, '2026'),
      exec2026: kpi.exec2026 ?? getDefaultYearExec(kpi, '2026'),
      [field]: value
    };
    onSaveKpi(syncKpiSummaryFields(baseKpi), false, objetivo.id);
  };

  const handleSaveNewKpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDraft || !newDraft.nome.trim()) return;

    if (useFichasMode && onChangeFichas) {
      const targetId = newDraft.targetFichaId || clientesFichas[0]?.id;
      if (!targetId) return;

      const newFichaInd: IndicadorMetaFicha = {
        id: `kpi-ficha-${Date.now()}`,
        codigo: newDraft.codigo.trim() || '01.1',
        nome: newDraft.nome.trim(),
        unidadeMedida: newDraft.unidadeMedida.trim() || 'Percentual (%)',
        linhaBase2026:
          newDraft.linhaBase2026.trim() ||
          newDraft.meta2026.trim() ||
          newDraft.exec2026.trim() ||
          'A apurar',
        meta2025: newDraft.meta2025.trim(),
        exec2025: newDraft.exec2025.trim(),
        meta2026: newDraft.meta2026.trim(),
        exec2026: newDraft.exec2026.trim(),
        meta2027: newDraft.meta2027.trim() || 'A definir',
        exec2027: newDraft.exec2027.trim(),
        meta2028: newDraft.meta2028.trim() || 'A definir',
        exec2028: newDraft.exec2028.trim(),
        meta2029: newDraft.meta2029.trim() || 'A definir',
        exec2029: newDraft.exec2029.trim(),
        meta2030: newDraft.meta2030.trim() || 'A definir',
        exec2030: newDraft.exec2030.trim(),
        fonteVerificacao:
          newDraft.fonteVerificacao.trim() ||
          'Relatórios Gerenciais / Painel BI SENAR-RO'
      };

      onChangeFichas(prev =>
        prev.map(f =>
          f.id === targetId
            ? { ...f, indicadoresMetas: [...f.indicadoresMetas, newFichaInd] }
            : f
        )
      );

      setIsAddingNew(false);
      setNewDraft(null);
      setEditingKey(`${targetId}:${newFichaInd.id}`);
      return;
    }

    if (!onSaveKpi) return;

    const draftAsKpi: IndicadorKPI = {
      id: `kpi-${Date.now()}`,
      codigo: newDraft.codigo.trim() || `KPI-${objetivo.codigo}`,
      nome: newDraft.nome.trim(),
      descricao:
        newDraft.descricao.trim() ||
        `Indicador vinculado ao objetivo ${objetivo.codigo} — ${objetivo.titulo}.`,
      objetivoId: objetivo.id,
      unidadeId: objetivo.unidadeLider,
      meta: 0,
      realizado: 0,
      linhaDeBase: 0,
      unidadeMedida: newDraft.unidadeMedida.trim() || '%',
      polaridade: newDraft.polaridade,
      frequencia: 'ANUAL',
      status: 'NO_RUMO',
      responsavel: `${objetivo.unidadeLider} / SENAR-RO`,
      ultimaAtualizacao: new Date().toLocaleDateString('pt-BR'),
      historico: [],
      meta2025: newDraft.meta2025.trim(),
      exec2025: newDraft.exec2025.trim(),
      meta2026: newDraft.meta2026.trim(),
      exec2026: newDraft.exec2026.trim(),
      meta2027: newDraft.meta2027.trim(),
      exec2027: newDraft.exec2027.trim(),
      meta2028: newDraft.meta2028.trim(),
      exec2028: newDraft.exec2028.trim(),
      meta2029: newDraft.meta2029.trim(),
      exec2029: newDraft.exec2029.trim(),
      meta2030: newDraft.meta2030.trim(),
      exec2030: newDraft.exec2030.trim()
    };

    const synced = syncKpiSummaryFields(draftAsKpi);
    onSaveKpi(synced, true, objetivo.id);
    setIsAddingNew(false);
    setNewDraft(null);
    setEditingKey(synced.id);
  };

  const canAddIndicator = useFichasMode ? Boolean(onChangeFichas) : Boolean(onSaveKpi);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Popover Card Container */}
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#006837]">
              {objetivo.codigo}
            </span>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              Perspectiva: {PERSPECTIVA_LABEL[effectivePerspectiva] || effectivePerspectiva}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Status */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {objetivo.titulo}
              </h3>
              <StatusBadge status={objetivo.status} />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {objetivo.descricao}
            </p>
          </div>

          {/* Key Facts strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 text-[11px] font-medium block">Unidade Líder</span>
              <span className="font-bold text-slate-800 font-mono">
                {isClientesObjective ? 'DETEC / DATEG' : objetivo.unidadeLider}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] font-medium block">Progresso BSC</span>
              <span className="font-bold text-[#006837] font-mono tabular-nums">{objetivo.progressoPercentual}%</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 text-[11px] font-medium block">Impacto Institucional</span>
              <span className="font-medium text-slate-700 text-[11px] line-clamp-1">{objetivo.impactoEstrategico}</span>
            </div>
          </div>

          {/* Associated Indicators & Metas Section */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#006837]" />
                <span>
                  {useFichasMode
                    ? 'INDICADORES, LINHA DE BASE E METAS ANUAIS (2027–2030):'
                    : 'Indicadores de Desempenho (2025–2030 · Previsão e Execução):'}
                </span>
              </h4>

              {canAddIndicator && !isAddingNew && (
                <button
                  type="button"
                  onClick={handleOpenAddNew}
                  className="px-3 py-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Novo Indicador</span>
                </button>
              )}
            </div>

            {/* Ficha Filter Bar for Perspectiva Clientes */}
            {useFichasMode && (
              <div className="flex flex-wrap items-center gap-1.5 mb-3">
                <button
                  type="button"
                  onClick={() => setSelectedFichaFilter('ALL')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                    selectedFichaFilter === 'ALL'
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
                  }`}
                >
                  Todas as Fichas ({totalClientesIndicadores})
                </button>
                {clientesFichas.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFichaFilter(f.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                      selectedFichaFilter === f.id
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
                    }`}
                  >
                    {f.codigoObjetivo} · {f.nomeObjetivo} ({f.indicadoresMetas.length})
                  </button>
                ))}
              </div>
            )}

            {/* Inline Form to Add New Indicator */}
            {isAddingNew && newDraft && (
              <form
                onSubmit={handleSaveNewKpi}
                className="mb-4 p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/40 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-emerald-200/80">
                  <span className="font-bold text-emerald-950 uppercase tracking-wide text-[11px]">
                    Inserir Novo Indicador ({useFichasMode ? 'Perspectiva Clientes' : objetivo.codigo})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNew(false);
                      setNewDraft(null);
                    }}
                    className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {useFichasMode && (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Ficha Técnica Vinculada (Perspectiva Clientes)
                    </label>
                    <select
                      value={newDraft.targetFichaId}
                      onChange={(e) =>
                        setNewDraft({ ...newDraft, targetFichaId: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                    >
                      {clientesFichas.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.codigoObjetivo} — {f.nomeObjetivo} ({f.unidadeResponsavelLider})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Código</label>
                    <input
                      type="text"
                      required
                      value={newDraft.codigo}
                      onChange={(e) => setNewDraft({ ...newDraft, codigo: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Nome do Indicador</label>
                    <input
                      type="text"
                      required
                      value={newDraft.nome}
                      onChange={(e) => setNewDraft({ ...newDraft, nome: e.target.value })}
                      placeholder="Ex.: Taxa de Produtores Atendidos com Gestão Digital"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Unidade de Medida</label>
                    <input
                      type="text"
                      required
                      value={newDraft.unidadeMedida}
                      onChange={(e) => setNewDraft({ ...newDraft, unidadeMedida: e.target.value })}
                      placeholder="Ex.: Percentual (%), Produtores"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  {useFichasMode ? (
                    <>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Linha de Base (2026)
                        </label>
                        <input
                          type="text"
                          value={newDraft.linhaBase2026}
                          onChange={(e) =>
                            setNewDraft({ ...newDraft, linhaBase2026: e.target.value })
                          }
                          placeholder="Ex.: 15% ou 91,5%"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Fonte de Verificação
                        </label>
                        <input
                          type="text"
                          value={newDraft.fonteVerificacao}
                          onChange={(e) =>
                            setNewDraft({ ...newDraft, fonteVerificacao: e.target.value })
                          }
                          placeholder="SNN+, Sistego, BI..."
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Descrição</label>
                      <input
                        type="text"
                        value={newDraft.descricao}
                        onChange={(e) => setNewDraft({ ...newDraft, descricao: e.target.value })}
                        placeholder="Resumo da apuração do indicador..."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <span className="block font-semibold text-slate-700 mb-1.5">
                    Previsão Anual (Metas) e Execução (2025 a 2030)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {ANOS_SERIE.map((yr) => {
                      const metaKey = `meta${yr}` as keyof NewKpiDraft;
                      const execKey = `exec${yr}` as keyof NewKpiDraft;
                      return (
                        <div key={yr} className="p-2 rounded-lg bg-white border border-slate-200 space-y-1">
                          <span className="block text-center font-mono font-bold text-[11px] text-slate-700">
                            {yr}
                          </span>
                          <input
                            type="text"
                            value={newDraft[metaKey]}
                            onChange={(e) =>
                              setNewDraft({ ...newDraft, [metaKey]: e.target.value })
                            }
                            placeholder="Prev."
                            title={`Previsão Anual ${yr}`}
                            className="w-full px-1.5 py-1 text-[11px] font-mono text-center border border-sky-300 rounded bg-sky-50/40 focus:outline-none focus:border-sky-500"
                          />
                          <input
                            type="text"
                            value={newDraft[execKey]}
                            onChange={(e) =>
                              setNewDraft({ ...newDraft, [execKey]: e.target.value })
                            }
                            placeholder="Exec."
                            title={`Execução ${yr}`}
                            className="w-full px-1.5 py-1 text-[11px] font-mono font-bold text-center border border-emerald-400 rounded bg-emerald-50/40 focus:outline-none focus:border-emerald-600"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-emerald-200/80">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNew(false);
                      setNewDraft(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Salvar Indicador</span>
                  </button>
                </div>
              </form>
            )}

            {/* RENDER MODE 1: Official Ficha Técnica Indicators & Annual Targets (2027-2030) for Perspectiva Clientes */}
            {useFichasMode ? (
              <div className="space-y-4">
                {visibleClientesFichas.map((ficha) =>
                  ficha.indicadoresMetas.map((ind) => {
                    const rowKey = `${ficha.id}:${ind.id}`;
                    const isEditingThis = editingKey === rowKey;
                    const analytics = buildFichaKpiAnalytics(ind);

                    return (
                      <div
                        key={rowKey}
                        className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2.5"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap mb-1">
                              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-900">
                                {ficha.codigoObjetivo} · {ficha.nomeObjetivo}
                              </span>
                              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                                {ind.codigo}
                              </span>
                              <StatusBadge status={analytics.status} />
                            </div>
                            <div className="text-xs font-bold text-slate-900">{ind.nome}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Unidade: <strong className="text-slate-700">{ind.unidadeMedida}</strong> · Fonte:{' '}
                              <span>{ind.fonteVerificacao}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {onChangeFichas && (
                              <button
                                type="button"
                                onClick={() => setEditingKey(isEditingThis ? null : rowKey)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1 border transition-colors cursor-pointer ${
                                  isEditingThis
                                    ? 'bg-[#006837] text-white border-[#006837]'
                                    : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-[#006837] border-slate-200'
                                }`}
                              >
                                {isEditingThis ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Concluir</span>
                                  </>
                                ) : (
                                  <>
                                    <Edit3 className="w-3 h-3" />
                                    <span>Previsão / Execução</span>
                                  </>
                                )}
                              </button>
                            )}
                            {onChangeFichas && ficha.indicadoresMetas.length > 1 && (
                              confirmDeleteKey === rowKey ? (
                                <div className="inline-flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteFichaIndicator(ficha.id, ind.id)}
                                    className="px-2 py-1 rounded bg-rose-600 text-white text-[10px] font-bold hover:bg-rose-700 cursor-pointer"
                                  >
                                    Confirmar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteKey(null)}
                                    className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] hover:bg-slate-200 cursor-pointer"
                                  >
                                    Não
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteKey(rowKey)}
                                  title="Excluir indicador"
                                  className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )
                            )}
                          </div>
                        </div>

                        {/* Linha de Base 2026 e Metas Anuais (2027-2030) strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-[11px]">
                          <div className="px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80">
                            <span className="block text-[9px] font-mono uppercase text-slate-500 font-semibold">
                              Linha Base (2026)
                            </span>
                            <span className="font-mono font-bold text-slate-800 block truncate" title={ind.linhaBase2026}>
                              {ind.linhaBase2026 || '—'}
                            </span>
                          </div>
                          {(
                            [
                              { yr: '2027', meta: ind.meta2027, exec: ind.exec2027 },
                              { yr: '2028', meta: ind.meta2028, exec: ind.exec2028 },
                              { yr: '2029', meta: ind.meta2029, exec: ind.exec2029 },
                              { yr: '2030', meta: ind.meta2030, exec: ind.exec2030 }
                            ] as const
                          ).map((item) => (
                            <div
                              key={item.yr}
                              className="px-2 py-1.5 rounded-lg bg-sky-50/50 border border-sky-200/70"
                            >
                              <span className="block text-[9px] font-mono uppercase text-sky-800 font-bold">
                                Meta {item.yr}
                              </span>
                              <span className="font-mono font-bold text-slate-900 block truncate" title={item.meta}>
                                {item.meta || '—'}
                              </span>
                              {item.exec && (
                                <span className="font-mono text-[10px] font-semibold text-emerald-700 block truncate">
                                  Exec: {item.exec}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* 2025-2030 Inline Editor */}
                        {isEditingThis && onChangeFichas && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                              <span className="font-bold text-slate-700">
                                Incluir / Atualizar Previsão Anual e Execução (2025–2030)
                              </span>
                              <span className="text-[10px] text-slate-500">
                                <span className="text-sky-700 font-semibold">Azul: Previsão</span> ·{' '}
                                <span className="text-emerald-700 font-semibold">Verde: Execução</span>
                              </span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[11px]">
                              <label className="font-semibold text-slate-700 shrink-0">
                                Linha de Base (2026):
                              </label>
                              <input
                                type="text"
                                value={ind.linhaBase2026}
                                onChange={(e) =>
                                  handleFichaIndicatorPatch(ficha.id, ind.id, {
                                    linhaBase2026: e.target.value
                                  })
                                }
                                className="w-full sm:w-56 px-2 py-1 rounded border border-slate-300 bg-white font-mono text-[11px]"
                              />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                              {ANOS_SERIE.map((yr) => {
                                const metaField = `meta${yr}` as keyof IndicadorMetaFicha;
                                const execField = `exec${yr}` as keyof IndicadorMetaFicha;
                                const metaVal = (ind[metaField] as string | undefined) ?? '';
                                const execVal = (ind[execField] as string | undefined) ?? '';

                                return (
                                  <div
                                    key={yr}
                                    className="p-2 rounded-lg bg-white border border-slate-200 space-y-1"
                                  >
                                    <span className="block text-center font-mono font-bold text-[11px] text-slate-700">
                                      {yr}
                                    </span>
                                    <input
                                      type="text"
                                      value={metaVal}
                                      onChange={(e) =>
                                        handleFichaIndicatorPatch(ficha.id, ind.id, {
                                          [metaField]: e.target.value
                                        })
                                      }
                                      placeholder="Prev."
                                      title={`Previsão Anual ${yr}`}
                                      className="w-full px-1.5 py-1 text-[11px] font-mono text-center border border-sky-300 rounded bg-sky-50/40 focus:outline-none focus:border-sky-500"
                                    />
                                    <input
                                      type="text"
                                      value={execVal}
                                      onChange={(e) =>
                                        handleFichaIndicatorPatch(ficha.id, ind.id, {
                                          [execField]: e.target.value
                                        })
                                      }
                                      placeholder="Exec."
                                      title={`Execução ${yr}`}
                                      className="w-full px-1.5 py-1 text-[11px] font-mono font-bold text-center border border-emerald-400 rounded bg-emerald-50/40 focus:outline-none focus:border-emerald-600"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Live 2025-2030 Dual-Line Chart (Previsão Anual vs Execução) */}
                        <MiniSparklineChart
                          historico={analytics.points}
                          unidadeMedida={ind.unidadeMedida}
                          height={72}
                          showLabels={true}
                          showAxisPeriods={true}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            ) : kpisAssociados.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Nenhum KPI diretamente vinculado a este nó.</p>
            ) : (
              /* RENDER MODE 2: Complementary KPIs for Processos Internos objectives */
              <div className="space-y-4">
                {kpisAssociados.map((kpi) => {
                  const isEditingThis = editingKey === kpi.id;
                  const chartPoints = buildComplementaryKpiPoints(kpi);

                  return (
                    <div key={kpi.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2.5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                              {kpi.codigo}
                            </span>
                            <span className="text-xs font-bold text-slate-900">{kpi.nome}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">{kpi.descricao}</p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-mono text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                            {kpi.realizado.toLocaleString('pt-BR')} / {kpi.meta.toLocaleString('pt-BR')} {kpi.unidadeMedida}
                          </span>
                          {onSaveKpi && (
                            <button
                              type="button"
                              onClick={() => setEditingKey(isEditingThis ? null : kpi.id)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1 border transition-colors cursor-pointer ${
                                isEditingThis
                                  ? 'bg-[#006837] text-white border-[#006837]'
                                  : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-[#006837] border-slate-200'
                              }`}
                            >
                              {isEditingThis ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Concluir</span>
                                </>
                              ) : (
                                <>
                                  <Edit3 className="w-3 h-3" />
                                  <span>Previsão / Execução</span>
                                </>
                              )}
                            </button>
                          )}
                          {onDeleteKpi && kpisAssociados.length > 1 && (
                            confirmDeleteKey === kpi.id ? (
                              <div className="inline-flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    onDeleteKpi(kpi.id, objetivo.id);
                                    setConfirmDeleteKey(null);
                                  }}
                                  className="px-2 py-1 rounded bg-rose-600 text-white text-[10px] font-bold hover:bg-rose-700 cursor-pointer"
                                >
                                  Confirmar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteKey(null)}
                                  className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-[10px] hover:bg-slate-200 cursor-pointer"
                                >
                                  Não
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteKey(kpi.id)}
                                title="Excluir indicador"
                                className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* 2025-2030 Forecast vs Execution Inputs */}
                      {isEditingThis && onSaveKpi && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                            <span className="font-bold text-slate-700">
                              Incluir / Atualizar Previsão Anual e Execução (2025–2030)
                            </span>
                            <span className="text-[10px] text-slate-500">
                              <span className="text-sky-700 font-semibold">Azul: Previsão</span> ·{' '}
                              <span className="text-emerald-700 font-semibold">Verde: Execução</span>
                            </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                            {ANOS_SERIE.map((yr) => {
                              const metaField = `meta${yr}` as `meta${AnoSerie}`;
                              const execField = `exec${yr}` as `exec${AnoSerie}`;
                              const metaVal = getDefaultYearMeta(kpi, yr);
                              const execVal = getDefaultYearExec(kpi, yr);

                              return (
                                <div key={yr} className="p-2 rounded-lg bg-white border border-slate-200 space-y-1">
                                  <span className="block text-center font-mono font-bold text-[11px] text-slate-700">
                                    {yr}
                                  </span>
                                  <input
                                    type="text"
                                    value={metaVal}
                                    onChange={(e) => handleComplementaryFieldChange(kpi, metaField, e.target.value)}
                                    placeholder="Prev."
                                    title={`Previsão ${yr}`}
                                    className="w-full px-1.5 py-1 text-[11px] font-mono text-center border border-sky-300 rounded bg-sky-50/40 focus:outline-none focus:border-sky-500"
                                  />
                                  <input
                                    type="text"
                                    value={execVal}
                                    onChange={(e) => handleComplementaryFieldChange(kpi, execField, e.target.value)}
                                    placeholder="Exec."
                                    title={`Execução ${yr}`}
                                    className="w-full px-1.5 py-1 text-[11px] font-mono font-bold text-center border border-emerald-400 rounded bg-emerald-50/40 focus:outline-none focus:border-emerald-600"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Live 2025-2030 Dual-Line Chart (Previsão Anual vs Execução) */}
                      <MiniSparklineChart
                        historico={chartPoints}
                        unidadeMedida={kpi.unidadeMedida}
                        height={72}
                        showLabels={true}
                        showAxisPeriods={true}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Linked Action Plans (5W2H) */}
          {planosAssociados.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-700" />
                <span>Planos de Ação 5W2H Vinculados:</span>
              </h4>

              <div className="space-y-2">
                {planosAssociados.map(p => (
                  <div key={p.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-slate-500 mr-2">{p.codigo}</span>
                      <strong className="text-slate-800">{p.titulo}</strong>
                    </div>
                    <span className="font-mono font-semibold text-[#006837] tabular-nums">{p.progressoPercentual}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onNavigateToPlanos(objetivo.unidadeLider);
              onClose();
            }}
            className="text-xs font-semibold text-[#006837] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Planos de Ação da {isClientesObjective ? 'DETEC / DATEG' : objetivo.unidadeLider}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
