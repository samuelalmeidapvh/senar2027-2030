import React from 'react';
import { StatusEstrategico, StatusPlanoAcao } from '../../types/strategic';
import { CheckCircle2, AlertTriangle, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: StatusEstrategico | StatusPlanoAcao;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  switch (status) {
    case 'EXCELENTE':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Excelente</span>
        </span>
      );
    case 'NO_RUMO':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 ${className}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>No Rumo</span>
        </span>
      );
    case 'ATENCAO':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 ${className}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Atenção</span>
        </span>
      );
    case 'CRITICO':
    case 'EM_RISCO':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 ${className}`}>
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>{status === 'EM_RISCO' ? 'Em Risco' : 'Crítico'}</span>
        </span>
      );
    case 'CONCLUIDO':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 ${className}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Concluído</span>
        </span>
      );
    case 'EM_ANDAMENTO':
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-blue-800 ${className}`}>
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Em Andamento</span>
        </span>
      );
    case 'PLANEJADO':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 ${className}`}>
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Planejado</span>
        </span>
      );
  }
};
