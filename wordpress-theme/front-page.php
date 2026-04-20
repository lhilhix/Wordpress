<?php get_header(); ?>

<main>
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center px-6 py-20 overflow-hidden bg-white">
        <div class="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="z-10">
                <div class="micro-label mb-4 text-bfi-red">Fundada em Braga, Portugal</div>
                <h1 class="display-large mb-8">
                    Moldagem <br />
                    por <span class="text-bfi-red">Injeção</span> <br />
                    de Precisão
                </h1>
                <p class="text-xl max-w-lg mb-10 text-industrial-black/70 leading-relaxed">
                    Entregamos componentes plásticos de alto desempenho para as indústrias automóvel, médica e eletrónica de consumo em todo o mundo.
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="#services" class="bg-industrial-black text-white px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-bfi-red transition-all flex items-center gap-3">
                        Explorar Serviços →
                    </a>
                    <a href="<?php echo esc_url(home_url('/about')); ?>" class="border-2 border-industrial-black px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-industrial-black hover:text-white transition-all text-center">
                        Nossa Fábrica
                    </a>
                </div>
            </div>
            <div class="relative h-[600px] lg:h-[800px] w-full">
                <img 
                    src="https://picsum.photos/seed/industrial/1200/1600" 
                    alt="Industrial Facility" 
                    class="w-full h-full object-cover grayscale brightness-50"
                    referrerpolicy="no-referrer"
                >
                <div class="absolute inset-0 bg-bfi-red/10 mix-blend-multiply"></div>
                <div class="absolute -bottom-10 -right-10 text-[20vw] font-black text-industrial-black/5 select-none pointer-events-none uppercase">
                    Bueso
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section with Alpine.js Modals -->
    <section id="services" class="py-32 px-6 bg-white" x-data="{ 
        selectedService: null,
        services: [
            {
                id: 1,
                title: 'Moldagem por Injeção',
                description: 'Maquinaria de última geração de 50 a 1000 toneladas para componentes de precisão.',
                detailedDescription: 'Equipados com uma gama diversificada de máquinas de moldagem por injeção, lidamos com tudo, desde micro-componentes até grandes peças estruturais. As nossas instalações contam com manuseamento automatizado de materiais e remoção robótica de peças para manter uma elevada eficiência e repetibilidade.',
                icon: 'zap'
            },
            {
                id: 2,
                title: 'Cromagem de Plásticos',
                description: 'Acabamentos metálicos premium com alta resistência e brilho superior.',
                detailedDescription: 'A nossa tecnologia de cromagem permite depositar camadas metálicas sobre substratos plásticos (ABS, PC/ABS), conferindo-lhes a aparência e propriedades do metal. Este processo é ideal para componentes estéticos na indústria automóvel e de bens de consumo.',
                icon: 'settings'
            },
            {
                id: 3,
                title: 'Metalização em Vácuo',
                description: 'Deposição de filmes finos metálicos para propriedades refletoras e estéticas.',
                detailedDescription: 'A metalização em vácuo (PVD) é um processo ecológico que permite a aplicação de uma camada ultrafina de metal sobre peças plásticas. É amplamente utilizada em refletores de faróis, embalagens de cosméticos e componentes eletrónicos.',
                icon: 'package'
            },
            {
                id: 4,
                title: 'Design de Moldes',
                description: 'Engenharia avançada CAD/CAM para moldes de alta precisão.',
                detailedDescription: 'A nossa equipa de engenharia utiliza o mais recente software CAD/CAM para projetar moldes complexos e de alta precisão. Focamo-nos na otimização dos ciclos de arrefecimento, fluxo de material e integridade estrutural.',
                icon: 'settings'
            },
            {
                id: 5,
                title: 'Montagem e Acabamento',
                description: 'Serviço completo de montagem e acabamento para produtos complexos.',
                detailedDescription: 'Para além da moldagem e revestimento, fornecemos operações secundárias abrangentes. Isto inclui soldadura por ultrassons, rebitagem térmica, tampografia e montagem complexa.',
                icon: 'package'
            },
            {
                id: 6,
                title: 'Controlo de Qualidade',
                description: 'Processos certificados ISO 9001 para uma produção com zero defeitos.',
                detailedDescription: 'A qualidade está no centro de tudo o que fazemos. O nosso sistema de gestão de qualidade certificado pela norma ISO 9001 inclui inspeções rigorosas durante o processo, análise dimensional utilizando equipamento CMM e testes funcionais.',
                icon: 'shield'
            }
        ]
    }">
        <div class="max-w-screen-2xl mx-auto">
            <div class="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div class="max-w-2xl">
                    <div class="micro-label mb-4 text-bfi-red">Nossa Especialidade</div>
                    <h2 class="display-medium">Excelência Industrial</h2>
                </div>
                <p class="text-lg text-industrial-black/60 max-w-md">
                    Combinamos décadas de experiência com tecnologia de ponta para entregar soluções plásticas superiores.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bfi-grid">
                <template x-for="service in services" :key="service.id">
                    <div 
                        @click="selectedService = service"
                        class="bfi-grid-item group cursor-pointer hover:bg-industrial-gray transition-all duration-500"
                    >
                        <div class="mb-12 text-bfi-red group-hover:scale-110 transition-transform duration-500">
                            <div x-show="service.icon === 'settings'"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg></div>
                            <div x-show="service.icon === 'zap'"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.71 13.14 4H15l-4 9.29H20l-9.14 10.71H9l4-9.29H4Z"/></svg></div>
                            <div x-show="service.icon === 'package'"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg></div>
                            <div x-show="service.icon === 'shield'"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></div>
                        </div>
                        <h3 class="text-2xl font-black uppercase tracking-tighter mb-4" x-text="service.title"></h3>
                        <p class="text-industrial-black/50 text-sm leading-relaxed" x-text="service.description"></p>
                        <div class="mt-6 flex items-center gap-2 micro-label font-black opacity-0 group-hover:opacity-100 transition-opacity">
                            Saber Mais <span>→</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Modal Overlay -->
        <div 
            x-show="selectedService" 
            x-cloak
            class="fixed inset-0 z-[100] flex items-center justify-center p-6"
            @keydown.escape.window="selectedService = null"
        >
            <div 
                x-show="selectedService"
                x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0"
                x-transition:enter-end="opacity-100"
                class="absolute inset-0 bg-industrial-black/90 backdrop-blur-sm"
                @click="selectedService = null"
            ></div>
            
            <div 
                x-show="selectedService"
                x-transition:enter="transition ease-out duration-500"
                x-transition:enter-start="opacity-0 scale-95 translate-y-8"
                x-transition:enter-end="opacity-100 scale-100 translate-y-0"
                class="relative bg-white w-full max-w-5xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
            >
                <div class="md:w-1/3 bg-industrial-gray p-12 flex flex-col items-center justify-center relative overflow-hidden">
                    <div class="text-bfi-red relative z-10">
                        <template x-if="selectedService && selectedService.icon === 'settings'"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg></template>
                        <template x-if="selectedService && selectedService.icon === 'zap'"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.71 13.14 4H15l-4 9.29H20l-9.14 10.71H9l4-9.29H4Z"/></svg></template>
                        <template x-if="selectedService && selectedService.icon === 'package'"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg></template>
                        <template x-if="selectedService && selectedService.icon === 'shield'"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></template>
                    </div>
                    <div class="absolute -bottom-10 -left-10 text-[15vw] font-black text-industrial-black/5 select-none pointer-events-none uppercase" x-text="selectedService ? selectedService.title : ''"></div>
                </div>
                <div class="md:w-2/3 p-12">
                    <div class="micro-label mb-4 text-bfi-red">Detalhe do Serviço</div>
                    <h2 class="display-medium mb-6" x-text="selectedService ? selectedService.title : ''"></h2>
                    <p class="text-lg text-industrial-black/70 leading-relaxed mb-8" x-text="selectedService ? selectedService.detailedDescription : ''"></p>
                    <button 
                        @click="selectedService = null"
                        class="bg-industrial-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-bfi-red transition-all"
                    >
                        Fechar Detalhes
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Reach Section -->
    <section class="py-32 px-6 bg-white border-t border-industrial-black/5">
        <div class="max-w-screen-2xl mx-auto">
            <div id="about-reach" class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div class="lg:col-span-1">
                    <div class="micro-label mb-4 text-bfi-red">Setores que Servimos</div>
                    <h2 class="display-medium mb-6">Nosso <br /> Alcance</h2>
                    <p class="text-industrial-black/60 mb-8">
                        Desde componentes automóveis de alta segurança até dispositivos médicos estéreis, as nossas linhas de produção estão otimizadas para diversos padrões industriais.
                    </p>
                    <a href="<?php echo esc_url(home_url('/catalogo')); ?>" class="inline-block bg-industrial-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-bfi-red transition-all">
                        Ver Casos de Estudo
                    </a>
                </div>

                <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="relative aspect-square overflow-hidden group">
                        <img 
                            src="https://picsum.photos/seed/factory/800/800" 
                            alt="Facility" 
                            class="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-700"
                            referrerpolicy="no-referrer"
                        >
                        <div class="absolute inset-0 bg-bfi-red/20 mix-blend-multiply pointer-events-none"></div>
                        <div class="absolute bottom-6 left-6 text-white z-10">
                            <div class="micro-label text-white/80 mb-1">Instalações</div>
                            <div class="text-2xl font-black uppercase tracking-tighter">Fábrica de Braga</div>
                        </div>
                    </div>
                    <div class="aspect-square bg-industrial-black flex items-center justify-center p-8">
                        <p class="text-white text-xl font-light italic leading-relaxed text-center">
                            "Qualidade não é um ato, é um hábito."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 px-6 bg-industrial-gray">
        <div class="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
                <div class="micro-label mb-4 text-bfi-red">Entre em Contacto</div>
                <h2 class="display-medium mb-12">Vamos Construir <br /> Juntos</h2>
                
                <div class="space-y-8">
                    <div class="flex items-start gap-6">
                        <div class="w-12 h-12 bg-white flex items-center justify-center text-bfi-red shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <div>
                            <div class="micro-label mb-1">Localização</div>
                            <p class="text-lg font-bold mb-2">Rua Industrial de Braga, 4700-000 Braga, Portugal</p>
                            <a 
                                href="https://www.google.com/maps/search/?api=1&query=Rua+Industrial+de+Braga+Portugal" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="text-bfi-red font-black text-xs uppercase tracking-widest hover:text-industrial-black transition-colors"
                            >
                                Ver no Google Maps →
                            </a>
                        </div>
                    </div>

                    <div class="flex items-start gap-6">
                        <div class="w-12 h-12 bg-white flex items-center justify-center text-bfi-red shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        </div>
                        <div>
                            <div class="micro-label mb-1">Telefone</div>
                            <p class="text-lg font-bold">+351 253 000 000</p>
                            <p class="text-sm text-industrial-black/60">Segunda a Sexta: 08:00 - 18:00</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-6">
                        <div class="w-12 h-12 bg-white flex items-center justify-center text-bfi-red shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </div>
                        <div>
                            <div class="micro-label mb-1">Email</div>
                            <p class="text-lg font-bold">contacto@plasticosbueso.pt</p>
                            <p class="text-sm text-industrial-black/60">Geral e Orçamentos</p>
                        </div>
                    </div>
                </div>
            </div>

            <form class="bg-white p-12 shadow-xl border-t-8 border-bfi-red">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div class="space-y-2">
                        <label class="micro-label">Nome</label>
                        <input type="text" class="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors" placeholder="João">
                    </div>
                    <div class="space-y-2">
                        <label class="micro-label">Apelido</label>
                        <input type="text" class="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors" placeholder="Silva">
                    </div>
                </div>
                <div class="space-y-2 mb-8">
                    <label class="micro-label">Endereço de Email</label>
                    <input type="email" class="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors" placeholder="joao@exemplo.com">
                </div>
                <div class="space-y-2 mb-12">
                    <label class="micro-label">Mensagem</label>
                    <textarea class="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors min-h-[150px] resize-none" placeholder="Fale-nos sobre o seu projeto..."></textarea>
                </div>
                <button class="w-full bg-bfi-red text-white py-6 font-black text-sm uppercase tracking-widest hover:bg-industrial-black transition-all">
                    Enviar Mensagem
                </button>
            </form>
        </div>
    </section>
</main>

<?php get_footer(); ?>
