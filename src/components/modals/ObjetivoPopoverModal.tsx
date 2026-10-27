import React from 'react';
import { ObjetivoEstrategico, IndicadorKPI, PlanoAcao5W2H } from '../../types/strategic';
import { StatusBadge } from '../ui/StatusBadge';
import { MiniSparklineChart } from '../ui/MiniSparklineChart';
import { X, ExternalLink, ArrowRight, Target, Briefcase } from 'lucide-react';

interface ObjetivoPopoverModalProps {
  objetivo: ObjetivoEstrategico | null;
  kpis: IndicadorKPI[];
  planos: PlanoAcao5W2H[];
  onClose: () => void;
  onNavigateToPlanos: (unidade: string) => void;
}

export const ObjetivoPopoverModal: React.FC<ObjetivoPopoverModalProps> = ({
  objetivo,
  kpis,
  planos,
  onClose,
  onNavigateToPlanos
}) => {
  if (!objetivo) return null;

  const kpisAssociados = kpis.filter(k => objetivo.kpisAssociados.includes(k.id));
  const planosAssociados = planos.filter(p => p.objetivoId === objetivo.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Popover Card Container */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#006837]">
              {objetivo.codigo}
            </span>
            <span className="text-xs font-mono text-slate-500 font-semibold">
              Perspectiva: {objetivo.perspectiva}
            </span>
          </div>

          <button
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
              <span className="font-bold text-slate-800 font-mono">{objetivo.unidadeLider}</span>
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

          {/* Associated KPIs with Mini-Charts in Real Time */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#006837]" />
              <span>Indicadores de Desempenho (Tempo Real):</span>
            </h4>

            {kpisAssociados.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Nenhum KPI diretamente vinculado a este nó.</p>
            ) : (
              <div className="space-y-4">
                {kpisAssociados.map(kpi => (
                  <div key={kpi.id} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900">{kpi.nome}</span>
                      <span className="font-mono text-xs font-semibold text-emerald-800">
                        {kpi.realizado.toLocaleString('pt-BR')} / {kpi.meta.toLocaleString('pt-BR')} {kpi.unidadeMedida}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2">{kpi.descricao}</p>
                    
                    {/* Live mini sparkline chart */}
                    <MiniSparklineChart
                      historico={kpi.historico}
                      unidadeMedida={kpi.unidadeMedida}
                      height={60}
                      showLabels={true}
                    />
                  </div>
                ))}
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
            onClick={() => {
              onNavigateToPlanos(objetivo.unidadeLider);
              onClose();
            }}
            className="text-xs font-semibold text-[#006837] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Planos de Ação da {objetivo.unidadeLider}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
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
