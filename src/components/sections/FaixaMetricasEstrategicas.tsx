import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Users,
  Award,
  HeartHandshake,
  TrendingUp,
  Edit3,
  Plus,
  Trash2,
  RotateCcw,
  X,
  Check,
  Sprout,
  BarChart3,
  GraduationCap,
  Building2,
  Image as ImageIcon,
  Target,
  Globe2
} from 'lucide-react';
import { MapaRondoniaModal, MapaRondoniaOpenRequest } from '../modals/MapaRondoniaModal';
import { FichaTecnicaObjetivo } from '../../types/strategic';

type MetricIconKey =
  | 'MapPin'
  | 'Users'
  | 'Award'
  | 'HeartHandshake'
  | 'TrendingUp'
  | 'Sprout'
  | 'BarChart3'
  | 'GraduationCap'
  | 'Building2'
  | 'Globe2'
  | 'Target';

interface MetricaCardItem {
  id: string;
  valor: string;
  titulo: string;
  subtitulo: string;
  icone: MetricIconKey;
}

interface FaixaMetricasConfig {
  kicker: string;
  titulo: string;
  ciclo: string;
  cards: MetricaCardItem[];
}

interface PrevisaoAnualLinha {
  id: string;
  indicador: string;
  ano2027: string;
  ano2028: string;
  ano2029: string;
  ano2030: string;
  totalPpa: string;
}

interface FichaPrevisaoConfig {
  tituloFicha: string;
  subtituloFicha: string;
  colunaPrincipal: string;
  linhas: PrevisaoAnualLinha[];
}

const STORAGE_KEY_FAIXA_LEGACY = 'senar_faixa_metricas_v1';
const STORAGE_KEY_FAIXA_V2 = 'senar_faixa_metricas_v2';
const STORAGE_KEY_FAIXA_V3 = 'senar_faixa_metricas_v3';
const STORAGE_KEY_FAIXA = 'senar_faixa_metricas_v4';
const STORAGE_KEY_FICHA = 'senar_ficha_previsao_anual_v1';

const DEFAULT_FAIXA_CONFIG: FaixaMetricasConfig = {
  kicker: 'Impacto Institucional Comprovado',
  titulo: 'Indicadores de Transformação no Agro de Rondônia',
  ciclo: 'Ciclo Estratégico 2027–2030',
  cards: [
    {
      id: 'metric-1',
      valor: '52 / 52',
      titulo: 'Municípios Cobertos',
      subtitulo: '100% de capilaridade estadual',
      icone: 'MapPin'
    }
  ]
};

const DEFAULT_FICHA_CONFIG: FichaPrevisaoConfig = {
  tituloFicha: 'Previsão Anual (2027–2030)',
  subtituloFicha: 'Projeção Consolidada de Atendimento e Turmas · PPA Até 2030',
  colunaPrincipal: 'Previsão Anual ( 2027-2030)',
  linhas: [
    {
      id: 'prev-1',
      indicador: 'Quantidade de Turmas',
      ano2027: '1.574',
      ano2028: '1.810',
      ano2029: '2.082',
      ano2030: '2.384',
      totalPpa: '7.850'
    },
    {
      id: 'prev-2',
      indicador: 'Quantidade de Atendimento',
      ano2027: '28.184',
      ano2028: '32.370',
      ano2029: '37.226',
      ano2030: '42.809',
      totalPpa: '140.489'
    },
    {
      id: 'prev-3',
      indicador: 'Quantidade de Produtores Atendidos',
      ano2027: '8.444',
      ano2028: '9.711',
      ano2029: '11.168',
      ano2030: '12.843',
      totalPpa: '42.166'
    }
  ]
};

const ICON_OPTIONS: { value: MetricIconKey; label: string }[] = [
  { value: 'MapPin', label: 'Localização / Municípios' },
  { value: 'Users', label: 'Produtores / Pessoas' },
  { value: 'Award', label: 'Qualificação / Reconhecimento' },
  { value: 'HeartHandshake', label: 'Satisfação / NPS' },
  { value: 'TrendingUp', label: 'Crescimento / Resultado' },
  { value: 'Sprout', label: 'Agro / Sustentabilidade' },
  { value: 'BarChart3', label: 'Indicadores / Dados' },
  { value: 'GraduationCap', label: 'Educação / Formação' },
  { value: 'Building2', label: 'Institucional / Unidades' },
  { value: 'Globe2', label: 'Competitividade / Mercado' },
  { value: 'Target', label: 'Objetivo / Foco' }
];

function renderMetricIcon(key: MetricIconKey) {
  const cls = 'w-4 h-4';
  switch (key) {
    case 'MapPin':
      return <MapPin className={cls} />;
    case 'Users':
      return <Users className={cls} />;
    case 'Award':
      return <Award className={cls} />;
    case 'HeartHandshake':
      return <HeartHandshake className={cls} />;
    case 'TrendingUp':
      return <TrendingUp className={cls} />;
    case 'Sprout':
      return <Sprout className={cls} />;
    case 'BarChart3':
      return <BarChart3 className={cls} />;
    case 'GraduationCap':
      return <GraduationCap className={cls} />;
    case 'Building2':
      return <Building2 className={cls} />;
    case 'Globe2':
      return <Globe2 className={cls} />;
    case 'Target':
      return <Target className={cls} />;
    default:
      return <Award className={cls} />;
  }
}

interface FaixaMetricasEstrategicasProps {
  externalOpenRequest?: MapaRondoniaOpenRequest | null;
  fichas?: FichaTecnicaObjetivo[];
  onChangeFichas?: React.Dispatch<React.SetStateAction<FichaTecnicaObjetivo[]>>;
}

export const FaixaMetricasEstrategicas: React.FC<FaixaMetricasEstrategicasProps> = ({
  externalOpenRequest,
  fichas,
  onChangeFichas
}) => {
  const [config, setConfig] = useState<FaixaMetricasConfig>(() => {
    try {
      const savedV4 = localStorage.getItem(STORAGE_KEY_FAIXA);
      if (savedV4) {
        const parsed = JSON.parse(savedV4);
        if (parsed && Array.isArray(parsed.cards)) return parsed;
      }
      const savedPrev =
        localStorage.getItem(STORAGE_KEY_FAIXA_V3) ||
        localStorage.getItem(STORAGE_KEY_FAIXA_V2) ||
        localStorage.getItem(STORAGE_KEY_FAIXA_LEGACY);
      if (savedPrev) {
        const parsed = JSON.parse(savedPrev);
        if (parsed && Array.isArray(parsed.cards) && parsed.cards.length > 0) {
          const firstCard =
            parsed.cards.find((c: MetricaCardItem) => c.id === 'metric-1') || parsed.cards[0];
          return {
            ...DEFAULT_FAIXA_CONFIG,
            kicker: parsed.kicker || DEFAULT_FAIXA_CONFIG.kicker,
            titulo: parsed.titulo || DEFAULT_FAIXA_CONFIG.titulo,
            ciclo: parsed.ciclo || DEFAULT_FAIXA_CONFIG.ciclo,
            cards: firstCard ? [firstCard] : DEFAULT_FAIXA_CONFIG.cards
          };
        }
      }
    } catch {
      // fallback to default
    }
    return DEFAULT_FAIXA_CONFIG;
  });

  const [fichaConfig, setFichaConfig] = useState<FichaPrevisaoConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FICHA);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.linhas)) return parsed;
      }
    } catch {
      // fallback to default
    }
    return DEFAULT_FICHA_CONFIG;
  });

  const [isFichaOpen, setIsFichaOpen] = useState(false);
  const [isMapaRondoniaOpen, setIsMapaRondoniaOpen] = useState(false);
  const [isEditFaixaOpen, setIsEditFaixaOpen] = useState(false);
  const [draftConfig, setDraftConfig] = useState<FaixaMetricasConfig>(config);

  const [isEditingFicha, setIsEditingFicha] = useState(false);
  const [showOriginalImage, setShowOriginalImage] = useState(false);
  const [draftFicha, setDraftFicha] = useState<FichaPrevisaoConfig>(fichaConfig);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FAIXA, JSON.stringify(config));
      window.dispatchEvent(new CustomEvent('senar_faixa_metricas_sync_v1'));
    } catch {
      // ignore storage errors
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FICHA, JSON.stringify(fichaConfig));
    } catch {
      // ignore storage errors
    }
  }, [fichaConfig]);

  useEffect(() => {
    if (externalOpenRequest) {
      setIsMapaRondoniaOpen(true);
    }
  }, [externalOpenRequest]);

  const openEditFaixa = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftConfig(JSON.parse(JSON.stringify(config)));
    setIsEditFaixaOpen(true);
  };

  const handleSaveFaixa = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(draftConfig);
    setIsEditFaixaOpen(false);
  };

  const handleAddCard = () => {
    setDraftConfig(prev => ({
      ...prev,
      cards: [
        ...prev.cards,
        {
          id: `metric-${Date.now()}`,
          valor: '0',
          titulo: 'Novo Indicador',
          subtitulo: 'Descrição do indicador',
          icone: 'TrendingUp'
        }
      ]
    }));
  };

  const handleUpdateCard = (id: string, field: keyof MetricaCardItem, value: string) => {
    setDraftConfig(prev => ({
      ...prev,
      cards: prev.cards.map(c => (c.id === id ? { ...c, [field]: value } : c))
    }));
  };

  const handleDeleteCard = (id: string) => {
    setDraftConfig(prev => ({
      ...prev,
      cards: prev.cards.filter(c => c.id !== id)
    }));
  };

  const handleResetFaixa = () => {
    setDraftConfig(JSON.parse(JSON.stringify(DEFAULT_FAIXA_CONFIG)));
  };

  const openFichaModal = () => {
    setDraftFicha(JSON.parse(JSON.stringify(fichaConfig)));
    setIsEditingFicha(false);
    setShowOriginalImage(false);
    setIsFichaOpen(true);
  };

  const handleSaveFicha = () => {
    setFichaConfig(draftFicha);
    setIsEditingFicha(false);
  };

  const handleAddFichaLinha = () => {
    setDraftFicha(prev => ({
      ...prev,
      linhas: [
        ...prev.linhas,
        {
          id: `prev-${Date.now()}`,
          indicador: 'Novo Indicador Anual',
          ano2027: '0',
          ano2028: '0',
          ano2029: '0',
          ano2030: '0',
          totalPpa: '0'
        }
      ]
    }));
  };

  const handleUpdateFichaLinha = (id: string, field: keyof PrevisaoAnualLinha, value: string) => {
    setDraftFicha(prev => ({
      ...prev,
      linhas: prev.linhas.map(l => (l.id === id ? { ...l, [field]: value } : l))
    }));
  };

  const handleDeleteFichaLinha = (id: string) => {
    setDraftFicha(prev => ({
      ...prev,
      linhas: prev.linhas.filter(l => l.id !== id)
    }));
  };

  const handleResetFicha = () => {
    const resetCopy = JSON.parse(JSON.stringify(DEFAULT_FICHA_CONFIG));
    setDraftFicha(resetCopy);
    setFichaConfig(resetCopy);
  };

  return (
    <section className="bg-gradient-to-r from-emerald-950 via-[#004d26] to-[#006837] text-white py-10 border-y border-emerald-800 shadow-inner relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Selected editable & clickable container (section:nth-of-type(1) > div:nth-of-type(2)) */}
      <div
        onClick={openFichaModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFichaModal();
          }
        }}
        title="Clique para abrir a Ficha de Previsão Anual (2027–2030)"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 cursor-pointer group/faixa focus:outline-none"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/20 flex items-center justify-center text-emerald-300">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300 font-bold block">
                {config.kicker}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {config.titulo}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-emerald-200/80 font-mono mr-1">
              {config.ciclo}
            </span>

            <button
              type="button"
              onClick={openEditFaixa}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/25 hover:bg-emerald-500/40 border border-emerald-300/35 text-xs font-semibold text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-200" />
              <span>Editar Indicadores</span>
            </button>
          </div>
        </div>

        {/* Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {config.cards.map((card, idx) => {
            const isMunicipiosCard = idx === 0 || card.id === 'metric-1';
            return (
              <div
                key={card.id}
                onClick={
                  isMunicipiosCard
                    ? (e) => {
                        e.stopPropagation();
                        setIsMapaRondoniaOpen(true);
                      }
                    : undefined
                }
                role={isMunicipiosCard ? 'button' : undefined}
                tabIndex={isMunicipiosCard ? 0 : undefined}
                onKeyDown={
                  isMunicipiosCard
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsMapaRondoniaOpen(true);
                        }
                      }
                    : undefined
                }
                title={
                  isMunicipiosCard
                    ? 'Clique para abrir o Mapa de Rondônia (Senar em números por município)'
                    : undefined
                }
                className="p-4 sm:p-5 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/15 hover:border-emerald-300/50 hover:bg-white/15 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                    {card.valor}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                    {renderMetricIcon(card.icone)}
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">{card.titulo}</div>
                <div className="text-[11px] text-emerald-200/90 mt-0.5">{card.subtitulo}</div>
                {isMunicipiosCard && (
                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                    <MapPin className="w-3 h-3" />
                    <span>Abrir Mapa de Rondônia</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL 1: FICHA DE PREVISÃO ANUAL (2027-2030) */}
      {isFichaOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsFichaOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
              {showOriginalImage ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col items-center">
                  <img
                    src="/assets/aistudio/image_bce59bdf.png"
                    alt="Tabela Previsão Anual (2027-2030) - SENAR Rondônia"
                    className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-xs"
                  />
                  <p className="text-xs text-slate-500 mt-3">
                    Quadro oficial de Previsão Anual (2027–2030) e Total PPA Até 2030.
                  </p>
                </div>
              ) : (
                <>
                  {isEditingFicha && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Título da Ficha
                        </label>
                        <input
                          type="text"
                          value={draftFicha.tituloFicha}
                          onChange={(e) => setDraftFicha({ ...draftFicha, tituloFicha: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={draftFicha.subtituloFicha}
                          onChange={(e) => setDraftFicha({ ...draftFicha, subtituloFicha: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Cabeçalho 1ª Coluna
                        </label>
                        <input
                          type="text"
                          value={draftFicha.colunaPrincipal}
                          onChange={(e) => setDraftFicha({ ...draftFicha, colunaPrincipal: e.target.value })}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Official Green Table matching attached image */}
                  <div className="overflow-x-auto rounded-xl border border-[#146c2e]/25 shadow-sm">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-[#146c2e] text-white">
                          <th className="text-left py-3 px-4 font-bold border-r border-white/25 min-w-[240px]">
                            {isEditingFicha ? draftFicha.colunaPrincipal : fichaConfig.colunaPrincipal}
                          </th>
                          <th className="text-center py-3 px-3.5 font-bold border-r border-white/25 whitespace-nowrap">
                            2027
                          </th>
                          <th className="text-center py-3 px-3.5 font-bold border-r border-white/25 whitespace-nowrap">
                            2028
                          </th>
                          <th className="text-center py-3 px-3.5 font-bold border-r border-white/25 whitespace-nowrap">
                            2029
                          </th>
                          <th className="text-center py-3 px-3.5 font-bold border-r border-white/25 whitespace-nowrap">
                            2030
                          </th>
                          <th className="text-center py-3 px-4 font-bold whitespace-nowrap leading-tight">
                            Total PPA
                            <br />
                            Até 2030
                          </th>
                          {isEditingFicha && (
                            <th className="text-center py-3 px-2.5 font-bold border-l border-white/25 w-12">
                              Ação
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {(isEditingFicha ? draftFicha.linhas : fichaConfig.linhas).map((linha, idx) => (
                          <tr
                            key={linha.id}
                            className={`border-t border-white ${
                              idx % 2 === 0 ? 'bg-[#ced8ce]' : 'bg-[#e7ece7]'
                            } text-slate-900`}
                          >
                            <td className="py-2.5 px-4 font-medium border-r border-white">
                              {isEditingFicha ? (
                                <input
                                  type="text"
                                  value={linha.indicador}
                                  onChange={(e) => handleUpdateFichaLinha(linha.id, 'indicador', e.target.value)}
                                  className="w-full px-2.5 py-1 text-xs rounded border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                                />
                              ) : (
                                linha.indicador
                              )}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-medium tabular-nums border-r border-white">
                              {isEditingFicha ? (
                                <input
                                  type="text"
                                  value={linha.ano2027}
                                  onChange={(e) => handleUpdateFichaLinha(linha.id, 'ano2027', e.target.value)}
                                  className="w-20 text-center px-2 py-1 text-xs rounded border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                                />
                              ) : (
                                linha.ano2027
                              )}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-medium tabular-nums border-r border-white">
                              {isEditingFicha ? (
                                <input
                                  type="text"
                                  value={linha.ano2028}
                                  onChange={(e) => handleUpdateFichaLinha(linha.id, 'ano2028', e.target.value)}
                                  className="w-20 text-center px-2 py-1 text-xs rounded border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                                />
                              ) : (
                                linha.ano2028
                              )}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-medium tabular-nums border-r border-white">
                              {isEditingFicha ? (
                                <input
                                  type="text"
                                  value={linha.ano2029}
                                  onChange={(e) => handleUpdateFichaLinha(linha.id, 'ano2029', e.target.value)}
                                  className="w-20 text-center px-2 py-1 text-xs rounded border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                                />
                              ) : (
                                linha.ano2029
                              )}
                            </td>
                            <td className="py-2.5 px-3.5 text-center font-medium tabular-nums border-r border-white">
                              {isEditingFicha ? (
                                <input
                                  type="text"
                                  value={linha.ano2030}
                                  onChange={(e) => handleUpdateFichaLinha(linha.id, 'ano2030', e.target.value)}
                                  className="w-20 text-center px-2 py-1 text-xs rounded border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                                />
                              ) : (
                                linha.ano2030
                              )}
                            </td>
                            <td className="py-2.5 px-4 text-center font-bold tabular-nums text-[#004d26]">
                              {isEditingFicha ? (
                                <input
                                  type="text"
                                  value={linha.totalPpa}
                                  onChange={(e) => handleUpdateFichaLinha(linha.id, 'totalPpa', e.target.value)}
                                  className="w-24 text-center px-2 py-1 text-xs font-bold rounded border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                                />
                              ) : (
                                linha.totalPpa
                              )}
                            </td>
                            {isEditingFicha && (
                              <td className="py-2.5 px-2 text-center border-l border-white">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteFichaLinha(linha.id)}
                                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                                  title="Excluir linha"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {isEditingFicha && (
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleAddFichaLinha}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#006837] border border-emerald-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Adicionar Linha</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleResetFicha}
                          className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restaurar Padrão</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingFicha(false)}
                          className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 text-xs font-semibold cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveFicha}
                          className="px-3.5 py-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Salvar Alterações</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>SENAR Rondônia · Planejamento Estratégico 2027–2030</span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowOriginalImage((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                    showOriginalImage
                      ? 'bg-[#006837] text-white border-[#006837]'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{showOriginalImage ? 'Ver Tabela Interativa' : 'Ver Imagem Anexada'}</span>
                </button>

                {!showOriginalImage && (
                  <button
                    type="button"
                    onClick={() => {
                      if (isEditingFicha) {
                        handleSaveFicha();
                      } else {
                        setDraftFicha(JSON.parse(JSON.stringify(fichaConfig)));
                        setIsEditingFicha(true);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isEditingFicha ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Salvar Ficha</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar Ficha</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsFichaOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDITAR CONTEÚDO DA DIV (INDICADORES DE IMPACTO) */}
      {isEditFaixaOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsEditFaixaOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 bg-gradient-to-r from-[#004d26] to-[#006837] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-emerald-200" />
                <div>
                  <h4 className="text-base font-bold text-white">Editar Conteúdo — Impacto Institucional Comprovado</h4>
                  <p className="text-xs text-emerald-100/90">
                    Altere títulos, valores, ícones ou adicione e remova indicadores da faixa.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditFaixaOpen(false)}
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaixa} className="p-5 sm:p-6 overflow-y-auto space-y-5">
              {/* Cabeçalho da Faixa */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Rótulo Superior (Kicker)
                  </label>
                  <input
                    type="text"
                    value={draftConfig.kicker}
                    onChange={(e) => setDraftConfig({ ...draftConfig, kicker: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Título Principal da Faixa
                  </label>
                  <input
                    type="text"
                    value={draftConfig.titulo}
                    onChange={(e) => setDraftConfig({ ...draftConfig, titulo: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Texto do Ciclo (Direita)
                  </label>
                  <input
                    type="text"
                    value={draftConfig.ciclo}
                    onChange={(e) => setDraftConfig({ ...draftConfig, ciclo: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                  />
                </div>
              </div>

              {/* Cards Editor */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Cartões de Indicadores ({draftConfig.cards.length})
                  </h5>
                  <button
                    type="button"
                    onClick={handleAddCard}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#006837] border border-emerald-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Cartão</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {draftConfig.cards.map((card, idx) => (
                    <div
                      key={card.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          Indicador #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteCard(card.id)}
                          disabled={draftConfig.cards.length <= 1}
                          className="p-1 rounded text-rose-600 hover:bg-rose-100 disabled:opacity-40 cursor-pointer"
                          title="Excluir cartão"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Valor Destaque
                          </label>
                          <input
                            type="text"
                            value={card.valor}
                            onChange={(e) => handleUpdateCard(card.id, 'valor', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Ícone
                          </label>
                          <select
                            value={card.icone}
                            onChange={(e) => handleUpdateCard(card.id, 'icone', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                          >
                            {ICON_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Título
                        </label>
                        <input
                          type="text"
                          value={card.titulo}
                          onChange={(e) => handleUpdateCard(card.id, 'titulo', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Subtítulo / Descrição
                        </label>
                        <input
                          type="text"
                          value={card.subtitulo}
                          onChange={(e) => handleUpdateCard(card.id, 'subtitulo', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-[#006837]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleResetFaixa}
                  className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Padrão</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditFaixaOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#006837] hover:bg-[#004d26] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Salvar Alterações</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: MAPA INTERATIVO DE RONDÔNIA (52 MUNICÍPIOS · SENAR EM NÚMEROS) */}
      <MapaRondoniaModal
        isOpen={isMapaRondoniaOpen}
        onClose={() => setIsMapaRondoniaOpen(false)}
        initialRequest={externalOpenRequest}
        fichas={fichas}
        onChangeFichas={onChangeFichas}
      />
    </section>
  );
};
