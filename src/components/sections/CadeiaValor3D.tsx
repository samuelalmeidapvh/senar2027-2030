import React, { useState } from 'react';
import { ProcessoFinalistico, UsuarioAutenticado } from '../../types/strategic';
import { 
  GraduationCap, 
  HeartHandshake, 
  TrendingUp, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers,
  Plus,
  Edit3,
  RotateCcw,
  Target,
  Users,
  Cpu,
  ShieldCheck,
  Briefcase,
  Award,
  ChevronRight,
  SlidersHorizontal,
  Workflow
} from 'lucide-react';
import imageAteg from '../../assets/images/senar_ateg_field_1791657060120.jpg';
import imageTraining from '../../assets/images/senar_rural_training_1791657074499.jpg';
import imageHero from '../../assets/images/senar_hero_field_1791657047722.jpg';

interface CadeiaValor3DProps {
  processos: ProcessoFinalistico[];
  usuarioAtivo: UsuarioAutenticado | null;
  onSelectProcesso: (processo: ProcessoFinalistico) => void;
  onEditProcesso?: (processo: ProcessoFinalistico) => void;
  onNewProcesso?: () => void;
  onResetProcessos?: () => void;
}

export const CadeiaValor3D: React.FC<CadeiaValor3DProps> = ({
  processos,
  usuarioAtivo,
  onSelectProcesso,
  onEditProcesso,
  onNewProcesso,
  onResetProcessos
}) => {
  const [selectedId, setSelectedId] = useState<string>(processos[0]?.id || 'proc-1');
  const [activeView, setActiveView] = useState<'esteira3d' | 'matriz'>('esteira3d');
  const [categoriaFiltro, setCategoriaFiltro] = useState<'TODOS' | 'FINALISTICOS' | 'SUPORTE'>('TODOS');

  const selectedProc = processos.find(p => p.id === selectedId) || processos[0];

  const getIcon = (sigla: string, customIcon?: string) => {
    if (customIcon === 'Users' || sigla === 'GE-PPF') return <Users className="w-5 h-5 text-indigo-700" />;
    if (customIcon === 'Cpu' || sigla === 'GIT') return <Cpu className="w-5 h-5 text-blue-700" />;
    if (customIcon === 'ShieldCheck' || sigla === 'CCI') return <ShieldCheck className="w-5 h-5 text-emerald-800" />;
    if (customIcon === 'Briefcase' || sigla === 'GSA') return <Briefcase className="w-5 h-5 text-amber-700" />;
    if (customIcon === 'Award') return <Award className="w-5 h-5 text-[#006837]" />;
    
    switch (sigla) {
      case 'FPR':
        return <GraduationCap className="w-5 h-5 text-[#006837]" />;
      case 'PS':
        return <HeartHandshake className="w-5 h-5 text-[#008744]" />;
      case 'ATEG':
        return <TrendingUp className="w-5 h-5 text-[#006837]" />;
      case 'EDUC-INOV':
        return <Lightbulb className="w-5 h-5 text-[#D97706]" />;
      default:
        return <Layers className="w-5 h-5 text-[#006837]" />;
    }
  };

  const isGestor = usuarioAtivo && usuarioAtivo.role !== 'VISITANTE_PUBLICO';

  const processosFiltrados = processos.filter(p => {
    if (categoriaFiltro === 'FINALISTICOS') return p.categoria !== 'GESTAO_SUPORTE';
    if (categoriaFiltro === 'SUPORTE') return p.categoria === 'GESTAO_SUPORTE';
    return true;
  });

  const countFinalisticos = processos.filter(p => p.categoria !== 'GESTAO_SUPORTE').length;
  const countSuporte = processos.filter(p => p.categoria === 'GESTAO_SUPORTE').length;

  return (
    <div className="w-full">
      
      {/* Header of Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Macroarquitetura Institucional</span>
            <span aria-hidden="true">·</span>
            <span>Cadeia de Valor 3D</span>
            <span aria-hidden="true">·</span>
            <span>Ciclo 2027–2030</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
            Cadeia de Valor: Processos Finalísticos & Suporte Operacional
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Macroarquitetura integrada do SENAR-AR/RO: 4 processos finalísticos gerando valor direto ao produtor no campo e 4 processos corporativos de gestão e suporte operacional que asseguram excelência em pessoas, finanças, tecnologia, compliance e articulação com os Sindicatos Rurais.
          </p>
        </div>

        {/* View Switcher and CMS Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Switcher */}
          <div className="p-1 bg-white border border-slate-200 rounded-xl shadow-2xs flex items-center gap-1">
            <button
              onClick={() => setActiveView('esteira3d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeView === 'esteira3d'
                  ? 'bg-[#006837] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Esteira 3D Espacial
            </button>
            <button
              onClick={() => setActiveView('matriz')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeView === 'matriz'
                  ? 'bg-[#006837] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Matriz Operacional
            </button>
          </div>

          {/* CMS Buttons for authenticated users */}
          {isGestor && (
            <div className="flex items-center gap-2">
              {onNewProcesso && (
                <button
                  onClick={onNewProcesso}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                  title="Adicionar novo macroprocesso na Cadeia de Valor"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Novo Processo</span>
                </button>
              )}
              {onResetProcessos && (
                <button
                  onClick={() => {
                    if (confirm('Deseja restaurar os 8 macroprocessos da Cadeia de Valor (4 finalísticos e 4 de gestão/suporte) padrão do SENAR-AR/RO?')) {
                      onResetProcessos();
                    }
                  }}
                  className="p-1.5 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  title="Restaurar dados institucionais originais"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs by Macroprocess Category */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-400 flex items-center gap-1 mr-1 px-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Filtro:</span>
          </span>
          <button
            onClick={() => setCategoriaFiltro('TODOS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              categoriaFiltro === 'TODOS'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Cadeia Completa ({processos.length})
          </button>
          <button
            onClick={() => setCategoriaFiltro('FINALISTICOS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              categoriaFiltro === 'FINALISTICOS'
                ? 'bg-[#006837] text-white shadow-xs'
                : 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-950'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>4 Processos Finalísticos</span>
            <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-white/20">
              {countFinalisticos}
            </span>
          </button>
          <button
            onClick={() => setCategoriaFiltro('SUPORTE')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              categoriaFiltro === 'SUPORTE'
                ? 'bg-blue-800 text-white shadow-xs'
                : 'text-blue-800 hover:bg-blue-50 hover:text-blue-950'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>4 Gestão & Suporte Operacional</span>
            <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-white/20">
              {countSuporte}
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-500 px-2">
          <span>{processosFiltrados.length} processos exibidos</span>
        </div>
      </div>

      {/* VIEW 1: ESTEIRA 3D ESPACIAL */}
      {activeView === 'esteira3d' && (
        <>
          {/* Spatial 3D Pipeline Container */}
          <div className="mt-6 relative perspective-[1200px]">
            
            {/* Stage Connection Banner */}
            {categoriaFiltro !== 'SUPORTE' && (
              <div className="hidden lg:flex items-center justify-between mb-3 px-4 py-1.5 bg-emerald-50/70 rounded-lg border border-emerald-100 text-[11px] font-mono font-semibold text-emerald-900 uppercase tracking-wider">
                <span className="flex items-center gap-1">01. Diagnóstico & FPR</span>
                <ChevronRight className="w-4 h-4 text-emerald-500" />
                <span>02. Promoção Social & Cidadania</span>
                <ChevronRight className="w-4 h-4 text-emerald-500" />
                <span>03. Assistência Técnica & Gerencial (ATeG)</span>
                <ChevronRight className="w-4 h-4 text-emerald-500" />
                <span>04. Educação Formal & Inovação</span>
              </div>
            )}

            {/* 3D Cards Grid (Responsively accommodating all 8 or filtered cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {processosFiltrados.map((proc, index) => {
                const isSelected = proc.id === selectedId;
                const isSuporte = proc.categoria === 'GESTAO_SUPORTE';
                
                return (
                  <div
                    key={proc.id}
                    onClick={() => {
                      setSelectedId(proc.id);
                      onSelectProcesso(proc);
                    }}
                    className={`relative cursor-pointer rounded-2xl p-5 transition-all text-left border ${
                      isSelected
                        ? isSuporte
                          ? 'bg-gradient-to-b from-white to-blue-50/50 border-blue-600 shadow-xl shadow-blue-950/10 ring-2 ring-blue-600/25 -translate-y-2'
                          : 'bg-gradient-to-b from-white to-emerald-50/40 border-[#006837] shadow-xl shadow-emerald-950/10 ring-2 ring-[#006837]/25 -translate-y-2'
                        : isSuporte
                          ? 'bg-white/95 hover:bg-white border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md hover:-translate-y-1'
                          : 'bg-white/95 hover:bg-white border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md hover:-translate-y-1'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Top status & badge */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="font-mono text-xs font-semibold text-slate-400">
                        {`0${index + 1}. ${isSuporte ? 'SUPORTE' : 'FINALÍSTICO'}`}
                      </span>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isSelected 
                          ? isSuporte 
                            ? 'bg-blue-700 text-white shadow-2xs'
                            : 'bg-[#006837] text-white shadow-2xs' 
                          : isSuporte
                            ? 'text-blue-900 bg-blue-50 border border-blue-200/60'
                            : 'text-emerald-800 bg-emerald-50 border border-emerald-200/60'
                      }`}>
                        {proc.sigla}
                      </span>
                    </div>

                    {/* Icon & Code */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected 
                          ? isSuporte ? 'bg-blue-100 shadow-2xs' : 'bg-emerald-100 shadow-2xs' 
                          : 'bg-slate-100'
                      }`}>
                        {getIcon(proc.sigla, proc.icone)}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-600 block">
                          {proc.codigo}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                          {isSuporte ? 'Suporte Operacional' : 'Processo Finalístico'}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 min-h-[44px]">
                      {proc.nome}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed min-h-[32px]">
                      {proc.descricao}
                    </p>

                    {/* Quick Metric Tag */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        {proc.metasGerais?.length || 0} Metas
                      </span>
                      <div className={`flex items-center gap-1.5 font-semibold ${
                        isSuporte ? 'text-blue-800' : 'text-[#006837]'
                      }`}>
                        <span>{isSelected ? 'Ativo na Visão' : 'Explorar'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Direct Quick Edit for Gestores */}
                    {isGestor && onEditProcesso && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProcesso(proc);
                        }}
                        className="absolute top-3.5 right-14 p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Editar processo no CMS"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Process Expanded Detail Box */}
          {selectedProc && (
            <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left detail content */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                          selectedProc.categoria === 'GESTAO_SUPORTE'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {selectedProc.codigo}
                        </span>
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                          {selectedProc.sigla}
                        </span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                          selectedProc.categoria === 'GESTAO_SUPORTE'
                            ? 'bg-indigo-50 text-indigo-800 border border-indigo-200/60'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                        }`}>
                          {selectedProc.categoria === 'GESTAO_SUPORTE' ? 'Processo de Suporte & Gestão' : 'Processo Finalístico'}
                        </span>
                        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                          Público: {selectedProc.publicoAlvo}
                        </span>
                      </div>

                      {/* Edit button in detail view */}
                      {isGestor && onEditProcesso && (
                        <button
                          onClick={() => onEditProcesso(selectedProc)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#006837] hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar no CMS</span>
                        </button>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3">
                      {selectedProc.nome}
                    </h3>

                    <div className="mt-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-[#006837]" />
                        <span>Missão na Cadeia de Valor Institucional:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {selectedProc.missaoDoProcesso}
                      </p>
                    </div>

                    {/* Atividades Chave */}
                    <div className="mt-5">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#008744]" />
                        <span>
                          {selectedProc.categoria === 'GESTAO_SUPORTE' 
                            ? 'Atividades Chave e Rotinas Operacionais:' 
                            : 'Atividades e Entregas Chave no Campo:'}
                        </span>
                      </h4>
                      <ul className="space-y-2">
                        {selectedProc.atividadesChave.map((ativ, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                              selectedProc.categoria === 'GESTAO_SUPORTE' ? 'bg-blue-600' : 'bg-emerald-600'
                            }`} />
                            <span>{ativ}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metas Principais */}
                    <div className="mt-5">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                        <span>Metas Estratégicas do Ciclo 2027–2030:</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProc.metasGerais.map((meta, i) => (
                          <span key={i} className={`text-xs px-3 py-1 rounded-lg font-medium border ${
                            selectedProc.categoria === 'GESTAO_SUPORTE'
                              ? 'bg-blue-50 text-blue-950 border-blue-200/80'
                              : 'bg-emerald-50 text-emerald-950 border border-emerald-200/80'
                          }`}>
                            {meta}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Vinculado aos Objetivos do BSC e Indicadores de Rondônia</span>
                    <a href="#mapa-bsc" className="font-semibold text-[#006837] hover:underline flex items-center gap-1">
                      Localizar no Mapa BSC <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right Photo Preview */}
                <div className="lg:col-span-5 relative min-h-[300px] bg-slate-900">
                  <img
                    src={
                      selectedProc.sigla === 'ATEG' 
                        ? imageAteg 
                        : selectedProc.categoria === 'GESTAO_SUPORTE'
                          ? imageHero
                          : imageTraining
                    }
                    alt={selectedProc.nome}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider">
                      {selectedProc.categoria === 'GESTAO_SUPORTE'
                        ? 'Alicerce Corporativo · Suporte Operacional'
                        : 'Atuação em Campo · Rondônia'}
                    </span>
                    <p className="text-xs font-semibold mt-1 text-slate-100 leading-snug">
                      {selectedProc.categoria === 'GESTAO_SUPORTE'
                        ? 'Sustentabilidade financeira, modernização digital de TI, integridade regulatória e logística integrada com a FAPERON e os 52 Sindicatos Rurais.'
                        : selectedProc.sigla === 'ATEG'
                          ? 'Assistência Técnica e Gerencial continuada com laudos econômicos e produtivos na propriedade rural.'
                          : 'Treinamentos práticos de Formação Profissional e Cidadania em parceria com os 52 Sindicatos Rurais.'}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </>
      )}

      {/* VIEW 2: MATRIZ OPERACIONAL */}
      {activeView === 'matriz' && (
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Matriz Comparativa dos Macroprocessos da Cadeia de Valor
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Visão consolidada de responsabilidades, público-alvo e metas da esteira de valor institucional
              </p>
            </div>
            {isGestor && onNewProcesso && (
              <button
                onClick={onNewProcesso}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Processo</span>
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Código / Sigla</th>
                  <th className="p-3.5">Classificação</th>
                  <th className="p-3.5">Nome do Macroprocesso</th>
                  <th className="p-3.5">Público-Alvo</th>
                  <th className="p-3.5">Missão Institucional</th>
                  <th className="p-3.5">Metas 2027–2030</th>
                  {isGestor && <th className="p-3.5 text-right">Ações CMS</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {processosFiltrados.map(proc => {
                  const isSuporte = proc.categoria === 'GESTAO_SUPORTE';
                  return (
                    <tr key={proc.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold whitespace-nowrap">
                        <span className={isSuporte ? 'text-blue-900' : 'text-emerald-800'}>
                          {proc.codigo} · {proc.sigla}
                        </span>
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          isSuporte 
                            ? 'bg-blue-50 text-blue-900 border border-blue-200' 
                            : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        }`}>
                          {isSuporte ? 'Gestão / Suporte' : 'Finalístico'}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                        {proc.nome}
                      </td>
                      <td className="p-3.5 max-w-xs text-slate-600">
                        {proc.publicoAlvo}
                      </td>
                      <td className="p-3.5 max-w-sm text-slate-600">
                        {proc.missaoDoProcesso}
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-col gap-1 max-w-xs">
                          {proc.metasGerais.slice(0, 2).map((m, i) => (
                            <span key={i} className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>
                      {isGestor && (
                        <td className="p-3.5 text-right whitespace-nowrap">
                          {onEditProcesso && (
                            <button
                              onClick={() => onEditProcesso(proc)}
                              className="px-2.5 py-1 text-xs font-semibold text-[#006837] hover:bg-emerald-50 rounded border border-emerald-200 transition-colors cursor-pointer inline-flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Editar</span>
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
