import React, { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, RefreshCw, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";

type AuthMode = "login" | "register" | "forgot";

const ADMIN_EMAIL = "davidmbueso@gmail.com";

export default function Login() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const getFriendlyErrorMessage = (code: string, fallback: string) => {
    switch (code) {
      case "auth/invalid-email":
        return "Endereço de email inválido.";
      case "auth/user-disabled":
        return "Esta conta foi desativada.";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Email ou palavra-passe incorretos.";
      case "auth/email-already-in-use":
        return "Já existe uma conta associada a este email. Tente iniciar sessão.";
      case "auth/weak-password":
        return "A palavra-passe deve ter pelo menos 6 caracteres.";
      case "auth/popup-closed-by-user":
        return "A janela de autenticação foi fechada antes de concluir.";
      case "auth/network-request-failed":
        return "Erro de rede. Verifique a sua ligação à internet.";
      case "auth/too-many-requests":
        return "Demasiadas tentativas falhadas. Aguarde alguns instantes e tente novamente.";
      default:
        return fallback;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin");
      } else if (mode === "register") {
        if (password !== confirmPassword) {
          setError("As palavras-passe não coincidem.");
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError("A palavra-passe deve conter pelo menos 6 caracteres.");
          setLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/admin");
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage(`Email de recuperação enviado para ${email}. Verifique a sua caixa de entrada.`);
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      const code = err?.code || "";
      setError(getFriendlyErrorMessage(code, err?.message || "Ocorreu um erro no processamento."));
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/admin");
    } catch (err: any) {
      console.error("Google Auth error:", err);
      const code = err?.code || "";
      if (code !== "auth/popup-closed-by-user") {
        setError(getFriendlyErrorMessage(code, "Falha na autenticação com Google."));
      }
      setLoading(false);
    }
  };

  const setAdminEmailQuick = () => {
    setEmail(ADMIN_EMAIL);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-industrial-gray dark:bg-[#0D0F12] text-industrial-black dark:text-white transition-colors duration-200 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 my-8">
        <div className="bg-white dark:bg-[#14171D] w-full max-w-md p-8 md:p-10 shadow-2xl border border-transparent dark:border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="micro-label text-bfi-red">Acesso Restrito</div>
            <div className="flex items-center gap-1.5 text-xs text-industrial-black/60 dark:text-white/60">
              <ShieldCheck size={14} className="text-bfi-red" />
              <span>Painel de Gestão</span>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 text-industrial-black dark:text-white">
            {mode === "login" && "Iniciar Sessão"}
            {mode === "register" && "Criar Conta Admin"}
            {mode === "forgot" && "Recuperar Acesso"}
          </h1>

          <p className="text-xs text-industrial-black/60 dark:text-white/60 mb-6">
            {mode === "login" && "Introduza as suas credenciais para gerir o catálogo e definições."}
            {mode === "register" && "Registe a sua conta de administrador para aceder ao painel."}
            {mode === "forgot" && "Indique o seu email para receber um link de redefinição de password."}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-industrial-gray dark:bg-white/5 border border-industrial-black/5 dark:border-white/10 mb-6">
            <button
              type="button"
              onClick={() => { setMode("login"); setError(null); setSuccessMessage(null); }}
              className={`py-2 text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                mode === "login"
                  ? "bg-white dark:bg-[#1E232B] text-industrial-black dark:text-white shadow-sm"
                  : "text-industrial-black/60 dark:text-white/60 hover:text-industrial-black dark:hover:text-white"
              }`}
            >
              <LogIn size={13} />
              Entrar
            </button>
            <button
              type="button"
              onClick={() => { setMode("register"); setError(null); setSuccessMessage(null); }}
              className={`py-2 text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                mode === "register"
                  ? "bg-white dark:bg-[#1E232B] text-industrial-black dark:text-white shadow-sm"
                  : "text-industrial-black/60 dark:text-white/60 hover:text-industrial-black dark:hover:text-white"
              }`}
            >
              <UserPlus size={13} />
              Registar
            </button>
            <button
              type="button"
              onClick={() => { setMode("forgot"); setError(null); setSuccessMessage(null); }}
              className={`py-2 text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                mode === "forgot"
                  ? "bg-white dark:bg-[#1E232B] text-industrial-black dark:text-white shadow-sm"
                  : "text-industrial-black/60 dark:text-white/60 hover:text-industrial-black dark:hover:text-white"
              }`}
            >
              <RefreshCw size={13} />
              Recuperar
            </button>
          </div>

          {/* Quick Admin Helper */}
          <div className="mb-6 p-3 bg-industrial-gray/60 dark:bg-white/5 border border-industrial-black/5 dark:border-white/10 flex items-center justify-between text-xs">
            <div className="truncate mr-2">
              <span className="text-[10px] uppercase font-bold text-industrial-black/50 dark:text-white/50 block">Admin Oficial</span>
              <span className="font-mono text-industrial-black dark:text-white font-medium text-[11px]">{ADMIN_EMAIL}</span>
            </div>
            <button
              type="button"
              onClick={setAdminEmailQuick}
              className="text-[10px] font-bold uppercase px-2.5 py-1 bg-industrial-black dark:bg-white text-white dark:text-industrial-black hover:bg-bfi-red dark:hover:bg-bfi-red dark:hover:text-white transition-colors shrink-0"
            >
              Preencher
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="micro-label text-industrial-black/80 dark:text-white/80 flex items-center gap-1.5">
                <Mail size={12} />
                Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@exemplo.pt"
                className="w-full bg-transparent border-b-2 border-industrial-black/10 dark:border-white/20 text-industrial-black dark:text-white py-2.5 px-1 focus:border-bfi-red outline-none transition-colors placeholder:text-industrial-black/30 dark:placeholder:text-white/30 text-sm"
                required
              />
            </div>

            {/* Password Field (for Login and Register) */}
            {mode !== "forgot" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="micro-label text-industrial-black/80 dark:text-white/80 flex items-center gap-1.5">
                    <Lock size={12} />
                    Palavra-passe
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-[10px] text-industrial-black/50 dark:text-white/50 hover:text-bfi-red dark:hover:text-bfi-red transition-colors"
                    >
                      Esqueceu-se?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-b-2 border-industrial-black/10 dark:border-white/20 text-industrial-black dark:text-white py-2.5 px-1 pr-10 focus:border-bfi-red outline-none transition-colors text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-industrial-black/40 dark:text-white/40 hover:text-industrial-black dark:hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password Field (for Register) */}
            {mode === "register" && (
              <div className="space-y-1.5">
                <label className="micro-label text-industrial-black/80 dark:text-white/80 flex items-center gap-1.5">
                  <Lock size={12} />
                  Confirmar Palavra-passe
                </label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b-2 border-industrial-black/10 dark:border-white/20 text-industrial-black dark:text-white py-2.5 px-1 focus:border-bfi-red outline-none transition-colors text-sm"
                  required
                />
              </div>
            )}
            
            {/* Feedback Alerts */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start gap-2">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 text-xs flex items-start gap-2">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}
            
            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-industrial-black dark:bg-white text-white dark:text-industrial-black py-4 font-black uppercase tracking-widest hover:bg-bfi-red dark:hover:bg-bfi-red dark:hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>A processar...</span>
              ) : (
                <>
                  {mode === "login" && <><LogIn size={16} /> Entrar no Portal</>}
                  {mode === "register" && <><UserPlus size={16} /> Criar Conta Admin</>}
                  {mode === "forgot" && <><RefreshCw size={16} /> Enviar Link de Recuperação</>}
                </>
              )}
            </button>

            {/* Google Sign-in Alternative */}
            <div className="pt-4 border-t border-industrial-black/10 dark:border-white/10">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full border border-industrial-black/20 dark:border-white/20 text-industrial-black dark:text-white py-3 px-4 text-xs font-bold uppercase tracking-wider hover:bg-industrial-black hover:text-white dark:hover:bg-white dark:hover:text-industrial-black transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Continuar com Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

