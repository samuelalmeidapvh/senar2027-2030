export type RegiaoRondonia =
  | 'Madeira-Guaporé'
  | 'Vale do Jamari'
  | 'Central'
  | 'Zona da Mata'
  | 'Vale do Guaporé'
  | 'Cone Sul';

export interface SenarNumerosBloco {
  titulo: string;
  destaquePrincipal: string;
  subtitulo?: string;
  itens: string[];
}

export interface SenarNumerosMunicipio {
  ateg: SenarNumerosBloco;
  formacaoProfissional: SenarNumerosBloco;
  formacaoTecnica: SenarNumerosBloco;
  saudePromocaoSocial: SenarNumerosBloco;
  observacao?: string;
  atualizadoEm?: string;
}

export interface MunicipioRondonia {
  id: string;
  nome: string;
  regiao: RegiaoRondonia;
  lat: number;
  lon: number;
  polo?: boolean;
}

export const SENAR_NUMEROS_ESTADUAL_OFICIAL: SenarNumerosMunicipio = {
  ateg: {
    titulo: 'Assistência Técnica e Gerencial (ATeG)',
    destaquePrincipal: '5.184 propriedades atendidas',
    itens: [
      '50.257 visitas realizadas',
      '7.436 propriedades atendidas',
      '189 técnicos de campo',
      '13 supervisores',
      '6 consultores especialistas',
      '3 agentes de negócios'
    ]
  },
  formacaoProfissional: {
    titulo: 'Formação Profissional e Aprendizagem',
    destaquePrincipal: '19.374 participantes',
    itens: [
      'Presencial – 15.858 participantes, em 1.384 turmas',
      'Outras ações de formação profissional – 3.516 participantes, em 94 ações',
      'Aprendizagem Rural – 39 menores aprendizes, em 7 empresas parceiras',
      'Treinamento de Agentes Externos – 63 participantes, em 6 (seis) turmas'
    ]
  },
  formacaoTecnica: {
    titulo: 'Formação Técnica Profissionalizante',
    destaquePrincipal: '243 alunos matriculados',
    subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
    itens: [
      '21 polos de ensino',
      '4 cursos técnicos ofertados',
      '313 alunos formados'
    ]
  },
  saudePromocaoSocial: {
    titulo: 'Saúde e Promoção Social',
    destaquePrincipal: '6.059 participantes',
    itens: [
      'Promoção Social: 5.162 participantes, em 487 turmas',
      'Atendimento à Saúde: 642 beneficiários atendidos; 351 propriedades atendidas; 15 supervisores/técnicos em campo'
    ]
  }
};

export const MUNICIPIOS_RONDONIA: MunicipioRondonia[] = [
  { id: 'porto-velho', nome: 'Porto Velho', regiao: 'Madeira-Guaporé', lat: -8.76, lon: -63.90, polo: true },
  { id: 'candeias-do-jamari', nome: 'Candeias do Jamari', regiao: 'Madeira-Guaporé', lat: -8.79, lon: -63.70 },
  { id: 'itapua-do-oeste', nome: 'Itapuã do Oeste', regiao: 'Madeira-Guaporé', lat: -9.19, lon: -63.18 },
  { id: 'nova-mamore', nome: 'Nova Mamoré', regiao: 'Madeira-Guaporé', lat: -10.41, lon: -65.33 },
  { id: 'guajara-mirim', nome: 'Guajará-Mirim', regiao: 'Madeira-Guaporé', lat: -10.78, lon: -65.34, polo: true },

  { id: 'ariquemes', nome: 'Ariquemes', regiao: 'Vale do Jamari', lat: -9.91, lon: -63.04, polo: true },
  { id: 'alto-paraiso', nome: 'Alto Paraíso', regiao: 'Vale do Jamari', lat: -9.71, lon: -63.32 },
  { id: 'buritis', nome: 'Buritis', regiao: 'Vale do Jamari', lat: -10.21, lon: -63.83, polo: true },
  { id: 'campo-novo-de-rondonia', nome: 'Campo Novo de Rondônia', regiao: 'Vale do Jamari', lat: -10.59, lon: -63.61 },
  { id: 'monte-negro', nome: 'Monte Negro', regiao: 'Vale do Jamari', lat: -10.25, lon: -63.30 },
  { id: 'cacaulandia', nome: 'Cacaulândia', regiao: 'Vale do Jamari', lat: -10.34, lon: -62.90 },
  { id: 'rio-crespo', nome: 'Rio Crespo', regiao: 'Vale do Jamari', lat: -9.70, lon: -62.90 },
  { id: 'cujubim', nome: 'Cujubim', regiao: 'Vale do Jamari', lat: -9.36, lon: -62.58 },
  { id: 'machadinho-doeste', nome: "Machadinho d'Oeste", regiao: 'Vale do Jamari', lat: -9.44, lon: -61.98, polo: true },

  { id: 'jaru', nome: 'Jaru', regiao: 'Central', lat: -10.44, lon: -62.47, polo: true },
  { id: 'theobroma', nome: 'Theobroma', regiao: 'Central', lat: -10.25, lon: -62.35 },
  { id: 'vale-do-anari', nome: 'Vale do Anari', regiao: 'Central', lat: -9.86, lon: -62.19 },
  { id: 'governador-jorge-teixeira', nome: 'Governador Jorge Teixeira', regiao: 'Central', lat: -10.61, lon: -62.73 },
  { id: 'ouro-preto-do-oeste', nome: 'Ouro Preto do Oeste', regiao: 'Central', lat: -10.72, lon: -62.25, polo: true },
  { id: 'vale-do-paraiso', nome: 'Vale do Paraíso', regiao: 'Central', lat: -10.45, lon: -62.13 },
  { id: 'nova-uniao', nome: 'Nova União', regiao: 'Central', lat: -10.91, lon: -62.56 },
  { id: 'mirante-da-serra', nome: 'Mirante da Serra', regiao: 'Central', lat: -11.03, lon: -62.67 },
  { id: 'urupa', nome: 'Urupá', regiao: 'Central', lat: -11.13, lon: -62.36 },
  { id: 'teixeiropolis', nome: 'Teixeirópolis', regiao: 'Central', lat: -10.90, lon: -62.24 },
  { id: 'ji-parana', nome: 'Ji-Paraná', regiao: 'Central', lat: -10.88, lon: -61.95, polo: true },
  { id: 'presidente-medici', nome: 'Presidente Médici', regiao: 'Central', lat: -11.17, lon: -61.90 },
  { id: 'ministro-andreazza', nome: 'Ministro Andreazza', regiao: 'Central', lat: -11.19, lon: -61.52 },
  { id: 'cacoal', nome: 'Cacoal', regiao: 'Central', lat: -11.44, lon: -61.45, polo: true },
  { id: 'espigao-doeste', nome: "Espigão d'Oeste", regiao: 'Central', lat: -11.53, lon: -61.01, polo: true },

  { id: 'alvorada-doeste', nome: "Alvorada d'Oeste", regiao: 'Vale do Guaporé', lat: -11.35, lon: -62.28 },
  { id: 'sao-miguel-do-guapore', nome: 'São Miguel do Guaporé', regiao: 'Vale do Guaporé', lat: -11.69, lon: -62.72, polo: true },
  { id: 'seringueiras', nome: 'Seringueiras', regiao: 'Vale do Guaporé', lat: -11.79, lon: -63.03 },
  { id: 'sao-francisco-do-guapore', nome: 'São Francisco do Guaporé', regiao: 'Vale do Guaporé', lat: -12.05, lon: -63.57 },
  { id: 'costa-marques', nome: 'Costa Marques', regiao: 'Vale do Guaporé', lat: -12.44, lon: -64.23 },

  { id: 'castanheiras', nome: 'Castanheiras', regiao: 'Zona da Mata', lat: -11.43, lon: -61.94 },
  { id: 'novo-horizonte-do-oeste', nome: 'Novo Horizonte do Oeste', regiao: 'Zona da Mata', lat: -11.70, lon: -62.00 },
  { id: 'nova-brasilandia-doeste', nome: "Nova Brasilândia d'Oeste", regiao: 'Zona da Mata', lat: -11.72, lon: -62.31 },
  { id: 'rolim-de-moura', nome: 'Rolim de Moura', regiao: 'Zona da Mata', lat: -11.73, lon: -61.78, polo: true },
  { id: 'santa-luzia-doeste', nome: "Santa Luzia d'Oeste", regiao: 'Zona da Mata', lat: -11.91, lon: -61.78 },
  { id: 'alta-floresta-doeste', nome: "Alta Floresta d'Oeste", regiao: 'Zona da Mata', lat: -11.93, lon: -61.99, polo: true },
  { id: 'alto-alegre-dos-parecis', nome: 'Alto Alegre dos Parecis', regiao: 'Zona da Mata', lat: -12.13, lon: -61.85 },
  { id: 'parecis', nome: 'Parecis', regiao: 'Zona da Mata', lat: -12.17, lon: -61.60 },
  { id: 'sao-felipe-doeste', nome: "São Felipe d'Oeste", regiao: 'Zona da Mata', lat: -11.90, lon: -61.50 },
  { id: 'primavera-de-rondonia', nome: 'Primavera de Rondônia', regiao: 'Zona da Mata', lat: -11.83, lon: -61.32 },

  { id: 'pimenta-bueno', nome: 'Pimenta Bueno', regiao: 'Cone Sul', lat: -11.67, lon: -61.19, polo: true },
  { id: 'chupinguaia', nome: 'Chupinguaia', regiao: 'Cone Sul', lat: -12.56, lon: -60.90 },
  { id: 'vilhena', nome: 'Vilhena', regiao: 'Cone Sul', lat: -12.74, lon: -60.15, polo: true },
  { id: 'corumbiara', nome: 'Corumbiara', regiao: 'Cone Sul', lat: -12.96, lon: -60.95 },
  { id: 'cerejeiras', nome: 'Cerejeiras', regiao: 'Cone Sul', lat: -13.19, lon: -60.82, polo: true },
  { id: 'colorado-do-oeste', nome: 'Colorado do Oeste', regiao: 'Cone Sul', lat: -13.12, lon: -60.54 },
  { id: 'cabixi', nome: 'Cabixi', regiao: 'Cone Sul', lat: -13.49, lon: -60.54 },
  { id: 'pimenteiras-do-oeste', nome: 'Pimenteiras do Oeste', regiao: 'Cone Sul', lat: -13.48, lon: -61.05 }
];

// Contorno detalhado do Estado de Rondônia conforme mapa político-territorial oficial
const RONDONIA_BORDER_POINTS: [number, number][] = [
  [56, 152], [88, 162], [128, 146], [160, 142], [182, 134], [216, 128],
  [235, 114], [255, 86], [278, 66], [292, 38], [308, 16], [334, 22],
  [358, 14], [382, 20], [410, 12], [420, 32], [416, 56], [444, 52],
  [476, 56], [484, 92], [482, 134], [494, 144], [486, 162], [472, 180],
  [486, 206], [480, 232], [470, 250], [476, 266], [524, 266], [554, 268],
  [566, 260], [582, 268], [602, 262], [606, 305], [600, 345], [606, 385],
  [588, 418], [572, 468], [554, 492], [534, 488], [516, 474], [482, 472],
  [456, 464], [434, 444], [418, 434], [398, 446], [382, 430], [356, 418],
  [320, 418], [282, 408], [252, 404], [242, 380], [220, 366], [202, 348],
  [182, 336], [164, 304], [168, 272], [162, 240], [174, 210], [178, 174],
  [132, 174], [96, 164]
];

export const RONDONIA_SILHOUETTE_PATH: string =
  RONDONIA_BORDER_POINTS.map(([x, y], idx) => `${idx === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ') + ' Z';

interface TerritorialSeed {
  id: string;
  x: number;
  y: number;
  seat?: boolean;
}

const MUNICIPIO_SEEDS: TerritorialSeed[] = [
  { id: 'porto-velho', x: 235, y: 128, seat: true },
  { id: 'porto-velho', x: 95, y: 148 },
  { id: 'porto-velho', x: 175, y: 130 },
  { id: 'porto-velho', x: 315, y: 58 },
  { id: 'porto-velho', x: 392, y: 46 },
  { id: 'candeias-do-jamari', x: 342, y: 92, seat: true },
  { id: 'itapua-do-oeste', x: 352, y: 124, seat: true },
  { id: 'cujubim', x: 396, y: 98, seat: true },
  { id: 'machadinho-doeste', x: 448, y: 92, seat: true },
  { id: 'machadinho-doeste', x: 458, y: 132 },
  { id: 'vale-do-anari', x: 442, y: 162, seat: true },
  { id: 'nova-mamore', x: 232, y: 190, seat: true },
  { id: 'nova-mamore', x: 195, y: 185 },
  { id: 'guajara-mirim', x: 235, y: 268, seat: true },
  { id: 'guajara-mirim', x: 200, y: 250 },
  { id: 'guajara-mirim', x: 265, y: 315 },
  { id: 'buritis', x: 282, y: 178, seat: true },
  { id: 'alto-paraiso', x: 326, y: 152, seat: true },
  { id: 'rio-crespo', x: 368, y: 152, seat: true },
  { id: 'ariquemes', x: 348, y: 184, seat: true },
  { id: 'monte-negro', x: 324, y: 206, seat: true },
  { id: 'campo-novo-de-rondonia', x: 295, y: 224, seat: true },
  { id: 'cacaulandia', x: 356, y: 212, seat: true },
  { id: 'theobroma', x: 412, y: 190, seat: true },
  { id: 'governador-jorge-teixeira', x: 344, y: 254, seat: true },
  { id: 'jaru', x: 392, y: 228, seat: true },
  { id: 'vale-do-paraiso', x: 428, y: 228, seat: true },
  { id: 'ouro-preto-do-oeste', x: 416, y: 256, seat: true },
  { id: 'nova-uniao', x: 390, y: 274, seat: true },
  { id: 'mirante-da-serra', x: 380, y: 290, seat: true },
  { id: 'teixeiropolis', x: 414, y: 280, seat: true },
  { id: 'urupa', x: 404, y: 294, seat: true },
  { id: 'ji-parana', x: 458, y: 240, seat: true },
  { id: 'ji-parana', x: 464, y: 196 },
  { id: 'presidente-medici', x: 450, y: 286, seat: true },
  { id: 'alvorada-doeste', x: 384, y: 322, seat: true },
  { id: 'sao-miguel-do-guapore', x: 380, y: 358, seat: true },
  { id: 'seringueiras', x: 340, y: 366, seat: true },
  { id: 'costa-marques', x: 295, y: 390, seat: true },
  { id: 'costa-marques', x: 268, y: 378 },
  { id: 'sao-francisco-do-guapore', x: 358, y: 405, seat: true },
  { id: 'sao-francisco-do-guapore', x: 388, y: 396 },
  { id: 'ministro-andreazza', x: 476, y: 294, seat: true },
  { id: 'cacoal', x: 486, y: 322, seat: true },
  { id: 'espigao-doeste', x: 548, y: 304, seat: true },
  { id: 'espigao-doeste', x: 528, y: 290 },
  { id: 'castanheiras', x: 434, y: 318, seat: true },
  { id: 'novo-horizonte-do-oeste', x: 434, y: 344, seat: true },
  { id: 'nova-brasilandia-doeste', x: 412, y: 348, seat: true },
  { id: 'rolim-de-moura', x: 456, y: 350, seat: true },
  { id: 'sao-felipe-doeste', x: 478, y: 354, seat: true },
  { id: 'primavera-de-rondonia', x: 492, y: 348, seat: true },
  { id: 'santa-luzia-doeste', x: 462, y: 372, seat: true },
  { id: 'alta-floresta-doeste', x: 424, y: 392, seat: true },
  { id: 'alto-alegre-dos-parecis', x: 464, y: 412, seat: true },
  { id: 'parecis', x: 486, y: 390, seat: true },
  { id: 'pimenta-bueno', x: 528, y: 356, seat: true },
  { id: 'pimenta-bueno', x: 516, y: 340 },
  { id: 'chupinguaia', x: 524, y: 412, seat: true },
  { id: 'vilhena', x: 576, y: 366, seat: true },
  { id: 'vilhena', x: 585, y: 320 },
  { id: 'vilhena', x: 578, y: 404 },
  { id: 'corumbiara', x: 518, y: 444, seat: true },
  { id: 'cerejeiras', x: 496, y: 464, seat: true },
  { id: 'colorado-do-oeste', x: 552, y: 460, seat: true },
  { id: 'pimenteiras-do-oeste', x: 484, y: 482, seat: true },
  { id: 'cabixi', x: 554, y: 484, seat: true }
];

function clipHalfPlane(
  poly: [number, number][],
  ax: number,
  ay: number,
  bx: number,
  by: number
): [number, number][] {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const nx = bx - ax;
  const ny = by - ay;
  const inside = (p: [number, number]) => (p[0] - mx) * nx + (p[1] - my) * ny <= 1e-6;
  const intersect = (p1: [number, number], p2: [number, number]): [number, number] => {
    const d1 = (p1[0] - mx) * nx + (p1[1] - my) * ny;
    const d2 = (p2[0] - mx) * nx + (p2[1] - my) * ny;
    const denom = d1 - d2;
    const t = Math.abs(denom) < 1e-9 ? 0 : d1 / denom;
    return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
  };

  const out: [number, number][] = [];
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i];
    const prev = poly[(i + poly.length - 1) % poly.length];
    const curIn = inside(cur);
    const prevIn = inside(prev);
    if (curIn) {
      if (!prevIn) out.push(intersect(prev, cur));
      out.push(cur);
    } else if (prevIn) {
      out.push(intersect(prev, cur));
    }
  }
  return out;
}

export interface MunicipioTerritorioGeo {
  id: string;
  polygons: string[];
  borderPath: string;
  seatX: number;
  seatY: number;
}

function buildMunicipioTerritorios(): Record<string, MunicipioTerritorioGeo> {
  const result: Record<string, MunicipioTerritorioGeo> = {};

  for (let i = 0; i < MUNICIPIO_SEEDS.length; i++) {
    const seed = MUNICIPIO_SEEDS[i];
    let poly: [number, number][] = RONDONIA_BORDER_POINTS.map(([x, y]) => [x, y]);
    for (let j = 0; j < MUNICIPIO_SEEDS.length; j++) {
      if (i === j) continue;
      poly = clipHalfPlane(poly, seed.x, seed.y, MUNICIPIO_SEEDS[j].x, MUNICIPIO_SEEDS[j].y);
      if (poly.length === 0) break;
    }

    if (!result[seed.id]) {
      result[seed.id] = {
        id: seed.id,
        polygons: [],
        borderPath: '',
        seatX: seed.x,
        seatY: seed.y
      };
    }
    if (seed.seat) {
      result[seed.id].seatX = seed.x;
      result[seed.id].seatY = seed.y;
    }

    if (poly.length >= 3) {
      result[seed.id].polygons.push(
        poly.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
      );

      // Excluir arestas internas entre sub-sementes do mesmo município
      const sameIdPeers = MUNICIPIO_SEEDS.filter((other, idx) => idx !== i && other.id === seed.id);
      const borderSegments: string[] = [];

      for (let e = 0; e < poly.length; e++) {
        const p1 = poly[e];
        const p2 = poly[(e + 1) % poly.length];
        const mx = (p1[0] + p2[0]) / 2;
        const my = (p1[1] + p2[1]) / 2;
        const dSelf = Math.hypot(mx - seed.x, my - seed.y);

        const isInternalSplit = sameIdPeers.some((peer) => {
          const dPeer = Math.hypot(mx - peer.x, my - peer.y);
          return Math.abs(dSelf - dPeer) < 0.8;
        });

        if (!isInternalSplit) {
          borderSegments.push(
            `M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
          );
        }
      }

      if (borderSegments.length > 0) {
        result[seed.id].borderPath += (result[seed.id].borderPath ? ' ' : '') + borderSegments.join(' ');
      }
    }
  }

  return result;
}

export const MUNICIPIO_TERRITORIOS: Record<string, MunicipioTerritorioGeo> = buildMunicipioTerritorios();

export const BR364_EIXO_PATH: string = [
  'porto-velho',
  'ariquemes',
  'jaru',
  'ouro-preto-do-oeste',
  'ji-parana',
  'cacoal',
  'pimenta-bueno',
  'vilhena'
]
  .map((id, idx) => {
    const t = MUNICIPIO_TERRITORIOS[id];
    return `${idx === 0 ? 'M' : 'L'} ${t.seatX} ${t.seatY}`;
  })
  .join(' ');

// Registros iniciais por município (baseados na estrutura oficial "Senar em números")
export const INITIAL_MUNICIPIO_NUMEROS: Record<string, SenarNumerosMunicipio> = {
  'porto-velho': {
    ateg: {
      titulo: 'Assistência Técnica e Gerencial (ATeG)',
      destaquePrincipal: '520 propriedades atendidas',
      itens: [
        '5.040 visitas realizadas',
        '745 propriedades atendidas no ciclo',
        '19 técnicos de campo',
        '2 supervisores',
        '2 consultores especialistas',
        '1 agente de negócios'
      ]
    },
    formacaoProfissional: {
      titulo: 'Formação Profissional e Aprendizagem',
      destaquePrincipal: '2.480 participantes',
      itens: [
        'Presencial – 1.980 participantes, em 165 turmas',
        'Outras ações de formação profissional – 450 participantes, em 12 ações',
        'Aprendizagem Rural – 18 menores aprendizes, em 4 empresas parceiras',
        'Treinamento de Agentes Externos – 32 participantes, em 3 turmas'
      ]
    },
    formacaoTecnica: {
      titulo: 'Formação Técnica Profissionalizante',
      destaquePrincipal: '68 alunos matriculados',
      subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
      itens: [
        '2 polos de ensino (Capital e Distritos)',
        '4 cursos técnicos ofertados',
        '84 alunos formados'
      ]
    },
    saudePromocaoSocial: {
      titulo: 'Saúde e Promoção Social',
      destaquePrincipal: '890 participantes',
      itens: [
        'Promoção Social: 760 participantes, em 68 turmas',
        'Atendimento à Saúde: 130 beneficiários atendidos; 64 propriedades atendidas; 3 supervisores/técnicos em campo'
      ]
    },
    atualizadoEm: 'Ciclo 2027–2030'
  },
  ariquemes: {
    ateg: {
      titulo: 'Assistência Técnica e Gerencial (ATeG)',
      destaquePrincipal: '485 propriedades atendidas',
      itens: [
        '4.720 visitas realizadas',
        '690 propriedades atendidas',
        '18 técnicos de campo',
        '2 supervisores',
        '1 consultor especialista'
      ]
    },
    formacaoProfissional: {
      titulo: 'Formação Profissional e Aprendizagem',
      destaquePrincipal: '1.890 participantes',
      itens: [
        'Presencial – 1.540 participantes, em 132 turmas',
        'Outras ações de formação profissional – 350 participantes, em 10 ações',
        'Aprendizagem Rural – 8 menores aprendizes, em 1 empresa parceira'
      ]
    },
    formacaoTecnica: {
      titulo: 'Formação Técnica Profissionalizante',
      destaquePrincipal: '34 alunos matriculados',
      subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
      itens: ['2 polos de ensino', '3 cursos técnicos ofertados', '42 alunos formados']
    },
    saudePromocaoSocial: {
      titulo: 'Saúde e Promoção Social',
      destaquePrincipal: '620 participantes',
      itens: [
        'Promoção Social: 530 participantes, em 49 turmas',
        'Atendimento à Saúde: 90 beneficiários atendidos; 45 propriedades atendidas; 2 supervisores/técnicos em campo'
      ]
    },
    atualizadoEm: 'Ciclo 2027–2030'
  },
  'ji-parana': {
    ateg: {
      titulo: 'Assistência Técnica e Gerencial (ATeG)',
      destaquePrincipal: '610 propriedades atendidas',
      itens: [
        '5.940 visitas realizadas',
        '860 propriedades atendidas',
        '22 técnicos de campo',
        '2 supervisores',
        '2 consultores especialistas',
        '1 agente de negócios'
      ]
    },
    formacaoProfissional: {
      titulo: 'Formação Profissional e Aprendizagem',
      destaquePrincipal: '2.310 participantes',
      itens: [
        'Presencial – 1.890 participantes, em 158 turmas',
        'Outras ações de formação profissional – 420 participantes, em 11 ações',
        'Aprendizagem Rural – 13 menores aprendizes, em 2 empresas parceiras'
      ]
    },
    formacaoTecnica: {
      titulo: 'Formação Técnica Profissionalizante',
      destaquePrincipal: '48 alunos matriculados',
      subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
      itens: ['2 polos de ensino', '4 cursos técnicos ofertados', '65 alunos formados']
    },
    saudePromocaoSocial: {
      titulo: 'Saúde e Promoção Social',
      destaquePrincipal: '740 participantes',
      itens: [
        'Promoção Social: 630 participantes, em 58 turmas',
        'Atendimento à Saúde: 110 beneficiários atendidos; 52 propriedades atendidas; 2 supervisores/técnicos em campo'
      ]
    },
    atualizadoEm: 'Ciclo 2027–2030'
  },
  cacoal: {
    ateg: {
      titulo: 'Assistência Técnica e Gerencial (ATeG)',
      destaquePrincipal: '440 propriedades atendidas',
      itens: [
        '4.280 visitas realizadas',
        '615 propriedades atendidas',
        '16 técnicos de campo',
        '1 supervisor',
        '1 consultor especialista'
      ]
    },
    formacaoProfissional: {
      titulo: 'Formação Profissional e Aprendizagem',
      destaquePrincipal: '1.640 participantes',
      itens: [
        'Presencial – 1.340 participantes, em 114 turmas',
        'Outras ações de formação profissional – 300 participantes, em 8 ações'
      ]
    },
    formacaoTecnica: {
      titulo: 'Formação Técnica Profissionalizante',
      destaquePrincipal: '29 alunos matriculados',
      subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
      itens: ['2 polos de ensino', '3 cursos técnicos ofertados', '38 alunos formados']
    },
    saudePromocaoSocial: {
      titulo: 'Saúde e Promoção Social',
      destaquePrincipal: '510 participantes',
      itens: [
        'Promoção Social: 440 participantes, em 42 turmas',
        'Atendimento à Saúde: 70 beneficiários atendidos; 38 propriedades atendidas; 2 supervisores/técnicos em campo'
      ]
    },
    atualizadoEm: 'Ciclo 2027–2030'
  },
  'rolim-de-moura': {
    ateg: {
      titulo: 'Assistência Técnica e Gerencial (ATeG)',
      destaquePrincipal: '395 propriedades atendidas',
      itens: [
        '3.850 visitas realizadas',
        '560 propriedades atendidas',
        '14 técnicos de campo',
        '1 supervisor'
      ]
    },
    formacaoProfissional: {
      titulo: 'Formação Profissional e Aprendizagem',
      destaquePrincipal: '1.420 participantes',
      itens: [
        'Presencial – 1.180 participantes, em 98 turmas',
        'Outras ações de formação profissional – 240 participantes, em 6 ações'
      ]
    },
    formacaoTecnica: {
      titulo: 'Formação Técnica Profissionalizante',
      destaquePrincipal: '24 alunos matriculados',
      subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
      itens: ['2 polos de ensino', '3 cursos técnicos ofertados', '31 alunos formados']
    },
    saudePromocaoSocial: {
      titulo: 'Saúde e Promoção Social',
      destaquePrincipal: '435 participantes',
      itens: [
        'Promoção Social: 375 participantes, em 36 turmas',
        'Atendimento à Saúde: 60 beneficiários atendidos; 31 propriedades atendidas; 1 supervisor/técnico em campo'
      ]
    },
    atualizadoEm: 'Ciclo 2027–2030'
  },
  vilhena: {
    ateg: {
      titulo: 'Assistência Técnica e Gerencial (ATeG)',
      destaquePrincipal: '410 propriedades atendidas',
      itens: [
        '3.980 visitas realizadas',
        '585 propriedades atendidas',
        '15 técnicos de campo',
        '1 supervisor',
        '1 agente de negócios'
      ]
    },
    formacaoProfissional: {
      titulo: 'Formação Profissional e Aprendizagem',
      destaquePrincipal: '1.580 participantes',
      itens: [
        'Presencial – 1.310 participantes, em 112 turmas',
        'Outras ações de formação profissional – 270 participantes, em 7 ações',
        'Treinamento de Agentes Externos – 18 participantes, em 2 turmas'
      ]
    },
    formacaoTecnica: {
      titulo: 'Formação Técnica Profissionalizante',
      destaquePrincipal: '26 alunos matriculados',
      subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
      itens: ['2 polos de ensino', '3 cursos técnicos ofertados', '34 alunos formados']
    },
    saudePromocaoSocial: {
      titulo: 'Saúde e Promoção Social',
      destaquePrincipal: '480 participantes',
      itens: [
        'Promoção Social: 410 participantes, em 39 turmas',
        'Atendimento à Saúde: 70 beneficiários atendidos; 35 propriedades atendidas; 2 supervisores/técnicos em campo'
      ]
    },
    atualizadoEm: 'Ciclo 2027–2030'
  },
  jaru: {
    ateg: {
      titulo: 'Assistência Técnica e Gerencial (ATeG)',
      destaquePrincipal: '360 propriedades atendidas',
      itens: [
        '3.480 visitas realizadas',
        '510 propriedades atendidas',
        '13 técnicos de campo',
        '1 supervisor'
      ]
    },
    formacaoProfissional: {
      titulo: 'Formação Profissional e Aprendizagem',
      destaquePrincipal: '1.280 participantes',
      itens: [
        'Presencial – 1.060 participantes, em 92 turmas',
        'Outras ações de formação profissional – 220 participantes, em 6 ações'
      ]
    },
    formacaoTecnica: {
      titulo: 'Formação Técnica Profissionalizante',
      destaquePrincipal: '14 alunos matriculados',
      subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
      itens: ['1 polo de ensino', '2 cursos técnicos ofertados', '19 alunos formados']
    },
    saudePromocaoSocial: {
      titulo: 'Saúde e Promoção Social',
      destaquePrincipal: '395 participantes',
      itens: [
        'Promoção Social: 340 participantes, em 32 turmas',
        'Atendimento à Saúde: 55 beneficiários atendidos; 28 propriedades atendidas; 1 supervisor/técnico em campo'
      ]
    },
    atualizadoEm: 'Ciclo 2027–2030'
  },
  'ouro-preto-do-oeste': {
    ateg: {
      titulo: 'Assistência Técnica e Gerencial (ATeG)',
      destaquePrincipal: '310 propriedades atendidas',
      itens: [
        '3.020 visitas realizadas',
        '440 propriedades atendidas',
        '11 técnicos de campo',
        '1 supervisor'
      ]
    },
    formacaoProfissional: {
      titulo: 'Formação Profissional e Aprendizagem',
      destaquePrincipal: '1.120 participantes',
      itens: [
        'Presencial – 930 participantes, em 81 turmas',
        'Outras ações de formação profissional – 190 participantes, em 5 ações'
      ]
    },
    formacaoTecnica: {
      titulo: 'Formação Técnica Profissionalizante',
      destaquePrincipal: '12 alunos matriculados',
      subtitulo: 'Rede de Ensino Rede e-Tec no SENAR-AR/RO',
      itens: ['1 polo de ensino', '2 cursos técnicos ofertados', '15 alunos formados']
    },
    saudePromocaoSocial: {
      titulo: 'Saúde e Promoção Social',
      destaquePrincipal: '350 participantes',
      itens: [
        'Promoção Social: 305 participantes, em 29 turmas',
        'Atendimento à Saúde: 45 beneficiários atendidos; 24 propriedades atendidas; 1 supervisor/técnico em campo'
      ]
    },
    atualizadoEm: 'Ciclo 2027–2030'
  }
};
