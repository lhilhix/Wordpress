import React from "react";
import { motion } from "motion/react";
import { History, Target, TrendingUp, MapPin } from "lucide-react";

const HistorySection: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-[#0D0F12] transition-colors duration-200 overflow-hidden" id="history">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side: Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="micro-label text-bfi-red mb-4"
            >
              Legado e Inovação
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="display-medium mb-8 text-industrial-black dark:text-white"
            >
              Nossa História: <br />
              <span className="text-industrial-black/40 dark:text-white/40">Décadas de Precisão Industrial</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-xl text-industrial-black/60 dark:text-white/70 leading-relaxed font-light"
            >
              <p>
                Fundada em <strong className="text-industrial-black dark:text-white font-bold">1985</strong> na cidade de <strong className="text-industrial-black dark:text-white font-bold">Braga, Portugal</strong>, 
                a Plásticos Bueso iniciou o seu percurso como uma pequena oficina familiar dedicada à injeção de componentes técnicos simples.
              </p>
              <p>
                Ao longo dos anos, o nosso compromisso inabalável com a qualidade e a inovação tecnológica permitiu-nos crescer de forma sustentada. 
                O que começou com uma única máquina transformou-se hoje num parque industrial moderno, equipado com tecnologia de ponta e sistemas de automação robótica.
              </p>
              <p>
                Hoje, somos reconhecidos como um parceiro estratégico na indústria de moldagem por injeção, exportando componentes de alta precisão 
                para mais de 20 países e servindo setores críticos como o Automóvel, Médico e Eletrónico.
              </p>
            </motion.div>
          </div>

          {/* Right Side: Key Achievements Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-8 bg-industrial-gray dark:bg-[#14171D] border-l-4 border-bfi-red"
            >
              <div className="flex items-center gap-3 mb-4">
                <History className="text-bfi-red" size={24} />
                <h4 className="font-black uppercase tracking-tighter text-sm text-industrial-black dark:text-white">Fundação</h4>
              </div>
              <p className="text-sm text-industrial-black/60 dark:text-white/60">
                Início das operações em 1985, focada na excelência técnica desde o primeiro dia.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 border border-industrial-black/10 dark:border-white/10 dark:bg-[#14171D]"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-bfi-red" size={24} />
                <h4 className="font-black uppercase tracking-tighter text-sm text-industrial-black dark:text-white">Crescimento</h4>
              </div>
              <p className="text-sm text-industrial-black/60 dark:text-white/60">
                Expansão contínua das instalações e parque de máquinas, atingindo capacidade de 1000 toneladas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 border border-industrial-black/10 dark:border-white/10 dark:bg-[#14171D]"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-bfi-red" size={24} />
                <h4 className="font-black uppercase tracking-tighter text-sm text-industrial-black dark:text-white">Conquistas</h4>
              </div>
              <p className="text-sm text-industrial-black/60 dark:text-white/60">
                Certificações ISO 9001 e estatuto de PME Excelência, refletindo o nosso rigor operacional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-industrial-black dark:bg-[#1B1F27] border dark:border-white/10 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-bfi-red" size={24} />
                <h4 className="font-black uppercase tracking-tighter text-sm">Localização</h4>
              </div>
              <p className="text-sm text-white/60">
                Estrategicamente sediados em Braga, um dos maiores polos industriais e tecnológicos de Portugal.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Big Achievement Number Section */}
        <div className="mt-24 pt-24 border-t border-industrial-black/5 dark:border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { value: "35+", label: "Anos de Experiência" },
            { value: "20+", label: "Países de Exportação" },
            { value: "150+", label: "Colaboradores" },
            { value: "1000t", label: "Capacidade Máxima" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl font-black text-bfi-red tracking-tighter mb-2">{stat.value}</div>
              <div className="micro-label text-industrial-black/40 dark:text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
