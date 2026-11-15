import React, { useId } from 'react';
import { SparklinePoint } from '../../utils/kpiChartUtils';

interface MiniSparklineChartProps {
  historico: SparklinePoint[];
  unidadeMedida: string;
  height?: number;
  showLabels?: boolean;
  showAxisPeriods?: boolean;
}

export const MiniSparklineChart: React.FC<MiniSparklineChartProps> = ({
  historico,
  unidadeMedida,
  height = 80,
  showLabels = true,
  showAxisPeriods = true
}) => {
  const gradId = useId().replace(/:/g, '');

  if (!historico || historico.length === 0) {
    return (
      <div className="text-[11px] text-slate-500 py-2.5 px-3 bg-slate-50 rounded-lg border border-dashed border-slate-200">
        Sem série numérica apurada — inclua a previsão anual ou execução (2025–2030) para gerar o gráfico.
      </div>
    );
  }

  const allValues = historico.flatMap(h => {
    const vals: number[] = [];
    if (typeof h.realizado === 'number' && Number.isFinite(h.realizado)) vals.push(h.realizado);
    if (typeof h.meta === 'number' && Number.isFinite(h.meta)) vals.push(h.meta);
    return vals;
  });

  if (allValues.length === 0) {
    return (
      <div className="space-y-1.5">
        <div className="text-[11px] text-slate-500 py-2.5 px-3 bg-slate-50 rounded-lg border border-dashed border-slate-200">
          Informe valores numéricos de Previsão Anual ou Execução (2025–2030) para visualizar as linhas no gráfico.
        </div>
        {showAxisPeriods && (
          <div className="flex justify-between px-1.5 text-[9px] font-mono text-slate-400">
            {historico.map((h, i) => (
              <span key={`${h.periodo}-${i}`} className="tabular-nums">
                {h.periodo}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  const min = rawMin >= 0 ? Math.max(0, rawMin * 0.9) : rawMin * 1.1;
  const max = rawMax === rawMin ? (rawMax === 0 ? 10 : rawMax * 1.15) : rawMax * 1.08;
  const range = max - min || 1;

  const width = 300;
  const padX = 16;
  const padY = 10;
  const usableWidth = width - padX * 2;
  const usableHeight = height - padY * 2;
  const bottomY = height - padY;
  const midY = padY + usableHeight / 2;

  const getX = (index: number) =>
    historico.length > 1
      ? padX + (index / (historico.length - 1)) * usableWidth
      : padX + usableWidth / 2;

  const getY = (val: number) =>
    height - padY - ((val - min) / range) * usableHeight;

  const metaCoords = historico
    .map((h, i) =>
      h.meta !== null && Number.isFinite(h.meta)
        ? { x: getX(i), y: getY(h.meta), val: h.meta, periodo: h.periodo }
        : null
    )
    .filter((p): p is { x: number; y: number; val: number; periodo: string } => p !== null);

  const realizadoCoords = historico
    .map((h, i) =>
      h.realizado !== null && Number.isFinite(h.realizado)
        ? { x: getX(i), y: getY(h.realizado), val: h.realizado, periodo: h.periodo }
        : null
    )
    .filter((p): p is { x: number; y: number; val: number; periodo: string } => p !== null);

  const pointsMetaStr = metaCoords.map(p => `${p.x},${p.y}`).join(' ');
  const pointsRealizadoStr = realizadoCoords.map(p => `${p.x},${p.y}`).join(' ');

  const areaRealizado =
    realizadoCoords.length >= 2
      ? `M ${realizadoCoords[0].x},${bottomY} L ${realizadoCoords.map(p => `${p.x},${p.y}`).join(' L ')} L ${realizadoCoords[realizadoCoords.length - 1].x},${bottomY} Z`
      : '';

  const lastRealizado = realizadoCoords[realizadoCoords.length - 1];
  const lastMeta = metaCoords[metaCoords.length - 1];

  return (
    <div className="w-full">
      <div className="relative rounded-lg bg-slate-50/70 border border-slate-200/70 px-2 pt-2 pb-1">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id={`realizadoGrad-${gradId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#008744" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#008744" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Subtle horizontal gridlines */}
          <line
            x1={padX}
            y1={padY}
            x2={width - padX}
            y2={padY}
            stroke="#e2e8f0"
            strokeWidth="0.7"
            strokeDasharray="2 3"
          />
          <line
            x1={padX}
            y1={midY}
            x2={width - padX}
            y2={midY}
            stroke="#e2e8f0"
            strokeWidth="0.7"
            strokeDasharray="2 3"
          />
          <line
            x1={padX}
            y1={bottomY}
            x2={width - padX}
            y2={bottomY}
            stroke="#cbd5e1"
            strokeWidth="1"
          />

          {/* Vertical period guide ticks */}
          {historico.map((h, idx) => (
            <line
              key={`tick-${h.periodo}-${idx}`}
              x1={getX(idx)}
              y1={padY}
              x2={getX(idx)}
              y2={bottomY}
              stroke="#e2e8f0"
              strokeWidth="0.6"
              opacity="0.7"
            />
          ))}

          {/* Area fill for execution */}
          {areaRealizado && (
            <path d={areaRealizado} fill={`url(#realizadoGrad-${gradId})`} />
          )}

          {/* Previsão Anual line (dashed blue) */}
          {metaCoords.length >= 2 && (
            <polyline
              fill="none"
              stroke="#0284c7"
              strokeWidth="2"
              strokeDasharray="4 3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsMetaStr}
            />
          )}

          {/* Dots on Previsão Anual */}
          {metaCoords.map((p, idx) => (
            <circle
              key={`meta-${idx}`}
              cx={p.x}
              cy={p.y}
              r={2.8}
              fill="#ffffff"
              stroke="#0284c7"
              strokeWidth="1.7"
            >
              <title>{`Previsão ${p.periodo}: ${p.val.toLocaleString('pt-BR')} ${unidadeMedida}`}</title>
            </circle>
          ))}

          {/* Execução line (solid green) */}
          {realizadoCoords.length >= 2 && (
            <polyline
              fill="none"
              stroke="#008744"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsRealizadoStr}
            />
          )}

          {/* Dots on Execução */}
          {realizadoCoords.map((p, idx) => {
            const isLast = idx === realizadoCoords.length - 1;
            return (
              <circle
                key={`real-${idx}`}
                cx={p.x}
                cy={p.y}
                r={isLast ? 4 : 3}
                fill={isLast ? '#006837' : '#008744'}
                stroke="#ffffff"
                strokeWidth="1.5"
              >
                <title>{`Execução ${p.periodo}: ${p.val.toLocaleString('pt-BR')} ${unidadeMedida}`}</title>
              </circle>
            );
          })}
        </svg>

        {/* Period axis (2025 a 2030) */}
        {showAxisPeriods && historico.length <= 10 && (
          <div className="flex justify-between px-1 text-[9px] font-mono font-semibold text-slate-500 mt-0.5">
            {historico.map((h, i) => (
              <span key={`${h.periodo}-${i}`} className="tabular-nums">
                {h.periodo}
              </span>
            ))}
          </div>
        )}
      </div>

      {showLabels && (
        <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1 text-[11px] text-slate-700 mt-1.5 px-0.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-800">
              <span className="w-3 h-0.5 bg-[#008744] inline-block rounded" />
              <span>
                Execução{lastRealizado ? ` (${lastRealizado.periodo}): ${lastRealizado.val.toLocaleString('pt-BR')} ${unidadeMedida}` : ': —'}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-sky-700">
              <span className="w-3 h-0.5 border-t-2 border-dashed border-sky-600 inline-block" />
              <span>
                Previsão Anual{lastMeta ? ` (${lastMeta.periodo}): ${lastMeta.val.toLocaleString('pt-BR')} ${unidadeMedida}` : ': —'}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
