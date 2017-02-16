<div class="mceTmpl">
    <div class="tf-embed-wrapper {{ data.builder && 'is-contact-form' }}" id="tf_{{ data.id }}">
        <div class="tf-content">
            <# if ( data.url ) { #>
                <div class="edit-link">Edit embed settings</div>
                <div class="tf-embed-wrapper__info">
                    <span class="tf-embed-wrapper__label">Url:</span>
                    <span class="tf-embed-wrapper__value">{{ data.url }}</span>
                </div>
                <div class="tf-embed-wrapper__info">
                    <span class="tf-embed-wrapper__label">Type:</span>
                    <span class="tf-embed-wrapper__value">{{ data.type }}</span>
                </div>
            <# } else if ( data.builder ) { #>
            <div class="edit-link">Edit form settings</div>
            <div class="tf-embed-wrapper__info">
                <span class="tf-embed-wrapper__label">Type:</span>
                <span class="tf-embed-wrapper__value">{{ data.type }}</span>
            </div>
            <# } else { #>
                <span>No URL provided.</span>
            <# } #>
        </div>
    </div>
    <style>
    .tf-embed-wrapper {
        background-color: #bae0e6;
        padding: 10px;
        overflow: hidden;
        color: #72a985;
        text-align: center;
        height: 60px;
        border: 1px solid #73bec8;
        border-radius: 4px;
    }
    .tf-embed-wrapper.is-contact-form {
        background-color: #f8ec9d;
        border-color: #f2db43;
    }
    .tf-embed-wrapper .edit-link {
        display: block;
        color: #333;
    }
    .tf-embed-wrapper a {
        border: 0;
        display: block;
        text-decoration: none;
        text-align: left;
    }
    .tf-embed-wrapper::before {
        width: 26px;
        height: 30px;
        content: '';
        display: inline-block;
        margin-right: 10px;
        background: url(<?php echo tf_plugin_url() . 'assets/images/attention.png' ?>) no-repeat left center/26px auto;
    }
    .tf-embed-wrapper .tf-content {
        display: inline-block;
        vertical-align: top;
        line-height: 30px;
    }
    .tf-embed-wrapper__info {
        display: inline-block;
        font-size: 11px;
        color: #444;
    }
    .tf-embed-wrapper__label {
        font-weight: bold;
    }
    .tf-embed-wrapper__value {

    }
    </style>
</div>
