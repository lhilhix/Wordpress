import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Package } from "lucide-react";
import { Product, subscribeToProducts } from "../services/productService";
import { Link } from "react-router-dom";

export default function FeaturedCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      // Pick the last 5 products as "featured" for now, or just the whole list if short
      setProducts(data.slice(-5).reverse());
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  if (loading || products.length === 0) return null;

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <div className="micro-label text-bfi-red mb-4">Peças em Destaque</div>
            <h2 className="display-medium tracking-tighter uppercase font-black leading-none">
              Inovação em <br /> Cada Detalhe
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={prev}
              className="w-16 h-16 border border-industrial-black/10 flex items-center justify-center hover:bg-industrial-black hover:text-white transition-all group"
            >
              <ArrowLeft size={24} className="group-active:scale-90 transition-transform" />
            </button>
            <button 
              onClick={next}
              className="w-16 h-16 border border-industrial-black/10 flex items-center justify-center hover:bg-industrial-black hover:text-white transition-all group"
            >
              <ArrowRight size={24} className="group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        <div 
          className="relative min-h-[850px] md:min-h-[600px] lg:h-[600px] cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Product Info */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="flex items-center gap-2 micro-label text-bfi-red mb-6">
                  <Package size={14} /> {products[currentIndex].category}
                </div>
                <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-tight">
                  {products[currentIndex].name}
                </h3>
                <p className="text-xl text-industrial-black/60 mb-12 max-w-lg leading-relaxed">
                  {products[currentIndex].description}
                </p>
                <Link 
                  to="/catalogo"
                  className="inline-flex items-center gap-4 bg-industrial-black text-white px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-bfi-red transition-all"
                >
                  Ver no Catálogo <ArrowRight size={16} />
                </Link>
              </div>

              {/* Product Image */}
              <div className="lg:col-span-7 h-full order-1 lg:order-2">
                <div className="relative h-full w-full bg-industrial-gray grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden group">
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    src={products[currentIndex].image} 
                    alt={products[currentIndex].name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-bfi-red/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-10 left-10 bg-industrial-black text-white p-6 font-black tracking-widest text-[10px] uppercase">
                    Ref: {products[currentIndex].id}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicators */}
        <div className="mt-12 flex items-center gap-12">
           <div className="micro-label font-black text-bfi-red">
             0{currentIndex + 1} <span className="text-industrial-black/20 mx-2">—</span> 0{products.length}
           </div>
           <div className="flex-grow h-[1px] bg-industrial-black/10 relative">
             <motion.div 
               className="absolute top-0 left-0 h-full bg-bfi-red"
               initial={false}
               animate={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
             />
           </div>
        </div>
      </div>
    </section>
  );
}
