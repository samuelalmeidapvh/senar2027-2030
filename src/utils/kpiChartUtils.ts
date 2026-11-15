import { IndicadorKPI, IndicadorMetaFicha, StatusEstrategico } from '../types/strategic';

export interface SparklinePoint {
  periodo: string;
  meta: number | null;
  realizado: number | null;
}

/**
 * Converte strings formatadas em PT-BR (ex: "1.574", "91,5%", "R$ 11.857.576,00",
 * "≥ 98,0%", "8 dias", "R$ 6 Mi") para número plotável, retornando null para metas qualitativas.
 */
export function parseKpiNumericValue(raw?: string | number | null): number | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : null;

  const trimmed = raw.trim();
  if (!trimmed) return null;

  const lower = trimmed.toLowerCase();
  if (
    lower.includes('apurar') ||
    lower === '-' ||
    lower === '—' ||
    lower === 'n/a'
  ) {
    return null;
  }

  // Detecta multiplicadores explícitos como "Mi" (milhões) mantendo escala legível se comparada no mesmo KPI
  const cleaned = trimmed
    .replace(/R\$/gi, '')
    .replace(/[≥≤><%]/g, '')
    .trim();

  // Extrai o primeiro token numérico compatível com formato brasileiro (1.234,56 ou 12,5 ou 1.574 ou 8)
  const match = cleaned.match(/-?\d{1,3}(?:\.\d{3})+(?:,\d+)?|-?\d+(?:,\d+)?|-?\d+(?:\.\d+)?/);
  if (!match) return null;

  let token = match[0];
  if (token.includes(',') && token.includes('.')) {
    token = token.replace(/\./g, '').replace(',', '.');
  } else if (token.includes(',')) {
    token = token.replace(',', '.');
  } else if (/\.\d{3}$/.test(token)) {
    token = token.replace(/\./g, '');
  }

  const parsed = Number(token);
  return Number.isFinite(parsed) ? parsed : null;
}

export function isMenorMelhorKpi(nome: string, metaTexto?: string): boolean {
  const texto = `${nome} ${metaTexto || ''}`.toLowerCase();
  return (
    texto.includes('≤') ||
    texto.includes('< ') ||
    texto.includes('menor') ||
    texto.includes('sla') ||
    texto.includes('tempo médio') ||
    texto.includes('prazo médio') ||
    texto.includes('downtime') ||
    texto.includes('indisponibilidade') ||
    texto.includes('críticas') ||
    texto.includes('não conformidade') ||
    texto.includes('intempestiv') ||
    texto.includes('redução de') ||
    texto.includes('zero ')
  );
}

export interface FichaKpiAnalytics {
  points: SparklinePoint[];
  hasNumericSeries: boolean;
  latestExecLabel: string;
  latestExecYear: string;
  latestMetaLabel: string;
  latestMetaYear: string;
  ratioPercent: number;
  status: StatusEstrategico;
  menorMelhor: boolean;
}

export function buildFichaKpiAnalytics(ind: IndicadorMetaFicha): FichaKpiAnalytics {
  const base2026Num = parseKpiNumericValue(ind.linhaBase2026);
  const meta2025Num = parseKpiNumericValue(ind.meta2025);
  const exec2025Num = parseKpiNumericValue(ind.exec2025);
  const meta2026Num = parseKpiNumericValue(ind.meta2026);
  const exec2026Num = parseKpiNumericValue(ind.exec2026);
  const meta2027Num = parseKpiNumericValue(ind.meta2027);
  const exec2027Num = parseKpiNumericValue(ind.exec2027);
  const meta2028Num = parseKpiNumericValue(ind.meta2028);
  const exec2028Num = parseKpiNumericValue(ind.exec2028);
  const meta2029Num = parseKpiNumericValue(ind.meta2029);
  const exec2029Num = parseKpiNumericValue(ind.exec2029);
  const meta2030Num = parseKpiNumericValue(ind.meta2030);
  const exec2030Num = parseKpiNumericValue(ind.exec2030);

  const menorMelhor = isMenorMelhorKpi(
    ind.nome,
    `${ind.meta2027} ${ind.meta2030} ${ind.unidadeMedida}`
  );

  // 2026 utiliza execução 2026 explícita quando informada; caso contrário usa linha base 2026 numérica como referência inicial
  const point2026Realizado = exec2026Num !== null ? exec2026Num : base2026Num;
  const point2026Meta = meta2026Num !== null ? meta2026Num : base2026Num;

  const points: SparklinePoint[] = [
    {
      periodo: '2025',
      meta: meta2025Num,
      realizado: exec2025Num
    },
    {
      periodo: '2026',
      meta: point2026Meta,
      realizado: point2026Realizado
    },
    {
      periodo: '2027',
      meta: meta2027Num,
      realizado: exec2027Num
    },
    {
      periodo: '2028',
      meta: meta2028Num,
      realizado: exec2028Num
    },
    {
      periodo: '2029',
      meta: meta2029Num,
      realizado: exec2029Num
    },
    {
      periodo: '2030',
      meta: meta2030Num,
      realizado: exec2030Num
    }
  ];

  const numericCount = points.filter(p => p.meta !== null || p.realizado !== null).length;
  const hasNumericSeries = numericCount > 0;

  // Determinar último realizado informado (2030 -> 2025) para exibição e cálculo de aderência
  const execEntries: Array<{ year: string; raw?: string; num: number | null; targetRaw?: string; targetNum: number | null; targetYear: string }> = [
    { year: '2030', raw: ind.exec2030, num: exec2030Num, targetRaw: ind.meta2030, targetNum: meta2030Num, targetYear: '2030' },
    { year: '2029', raw: ind.exec2029, num: exec2029Num, targetRaw: ind.meta2029, targetNum: meta2029Num, targetYear: '2029' },
    { year: '2028', raw: ind.exec2028, num: exec2028Num, targetRaw: ind.meta2028, targetNum: meta2028Num, targetYear: '2028' },
    { year: '2027', raw: ind.exec2027, num: exec2027Num, targetRaw: ind.meta2027, targetNum: meta2027Num, targetYear: '2027' },
    { year: '2026', raw: ind.exec2026 || ind.linhaBase2026, num: point2026Realizado, targetRaw: ind.meta2026 || ind.meta2027, targetNum: meta2026Num ?? meta2027Num, targetYear: meta2026Num !== null ? '2026' : '2027' },
    { year: '2025', raw: ind.exec2025, num: exec2025Num, targetRaw: ind.meta2025 || ind.meta2027, targetNum: meta2025Num ?? meta2027Num, targetYear: meta2025Num !== null ? '2025' : '2027' }
  ];

  const latestExec =
    execEntries.find(e => e.raw && e.raw.trim() !== '' && e.raw.toLowerCase() !== 'a apurar') ||
    execEntries.find(e => e.num !== null) ||
    { year: '2026', raw: ind.linhaBase2026 || 'A apurar', num: base2026Num, targetRaw: ind.meta2027, targetNum: meta2027Num, targetYear: '2027' };

  const latestExecNum = latestExec.num;
  const targetNum = latestExec.targetNum ?? meta2027Num ?? meta2030Num;

  let ratioPercent = 0;
  if (latestExecNum !== null && targetNum !== null) {
    if (menorMelhor) {
      if (latestExecNum <= targetNum) {
        ratioPercent = 100;
      } else if (latestExecNum > 0) {
        ratioPercent = targetNum > 0 ? Math.min(120, (targetNum / latestExecNum) * 100) : Math.max(0, 100 - (latestExecNum - targetNum) * 10);
      }
    } else if (targetNum > 0) {
      ratioPercent = (latestExecNum / targetNum) * 100;
    } else if (latestExecNum === 0 && targetNum === 0) {
      ratioPercent = 100;
    }
  } else if (ind.exec2027 || ind.exec2028 || ind.exec2029 || ind.exec2030) {
    ratioPercent = 95;
  }

  let status: StatusEstrategico = 'NO_RUMO';
  if (latestExecNum === null && targetNum === null) {
    status = 'NO_RUMO';
  } else if (latestExecNum === null) {
    status = 'ATENCAO';
  } else if (ratioPercent >= 98) {
    status = 'EXCELENTE';
  } else if (ratioPercent >= 85) {
    status = 'NO_RUMO';
  } else if (ratioPercent >= 65) {
    status = 'ATENCAO';
  } else {
    status = 'CRITICO';
  }

  return {
    points,
    hasNumericSeries,
    latestExecLabel: latestExec.raw || '—',
    latestExecYear: latestExec.year,
    latestMetaLabel: latestExec.targetRaw || ind.meta2027 || '—',
    latestMetaYear: latestExec.targetYear,
    ratioPercent: Math.max(0, ratioPercent),
    status,
    menorMelhor
  };
}

export function buildComplementaryKpiPoints(kpi: IndicadorKPI): SparklinePoint[] {
  const hist2025 = kpi.historico?.filter(h => h.periodo.startsWith('2025'));
  const last2025 = hist2025 && hist2025.length > 0 ? hist2025[hist2025.length - 1] : null;
  const hist2026 = kpi.historico?.filter(h => h.periodo.startsWith('2026'));
  const last2026 = hist2026 && hist2026.length > 0 ? hist2026[hist2026.length - 1] : null;

  const exec2025Val =
    kpi.exec2025 !== undefined
      ? parseKpiNumericValue(kpi.exec2025)
      : last2025
      ? last2025.realizado
      : null;
  const meta2025Val =
    kpi.meta2025 !== undefined
      ? parseKpiNumericValue(kpi.meta2025)
      : last2025
      ? last2025.meta
      : kpi.linhaDeBase || null;

  const exec2026Val =
    kpi.exec2026 !== undefined
      ? parseKpiNumericValue(kpi.exec2026)
      : last2026
      ? last2026.realizado
      : Number.isFinite(kpi.realizado)
      ? kpi.realizado
      : null;
  const meta2026Val =
    kpi.meta2026 !== undefined
      ? parseKpiNumericValue(kpi.meta2026)
      : last2026
      ? last2026.meta
      : Number.isFinite(kpi.meta)
      ? kpi.meta
      : null;

  const meta2027Val = parseKpiNumericValue(kpi.meta2027);
  const exec2027Val = parseKpiNumericValue(kpi.exec2027);
  const meta2028Val = parseKpiNumericValue(kpi.meta2028);
  const exec2028Val = parseKpiNumericValue(kpi.exec2028);
  const meta2029Val = parseKpiNumericValue(kpi.meta2029);
  const exec2029Val = parseKpiNumericValue(kpi.exec2029);
  const meta2030Val = parseKpiNumericValue(kpi.meta2030);
  const exec2030Val = parseKpiNumericValue(kpi.exec2030);

  return [
    { periodo: '2025', meta: meta2025Val, realizado: exec2025Val },
    { periodo: '2026', meta: meta2026Val, realizado: exec2026Val },
    { periodo: '2027', meta: meta2027Val, realizado: exec2027Val },
    { periodo: '2028', meta: meta2028Val, realizado: exec2028Val },
    { periodo: '2029', meta: meta2029Val, realizado: exec2029Val },
    { periodo: '2030', meta: meta2030Val, realizado: exec2030Val }
  ];
}
