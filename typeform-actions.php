<?php

function tf_plugin_url(){
    return plugin_dir_url( __FILE__ );
}
add_action('admin_enqueue_scripts', 'tf_add_admin_scripts');

function tf_add_admin_scripts($hook){
    $register_pages = array('post.php', 'post-new.php');
    if(!in_array($hook, $register_pages)){
        return;
    }
	wp_enqueue_script( 'tf_js', plugin_dir_url( __FILE__ ) . 'assets/js/typeform.js' );
    wp_enqueue_script( 'tf_tinymce', plugin_dir_url( __FILE__ ) . 'assets/js/typeform-tinymce.js' );

	wp_enqueue_style('tf_css', plugin_dir_url( __FILE__ ) . 'assets/css/main.css' );
}

// Register and load the widget
add_action( 'widgets_init', 'tf_load_widget' );

function tf_load_widget() {
	register_widget( 'typeform_embed_widget' );
}

//add media button
add_action('media_buttons', 'tf_add_media_button');

function tf_add_media_button() {
    echo '<a href="#" id="add-typeform" class="button"><span></span>' . __(' Add typeform', 'typeform') . '</a>';
}

add_action('admin_print_footer_scripts', 'hidden_shortcode_html');

function hidden_shortcode_html(){
    ?>
    <div class="tf-embed-wrapper" id="" style="display:none">
            <div class="tf-content">
                <span class="title"><?php _e('Edit your typeform', 'typeform'); ?></span>
                <a href="#" class="link" target="_blank"><?php _e('Placeholder', 'typeform'); ?></a>
            </div>
        </div>
    <?php
}
add_action('admin_enqueue_scripts', 'tc_print_media_template');

function tc_print_media_template(){
    ?>
    <script type="text/html" id="tmpl-editor-tf-banner">
        <?php include('parts/backend-shortcode.php'); ?>
    </script>
    <?php
}

add_filter('typeform_embed_url', 'tf_add_query_url');

function tf_add_query_url($url){
    return (isset($_GET) && !empty($_GET)) ? $url . '?' . http_build_query($_GET) : $url;
}

