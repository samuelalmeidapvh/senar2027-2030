import React, { useState } from 'react';
import { IndicadorKPI, SiglaUnidade, PerspectivaBSCType, UsuarioAutenticado } from '../../types/strategic';
import { StatusBadge } from '../ui/StatusBadge';
import { MiniSparklineChart } from '../ui/MiniSparklineChart';
import { 
  TrendingUp, 
  Filter, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Search
} from 'lucide-react';

interface KpiDashboardProps {
  kpis: IndicadorKPI[];
  usuarioAtivo: UsuarioAutenticado | null;
  onEditKpi: (kpi: IndicadorKPI) => void;
}

export const KpiDashboard: React.FC<KpiDashboardProps> = ({
  kpis,
  usuarioAtivo,
  onEditKpi
}) => {
  const [filterUnidade, setFilterUnidade] = useState<string>('TODAS');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredKpis = kpis.filter(k => {
    const matchUnidade = filterUnidade === 'TODAS' || k.unidadeId === filterUnidade;
    const matchSearch = searchTerm === '' || 
      k.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      k.codigo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchUnidade && matchSearch;
  });

  const totalKpis = kpis.length;
  const noRumoOuExcelente = kpis.filter(k => k.status === 'EXCELENTE' || k.status === 'NO_RUMO').length;
  const emAtencao = kpis.filter(k => k.status === 'ATENCAO').length;
  const percentualAtingimento = Math.round((noRumoOuExcelente / (totalKpis || 1)) * 100);

  return (
    <div className="w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Métricas e Resultados</span>
            <span aria-hidden="true">·</span>
            <span>Painel Executivo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
            Indicadores de Desempenho (KPIs Estratégicos)
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Monitoramento temporal do progresso real de cada objetivo estratégico do SENAR-AR/RO, com séries históricas comparativas frente às metas contratadas.
          </p>
        </div>

        {/* Global Summary Pill Strip */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center min-w-[120px] shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">Aderência Global</span>
            <span className="text-xl font-extrabold text-[#006837] font-mono tabular-nums">
              {percentualAtingimento}%
            </span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center min-w-[120px] shadow-2xs">
            <span className="text-xs text-slate-500 font-medium block">No Rumo / Meta</span>
            <span className="text-xl font-extrabold text-teal-700 font-mono tabular-nums">
              {noRumoOuExcelente} / {totalKpis}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
        
        {/* Unit Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-slate-100 rounded-lg">
          {(['TODAS', 'SUPERINTENDENCIA', 'DAF', 'DETEC', 'ATEG'] as const).map(u => {
            const labelMap: Record<string, string> = {
              TODAS: 'Todas as Unidades',
              SUPERINTENDENCIA: 'Superintendência',
              DAF: 'DAF',
              DETEC: 'DETEC',
              ATEG: 'Gerência ATeG'
            };
            const isActive = filterUnidade === u;
            return (
              <button
                key={u}
                onClick={() => setFilterUnidade(u)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {labelMap[u]}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código ou nome..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006837]/30 transition-all"
          />
        </div>

      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {filteredKpis.map(kpi => {
          const ratio = kpi.meta > 0 ? (kpi.realizado / kpi.meta) * 100 : 0;
          const variacaoBase = kpi.linhaDeBase > 0 ? (((kpi.realizado - kpi.linhaDeBase) / kpi.linhaDeBase) * 100).toFixed(1) : '+0.0';

          return (
            <div
              key={kpi.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header: Code, Unit and Status */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                      {kpi.codigo}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 font-mono">
                      {kpi.unidadeId}
                    </span>
                  </div>
                  <StatusBadge status={kpi.status} />
                </div>

                {/* Name */}
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {kpi.nome}
                </h3>

                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {kpi.descricao}
                </p>

                {/* Main Metric Highlight */}
                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block">Realizado Atual</span>
                      <span className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                        {kpi.realizado.toLocaleString('pt-BR')} <span className="text-xs font-normal text-slate-500">{kpi.unidadeMedida}</span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 font-medium block">Meta Contratada</span>
                      <span className="text-sm font-semibold text-slate-700 font-mono tabular-nums">
                        {kpi.meta.toLocaleString('pt-BR')} {kpi.unidadeMedida}
                      </span>
                    </div>
                  </div>

                  {/* Progress percentage */}
                  <div className="mt-2.5">
                    <div className="flex justify-between items-center text-[11px] text-slate-600 mb-1">
                      <span>Execução da Meta</span>
                      <span className="font-mono font-bold text-slate-900 tabular-nums">
                        {ratio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          ratio >= 98 ? 'bg-[#008744]' : ratio >= 88 ? 'bg-teal-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.min(100, ratio)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Sparkline chart of history */}
                <div className="mt-4">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1">
                    Histórico Trimestral vs. Meta:
                  </div>
                  <MiniSparklineChart
                    historico={kpi.historico}
                    unidadeMedida={kpi.unidadeMedida}
                    height={55}
                    showLabels={true}
                  />
                </div>

              </div>

              {/* Footer info & Edit trigger */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Atualizado em: {kpi.ultimaAtualizacao}</span>
                </div>

                {usuarioAtivo && usuarioAtivo.role !== 'VISITANTE_PUBLICO' && (
                  <button
                    onClick={() => onEditKpi(kpi)}
                    className="font-semibold text-[#006837] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Lançar Medição</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
