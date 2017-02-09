'use strict'

import * as React from 'react'
const { PropTypes } = React

export function Field ({ label, name, placeholder, inputType = 'text' }) {
  return (
    <label className="tf-form-group" htmlFor={`input_${name}`}>
      <span className="tf-form-group__label">{label}:</span>
      <input className="tf-form-group__input"
             type={inputType}
             name={name}
             id={`input_${name}`}
             placeholder={placeholder}
             {...arguments[0]} />
    </label>
  )
}

Field.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
}

export default Field
