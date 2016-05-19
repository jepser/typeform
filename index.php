<?php 

/*
Plugin Name: Typeform 
Plugin URI:  http://typeform.com
Description: Official plugin for WordPress
Version:     0.6
Author:      Typeform
Author URI:  http://typeform.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

if (!defined('ABSPATH')) {
    die('Access denied.');
}

define('TYPEFORM_BASE', plugin_dir_url( __FILE__ ));

$files_to_includes = array(
	'typeform-helpers',
	'typeform-widgets',
	'typeform-shortcodes',
	'typeform-actions',
	'typeform-vc'
);

foreach($files_to_includes as $file){
	include_once( $file . '.php');
}
