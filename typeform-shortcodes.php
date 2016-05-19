<?php

add_shortcode('typeform_embed', 'tf_embed_iframe');

function tf_embed_iframe($atts){
	extract( shortcode_atts( array(
        'url' 		=> '',
        'height'	=> '500px',
        'width'		=> '100%',
        'type'      => 'embed',
        'style'     => '',
        'button_text'   => __('Launch me!', 'typeform')
    ), $atts ) );

	//if string doesn't contain units
    if (strpos($height,'%') === false && strpos($height,'px') === false) {
	   $height = (string) $height . 'px';
	}

	if (strpos($width,'%') === false && strpos($width,'px') === false) {
	    $width = (string) $width . 'px';
	}

    $id = uniqid();

	ob_start();

    // display form
    include('parts/typeform_embed.php');

    // we get the form
    $html = ob_get_contents();
    @ob_end_clean();

    //Returns output buffer
    return $html;
}
