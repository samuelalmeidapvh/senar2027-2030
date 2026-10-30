import React, { useState } from 'react';
import { ObjetivoEstrategico, IndicadorKPI } from '../../types/strategic';
import { 
  RESULTADOS_SOCIEDADE, 
  PILARES_APRENDIZADO, 
  IMPACTOS_GERAIS 
} from '../../data/initialStrategicData';
import { StatusBadge } from '../ui/StatusBadge';
import { 
  Sprout, 
  TrendingUp, 
  Users, 
  Globe2, 
  Lightbulb, 
  Cpu, 
  GraduationCap, 
  Heart, 
  Scale, 
  Megaphone, 
  ShieldCheck, 
  Coins, 
  Maximize2, 
  X, 
  Eye, 
  Layers, 
  Target, 
  ArrowRight,
  ArrowDown,
  Sparkles,
  Info
} from 'lucide-react';
import logoFaperonOficial from '../../assets/images/logo_faperon_senar_colorida_oficial.png';

interface MapaEstrategicoBSCProps {
  objetivos: ObjetivoEstrategico[];
  kpis: IndicadorKPI[];
  onSelectObjetivo: (objetivo: ObjetivoEstrategico) => void;
  selectedObjetivoId: string | null;
}

export const MapaEstrategicoBSC: React.FC<MapaEstrategicoBSCProps> = ({
  objetivos,
  kpis,
  onSelectObjetivo,
  selectedObjetivoId
}) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'official_image'>('interactive');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Official 5 objectives from the official strategic map
  const obj01 = objetivos.find(o => o.codigo === 'OE-01') || objetivos[0];
  const obj02 = objetivos.find(o => o.codigo === 'OE-02') || objetivos[1];
  const obj03 = objetivos.find(o => o.codigo === 'OE-03') || objetivos[2];
  const obj04 = objetivos.find(o => o.codigo === 'OE-04') || objetivos[3];
  const obj05 = objetivos.find(o => o.codigo === 'OE-05') || objetivos[4];

  const getObjectiveKpis = (obj?: ObjetivoEstrategico) => {
    if (!obj) return [];
    return kpis.filter(k => obj.kpisAssociados?.includes(k.id));
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sistema FAPERON · SENAR · Sindicatos Rurais</span>
            <span aria-hidden="true">·</span>
            <span>Balanced Scorecard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
            Mapa Estratégico SENAR 2027–2030
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Conhecimento, tecnologia e pessoas por um agro mais forte e sustentável. Estrutura oficial integrada em 4 perspectivas com 4 objetivos de processos internos e foco nos resultados para a sociedade.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'interactive'
                  ? 'bg-white text-emerald-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#006837]" />
              <span>Diagrama Interativo</span>
            </button>
            <button
              onClick={() => setViewMode('official_image')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'official_image'
                  ? 'bg-white text-emerald-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-[#006837]" />
              <span>Mapa Oficial Renderizado</span>
            </button>
          </div>

          <button
            onClick={() => setIsImageModalOpen(true)}
            title="Expandir Imagem Oficial em Tela Cheia"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cause-and-Effect explanation notice */}
      <div className="mt-4 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#006837] shrink-0" />
          <span>
            <strong>Fluxo de Causa e Efeito:</strong> A base de <em>Aprendizado e Crescimento</em> capacita a execução dos <em>Processos Internos (01 a 04)</em>, gerando impacto direto nas perspectivas de <em>Clientes e Sociedade</em>. Clique em qualquer objetivo para ver KPIs e 5W2H.
          </span>
        </div>
        <div className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#006837] bg-white px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
          <span>Ciclo 2027–2030</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      {viewMode === 'official_image' ? (
        /* OFFICIAL IMAGE VIEW */
        <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 relative group">
          <img
            src="/assets/aistudio/Mapa_Estrat_gico_SENAR_2027_2030_BSC_V.3_e406e592.png"
            alt="Mapa Estratégico SENAR 2027-2030 BSC Oficial"
            className="w-full h-auto object-contain max-h-[850px] mx-auto select-none"
          />
          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="px-3 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-xs border border-white/20 shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Ver em Alta Resolução</span>
            </button>
          </div>
        </div>
      ) : (
        /* INTERACTIVE STRATEGIC ARCHITECTURE (REPLICATING THE OFFICIAL DESIGN) */
        <div className="mt-6 rounded-3xl border border-slate-200 shadow-xl bg-gradient-to-b from-[#e8f5e9]/40 via-white to-[#f0fdf4]/50 p-4 sm:p-6 lg:p-8 space-y-6 overflow-hidden">
          
          {/* HEADER STRIP OF THE DIAGRAM */}
          <div className="bg-gradient-to-r from-emerald-900 via-[#006837] to-emerald-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-700/50 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/15">
                <img
                  src="/assets/aistudio/logo_sistema_branco.png"
                  alt="Sistema FAPERON SENAR Rondônia"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                  MAPA ESTRATÉGICO <span className="text-emerald-300">SENAR 2027–2030</span>
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  Conhecimento, tecnologia e pessoas por um agro mais forte e sustentável.
                </p>
              </div>
            </div>

            <div className="text-right border-t md:border-t-0 md:border-l border-white/20 pt-3 md:pt-0 md:pl-5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-300 block font-semibold">
                Slogan Institucional
              </span>
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                “JUNTOS, FORTALECENDO O PRODUTOR RURAL DE RONDÔNIA.”
              </span>
            </div>
          </div>

          {/* PROPÓSITO BANNER */}
          <div className="relative rounded-2xl bg-gradient-to-r from-[#006837] to-[#008744] text-white p-5 sm:p-6 shadow-md border border-emerald-600/60 overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
                <Target className="w-8 h-8 text-emerald-200" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-200 font-extrabold block mb-0.5">
                  PROPÓSITO INSTITUCIONAL
                </span>
                <p className="text-sm sm:text-base md:text-lg font-semibold text-white leading-relaxed">
                  “Transformar vidas e fortalecer o campo, criando oportunidades para que as pessoas prosperem por meio do conhecimento, do trabalho e do desenvolvimento sustentável.”
                </p>
              </div>
              <div className="shrink-0 hidden lg:block">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center gap-2 text-xs font-medium text-emerald-100">
                  <Sprout className="w-5 h-5 text-emerald-300" />
                  <span>Sustentabilidade Rondônia</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1. PERSPECTIVA SOCIEDADE: RESULTADOS PARA A SOCIEDADE */}
          <div className="rounded-2xl border border-emerald-300 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Ribbon Esquerdo: Perspectiva Sociedade */}
              <div className="lg:col-span-3 p-5 bg-gradient-to-r from-emerald-800 via-[#006837] to-emerald-700 text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-emerald-600/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-200 font-bold block">
                      Perspectiva 1
                    </span>
                    <h4 className="text-base font-black uppercase text-white tracking-wide">
                      SOCIEDADE
                    </h4>
                    <p className="text-xs text-emerald-100">Impacto para o Agro de Rondônia</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20 hidden lg:block">
                  <span className="text-[11px] font-mono text-emerald-200 font-medium">
                    4 Entregas de Impacto Mensurável
                  </span>
                </div>
              </div>

              {/* Conteúdo Alinhado: 4 Resultados para a Sociedade */}
              <div className="lg:col-span-9 p-4 sm:p-5 flex flex-col justify-center bg-emerald-50/20">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#006837] bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-200/80">
                    RESULTADOS PARA A SOCIEDADE
                  </span>
                  <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                    Entregas e Impactos para o Homem do Campo
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {RESULTADOS_SOCIEDADE.map((res, idx) => (
                    <div
                      key={res.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all group"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#006837] flex items-center justify-center group-hover:scale-110 transition-transform">
                          {idx === 0 && <Sprout className="w-4.5 h-4.5 text-emerald-600" />}
                          {idx === 1 && <TrendingUp className="w-4.5 h-4.5 text-teal-600" />}
                          {idx === 2 && <Users className="w-4.5 h-4.5 text-sky-600" />}
                          {idx === 3 && <Globe2 className="w-4.5 h-4.5 text-indigo-600" />}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400">#0{idx + 1}</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-emerald-900">
                        {res.titulo}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {res.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. PERSPECTIVA CLIENTES: OBJETIVO ESTRATÉGICO 01 */}
          <div className="rounded-2xl border border-sky-300 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Ribbon Esquerdo: Perspectiva Clientes */}
              <div className="lg:col-span-3 p-5 bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-600 text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-sky-500/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner">
                    <Globe2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-wider uppercase text-sky-200 font-bold block">
                      Perspectiva 2
                    </span>
                    <h4 className="text-base font-black uppercase text-white tracking-wide">
                      CLIENTES
                    </h4>
                    <p className="text-xs text-sky-100">Produtores Rurais e Sociedade</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20 hidden lg:block">
                  <span className="text-[11px] font-mono text-sky-200 font-medium">
                    Objetivo Estratégico 01
                  </span>
                </div>
              </div>

              {/* Conteúdo Alinhado: Objetivo Estratégico 01 na Perspectiva Clientes */}
              <div className="lg:col-span-9 p-4 sm:p-5 flex flex-col justify-center bg-sky-50/30">
                <div 
                  onClick={() => obj01 && onSelectObjetivo(obj01)}
                  className={`p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all shadow-xs ${
                    selectedObjetivoId === obj01?.id
                      ? 'border-sky-500 bg-sky-50/90 ring-2 ring-sky-500/30 shadow-md'
                      : 'border-sky-200 bg-white hover:border-sky-400 hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-sky-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-xs">
                        01
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-sky-100 text-sky-900 font-mono text-xs font-bold uppercase tracking-wide">
                        ASSISTÊNCIA TÉCNICA, PROMOÇÃO SOCIAL E FORMAÇÃO PROFISSIONAL
                      </span>
                      <span className="text-xs font-bold text-slate-500 font-mono hidden sm:inline">
                        DETEC / ATeG
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-sky-800 font-mono">
                        {obj01?.progressoPercentual || 92}% Meta Pactuada
                      </span>
                      <StatusBadge status={obj01?.status || 'EXCELENTE'} />
                    </div>
                  </div>

                  <h5 className="text-sm sm:text-base md:text-lg font-black text-slate-900 group-hover:text-sky-950 leading-snug tracking-tight">
                    “Fortalecer e ampliar a assistência técnica rural, a promoção social, a capacitação e a formação profissional por meio de uma gestão ágil, moderna e de qualidade nos resultados.”
                  </h5>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-sky-900">
                    <div className="flex items-center gap-1.5 font-medium text-slate-600">
                      <span>Unidade Responsável:</span>
                      <strong className="text-slate-900">DETEC / DATEG / Formação Profissional Rural & ATeG</strong>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sky-700 font-bold hover:underline shrink-0">
                      Ver Indicadores & 5W2H <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PERSPECTIVA: PROCESSOS INTERNOS (4 OBJETIVOS ESTRATÉGICOS) */}
          <div className="rounded-2xl border border-amber-300 bg-white shadow-sm overflow-hidden">
            {/* Header Strip */}
            <div className="p-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-amber-200 font-bold block">
                    Perspectiva 3
                  </span>
                  <h4 className="text-base font-black uppercase text-white tracking-wide">
                    PROCESSOS INTERNOS
                  </h4>
                  <p className="text-xs text-amber-100">Excelência e Integração Operacional</p>
                </div>
              </div>

              <div className="bg-white/15 px-3 py-1 rounded-lg backdrop-blur-xs text-xs font-bold font-mono tracking-wider text-amber-100">
                OBJETIVOS ESTRATÉGICOS (01 A 04)
              </div>
            </div>

            {/* Grid of the 4 Core Strategic Objectives */}
            <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/40">
              
              {/* 01. Gestão Institucional e Comunicação e Marketing */}
              <div
                onClick={() => obj02 && onSelectObjetivo(obj02)}
                className={`rounded-xl p-4 border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  selectedObjetivoId === obj02?.id
                    ? 'border-sky-600 bg-sky-50/50 ring-2 ring-sky-500/30 shadow-md'
                    : 'border-slate-200 bg-white hover:border-sky-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="w-8 h-8 rounded-full bg-sky-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-xs">
                      01
                    </span>
                    <StatusBadge status={obj02?.status || 'NO_RUMO'} />
                  </div>
                  <h5 className="text-xs font-extrabold uppercase tracking-tight text-slate-900 leading-snug text-sky-800">
                    GESTÃO INSTITUCIONAL E COMUNICAÇÃO E MARKETING
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    Aperfeiçoar a Gestão Integrada Institucional e o fortalecimento do Marketing e da Comunicação.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-sky-800 font-bold">
                    {obj02?.progressoPercentual}% Meta
                  </span>
                  <span className="inline-flex items-center gap-1 text-sky-700 font-semibold hover:underline">
                    Ver KPIs <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* 02. Excelência na Gestão */}
              <div
                onClick={() => obj03 && onSelectObjetivo(obj03)}
                className={`rounded-xl p-4 border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  selectedObjetivoId === obj03?.id
                    ? 'border-amber-600 bg-amber-50/50 ring-2 ring-amber-500/30 shadow-md'
                    : 'border-slate-200 bg-white hover:border-amber-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-xs">
                      02
                    </span>
                    <StatusBadge status={obj03?.status || 'EXCELENTE'} />
                  </div>
                  <h5 className="text-xs font-extrabold uppercase tracking-tight text-slate-900 leading-snug text-amber-800">
                    EXCELÊNCIA NA GESTÃO
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    Gerir com excelência os recursos financeiros e humanos, os processos operacionais com foco no aumento da maturidade de gestão.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-amber-800 font-bold">
                    {obj03?.progressoPercentual}% Meta
                  </span>
                  <span className="inline-flex items-center gap-1 text-amber-700 font-semibold hover:underline">
                    Ver KPIs <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* 03. Tecnologia e Inteligência de Dados */}
              <div
                onClick={() => obj04 && onSelectObjetivo(obj04)}
                className={`rounded-xl p-4 border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  selectedObjetivoId === obj04?.id
                    ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-500/30 shadow-md'
                    : 'border-slate-200 bg-white hover:border-purple-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-xs">
                      03
                    </span>
                    <StatusBadge status={obj04?.status || 'NO_RUMO'} />
                  </div>
                  <h5 className="text-xs font-extrabold uppercase tracking-tight text-slate-900 leading-snug text-purple-800">
                    TECNOLOGIA E INTELIGÊNCIA DE DADOS
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    Viabilizar uma arquitetura de TI moderna, integrada e de inteligência estratégica de dados.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-purple-800 font-bold">
                    {obj04?.progressoPercentual}% Meta
                  </span>
                  <span className="inline-flex items-center gap-1 text-purple-700 font-semibold hover:underline">
                    Ver KPIs <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* 04. Segurança Jurídica, Integridade e Conformidade */}
              <div
                onClick={() => obj05 && onSelectObjetivo(obj05)}
                className={`rounded-xl p-4 border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  selectedObjetivoId === obj05?.id
                    ? 'border-red-600 bg-red-50/50 ring-2 ring-red-500/30 shadow-md'
                    : 'border-slate-200 bg-white hover:border-red-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="w-8 h-8 rounded-full bg-red-600 text-white font-mono font-black text-xs flex items-center justify-center shadow-xs">
                      04
                    </span>
                    <StatusBadge status={obj05?.status || 'EXCELENTE'} />
                  </div>
                  <h5 className="text-xs font-extrabold uppercase tracking-tight text-slate-900 leading-snug text-red-800">
                    SEGURANÇA JURÍDICA, INTEGRIDADE E CONFORMIDADE
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    Garantir a segurança jurídica, a integridade da gestão e assegurar a conformidade legal, ética e operacional da organização.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-red-800 font-bold">
                    {obj05?.progressoPercentual}% Meta
                  </span>
                  <span className="inline-flex items-center gap-1 text-red-700 font-semibold hover:underline">
                    Ver KPIs <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* PERSPECTIVA: APRENDIZADO E CRESCIMENTO (BASE PARA EXECUÇÃO DA ESTRATÉGIA) */}
          <div className="rounded-2xl border border-purple-300 bg-white shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Ribbon: Perspectiva Aprendizado e Crescimento */}
              <div className="lg:col-span-3 p-4 bg-gradient-to-r from-purple-800 to-indigo-800 text-white flex items-center gap-3 border-b lg:border-b-0 lg:border-r border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-purple-200 font-bold block">
                    Perspectiva 4
                  </span>
                  <h4 className="text-sm font-black uppercase text-white leading-tight">
                    APRENDIZADO E CRESCIMENTO
                  </h4>
                  <p className="text-[11px] text-purple-200 mt-0.5">Pessoas, Tecnologia e Inovação</p>
                </div>
              </div>

              {/* Right Content: 4 Pilares da Base */}
              <div className="lg:col-span-9 p-4 sm:p-5 flex flex-col justify-center bg-slate-50/50">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    BASE PARA A EXECUÇÃO DA ESTRATÉGIA
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">Habilitadores Estruturantes</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {PILARES_APRENDIZADO.map((pilar, idx) => (
                    <div
                      key={pilar.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-xs transition-all group"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {idx === 0 && <Users className="w-4.5 h-4.5 text-purple-600" />}
                          {idx === 1 && <Lightbulb className="w-4.5 h-4.5 text-amber-600" />}
                          {idx === 2 && <Cpu className="w-4.5 h-4.5 text-indigo-600" />}
                          {idx === 3 && <GraduationCap className="w-4.5 h-4.5 text-emerald-600" />}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400">Pilar 0{idx + 1}</span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-purple-950">
                        {pilar.titulo}
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {pilar.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* BOTTOM RIBBON: RESULTADOS E IMPACTOS */}
          <div className="rounded-2xl bg-gradient-to-r from-emerald-900 via-[#006837] to-emerald-950 text-white p-4 sm:p-5 shadow-sm border border-emerald-700/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-200">
                  RESULTADOS E IMPACTOS
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 w-full">
                {IMPACTOS_GERAIS.map((imp) => (
                  <div
                    key={imp.id}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-xs flex items-center gap-2 text-xs font-bold text-white transition-colors"
                  >
                    {imp.icone === 'Sprout' && <Sprout className="w-3.5 h-3.5 text-emerald-300" />}
                    {imp.icone === 'Users' && <Users className="w-3.5 h-3.5 text-sky-300" />}
                    {imp.icone === 'Lightbulb' && <Lightbulb className="w-3.5 h-3.5 text-amber-300" />}
                    {imp.icone === 'TrendingUp' && <TrendingUp className="w-3.5 h-3.5 text-teal-300" />}
                    {imp.icone === 'Heart' && <Heart className="w-3.5 h-3.5 text-rose-300" />}
                    <span className="tracking-wide text-[11px] sm:text-xs">{imp.titulo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* LIGHTBOX MODAL FOR OFFICIAL MAP IMAGE */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">Mapa Estratégico SENAR 2027–2030 (BSC Oficial)</span>
                <span className="text-xs text-slate-400 font-mono">Alta Resolução</span>
              </div>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(92vh-60px)] flex items-center justify-center bg-slate-950">
              <img
                src="/assets/aistudio/Mapa_Estrat_gico_SENAR_2027_2030_BSC_V.3_e406e592.png"
                alt="Mapa Estratégico SENAR 2027-2030 BSC"
                className="w-full h-auto max-h-[82vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
