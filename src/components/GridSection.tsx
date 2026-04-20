import { motion, AnimatePresence } from "motion/react";
import { Settings, ShieldCheck, Zap, Package, Car, HeartPulse, Smartphone, Monitor, X } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Service {
  title: string;
  description: string;
  detailedDescription: string;
  icon: ReactNode;
  largeIcon: ReactNode;
  color: string;
}

export default function GridSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      title: "Moldagem por Injeção",
      description: "Maquinaria de última geração de 50 a 1000 toneladas para componentes de precisão.",
      detailedDescription: "Equipados com uma gama diversificada de máquinas de moldagem por injeção, lidamos com tudo, desde micro-componentes até grandes peças estruturais. As nossas instalações contam com manuseamento automatizado de materiais e remoção robótica de peças para manter uma elevada eficiência e repetibilidade. Trabalhamos com um vasto espetro de polímeros, incluindo resinas de engenharia de alto desempenho.",
      icon: <Zap size={32} />,
      largeIcon: <Zap size={64} />,
      color: "bg-bfi-red text-white",
    },
    {
      title: "Cromagem de Plásticos",
      description: "Acabamentos metálicos premium com alta resistência e brilho superior.",
      detailedDescription: "A nossa tecnologia de cromagem permite depositar camadas metálicas sobre substratos plásticos (ABS, PC/ABS), conferindo-lhes a aparência e propriedades do metal. Este processo é ideal para componentes estéticos na indústria automóvel e de bens de consumo, garantindo resistência à corrosão e um acabamento de luxo duradouro.",
      icon: <Settings size={32} />,
      largeIcon: <Settings size={64} />,
      color: "bg-industrial-gray",
    },
    {
      title: "Metalização em Vácuo",
      description: "Deposição de filmes finos metálicos para propriedades refletoras e estéticas.",
      detailedDescription: "A metalização em vácuo (PVD) é um processo ecológico que permite a aplicação de uma camada ultrafina de metal sobre peças plásticas. É amplamente utilizada em refletores de faróis, embalagens de cosméticos e componentes eletrónicos, oferecendo excelentes propriedades óticas e um acabamento metálico uniforme sem comprometer a geometria da peça.",
      icon: <Monitor size={32} />,
      largeIcon: <Monitor size={64} />,
      color: "bg-industrial-gray",
    },
    {
      title: "Design de Moldes",
      description: "Engenharia avançada CAD/CAM para moldes de alta precisão.",
      detailedDescription: "A nossa equipa de engenharia utiliza o mais recente software CAD/CAM para projetar moldes complexos. Focamo-nos na otimização dos ciclos de arrefecimento e fluxo de material para garantir um desempenho duradouro. Desde o conceito inicial até à análise final de DFM, garantimos que o seu produto está pronto para uma produção eficiente.",
      icon: <Settings size={32} />,
      largeIcon: <Settings size={64} />,
      color: "bg-industrial-gray",
    },
    {
      title: "Montagem e Acabamento",
      description: "Serviço completo de montagem e acabamento para produtos complexos.",
      detailedDescription: "Para além da moldagem e revestimento, fornecemos operações secundárias abrangentes. Isto inclui soldadura por ultrassons, rebitagem térmica, tampografia e montagem complexa. As nossas linhas de montagem dedicadas são projetadas para uma produção lean, garantindo que os seus produtos sejam entregues prontos para o utilizador final.",
      icon: <Package size={32} />,
      largeIcon: <Package size={64} />,
      color: "bg-industrial-gray",
    },
    {
      title: "Controlo de Qualidade",
      description: "Processos certificados ISO 9001 para uma produção com zero defeitos.",
      detailedDescription: "A qualidade está no centro de tudo o que fazemos. O nosso sistema de gestão de qualidade certificado pela norma ISO 9001 inclui inspeções rigorosas durante o processo, análise dimensional utilizando equipamento CMM e testes funcionais. Implementamos SPC para monitorizar a produção em tempo real.",
      icon: <ShieldCheck size={32} />,
      largeIcon: <ShieldCheck size={64} />,
      color: "bg-industrial-gray",
    },
  ];

  const industries = [
    { name: "Automóvel", icon: <Car size={24} /> },
    { name: "Médico", icon: <HeartPulse size={24} /> },
    { name: "Bens de Consumo", icon: <Smartphone size={24} /> },
    { name: "Eletrónica", icon: <Monitor size={24} /> },
  ];

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedService(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedService]);

  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="micro-label mb-4 text-bfi-red">Nossa Especialidade</div>
            <h2 className="display-medium">Excelência Industrial</h2>
          </div>
          <p className="text-lg text-industrial-black/60 max-w-md">
            Combinamos décadas de experiência com tecnologia de ponta para entregar soluções plásticas superiores.
          </p>
        </div>

        {/* Services Grid */}
        <div className="bfi-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedService(service)}
              className={`bfi-grid-item flex flex-col justify-between min-h-[300px] cursor-pointer group ${service.color}`}
            >
              <div className="mb-8 transition-transform duration-300 group-hover:scale-110 origin-left">
                {service.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter leading-none">
                  {service.title}
                </h3>
                <p className={`text-sm ${service.color.includes('text-white') ? 'text-white/80' : 'text-industrial-black/60'}`}>
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 micro-label font-black opacity-0 group-hover:opacity-100 transition-opacity">
                  Saber Mais <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Window */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-industrial-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-3xl overflow-hidden shadow-2xl"
              >
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 text-industrial-black hover:text-bfi-red transition-colors z-10"
                >
                  <X size={32} />
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className={`md:w-1/3 p-12 flex items-center justify-center ${selectedService.color.includes('text-white') ? 'bg-bfi-red text-white' : 'bg-industrial-gray text-bfi-red'}`}>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedService.largeIcon}
                    </motion.div>
                  </div>
                  <div className="md:w-2/3 p-12">
                    <div className="micro-label mb-4 text-bfi-red">Detalhe do Serviço</div>
                    <h2 className="display-medium mb-6">{selectedService.title}</h2>
                    <p className="text-lg text-industrial-black/70 leading-relaxed mb-8">
                      {selectedService.detailedDescription}
                    </p>
                    <button 
                      onClick={() => setSelectedService(null)}
                      className="bg-industrial-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-bfi-red transition-all"
                    >
                      Fechar Detalhes
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* About Reach Section (formerly Industries) */}
        <div id="about-reach" className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1">
            <div className="micro-label mb-4 text-bfi-red">Setores que Servimos</div>
            <h2 className="display-medium mb-6">Nosso <br /> Alcance</h2>
            <p className="text-industrial-black/60 mb-8">
              Desde componentes automóveis de alta segurança até dispositivos médicos estéreis, as nossas linhas de produção estão otimizadas para diversos padrões industriais.
            </p>
            <Link 
              to="/catalogo"
              className="inline-block bg-industrial-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-bfi-red transition-all"
            >
              Ver Casos de Estudo
            </Link>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="aspect-square border border-industrial-black/10 flex flex-col items-center justify-center gap-4 hover:bg-industrial-gray transition-colors group"
              >
                <div className="text-industrial-black/40 group-hover:text-bfi-red transition-colors">
                  {industry.icon}
                </div>
                <span className="micro-label text-center px-4">{industry.name}</span>
              </motion.div>
            ))}
            {/* Large Image Grid Item */}
            <div className="col-span-2 row-span-2 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img
                src="https://picsum.photos/seed/factory/800/800"
                alt="Factory floor"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-bfi-red/20 mix-blend-multiply pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 text-white z-10">
                <div className="micro-label text-white/80 mb-1">Instalações</div>
                <div className="text-2xl font-black uppercase tracking-tighter">Fábrica de Braga</div>
              </div>
            </div>
            <div className="col-span-2 aspect-video bg-industrial-black flex items-center justify-center p-8">
              <p className="text-white text-xl font-light italic leading-relaxed text-center">
                "Qualidade não é um ato, é um hábito."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
