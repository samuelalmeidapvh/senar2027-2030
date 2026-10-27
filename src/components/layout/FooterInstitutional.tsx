import React from 'react';
import { ArrowUp, FileText } from 'lucide-react';
import logoFaperonBranca from '../../assets/images/logo_faperon_senar_branca_oficial.png';

interface FooterInstitutionalProps {
  onOpenSpecs: () => void;
}

export const FooterInstitutional: React.FC<FooterInstitutionalProps> = ({ onOpenSpecs }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          <div className="md:col-span-2">
            <div className="mb-3">
              <img
                src="/assets/aistudio/logo_sistema_branco.png"
                alt="Sistema FAPERON SENAR Sindicatos dos Produtores Rurais de Rondônia"
                style={{ aspectRatio: '1219 / 411' }}
                className="h-8 sm:h-9 md:h-10 w-auto object-contain opacity-95 block"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Serviço Nacional de Aprendizagem Rural — Administração Regional de Rondônia.
              Promovendo a formação profissional, assistência técnica contínua e a promoção social da família do campo nos 52 municípios rondonienses.
            </p>
            <div className="mt-4 text-[11px] text-slate-500 font-mono">
              Sede Regional: Porto Velho · Rondônia · Brasil
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Navegação Rápida</h4>
            <ul className="space-y-2">
              <li><a href="#proposito" className="hover:text-emerald-400 transition-colors">Propósito & Valores</a></li>
              <li><a href="#mapa-bsc" className="hover:text-emerald-400 transition-colors">Mapa Estratégico BSC</a></li>
              <li><a href="#cadeia-valor" className="hover:text-emerald-400 transition-colors">Cadeia de Valor & Processos</a></li>
              <li><a href="#kpis-dashboard" className="hover:text-emerald-400 transition-colors">Indicadores de Desempenho</a></li>
              <li><a href="#planos-unidades" className="hover:text-emerald-400 transition-colors">Planos de Ação 5W2H</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Governança & Dados</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={onOpenSpecs}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>DDL SQL & Schemas JSON</span>
                </button>
              </li>
              <li><span className="text-slate-500">Google Cloud Platform & BigQuery</span></li>
              <li><span className="text-slate-500">Gemini 3.8 Flash Analytical Engine</span></li>
              <li><span className="text-slate-500">Portal da Transparência TCU</span></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} SENAR-AR/RO — Federação da Agricultura e Pecuária de Rondônia (FAPERON). Todos os direitos reservados.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
