<!DOCTYPE html>
<html <?php language_attributes(); ?> x-data="{ mobileMenuOpen: false }">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap');
        .display-large { font-size: clamp(2.5rem, 8vw, 8rem); font-weight: 900; line-height: 0.85; letter-spacing: -0.05em; text-transform: uppercase; }
        .display-medium { font-size: clamp(1.5rem, 4vw, 3.5rem); font-weight: 800; line-height: 0.9; letter-spacing: -0.02em; text-transform: uppercase; }
        .micro-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(10, 10, 10, 0.5); }
    </style>
</head>
<body <?php body_class('bg-white text-industrial-black'); ?>>
    <?php wp_body_open(); ?>

    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-industrial-black/5 px-6 py-4">
        <div class="max-w-screen-2xl mx-auto flex justify-between items-center">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2 group">
                <div class="w-10 h-10 bg-bfi-red flex items-center justify-center text-white font-black text-2xl group-hover:scale-105 transition-transform">
                    B
                </div>
                <span class="font-black text-2xl tracking-tighter uppercase">
                    Plásticos Bueso
                </span>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden lg:flex items-center gap-12">
                <div class="flex gap-8">
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="micro-label hover:text-bfi-red transition-colors">Início</a>
                    <a href="<?php echo esc_url(home_url('/catalogo')); ?>" class="micro-label hover:text-bfi-red transition-colors">Catálogo</a>
                    <a href="<?php echo esc_url(home_url('/#services')); ?>" class="micro-label hover:text-bfi-red transition-colors">Serviços</a>
                    <a href="<?php echo esc_url(home_url('/about')); ?>" class="micro-label hover:text-bfi-red transition-colors">Sobre Nós</a>
                    <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="micro-label hover:text-bfi-red transition-colors">Contacto</a>
                </div>
                <button class="bg-bfi-red text-white px-6 py-2 font-bold text-xs uppercase tracking-widest hover:bg-industrial-black transition-colors">
                    Pedir Orçamento
                </button>
            </div>

            <!-- Mobile Menu Toggle -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="lg:hidden p-2">
                <svg x-show="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                <svg x-show="mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>

        <!-- Mobile Menu Overlay -->
        <div x-show="mobileMenuOpen" 
             x-transition:enter="transition ease-out duration-300"
             x-transition:enter-start="opacity-0 -translate-y-4"
             x-transition:enter-end="opacity-100 translate-y-0"
             class="lg:hidden absolute top-full left-0 w-full bg-white border-b border-industrial-black/10 p-8 flex flex-col gap-8 shadow-2xl"
             @click.away="mobileMenuOpen = false">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="micro-label text-lg">Início</a>
            <a href="<?php echo esc_url(home_url('/catalogo')); ?>" class="micro-label text-lg">Catálogo</a>
            <a href="<?php echo esc_url(home_url('/#services')); ?>" class="micro-label text-lg">Serviços</a>
            <a href="<?php echo esc_url(home_url('/about')); ?>" class="micro-label text-lg">Sobre Nós</a>
            <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="micro-label text-lg">Contacto</a>
            <button class="bg-bfi-red text-white px-6 py-4 font-bold text-sm uppercase tracking-widest">
                Pedir Orçamento
            </button>
        </div>
    </nav>
