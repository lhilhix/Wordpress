<?php 
/**
 * Template Name: Catálogo
 */
get_header(); ?>

<main class="max-w-screen-2xl mx-auto px-6 py-20" 
      x-data="{ 
        currentPage: 1, 
        itemsPerPage: 6,
        products: [
            { id: 'PB-001', name: 'Conjunto de Engrenagens de Precisão', category: 'Automóvel', description: 'Engrenagens POM de alta durabilidade para sistemas de transmissão.', image: 'https://picsum.photos/seed/gear/600/600' },
            { id: 'PB-002', name: 'Caixa Estéril', category: 'Médico', description: 'Caixa de policarbonato de grau médico para dispositivos de diagnóstico.', image: 'https://picsum.photos/seed/medical/600/600' },
            { id: 'PB-003', name: 'Hub de Conectores', category: 'Eletrónica', description: 'Conectores PA66 retardadores de chama para uso industrial.', image: 'https://picsum.photos/seed/connector/600/600' },
            { id: 'PB-004', name: 'Acabamento de Painel', category: 'Automóvel', description: 'Acabamento estético ABS/PC com acabamento soft-touch.', image: 'https://picsum.photos/seed/trim/600/600' },
            { id: 'PB-005', name: 'Êmbolo de Seringa', category: 'Médico', description: 'Êmbolos de PP de alta precisão para seringas médicas.', image: 'https://picsum.photos/seed/syringe/600/600' },
            { id: 'PB-006', name: 'Caixa de Proteção', category: 'Bens de Consumo', description: 'Caixas de ABS resistentes ao impacto para dispositivos domésticos inteligentes.', image: 'https://picsum.photos/seed/case/600/600' },
            { id: 'PB-007', name: 'Suporte Estrutural', category: 'Industrial', description: 'Suportes de nylon reforçado com fibra de vidro para maquinaria.', image: 'https://picsum.photos/seed/structure/600/600' },
            { id: 'PB-008', name: 'Painel de Instrumentos', category: 'Automóvel', description: 'Componentes internos complexos com tolerâncias apertadas.', image: 'https://picsum.photos/seed/dash/600/600' },
            { id: 'PB-009', name: 'Carcaça de Sensor', category: 'Eletrónica', description: 'Proteção IP67 para sensores industriais em ambientes agressivos.', image: 'https://picsum.photos/seed/sensor/600/600' },
            { id: 'PB-010', name: 'Válvulas de Precisão', category: 'Médico', description: 'Componentes elastómeros para controlo de fluidos médicos.', image: 'https://picsum.photos/seed/valve/600/600' },
            { id: 'PB-011', name: 'Botões de Interface', category: 'Bens de Consumo', description: 'Botões bi-matéria para toque premium e durabilidade.', image: 'https://picsum.photos/seed/buttons/600/600' },
            { id: 'PB-012', name: 'Tampa de Depósito', category: 'Automóvel', description: 'Tampas resistentes quimicamente para sistemas de fluidos.', image: 'https://picsum.photos/seed/cap/600/600' }
        ],
        get totalPages() { return Math.ceil(this.products.length / this.itemsPerPage) },
        get paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.products.slice(start, start + this.itemsPerPage);
        },
        changePage(page) {
            this.currentPage = page;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }">
    <header class="mb-20">
        <div class="micro-label mb-4 text-bfi-red">Catálogo de Produtos</div>
        <h1 class="display-large mb-8">Catálogo de <br /> Componentes</h1>
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p class="text-xl text-industrial-black/60 max-w-2xl leading-relaxed">
                Explore a nossa gama de componentes moldados de alta precisão. Cada peça é projetada para cumprir os padrões industriais mais exigentes.
            </p>
            
            <div class="flex items-center gap-4 w-full md:w-auto">
                <div class="relative flex-1 md:w-64">
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-industrial-black/30" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input 
                        type="text" 
                        placeholder="Pesquisar peças..." 
                        class="w-full pl-12 pr-4 py-4 border border-industrial-black/10 focus:border-bfi-red outline-none micro-label"
                    >
                </div>
                <button class="p-4 border border-industrial-black/10 hover:bg-industrial-gray transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                </button>
            </div>
        </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bfi-grid min-h-[800px]">
        <template x-for="product in paginatedProducts" :key="product.id">
            <div class="bfi-grid-item group">
                <div class="aspect-square mb-8 overflow-hidden relative">
                    <img 
                        :src="product.image" 
                        :alt="product.name" 
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        referrerpolicy="no-referrer"
                    >
                    <div class="absolute top-4 left-4 bg-white px-3 py-1 micro-label shadow-sm" x-text="product.category"></div>
                </div>
                <div class="micro-label text-bfi-red mb-2" x-text="product.id"></div>
                <h3 class="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-bfi-red transition-colors" x-text="product.name"></h3>
                <p class="text-industrial-black/50 text-sm leading-relaxed mb-6" x-text="product.description"></p>
                <button class="flex items-center gap-2 micro-label font-black group-hover:text-bfi-red transition-colors">
                    Especificações Técnicas →
                </button>
            </div>
        </template>
    </div>

    <!-- Pagination Controls -->
    <div class="mt-16 flex items-center justify-center gap-4" x-show="totalPages > 1">
        <button 
            @click="changePage(Math.max(1, currentPage - 1))"
            :disabled="currentPage === 1"
            class="p-4 border border-industrial-black/10 transition-all hover:bg-industrial-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <div class="flex gap-2">
            <template x-for="page in totalPages" :key="page">
                <button
                    @click="changePage(page)"
                    class="w-12 h-12 micro-label flex items-center justify-center transition-all"
                    :class="currentPage === page ? 'bg-bfi-red text-white' : 'border border-industrial-black/10 hover:bg-industrial-gray'"
                    x-text="page"
                ></button>
            </template>
        </div>

        <button 
            @click="changePage(Math.min(totalPages, currentPage + 1))"
            :disabled="currentPage === totalPages"
            class="p-4 border border-industrial-black/10 transition-all hover:bg-industrial-black hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
    </div>

    <!-- CTA Section -->
    <section class="mt-32 bg-industrial-black text-white p-12 md:p-24 relative overflow-hidden">

    <!-- CTA Section -->
    <section class="mt-32 bg-industrial-black text-white p-12 md:p-24 relative overflow-hidden">
        <div class="relative z-10 max-w-3xl">
            <div class="micro-label text-bfi-red mb-4">Soluções Personalizadas</div>
            <h2 class="display-medium mb-8">Precisa de um Molde à Medida?</h2>
            <p class="text-white/60 text-lg mb-12 leading-relaxed">
                A nossa equipa de engenharia pode ajudá-lo a projetar e fabricar moldes personalizados para os seus requisitos específicos. Do protótipo à produção em massa.
            </p>
            <button @click="quoteModalOpen = true" class="bg-bfi-red text-white px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-white hover:text-industrial-black transition-all">
                Solicitar Consulta
            </button>
        </div>
        <div class="absolute -bottom-20 -right-20 text-[25vw] font-black text-white/5 select-none pointer-events-none uppercase">
            Molde
        </div>
    </section>
</main>

<?php get_footer(); ?>
