<?php
/**
 * Hgod_wp_env
 *
 * WordPress Dev Environment for plugins and themes
 *
 * @wordpress-plugin
 * Plugin Name:  My-Plugin
 * Plugin URI:   https://myurl.com
 * Description:  The description of my awesome plugin
 * Version:      0.1.0
 * Author:       Fulano de Tal
 * Author URI:   https://fulanodetal.com/
 * Text Domain:  my_plugin
 * Prefix:       my_plugin_
 *
 * @package Hgod_wp_env
 * @author hgodinho <hnrq.godinho@gmail.com>
 */

/**
 * Principal class of plugin or theme
 */
class My_Class {

	/**
	 * Instance
	 *
	 * @var object
	 */
	private static $_instance;

	/**
	 * Returns class instance
	 *
	 * @return class $instance
	 */
	public static function get_instance() {
		if ( null === self::$_instance ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Construct
	 */
	public function __construct() {

	}
}

My_Class::get_instance();
