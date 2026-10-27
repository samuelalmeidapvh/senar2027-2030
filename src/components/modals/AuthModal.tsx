import React, { useState } from 'react';
import { UsuarioAutenticado, RoleUsuario } from '../../types/strategic';
import { USUARIOS_DEMO } from '../../data/initialStrategicData';
import { Shield, Key, User, Check, X, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UsuarioAutenticado) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin
}) => {
  const [selectedUser, setSelectedUser] = useState<UsuarioAutenticado>(USUARIOS_DEMO[0]);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirmLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: selectedUser.role, email: selectedUser.email })
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('senar_jwt_token', data.token);
      }
      onLogin(selectedUser);
      onClose();
    } catch (e) {
      // Fallback
      onLogin(selectedUser);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#006837]" />
            <h3 className="text-base font-bold text-slate-900">
              Autenticação & Controle de Acesso (RBAC)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Selecione um dos perfis regimentais do <strong>SENAR-AR/RO</strong> para simular a emissão de token JWT e permissões de edição no CMS do Planejamento Estratégico:
          </p>

          <div className="space-y-2.5">
            {USUARIOS_DEMO.map((u) => {
              const isSelected = selectedUser.id === u.id;
              return (
                <div
                  key={u.id}
                  onClick={() => setSelectedUser(u)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#006837] bg-emerald-50/40 ring-2 ring-[#006837]/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-[#006837] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {u.nome.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>{u.nome}</span>
                        <span className="font-mono text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {u.unidade}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{u.cargo}</div>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-slate-400">
                    {u.role}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-500 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Ao autenticar, o sistema gera o header <code className="text-[#006837]">Authorization: Bearer &lt;JWT&gt;</code> para validação das operações CRUD.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmLogin}
            disabled={loading}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#006837] hover:bg-[#004d26] rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            {loading ? 'Autenticando...' : `Entrar como ${selectedUser.nome}`}
          </button>
        </div>
      </div>
    </div>
  );
};
