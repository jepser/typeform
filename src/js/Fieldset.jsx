'use strict'

import * as React from 'react'
const { PropTypes } = React

export function Fieldset (props) {
  const styles = !props.visible
    ? { style: { display: 'none' } }
    : {}

  return (
    <fieldset {...styles} className={`tf-embed__fieldset ${props.className}`}>
      {props.title
        ? <legend className="tf-embed__legend">{ props.title }</legend>
        : null }
      { props.children }
    </fieldset>
  )
}

Fieldset.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

Fieldset.defaultProps = {
  visible: true,
  className: '',
}

export default Fieldset
