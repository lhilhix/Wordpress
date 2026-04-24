import { motion, AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/ContactSection";
import CTASection from "../components/CTASection";
import { ArrowLeft, ArrowRight, Search, Filter, ChevronLeft, ChevronRight, Loader2, X, ShieldCheck, Factory } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { subscribeToProducts, Product } from "../services/productService";

const staticProducts: Product[] = [
  { id: "PB-001", name: "Conjunto de Engrenagens de Precisão", category: "Engrenagens", industry: "Automóvel", description: "Engrenagens POM de alta durabilidade para sistemas de transmissão.", image: "https://picsum.photos/seed/gear/600/600" },
  { id: "PB-002", name: "Caixa Estéril", category: "Caixas", industry: "Médico", description: "Caixa de policarbonato de grau médico para dispositivos de diagnóstico.", image: "https://picsum.photos/seed/medical/600/600" },
  { id: "PB-003", name: "Hub de Conectores", category: "Conectores", industry: "Eletrónica", description: "Conectores PA66 retardadores de chama para uso industrial.", image: "https://picsum.photos/seed/connector/600/600" },
  { id: "PB-004", name: "Acabamento de Painel", category: "Acabamentos", industry: "Automóvel", description: "Acabamento estético ABS/PC com acabamento soft-touch.", image: "https://picsum.photos/seed/trim/600/600" },
  { id: "PB-005", name: "Êmbolo de Seringa", category: "Componentes Precisão", industry: "Médico", description: "Êmbolos de PP de alta precisão para seringas médicas.", image: "https://picsum.photos/seed/syringe/600/600" },
  { id: "PB-006", name: "Caixa de Proteção", category: "Caixas", industry: "Bens de Consumo", description: "Caixas de ABS resistentes ao impacto para dispositivos domésticos inteligentes.", image: "https://picsum.photos/seed/case/600/600" },
  { id: "PB-007", name: "Vedante de Silicone", category: "Vedantes", industry: "Culinário", description: "Vedantes de silicone de grau alimentador para recipientes.", image: "https://picsum.photos/seed/silicone/600/600" },
  { id: "PB-008", name: "Válvula de Retenção", category: "Válvulas", industry: "Industrial", description: "Válvulas anti-retorno para sistemas de fluídos.", image: "https://picsum.photos/seed/valve/600/600" },
];

export default function Catalog() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const itemsPerPage = 6;

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setDbProducts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
        setIsFilterSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
  };

  // Prevent scroll when modal or sidebar is open
  useEffect(() => {
    if (selectedProduct || isFilterSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProduct, isFilterSidebarOpen]);

  const displayProducts = useMemo(() => {
    return dbProducts.length > 0 ? dbProducts : staticProducts;
  }, [dbProducts]);

  // Extract unique categories and industries for filters
  const categories = useMemo(() => {
    const cats = Array.from(new Set(displayProducts.map(p => p.category))).filter(Boolean);
    return cats.sort();
  }, [displayProducts]);

  const industries = useMemo(() => {
    const inds = Array.from(new Set(displayProducts.map(p => p.industry))).filter(Boolean);
    return inds.sort();
  }, [displayProducts]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleIndustry = (ind: string) => {
    setSelectedIndustries(prev => 
      prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedIndustries([]);
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    let result = displayProducts;

    // Search query filter
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.industry && product.industry.toLowerCase().includes(query)) ||
        product.id.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Industry filter
    if (selectedIndustries.length > 0) {
      result = result.filter(product => selectedIndustries.includes(product.industry));
    }
    
    return result;
  }, [displayProducts, searchQuery, selectedCategories, selectedIndustries]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedIndustries]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return filteredProducts.slice(begin, end);
  }, [currentPage, itemsPerPage, filteredProducts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-bfi-red selection:text-white">
      <Navbar />
      
      <main>
        <div className="max-w-screen-2xl mx-auto px-6 py-20">
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-industrial-black/10 focus:border-bfi-red outline-none micro-label"
                />
              </div>
              <button 
                onClick={() => setIsFilterSidebarOpen(true)}
                className={`p-4 border transition-colors flex items-center justify-center relative ${
                  selectedCategories.length > 0 || selectedIndustries.length > 0 
                    ? 'bg-bfi-red border-bfi-red text-white' 
                    : 'border-industrial-black/10 hover:bg-industrial-gray'
                }`}
              >
                <Filter size={20} />
                {(selectedCategories.length > 0 || selectedIndustries.length > 0) && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-industrial-black text-white text-[10px] font-black flex items-center justify-center rounded-full">
                    {selectedCategories.length + selectedIndustries.length}
                  </div>
                )}
              </button>
            </div>
          </div>

          {(selectedCategories.length > 0 || selectedIndustries.length > 0) && (
            <div className="mt-8 flex flex-wrap gap-2 items-center">
              <span className="micro-label mr-2 opacity-40">Filtros Ativos:</span>
              {selectedCategories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => toggleCategory(cat)}
                  className="bg-industrial-gray px-3 py-1 micro-label !text-[10px] flex items-center gap-2 hover:bg-bfi-red hover:text-white transition-colors"
                >
                  {cat} <X size={12} />
                </button>
              ))}
              {selectedIndustries.map(ind => (
                <button 
                  key={ind} 
                  onClick={() => toggleIndustry(ind)}
                  className="bg-industrial-black text-white px-3 py-1 micro-label !text-[10px] flex items-center gap-2 hover:bg-bfi-red transition-colors"
                >
                  {ind} <X size={12} />
                </button>
              ))}
              <button 
                onClick={clearFilters}
                className="micro-label !text-[10px] underline hover:text-bfi-red transition-colors px-2"
              >
                Limpar Tudo
              </button>
            </div>
          )}
        </header>

        {/* Filter Sidebar overlay */}
        <AnimatePresence>
          {isFilterSidebarOpen && (
            <div className="fixed inset-0 z-[110] flex justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterSidebarOpen(false)}
                className="absolute inset-0 bg-industrial-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative bg-white w-full max-w-sm h-full shadow-2xl flex flex-col"
              >
                <div className="p-8 border-b border-industrial-black/10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Filter className="text-bfi-red" size={20} />
                    <h3 className="font-black uppercase tracking-widest text-sm">Filtros Técnicos</h3>
                  </div>
                  <button 
                    onClick={() => setIsFilterSidebarOpen(false)}
                    className="hover:text-bfi-red transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
                  {/* Category Filter */}
                  <section>
                    <h4 className="micro-label mb-6 opacity-40">Categorias de Produto</h4>
                    <div className="space-y-4">
                      {categories.map(category => (
                        <label key={category} className="flex items-center gap-3 group cursor-pointer">
                          <div className="relative flex items-center justify-center">
                            <input 
                              type="checkbox" 
                              className="appearance-none w-6 h-6 border-2 border-industrial-black/10 checked:bg-bfi-red checked:border-bfi-red transition-all cursor-pointer"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                            />
                            {selectedCategories.includes(category) && <X className="absolute text-white pointer-events-none" size={14} />}
                          </div>
                          <span className={`micro-label transition-colors ${selectedCategories.includes(category) ? 'font-black text-bfi-red' : 'group-hover:text-bfi-red'}`}>
                            {category}
                          </span>
                        </label>
                      ))}
                    </div>
                  </section>

                  {/* Industry Filter */}
                  <section>
                    <h4 className="micro-label mb-6 opacity-40">Setores Industriais</h4>
                    <div className="space-y-4">
                      {industries.map(industry => (
                        <label key={industry} className="flex items-center gap-3 group cursor-pointer">
                          <div className="relative flex items-center justify-center">
                            <input 
                              type="checkbox" 
                              className="appearance-none w-6 h-6 border-2 border-industrial-black/10 checked:bg-industrial-black checked:border-industrial-black transition-all cursor-pointer"
                              checked={selectedIndustries.includes(industry)}
                              onChange={() => toggleIndustry(industry)}
                            />
                            {selectedIndustries.includes(industry) && <X className="absolute text-white pointer-events-none" size={14} />}
                          </div>
                          <span className={`micro-label transition-colors ${selectedIndustries.includes(industry) ? 'font-black' : 'group-hover:text-bfi-red'}`}>
                            {industry}
                          </span>
                        </label>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="p-8 border-t border-industrial-black/10 bg-industrial-gray/30 grid grid-cols-2 gap-4">
                  <button 
                    onClick={clearFilters}
                    className="py-4 micro-label !text-[10px] text-center border border-industrial-black/10 hover:bg-industrial-black hover:text-white transition-all uppercase font-black"
                  >
                    Repor
                  </button>
                  <button 
                    onClick={() => setIsFilterSidebarOpen(false)}
                    className="py-4 micro-label !text-[10px] text-center bg-bfi-red text-white hover:bg-industrial-black transition-all uppercase font-black"
                  >
                    Aplicar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Catalog Grid with Animation */}
        <div className="bfi-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[800px]">
          <AnimatePresence mode="wait">
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bfi-grid-item group"
                >
                  <div 
                    className="relative aspect-square mb-8 overflow-hidden bg-industrial-gray grayscale group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                    onClick={() => openProductModal(product)}
                  >
                    <img 
                      src={product.images && product.images.length > 0 ? product.images[0] : product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-industrial-black text-white px-3 py-1 micro-label text-[8px]">
                      {product.id}
                    </div>
                    <div className="absolute inset-0 bg-bfi-red/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-industrial-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center">
                       <span className="micro-label text-white !text-opacity-100">Ver Detalhes Técnicos</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col h-full">
                    <div className="micro-label text-bfi-red mb-2">{product.category}</div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 leading-none">
                      {product.name}
                    </h3>
                    <p className="text-industrial-black/60 text-sm mb-8 flex-grow">
                      {product.description}
                    </p>
                    <button 
                      onClick={() => openProductModal(product)}
                      className="flex items-center gap-2 micro-label font-black group-hover:text-bfi-red transition-colors"
                    >
                      Especificações Técnicas <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-industrial-black/30"
              >
                <Search size={48} className="mb-4 opacity-20" />
                <p className="micro-label text-lg uppercase tracking-widest font-black">Nenhum produto encontrado</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
            <button 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-4 border border-industrial-black/10 transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-industrial-black hover:text-white'}`}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-12 h-12 micro-label flex items-center justify-center transition-all ${currentPage === page ? 'bg-bfi-red text-white' : 'border border-industrial-black/10 hover:bg-industrial-gray'}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-4 border border-industrial-black/10 transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-industrial-black hover:text-white'}`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Product Details Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-industrial-black/90 backdrop-blur-md"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
              >
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 text-industrial-black/20 hover:text-bfi-red transition-all z-10"
                >
                  <X size={32} />
                </button>

                {/* Left: Product Images */}
                <div className="md:w-1/2 bg-industrial-gray relative flex flex-col">
                  <div className="relative flex-grow h-[60vh] md:h-auto overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={selectedImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        src={selectedProduct.images && selectedProduct.images.length > 0 ? selectedProduct.images[selectedImageIndex] : selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>
                    <div className="absolute top-8 left-8 z-10 bg-bfi-red text-white p-4 font-black tracking-widest text-[10px] uppercase">
                      Ref: {selectedProduct.id}
                    </div>
                  </div>
                  {/* Thumbnails */}
                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <div className="bg-industrial-black/5 p-4 flex gap-4 overflow-x-auto custom-scrollbar">
                      {selectedProduct.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`flex-shrink-0 w-20 h-20 relative overflow-hidden transition-all ${selectedImageIndex === idx ? 'border-2 border-bfi-red scale-105' : 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0'}`}
                        >
                          <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Info */}
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-white">
                  <div className="flex justify-between items-start mb-6">
                    <div className="micro-label text-bfi-red">{selectedProduct.category}</div>
                    <button 
                      onClick={() => setSelectedProduct(null)}
                      className="md:hidden text-industrial-black/40 hover:text-bfi-red"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <h2 className="display-medium mb-8">{selectedProduct.name}</h2>
                  
                  <div className="space-y-10">
                    <section>
                      <div className="flex items-center gap-2 micro-label mb-4">
                        <Factory size={16} /> Visão Geral do Produto
                      </div>
                      <p className="text-xl text-industrial-black/60 leading-relaxed font-light">
                        {selectedProduct.detailedDescription || selectedProduct.description}
                      </p>
                    </section>

                    {selectedProduct.specifications && (
                      <section className="bg-industrial-gray p-8 border-l-4 border-bfi-red">
                        <div className="flex items-center gap-2 micro-label mb-6">
                          <ShieldCheck size={16} /> Especificações Técnicas
                        </div>
                        <div className="space-y-4">
                          {selectedProduct.specifications.split('\n').map((spec, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-industrial-black/5 pb-2">
                              <span className="text-xs font-mono text-industrial-black/40 uppercase tracking-widest">
                                {spec.split(':')[0]}
                              </span>
                              <span className="text-sm font-black uppercase tracking-tight">
                                {spec.split(':')[1] || spec}
                              </span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    <div className="pt-8 flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => {
                          setSelectedProduct(null);
                          window.dispatchEvent(new CustomEvent('openQuote'));
                        }}
                        className="flex-1 bg-bfi-red text-white py-5 font-black uppercase tracking-widest hover:bg-industrial-black transition-all"
                      >
                        Solicitar Orçamento
                      </button>
                      <button 
                        onClick={() => setSelectedProduct(null)}
                        className="flex-1 border border-industrial-black py-5 font-black uppercase tracking-widest hover:bg-industrial-gray transition-all"
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        </div>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
