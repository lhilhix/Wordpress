import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/ContactSection";
import { Award, Users, History, Globe } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";

export default function About() {
  const { settings } = useSiteSettings();
  const milestones = [
    { year: "1985", event: "Fundada em Braga, Portugal, com uma única máquina de injeção." },
    { year: "1998", event: "Expansão para uma instalação de 2.000m² e obtenção da certificação ISO 9001." },
    { year: "2010", event: "Investimento em automação robótica de última geração e maquinaria de 1000 toneladas." },
    { year: "2023", event: "Atingido o estatuto de exportação global, servindo mais de 20 países em todo o mundo." },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-bfi-red selection:text-white">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-6 py-20">
        <header className="mb-24">
          <div className="micro-label mb-4 text-bfi-red">A Nossa História</div>
          <h1 className="display-large mb-8">Sobre a <br /> Plásticos Bueso</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <p className="text-xl text-industrial-black/60 leading-relaxed">
              {settings?.aboutText || "Há mais de três décadas que a Plásticos Bueso está na vanguarda da indústria de moldagem por injeção de plásticos em Portugal. Sediada no coração industrial de Braga, combinamos o artesanato tradicional com tecnologia futurista."}
            </p>
            {!settings?.aboutText && (
              <p className="text-xl text-industrial-black/60 leading-relaxed">
                A nossa missão é simples: fornecer soluções de engenharia de precisão que capacitem os nossos parceiros globais a inovar e a ter sucesso. Não fabricamos apenas peças; construímos os componentes do futuro.
              </p>
            )}
          </div>
        </header>

        {/* Vision & Values Grid */}
        <div className="bfi-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-32">
          <div className="bfi-grid-item bg-industrial-gray">
            <History className="text-bfi-red mb-6" size={40} />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Herança</h3>
            <p className="text-sm text-industrial-black/60">Construída sobre mais de 35 anos de experiência técnica e valores familiares.</p>
          </div>
          <div className="bfi-grid-item bg-white">
            <Award className="text-bfi-red mb-6" size={40} />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Qualidade</h3>
            <p className="text-sm text-industrial-black/60">Padrões ISO rigorosos e filosofia de fabricação com zero defeitos.</p>
          </div>
          <div className="bfi-grid-item bg-industrial-black text-white">
            <Users className="text-bfi-red mb-6" size={40} />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Equipa</h3>
            <p className="text-sm text-white/60">Uma força de trabalho dedicada de mais de 150 engenheiros e especialistas de produção.</p>
          </div>
          <div className="bfi-grid-item bg-white">
            <Globe className="text-bfi-red mb-6" size={40} />
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Global</h3>
            <p className="text-sm text-industrial-black/60">Exportação de componentes de precisão para líderes automóveis e médicos em todo o mundo.</p>
          </div>
        </div>

        {/* Timeline Section */}
        <section className="mb-32">
          <div className="micro-label mb-12 text-bfi-red">O Nosso Percurso</div>
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <motion.div 
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 md:items-center border-b border-industrial-black/10 pb-12"
              >
                <div className="text-6xl font-black text-bfi-red tracking-tighter md:w-48 shrink-0">
                  {m.year}
                </div>
                <div className="text-2xl font-bold text-industrial-black/80 leading-tight">
                  {m.event}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-32">
          <div className="micro-label mb-12 text-bfi-red">FAQ / Perguntas Frequentes</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 border-l-4 border-bfi-red pl-4">Quais são as vossas capacidades de produção?</h3>
              <p className="text-industrial-black/60 leading-relaxed">
                Dispomos de um parque de máquinas de moldagem por injeção com forças de fecho de 50 a 1000 toneladas, permitindo-nos produzir desde micro-componentes técnicos a grandes peças estruturais com alta precisão.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 border-l-4 border-bfi-red pl-4">Que tipos de materiais plásticos processam?</h3>
              <p className="text-industrial-black/60 leading-relaxed">
                Processamos uma vasta gama de polímeros de engenharia (ABS, PC, PA, POM, PBT), plásticos técnicos de alto desempenho, bem como materiais bio-baseados e reciclados para soluções sustentáveis.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 border-l-4 border-bfi-red pl-4">Quais são os vossos padrões de qualidade?</h3>
              <p className="text-industrial-black/60 leading-relaxed">
                Somos certificados ISO 9001. O nosso controlo de qualidade inclui medição CMM tridimensional, inspeção óptica automatizada e análise SPC em tempo real para garantir defeito zero em toda a produção.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 border-l-4 border-bfi-red pl-4">Oferecem serviços de acabamento e montagem?</h3>
              <p className="text-industrial-black/60 leading-relaxed">
                Sim, oferecemos soluções completas "chave na mão" incluindo cromagem, metalização, soldadura por ultrassons, tampografia e montagem de conjuntos técnicos complexos.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Image Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          <div className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <img 
              src={settings?.aboutImage || "https://picsum.photos/seed/bueso-team/1200/1200"} 
              alt="Our Team" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-bfi-red/10 mix-blend-multiply"></div>
          </div>
          <div className="grid grid-rows-2 gap-6">
            <div className="relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src="https://picsum.photos/seed/bueso-facility/1200/600" 
                alt="Our Facility" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-bfi-red/10 mix-blend-multiply"></div>
            </div>
            <div className="bg-bfi-red p-12 flex flex-col justify-center text-white">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Junte-se à Nossa Missão</h2>
              <p className="text-white/80 mb-8 max-w-md">Estamos sempre à procura de indivíduos talentosos para se juntarem às nossas equipas de produção e engenharia em Braga.</p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openQuote'))}
                className="self-start bg-white text-bfi-red px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-industrial-black hover:text-white transition-all"
              >
                Ver Carreiras
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
