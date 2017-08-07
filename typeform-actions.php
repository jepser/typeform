<?php

const TYPEFORM_TEMPLATE_URL = 'https://template.typeform.com/to/Bmx0OB';

function tf_plugin_url()
{
    return plugin_dir_url(__FILE__);
}
add_action('admin_enqueue_scripts', 'tf_add_admin_scripts');

function tf_add_admin_scripts($hook)
{
    $register_pages = array('post.php', 'post-new.php');
    if (!in_array($hook, $register_pages)) {
        return;
    }

    $current_user = wp_get_current_user();
    $current_user_email = $current_user->user_email;
    $plugin_root_url  = tf_plugin_url();

    $typeformObject = array(
        'pluginRoot'    => $plugin_root_url,
        'userEmail'     => $current_user_email
    );

    wp_register_script('tf_tinymce', tf_plugin_url() . 'assets/js/typeform-tinymce.js', array());
    wp_localize_script('tf_tinymce', 'typeformObject', $typeformObject);
    wp_enqueue_script('tf_tinymce');
    wp_enqueue_style('tf_css', tf_plugin_url() . 'assets/css/main.css');
}

// Register and load the widget
add_action('widgets_init', 'tf_load_widget');

function tf_load_widget()
{
    register_widget('typeform_embed_widget');
}

//add media button
add_action('media_buttons', 'tf_add_media_button');

function tf_add_media_button()
{
    echo '<a href="#" id="add-typeform" class="button"><span></span>' . __(' Add typeform', 'typeform') . '</a>';
}

add_action('admin_print_footer_scripts', 'hidden_shortcode_html');

function hidden_shortcode_html()
{
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

function tc_print_media_template()
{
    ?>
    <script type="text/html" id="tmpl-editor-tf-banner">
        <?php include('parts/backend-shortcode.php'); ?>
    </script>
    <?php
}

add_filter('typeform_embed_url', 'tf_add_query_url');

function tf_add_query_url($url)
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

add_filter('typeform_embed_url', 'tf_builder_template', 5, 2);

function tf_builder_template($url, $builder)
{
    return ($builder !== '') ? TYPEFORM_TEMPLATE_URL . '?' . $builder : $url;
}
