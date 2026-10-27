import React from 'react';
import { UsuarioAutenticado } from '../../types/strategic';
import { Shield, Sparkles, User, LogOut } from 'lucide-react';
import logoFaperonColorida from '../../assets/images/logo_faperon_senar_colorida_oficial.png';

interface HeaderFixedProps {
  usuarioAtivo: UsuarioAutenticado | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenCms: () => void;
  onOpenSpecs: () => void;
}

export const HeaderFixed: React.FC<HeaderFixedProps> = ({
  usuarioAtivo,
  onOpenAuth,
  onLogout,
  onOpenCms,
  onOpenSpecs
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single element Brand Zone */}
        <a 
          href="#proposito" 
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <img
            src="/assets/aistudio/logo_sistema_transparente.png"
            alt="Sistema FAPERON SENAR Sindicatos dos Produtores Rurais de Rondônia"
            style={{ aspectRatio: '1219 / 411' }}
            className="h-8 sm:h-9 md:h-10 w-auto object-contain block"
          />
          <span className="hidden xl:inline text-slate-300 font-normal">|</span>
          <span className="hidden xl:inline text-xs font-semibold text-emerald-800 uppercase tracking-wider">Planejamento Estratégico</span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <a href="#proposito" className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0">
            Propósito
          </a>
          <a href="#mapa-bsc" className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0">
            Mapa BSC
          </a>
          <a href="#cadeia-valor" className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0">
            Cadeia de Valor
          </a>
          <a href="#kpis-dashboard" className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0">
            KPIs
          </a>
          <a href="#planos-unidades" className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0">
            Unidades
          </a>
          <a href="#inteligencia-ia" className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 text-emerald-800 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            IA & Cloud
          </a>
          <button 
            onClick={onOpenSpecs}
            className="hover:text-[#006837] transition-colors whitespace-nowrap shrink-0 text-slate-600 cursor-pointer"
          >
            APIs & DDL
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {usuarioAtivo && usuarioAtivo.role !== 'VISITANTE_PUBLICO' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCms}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer inline-flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                Painel CMS ({usuarioAtivo.unidade})
              </button>
              <button
                onClick={onLogout}
                title="Sair do perfil"
                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer inline-flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              Acesso / Gestão CMS
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
