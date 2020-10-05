<?php
/**
 * My Plugin
 *
 * Plugin.
 *
 * @wordpress-plugin
 * Plugin Name: my-plugin
 * Description: Description of your plugin
 * Version: 0.1.0
 * Author:
 * Author URI:
 * Text Domain:
 *
 * @package My_package
 * @author  Name Surname <myemail@domain.com>
 * @license MIT
 */

/**
 * Principal class of plugin or theme
 */
class My_Class {

	/**
	 * Instância
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
