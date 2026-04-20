import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/ContactSection";
import GridSection from "../components/GridSection";
import CTASection from "../components/CTASection";
import { Settings, ShieldCheck, Zap, Package, Layers, Gauge } from "lucide-react";

export default function Services() {
  const detailedServices = [
    {
      title: "Injecção de Plásticos",
      subtitle: "Capacidade Industrial",
      description: "Operamos uma frota diversificada de máquinas de injecção horizontais e verticais, com forças de fecho de 50 a 1000 toneladas.",
      details: [
        "Processamento de polímeros técnicos (PA, POM, PBT, PPS)",
        "Moldagem de parede fina e micro-injecção",
        "Overmolding (sobre-injecção de borracha ou outros plásticos)",
        "Inserção automática de componentes metálicos"
      ],
      icon: <Zap className="text-bfi-red" size={40} />
    },
    {
      title: "Tratamentos de Superfície",
      subtitle: "Acabamento Premium",
      description: "Especialistas em conferir propriedades estéticas e funcionais através de processos galvânicos e vácuo.",
      details: [
        "Cromagem electrolítica em ABS e PC/ABS",
        "Metalização em vácuo (PVD) para alto brilho",
        "Pintura técnica e acabamentos soft-touch",
        "Tampografia e gravação laser"
      ],
      icon: <Layers className="text-bfi-red" size={40} />
    },
    {
      title: "Controlo de Qualidade",
      subtitle: "Precisão Certificada",
      description: "Laboratório metrológico equipado para garantir a conformidade com as normas mais exigentes.",
      details: [
        "Medição tridimensional (CMM)",
        "Ensaios de tração e dureza",
        "Controlo estatístico de processo (SPC)",
        "Rastreabilidade total de lotes"
      ],
      icon: <ShieldCheck className="text-bfi-red" size={40} />
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-bfi-red selection:text-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-industrial-black text-white pt-32 pb-24 px-6 relative overflow-hidden">
          <div className="max-w-screen-2xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="micro-label text-bfi-red mb-6">Excelência Técnica</div>
              <h1 className="display-large mb-8">Nossas <br /> Soluções</h1>
              <p className="text-xl text-white/60 leading-relaxed">
                Da engenharia de moldes ao acabamento final, oferecemos um serviço integrado de produção de componentes plásticos de alta performance.
              </p>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-bfi-red/10 -skew-x-12 translate-x-1/2"></div>
        </section>

        {/* Detailed Services Grid */}
        <section className="py-32 px-6">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {detailedServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-8">{service.icon}</div>
                  <div className="micro-label text-bfi-red mb-2">{service.subtitle}</div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">{service.title}</h2>
                  <p className="text-industrial-black/60 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-4">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight text-industrial-black/80">
                        <div className="w-1.5 h-1.5 bg-bfi-red"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reusing the GridSection for the overview */}
        <GridSection />

        {/* Industrial Stats */}
        <section className="py-24 bg-industrial-gray px-6 border-y border-industrial-black/5">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Capacidade Mensal", value: "2M+", sub: "Peças" },
              { label: "Taxa de Rejeição", value: "<0.1%", sub: "PPM" },
              { label: "Máquinas", value: "34", sub: "Unidades" },
              { label: "Anos de Know-how", value: "30+", sub: "Experiência" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">{stat.value}</div>
                <div className="micro-label text-bfi-red mb-1">{stat.label}</div>
                <div className="text-[10px] uppercase font-bold text-industrial-black/30 tracking-widest">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
