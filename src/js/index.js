/* global wp, jQuery, tinyMCE, wpActiveEditor, typeformObject, alert */

'use strict'

import * as React from 'react'
import ReactDOM from 'react-dom'
import Builder from './Builder.jsx'

const WINDOW_TEMPLATE = '<div class="typeform-embed-app loading" style="height:%s"></div>'
const SHORTCODE_TAG = 'typeform_embed'
const { userEmail } = typeformObject

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

const getWindowIdealHeight = () => {
  const defaultHeight = 420
  const padding = 40
  const popupPadding = 86
  return Math.max(
    defaultHeight,
    Math.min(
      window.innerHeight - popupPadding - (padding * 2),
      580
    )
  )
}

const windowConfiguration = (editor, values = {}) => ({
  title: 'Add a Contact Form',

  body: [{
    type: 'container',
    html: WINDOW_TEMPLATE.replace(/%s/, getWindowIdealHeight() + 'px'),
  }],

  onopen (ev) {
    return setTimeout(() => {
      const wrapper = ev.target.$el.context.querySelector('.typeform-embed-app')

      if (!values.email_notifications) {
        values.email_notifications = userEmail
      }

      ReactDOM.render(<Builder value={values} />, wrapper, () => wrapper.classList.remove('loading'))
    }, 100)
  },

  onclose (ev) {
    const elem = ev.target.$el.context.querySelector('.mce-last .mce-container-body .mce-container-body')
    ReactDOM.unmountComponentAtNode(elem.firstElementChild)
  },

  onsubmit (ev) {
    const json = ev.target.$el.context.querySelector('.typeform-embed-values').value

    const shortcodeContent = wp.shortcode.string({
      tag: SHORTCODE_TAG,
      type: 'single',
      content: ev.data.innercontent,
      attrs: JSON.parse(json),
    })

    if (editor && !editor.hidden) {
      return editor.insertContent(shortcodeContent)
    } else {
      const textEditor = getTextEditor()
      return insertAtCursor(textEditor, shortcodeContent)
    }
  },
})

function openMediaWindow (values = {}, editor = tinyMCE.activeEditor) {
  if (values.constructor === jQuery.Event) {
    values = {}
  }

  if (tinyMCE.activeEditor !== null) {
    tinyMCE.activeEditor.windowManager.open(windowConfiguration(editor, values))
  } else {
    alert('Hey! Activate visual tab to see the embed in action.')
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
