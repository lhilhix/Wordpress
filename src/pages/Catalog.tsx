import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/ContactSection";
import { ArrowRight, Search, Filter } from "lucide-react";

const products = [
  {
    id: "PB-001",
    name: "Conjunto de Engrenagens de Precisão",
    category: "Automóvel",
    description: "Engrenagens POM de alta durabilidade para sistemas de transmissão.",
    image: "https://picsum.photos/seed/gear/600/600",
  },
  {
    id: "PB-002",
    name: "Caixa Estéril",
    category: "Médico",
    description: "Caixa de policarbonato de grau médico para dispositivos de diagnóstico.",
    image: "https://picsum.photos/seed/medical/600/600",
  },
  {
    id: "PB-003",
    name: "Hub de Conectores",
    category: "Eletrónica",
    description: "Conectores PA66 retardadores de chama para uso industrial.",
    image: "https://picsum.photos/seed/connector/600/600",
  },
  {
    id: "PB-004",
    name: "Acabamento de Painel",
    category: "Automóvel",
    description: "Acabamento estético ABS/PC com acabamento soft-touch.",
    image: "https://picsum.photos/seed/trim/600/600",
  },
  {
    id: "PB-005",
    name: "Êmbolo de Seringa",
    category: "Médico",
    description: "Êmbolos de PP de alta precisão para seringas médicas.",
    image: "https://picsum.photos/seed/syringe/600/600",
  },
  {
    id: "PB-006",
    name: "Caixa de Proteção",
    category: "Bens de Consumo",
    description: "Caixas de ABS resistentes ao impacto para dispositivos domésticos inteligentes.",
    image: "https://picsum.photos/seed/case/600/600",
  },
];

export default function Catalog() {
  return (
    <div className="min-h-screen bg-white selection:bg-bfi-red selection:text-white">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-6 py-20">
        <header className="mb-20">
          <div className="micro-label mb-4 text-bfi-red">Catálogo de Produtos</div>
          <h1 className="display-large mb-8">Catálogo de <br /> Componentes</h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-xl text-industrial-black/60 max-w-2xl leading-relaxed">
              Explore a nossa gama de componentes moldados de alta precisão. Cada peça é projetada para cumprir os padrões industriais mais exigentes.
            </p>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-industrial-black/30" size={18} />
                <input 
                  type="text" 
                  placeholder="Pesquisar peças..." 
                  className="w-full pl-12 pr-4 py-4 border border-industrial-black/10 focus:border-bfi-red outline-none micro-label"
                />
              </div>
              <button className="p-4 border border-industrial-black/10 hover:bg-industrial-gray transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Catalog Grid */}
        <div className="bfi-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bfi-grid-item group"
            >
              <div className="relative aspect-square mb-8 overflow-hidden bg-industrial-gray grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-industrial-black text-white px-3 py-1 micro-label text-[8px]">
                  {product.id}
                </div>
                <div className="absolute inset-0 bg-bfi-red/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              
              <div className="flex flex-col h-full">
                <div className="micro-label text-bfi-red mb-2">{product.category}</div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">
                  {product.name}
                </h3>
                <p className="text-industrial-black/60 text-sm mb-8 flex-grow">
                  {product.description}
                </p>
                <button className="flex items-center gap-2 micro-label font-black group-hover:text-bfi-red transition-colors">
                  Especificações Técnicas <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-32 bg-industrial-black text-white p-12 md:p-24 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="micro-label text-bfi-red mb-4">Soluções Personalizadas</div>
            <h2 className="display-medium mb-8">Precisa de um Molde à Medida?</h2>
            <p className="text-white/60 text-lg mb-12 leading-relaxed">
              A nossa equipa de engenharia pode ajudá-lo a projetar e fabricar moldes personalizados para os seus requisitos específicos. Do protótipo à produção em massa.
            </p>
            <button className="bg-bfi-red text-white px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-white hover:text-industrial-black transition-all">
              Solicitar Consulta
            </button>
          </div>
          <div className="absolute -bottom-20 -right-20 text-[25vw] font-black text-white/5 select-none pointer-events-none uppercase">
            Molde
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
