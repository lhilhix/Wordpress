import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import QuoteModal from "./QuoteModal";
import { useSiteSettings } from "../hooks/useSiteSettings";

export default function Navbar() {
  const { settings } = useSiteSettings();
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
      <nav className="sticky top-0 z-50 bg-white border-b border-industrial-black/10">
        <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            {settings?.logoUrl ? (
              <img src={settings.logoUrl} alt="Plásticos Bueso" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
            ) : (
              <>
                <div className="w-8 h-8 bg-bfi-red flex items-center justify-center text-white font-black text-xl group-hover:bg-industrial-black transition-colors">
                  B
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase">
                  Plásticos Bueso
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
                  isActive(link.href) ? "text-bfi-red" : "hover:text-bfi-red"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => setIsQuoteOpen(true)}
              className="bg-bfi-red text-white px-6 py-2 font-bold text-xs uppercase tracking-widest hover:bg-industrial-black transition-colors"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-industrial-black/10 p-6 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`micro-label text-lg ${isActive(link.href) ? "text-bfi-red" : ""}`}
                onClick={() => handleLinkClick(link.href)}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                setIsOpen(false);
                setIsQuoteOpen(true);
              }}
              className="bg-bfi-red text-white px-6 py-4 font-bold text-sm uppercase tracking-widest"
            >
              Get a Quote
            </button>
          </motion.div>
        )}
      </nav>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
