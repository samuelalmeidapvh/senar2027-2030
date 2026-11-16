import React, { useState } from 'react';
import { Target, Compass, Award, ArrowDown, Sparkles, Network, Maximize2, X } from 'lucide-react';
import heroImage from '../../assets/images/senar_rondonia_producao_final_1794686224162.jpg';
import logoFaperonOficial from '../../assets/images/logo_faperon_senar_colorida_oficial.png';

interface HeroPropositoProps {
  onExploreClick: () => void;
  onOpenGeminiClick: () => void;
  propositoData?: {
    proposito?: string;
    visao?: string;
    missao?: string;
    lema?: string;
    valores?: string;
  };
}

export const HeroProposito: React.FC<HeroPropositoProps> = ({
  onExploreClick,
  onOpenGeminiClick,
  propositoData
}) => {
  const [isOrganogramaOpen, setIsOrganogramaOpen] = useState(false);

  const lemaText = propositoData?.lema || '“Conhecimento que transforma, campo que prospera.”';
  const propositoText = propositoData?.proposito || '“Transformar vidas e fortalecer o campo, criando oportunidades para que as pessoas prosperem por meio do conhecimento, do trabalho e do desenvolvimento sustentável.”';
  const visaoText = propositoData?.visao || 'Alcançar a excelência na atuação rural, por meio da assistência, capacitação, formação e promoção social gerando resultados efetivos aos produtores.';
  const missaoText = propositoData?.missao || 'Transformar conhecimento em oportunidades para o meio rural, por meio da educação profissional, da assistência técnica, da inovação e do fortalecimento da gestão, gerando valor para as pessoas, as propriedades rurais e a sociedade.';
  const valoresText = propositoData?.valores || 'Excelência e Qualidade, Cooperação e Parceria, Compromisso com o Público Rural, Responsabilidade pelos Resultados e Valorização das Pessoas.';
  return (
    <div id="proposito" className="relative pt-24 pb-16 bg-white overflow-hidden scroll-mt-16">
      {/* Decorative top pattern subtle background */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-emerald-50/60 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Editorial kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-3">
          <span>SISTEMA FAPERON - SENAR RONDÔNIA - SINDICATOS RURAIS</span>
          <span aria-hidden="true">·</span>
          <span>Ciclo Estratégico 2027–2030</span>
        </div>

        {/* Lema do Planejamento 2027–2030 (Em destaque e centralizado no lugar do antigo slogan) */}
        <div className="max-w-3xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-emerald-100/70 to-teal-50/70 border-2 border-emerald-400/80 shadow-md flex flex-col items-center justify-center text-center gap-2 hover:border-emerald-500 transition-colors">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#006837] text-white text-[11px] font-mono uppercase tracking-widest font-extrabold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>Lema do Planejamento 2027–2030</span>
          </div>
          <p className="text-base sm:text-xl font-extrabold text-emerald-950 tracking-tight leading-snug text-balance">
            {lemaText.startsWith('“') ? lemaText : `“${lemaText}”`}
          </p>
        </div>

        {/* 2-Column Split: Headline & Purpose on Left, High-Fidelity Imagery on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Official Purpose Callout from Mapa Estratégico (Destaque Principal) */}
              <div className="w-[90%] mx-auto mt-1 px-6 py-8 sm:px-10 sm:py-10 rounded-2xl bg-gradient-to-br from-emerald-950 via-[#006837] to-emerald-700 text-white shadow-lg border border-emerald-600/50 relative overflow-hidden flex flex-col items-center justify-center text-center">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-emerald-400/15 blur-2xl pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                  <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-lg bg-white/15 border border-white/20 text-xs font-mono uppercase tracking-wider font-extrabold text-emerald-200 mb-3.5">
                    <Target className="w-4 h-4 text-emerald-300" />
                    <span>Propósito Institucional (Ciclo 2027–2030)</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold leading-snug text-white tracking-tight text-balance text-center">
                    {propositoText.startsWith('“') ? propositoText : `“${propositoText}”`}
                  </h1>
                </div>
              </div>

              {/* Strategic Pillars: Visão, Missão e Valores (Inseridos logo após o Propósito Institucional) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3.5">
                
                <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#006837] flex items-center justify-center mb-2">
                    <Compass className="w-4 h-4 text-[#006837]" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Visão Estratégica</h3>
                  <p className="mt-1.5 text-xs text-slate-700 leading-relaxed font-medium">
                    {visaoText}
                  </p>
                </div>

                <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#006837] flex items-center justify-center mb-2">
                    <Target className="w-4 h-4 text-[#006837]" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Missão Institucional</h3>
                  <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                    {missaoText}
                  </p>
                </div>

                <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-2xs">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-[#006837] flex items-center justify-center mb-2">
                    <Award className="w-4 h-4 text-[#006837]" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Valores Centrais</h3>
                  <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                    {valoresText}
                  </p>
                </div>

              </div>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                O Planejamento Estratégico do <strong className="text-slate-800 font-semibold">SENAR-AR/RO</strong> consolida a atuação articulada com a FAPERON e os 52 Sindicatos dos Produtores Rurais, unindo Assistência Técnica e Gerencial (ATeG), Formação Profissional Rural (FPR) e Promoção Social (PS).
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8">
              <button
                onClick={onExploreClick}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar Mapa BSC & Cadeia de Valor</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOrganogramaOpen(true)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-800 bg-white hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Network className="w-4 h-4 text-[#006837]" />
                <span>Estrutura Organizacional</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual High-Fidelity Asset */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md h-full min-h-[460px] max-h-[620px] bg-slate-900 group">
              <img
                src={heroImage}
                alt="Atuação produtiva do SENAR Rondônia: Café Robusta, pecuária de leite e corte, cacau, piscicultura de tambaqui e olericultura"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 pointer-events-none select-none"
              />

              {/* Botão Flutuante para Apresentar a Estrutura Organizacional */}
              <button
                onClick={() => setIsOrganogramaOpen(true)}
                className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 px-3.5 py-2 rounded-xl bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                title="Visualizar a Estrutura Organizacional do SENAR-AR/RO"
              >
                <Network className="w-3.5 h-3.5 text-emerald-400" />
                <span>Estrutura Organizacional</span>
              </button>

              {/* Logo Oficial do Sistema FAPERON / SENAR no Canto Superior Direito com Fundo Transparente */}
              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20 select-none pointer-events-none">
                <img
                  src="/assets/aistudio/logo_sistema_transparente.png"
                  alt="Sistema FAPERON · SENAR · Sindicatos dos Produtores Rurais de Rondônia"
                  className="h-9 sm:h-11 md:h-12 w-auto max-w-[240px] sm:max-w-[290px] md:max-w-[340px] object-contain block drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white z-10 flex flex-col items-center text-center">
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-300/90 text-center">
                  Rondônia · Brasil
                </div>
                <h4 className="text-base sm:text-lg font-bold mt-0.5 text-white text-balance text-center">
                  Presença em todos os 52 municípios rondonienses
                </h4>
                <p className="text-xs text-slate-200 mt-1 max-w-sm leading-relaxed text-center mx-auto">
                  Metodologia de gestão aplicada na lavoura, pecuária de corte, bacia leiteira e piscicultura com assistência contínua e gratuita.
                </p>
              </div>
            </div>

            {/* Card com Button de Acesso à Estrutura Organizacional */}
            <div className="mt-3.5 p-3.5 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-xl transition-all shadow-2xs flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006837] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Network className="w-5 h-5 text-[#006837]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800 block">
                    Governança & Gestão
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#006837] transition-colors truncate">
                    Estrutura Organizacional do SENAR
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    Organograma oficial · Conselho, Superintendência, DETEC, DAF e DATEG
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOrganogramaOpen(true)}
                className="px-3.5 py-2 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 shrink-0 transition-transform hover:scale-105 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Ver Organograma</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Modal Lightbox: Estrutura Organizacional do SENAR (Organograma Setorial) */}
      {isOrganogramaOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsOrganogramaOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Network className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="font-bold text-sm block">Estrutura Organizacional do SENAR-RO</span>
                  <span className="text-[11px] text-slate-400 font-mono">Organograma Setorial Atualizado · Ciclo 2027–2030</span>
                </div>
              </div>
              <button
                onClick={() => setIsOrganogramaOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-auto max-h-[calc(92vh-65px)] flex items-center justify-center bg-slate-950">
              <img
                src="/assets/aistudio/Organograma_Atual_SENAR_287b5ae6.png"
                alt="Organograma Atual do SENAR Rondônia"
                className="w-full h-auto max-h-[82vh] object-contain rounded-lg"
              />
            </div>
            
            <div className="px-5 py-2.5 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Sistema FAPERON · SENAR · Sindicatos dos Produtores Rurais de Rondônia</span>
              <button
                onClick={() => setIsOrganogramaOpen(false)}
                className="text-emerald-400 hover:underline cursor-pointer font-medium"
              >
                Fechar visualização
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
