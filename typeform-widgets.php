<?php
// Creating the widget 
class typeform_embed_widget extends WP_Widget {

function __construct() {
	parent::__construct(
		// Base ID of your widget
		'typeform_embed', 

		// Widget name will appear in UI
		__('Typeform Embed Widget', 'typeform'), 

		// Widget description
		array( 'description' => __( 'Embed a form in a widget.', 'typeform' ), ) 
		);
	}

	// Creating widget front-end
	// This is where the action happens
	public function widget( $args, $instance ) {
		
		$title = apply_filters( 'widget_title', $instance['title'] );
		$url = $instance['url'];
		$width = $instance['width'];
		$height = $instance['height'];

		// before and after widget arguments are defined by themes
		echo $args['before_widget'];
		if ( ! empty( $title ) )
		echo $args['before_title'] . $title . $args['after_title'];

		// This is where you run the code and display the output
		$shortcode_build = '[typeform_embed url="' . $url . '"';

		if($width){
			$shortcode_build .= ' width="' . $width . '"';
		}

		if($height){
			$shortcode_build .= ' height="' . $height . '"';
		}
		$shortcode_build .= ']';

		echo do_shortcode($shortcode_build);
		echo $args['after_widget'];
	}
		
	// Widget Backend 
	public function form( $instance ) {
		if ( isset( $instance[ 'title' ] ) ) {
			$title = $instance[ 'title' ];
		}
		if ( isset( $instance[ 'url' ] ) ) {
			$url = $instance[ 'url' ];
		}
		if ( isset( $instance[ 'width' ] ) ) {
			$width = $instance[ 'width' ];
		}
		if ( isset( $instance[ 'height' ] ) ) {
			$height = $instance[ 'height' ];
		}
		// Widget admin form
		?>
		<p>
		<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:', 'typeform' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
		<label for="<?php echo $this->get_field_id( 'url' ); ?>"><?php _e( 'URL:', 'typeform' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'url' ); ?>" name="<?php echo $this->get_field_name( 'url' ); ?>" type="text" value="<?php echo esc_attr( $url ); ?>" />
		</p>
		<p>
		<label for="<?php echo $this->get_field_id( 'height' ); ?>"><?php _e( 'Height:', 'typeform' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'height' ); ?>" name="<?php echo $this->get_field_name( 'height' ); ?>" type="text" value="<?php echo esc_attr( $height ); ?>" />
		</p>
		<p>
		<label for="<?php echo $this->get_field_id( 'width' ); ?>"><?php _e( 'Width:', 'typeform' ); ?></label> 
		<input class="widefat" id="<?php echo $this->get_field_id( 'width' ); ?>" name="<?php echo $this->get_field_name( 'width' ); ?>" type="text" value="<?php echo esc_attr( $width ); ?>" />
		</p>
	<?php 
	}
	
	// Updating widget replacing old instances with new
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
		$instance['url'] = ( ! empty( $new_instance['url'] ) ) ? strip_tags( $new_instance['url'] ) : '';
		$instance['height'] = ( ! empty( $new_instance['height'] ) ) ? strip_tags( $new_instance['height'] ) : '';
		$instance['width'] = ( ! empty( $new_instance['width'] ) ) ? strip_tags( $new_instance['width'] ) : '';
		return $instance;
	}
} // Class wpb_widget ends here
