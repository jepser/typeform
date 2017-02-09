'use strict'

import * as React from 'react'
import Field from './Field.jsx'
import Fieldset from './Fieldset.jsx'
import Options from './Options.jsx'
import EmbedButton from './EmbedButton.jsx'

const { Component } = React

const { userEmail } = typeformObject

const LINK_STYLES = [['link', 'Link'], ['button', 'Button']]

export default class ShortcodeBuilder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 'create',
    }
    this.setTab = this.setTab.bind(this)
  }

  setTab (name) {
    this.setState({ activeTab: name })
  }

  getStyle (tab) {
    if (this.state.activeTab === tab) {
      return { display: 'block' }
    } else {
      return { display: 'none' }
    }
  }

  setEmbedType (embedType) {
    this.setState({ embedType })
  }

  render () {
    const style = tab => ({ style: this.getStyle(tab) })
    const setTab = tab => ({ onClick: () => this.setTab(tab) })
    const setEmbedType = type => () => this.setEmbedType(type)

    const { embedType } = this.state

    const tabAttributes = {
      className: 'button-primary',
      style: {
        marginRight: '.5em',
      },
    }

    return (
      <div className="typeform-embed-widget tf-embed" style={{ width: '400px', height: '300px' }}>
        <button {...tabAttributes} {...setTab('create')}>Start from scratch</button>
        <button {...tabAttributes} {...setTab('embed')}>Embed an existing Typeform</button>
        <div className="tf-embed__tabs">
          <form className="tf-embed__tab tf-embed__tab--create" {...style('create')}>
            <fieldset>
              <Field label="Name" name="name" placeholder="Hey there! What's your name?" />
              <Field label="Email" name="email" placeholder="Great! And your email?" inputType="email" />
              <Field label="Message" name="message" placeholder="Thanks! How can we help?" />
            </fieldset>
            <fieldset>
              <legend>Embedding options</legend>
              <div className="embedding-options">
                <EmbedButton icon="embed.svg" isActive={embedType === 'embed'} onClick={setEmbedType('embed')}>Embed</EmbedButton>
                <EmbedButton icon="popup.svg" isActive={embedType === 'popup'} onClick={setEmbedType('popup')}>Popup</EmbedButton>
                <EmbedButton icon="drawer.svg" isActive={embedType === 'drawer'} onClick={setEmbedType('drawer')}>Drawer</EmbedButton>
              </div>
            </fieldset>
          </form>
          <form className="tf-embed__tab tf-embed__tab--url" {...style('embed')}>
            Add yo URL
          </form>
        </div>
      </div>
    )
  }
}
