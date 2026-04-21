import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { getSessionId, subscribeToMessages, sendMessage, ChatMessage } from '../services/chatService';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = getSessionId();

  useEffect(() => {
    const unsubscribe = subscribeToMessages(sessionId, (msgs) => {
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [sessionId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    const content = inputValue.trim();
    setInputValue('');
    setIsSending(true);
    
    try {
      await sendMessage(sessionId, content);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[80vh] bg-white shadow-2xl overflow-hidden flex flex-col border border-industrial-black/10"
          >
            {/* Header */}
            <div className="bg-industrial-black p-6 text-white flex justify-between items-center bg-gradient-to-r from-industrial-black to-industrial-black/90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-bfi-red flex items-center justify-center font-black">B</div>
                <div>
                  <h3 className="font-bold uppercase tracking-widest text-xs">Assistência Virtual</h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-tight">Especialista em Moldagem</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:text-bfi-red transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-industrial-gray/30 custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 bg-bfi-red/10 text-bfi-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot size={24} />
                  </div>
                  <p className="micro-label text-center">Como podemos ajudar no seu projeto hoje?</p>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <div 
                  key={msg.id || idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-industrial-black text-white' : 'bg-bfi-red text-white'}`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div>
                      <div className={`p-4 text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-industrial-black text-white' 
                          : 'bg-white border border-industrial-black/10 text-industrial-black'
                      }`}>
                        {msg.content}
                      </div>
                      <div className={`text-[8px] uppercase tracking-widest mt-1 opacity-30 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 bg-bfi-red text-white flex items-center justify-center">
                      <Bot size={14} />
                    </div>
                    <div className="p-4 bg-white border border-industrial-black/10 flex items-center gap-2">
                       <Loader2 size={16} className="animate-spin text-bfi-red" />
                       <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Engenheiro está a escrever...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 bg-white border-t border-industrial-black/10 flex gap-3">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Pergunte sobre produtos ou serviços..."
                className="flex-1 bg-industrial-gray px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-bfi-red transition-all"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isSending}
                className="bg-bfi-red text-white p-3 hover:bg-industrial-black transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen ? 'bg-industrial-black' : 'bg-bfi-red'
        } text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors relative`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && messages.length > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-industrial-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            {messages.length}
          </div>
        )}
      </motion.button>
    </div>
  );
}
