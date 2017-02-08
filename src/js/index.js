/* global wp, jQuery, tinymce, tinyMCE, editor */

'use strict'

import * as React from 'react'
import ReactDOM from 'react-dom'
import ShortcodeBuilder from './Builder.jsx'

const { pluginRoot, userEmail } = typeformObject

const WINDOW_TEMPLATE = '<div class="typeform-embed-app loading"></div>'
const SHORTCODE_TAG = 'typeform_embed'
const SHORTCODE_FIELDS = [
  'url',
  'type',
  'height',
  'width',
  'style',
  'button_text',
  'pass_params',
]

const windowConfiguration = {
  title: 'Add a Contact Form',
  body: [{
    type: 'container',
    html: WINDOW_TEMPLATE,
  }],

  onopen (ev) {
    return setTimeout(() => {
      const wrapper = ev.target.$el.context.querySelector('.typeform-embed-app')
      ReactDOM.render(<ShortcodeBuilder />, wrapper, () => wrapper.classList.remove('loading'))
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

jQuery(function ($) {
  const media = wp.media
  const template = media.template('editor-tf-banner')

  wp.mce = wp.mce || {}
  wp.mce.typeformRender = {
    shortcode_data: {},
    template: template,

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

    getContent () {
      const options = this.shortcode.attrs.named
      options['innercontent'] = this.shortcode.content
      return this.template(options)
    },

    edit (/* node */) {
      const attrs = this.shortcode.attrs.named
      this.popupwindow(tinyMCE.activeEditor, attrs)
    },

    popupwindow (editor, values, onsubmit) {
      setTimeout(() => {
        const enable = values.type === 'embed' || values.type === ''
        return setEmbedFormFields(enable)
      }, 10)

      openMediaWindow(editor, values)
    },
  }

  wp.mce.views.register(SHORTCODE_TAG, wp.mce.typeformRender)

  $('#add-typeform').click(openMediaWindow)

  function openMediaWindow (editor = tinymce.activeEditor, values = {}) {
    console.log(editor, 'editor initialize')
    if (tinymce.activeEditor) {
      tinymce.activeEditor.windowManager.open(windowConfiguration)
    } else {
      tinymce.windowManager.open(windowConfiguration)
    }
  }

  function buildShortcodeStructure (attrs) {
    const fields = {}

    SHORTCODE_FIELDS.forEach(attr => {
      const key = `tf_${attr}`
      if (attrs[key]) {
        fields[attr] = attrs[key]
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
