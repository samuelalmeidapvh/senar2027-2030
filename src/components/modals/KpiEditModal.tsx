import React, { useState } from 'react';
import { IndicadorKPI } from '../../types/strategic';
import { X, Save } from 'lucide-react';

interface KpiEditModalProps {
  kpi: IndicadorKPI | null;
  onClose: () => void;
  onSave: (kpiId: string, realizado: number, meta: number) => void;
}

export const KpiEditModal: React.FC<KpiEditModalProps> = ({
  kpi,
  onClose,
  onSave
}) => {
  if (!kpi) return null;

  const [realizado, setRealizado] = useState(kpi.realizado);
  const [meta, setMeta] = useState(kpi.meta);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(kpi.id, Number(realizado), Number(meta));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="font-mono text-xs font-bold text-[#006837] bg-emerald-50 px-2 py-0.5 rounded">
              {kpi.codigo}
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-1">
              Atualizar Medição de Indicador
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Indicador</label>
            <p className="text-xs font-bold text-slate-900">{kpi.nome}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{kpi.descricao}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Realizado ({kpi.unidadeMedida})
              </label>
              <input
                type="number"
                step="any"
                required
                value={realizado}
                onChange={e => setRealizado(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Meta ({kpi.unidadeMedida})
              </label>
              <input
                type="number"
                step="any"
                required
                value={meta}
                onChange={e => setMeta(Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 font-mono text-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Medição</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
