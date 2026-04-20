import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-industrial-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-md p-10 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-industrial-black/20 hover:text-bfi-red transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-bfi-red/10 flex items-center justify-center text-bfi-red rounded-full mb-6">
                <AlertTriangle size={32} />
              </div>
              
              <div className="micro-label text-bfi-red mb-2">Atenção</div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">{title}</h2>
              <p className="text-industrial-black/60 mb-10 leading-relaxed">{message}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="flex-1 bg-bfi-red text-white py-4 font-black uppercase tracking-widest hover:bg-industrial-black transition-all"
                >
                  Confirmar
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 border border-industrial-black py-4 font-black uppercase tracking-widest hover:bg-industrial-gray transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
