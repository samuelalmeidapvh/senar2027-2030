import React, { useState, useEffect } from 'react';
import { 
  ObjetivoEstrategico, 
  IndicadorKPI, 
  PlanoAcao5W2H, 
  UsuarioAutenticado,
  InsightEstrategicoIA,
  SiglaUnidade,
  FichaTecnicaObjetivo,
  ResultadoSociedade
} from './types/strategic';
import { 
  INDICADORES_KPIS, 
  OBJETIVOS_ESTRATEGICOS, 
  PLANOS_ACAO,
  USUARIOS_DEMO,
  INSIGHT_INICIAL_ESTRATEGICO,
  RESULTADOS_SOCIEDADE
} from './data/initialStrategicData';
import { FICHAS_TECNICAS_INICIAIS } from './data/fichasTecnicasData';

import { HeaderFixed } from './components/layout/HeaderFixed';
import { FooterInstitutional } from './components/layout/FooterInstitutional';
import { ZebraSection } from './components/layout/ZebraSection';

import { HeroProposito } from './components/sections/HeroProposito';
import { MapaEstrategicoBSC } from './components/sections/MapaEstrategicoBSC';
import {
  MapaRondoniaModal,
  MapaRondoniaOpenRequest,
  MapaRondoniaSection
} from './components/modals/MapaRondoniaModal';
import { FichasTecnicasObjetivosBSC } from './components/sections/FichasTecnicasObjetivosBSC';
import { KpiDashboard } from './components/sections/KpiDashboard';
import { PainelGeminiAI } from './components/sections/PainelGeminiAI';
import { ArquiteturaEspecificacoes } from './components/sections/ArquiteturaEspecificacoes';

import { ObjetivoPopoverModal } from './components/modals/ObjetivoPopoverModal';
import { AuthModal } from './components/modals/AuthModal';
import { CmsActionModal } from './components/modals/CmsActionModal';
import { KpiEditModal } from './components/modals/KpiEditModal';

const FICHAS_STORAGE_KEY = 'senar_fichas_tecnicas_objetivos_v3';
const KPIS_PAINEL_STORAGE_KEY = 'senar_kpis_painel_v1';
const OBJETIVOS_STORAGE_KEY = 'senar_objetivos_bsc_v1';
const RESULTADOS_SOCIEDADE_STORAGE_KEY = 'senar_resultados_sociedade_v1';

export default function App() {
  const [objetivos, setObjetivos] = useState<ObjetivoEstrategico[]>(() => {
    try {
      const saved = localStorage.getItem(OBJETIVOS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((o: ObjetivoEstrategico) => {
            if (o.id === 'obj-1' || o.codigo === 'OE-01') {
              return { ...o, perspectiva: 'CLIENTES' };
            }
            if (
              o.id === 'obj-3' ||
              o.codigo === 'OE-03' ||
              o.descricao ===
                'Gerir com excelência os recursos financeiros e humanos, os processos operacionais com foco no aumento da maturidade de gestão.'
            ) {
              return {
                ...o,
                descricao:
                  'Gerir com excelência as finanças, a operação e os recursos humanos com foco no aumento da maturidade de gestão.'
              };
            }
            return o;
          });
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar objetivos salvos, usando padrão:', e);
    }
    return OBJETIVOS_ESTRATEGICOS;
  });
  const [kpis, setKpis] = useState<IndicadorKPI[]>(() => {
    try {
      const saved = localStorage.getItem(KPIS_PAINEL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Erro ao carregar KPIs salvos, usando dados iniciais:', e);
    }
    return INDICADORES_KPIS;
  });
  const [fichas, setFichas] = useState<FichaTecnicaObjetivo[]>(() => {
    try {
      const saved = localStorage.getItem(FICHAS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((f: FichaTecnicaObjetivo) => {
            if (f.id === 'ficha-oe-02-gestao' && (!f.temas || f.temas.length === 0)) {
              const official = FICHAS_TECNICAS_INICIAIS.find(o => o.id === 'ficha-oe-02-gestao');
              if (official) return official;
            }
            if (
              f.id === 'ficha-oe-02-gestao' ||
              f.enunciado ===
                'Gerir com excelência os recursos financeiros e humanos, os processos operacionais com foco no aumento da maturidade de gestão.'
            ) {
              return {
                ...f,
                enunciado:
                  'Gerir com excelência as finanças, a operação e os recursos humanos com foco no aumento da maturidade de gestão.'
              };
            }
            return f;
          });
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar fichas salvas, usando dados oficiais:', e);
    }
    return FICHAS_TECNICAS_INICIAIS;
  });
  const [resultadosSociedade, setResultadosSociedade] = useState<ResultadoSociedade[]>(() => {
    try {
      const saved = localStorage.getItem(RESULTADOS_SOCIEDADE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Hidrata metas padrão nos cards que estavam sem metaValor definida
          return parsed.map((item: ResultadoSociedade) => {
            const def = RESULTADOS_SOCIEDADE.find(d => d.id === item.id);
            if (!def) return item;
            return {
              ...item,
              metaTitulo: item.metaTitulo?.trim() ? item.metaTitulo : def.metaTitulo,
              metaValor: item.metaValor?.trim() ? item.metaValor : def.metaValor
            };
          });
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar resultados da sociedade, usando padrão:', e);
    }
    return RESULTADOS_SOCIEDADE;
  });
  const [planos, setPlanos] = useState<PlanoAcao5W2H[]>(PLANOS_ACAO);

  // Auth User: Default to Dr. Emerson Lira (Superintendente) for immediate CMS testing
  const [usuarioAtivo, setUsuarioAtivo] = useState<UsuarioAutenticado | null>(USUARIOS_DEMO[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Modals state
  const [selectedObjetivo, setSelectedObjetivo] = useState<ObjetivoEstrategico | null>(null);
  const [editingPlano, setEditingPlano] = useState<PlanoAcao5W2H | null>(null);
  const [isNewPlanoModalOpen, setIsNewPlanoModalOpen] = useState<boolean>(false);
  const [newPlanoUnidade, setNewPlanoUnidade] = useState<SiglaUnidade>('DETEC');
  const [editingKpi, setEditingKpi] = useState<IndicadorKPI | null>(null);
  const [consolidadoRequest, setConsolidadoRequest] = useState<MapaRondoniaOpenRequest | null>(null);
  const [isMapaModalOpen, setIsMapaModalOpen] = useState<boolean>(false);

  // AI Insights State - Initialized with baseline diagnostic
  const [aiInsight, setAiInsight] = useState<InsightEstrategicoIA | null>(INSIGHT_INICIAL_ESTRATEGICO);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  // Persist Fichas Técnicas & Panel KPIs
  useEffect(() => {
    try {
      localStorage.setItem(FICHAS_STORAGE_KEY, JSON.stringify(fichas));
    } catch (e) {
      console.error('Erro ao salvar fichas no localStorage:', e);
    }
  }, [fichas]);

  useEffect(() => {
    try {
      localStorage.setItem(KPIS_PAINEL_STORAGE_KEY, JSON.stringify(kpis));
    } catch (e) {
      console.error('Erro ao salvar KPIs do painel no localStorage:', e);
    }
  }, [kpis]);

  useEffect(() => {
    try {
      localStorage.setItem(OBJETIVOS_STORAGE_KEY, JSON.stringify(objetivos));
    } catch (e) {
      console.error('Erro ao salvar objetivos no localStorage:', e);
    }
  }, [objetivos]);

  useEffect(() => {
    try {
      localStorage.setItem(RESULTADOS_SOCIEDADE_STORAGE_KEY, JSON.stringify(resultadosSociedade));
    } catch (e) {
      console.error('Erro ao salvar resultados da sociedade no localStorage:', e);
    }
  }, [resultadosSociedade]);

  // Initial Data Fetch (preserva alterações locais já salvas pelo usuário)
  useEffect(() => {
    const hasLocalKpis = Boolean(localStorage.getItem(KPIS_PAINEL_STORAGE_KEY));
    const hasLocalObjetivos = Boolean(localStorage.getItem(OBJETIVOS_STORAGE_KEY));
    fetch('/api/strategic-data')
      .then(res => res.json())
      .then(data => {
        if (data.objetivos && !hasLocalObjetivos) setObjetivos(data.objetivos);
        if (data.kpis && !hasLocalKpis) setKpis(data.kpis);
        if (data.planosAcao) setPlanos(data.planosAcao);
      })
      .catch(err => {
        console.warn('Usando dados locais sincronizados:', err.message);
      });
  }, []);

  // AI Handler
  const handleRunAiAnalysis = async (customPrompt?: string): Promise<InsightEstrategicoIA | null> => {
    setLoadingAi(true);
    try {
      const res = await fetch('/api/gemini/strategic-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptPersonalizado: customPrompt })
      });
      const data = await res.json();
      setAiInsight(data);
      return data;
    } catch (err: any) {
      console.error('Erro na análise de IA:', err);
      return null;
    } finally {
      setLoadingAi(false);
    }
  };

  // CMS Handlers: Action Plans CRUD (used by CmsActionModal)
  const handleSavePlano = async (planoData: Partial<PlanoAcao5W2H>) => {
    if (planoData.id) {
      try {
        const res = await fetch(`/api/action-plans/${planoData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(planoData)
        });
        const data = await res.json();
        if (data.plano) {
          setPlanos(prev => prev.map(p => p.id === data.plano.id ? data.plano : p));
        }
      } catch (err) {
        setPlanos(prev => prev.map(p => p.id === planoData.id ? { ...p, ...planoData } as PlanoAcao5W2H : p));
      }
    } else {
      try {
        const res = await fetch('/api/action-plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(planoData)
        });
        const data = await res.json();
        if (data.plano) {
          setPlanos(prev => [data.plano, ...prev]);
        }
      } catch (err) {
        const localNew: PlanoAcao5W2H = {
          id: `pa-${Date.now()}`,
          codigo: planoData.codigo || `PA-${planoData.unidadeResponsavel || 'RO'}-${planos.length + 1}`,
          titulo: planoData.titulo || '',
          objetivoId: planoData.objetivoId || objetivos[0].id,
          unidadeResponsavel: planoData.unidadeResponsavel || 'DETEC',
          oQue: planoData.oQue || '',
          porQue: planoData.porQue || '',
          onde: planoData.onde || '',
          quem: planoData.quem || '',
          quandoInicio: planoData.quandoInicio || '',
          quandoFim: planoData.quandoFim || '',
          como: planoData.como || '',
          quantoCusta: planoData.quantoCusta || 0,
          progressoPercentual: planoData.progressoPercentual || 0,
          status: planoData.status || 'PLANEJADO',
          marcosPrincipais: [
            { descricao: 'Início da execução', concluido: false, dataLimite: planoData.quandoInicio || '' }
          ]
        };
        setPlanos(prev => [localNew, ...prev]);
      }
    }
  };

  // CMS Handler: KPI Update
  const handleSaveKpiMedicao = async (kpiId: string, realizado: number, meta: number) => {
    try {
      const res = await fetch(`/api/kpis/${kpiId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ realizado, meta })
      });
      const data = await res.json();
      if (data.kpi) {
        setKpis(prev => prev.map(k => k.id === kpiId ? data.kpi : k));
      }
    } catch (e) {
      setKpis(prev => prev.map(k => {
        if (k.id === kpiId) {
          const ratio = meta > 0 ? realizado / meta : 0;
          return {
            ...k,
            realizado,
            meta,
            status: ratio >= 0.98 ? 'EXCELENTE' : ratio >= 0.88 ? 'NO_RUMO' : ratio >= 0.75 ? 'ATENCAO' : 'CRITICO'
          };
        }
        return k;
      }));
    }
  };

  const handleSaveComplementaryKpi = (
    kpi: IndicadorKPI,
    isNew?: boolean,
    targetObjetivoId?: string
  ) => {
    setKpis(prev => {
      if (isNew || !prev.some(item => item.id === kpi.id)) {
        return [kpi, ...prev];
      }
      return prev.map(item => (item.id === kpi.id ? kpi : item));
    });

    const objIdToLink = targetObjetivoId || kpi.objetivoId;
    if (isNew && objIdToLink) {
      setObjetivos(prev =>
        prev.map(o =>
          o.id === objIdToLink && !o.kpisAssociados.includes(kpi.id)
            ? { ...o, kpisAssociados: [...o.kpisAssociados, kpi.id] }
            : o
        )
      );
      setSelectedObjetivo(prev =>
        prev && prev.id === objIdToLink && !prev.kpisAssociados.includes(kpi.id)
          ? { ...prev, kpisAssociados: [...prev.kpisAssociados, kpi.id] }
          : prev
      );
    }
  };

  const handleDeleteComplementaryKpi = (kpiId: string) => {
    setKpis(prev => prev.filter(item => item.id !== kpiId));
    setObjetivos(prev =>
      prev.map(o => ({
        ...o,
        kpisAssociados: o.kpisAssociados.filter(id => id !== kpiId)
      }))
    );
    setSelectedObjetivo(prev =>
      prev
        ? {
            ...prev,
            kpisAssociados: prev.kpisAssociados.filter(id => id !== kpiId)
          }
        : null
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* 1. Header Fixo com âncoras suaves e Top Bar Contract */}
      <HeaderFixed
        usuarioAtivo={usuarioAtivo}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => setUsuarioAtivo(USUARIOS_DEMO[4])} // Switch to public visitor
        onOpenCms={() => {
          setNewPlanoUnidade(usuarioAtivo?.unidade || 'DETEC');
          setIsNewPlanoModalOpen(true);
        }}
        onOpenSpecs={() => scrollToSection('especificacoes-api')}
      />

      {/* Main Infinite Scroll Chapters with Zebra Striping */}
      <main className="flex-1">
        
        {/* CHAPTER 1: Propósito Institucional (Missão, Visão e Valores) */}
        <HeroProposito
          onExploreClick={() => scrollToSection('mapa-bsc')}
          onOpenGeminiClick={() => scrollToSection('inteligencia-ia')}
        />

        {/* CHAPTER 2: Mapa Estratégico Visual Interativo BSC (Fundo Verde Suave Institucional) */}
        <ZebraSection id="mapa-bsc" variant="tint">
          <MapaEstrategicoBSC
            objetivos={objetivos}
            kpis={kpis}
            selectedObjetivoId={selectedObjetivo?.id || null}
            onSelectObjetivo={(obj) => setSelectedObjetivo(obj)}
            onOpenConsolidado2030={() => {
              setConsolidadoRequest({ ano: '2030', focusResumo: true, nonce: Date.now() });
              setIsMapaModalOpen(true);
            }}
            resultadosSociedadeProp={resultadosSociedade}
            onChangeResultadosSociedade={setResultadosSociedade}
          />
        </ZebraSection>

        {/* MAPA DE RONDÔNIA & SENAR EM NÚMEROS (SEÇÃO INLINE) */}
        <MapaRondoniaSection
          fichas={fichas}
          onChangeFichas={setFichas}
        />

        {/* ESTRUTURA EDITÁVEL: Fichas Técnicas & Planos de Ação por Objetivo Estratégico do BSC */}
        <ZebraSection id="fichas-tecnicas-objetivos" variant="gray">
          <FichasTecnicasObjetivosBSC
            usuarioAtivo={usuarioAtivo}
            fichasProp={fichas}
            onChangeFichas={setFichas}
          />
        </ZebraSection>

        {/* CHAPTER 5: Indicadores de Desempenho / KPIs */}
        <ZebraSection id="kpis-dashboard" variant="white">
          <KpiDashboard
            fichas={fichas}
            onChangeFichas={setFichas}
            kpis={kpis}
            objetivos={objetivos}
            usuarioAtivo={usuarioAtivo}
            onSaveComplementaryKpi={handleSaveComplementaryKpi}
            onDeleteComplementaryKpi={handleDeleteComplementaryKpi}
          />
        </ZebraSection>

        {/* CHAPTER 6: Inteligência Estratégica Gemini AI & GCP BigQuery (Fundo Verde Suave) */}
        <ZebraSection id="inteligencia-ia" variant="tint">
          <PainelGeminiAI
            currentInsight={aiInsight}
            loading={loadingAi}
            onGenerateAiAnalysis={handleRunAiAnalysis}
          />
        </ZebraSection>

        {/* CHAPTER 7: Documentação Técnica, DDL SQL, APIs e Segurança (Fundo Neutro) */}
        <ZebraSection id="especificacoes-api" variant="gray">
          <ArquiteturaEspecificacoes />
        </ZebraSection>

      </main>

      {/* Rodapé Institucional */}
      <FooterInstitutional onOpenSpecs={() => scrollToSection('especificacoes-api')} />

      {/* Interactive Popover Modal: Objetivo Estratégico & Live KPIs */}
      <ObjetivoPopoverModal
        objetivo={
          selectedObjetivo
            ? objetivos.find(o => o.id === selectedObjetivo.id) || selectedObjetivo
            : null
        }
        kpis={kpis}
        planos={planos}
        fichas={fichas}
        onChangeFichas={setFichas}
        onClose={() => setSelectedObjetivo(null)}
        onNavigateToPlanos={() => scrollToSection('fichas-tecnicas-objetivos')}
        onSaveKpi={handleSaveComplementaryKpi}
        onDeleteKpi={handleDeleteComplementaryKpi}
      />

      {/* Auth Modal: RBAC Role Switching */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={(user) => setUsuarioAtivo(user)}
      />

      {/* CMS Modal: Create or Edit 5W2H Action Plan */}
      <CmsActionModal
        isOpen={isNewPlanoModalOpen}
        onClose={() => {
          setIsNewPlanoModalOpen(false);
          setEditingPlano(null);
        }}
        objetivos={objetivos}
        initialPlano={editingPlano}
        initialUnidade={newPlanoUnidade}
        onSavePlano={handleSavePlano}
      />

      {/* KPI Edit Modal: Quick Reporting */}
      <KpiEditModal
        kpi={editingKpi}
        onClose={() => setEditingKpi(null)}
        onSave={handleSaveKpiMedicao}
      />

      {/* Mapa de Rondônia Modal (Consolidado 2030 trigger) */}
      <MapaRondoniaModal
        isOpen={isMapaModalOpen}
        onClose={() => setIsMapaModalOpen(false)}
        initialRequest={consolidadoRequest}
        fichas={fichas}
        onChangeFichas={setFichas}
      />

    </div>
  );
}
