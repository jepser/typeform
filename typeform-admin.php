<?php 
add_action('admin_enqueue_scripts', 'tfEnqueueScripts');
function tfEnqueueScripts($hook)
{
    $register_pages = array('post.php', 'post-new.php');
    if (!in_array($hook, $register_pages)) {
        return;
    }

    wp_register_script('typeform/tinymce', TYPEFORM_EMBED_PLUGIN_URL . 'assets/js/typeform-tinymce.js', array());
    wp_localize_script('typeform/tinymce', 'typeformObject', getJsObject());
    wp_enqueue_script('typeform/tinymce');

    wp_enqueue_style('typeform/css', TYPEFORM_EMBED_PLUGIN_URL . 'assets/css/main.css');
}

add_action('admin_enqueue_scripts', 'typeformRenderTemplate');
function typeformRenderTemplate()
{
    ?>
    <script type="text/html" id="tmpl-editor-tf-banner">
        <?php include('parts/backend-shortcode.php'); ?>
    </script>
    <?php
}

//add media button
add_action('media_buttons', 'addTypeformButton');

function addTypeformButton()
{
    $buttonText = __(' Add typeform', 'typeform');
    echo "<a href='#' id='add-typeform' class='button'><span></span>$buttonText</a>";
}

add_action('admin_print_footer_scripts', 'hiddenShortcodeTemplate');

function hiddenShortcodeTemplate()
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

function getJsObject()
{
    $current_user = wp_get_current_user();
    $current_user_email = $current_user->user_email;
    $plugin_root_url  = TYPEFORM_EMBED_PLUGIN_URL;

    $data = array(
        'pluginRoot'    => $plugin_root_url,
        'userEmail'     => $current_user_email
    );

    return $data;
}
