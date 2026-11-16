import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Shield, 
  Key, 
  FileText, 
  Save, 
  RefreshCw,
  LogOut,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UsuarioAutenticado } from '../../types/strategic';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  usuarioAtivo: UsuarioAutenticado;
  canEdit: boolean;
  onLogout: () => void;
  siteContent: any;
  onSaveContent: (updatedContent: any) => Promise<boolean>;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  usuarioAtivo,
  canEdit,
  onLogout,
  siteContent,
  onSaveContent
}) => {
  const [activeTab, setActiveTab] = useState<'CONTENT' | 'USERS'>('CONTENT');

  // Content editing state
  const [propositoForm, setPropositoForm] = useState({
    proposito: siteContent?.proposito?.proposito || '',
    visao: siteContent?.proposito?.visao || '',
    missao: siteContent?.proposito?.missao || '',
    lema: siteContent?.proposito?.lema || '',
    valores: siteContent?.proposito?.valores || ''
  });

  // Users management state
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    nome: '',
    email: '',
    password: '',
    role: 'EDITOR',
    cargo: 'Colaborador SENAR-RO',
    unidade: 'SUPERINTENDENCIA'
  });

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (siteContent?.proposito) {
      setPropositoForm({
        proposito: siteContent.proposito.proposito || '',
        visao: siteContent.proposito.visao || '',
        missao: siteContent.proposito.missao || '',
        lema: siteContent.proposito.lema || '',
        valores: siteContent.proposito.valores || ''
      });
    }
  }, [siteContent]);

  const loadUsers = async () => {
    const token = localStorage.getItem('senar_jwt_token');
    if (!token) return;
    setLoadingUsers(true);
    try {
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (e) {
      console.error('Erro ao carregar usuários:', e);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'USERS' && (usuarioAtivo.role === 'SUPERINTENDENCIA' || (usuarioAtivo as any).role === 'ADMIN')) {
      loadUsers();
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleSaveProposito = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const updated = {
      ...siteContent,
      proposito: {
        ...siteContent.proposito,
        ...propositoForm
      }
    };

    const ok = await onSaveContent(updated);
    setSaving(false);
    if (ok) {
      setStatusMessage({ type: 'success', text: 'Propósito, Visão e Missão atualizados no banco local com sucesso!' });
    } else {
      setStatusMessage({ type: 'error', text: 'Erro ao salvar. Verifique se você tem permissão de edição.' });
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('senar_jwt_token');
    if (!token) return;

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(newUserForm)
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.error || 'Erro ao criar usuário');
        return;
      }
      setIsNewUserModalOpen(false);
      setNewUserForm({ nome: '', email: '', password: '', role: 'EDITOR', cargo: 'Colaborador SENAR-RO', unidade: 'SUPERINTENDENCIA' });
      loadUsers();
    } catch (err) {
      alert('Falha ao comunicar com o servidor');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Deseja realmente remover este usuário?')) return;
    const token = localStorage.getItem('senar_jwt_token');
    if (!token) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        alert(data.error || 'Erro ao remover');
        return;
      }
      loadUsers();
    } catch (err) {
      alert('Falha ao comunicar com o servidor');
    }
  };

  const isAdmin = usuarioAtivo.role === 'SUPERINTENDENCIA' || (usuarioAtivo as any).role === 'ADMIN';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-600 via-[#006837] to-teal-500" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#006837] shadow-2xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  Painel Administrativo & Gestão CMS
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  canEdit 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  {canEdit ? 'PERMISSÃO DE EDIÇÃO ATIVA' : 'MODO SOMENTE LEITURA'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Usuário autenticado: <strong>{usuarioAtivo.nome}</strong> ({usuarioAtivo.email}) · {usuarioAtivo.cargo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              title="Encerrar sessão"
              className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sair
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-white">
          <button
            onClick={() => setActiveTab('CONTENT')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'CONTENT'
                ? 'border-[#006837] text-[#006837] bg-emerald-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            Edição de Conteúdo da Página
          </button>

          {isAdmin && (
            <button
              onClick={() => setActiveTab('USERS')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'USERS'
                  ? 'border-[#006837] text-[#006837] bg-emerald-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              Gestão de Usuários & Permissões ({users.length || '...'})
            </button>
          )}
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`mx-6 mt-4 p-3 rounded-xl flex items-center gap-2.5 text-xs border ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'CONTENT' && (
            <form onSubmit={handleSaveProposito} className="space-y-5">
              {!canEdit && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-xs text-amber-900">
                  <Shield className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <strong>Atenção: Seu usuário possui permissão de apenas visualização.</strong>
                    <p className="text-[11px] text-amber-800">Para salvar alterações no banco local, conecte-se com um usuário que tenha permissão de EDIÇÃO ou ADMINISTRADOR.</p>
                  </div>
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#006837]" />
                  Bloco Superior: Lema & Propósito Central
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lema do Planejamento 2027–2030
                  </label>
                  <input
                    type="text"
                    disabled={!canEdit}
                    value={propositoForm.lema}
                    onChange={(e) => setPropositoForm({ ...propositoForm, lema: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-emerald-950 focus:ring-2 focus:ring-[#006837]/30 focus:border-[#006837] disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Propósito Institucional (Texto Principal do Banner)
                  </label>
                  <textarea
                    rows={3}
                    disabled={!canEdit}
                    value={propositoForm.proposito}
                    onChange={(e) => setPropositoForm({ ...propositoForm, proposito: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-[#006837]/30 focus:border-[#006837] disabled:opacity-70 leading-relaxed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Visão Estratégica
                  </label>
                  <textarea
                    rows={4}
                    disabled={!canEdit}
                    value={propositoForm.visao}
                    onChange={(e) => setPropositoForm({ ...propositoForm, visao: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#006837]/30 focus:border-[#006837] disabled:opacity-70 leading-relaxed"
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Missão Institucional
                  </label>
                  <textarea
                    rows={4}
                    disabled={!canEdit}
                    value={propositoForm.missao}
                    onChange={(e) => setPropositoForm({ ...propositoForm, missao: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#006837]/30 focus:border-[#006837] disabled:opacity-70 leading-relaxed"
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Valores Centrais
                  </label>
                  <textarea
                    rows={4}
                    disabled={!canEdit}
                    value={propositoForm.valores}
                    onChange={(e) => setPropositoForm({ ...propositoForm, valores: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-[#006837]/30 focus:border-[#006837] disabled:opacity-70 leading-relaxed"
                  />
                </div>
              </div>

              {canEdit && (
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-[#006837] hover:bg-[#004d26] disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Gravando no Banco Local...' : 'Salvar Alterações no Banco Local'}
                  </button>
                </div>
              )}
            </form>
          )}

          {activeTab === 'USERS' && isAdmin && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Usuários Registrados no Banco Local
                  </h4>
                  <p className="text-xs text-slate-500">
                    Gerencie quem tem permissão de visualizar ou editar o conteúdo da página do SENAR.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewUserModalOpen(true)}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#006837] hover:bg-[#004d26] rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  Novo Usuário
                </button>
              </div>

              {loadingUsers ? (
                <div className="p-8 text-center text-xs text-slate-500">Carregando usuários...</div>
              ) : (
                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  {users.map((u) => {
                    const hasEditPerm = u.role === 'ADMIN' || (u.permissoes && u.permissoes.includes('EDIT_PAGE'));
                    return (
                      <div key={u.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            u.role === 'ADMIN' ? 'bg-emerald-100 text-[#006837]' : (hasEditPerm ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700')
                          }`}>
                            {u.role === 'ADMIN' ? 'ADM' : (hasEditPerm ? 'EDI' : 'VER')}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">{u.nome}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                u.role === 'ADMIN' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : (hasEditPerm ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700')
                              }`}>
                                {u.role} · {hasEditPerm ? 'PODE EDITAR' : 'SOMENTE VISUALIZA'}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 block">
                              {u.email} · {u.cargo} ({u.unidade})
                            </span>
                          </div>
                        </div>

                        {u.role !== 'ADMIN' && (
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Remover usuário"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Sub-dialog: Novo Usuário */}
        {isNewUserModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#006837]" />
                  Cadastrar Novo Usuário
                </h4>
                <button
                  onClick={() => setIsNewUserModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={newUserForm.nome}
                    onChange={(e) => setNewUserForm({ ...newUserForm, nome: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    placeholder="Ex: João da Silva"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">E-mail Institucional</label>
                  <input
                    type="email"
                    required
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    placeholder="joao.silva@senar-ro.org.br"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">Senha Provisória</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    placeholder="••••••••"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">Perfil / Permissão</label>
                    <select
                      value={newUserForm.role}
                      onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    >
                      <option value="EDITOR">EDITOR (Pode Editar)</option>
                      <option value="VIEWER">VIEWER (Apenas Visualizar)</option>
                      <option value="ADMIN">ADMIN (Controle Total)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">Unidade</label>
                    <select
                      value={newUserForm.unidade}
                      onChange={(e) => setNewUserForm({ ...newUserForm, unidade: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    >
                      <option value="SUPERINTENDENCIA">SUPERINTENDÊNCIA</option>
                      <option value="DETEC">DETEC</option>
                      <option value="ATEG">ATEG</option>
                      <option value="DAF">DAF</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsNewUserModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#006837] hover:bg-[#004d26] text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Salvar Usuário
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
