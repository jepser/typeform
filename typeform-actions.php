<?php

add_action('admin_enqueue_scripts', 'tf_add_admin_scripts');

function tf_add_admin_scripts(){
	wp_enqueue_script( 'tf_js', plugin_dir_url( __FILE__ ) . 'assets/js/typeform.js' );
}

add_action( 'init', 'tf_register_tinymce_button' );

function tf_register_tinymce_button() {
    add_filter( "mce_external_plugins", "tf_add_buttons" );
    add_filter( 'mce_buttons', 'tf_register_buttons' );
}

function tf_add_buttons( $plugin_array ) {
    $plugin_array['typeform_embed'] = plugins_url( '/assets/js/typeform-tinymce.js',__FILE__ );
    return $plugin_array;
}

function tf_register_buttons( $buttons ) {
    array_push( $buttons, 'typeform_embed' );
    return $buttons;
}

// Register and load the widget
function tf_load_widget() {
	register_widget( 'typeform_embed_widget' );
}
add_action( 'widgets_init', 'tf_load_widget' );