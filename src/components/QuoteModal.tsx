import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-industrial-black/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-[#14171D] border border-transparent dark:border-white/10 w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="bg-bfi-red p-6 md:p-8 flex justify-between items-center text-white shrink-0">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Solicitar Orçamento</h2>
              <button onClick={onClose} className="hover:rotate-90 transition-transform p-1">
                <X size={24} />
              </button>
            </div>
            
            {submitted ? (
              <div className="p-12 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-2">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-industrial-black dark:text-white">Pedido Enviado!</h3>
                <p className="text-industrial-black/60 dark:text-white/60 max-w-md">Obrigado pelo seu contacto. A nossa equipa de engenharia responderá com uma proposta técnica no prazo máximo de 24 horas.</p>
              </div>
            ) : (
              <form className="p-6 md:p-8 lg:p-12 overflow-y-auto custom-scrollbar" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                  <div className="space-y-2">
                    <label className="micro-label">Nome</label>
                    <input required type="text" className="w-full bg-transparent border-b-2 border-industrial-black/10 dark:border-white/20 py-3 text-industrial-black dark:text-white focus:border-bfi-red outline-none transition-colors" placeholder="João" />
                  </div>
                  <div className="space-y-2">
                    <label className="micro-label">Apelido</label>
                    <input required type="text" className="w-full bg-transparent border-b-2 border-industrial-black/10 dark:border-white/20 py-3 text-industrial-black dark:text-white focus:border-bfi-red outline-none transition-colors" placeholder="Silva" />
                  </div>
                </div>
                <div className="space-y-2 mb-8">
                  <label className="micro-label">Endereço de Email</label>
                  <input required type="email" className="w-full bg-transparent border-b-2 border-industrial-black/10 dark:border-white/20 py-3 text-industrial-black dark:text-white focus:border-bfi-red outline-none transition-colors" placeholder="joao@exemplo.com" />
                </div>
                <div className="space-y-2 mb-8">
                  <label className="micro-label">Setor de Atividade</label>
                  <select className="w-full bg-transparent border-b-2 border-industrial-black/10 dark:border-white/20 py-3 text-industrial-black dark:text-white focus:border-bfi-red outline-none transition-colors dark:bg-[#14171D]">
                    <option value="Automóvel" className="dark:bg-[#14171D] dark:text-white">Automóvel</option>
                    <option value="Médico" className="dark:bg-[#14171D] dark:text-white">Médico</option>
                    <option value="Eletrónica" className="dark:bg-[#14171D] dark:text-white">Eletrónica</option>
                    <option value="Outros" className="dark:bg-[#14171D] dark:text-white">Outros</option>
                  </select>
                </div>
                <div className="space-y-2 mb-12">
                  <label className="micro-label">Mensagem / Especificações</label>
                  <textarea required className="w-full bg-transparent border-b-2 border-industrial-black/10 dark:border-white/20 py-3 text-industrial-black dark:text-white focus:border-bfi-red outline-none transition-colors min-h-[100px] resize-none" placeholder="Descreva brevemente o seu projeto..."></textarea>
                </div>
                <button type="submit" className="w-full bg-industrial-black text-white dark:bg-white dark:text-industrial-black py-4 md:py-6 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-bfi-red dark:hover:bg-bfi-red dark:hover:text-white transition-all">
                  Enviar Pedido de Orçamento
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

