<?php

class TypeformShortcode {
    static function renderTypeform($attrs)
    {
        $options = self::extractOptions($attrs);

        wp_enqueue_script('typeform/embed');
        
        if($options->style === 'button') {
            wp_enqueue_style('typeform/embed/button');
        }

        $template = self::renderTemplate($options);

        return $template;

    }
    static function extractOptions($attrs)
    {
        $options = shortcode_atts(array(
            'url'       => '',
            'height'    => '500px',
            'width'     => '100%',
            'type'      => 'embed',
            'style'     => '',
            'builder'   => '',
            'button_text'   => __('Launch me!', 'typeform')
        ), $attrs);

        if (!self::isValidValue($options['height'])) {
            $options['height'] = (string) $options['height'] . 'px';
        }

        if (!self::isValidValue($options['width'])) {
            $options['width'] = (string) $options['width'] . 'px';
        }

        $options['url'] = apply_filters('typeform_embed_url', $options['url'], $options['builder']);

        return (object) $options;
    }

    static function isValidValue($value)
    {
        return strpos($value, '%') || strpos($value, 'px');
    }

    static function isEmbed($type) 
    {
        return !in_array($type, array('classic', 'popup', 'drawer'));
    }

    static function renderTemplate($options)
    {

        $templateToRender = !self::isEmbed($options->type)
            ? 'parts/typeform-popup.php'
            : 'parts/typeform-embed.php';

        ob_start();
        extract((array) $options);
        include($templateToRender);
        $template = ob_get_contents();
        @ob_end_clean();

        return $template;
    }
}

add_shortcode('typeform_embed', 'TypeformShortCode::renderTypeform');
