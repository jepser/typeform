'use strict'

import * as React from 'react'

const buttonAttributes = {
  className: 'button-primary',
  style: {
    marginRight: '.5em',
  },
}

function Field (props) {

  return (
    <label htmlFor="">
      Name:
      <input className="regular-text" type="text" name="name" placeholder="Hi there! What's your name?"/>
    </label>
  )
}

export default class TypeformEmbed extends React.Component {
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

  render () {
    const style = tab => ({ style: this.getStyle(tab) })
    const onClick = tab => ({ onClick: () => this.setTab(tab) })

    return (
      <div className="typeform-embed-widget tf-embed" style={{ width: '400px', height: '300px' }}>
        <button {...buttonAttributes} {...onClick('create')}>Start from scratch</button>
        <button {...buttonAttributes} {...onClick('embed')}>Embed an existing Typeform</button>
        <div className="tf-embed__tabs">
          <form className="tf-embed__tab tf-embed__tab--create" {...style('create')}>
            <label htmlFor="">
              Name:
              <input className="regular-text" type="text" name="name" placeholder="Hi there! What's your name?"/>
            </label>
            <label htmlFor="">
              Email:
              <input className="regular-text" type="email" name="name" placeholder="Great! What's your email?" value={typeformObject.userEmail}/>
            </label>
            <label htmlFor="">
              Message:
              <input className="regular-text" type="text" name="name" placeholder="Thanks! What would you like to say?"/>
            </label>
          </form>
          <form className="tf-embed__tab tf-embed__tab--url" {...style('embed')}>
            Add yo URL
          </form>
        </div>
      </div>
    )
  }
}
