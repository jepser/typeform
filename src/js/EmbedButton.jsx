/* global typeformObject */

'use strict'

import * as React from 'react'
const { Component, PropTypes } = React

const { pluginRoot } = typeformObject

class EmbedButton extends Component {
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

  shouldComponentUpdate (nextProps) {
    return nextProps.isActive !== this.props.isActive
  }

  render () {
    const { icon, children, isActive, onClick } = this.props
    return (
      <div className={`embed-option ${isActive ? 'is-active' : ''}`}
           role="radio"
           aria-checked={isActive}
           tabIndex={isActive ? '0' : '-1'}>
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

EmbedButton.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default EmbedButton
