import React, { useState } from 'react';
import { 
  PlanoAcao5W2H, 
  UnidadeOrganizacional, 
  SiglaUnidade, 
  UsuarioAutenticado,
  ObjetivoEstrategico
} from '../../types/strategic';
import { StatusBadge } from '../ui/StatusBadge';
import { 
  Briefcase, 
  Plus, 
  Calendar, 
  User, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PlanosAcaoUnidadeProps {
  planos: PlanoAcao5W2H[];
  unidades: UnidadeOrganizacional[];
  objetivos: ObjetivoEstrategico[];
  usuarioAtivo: UsuarioAutenticado | null;
  onOpenNovoPlano: (unidadeSigla?: SiglaUnidade) => void;
  onEditPlano: (plano: PlanoAcao5W2H) => void;
  onDeletePlano: (id: string) => void;
}

export const PlanosAcaoUnidade: React.FC<PlanosAcaoUnidadeProps> = ({
  planos,
  unidades,
  objetivos,
  usuarioAtivo,
  onOpenNovoPlano,
  onEditPlano,
  onDeletePlano
}) => {
  const [selectedUnidade, setSelectedUnidade] = useState<SiglaUnidade>('SUPERINTENDENCIA');
  const [expandedPlanoId, setExpandedPlanoId] = useState<string | null>(planos[0]?.id || null);

  const activeUnidadeObj = unidades.find(u => u.sigla === selectedUnidade) || unidades[0];
  const planosDaUnidade = planos.filter(p => p.unidadeResponsavel === selectedUnidade);

  const canEditUnidade = usuarioAtivo && (
    usuarioAtivo.role === 'SUPERINTENDENCIA' || 
    (usuarioAtivo.role === 'GESTOR_DAF' && selectedUnidade === 'DAF') ||
    (usuarioAtivo.role === 'GESTOR_DETEC' && selectedUnidade === 'DETEC') ||
    (usuarioAtivo.role === 'GESTOR_ATEG' && selectedUnidade === 'ATEG')
  );

  return (
    <div className="w-full">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span>Organograma & Governança SENAR-AR/RO</span>
            <span aria-hidden="true">·</span>
            <span>Metodologia 5W2H</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
            Planos de Ação por Unidade Organizacional
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Metas descritivas e planos de ação tático-operacionais divididos por responsabilidade regimental entre Superintendência, DAF, DETEC e Gerência ATeG.
          </p>
        </div>

        {canEditUnidade && (
          <button
            onClick={() => onOpenNovoPlano(selectedUnidade)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Plano 5W2H ({selectedUnidade})</span>
          </button>
        )}
      </div>

      {/* Unit Selector Tabs (Strictly respecting the SENAR-AR/RO structure) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
        {unidades.map(unid => {
          const isSelected = unid.sigla === selectedUnidade;
          const countPlanos = planos.filter(p => p.unidadeResponsavel === unid.sigla).length;

          return (
            <button
              key={unid.id}
              onClick={() => setSelectedUnidade(unid.sigla)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#006837] shadow-sm ring-2 ring-[#006837]/20'
                  : 'bg-white/70 hover:bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {unid.sigla}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {countPlanos} ações
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                {unid.nome}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 truncate">
                Líder: {unid.responsavel}
              </p>
            </button>
          );
        })}
      </div>

      {/* Unit Summary Card */}
      {activeUnidadeObj && (
        <div className="mt-6 bg-slate-50 rounded-xl p-5 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {activeUnidadeObj.nome} ({activeUnidadeObj.sigla})
              </h4>
              <p className="text-xs text-slate-600 mt-0.5 max-w-3xl leading-relaxed">
                {activeUnidadeObj.descricao}
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-[11px] text-slate-500 block">Orçamento Gerenciado / Ano</span>
              <span className="text-sm font-mono font-bold text-[#006837] tabular-nums">
                R$ {(activeUnidadeObj.orcamentoAno).toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* List of 5W2H Action Plans for Selected Unit */}
      <div className="mt-6 space-y-4">
        {planosDaUnidade.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Nenhum plano de ação cadastrado para esta unidade.</p>
            {canEditUnidade && (
              <button
                onClick={() => onOpenNovoPlano(selectedUnidade)}
                className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-[#006837] rounded-lg cursor-pointer"
              >
                Cadastrar Primeiro Plano
              </button>
            )}
          </div>
        ) : (
          planosDaUnidade.map(plano => {
            const isExpanded = expandedPlanoId === plano.id;
            const objAssociado = objetivos.find(o => o.id === plano.objetivoId);

            return (
              <div
                key={plano.id}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
              >
                {/* Plan Header Bar */}
                <div 
                  onClick={() => setExpandedPlanoId(isExpanded ? null : plano.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded shrink-0 mt-0.5">
                      {plano.codigo}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {plano.titulo}
                      </h4>
                      {objAssociado && (
                        <p className="text-xs text-emerald-800 font-medium mt-0.5">
                          Alinhado ao {objAssociado.codigo}: {objAssociado.titulo}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <StatusBadge status={plano.status} />

                    {/* Progress % */}
                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-slate-900 tabular-nums">
                        {plano.progressoPercentual}%
                      </span>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-[#008744] rounded-full"
                          style={{ width: `${plano.progressoPercentual}%` }}
                        />
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded 5W2H Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/30">
                    
                    {/* 5W2H Table Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-white rounded-lg border border-slate-200/80 mt-2">
                      
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          1. O Quê (What)
                        </span>
                        <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                          {plano.oQue}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          2. Por Quê (Why)
                        </span>
                        <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                          {plano.porQue}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          3. Onde (Where)
                        </span>
                        <p className="text-xs text-slate-800 mt-1 leading-relaxed flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{plano.onde}</span>
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          4. Quem (Who - Responsável)
                        </span>
                        <p className="text-xs text-slate-800 mt-1 leading-relaxed flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{plano.quem}</span>
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          5. Quando (When - Cronograma)
                        </span>
                        <p className="text-xs text-slate-800 mt-1 leading-relaxed flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{plano.quandoInicio} a {plano.quandoFim}</span>
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          6. Quanto Custa (How Much)
                        </span>
                        <p className="text-xs text-slate-800 mt-1 leading-relaxed flex items-center gap-1 font-mono font-semibold text-[#006837]">
                          <DollarSign className="w-3.5 h-3.5 text-[#006837]" />
                          <span>R$ {(plano.quantoCusta).toLocaleString('pt-BR')}</span>
                        </p>
                      </div>

                      <div className="md:col-span-2 lg:col-span-3 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          7. Como (How - Metodologia de Execução)
                        </span>
                        <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                          {plano.como}
                        </p>
                      </div>

                    </div>

                    {/* Milestones / Marcos de Entrega */}
                    <div className="mt-4">
                      <h5 className="text-xs font-bold text-slate-900 mb-2">
                        Marcos Principais de Entrega:
                      </h5>
                      <div className="space-y-1.5">
                        {plano.marcosPrincipais.map((marco, i) => (
                          <div 
                            key={i} 
                            className="flex items-center justify-between text-xs p-2 rounded-md bg-white border border-slate-100"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 
                                className={`w-3.5 h-3.5 ${marco.concluido ? 'text-[#008744]' : 'text-slate-300'}`} 
                              />
                              <span className={marco.concluido ? 'line-through text-slate-400' : 'text-slate-700'}>
                                {marco.descricao}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-slate-400">
                              Prazo: {marco.dataLimite}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions if authorized */}
                    {canEditUnidade && (
                      <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-end gap-3">
                        <button
                          onClick={() => onEditPlano(plano)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>Editar Plano</span>
                        </button>

                        <button
                          onClick={() => onDeletePlano(plano.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Excluir</span>
                        </button>
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
