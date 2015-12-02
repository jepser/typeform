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