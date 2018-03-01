<?php

function typeformAddEmbedScripts()
{
    wp_register_script('typeform/embed', 'https://embed.typeform.com/embed.js', [], false, true);
    wp_register_style('typeform/embed/button', 'https://embed.typeform.com/share-button.css', [], false);
}
add_action('wp_enqueue_scripts', 'typeformAddEmbedScripts');


function typeformLoadWidget()
{
    register_widget('typeform_embed_widget');
}
add_action('widgets_init', 'typeformLoadWidget');

function typeformAddQueryUrl($url)
{
    if (!isset($_GET) || empty($_GET)) {
        return $url;
    }

    $ignore = array("preview_id", "preview_nonce", "post_format", "_thumbnail_id", "preview");
    $params = array_filter($_GET, function ($k) use ($ignore) {
        return !in_array($k, $ignore, true);
    }, ARRAY_FILTER_USE_KEY);
    $query = http_build_query($params);

    $separator = strlen($query) ? strpos($url, '?') === false ? '?' : '&' : '';

    return sprintf("%s%s%s", $url, $separator, $query);
}
add_filter('typeform_embed_url', 'typeformAddQueryUrl');

function typeformBuilderTemplate($url, $builder)
{
    return ($builder !== '') ? TYPEFORM_TEMPLATE_URL . '?' . $builder : $url;
}
add_filter('typeform_embed_url', 'typeformBuilderTemplate', 5, 2);
