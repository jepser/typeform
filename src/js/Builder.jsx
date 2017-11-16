/* global typeformObject */

'use strict'

import * as React from 'react'
import qs from 'qs'
import copy from './copy'

import Field from './Field.jsx'
import Fieldset from './Fieldset.jsx'
import Options from './Options.jsx'
import EmbedButton from './EmbedButton.jsx'

const { Component, PropTypes } = React
const { pluginRoot } = typeformObject

const urls = {
  create: `https://www.typeform.com/signup?utm_source=wp&utm_medium=display&utm_campaign=wp_plugin&utm_content=cta_signup`,
  embed: `https://admin.typeform.com/crashcourse#/section/beginner?utm_source=wp&utm_medium=display&utm_campaign=wp_plugin&utm_content=cta_crashcourse`,
}

const LINK_STYLES = [
  ['link', copy.linkLabel],
  ['button', copy.buttonLabel],
]

const serialiseForm = state => {
  const ignore = ['activeTab', 'name', 'message', 'email', 'email_notifications']
  const creating = state.activeTab === 'create'
  const embedding = state.type === 'embed'

  // serialise the form
  const options = Object.keys(state).reduce((result, key) => {
    const value = state[key]
    switch (key) {
      case 'url':
        if (!creating) result[key] = value
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
    const builder = {}
    const defaults = ['name', 'email', 'message', 'email_notifications']

    defaults.forEach(field => {
      if (field === 'email_notifications') return builder[field] = state[field]
      if (!copy.hasOwnProperty(field + 'Field')) return
      if (!state[field]) state[field] = copy[field + 'Field']
      builder[field] = state[field]
    })

    options['builder'] = qs.stringify(builder)
  }

  return options
}

// @TODO: Work out why this is only needed the first time
const sanitiseQueryString = (query = '') => {
  const elem = document.createElement('div')
  elem.innerHTML = query
  return elem.textContent || elem.innerText
}

export default class Builder extends Component {
  constructor (props) {
    super(props)

    this.state = Object.assign({}, {
      type: 'drawer',
      activeTab: props.value.url ? 'add' : 'create',
    }, this.processValues(props))

    this.setTab = this.setTab.bind(this)
    this.setEmbedType = this.setEmbedType.bind(this)
    this.setLinkStyle = this.setLinkStyle.bind(this)
    this.record = this.record.bind(this)
  }

  processValues (props) {
    const values = props.value
    const builderValue = values.builder ? sanitiseQueryString(values.builder) : ''
    const newProps = Object.assign({}, values, qs.parse(builderValue))
    delete newProps['builder']
    return newProps
  }

  setTab (name) {
    return this.setState({ activeTab: name })
  }

  setEmbedType (type) {
    return this.setState({ type })
  }

  setLinkStyle (style) {
    return this.setState({ style })
  }

  record (ev) {
    return this.setState({
      [ev.currentTarget.name]: ev.currentTarget.value,
    })
  }

  render () {
    const { setTab, setEmbedType, setLinkStyle } = this
    const { activeTab, name, email, message, email_notifications,
      style, type, url, width, height, button_text } = this.state

    const buttonAttrs = btnType => ({
      isActive: type === btnType,
      onClick: () => setEmbedType(btnType),
    })

    return (
      <div className="typeform-embed-widget tf-embed">
        <form className="tf-embed__form" onSubmit={this.onSubmit}>
          <div className="tf-embed__tab-buttons">
            <button className={`tf-embed__tab-button ${activeTab === 'create' ? 'is-active' : ''}`}
                    onClick={() => setTab('create')}
                    type="button">
              {copy.createTab}
            </button>
            <button className={`tf-embed__tab-button ${activeTab === 'add' ? 'is-active' : ''}`}
                    onClick={() => setTab('add')}
                    type="button">
              {copy.embedTab}
            </button>
          </div>

          <Fieldset visible={activeTab === 'create'} className="tf-embed__tab">
            <div className="tf-embed__description">{copy.createDescription}</div>
            <Field label={copy.nameLabel} name="name" placeholder={copy.nameField}
                   defaultValue={name || copy.nameField} onChange={this.record} />
            <Field label={copy.emailLabel} name="email" placeholder={copy.emailField}
                   defaultValue={email || copy.emailField} onChange={this.record} />
            <Field label={copy.messageLabel} name="message" placeholder={copy.messageField}
                   defaultValue={message || copy.messageField} onChange={this.record} />
          </Fieldset>

          <Fieldset visible={activeTab === 'add'} className="tf-embed__tab">
            <div className="tf-embed__description">{copy.addDescription}</div>
            <Field label="URL" name="url" placeholder={copy.urlField} defaultValue={url} onChange={this.record} />
          </Fieldset>

          <Fieldset title={copy.responsesFieldset} visible={activeTab === 'create'} className="responses-options">
            <div className="tf-form-group__description">{copy.responsesDesc}</div>
            <Field label="Email" name="email_notifications" placeholder={copy.responsesField} inputType="email"
                   defaultValue={email_notifications} onChange={this.record} />
          </Fieldset>

          <Fieldset title={copy.embedOptions} className="embed-options">
            <div className="embed-options__type" role="radiogroup">
              <EmbedButton icon="drawer.svg" {...buttonAttrs('drawer')}>{copy.drawerButton}</EmbedButton>
              <EmbedButton icon="popup.svg" {...buttonAttrs('popup')}>{copy.popupButton}</EmbedButton>
              <EmbedButton icon="embed.svg" {...buttonAttrs('embed')}>{copy.embedButton}</EmbedButton>
            </div>

            <div className="embed-options__customise" style={{ display: type !== 'embed' ? 'none' : '' }}>
              <Field label="Width" name="width" placeholder="100% (default)" defaultValue={width}
                     onChange={this.record} />
              <Field label="Height" name="height" placeholder="500px (default)" defaultValue={height}
                     onChange={this.record} />
            </div>

            <div className="embed-options__customise" style={{ display: type === 'embed' ? 'none' : '' }}>
              <Options label="Style" name="style" options={LINK_STYLES} checked={this.state.style || style}
                       onChange={ev => setLinkStyle(ev.currentTarget.value)} />
              <Field label="Link text" name="button_text" placeholder={copy.linkText} defaultValue={button_text}
                     onChange={this.record} />
            </div>
          </Fieldset>

          <div className="tf-embed__disclaimer" style={{display: activeTab === 'create' ? 'block' : 'none'}}>
            {copy.disclaimer}
          </div>

          <input type="hidden" className="typeform-embed-values" value={JSON.stringify(serialiseForm(this.state))} />
        </form>
        <aside className={`tf-embed__banner tf-banner tf-banner--${activeTab}`}>
          {activeTab === 'create'
            ? [
              <img className="tf-banner__logo" src={`${pluginRoot}assets/images/logo-ochre.svg`} alt="Typeform Logo"/>,
              <h3 className="tf-banner__title">{copy.banner.create.title}</h3>,
              ...copy.banner.create.content.map((p, i) => <p className="tf-banner__content" key={`p_${i}`}>{p}</p>),
              <a className="tf-banner__button" href={urls.create} target="blank">{copy.banner.create.button}</a>,
            ]
            : [
              <img className="tf-banner__logo" src={`${pluginRoot}assets/images/logo-cyan.svg`} alt="Typeform Logo"/>,
              <h3 className="tf-banner__title">{copy.banner.embed.title}</h3>,
              <p className="tf-banner__content">{copy.banner.embed.content}</p>,
              <a className="tf-banner__button" href={urls.embed} target="blank">{copy.banner.embed.button}</a>,
            ]
          }
        </aside>
      </div>
    )
  }
}

Builder.propTypes = {
  value: PropTypes.object,
}
