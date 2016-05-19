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
      setTimeout(function () {
        if (values.type == 'embed' || values.type == '') {
          $('#tf_width, #tf_height').prop('disabled', false).closest('.mce-container-body').css({ opacity: 1 })
          $('#tf_style, #tf_button_text').prop('disabled', true).closest('.mce-container-body').css({ opacity: .2 })
        } else {
          $('#tf_width, #tf_height').prop('disabled', true).closest('.mce-container-body').css({ opacity: .2 })
          $('#tf_style, #tf_button_text').prop('disabled', false).closest('.mce-container-body').css({ opacity: 1 })
        }
      }, 10)
      open_media_window(values)
    }
  }
  wp.mce.views.register(shortcode_string, wp.mce.typeform_render)

  $('#add-typeform').click(open_media_window)

  function open_media_window (values) {
    if (!values) {
      values = {}
    }
    var windowConfiguration = {
      title: 'Add a typeform',
      body: [
        {
          type: 'textbox',
          name: 'tf_url',
          label: 'Typeform URL',
          value: values['url']
        },
        {
          type: 'listbox',
          name: 'tf_type',
          id: 'tf_type',
          label: 'Embed type',
          value: values['type'],
          values: [
            {
              text: 'Embed',
              value: 'embed'
            },
            {
              text: 'Popup',
              value: 'classic'
            },
            {
              text: 'Drawer',
              value: 'drawer'
            }
          ],
          onselect: function () {
            if (this.value() != 'embed') {
              $('#tf_width, #tf_height').prop('disabled', true).closest('.mce-container-body').css({ opacity: .2 })
              $('#tf_style, #tf_button_text').prop('disabled', false).closest('.mce-container-body').css({ opacity: 1 })
            } else {
              $('#tf_width, #tf_height').prop('disabled', false).closest('.mce-container-body').css({ opacity: 1 })
              $('#tf_style, #tf_button_text').prop('disabled', true).closest('.mce-container-body').css({ opacity: .2 })
            }
          }
        },
        {
          type: 'textbox',
          name: 'tf_width',
          id: 'tf_width',
          label: 'Width (optional)',
          value: values['width']
        },
        {
          type: 'textbox',
          name: 'tf_height',
          id: 'tf_height',
          label: 'Height (optional)',
          value: values['height']
        },
        {
          type: 'listbox',
          name: 'tf_style',
          label: 'Link style',
          id: 'tf_style',
          value: values['style'],
          values: [
            {
              text: 'Link',
              value: 'link'
            },
            {
              text: 'Button',
              value: 'button'
            }
          ]
        },
        {
          type: 'textbox',
          name: 'tf_button_text',
          id: 'tf_button_text',
          label: 'Link text',
          value: values['button_text']
        }
      ],
      onsubmit: function (e) {
        // Insert content when the window form is submitted
        var type = (e.data.tf_type) ? e.data.tf_type : ''
        var shortcode = '[typeform_embed '

        shortcode += 'url="' + e.data.tf_url + '"'
        shortcode += ' type="' + e.data.tf_type + '"'
        switch (type) {
          case 'embed':
            if (e.data.tf_height) {
              shortcode += ' height="' + e.data.tf_height + '"'
            }
            if (e.data.tf_width) {
              shortcode += ' width="' + e.data.tf_width + '"'
            }
            break
          default:
            var style = (e.data.tf_style) ? e.data.tf_style : 'link'
            var buttonText = (e.data.tf_button_text) ? e.data.tf_button_text : ''
            shortcode += ' style="' + style + '"'
            shortcode += ' button_text="' + buttonText + '"'
            break
        }

        shortcode += ']'
        tinymce.activeEditor.insertContent(shortcode)
      }
    }
    console.log(tinymce, wp.mce)
    if (tinymce.activeEditor != null) {
      tinymce.activeEditor.windowManager.open(windowConfiguration)
    } else {
      tinymce.windowManager.open(windowConfiguration)
    }
  } // open_media_window
// } // wp.media
})
