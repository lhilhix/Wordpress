<?php 
/**
 * Template Name: Sobre Nós
 */
get_header(); ?>

<main class="max-w-screen-2xl mx-auto px-6 py-20">
    <header class="mb-24">
        <div class="micro-label mb-4 text-bfi-red">A Nossa História</div>
        <h1 class="display-large mb-8">Sobre a <br /> Plásticos Bueso</h1>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <p class="text-xl text-industrial-black/60 leading-relaxed">
                Há mais de três décadas que a Plásticos Bueso está na vanguarda da indústria de moldagem por injeção de plásticos em Portugal. Sediada no coração industrial de Braga, combinamos o artesanato tradicional com tecnologia futurista.
            </p>
            <p class="text-xl text-industrial-black/60 leading-relaxed">
                A nossa missão é simples: fornecer soluções de engenharia de precisão que capacitem os nossos parceiros globais a inovar e a ter sucesso. Não fabricamos apenas peças; construímos os componentes do futuro.
            </p>
        </div>
    </header>

    <!-- Vision & Values Grid -->
    <div class="bfi-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-32">
        <div class="bfi-grid-item bg-industrial-gray">
            <div class="text-bfi-red mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>
            </div>
            <h3 class="text-2xl font-black uppercase tracking-tighter mb-4">Herança</h3>
            <p class="text-sm text-industrial-black/60">Construída sobre mais de 35 anos de experiência técnica e valores familiares.</p>
        </div>
        <div class="bfi-grid-item bg-white">
            <div class="text-bfi-red mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
            </div>
            <h3 class="text-2xl font-black uppercase tracking-tighter mb-4">Qualidade</h3>
            <p class="text-sm text-industrial-black/60">Padrões ISO rigorosos e filosofia de fabricação com zero defeitos.</p>
        </div>
        <div class="bfi-grid-item bg-industrial-black text-white">
            <div class="text-bfi-red mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 class="text-2xl font-black uppercase tracking-tighter mb-4">Equipa</h3>
            <p class="text-sm text-white/60">Uma força de trabalho dedicada de mais de 150 engenheiros e especialistas de produção.</p>
        </div>
        <div class="bfi-grid-item bg-white">
            <div class="text-bfi-red mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 class="text-2xl font-black uppercase tracking-tighter mb-4">Global</h3>
            <p class="text-sm text-industrial-black/60">Exportação de componentes de precisão para líderes automóveis e médicos em todo o mundo.</p>
        </div>
    </div>

    <!-- Timeline Section -->
    <section class="mb-32">
        <div class="micro-label mb-12 text-bfi-red">O Nosso Percurso</div>
        <div class="space-y-12">
            <?php
            $milestones = [
                ["year" => "1985", "event" => "Fundada em Braga, Portugal, com uma única máquina de injeção."],
                ["year" => "1998", "event" => "Expansão para uma instalação de 2.000m² e obtenção da certificação ISO 9001."],
                ["year" => "2010", "event" => "Investimento em automação robótica de última geração e maquinaria de 1000 toneladas."],
                ["year" => "2023", "event" => "Atingido o estatuto de exportação global, servindo mais de 20 países em todo o mundo."],
            ];

            foreach ($milestones as $m) : ?>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 items-center border-b border-industrial-black/5 pb-12">
                    <div class="text-6xl font-black text-bfi-red tracking-tighter"><?php echo $m['year']; ?></div>
                    <div class="md:col-span-3 text-xl text-industrial-black/70 font-medium">
                        <?php echo $m['event']; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="mb-32">
        <div class="micro-label mb-12 text-bfi-red">FAQ / Perguntas Frequentes</div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-16">
            <div>
                <h3 class="text-xl font-black uppercase tracking-tighter mb-4 border-l-4 border-bfi-red pl-4">Quais são as vossas capacidades de produção?</h3>
                <p class="text-industrial-black/60 leading-relaxed">
                    Dispomos de um parque de máquinas de moldagem por injeção com forças de fecho de 50 a 1000 toneladas, permitindo-nos produzir desde micro-componentes técnicos a grandes peças estruturais com alta precisão.
                </p>
            </div>
            <div>
                <h3 class="text-xl font-black uppercase tracking-tighter mb-4 border-l-4 border-bfi-red pl-4">Que tipos de materiais plásticos processam?</h3>
                <p class="text-industrial-black/60 leading-relaxed">
                    Processamos uma vasta gama de polímeros de engenharia (ABS, PC, PA, POM, PBT), plásticos técnicos de alto desempenho, bem como materiais bio-baseados e reciclados para soluções sustentáveis.
                </p>
            </div>
            <div>
                <h3 class="text-xl font-black uppercase tracking-tighter mb-4 border-l-4 border-bfi-red pl-4">Quais são os vossos padrões de qualidade?</h3>
                <p class="text-industrial-black/60 leading-relaxed">
                    Somos certificados ISO 9001. O nosso controlo de qualidade inclui medição CMM tridimensional, inspeção óptica automatizada e análise SPC em tempo real para garantir defeito zero em toda a produção.
                </p>
            </div>
            <div>
                <h3 class="text-xl font-black uppercase tracking-tighter mb-4 border-l-4 border-bfi-red pl-4">Oferecem serviços de acabamento e montagem?</h3>
                <p class="text-industrial-black/60 leading-relaxed">
                    Sim, oferecemos soluções completas "chave na mão" incluindo cromagem, metalização, soldadura por ultrassons, tampografia e montagem de conjuntos técnicos complexos.
                </p>
            </div>
        </div>
    </section>

    <!-- Careers CTA -->
    <section class="mb-32">
        <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="relative aspect-video lg:aspect-auto overflow-hidden">
                <img 
                    src="https://picsum.photos/seed/team/1200/800" 
                    alt="Team" 
                    class="w-full h-full object-cover grayscale"
                    referrerpolicy="no-referrer"
                >
                <div class="absolute inset-0 bg-bfi-red/10 mix-blend-multiply"></div>
            </div>
            <div class="bg-bfi-red p-12 flex flex-col justify-center text-white">
                <h2 class="text-4xl font-black uppercase tracking-tighter mb-6">Junte-se à Nossa Missão</h2>
                <p class="text-white/80 mb-8 max-w-md">Estamos sempre à procura de indivíduos talentosos para se juntarem às nossas equipas de produção e engenharia em Braga.</p>
                <button @click="quoteModalOpen = true" class="self-start bg-white text-bfi-red px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-industrial-black hover:text-white transition-all">
                    Ver Carreiras
                </button>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
