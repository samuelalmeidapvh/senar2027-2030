import React from 'react';
import { HistoricoMedicao } from '../../types/strategic';

interface MiniSparklineChartProps {
  historico: HistoricoMedicao[];
  unidadeMedida: string;
  height?: number;
  showLabels?: boolean;
}

export const MiniSparklineChart: React.FC<MiniSparklineChartProps> = ({
  historico,
  unidadeMedida,
  height = 80,
  showLabels = true
}) => {
  if (!historico || historico.length === 0) {
    return <div className="text-xs text-slate-400 py-2">Sem histórico apurado</div>;
  }

  const valuesRealizado = historico.map(h => h.realizado);
  const valuesMeta = historico.map(h => h.meta);
  const allValues = [...valuesRealizado, ...valuesMeta];

  const min = Math.min(...allValues) * 0.95;
  const max = Math.max(...allValues) * 1.05;
  const range = max - min || 1;

  const width = 280;
  const padX = 16;
  const padY = 12;
  const usableWidth = width - padX * 2;
  const usableHeight = height - padY * 2;

  const getPoints = (arr: number[]) => {
    return arr.map((v, i) => {
      const x = padX + (i / (arr.length - 1)) * usableWidth;
      const y = height - padY - ((v - min) / range) * usableHeight;
      return `${x},${y}`;
    }).join(' ');
  };

  const pointsRealizado = getPoints(valuesRealizado);
  const pointsMeta = getPoints(valuesMeta);

  // SVG Area path for realizado
  const firstX = padX;
  const lastX = padX + usableWidth;
  const bottomY = height - padY;
  const areaRealizado = `M ${padX},${bottomY} L ${getPoints(valuesRealizado).split(' ').map(p => `${p.split(',')[0]},${p.split(',')[1]}`).join(' L ')} L ${lastX},${bottomY} Z`;

  return (
    <div className="w-full">
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="realizadoGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#008744" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#008744" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path d={areaRealizado} fill="url(#realizadoGrad)" />

          {/* Target reference dashed line */}
          <polyline
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            points={pointsMeta}
          />

          {/* Actual line */}
          <polyline
            fill="none"
            stroke="#008744"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsRealizado}
          />

          {/* Dots on realized */}
          {valuesRealizado.map((v, i) => {
            const x = padX + (i / (valuesRealizado.length - 1)) * usableWidth;
            const y = height - padY - ((v - min) / range) * usableHeight;
            const isLast = i === valuesRealizado.length - 1;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={isLast ? 4 : 2.5}
                  fill={isLast ? '#006837' : '#008744'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {showLabels && (
        <div className="flex justify-between items-center text-[11px] text-slate-700 mt-1.5 px-0.5">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-800">
              <span className="w-2.5 h-0.5 bg-[#008744] inline-block rounded"></span>
              Realizado: {valuesRealizado[valuesRealizado.length - 1].toLocaleString('pt-BR')} {unidadeMedida}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-0.5 border-t border-dashed border-slate-500 inline-block"></span>
              Meta: {valuesMeta[valuesMeta.length - 1].toLocaleString('pt-BR')} {unidadeMedida}
            </span>
          </div>
          <span className="font-mono text-slate-600 text-[10px]">
            {historico[historico.length - 1].periodo}
          </span>
        </div>
      )}
    </div>
  );
};
