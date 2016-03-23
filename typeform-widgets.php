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
		$type = ($instance['type']) ? $instance['type']: 'embed';
		$style = $instance['style'];
		$button_text = $instance['button_text'];

		// before and after widget arguments are defined by themes
		echo $args['before_widget'];
		if ( ! empty( $title ) )
		echo $args['before_title'] . $title . $args['after_title'];

		// This is where you run the code and display the output
		$shortcode_build = '[typeform_embed url="' . $url . '"';

		$shortcode_build .= ' type="' . $type . '"';
		if($type == 'embed'){
			if($width){
				$shortcode_build .= ' width="' . $width . '"';
			}
			if($height){
				$shortcode_build .= ' height="' . $height . '"';
			}
		} else {
			if($style){
				$shortcode_build .= ' style="' . $style . '"';
			}
			if($button_text){
				$shortcode_build .= ' button_text="' . $button_text . '"';
			}
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
		if ( isset( $instance[ 'type' ] ) ) {
			$type = $instance[ 'type' ];
		}
		if ( isset( $instance[ 'style' ] ) ) {
			$style = $instance[ 'style' ];
		}
		if ( isset( $instance[ 'button_text' ] ) ) {
			$button_text = $instance[ 'button_text' ];
		}

		$type_options = array(
			'embed'	=> __('Embed', 'typeform'),
			'classic'	=> __('Popup', 'typeform'),
			'drawer'	=> __('Drawer', 'typeform')
		);
		$style_options = array(
			'link'	=> __('Link', 'typeform'),
			'button'	=> __('Button', 'typeform')
		);
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
		<label for="<?php echo $this->get_field_id( 'type' ); ?>"><?php _e( 'Type:', 'typeform' ); ?></label> 
		<select id="<?php echo $this->get_field_id( 'type' ); ?>" name="<?php echo $this->get_field_name( 'type' ); ?>">
			<?php foreach($type_options as $key => $option){ ?>
			<option value="<?php echo $key; ?>" <?php echo ($key == $type) ? 'selected': ''; ?>><?php echo $option; ?></option>
			<?php } ?>
		</select>
		</p>
		<div id="embed-options">
			<p>
			<label for="<?php echo $this->get_field_id( 'height' ); ?>"><?php _e( 'Height:', 'typeform' ); ?></label> 
			<input class="widefat" id="<?php echo $this->get_field_id( 'height' ); ?>" name="<?php echo $this->get_field_name( 'height' ); ?>" type="text" value="<?php echo esc_attr( $height ); ?>" />
			</p>
			<p>
			<label for="<?php echo $this->get_field_id( 'width' ); ?>"><?php _e( 'Width:', 'typeform' ); ?></label> 
			<input class="widefat" id="<?php echo $this->get_field_id( 'width' ); ?>" name="<?php echo $this->get_field_name( 'width' ); ?>" type="text" value="<?php echo esc_attr( $width ); ?>" />
			</p>
		</div>
		<div id="link-options">
			<p>
			<label for="<?php echo $this->get_field_id( 'style' ); ?>"><?php _e( 'Style:', 'typeform' ); ?></label> 
			<select id="<?php echo $this->get_field_id( 'style' ); ?>" name="<?php echo $this->get_field_name( 'style' ); ?>">
				<?php foreach($style_options as $key => $option){ ?>
				<option value="<?php echo $key; ?>" <?php echo ($key == $style) ? 'selected': ''; ?>><?php echo $option; ?></option>
				<?php } ?>
			</select>
			</p>
			<p>
			<label for="<?php echo $this->get_field_id( 'button_text' ); ?>"><?php _e( 'Button Text:', 'typeform' ); ?></label> 
			<input class="widefat" id="<?php echo $this->get_field_id( 'button_text' ); ?>" name="<?php echo $this->get_field_name( 'button_text' ); ?>" type="text" value="<?php echo esc_attr( $button_text ); ?>" />
			</p>
		</div>
		<script>
		jQuery(function($){
			$("#<?php echo $this->get_field_id( 'type' ); ?>").on('change', function(){
				var type = $(this).val()
				if(type != 'embed'){
					console.log($('#embed-options'), 'embed')
					$('#embed-options *').hide()
					$('#link-options *').show()
				} else {
					console.log($('#link-options'), 'link')
					$('#embed-options *').show()
					$('#link-options *').hide()
				}
			}).trigger('change')
		})
		</script>
	<?php 
	}
	
	// Updating widget replacing old instances with new
	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? strip_tags( $new_instance['title'] ) : '';
		$instance['url'] = ( ! empty( $new_instance['url'] ) ) ? strip_tags( $new_instance['url'] ) : '';
		$instance['height'] = ( ! empty( $new_instance['height'] ) ) ? strip_tags( $new_instance['height'] ) : '';
		$instance['width'] = ( ! empty( $new_instance['width'] ) ) ? strip_tags( $new_instance['width'] ) : '';
		$instance['type'] = ( ! empty( $new_instance['type'] ) ) ? strip_tags( $new_instance['type'] ) : '';
		$instance['style'] = ( ! empty( $new_instance['style'] ) ) ? strip_tags( $new_instance['style'] ) : '';
		$instance['button_text'] = ( ! empty( $new_instance['button_text'] ) ) ? strip_tags( $new_instance['button_text'] ) : '';
		return $instance;
	}
} // Class wpb_widget ends here
