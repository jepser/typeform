<?php

add_action( 'vc_before_init', 'tf_embed_vc' );

function tf_embed_vc() {
	vc_map( 
		array(
			"name" => __( "Typeform", "typeform" ),
			"base" => "typeform_embed",
			"icon" => TYPEFORM_BASE . "assets/images/tf-vc.jpg",
			"category" => __( "Content", "typeform"),
			"description"	=> __("Embed beautiful forms and surveys", "typeform"),
			"params" => array(
				array(
					"type" => "textfield",
					"class" => "",
					"heading" => __( "Typeform URL", "typeform" ),
					"param_name" => "url",
					"admin_label"	=> true,
					"description" => __( "Your typeform's url found in Share section.", "typeform" )
				),
				array(
					"type"		=> "dropdown",
					"heading"	=> __("Embed Type", "typeform"),
					"admin_label"	=> true,
					"value"		=> array(
						__("Embed", "typeform")		=> "embed",
						__("Classic", "typeform")	=> "classic",
						__("Drawer", "typeform")	=> "drawer"	
					),
					"param_name"	=> "type"
				),
				array(
					"type" 			=> "textfield",
					"class" 		=> "",
					"heading" 		=> __( "Width", "typeform" ),
					"param_name" 	=> "width",
					"dependency"	=> array(
						"element"	=> "type",
						"value"		=> array("embed")
					)
				),
				array(
					"type" => "textfield",
					"class" => "",
					"heading" => __( "Height", "typeform" ),
					"param_name" => "height",
					"value"			=> "500px",
					"dependency"	=> array(
						"element"	=> "type",
						"value"		=> array("embed")
					)
				),
				array(
					"type"		=> "dropdown",
					"heading"	=> __("Link style", "typeform"),
					"value"	=> array(
						__("Link", "typeform")		=> "link",
						__("Button", "typeform")	=> "button"
					),
					"param_name"	=> "style",
					"dependency"	=> array(
						"element"	=> "type",
						"value"		=> array("classic", "drawer")
					)
				),
				array(
					"type" => "textfield",
					"class" => "",
					"heading" => __( "Button Text", "typeform" ),
					"param_name" => "button_text",
					"dependency"	=> array(
						"element"	=> "type",
						"value"		=> array("classic", "drawer")
					)
				)
			)
		) 
	);
}
