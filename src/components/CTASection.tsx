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
    <section className="relative z-10 py-32 px-6 text-center bg-white border-t border-industrial-black/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="display-medium mb-12 uppercase tracking-tighter">
            Pronto para <br /> Iniciar o seu Projeto?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openQuote'))}
              className="bg-bfi-red text-white px-12 py-6 font-black uppercase tracking-widest hover:bg-industrial-black transition-all shadow-xl shadow-bfi-red/10"
            >
              Solicitar Orçamento
            </button>
            {settings?.techCatalogUrl ? (
              <a 
                href={settings.techCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-industrial-black px-12 py-6 font-black uppercase tracking-widest hover:bg-industrial-black hover:text-white transition-all flex items-center justify-center"
              >
                Baixar Catálogo Técnico
              </a>
            ) : (
              <button className="border-2 border-industrial-black px-12 py-6 font-black uppercase tracking-widest hover:bg-industrial-black hover:text-white transition-all">
                Baixar Catálogo Técnico
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="micro-label text-industrial-black/40 hover:text-bfi-red transition-colors relative group"
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
