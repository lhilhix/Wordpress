<?php
/**
 * Plásticos Bueso Theme Functions
 */

function plasticos_bueso_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Menu Principal', 'plasticos-bueso'),
    ));
}
add_action('after_setup_theme', 'plasticos_bueso_setup');

function plasticos_bueso_scripts() {
    wp_enqueue_style('plasticos-bueso-style', get_stylesheet_uri());
    
    // Enqueue Tailwind Play CDN
    wp_enqueue_script('tailwind-cdn', 'https://cdn.tailwindcss.com', array(), null, false);
    
    // Enqueue Alpine.js for Modals and Interactivity
    wp_enqueue_script('alpinejs', 'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js', array(), null, true);
    ?>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'bfi-red': '#FF0044',
                        'industrial-black': '#0A0A0A',
                        'industrial-gray': '#F5F5F5',
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <?php
}
add_action('wp_enqueue_scripts', 'plasticos_bueso_scripts');

// Custom Walker for BFI styles in the menu
class Bueso_Nav_Walker extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

        $output .= '<a href="' . esc_url($item->url) . '" class="micro-label hover:text-bfi-red transition-colors">' . esc_html($item->title) . '</a>';
    }
}
