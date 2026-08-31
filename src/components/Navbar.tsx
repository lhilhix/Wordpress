import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import QuoteModal from "./QuoteModal";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { settings } = useSiteSettings();
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleOpenQuote = () => setIsQuoteOpen(true);
    window.addEventListener('openQuote', handleOpenQuote);
    return () => window.removeEventListener('openQuote', handleOpenQuote);
  }, []);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Serviços", href: "/servicos" },
    { name: "Sobre Nós", href: "/about" },
    { name: "Contacto", href: "/#contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#") && location.pathname === "/") {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="h-20">
        <nav className="fixed w-full top-0 z-50 bg-white/95 dark:bg-[#0D0F12]/95 backdrop-blur-md border-b border-industrial-black/10 dark:border-white/10 transition-colors duration-200">
        <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            {settings?.logoUrl ? (
              <img src={settings.logoUrl} alt="Plásticos Bueso" className="h-8 w-auto object-contain dark:brightness-110" referrerPolicy="no-referrer" />
            ) : (
              <>
                <div className="w-8 h-8 bg-bfi-red flex items-center justify-center text-white font-black text-xl group-hover:bg-industrial-black dark:group-hover:bg-white dark:group-hover:text-industrial-black transition-colors">
                  B
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase hidden sm:block text-industrial-black dark:text-white">
                  Plásticos Bueso
                </span>
                <span className="font-black text-xl tracking-tighter uppercase sm:hidden text-industrial-black dark:text-white">
                  P. Bueso
                </span>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`micro-label transition-colors ${
                  isActive(link.href) 
                    ? "text-bfi-red font-black" 
                    : "text-industrial-black/70 dark:text-white/70 hover:text-bfi-red dark:hover:text-bfi-red"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Dark Mode Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2.5 border border-industrial-black/15 dark:border-white/20 text-industrial-black dark:text-white hover:border-bfi-red dark:hover:border-bfi-red hover:text-bfi-red dark:hover:text-bfi-red transition-all flex items-center justify-center relative group"
              aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
              title={isDark ? "Modo Claro" : "Modo Escuro"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} className="text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} className="text-industrial-black" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <button 
              id="header-quote-btn"
              onClick={() => setIsQuoteOpen(true)}
              className="bg-bfi-red text-white px-6 py-2.5 font-bold text-xs uppercase tracking-widest hover:bg-industrial-black dark:hover:bg-white dark:hover:text-industrial-black transition-colors"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Right Action Area: Dark Mode Toggle + Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              id="mobile-theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 border border-industrial-black/15 dark:border-white/20 text-industrial-black dark:text-white hover:text-bfi-red transition-colors"
              aria-label={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
            >
              {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              className="relative z-[60] text-industrial-black dark:text-white hover:text-bfi-red transition-colors p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-industrial-black/70 z-40 md:hidden backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Mobile Nav Menu (Dropdown) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#14171D] border-b border-industrial-black/10 dark:border-white/10 p-6 flex flex-col gap-3 shadow-2xl z-50 overflow-y-auto max-h-[calc(100vh-5rem)]"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`micro-label text-base block py-3 border-b border-industrial-black/5 dark:border-white/5 ${
                    isActive(link.href) ? "text-bfi-red font-black" : "text-industrial-black/80 dark:text-white/80 hover:text-bfi-red dark:hover:text-white"
                  }`}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 flex items-center justify-between py-2 text-sm text-industrial-black/70 dark:text-white/70">
                <span className="micro-label">Tema da Interface</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 border border-industrial-black/15 dark:border-white/20 text-xs uppercase font-bold micro-label"
                >
                  {isDark ? (
                    <>
                      <Sun size={14} className="text-amber-400" /> Modo Claro
                    </>
                  ) : (
                    <>
                      <Moon size={14} /> Modo Escuro
                    </>
                  )}
                </button>
              </div>

              <button 
                id="mobile-quote-btn"
                onClick={() => {
                  setIsOpen(false);
                  setIsQuoteOpen(true);
                }}
                className="bg-bfi-red text-white px-6 py-4 font-bold text-sm uppercase tracking-widest mt-2 hover:bg-industrial-black transition-colors"
              >
                Get a Quote
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      </header>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}

