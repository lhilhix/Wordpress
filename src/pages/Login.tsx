import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
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
    <div className="min-h-screen bg-industrial-gray flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md p-10 shadow-2xl">
          <div className="micro-label text-bfi-red mb-2">Acesso Restrito</div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="micro-label">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="micro-label">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors"
                required
              />
            </div>
            
            {error && <p className="text-bfi-red text-xs font-bold uppercase">{error}</p>}
            
            <button 
              type="submit"
              className="w-full bg-industrial-black text-white py-4 font-black uppercase tracking-widest hover:bg-bfi-red transition-all"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
