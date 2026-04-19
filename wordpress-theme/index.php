<?php
/**
 * The main template file
 */
get_header(); ?>

<main class="max-w-screen-2xl mx-auto px-6 py-20">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('mb-12'); ?>>
            <header class="mb-8">
                <h1 class="display-medium"><?php the_title(); ?></h1>
            </header>
            <div class="text-lg text-industrial-black/70 leading-relaxed">
                <?php the_content(); ?>
            </div>
        </article>
    <?php endwhile; else : ?>
        <p><?php _e('Desculpe, não foram encontrados posts.', 'plasticos-bueso'); ?></p>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
