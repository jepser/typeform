<?php

/*
Plugin Name: Typeform
Plugin URI:  http://typeform.com
Description: Build beautiful, interactive, mobile-ready forms, surveys, and questionnaires without code.
Version:     0.7.5
Author:      Typeform
Author URI:  http://typeform.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if (!defined('ABSPATH')) {
    die('Access denied.');
}

define('TYPEFORM_BASE', plugin_dir_url(__FILE__));

$files_to_includes = array(
    'typeform-widgets',
    'typeform-shortcodes',
    'typeform-actions',
    'typeform-vc'
);

foreach ($files_to_includes as $file) {
    include_once($file . '.php');
}
