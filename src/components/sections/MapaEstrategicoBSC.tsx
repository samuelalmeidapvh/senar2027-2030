import React, { useState, useEffect } from 'react';
import { ObjetivoEstrategico, IndicadorKPI, ResultadoSociedade } from '../../types/strategic';
import { 
  RESULTADOS_SOCIEDADE, 
  PILARES_APRENDIZADO 
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
  Info,
  Edit3,
  Plus,
  Trash2,
  RotateCcw,
  Award,
  Check,
  Home
} from 'lucide-react';
import logoFaperonOficial from '../../assets/images/logo_faperon_senar_colorida_oficial.png';

type ResultadoSociedadeItem = ResultadoSociedade;

const STORAGE_KEY_RESULTADOS_SOCIEDADE = 'senar_resultados_sociedade_v1';

const DEFAULT_RESULTADOS_SOCIEDADE: ResultadoSociedadeItem[] = RESULTADOS_SOCIEDADE;

const SOCIEDADE_ICONS = [
  { value: 'Sprout', label: 'Capacitação / Agro' },
  { value: 'TrendingUp', label: 'Produtividade / Renda' },
  { value: 'Users', label: 'Famílias / Pessoas' },
  { value: 'Globe2', label: 'Competitividade / Sustentabilidade' },
  { value: 'Award', label: 'Excelência / Metas' },
  { value: 'Target', label: 'Objetivo / Foco' }
];

interface MapaEstrategicoBSCProps {
  objetivos: ObjetivoEstrategico[];
  kpis: IndicadorKPI[];
  onSelectObjetivo: (objetivo: ObjetivoEstrategico) => void;
  selectedObjetivoId: string | null;
  onOpenConsolidado2030?: () => void;
  resultadosSociedadeProp?: ResultadoSociedadeItem[];
  onChangeResultadosSociedade?: React.Dispatch<React.SetStateAction<ResultadoSociedadeItem[]>>;
}

export const MapaEstrategicoBSC: React.FC<MapaEstrategicoBSCProps> = ({
  objetivos,
  kpis,
  onSelectObjetivo,
  selectedObjetivoId,
  onOpenConsolidado2030,
  resultadosSociedadeProp,
  onChangeResultadosSociedade
}) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'official_image'>('interactive');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [internalResultadosSociedade, setInternalResultadosSociedade] = useState<ResultadoSociedadeItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESULTADOS_SOCIEDADE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback to default
    }
    return DEFAULT_RESULTADOS_SOCIEDADE;
  });

  const resultadosSociedade = resultadosSociedadeProp ?? internalResultadosSociedade;
  const setResultadosSociedade = onChangeResultadosSociedade ?? setInternalResultadosSociedade;

  const [isResultadoModalOpen, setIsResultadoModalOpen] = useState(false);
  const [editingResultado, setEditingResultado] = useState<ResultadoSociedadeItem | null>(null);
  const [formResultado, setFormResultado] = useState<ResultadoSociedadeItem>({
    id: '',
    titulo: '',
    icone: 'Sprout',
    descricao: '',
    metaTitulo: '',
    metaValor: ''
  });

  useEffect(() => {
    if (resultadosSociedadeProp !== undefined) return;
    try {
      localStorage.setItem(STORAGE_KEY_RESULTADOS_SOCIEDADE, JSON.stringify(internalResultadosSociedade));
    } catch {
      // ignore storage errors
    }
  }, [internalResultadosSociedade, resultadosSociedadeProp]);

  const renderSociedadeIcon = (icone: string, idx: number) => {
    switch (icone) {
      case 'Sprout':
        return <Sprout className="w-4.5 h-4.5 text-emerald-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4.5 h-4.5 text-teal-600" />;
      case 'Users':
        return <Users className="w-4.5 h-4.5 text-sky-600" />;
      case 'Globe2':
        return <Globe2 className="w-4.5 h-4.5 text-indigo-600" />;
      case 'Award':
        return <Award className="w-4.5 h-4.5 text-amber-600" />;
      case 'Target':
        return <Target className="w-4.5 h-4.5 text-emerald-700" />;
      default:
        if (idx === 0) return <Sprout className="w-4.5 h-4.5 text-emerald-600" />;
        if (idx === 1) return <TrendingUp className="w-4.5 h-4.5 text-teal-600" />;
        if (idx === 2) return <Users className="w-4.5 h-4.5 text-sky-600" />;
        return <Globe2 className="w-4.5 h-4.5 text-indigo-600" />;
    }
  };

  const openNewResultadoModal = () => {
    setEditingResultado(null);
    setFormResultado({
      id: `rs-${Date.now()}`,
      titulo: '',
      icone: 'Sprout',
      descricao: '',
      metaTitulo: '',
      metaValor: ''
    });
    setIsResultadoModalOpen(true);
  };

  const openEditResultadoModal = (item: ResultadoSociedadeItem) => {
    setEditingResultado(item);
    setFormResultado({
      ...item,
      metaTitulo: item.metaTitulo || '',
      metaValor: item.metaValor || ''
    });
    setIsResultadoModalOpen(true);
  };

  const handleSaveResultado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formResultado.titulo.trim()) return;
    if (editingResultado) {
      setResultadosSociedade(prev =>
        prev.map(item => (item.id === editingResultado.id ? { ...formResultado } : item))
      );
    } else {
      setResultadosSociedade(prev => [...prev, { ...formResultado }]);
    }
    setIsResultadoModalOpen(false);
    setEditingResultado(null);
  };

  const handleDeleteResultado = (id: string) => {
    setResultadosSociedade(prev => prev.filter(item => item.id !== id));
    if (editingResultado?.id === id) {
      setIsResultadoModalOpen(false);
      setEditingResultado(null);
    }
  };

  const handleResetResultados = () => {
    setResultadosSociedade(DEFAULT_RESULTADOS_SOCIEDADE);
  };

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

      {/* MAIN CONTAINER */}
      {viewMode === 'official_image' ? (
        /* OFFICIAL IMAGE VIEW */
        <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 relative group">
          <img
            src="/assets/aistudio/Mapa_Estrat_gico_SENAR_2027_2030-2_V.f2_8f00affc.png"
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

          {/* 1. PERSPECTIVA SOCIEDADE */}
          <div
            id="resultados-sociedade-bsc"
            className="rounded-2xl border border-emerald-300 bg-white shadow-sm overflow-hidden scroll-mt-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Ribbon Esquerdo: Perspectiva Sociedade (mesmo padrão das demais perspectivas, mantendo a cor verde) */}
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
                    Impacto Institucional 2030
                  </span>
                </div>
              </div>

              {/* Conteúdo Alinhado: Perspectiva Sociedade */}
              <div className="lg:col-span-9 p-5 sm:p-6 bg-white flex flex-col justify-center">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-snug">
                    GERAR VALOR E PROMOVER A TRANSFORMAÇÃO SOCIOECONÔMICA E SUSTENTÁVEL DO MEIO RURAL
                  </h4>
                  <span className="text-xl sm:text-2xl font-bold text-[#006837] font-mono tabular-nums shrink-0">
                    00
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Contribuir para transformar conhecimento em produtividade, renda, qualidade de vida e desenvolvimento sustentável para Rondônia.
                </p>

                <div className="my-5 border-t border-slate-200/80" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#006837] shrink-0" />
                      <h5 className="text-sm sm:text-base font-bold text-slate-900">
                        Capacitação
                      </h5>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Produtores mais preparados e qualificados.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#006837] shrink-0" />
                      <h5 className="text-sm sm:text-base font-bold text-slate-900">
                        Produtividade e renda
                      </h5>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Mais eficiência e prosperidade no campo.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-[#006837] shrink-0" />
                      <h5 className="text-sm sm:text-base font-bold text-slate-900">
                        Qualidade de vida
                      </h5>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Famílias rurais com melhores condições de vida.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sprout className="w-5 h-5 text-[#006837] shrink-0" />
                      <h5 className="text-sm sm:text-base font-bold text-slate-900">
                        Competitividade Sustentável
                      </h5>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Agronegócio competitivo e sustentável.
                    </p>
                  </div>
                </div>

                <div className="my-5 border-t border-slate-200/80" />

                <div>
                  <h5 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">
                    IMPACTO INSTITUCIONAL 2030
                  </h5>
                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                    Mais conhecimento, mais produtividade, mais renda, melhor qualidade de vida e um agro rondoniense mais forte e sustentável.
                  </p>
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenConsolidado2030?.();
                      }}
                      className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-900 font-bold hover:underline shrink-0 cursor-pointer"
                    >
                      Ver Indicadores <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
                    Gerir com excelência as finanças, a operação e os recursos humanos com foco no aumento da maturidade de gestão.
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
                src="/assets/aistudio/Mapa_Estrat_gico_SENAR_2027_2030-2_V.f2_8f00affc.png"
                alt="Mapa Estratégico SENAR 2027-2030 BSC"
                className="w-full h-auto max-h-[82vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INCLUIR / EDITAR RESULTADO PARA A SOCIEDADE & META */}
      {isResultadoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs"
          onClick={() => setIsResultadoModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-gradient-to-r from-[#004d26] to-[#006837] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-200" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {editingResultado ? 'Alterar Resultado & Meta (Sociedade)' : 'Incluir Novo Resultado (Sociedade)'}
                  </h4>
                  <p className="text-[11px] text-emerald-100/90">
                    Perspectiva Sociedade · Entregas e metas de impacto 2027–2030
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsResultadoModalOpen(false)}
                className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/15 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResultado} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título do Resultado
                </label>
                <input
                  type="text"
                  required
                  value={formResultado.titulo}
                  onChange={(e) => setFormResultado({ ...formResultado, titulo: e.target.value })}
                  placeholder="Ex.: Produtores rurais mais capacitados"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#006837]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Descrição
                </label>
                <textarea
                  rows={3}
                  value={formResultado.descricao}
                  onChange={(e) => setFormResultado({ ...formResultado, descricao: e.target.value })}
                  placeholder="Descreva o impacto institucional esperado..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#006837]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#006837] block">
                  Meta no Canto Superior Direito (Opcional)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Rótulo da Meta
                    </label>
                    <input
                      type="text"
                      value={formResultado.metaTitulo || ''}
                      onChange={(e) => setFormResultado({ ...formResultado, metaTitulo: e.target.value })}
                      placeholder="Ex.: Produtores Atendidos 2027–2030"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Valor da Meta
                    </label>
                    <input
                      type="text"
                      value={formResultado.metaValor || ''}
                      onChange={(e) => setFormResultado({ ...formResultado, metaValor: e.target.value })}
                      placeholder="Ex.: 42.166"
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ícone
                </label>
                <select
                  value={formResultado.icone}
                  onChange={(e) => setFormResultado({ ...formResultado, icone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                >
                  {SOCIEDADE_ICONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                {editingResultado && resultadosSociedade.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteResultado(editingResultado.id)}
                    className="px-3 py-2 rounded-lg text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Excluir</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsResultadoModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Salvar</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
