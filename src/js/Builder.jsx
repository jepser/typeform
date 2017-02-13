/* global typeformObject */

'use strict'

import * as React from 'react'
import qs from 'qs'
import Field from './Field.jsx'
import Fieldset from './Fieldset.jsx'
import Options from './Options.jsx'
import EmbedButton from './EmbedButton.jsx'

const { Component } = React

const { userEmail } = typeformObject

const LINK_STYLES = [['link', 'Link'], ['button', 'Button']]

const defaults = {
  name: `Hello! What's your name?`,
  email: `Great! And your email address?`,
  message: `What would you like to ask?`,
}

const serialiseForm = state => {
  const ignore = ['activeTab', 'name', 'message', 'email', 'email_notifications']
  const creating = state.activeTab === 'create'
  const embedding = state.embedType === 'embed'

  // serialise the form
  const options = Object.keys(state).reduce((result, key) => {
    const value = state[key]
    switch (key) {
      case 'url':
        if (!creating) result[key] = value
        break
      case 'embedType':
        result['type'] = value
        break
      case 'width':
      case 'height':
        if (embedding) result[key] = value
        break
      case 'style':
      case 'button_text':
        if (!embedding) result[key] = value
        break
      default:
        if (ignore.indexOf(key) !== -1) break
        result[key] = value
    }
    return result
  }, {})

  // add default values if missing
  if (creating) {
    const fields = {}

    Object.keys(defaults).forEach(key => {
      if (!state[key]) state[key] = defaults[key]
      fields[key] = state[key]
    })

    options['builder'] = qs.stringify(fields)
  }

  return options
}

export default class Builder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 'create',
      embedType: 'embed',
    }
    this.setTab = this.setTab.bind(this)
    this.setEmbedType = this.setEmbedType.bind(this)
    this.setLinkStyle = this.setLinkStyle.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.record = this.record.bind(this)
  }

  setTab (name) {
    this.setState({ activeTab: name })
  }

  setEmbedType (embedType) {
    this.setState({ embedType })
  }

  setLinkStyle (style) {
    console.log(style)
    return this.setState({ style })
  }

  record (ev) {
    return this.setState({ [ev.currentTarget.name]: ev.currentTarget.value })
  }

  onSubmit (ev) {
    ev.preventDefault()
  }

  render () {
    const { setTab, setEmbedType, setLinkStyle } = this
    const { embedType, activeTab, style } = this.state

    const buttonAttrs = type => ({
      isActive: embedType === type,
      onClick: () => setEmbedType(type),
    })

    return (
      <div className="typeform-embed-widget tf-embed" style={{ width: '400px', height: '300px' }}>
        <form className="tf-embed__form" onSubmit={this.onSubmit}>

          <div className="tf-embed__tab-buttons">
            <button className={`tf-embed__tab-button ${activeTab === 'create' ? 'is-active' : ''}`}
                    onClick={() => setTab('create')}
                    type="button">
              Start from scratch
            </button>
            <button className={`tf-embed__tab-button ${activeTab === 'add' ? 'is-active' : ''}`}
                    onClick={() => setTab('add')}
                    type="button">
              Embed an existing Typeform
            </button>
          </div>

          <Fieldset visible={activeTab === 'create'} className="tf-embed__tab">
            <Field label="Name" name="name" placeholder="Hey there! What's your name?" onChange={this.record} autofocus />
            <Field label="Email" name="email" placeholder="Great! And your email?" inputType="email" onChange={this.record} />
            <Field label="Message" name="message" placeholder="Thanks! How can we help?" onChange={this.record} />
            <Field label="Responses" name="email_notifications" placeholder="your.email@example.com"
                   defaultValue={userEmail} onChange={this.record} />
          </Fieldset>

          <Fieldset visible={activeTab === 'add'} className="tf-embed__tab">
            <Field label="URL" name="url" placeholder="http://example.typeform.com/to/Z6Agtz" onChange={this.record} />
          </Fieldset>

          <Fieldset title="Embedding options" className="embed-options">
            <div className="embed-options__type" role="radiogroup">
              <EmbedButton icon="embed.svg" {...buttonAttrs('embed')}>Embed</EmbedButton>
              <EmbedButton icon="popup.svg" {...buttonAttrs('popup')}>Popup</EmbedButton>
              <EmbedButton icon="drawer.svg" {...buttonAttrs('drawer')}>Drawer</EmbedButton>
            </div>

            <div className="embed-options__customise" style={{ display: embedType !== 'embed' ? 'none': '' }}>
              <Field label="Width" name="width" type="number" placeholder="100% (default)" onChange={this.record} />
              <Field label="Height" name="height" type="number" placeholder="500px (default)" onChange={this.record} />
            </div>

            <div className="embed-options__customise" style={{ display: embedType === 'embed' ? 'none' : '' }}>
              <Options label="Style" name="style" options={LINK_STYLES} checked={style}
                       onChange={ev => setLinkStyle(ev.currentTarget.value)} />
              <Field label="Link text" name="button_text" placeholder="Launch me!" onChange={this.record} />
            </div>
          </Fieldset>

          <pre style={{background: '#f2f2f2', marginBottom: '1em', padding: '.75em'}}>
            <code style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}} className="typeform-embed-values">
              {JSON.stringify(serialiseForm(this.state), null, 2)}
            </code>
          </pre>
        </form>
      </div>
    )
  }
}
