<div class="mceTmpl">
    <div class="tf-embed-wrapper" id="tf_{{ data.id }}">
        <div class="tf-content">
            <!-- <span class="title">Edit this typeform</span> -->
            <# if ( data.url ) { #>
                <a href="{{ data.url }}" class="link dtbaker_button_light">Edit embed settings</a>
            <# } else { #>
                <span>No URL provided.</span>
            <# } #>
        </div>
    </div>
    <style>
    .tf-embed-wrapper{
        background-color: #BAE0E6;
        padding: 20px;
        overflow: hidden;
        color: #72A985;
        text-align: center;
        height: 30px;
        border: 1px solid #73BEC8;
    }
    .tf-embed-wrapper a{
        border: 0;
    }
    .tf-embed-wrapper::before{
        width: 26px;
        height: 30px;
        content: '';
        display: inline-block;
        margin-right: 10px;
        background: url(<?php echo tf_plugin_url() . 'assets/images/attention.png' ?>) no-repeat left top/26px auto;
    }
    .tf-embed-wrapper .tf-content{
        display: inline-block;
        vertical-align: top;
        line-height: 30px;
    }
    </style>
</div>
