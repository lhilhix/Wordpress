import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "../hooks/useSiteSettings";

export default function Hero() {
  const { settings } = useSiteSettings();
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center px-6 py-20 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <div className="micro-label mb-4 text-bfi-red">Fundada em Braga, Portugal</div>
          <h1 className="display-large mb-8">
            Moldagem <br />
            por <span className="text-bfi-red">Injeção</span> <br />
            de Precisão
          </h1>
          <p className="text-xl max-w-lg mb-10 text-industrial-black/70 leading-relaxed">
            Entregamos componentes plásticos de alto desempenho para as indústrias automóvel, médica e eletrónica de consumo em todo o mundo.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={scrollToServices}
              className="bg-industrial-black text-white px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-bfi-red transition-all flex items-center gap-3"
            >
              Explorar Serviços <ArrowRight size={18} />
            </button>
            <Link 
              to="/about"
              className="border-2 border-industrial-black px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-industrial-black hover:text-white transition-all text-center"
            >
              Nossa Fábrica
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative aspect-square lg:aspect-video overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
        >
          <img
            src={settings?.heroImage || "https://picsum.photos/seed/injection-molding/1200/800"}
            alt="Industrial plastic injection molding machine"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-bfi-red/10 mix-blend-multiply pointer-events-none"></div>
        </motion.div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-20 -right-20 text-[20vw] font-black text-industrial-gray opacity-20 select-none pointer-events-none uppercase">
        Braga
      </div>
    </section>
  );
}
