import React from 'react';
import { Target, Compass, Award, ArrowDown, Sparkles } from 'lucide-react';
import heroImage from '../../assets/images/senar_hero_field_1791657047722.jpg';
import logoFaperonOficial from '../../assets/images/logo_faperon_senar_colorida_oficial.png';

interface HeroPropositoProps {
  onExploreClick: () => void;
  onOpenGeminiClick: () => void;
}

export const HeroProposito: React.FC<HeroPropositoProps> = ({
  onExploreClick,
  onOpenGeminiClick
}) => {
  return (
    <div id="proposito" className="relative pt-24 pb-16 bg-white overflow-hidden scroll-mt-16">
      {/* Decorative top pattern subtle background */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-emerald-50/60 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Editorial kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-3">
          <span>Sistema FAPERON / SENAR Rondônia</span>
          <span aria-hidden="true">·</span>
          <span>Ciclo Estratégico 2027–2030</span>
          <span aria-hidden="true">·</span>
          <span>Balanced Scorecard</span>
        </div>

        {/* 2-Column Split: Headline & Purpose on Left, High-Fidelity Imagery on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 text-[#006837] text-xs font-bold tracking-wide">
                  <span>JUNTOS, FORTALECENDO O PRODUTOR RURAL DE RONDÔNIA</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-xs font-medium tracking-wide">
                  <span className="font-mono text-[10px] uppercase font-bold text-emerald-700">Lema:</span>
                  <span className="font-bold text-emerald-950">“Conhecimento que transforma, campo que prospera.”</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-2xl text-balance">
                Conhecimento, tecnologia e pessoas por um agro mais forte e sustentável.
              </h1>

              {/* Official Purpose Callout from Mapa Estratégico */}
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-800 to-[#006837] text-white shadow-sm border border-emerald-700/40">
                <div className="text-[11px] font-mono uppercase tracking-wider font-bold text-emerald-200 mb-1 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>Propósito Institucional (Ciclo 2027–2030)</span>
                </div>
                <p className="text-sm sm:text-base font-medium leading-relaxed text-emerald-50">
                  “Transformar vidas e fortalecer o campo, criando oportunidades para que as pessoas prosperem por meio do conhecimento, do trabalho e do desenvolvimento sustentável.”
                </p>
              </div>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                O Planejamento Estratégico do <strong className="text-slate-800 font-semibold">SENAR-AR/RO</strong> consolida a atuação articulada com a FAPERON e os 52 Sindicatos dos Produtores Rurais, unindo Assistência Técnica e Gerencial (ATeG), Formação Profissional Rural (FPR) e Promoção Social (PS).
              </p>
            </div>

            {/* Strategic Pillars: Visão, Missão e Valores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-200">
              
              <div className="bg-slate-50/90 p-4.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#006837] flex items-center justify-center mb-2.5">
                  <Compass className="w-4.5 h-4.5 text-[#006837]" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Visão Estratégica</h3>
                <p className="mt-2 text-xs text-slate-700 leading-relaxed font-medium">
                  Alcançar a excelência na atuação rural, por meio da assistência, capacitação, formação e promoção social gerando resultados efetivos aos produtores.
                </p>
              </div>

              <div className="bg-slate-50/90 p-4.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#006837] flex items-center justify-center mb-2.5">
                  <Target className="w-4.5 h-4.5 text-[#006837]" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Missão Institucional</h3>
                <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                  Transformar conhecimento em oportunidades para o meio rural, por meio da educação profissional, da assistência técnica, da inovação e do fortalecimento da gestão, gerando valor para as pessoas, as propriedades rurais e a sociedade.
                </p>
              </div>

              <div className="bg-slate-50/90 p-4.5 rounded-xl border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#006837] flex items-center justify-center mb-2.5">
                  <Award className="w-4.5 h-4.5 text-[#006837]" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Valores Centrais</h3>
                <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                  Excelência e Qualidade, Cooperação e Parceria, Compromisso com o Público Rural, Responsabilidade pelos Resultados e Valorização das Pessoas.
                </p>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={onExploreClick}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar Mapa BSC & Cadeia de Valor</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenGeminiClick}
                className="px-5 py-2.5 text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#008744]" />
                <span>Análise de IA & BigQuery</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual High-Fidelity Asset */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md h-full min-h-[460px] max-h-[620px] bg-slate-900 group">
              <img
                src={heroImage}
                alt="Agricultura sustentável e cafeicultura de precisão em Rondônia - SENAR-AR/RO"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-[center_30%] group-hover:scale-103 transition-transform duration-700 pointer-events-none select-none"
              />

              {/* Logo Oficial do Sistema FAPERON / SENAR no Canto Superior Direito com Fundo Transparente */}
              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20 select-none pointer-events-none">
                <img
                  src="/assets/aistudio/logo_sistema_transparente.png"
                  alt="Sistema FAPERON · SENAR · Sindicatos dos Produtores Rurais de Rondônia"
                  className="h-9 sm:h-11 md:h-12 w-auto max-w-[240px] sm:max-w-[290px] md:max-w-[340px] object-contain block drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white z-10 flex flex-col items-center text-center">
                {/* Lema do Planejamento 2027–2030 Centralizado */}
                <div className="mb-3.5 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 backdrop-blur-md border border-emerald-400/50 text-emerald-200 shadow-xl text-center">
                  <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                  <div className="text-center">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300 font-extrabold block leading-tight text-center">
                      Lema do Planejamento 2027–2030
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide text-center block">
                      “Conhecimento que transforma, campo que prospera.”
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                </div>

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
          </div>

        </div>
      </div>
    </div>
  );
};
