<?php
/**
 *
 *  @wordpress-plugin
 *  Plugin Name: Highlight Div ID
 *  Description: Help expose div IDs by highlighting them on the page.
 *  Version:     1.0
 */
defined( 'ABSPATH' ) || exit;

define( 'highlight_div_url', plugin_dir_url( __FILE__ ) );
define( 'highlight_div_path', plugin_dir_path( __FILE__ ) );
define( 'highlight_div_plugin', plugin_basename( __FILE__ ) );

add_action('wp_enqueue_scripts', 'display_div_id_scripts_styles');
function display_div_id_scripts_styles() { 
    wp_enqueue_script( 'highlight_div', highlight_div_url . 'highlight-div-id.js', array());
    wp_enqueue_style( 'highlight_div', highlight_div_url . 'highlight-div-id.css', array());
} 


add_shortcode( 'display_div_id', 'display_div_id_toggle' );
function display_div_id_toggle( $args = array() ) {
    

    if (isset($args['excludeselector'])) {
        $excludeSelector = $args['excludeselector'];
    } else {
        $excludeSelector = '';
    }
    $excludeSelector = str_replace("'", "", $excludeSelector);
    
    ob_start();

    ?>
    <div class="highlight-div-toggle-switch">
        <label class="switch">
            <input type="checkbox">
            <span class="slider round" onclick="toggleDisplayDivIDs('<?php echo $excludeSelector; ?>');"></span>
        </label>
        <span>Click to toggle DIV IDs</span>
    </div>
    <?php

    
    $html = ob_get_contents();
    ob_end_clean();
    return $html;


}