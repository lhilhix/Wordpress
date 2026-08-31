import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "../hooks/useSiteSettings";

export default function CTASection() {
  const { settings } = useSiteSettings();

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Serviços", href: "/servicos" },
    { name: "Sobre Nós", href: "/about" },
  ];

  return (
    <section className="relative z-10 py-32 px-6 text-center bg-white dark:bg-[#0D0F12] border-t border-industrial-black/5 dark:border-white/10 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="display-medium mb-12 uppercase tracking-tighter text-industrial-black dark:text-white">
            Pronto para <br /> Iniciar o seu Projeto?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-20">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openQuote'))}
              className="bg-bfi-red text-white w-full sm:w-auto px-8 py-5 md:px-12 md:py-6 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-industrial-black dark:hover:bg-white dark:hover:text-industrial-black transition-all shadow-xl shadow-bfi-red/10"
            >
              Solicitar Orçamento
            </button>
            {settings?.techCatalogUrl ? (
              <a 
                href={settings.techCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-industrial-black dark:border-white/30 text-industrial-black dark:text-white w-full sm:w-auto px-8 py-5 md:px-12 md:py-6 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-industrial-black hover:text-white dark:hover:bg-white dark:hover:text-industrial-black transition-all flex items-center justify-center"
              >
                Baixar Catálogo Técnico
              </a>
            ) : (
              <button className="border-2 border-industrial-black dark:border-white/30 text-industrial-black dark:text-white w-full sm:w-auto px-8 py-5 md:px-12 md:py-6 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-industrial-black hover:text-white dark:hover:bg-white dark:hover:text-industrial-black transition-all flex items-center justify-center">
                Baixar Catálogo Técnico
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="micro-label text-industrial-black/40 dark:text-white/40 hover:text-bfi-red dark:hover:text-bfi-red transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bfi-red transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
