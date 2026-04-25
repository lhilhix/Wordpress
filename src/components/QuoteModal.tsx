import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
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
            className="relative bg-white w-full max-w-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-bfi-red p-8 flex justify-between items-center text-white">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Solicitar Orçamento</h2>
              <button onClick={onClose} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>
            
            <form className="p-8 md:p-12" onSubmit={(e) => { e.preventDefault(); onClose(); alert('Obrigado! Entraremos em contacto brevemente.'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="micro-label">Nome</label>
                  <input required type="text" className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors" placeholder="João" />
                </div>
                <div className="space-y-2">
                  <label className="micro-label">Apelido</label>
                  <input required type="text" className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors" placeholder="Silva" />
                </div>
              </div>
              <div className="space-y-2 mb-8">
                <label className="micro-label">Endereço de Email</label>
                <input required type="email" className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors" placeholder="joao@exemplo.com" />
              </div>
              <div className="space-y-2 mb-8">
                <label className="micro-label">Setor de Atividade</label>
                <select className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors bg-white">
                  <option>Automóvel</option>
                  <option>Médico</option>
                  <option>Eletrónica</option>
                  <option>Outros</option>
                </select>
              </div>
              <div className="space-y-2 mb-12">
                <label className="micro-label">Mensagem / Especificações</label>
                <textarea required className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors min-h-[100px] resize-none" placeholder="Descreva brevemente o seu projeto..."></textarea>
              </div>
              <button type="submit" className="w-full bg-industrial-black text-white py-4 md:py-6 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-bfi-red transition-all">
                Enviar Pedido de Orçamento
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
