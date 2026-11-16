import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  Key, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  X,
  Eye,
  EyeOff,
  UserCheck
} from 'lucide-react';
import { UsuarioAutenticado } from '../../types/strategic';

interface AuthLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UsuarioAutenticado, token: string, canEdit: boolean) => void;
}

export const AuthLoginModal: React.FC<AuthLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'LOGIN' | 'FORGOT' | 'RESET'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || 'Credenciais inválidas.');
        return;
      }

      localStorage.setItem('senar_jwt_token', data.token);
      onLoginSuccess(data.usuario, data.token, data.canEdit);
      onClose();
    } catch (err: any) {
      setErrorMessage('Falha ao conectar com o servidor local.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || 'Falha ao solicitar código.');
        return;
      }

      if (data.resetCodeSimulado) {
        setResetCode(data.resetCodeSimulado);
        setSuccessMessage(`Código de verificação gerado para testes: ${data.resetCodeSimulado}`);
      } else {
        setSuccessMessage('Verifique seu e-mail para obter o código de redefinição.');
      }
      setMode('RESET');
    } catch (err) {
      setErrorMessage('Erro de comunicação.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim(), 
          resetCode: resetCode.trim(), 
          newPassword 
        })
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMessage(data.error || 'Não foi possível redefinir a senha.');
        return;
      }

      setSuccessMessage('Senha atualizada com sucesso! Entre agora com sua nova senha.');
      setPassword('');
      setMode('LOGIN');
    } catch (err) {
      setErrorMessage('Erro ao redefinir senha.');
    } finally {
      setLoading(false);
    }
  };

  // Preenchimento rápido para demonstração
  const handleQuickFill = (userEmail: string, pass: string) => {
    setEmail(userEmail);
    setPassword(pass);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-600 via-[#006837] to-teal-500" />

        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#006837] shadow-2xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {mode === 'LOGIN' && 'Acesso Restrito & Painel CMS'}
                {mode === 'FORGOT' && 'Redefinição de Senha'}
                {mode === 'RESET' && 'Criar Nova Senha'}
              </h3>
              <p className="text-xs text-slate-500">
                Sistema FAPERON · SENAR-AR/RO
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alerts & Feedback */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {mode === 'LOGIN' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  E-mail Institucional
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@senar-ro.org.br"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006837]/30 focus:border-[#006837] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Senha de Acesso
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage(null);
                      setSuccessMessage(null);
                      setMode('FORGOT');
                    }}
                    className="text-xs font-semibold text-[#006837] hover:underline cursor-pointer"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006837]/30 focus:border-[#006837] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-[#006837] hover:bg-[#004d26] disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? 'Autenticando...' : 'Entrar no Sistema'}
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Demo Fast Access Pill Selector */}
              <div className="pt-4 border-t border-slate-100">
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Acesso Rápido de Demonstração (Clique para testar):
                </span>
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('emerson.lira@senar-ro.org.br', 'admin123')}
                    className="w-full p-2 text-left rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors flex items-center justify-between text-xs cursor-pointer"
                  >
                    <div>
                      <strong className="text-slate-900 block font-semibold">Dr. Emerson Lira (Superintendente)</strong>
                      <span className="text-slate-500 text-[11px]">Permissão: Administrador Total (Edita Tudo + Usuários)</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#006837] text-[10px] font-bold">ADMIN</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickFill('marcelo.carvalho@senar-ro.org.br', 'editor123')}
                    className="w-full p-2 text-left rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-colors flex items-center justify-between text-xs cursor-pointer"
                  >
                    <div>
                      <strong className="text-slate-900 block font-semibold">Eng. Marcelo Carvalho (DETEC)</strong>
                      <span className="text-slate-500 text-[11px]">Permissão: Editor de Conteúdo da Página</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">EDITOR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickFill('visualizador@senar-ro.org.br', 'viewer123')}
                    className="w-full p-2 text-left rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs cursor-pointer"
                  >
                    <div>
                      <strong className="text-slate-900 block font-semibold">Visitante / Auditor</strong>
                      <span className="text-slate-500 text-[11px]">Permissão: Somente Visualização</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">VIEWER</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {mode === 'FORGOT' && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Insira o seu e-mail institucional cadastrado para enviarmos ou gerarmos o código de recuperação:
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  E-mail Cadastrado
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="emerson.lira@senar-ro.org.br"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]/30 focus:border-[#006837]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setMode('LOGIN');
                  }}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Voltar ao Login
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 px-4 bg-[#006837] hover:bg-[#004d26] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  {loading ? 'Gerando...' : 'Obter Código'}
                </button>
              </div>
            </form>
          )}

          {mode === 'RESET' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Código de Verificação (6 dígitos)
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="Ex: 849201"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]/30 focus:border-[#006837]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nova Senha (Mínimo 6 caracteres)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nova senha segura"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006837]/30 focus:border-[#006837]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setMode('LOGIN');
                  }}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 px-4 bg-[#006837] hover:bg-[#004d26] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  {loading ? 'Salvando...' : 'Salvar Nova Senha'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
