/* global typeformObject */

'use strict'

import * as React from 'react'
import Field from './Field.jsx'
import Fieldset from './Fieldset.jsx'
import Options from './Options.jsx'
import EmbedButton from './EmbedButton.jsx'

const { Component } = React

const { userEmail } = typeformObject

const LINK_STYLES = [['link', 'Link'], ['button', 'Button']]

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

  setLinkStyle (linkStyle) {
    this.setState({ linkStyle })
  }

  record (ev) {
    this.setState({ [ev.currentTarget.name]: ev.currentTarget.value })
  }

  onSubmit (ev) {
    ev.preventDefault()
    console.log(this.state)
  }

  render () {
    const { setTab, setEmbedType, setLinkStyle } = this
    const { embedType, activeTab } = this.state

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
            <Field label="Responses" name="responses_email" placeholder="your.email@example.com" value={userEmail} onChange={this.record} />
          </Fieldset>

          <Fieldset visible={activeTab === 'add'} className="tf-embed__tab">
            <Field label="URL" name="url" placeholder="http://example.typeform.com/to/Z6Agtz" />
          </Fieldset>

          <Fieldset title="Embedding options" className="embed-options">
            <div className="embed-options__type" role="radiogroup">
              <EmbedButton icon="embed.svg" {...buttonAttrs('embed')}>Embed</EmbedButton>
              <EmbedButton icon="popup.svg" {...buttonAttrs('popup')}>Popup</EmbedButton>
              <EmbedButton icon="drawer.svg" {...buttonAttrs('drawer')}>Drawer</EmbedButton>
            </div>

            <div className="embed-options__customise" style={{ display: embedType !== 'embed' ? 'none': '' }}>
              <Field label="Width" name="number" placeholder="100% (default)" />
              <Field label="Height" name="number" placeholder="500px (default)" />
            </div>

            <div className="embed-options__customise" style={{ display: embedType === 'embed' ? 'none': '' }}>
              <Options label="Style" name="style" options={LINK_STYLES}
                       onChange={ev => setLinkStyle(ev.currentTarget.value)} />
              <Field label="Link text" name="button_text" placeholder="Click to contact" />
            </div>
          </Fieldset>

          <input type="submit" className="button-primary" value="Submit" />

          <pre>
            <code>
              [{JSON.stringify(this.state)}]
            </code>
          </pre>
        </form>
      </div>
    )
  }
}
