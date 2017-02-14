/* global wp, jQuery, tinyMCE, editor, wpActiveEditor */

'use strict'

import * as React from 'react'
import ReactDOM from 'react-dom'
import Builder from './Builder.jsx'

const WINDOW_TEMPLATE = '<div class="typeform-embed-app loading"></div>'
const SHORTCODE_TAG = 'typeform_embed'

const SHORTCODE_FIELDS = [
  'url',
  'type',
  'height',
  'width',
  'style',
  'button_text',
  'builder',
]

const getTextEditor = () => {
  return document.getElementById(wpActiveEditor)
}

const cursorPosition = input => {
  return [
    input.selectionStart,
    input.selectionEnd,
  ]
}

const insertAtCursor = (input, content) => {
  const { value } = input
  const [ start, end ] = cursorPosition(input)
  input.value = [
    value.substr(0, start),
    content,
    value.substr(end, value.length),
  ].join('')
}

const windowConfiguration = (editor, values = {}) => ({
  title: 'Add a Contact Form',

  body: [{
    type: 'container',
    html: WINDOW_TEMPLATE,
  }],

  onopen (ev) {
    return setTimeout(() => {
      const wrapper = ev.target.$el.context.querySelector('.typeform-embed-app')
      ReactDOM.render(<Builder />, wrapper, () => wrapper.classList.remove('loading'))
    }, 100)
  },

  onclose (ev) {
    const elem = ev.target.$el.context.querySelector('.typeform-embed-app')
    ReactDOM.unmountComponentAtNode(elem.firstElementChild)
  },

  onsubmit (ev) {
    const json = ev.target.$el.context.querySelector('.typeform-embed-values').innerHTML

    const shortcodeContent = wp.shortcode.string({
      tag: SHORTCODE_TAG,
      type: 'single',
      content: ev.data.innercontent,
      attrs: JSON.parse(json),
    })

    console.log(shortcodeContent)

    if (editor && !editor.hidden) {
      return editor.insertContent(shortcodeContent)
    } else {
      const textEditor = getTextEditor()
      return insertAtCursor(textEditor, shortcodeContent)
    }
  },
})

function openMediaWindow (values = {}, editor = tinyMCE.activeEditor) {
  if (tinyMCE.activeEditor) {
    tinyMCE.activeEditor.windowManager.open(windowConfiguration(editor, values))
  } else {
    tinyMCE.windowManager.open(windowConfiguration(editor, values))
  }
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
      openMediaWindow(values, editor)
    },
  }

  wp.mce.views.register(SHORTCODE_TAG, wp.mce.typeformRender)

  $('#add-typeform').on('click', openMediaWindow)
})
