import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err: any) {
      setError("Falha no login. Verifique as suas credenciais.");
    }
  };

  return (
    <div className="min-h-screen bg-industrial-gray dark:bg-[#0D0F12] text-industrial-black dark:text-white transition-colors duration-200 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white dark:bg-[#14171D] w-full max-w-md p-10 shadow-2xl border border-transparent dark:border-white/10">
          <div className="micro-label text-bfi-red mb-2">Acesso Restrito</div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-8 text-industrial-black dark:text-white">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="micro-label text-industrial-black/80 dark:text-white/80">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b-2 border-industrial-black/10 dark:border-white/20 text-industrial-black dark:text-white py-3 focus:border-bfi-red outline-none transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="micro-label text-industrial-black/80 dark:text-white/80">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b-2 border-industrial-black/10 dark:border-white/20 text-industrial-black dark:text-white py-3 focus:border-bfi-red outline-none transition-colors"
                required
              />
            </div>
            
            {error && <p className="text-bfi-red text-xs font-bold uppercase">{error}</p>}
            
            <button 
              type="submit"
              className="w-full bg-industrial-black dark:bg-white text-white dark:text-industrial-black py-4 font-black uppercase tracking-widest hover:bg-bfi-red dark:hover:bg-bfi-red dark:hover:text-white transition-all"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
