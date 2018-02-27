<?php
    $style = ($style) ? $style: 'link';
	$type = ($type == 'drawer') ? 2: 1;
    $button = ($button_text) ? $button_text: __('Launch me!', 'typeform');
?>
<a
    class="typeform-share <?= $style; ?>"
    href="<?= $url; ?>"
    data-mode="<?= $type; ?>"
    target="_blank"
>
    <?= $button; ?>
</a>
