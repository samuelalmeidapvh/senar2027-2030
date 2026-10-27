import React, { useState } from 'react';
import { PlanoAcao5W2H, IndicadorKPI, SiglaUnidade, ObjetivoEstrategico, StatusPlanoAcao } from '../../types/strategic';
import { X, Save, Plus } from 'lucide-react';

interface CmsActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  objetivos: ObjetivoEstrategico[];
  initialPlano?: PlanoAcao5W2H | null;
  initialUnidade?: SiglaUnidade;
  onSavePlano: (plano: Partial<PlanoAcao5W2H>) => void;
}

export const CmsActionModal: React.FC<CmsActionModalProps> = ({
  isOpen,
  onClose,
  objetivos,
  initialPlano,
  initialUnidade = 'DETEC',
  onSavePlano
}) => {
  if (!isOpen) return null;

  const [codigo, setCodigo] = useState(initialPlano?.codigo || `PA-${initialUnidade}-${Date.now().toString().slice(-3)}`);
  const [titulo, setTitulo] = useState(initialPlano?.titulo || '');
  const [objetivoId, setObjetivoId] = useState(initialPlano?.objetivoId || objetivos[0]?.id || 'obj-1');
  const [unidade, setUnidade] = useState<SiglaUnidade>(initialPlano?.unidadeResponsavel || initialUnidade);
  const [oQue, setOQue] = useState(initialPlano?.oQue || '');
  const [porQue, setPorQue] = useState(initialPlano?.porQue || '');
  const [onde, setOnde] = useState(initialPlano?.onde || 'Rondônia');
  const [quem, setQuem] = useState(initialPlano?.quem || '');
  const [quandoInicio, setQuandoInicio] = useState(initialPlano?.quandoInicio || '2026-01-15');
  const [quandoFim, setQuandoFim] = useState(initialPlano?.quandoFim || '2026-12-15');
  const [como, setComo] = useState(initialPlano?.como || '');
  const [quantoCusta, setQuantoCusta] = useState(initialPlano?.quantoCusta || 250000);
  const [progresso, setProgresso] = useState(initialPlano?.progressoPercentual || 0);
  const [status, setStatus] = useState<StatusPlanoAcao>(initialPlano?.status || 'PLANEJADO');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePlano({
      id: initialPlano?.id,
      codigo,
      titulo,
      objetivoId,
      unidadeResponsavel: unidade,
      oQue,
      porQue,
      onde,
      quem,
      quandoInicio,
      quandoFim,
      como,
      quantoCusta: Number(quantoCusta),
      progressoPercentual: Number(progresso),
      status
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <h3 className="text-base font-bold text-slate-900">
            {initialPlano ? 'Editar Plano de Ação 5W2H' : 'Novo Plano de Ação 5W2H'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Código</label>
              <input
                type="text"
                required
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Unidade Responsável</label>
              <select
                value={unidade}
                onChange={e => setUnidade(e.target.value as SiglaUnidade)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
              >
                <option value="SUPERINTENDENCIA">Superintendência</option>
                <option value="DAF">DAF</option>
                <option value="DETEC">DETEC</option>
                <option value="ATEG">Gerência ATeG</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as StatusPlanoAcao)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
              >
                <option value="PLANEJADO">Planejado</option>
                <option value="EM_ANDAMENTO">Em Andamento</option>
                <option value="CONCLUIDO">Concluído</option>
                <option value="EM_RISCO">Em Risco</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Título do Plano de Ação</label>
            <input
              type="text"
              required
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Ex: Aquisição de kits tecnológicos para produtores de leite..."
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Objetivo Estratégico Vinculado</label>
            <select
              value={objetivoId}
              onChange={e => setObjetivoId(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
            >
              {objetivos.map(obj => (
                <option key={obj.id} value={obj.id}>
                  {obj.codigo} - {obj.titulo} ({obj.perspectiva})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">O Quê (What)</label>
              <textarea
                rows={2}
                required
                value={oQue}
                onChange={e => setOQue(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Por Quê (Why)</label>
              <textarea
                rows={2}
                required
                value={porQue}
                onChange={e => setPorQue(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Quem (Who)</label>
              <input
                type="text"
                required
                value={quem}
                onChange={e => setQuem(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Onde (Where)</label>
              <input
                type="text"
                required
                value={onde}
                onChange={e => setOnde(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Início</label>
              <input
                type="date"
                required
                value={quandoInicio}
                onChange={e => setQuandoInicio(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Término Previsto</label>
              <input
                type="date"
                required
                value={quandoFim}
                onChange={e => setQuandoFim(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Orçamento (R$)</label>
              <input
                type="number"
                required
                value={quantoCusta}
                onChange={e => setQuantoCusta(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Como (How - Metodologia)</label>
              <textarea
                rows={2}
                value={como}
                onChange={e => setComo(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Progresso Atual ({progresso}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={progresso}
                onChange={e => setProgresso(Number(e.target.value))}
                className="w-full mt-2 accent-[#006837]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Plano 5W2H</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
