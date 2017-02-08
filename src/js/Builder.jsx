'use strict'

import * as React from 'react'

const { pluginRoot, userEmail } = typeformObject

function Field ({ label, name, placeholder, inputType = 'text' }) {
  return (
    <label className="tf-form-group" htmlFor={`input_${name}`}>
      <span className="tf-form-group__label">{label}:</span>
      <input className="tf-form-group__input regular-text"
             type={inputType}
             name={name}
             id={`input_${name}`}
             placeholder={placeholder} />
    </label>
  )
}

class EmbedButton extends React.Component {
  constructor (props) {
    super(props)
    this.setActive = this.setActive.bind(this)
  }

  setActive (ev) {
    const fill = this.props.isActive ? '#2c82bd' : '#aaa'
    const icon = ev.currentTarget.contentDocument
    icon.querySelector('#form-bg').style.fill = fill
  }

  componentDidUpdate () {
    this.setActive({ currentTarget: this.icon })
  }

  render () {
    const { icon, children, isActive, onClick } = this.props
    return (
      <div className={`embed-option ${isActive ? 'is-active' : ''}`}>
        <button className="embed-option__button" type="button" onClick={onClick}>
          <div className="embed-option__cover"></div>
          <object data={`${pluginRoot}/assets/images/${icon}`}
                  onLoad={this.setActive}
                  ref={icon => this.icon = icon} />
        </button>
        <div className="embed-option__label" onClick={onClick}>{children}</div>
      </div>
    )
  }
}

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
