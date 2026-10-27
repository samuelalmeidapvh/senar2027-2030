import React from 'react';
import { MapPin, Users, Award, HeartHandshake, TrendingUp } from 'lucide-react';

export const FaixaMetricasEstrategicas: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-emerald-950 via-[#004d26] to-[#006837] text-white py-10 border-y border-emerald-800 shadow-inner relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/20 flex items-center justify-center text-emerald-300">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300 font-bold block">
                Impacto Institucional Comprovado
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Indicadores de Transformação no Agro de Rondônia
              </h3>
            </div>
          </div>
          <span className="text-xs text-emerald-200/80 font-mono">
            Ciclo Estratégico 2027–2030
          </span>
        </div>

        {/* 4-Column Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/15 hover:border-emerald-300/40 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                52 / 52
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">Municípios Cobertos</div>
            <div className="text-[11px] text-emerald-200/90 mt-0.5">100% de capilaridade estadual</div>
          </div>

          <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/15 hover:border-emerald-300/40 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                6.180+
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">Propriedades na ATeG</div>
            <div className="text-[11px] text-emerald-200/90 mt-0.5">Consultoria mensal e continuada</div>
          </div>

          <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/15 hover:border-emerald-300/40 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                28.000+
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">Produtores Qualificados</div>
            <div className="text-[11px] text-emerald-200/90 mt-0.5">Formação Profissional no Ciclo 2027–2030</div>
          </div>

          <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/15 hover:border-emerald-300/40 hover:bg-white/15 transition-all">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                91,2
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                <HeartHandshake className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">NPS do Produtor Rural</div>
            <div className="text-[11px] text-emerald-200/90 mt-0.5">Zona de excelência institucional</div>
          </div>

        </div>

      </div>
    </section>
  );
};
