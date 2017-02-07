/* global wp, jQuery, tinymce, tinyMCE */

'use strict'

import * as React from 'react'
import ReactDOM from 'react-dom'
import TypeformEmbed from './Builder.jsx'

console.log(typeformObject)


const SHORTCODE_TAG = 'typeform_embed'
const WINDOW_TEMPLATE = '<div class="typeform-embed-app loading" style="width:400px;height:300px"></div>'

jQuery(function ($) {
  const media = wp.media
  const template = media.template('editor-tf-banner')

  const shortcodeFields = [
    'url',
    'type',
    'height',
    'width',
    'style',
    'button_text',
    'pass_params',
  ]

  wp.mce = wp.mce || {}
  wp.mce.typeformRender = {
    shortcode_data: {},
    template: template,

    getContent () {
      const options = this.shortcode.attrs.named
      options['innercontent'] = this.shortcode.content
      return this.template(options)
    },

    View: {
      template: template,
      postID: $('#post_ID').val(),
      initialize (options) {
        this.shortcode = options.shortcode
        typeformRender.shortcode_data = this.shortcode
      },
      getHtml () {
        const options = this.shortcode.attrs.named
        return this.template(options)
      },
    },

    edit (node) {
      const attrs = this.shortcode.attrs.named
      this.popupwindow(tinyMCE.activeEditor, attrs)
    },

    popupwindow (editor, values, onsubmit) {
      setTimeout(() => {
        const enable = (values.type === 'embed' || values.type === '')
        return setEmbedFormFields(enable)
      }, 10)

      openMediaWindow(values, editor)
    },
  }

  wp.mce.views.register(SHORTCODE_TAG, wp.mce.typeformRender)

  $('#add-typeform').click(openMediaWindow)

  function openMediaWindow (values, editor) {
    console.log(editor, 'editor initialize')
    if (!values) {
      values = {}
    }

    if (!editor) {
      editor = tinymce.activeEditor
    }

    const windowConfiguration = {
      title: 'Add a typeform',
      body: [{
        type: 'container',
        html: WINDOW_TEMPLATE,
      }],

      onopen (ev) {
        return setTimeout(() => {
          const wrapper = ev.target.$el.context.querySelector('.typeform-embed-app')
          ReactDOM.render(<TypeformEmbed />, wrapper, () => wrapper.classList.remove('loading'))
        }, 100)
      },

      onclose (ev) {
        const elem = ev.target.$el.context.querySelector('.mce-last .mce-container-body .mce-container-body')
        ReactDOM.unmountComponentAtNode(elem.firstElementChild)
      },

      onsubmit (ev) {
        const args = {
          tag: SHORTCODE_TAG,
          type: 'single',
          content: ev.data.innercontent,
          attrs: {},
        }
        console.log(editor, 'editor')
        args.attrs = buildShortcodeStructure(ev.data)
        editor.insertContent(wp.shortcode.string(args))
      },
    }

    if (tinymce.activeEditor) {
      tinymce.activeEditor.windowManager.open(windowConfiguration)
    } else {
      tinymce.windowManager.open(windowConfiguration)
    }
  }

  function buildShortcodeStructure (attrs) {
    const fields = {}
    const prefix = 'tf_'
    $.each(shortcodeFields, function (i, field) {
      if (attrs[prefix + field]) {
        fields[field] = attrs[prefix + field]
      }
    })

    return fields
  }

  function setEmbedFormFields (isEmbed) {
    const $embedFields = $('#tf_width, #tf_height')
    const $linkFields = $('#tf_style, #tf_button_text')

    if (isEmbed) {
      enableFormContainer($embedFields, true)
      enableFormContainer($linkFields, false)
    } else {
      enableFormContainer($embedFields, false)
      enableFormContainer($linkFields, true)
    }
  }

  function enableFormContainer ($elem, enable) {
    $elem.prop('disabled', !enable).closest('.mce-container-body').css({
      opacity: (enable) ? 1 : 0.2,
    })
  }
})
