<?php 

/*
Plugin Name: Typeform 
Plugin URI:  http://typeform.com
Description: Official plugin for WordPress
Version:     0.2
Author:      Typeform
Author URI:  http://typeform.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if (!defined('ABSPATH')) {
    die('Access denied.');
}

include_once('typeform-widgets.php');
include_once('typeform-shortcodes.php');
include_once('typeform-actions.php');
