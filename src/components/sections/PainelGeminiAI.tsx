import React, { useState } from 'react';
import { InsightEstrategicoIA } from '../../types/strategic';
import { 
  Sparkles, 
  Database, 
  Cloud, 
  Cpu, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  RefreshCw,
  Send,
  Zap
} from 'lucide-react';

interface PainelGeminiAIProps {
  onGenerateAiAnalysis: (customPrompt?: string) => Promise<InsightEstrategicoIA | null>;
  currentInsight: InsightEstrategicoIA | null;
  loading: boolean;
}

export const PainelGeminiAI: React.FC<PainelGeminiAIProps> = ({
  onGenerateAiAnalysis,
  currentInsight,
  loading
}) => {
  const [customPrompt, setCustomPrompt] = useState<string>('');

  const handleRunAi = () => {
    onGenerateAiAnalysis(customPrompt);
  };

  return (
    <div className="w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ecossistema GCP, BigQuery & Gemini AI</span>
            <span aria-hidden="true">·</span>
            <span>Inteligência Estratégica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
            Análise Preditiva & Diagnóstico com Gemini AI
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Arquitetura escalável em nuvem que orquestra os dados do SisATEG e da Formação Profissional no Google BigQuery, aplicando modelos Gemini para auditar planos de ação e antecipar gargalos.
          </p>
        </div>

        <button
          onClick={handleRunAi}
          disabled={loading}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] disabled:opacity-50 rounded-lg transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          <span>{loading ? 'Processando Modelos...' : 'Executar Diagnóstico IA'}</span>
        </button>
      </div>

      {/* Cloud Pipeline Architecture Visual strip */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900 text-white shadow-md">
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
              1. Ingestão
            </span>
            <h4 className="text-xs font-bold text-white mt-0.5">Cloud SQL & SisATEG</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Coleta de dados de visitas de campo, notas fiscais e turmas em Rondônia.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 block">
              2. Orquestração
            </span>
            <h4 className="text-xs font-bold text-white mt-0.5">BigQuery Data Warehouse</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Star Schema, agregações temporais de safras e particionamento por município.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
              3. Inteligência
            </span>
            <h4 className="text-xs font-bold text-white mt-0.5">Gemini 3.8 Flash</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Auditoria de causa raiz em desvios de metas e planos 5W2H em risco.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 block">
              4. Decisão
            </span>
            <h4 className="text-xs font-bold text-white mt-0.5">Dashboard 3D Executivo</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Recomendações acionáveis em tempo real para a diretoria do SENAR-RO.
            </p>
          </div>
        </div>

      </div>

      {/* Custom prompt input box for executive inquiry */}
      <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
          Consulta Executiva ao Modelo Gemini:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Ex: Qual o impacto da aquisição de balanças inteligentes no retorno dos pecuaristas da ATeG?"
            className="flex-1 px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006837]/30"
          />
          <button
            onClick={handleRunAi}
            disabled={loading}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#008744] hover:bg-[#006837] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Perguntar</span>
          </button>
        </div>
      </div>

      {/* AI Diagnostic Output Area */}
      {currentInsight && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  DIAGNÓSTICO EXECUTIVO
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Gerado em {new Date(currentInsight.dataGeracao).toLocaleTimeString('pt-BR')}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                {currentInsight.titulo}
              </h3>
            </div>

            {/* Health Score Gauge */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-semibold uppercase block">
                  Saúde Estratégica
                </span>
                <span className="text-2xl font-black text-[#006837] font-mono tabular-nums">
                  {currentInsight.indiceSaudeEstrategica}/100
                </span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-[#006837] flex items-center justify-center font-bold text-xs text-[#006837]">
                BSC
              </div>
            </div>
          </div>

          {/* General Overview prose */}
          <div className="mt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Parecer Geral da Estratégia:
            </h4>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {currentInsight.diagnosticoGeral}
            </div>
          </div>

          {/* Critical Alerts */}
          {currentInsight.alertasCriticos && currentInsight.alertasCriticos.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Alertas Críticos & Desvios de Causa Raiz:</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentInsight.alertasCriticos.map((alerta, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 text-xs text-slate-800"
                  >
                    <div className="font-bold text-rose-900 mb-1">
                      {alerta.entidade}
                    </div>
                    <div className="text-slate-700 mb-2">
                      <strong className="text-rose-800 font-semibold">Desvio Identificado:</strong> {alerta.desvio}
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-rose-200/60 text-slate-800">
                      <strong className="text-emerald-800 font-semibold">Recomendação IA:</strong> {alerta.recomendacao}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agribusiness Opportunities & Immediate Priorities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-slate-100">
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2.5 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#008744]" />
                <span>Oportunidades no Agronegócio de Rondônia:</span>
              </h4>
              <ul className="space-y-2">
                {currentInsight.oportunidadesAgro.map((op, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-[#008744] font-bold">›</span>
                    <span>{op}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#006837]" />
                <span>Prioridades Imediatas para a Diretoria:</span>
              </h4>
              <ul className="space-y-2">
                {currentInsight.prioridadesImediatas.map((pr, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-[#006837] font-bold">✓</span>
                    <span>{pr}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {currentInsight.fonte && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Fonte: {currentInsight.fonte}</span>
              <span>Ciclo 2027–2030 SENAR-AR/RO</span>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
