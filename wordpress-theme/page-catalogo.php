<?php 
/**
 * Template Name: Catálogo
 */
get_header(); ?>

<main class="max-w-screen-2xl mx-auto px-6 py-20">
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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bfi-grid">
        <?php
        $products = [
            [
                "id" => "PB-001",
                "name" => "Conjunto de Engrenagens de Precisão",
                "category" => "Automóvel",
                "description" => "Engrenagens POM de alta durabilidade para sistemas de transmissão.",
                "image" => "https://picsum.photos/seed/gear/600/600",
            ],
            [
                "id" => "PB-002",
                "name" => "Caixa Estéril",
                "category" => "Médico",
                "description" => "Caixa de policarbonato de grau médico para dispositivos de diagnóstico.",
                "image" => "https://picsum.photos/seed/medical/600/600",
            ],
            [
                "id" => "PB-003",
                "name" => "Hub de Conectores",
                "category" => "Eletrónica",
                "description" => "Conectores PA66 retardadores de chama para uso industrial.",
                "image" => "https://picsum.photos/seed/connector/600/600",
            ],
            [
                "id" => "PB-004",
                "name" => "Acabamento de Painel",
                "category" => "Automóvel",
                "description" => "Acabamento estético ABS/PC com acabamento soft-touch.",
                "image" => "https://picsum.photos/seed/trim/600/600",
            ],
            [
                "id" => "PB-005",
                "name" => "Êmbolo de Seringa",
                "category" => "Médico",
                "description" => "Êmbolos de PP de alta precisão para seringas médicas.",
                "image" => "https://picsum.photos/seed/syringe/600/600",
            ],
            [
                "id" => "PB-006",
                "name" => "Caixa de Proteção",
                "category" => "Bens de Consumo",
                "description" => "Caixas de ABS resistentes ao impacto para dispositivos domésticos inteligentes.",
                "image" => "https://picsum.photos/seed/case/600/600",
            ],
        ];

        foreach ($products as $product) : ?>
            <div class="bfi-grid-item group">
                <div class="aspect-square mb-8 overflow-hidden relative">
                    <img 
                        src="<?php echo $product['image']; ?>" 
                        alt="<?php echo $product['name']; ?>" 
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        referrerpolicy="no-referrer"
                    >
                    <div class="absolute top-4 left-4 bg-white px-3 py-1 micro-label shadow-sm">
                        <?php echo $product['category']; ?>
                    </div>
                </div>
                <div class="micro-label text-bfi-red mb-2"><?php echo $product['id']; ?></div>
                <h3 class="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-bfi-red transition-colors">
                    <?php echo $product['name']; ?>
                </h3>
                <p class="text-industrial-black/50 text-sm leading-relaxed mb-6">
                    <?php echo $product['description']; ?>
                </p>
                <button class="flex items-center gap-2 micro-label font-black group-hover:text-bfi-red transition-colors">
                    Especificações Técnicas →
                </button>
            </div>
        <?php endforeach; ?>
    </div>

    <!-- CTA Section -->
    <section class="mt-32 bg-industrial-black text-white p-12 md:p-24 relative overflow-hidden">
        <div class="relative z-10 max-w-3xl">
            <div class="micro-label text-bfi-red mb-4">Soluções Personalizadas</div>
            <h2 class="display-medium mb-8">Precisa de um Molde à Medida?</h2>
            <p class="text-white/60 text-lg mb-12 leading-relaxed">
                A nossa equipa de engenharia pode ajudá-lo a projetar e fabricar moldes personalizados para os seus requisitos específicos. Do protótipo à produção em massa.
            </p>
            <button class="bg-bfi-red text-white px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-white hover:text-industrial-black transition-all">
                Solicitar Consulta
            </button>
        </div>
        <div class="absolute -bottom-20 -right-20 text-[25vw] font-black text-white/5 select-none pointer-events-none uppercase">
            Molde
        </div>
    </section>
</main>

<?php get_footer(); ?>
