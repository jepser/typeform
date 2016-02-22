jQuery(function ($) {
  // if (wp.media) {
  var shortcode_string = 'typeform_embed'
  if (!wp.mce) return
  wp.mce.typeform_render = {
    shortcode_data: {},
    template: wp.media.template('editor-tf-banner'),
    getContent: function () {
      var options = this.shortcode.attrs.named
      options['innercontent'] = this.shortcode.content
      return this.template(options)
    },
    View: {
      template: wp.media.template('editor-tf-banner'),
      postID: $('#post_ID').val(),
      initialize: function (options) {
        console.log(options)
        this.shortcode = options.shortcode
        typeform_render.shortcode_data = this.shortcode
      },
      getHtml: function () {
        var options = this.shortcode.attrs.named
        return this.template(options)
      }
    },
    edit: function (node) {
      var attrs = this.shortcode.attrs.named
      this.popupwindow(attrs)
    },
    popupwindow: function (values) {
      open_media_window(values)
    }
  }
  wp.mce.views.register(shortcode_string, wp.mce.typeform_render)

  $('#add-typeform').click(open_media_window)

  function open_media_window (values) {
    if (!values) {
      values = {}
    }
    // console.log(wp.mce)
    tinymce.activeEditor.windowManager.open({
      title: 'Add a typeform',
      body: [
        {
          type: 'textbox',
          name: 'tf_url',
          label: 'Typeform URL',
          value: values['url']
        },
        {
          type: 'textbox',
          name: 'tf_width',
          label: 'Width (optional)',
          value: values['width']
        },
        {
          type: 'textbox',
          name: 'tf_height',
          label: 'Height (optional)',
          value: values['height']
        }
      ],
      onsubmit: function (e) {
        // Insert content when the window form is submitted
        var shortcode = '[typeform_embed '

        shortcode += 'url="' + e.data.tf_url + '"'
        if (e.data.tf_width) {
          shortcode += ' width="' + e.data.tf_width + '"'
        }
        if (e.data.tf_height) {
          shortcode += ' height="' + e.data.tf_height + '"'
        }
        shortcode += ']'
        tinymce.activeEditor.insertContent(shortcode)
      }
    })
  } // open_media_window
// } // wp.media
})
