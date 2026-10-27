import React, { useState, useEffect } from 'react';
import { 
  ObjetivoEstrategico, 
  IndicadorKPI, 
  PlanoAcao5W2H, 
  ProcessoFinalistico, 
  UnidadeOrganizacional, 
  UsuarioAutenticado,
  InsightEstrategicoIA,
  SiglaUnidade
} from './types/strategic';
import { 
  UNIDADES_ORGANIZACIONAIS, 
  PROCESSOS_FINALISTICOS, 
  OBJETIVOS_ESTRATEGICOS, 
  INDICADORES_KPIS, 
  PLANOS_ACAO,
  USUARIOS_DEMO,
  INSIGHT_INICIAL_ESTRATEGICO
} from './data/initialStrategicData';

import { HeaderFixed } from './components/layout/HeaderFixed';
import { FooterInstitutional } from './components/layout/FooterInstitutional';
import { ZebraSection } from './components/layout/ZebraSection';

import { HeroProposito } from './components/sections/HeroProposito';
import { CadeiaValor3D } from './components/sections/CadeiaValor3D';
import { MapaEstrategicoBSC } from './components/sections/MapaEstrategicoBSC';
import { FaixaMetricasEstrategicas } from './components/sections/FaixaMetricasEstrategicas';
import { KpiDashboard } from './components/sections/KpiDashboard';
import { PlanosAcaoUnidade } from './components/sections/PlanosAcaoUnidade';
import { PainelGeminiAI } from './components/sections/PainelGeminiAI';
import { ArquiteturaEspecificacoes } from './components/sections/ArquiteturaEspecificacoes';

import { ObjetivoPopoverModal } from './components/modals/ObjetivoPopoverModal';
import { AuthModal } from './components/modals/AuthModal';
import { CmsActionModal } from './components/modals/CmsActionModal';
import { KpiEditModal } from './components/modals/KpiEditModal';
import { ProcessoCmsModal } from './components/modals/ProcessoCmsModal';

export default function App() {
  const [objetivos, setObjetivos] = useState<ObjetivoEstrategico[]>(OBJETIVOS_ESTRATEGICOS);
  const [kpis, setKpis] = useState<IndicadorKPI[]>(INDICADORES_KPIS);
  const [planos, setPlanos] = useState<PlanoAcao5W2H[]>(PLANOS_ACAO);
  const [processos, setProcessos] = useState<ProcessoFinalistico[]>(PROCESSOS_FINALISTICOS);
  const [unidades] = useState<UnidadeOrganizacional[]>(UNIDADES_ORGANIZACIONAIS);

  // Auth User: Default to Dr. Emerson Lira (Superintendente) for immediate CMS testing
  const [usuarioAtivo, setUsuarioAtivo] = useState<UsuarioAutenticado | null>(USUARIOS_DEMO[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Modals state
  const [selectedObjetivo, setSelectedObjetivo] = useState<ObjetivoEstrategico | null>(null);
  const [editingPlano, setEditingPlano] = useState<PlanoAcao5W2H | null>(null);
  const [isNewPlanoModalOpen, setIsNewPlanoModalOpen] = useState<boolean>(false);
  const [newPlanoUnidade, setNewPlanoUnidade] = useState<SiglaUnidade>('DETEC');
  const [editingKpi, setEditingKpi] = useState<IndicadorKPI | null>(null);

  // Cadeia de Valor CMS Modal state
  const [editingProcesso, setEditingProcesso] = useState<ProcessoFinalistico | null>(null);
  const [isProcessoModalOpen, setIsProcessoModalOpen] = useState<boolean>(false);

  // AI Insights State - Initialized with baseline diagnostic
  const [aiInsight, setAiInsight] = useState<InsightEstrategicoIA | null>(INSIGHT_INICIAL_ESTRATEGICO);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);

  // Initial Data Fetch
  useEffect(() => {
    fetch('/api/strategic-data')
      .then(res => res.json())
      .then(data => {
        if (data.objetivos) setObjetivos(data.objetivos);
        if (data.kpis) setKpis(data.kpis);
        if (data.planosAcao) setPlanos(data.planosAcao);
        if (data.processosFinalisticos) setProcessos(data.processosFinalisticos);
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

  // CMS Handlers: Cadeia de Valor Processos Finalísticos CRUD
  const handleSaveProcesso = async (processoData: Partial<ProcessoFinalistico>) => {
    if (processoData.id) {
      // Update
      try {
        const res = await fetch(`/api/cadeia-valor/processos/${processoData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(processoData)
        });
        const data = await res.json();
        if (data.processo) {
          setProcessos(prev => prev.map(p => p.id === data.processo.id ? data.processo : p));
        }
      } catch (e) {
        setProcessos(prev => prev.map(p => p.id === processoData.id ? { ...p, ...processoData } as ProcessoFinalistico : p));
      }
    } else {
      // Create
      try {
        const res = await fetch('/api/cadeia-valor/processos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(processoData)
        });
        const data = await res.json();
        if (data.processo) {
          setProcessos(prev => [...prev, data.processo]);
        }
      } catch (e) {
        const isSuporte = processoData.categoria === 'GESTAO_SUPORTE';
        const localNew: ProcessoFinalistico = {
          id: `proc-${Date.now()}`,
          codigo: processoData.codigo || (isSuporte ? `PG-0${processos.filter(p => p.categoria === 'GESTAO_SUPORTE').length + 1}` : `PF-0${processos.filter(p => p.categoria !== 'GESTAO_SUPORTE').length + 1}`),
          sigla: processoData.sigla || 'NOVO',
          categoria: processoData.categoria || 'FINALISTICO',
          nome: processoData.nome || 'Novo Processo',
          descricao: processoData.descricao || '',
          publicoAlvo: processoData.publicoAlvo || '',
          missaoDoProcesso: processoData.missaoDoProcesso || '',
          atividadesChave: processoData.atividadesChave || [],
          metasGerais: processoData.metasGerais || [],
          indicadoresChave: processoData.indicadoresChave || [],
          icone: processoData.icone || 'Award'
        };
        setProcessos(prev => [...prev, localNew]);
      }
    }
  };

  const handleDeleteProcesso = async (id: string) => {
    try {
      await fetch(`/api/cadeia-valor/processos/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Removido localmente');
    }
    setProcessos(prev => prev.filter(p => p.id !== id));
  };

  const handleResetProcessos = async () => {
    try {
      const res = await fetch('/api/cadeia-valor/reset', { method: 'POST' });
      const data = await res.json();
      if (data.processos) {
        setProcessos(data.processos);
        return;
      }
    } catch (e) {
      // fallback
    }
    setProcessos(PROCESSOS_FINALISTICOS);
  };

  // CMS Handlers: Action Plans CRUD
  const handleSavePlano = async (planoData: Partial<PlanoAcao5W2H>) => {
    if (planoData.id) {
      // Update
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
      // Create
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

  const handleDeletePlano = async (id: string) => {
    try {
      await fetch(`/api/action-plans/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Removido localmente');
    }
    setPlanos(prev => prev.filter(p => p.id !== id));
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
          />
        </ZebraSection>

        {/* FAIXA DE IMPACTO ESTRATÉGICO & MÉTRICAS */}
        <FaixaMetricasEstrategicas />

        {/* CHAPTER 3: Planos de Ação por Unidade do Organograma (5W2H) */}
        <ZebraSection id="planos-unidades" variant="white">
          <PlanosAcaoUnidade
            planos={planos}
            unidades={unidades}
            objetivos={objetivos}
            usuarioAtivo={usuarioAtivo}
            onOpenNovoPlano={(sigla) => {
              if (sigla) setNewPlanoUnidade(sigla);
              setEditingPlano(null);
              setIsNewPlanoModalOpen(true);
            }}
            onEditPlano={(plano) => {
              setEditingPlano(plano);
              setIsNewPlanoModalOpen(true);
            }}
            onDeletePlano={handleDeletePlano}
          />
        </ZebraSection>

        {/* CHAPTER 4: Cadeia de Valor: Processos Finalísticos & Suporte Operacional */}
        <ZebraSection id="cadeia-valor" variant="tint">
          <CadeiaValor3D
            processos={processos}
            usuarioAtivo={usuarioAtivo}
            onSelectProcesso={(proc) => {
              // Highlight related objective in BSC map
              const relatedObj = objetivos.find(o => o.processoFinalisticoId === proc.id);
              if (relatedObj) setSelectedObjetivo(relatedObj);
            }}
            onEditProcesso={(proc) => {
              setEditingProcesso(proc);
              setIsProcessoModalOpen(true);
            }}
            onNewProcesso={() => {
              setEditingProcesso(null);
              setIsProcessoModalOpen(true);
            }}
            onResetProcessos={handleResetProcessos}
          />
        </ZebraSection>

        {/* CHAPTER 5: Indicadores de Desempenho / KPIs */}
        <ZebraSection id="kpis-dashboard" variant="white">
          <KpiDashboard
            kpis={kpis}
            usuarioAtivo={usuarioAtivo}
            onEditKpi={(kpi) => setEditingKpi(kpi)}
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
        objetivo={selectedObjetivo}
        kpis={kpis}
        planos={planos}
        onClose={() => setSelectedObjetivo(null)}
        onNavigateToPlanos={() => scrollToSection('planos-unidades')}
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

      {/* CMS Modal: Create or Edit Value Chain Finalistic Process */}
      <ProcessoCmsModal
        isOpen={isProcessoModalOpen}
        onClose={() => {
          setIsProcessoModalOpen(false);
          setEditingProcesso(null);
        }}
        processo={editingProcesso}
        onSave={handleSaveProcesso}
        onDelete={handleDeleteProcesso}
      />

      {/* KPI Edit Modal: Quick Reporting */}
      <KpiEditModal
        kpi={editingKpi}
        onClose={() => setEditingKpi(null)}
        onSave={handleSaveKpiMedicao}
      />

    </div>
  );
}
