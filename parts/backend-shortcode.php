<div class="mceTmpl">
    <div class="tf-embed-wrapper" id="tf_{{ data.id }}">
        <div class="tf-content">
            <# if ( data.url ) { #>
                <a href="{{ data.url }}" class="link dtbaker_button_light">Edit embed settings</a>
                <div class="tf-embed-wrapper__info">
                    <span class="tf-embed-wrapper__label">Url:</span>
                    <span class="tf-embed-wrapper__value">{{ data.url }}</span>
                </div>
                <div class="tf-embed-wrapper__info">
                    <span class="tf-embed-wrapper__label">Type:</span>
                    <span class="tf-embed-wrapper__value">{{ data.type }}</span>
                </div>
            <# } else { #>
                <span>No URL provided.</span>
            <# } #>
        </div>
    </div>
</div>
