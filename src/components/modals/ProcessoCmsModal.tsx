import React, { useState, useEffect } from 'react';
import { ProcessoFinalistico } from '../../types/strategic';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  GraduationCap, 
  HeartHandshake, 
  TrendingUp, 
  Lightbulb, 
  Award, 
  ShieldCheck,
  Layers
} from 'lucide-react';

interface ProcessoCmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  processo: ProcessoFinalistico | null;
  onSave: (processo: Partial<ProcessoFinalistico>) => void;
  onDelete?: (id: string) => void;
}

export const ProcessoCmsModal: React.FC<ProcessoCmsModalProps> = ({
  isOpen,
  onClose,
  processo,
  onSave,
  onDelete
}) => {
  if (!isOpen) return null;

  const isEditing = !!processo?.id;

  const [codigo, setCodigo] = useState(processo?.codigo || 'PF-05');
  const [categoria, setCategoria] = useState<'FINALISTICO' | 'GESTAO_SUPORTE'>(processo?.categoria || 'FINALISTICO');
  const [sigla, setSigla] = useState(processo?.sigla || '');
  const [nome, setNome] = useState(processo?.nome || '');
  const [descricao, setDescricao] = useState(processo?.descricao || '');
  const [publicoAlvo, setPublicoAlvo] = useState(processo?.publicoAlvo || '');
  const [missao, setMissao] = useState(processo?.missaoDoProcesso || '');
  const [icone, setIcone] = useState(processo?.icone || 'GraduationCap');
  
  const [atividades, setAtividades] = useState<string[]>(
    processo?.atividadesChave || [
      'Diagnóstico de necessidades no campo com os Sindicatos Rurais',
      'Execução técnica padronizada em conformidade com o regimento',
      'Acompanhamento de resultados e indicadores de impacto'
    ]
  );
  const [novaAtividade, setNovaAtividade] = useState('');

  const [metas, setMetas] = useState<string[]>(
    processo?.metasGerais || [
      'Atender os 52 municípios de Rondônia no ciclo 2027-2030',
      'Índice de satisfação do produtor superior a 90%'
    ]
  );
  const [novaMeta, setNovaMeta] = useState('');

  // Sync state if processo prop changes
  useEffect(() => {
    if (processo) {
      setCodigo(processo.codigo || 'PF-01');
      setCategoria(processo.categoria || 'FINALISTICO');
      setSigla(processo.sigla || '');
      setNome(processo.nome || '');
      setDescricao(processo.descricao || '');
      setPublicoAlvo(processo.publicoAlvo || '');
      setMissao(processo.missaoDoProcesso || '');
      setIcone(processo.icone || 'GraduationCap');
      setAtividades(processo.atividadesChave || []);
      setMetas(processo.metasGerais || []);
    } else {
      setCodigo('PF-05');
      setCategoria('FINALISTICO');
      setSigla('');
      setNome('');
      setDescricao('');
      setPublicoAlvo('');
      setMissao('');
      setIcone('GraduationCap');
      setAtividades([
        'Planejamento integrado com a Superintendência e Sindicatos Rurais',
        'Capacitação e assistência aos produtores rurais',
        'Avaliação sistemática de impacto socioeconômico'
      ]);
      setMetas([
        'Meta de cobertura territorial nos 52 municípios',
        'Atingir mais de 90% de eficácia técnica'
      ]);
    }
  }, [processo]);

  const handleAddAtividade = () => {
    if (!novaAtividade.trim()) return;
    setAtividades([...atividades, novaAtividade.trim()]);
    setNovaAtividade('');
  };

  const handleRemoveAtividade = (index: number) => {
    setAtividades(atividades.filter((_, i) => i !== index));
  };

  const handleAddMeta = () => {
    if (!novaMeta.trim()) return;
    setMetas([...metas, novaMeta.trim()]);
    setNovaMeta('');
  };

  const handleRemoveMeta = (index: number) => {
    setMetas(metas.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: processo?.id,
      codigo,
      categoria,
      sigla: sigla.toUpperCase(),
      nome,
      descricao,
      publicoAlvo,
      missaoDoProcesso: missao,
      icone,
      atividadesChave: atividades,
      metasGerais: metas,
      indicadoresChave: processo?.indicadoresChave || ['kpi-1']
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
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#006837] flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#006837]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isEditing ? `CMS: Editar Processo (${processo?.sigla})` : 'CMS: Novo Processo Finalístico'}
              </h3>
              <p className="text-xs text-slate-500">
                Gestão dos Macroprocessos da Cadeia de Valor Institucional do SENAR-AR/RO
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          {/* Categoria do Processo na Cadeia de Valor */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Classificação na Cadeia de Valor 3D (Ciclo 2027–2030)
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setCategoria('FINALISTICO');
                  if (!isEditing && codigo.startsWith('PG-')) setCodigo('PF-05');
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  categoria === 'FINALISTICO'
                    ? 'border-[#006837] bg-emerald-50/70 text-emerald-950 font-semibold ring-1 ring-[#006837]'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#006837]" />
                  <span className="font-bold">Processo Finalístico</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Entrega de valor direta ao produtor no campo (FPR, PS, ATeG, Inovação)
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCategoria('GESTAO_SUPORTE');
                  if (!isEditing && codigo.startsWith('PF-')) setCodigo('PG-05');
                }}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  categoria === 'GESTAO_SUPORTE'
                    ? 'border-[#006837] bg-emerald-50/70 text-emerald-950 font-semibold ring-1 ring-[#006837]'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="font-bold">Gestão & Suporte Operacional</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Alicerce: Pessoas, Processos, Finanças, Infra TI, Compliance e Suprimentos
                </p>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Código do Processo</label>
              <input
                type="text"
                required
                value={codigo}
                onChange={e => setCodigo(e.target.value)}
                placeholder={categoria === 'GESTAO_SUPORTE' ? 'Ex: PG-01' : 'Ex: PF-01'}
                className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sigla</label>
              <input
                type="text"
                required
                value={sigla}
                onChange={e => setSigla(e.target.value.toUpperCase())}
                placeholder={categoria === 'GESTAO_SUPORTE' ? 'Ex: GE-PPF, GIT, CCI' : 'Ex: FPR, PS, ATeG'}
                className="w-full text-xs font-mono font-bold px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ícone Visual</label>
              <select
                value={icone}
                onChange={e => setIcone(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-hidden bg-white"
              >
                <option value="GraduationCap">GraduationCap (Educação / Formação Rural)</option>
                <option value="HeartHandshake">HeartHandshake (Promoção Social / Cidadania)</option>
                <option value="TrendingUp">TrendingUp (ATeG / Finanças / Crescimento)</option>
                <option value="Lightbulb">Lightbulb (Inovação / Tecnologia Aplicada)</option>
                <option value="Users">Users (Excelência em Pessoas e RH)</option>
                <option value="Cpu">Cpu (Infraestrutura Tecnológica / TI)</option>
                <option value="ShieldCheck">ShieldCheck (Compliance e Controle Interno)</option>
                <option value="Briefcase">Briefcase (Governança e Suprimentos)</option>
                <option value="Award">Award (Excelência e Qualidade)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nome Completo do Macroprocesso
            </label>
            <input
              type="text"
              required
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder={categoria === 'GESTAO_SUPORTE' ? 'Ex: Gestão de Infraestrutura Tecnológica' : 'Ex: Formação Profissional Rural'}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Público-Alvo Prioritário</label>
            <input
              type="text"
              required
              value={publicoAlvo}
              onChange={e => setPublicoAlvo(e.target.value)}
              placeholder="Ex: Produtores rurais, trabalhadores do campo e famílias agropecuárias de Rondônia"
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Descrição Operacional</label>
            <textarea
              rows={2}
              required
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Resumo das principais frentes de trabalho deste macroprocesso..."
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Missão na Cadeia de Valor Institucional</label>
            <textarea
              rows={2}
              required
              value={missao}
              onChange={e => setMissao(e.target.value)}
              placeholder="Qual o valor concreto e transformador gerado diretamente para o homem do campo?"
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-hidden"
            />
          </div>

          {/* Atividades Chave */}
          <div className="pt-2 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-900 mb-1.5 uppercase tracking-wider">
              Atividades e Entregas Chave no Campo
            </label>
            <div className="space-y-2 mb-2">
              {atividades.map((ativ, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                  <span className="text-[11px] font-mono text-emerald-800 font-bold w-5 shrink-0">{idx + 1}.</span>
                  <span className="text-xs text-slate-700 flex-1 leading-snug">{ativ}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAtividade(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={novaAtividade}
                onChange={e => setNovaAtividade(e.target.value)}
                placeholder="Adicionar nova atividade chave..."
                className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-hidden"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAtividade();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddAtividade}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </button>
            </div>
          </div>

          {/* Metas Gerais do Ciclo */}
          <div className="pt-2 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-900 mb-1.5 uppercase tracking-wider">
              Metas Estratégicas do Ciclo 2027–2030
            </label>
            <div className="space-y-2 mb-2">
              {metas.map((meta, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-emerald-50/60 p-2 rounded-lg border border-emerald-200/70">
                  <span className="text-[11px] font-mono text-emerald-800 font-bold w-5 shrink-0">{idx + 1}.</span>
                  <span className="text-xs text-emerald-950 font-medium flex-1 leading-snug">{meta}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMeta(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={novaMeta}
                onChange={e => setNovaMeta(e.target.value)}
                placeholder="Adicionar nova meta para o ciclo 2027-2030..."
                className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:outline-hidden"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddMeta();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddMeta}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {isEditing && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Tem certeza que deseja excluir o processo "${processo?.nome}" da Cadeia de Valor?`)) {
                    onDelete(processo!.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Excluir Processo</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Salvar Alterações no CMS' : 'Criar Processo Finalístico'}</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
