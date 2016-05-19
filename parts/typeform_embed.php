<?php 

	/*
	Shortcode template [typeform_embed]
	*/

	if (!defined('ABSPATH')) {
	    die('Access denied.');
	}

	$url = apply_filters('typeform_embed_url', $url);

	if(in_array($type, array('classic', 'drawer'))){

		$style = ($style) ? $style: 'link';
		$type = ($type == 'drawer') ? 2: 1;
		$button = ($button_text) ? $button_text: __('Launch me!', 'typeform');

	?>
		<a class="typeform-share <?php echo $style; ?>" href="<?php echo $url; ?>" data-mode="<?php echo $type; ?>" target="_blank"><?php echo $button; ?></a>
	<?php
	} else {
	?>
	<style>
		#tf-embed-<?php echo $id; ?>{
			max-height: inherit;
			max-width: inherit;
			<?php 
				echo ($height) ? 'height:' . $height .  ';' : ''; 
				echo ($width) ? 'width:' . $width . ';' : ''; 
			?>
		}
	</style>
	<iframe id="tf-embed-<?php echo $id; ?>" src="<?php echo $url; ?>" frameborder="0"></iframe>
	<script>
		document.onLoad = function(){
			document.getElementById('<?php echo "#tf-embed-" . $id; ?>').contentWindow.focus()
		}
	</script>
<?php
	}
?>
<?php if($style): ?>
	<?php if($style == 'button'): ?>
		<script>(function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}id=id+'_';if(!gi.call(d,id)){qs=ce.call(d,'link');qs.rel='stylesheet';qs.id=id;qs.href=b+'share-button.css';s=gt.call(d,'head')[0];s.appendChild(qs,s)}})()</script>
	<?php else: ?>
		<script>(function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'share.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}})()</script>
	<?php endif;; ?>
<?php endif; ?>
