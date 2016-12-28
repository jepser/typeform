jQuery(function ($) {
  // if (wp.media) {
  var shortcodeString = 'typeform_embed'
  var media = wp.media
  var template = media.template('editor-tf-banner')

  var shortcodeFields = [
    'url',
    'type',
    'height',
    'width',
    'style',
    'button_text',
    'pass_params'
  ]

  wp.mce = wp.mce || {}

  wp.mce.typeform_render = {
    shortcode_data: {},
    template: template,
    getContent: function () {
      var options = this.shortcode.attrs.named
      options['innercontent'] = this.shortcode.content
      return this.template(options)
    },
    View: {
      template: template,
      postID: $('#post_ID').val(),
      initialize: function (options) {
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
      this.popupwindow(tinyMCE.activeEditor, attrs)
    },
    popupwindow: function (editor, values, onsubmit_callback) {
      setTimeout(function () {
        var enable = (values.type == 'embed' || values.type == '') ? true : false
        setEmbedFormFields(enable)
      }, 10)

      openMediaWindow(values, editor)
    }
  }
  wp.mce.views.register(shortcodeString, wp.mce.typeform_render)

  $('#add-typeform').click(openMediaWindow)

  function openMediaWindow (values, editor) {

    console.log(editor, 'editor initialize')
    if (!values) {
      values = {}
    }
    if (!editor) {
      editor = tinymce.activeEditor
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
            setEmbedFormFields(this.value() == 'embed')
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

        var args = {
          tag: shortcodeString,
          type: 'single',
          content: e.data.innercontent,
          attrs: {}
        }

        console.log(editor, 'editor')

        args.attrs = buildShortcodeStructure(e.data)
        editor.insertContent(wp.shortcode.string(args))
      },
    }
    if (tinymce.activeEditor != null) {
      tinymce.activeEditor.windowManager.open(windowConfiguration)
    } else {
      tinymce.windowManager.open(windowConfiguration)
    }
  } // openMediaWindow

  function buildShortcodeStructure(attrs) {

    var fields = {}
    var prefix = 'tf_'
    $.each(shortcodeFields, function(i, field) {
      if(attrs[prefix + field]) {
        fields[field] = attrs[prefix + field]
      }
    })

    return fields
  }

  function setEmbedFormFields(isEmbed) {

    var $embedFields = $('#tf_width, #tf_height')
    var $linkFields = $('#tf_style, #tf_button_text')
    var container = '.mce-container-body'

    if(isEmbed) {
      enableFormContainer($embedFields, true)
      enableFormContainer($linkFields, false)
    } else {
      enableFormContainer($embedFields, false)
      enableFormContainer($linkFields, true)
    }
  }

  function enableFormContainer($elem, enable) {
    $elem.prop('disabled', !enable).closest('.mce-container-body').css({
      opacity: (enable) ? 1 : .2
    })
  }
// } // wp.media
})
