'use strict'

import * as React from 'react'
const { PropTypes } = React

export function Options ({ label, name, options }) {
  return (
    <label className="tf-form-group" htmlFor={`input_${name}`}>
      <span className="tf-form-group__label">{label}:</span>
      <div className="tf-form-group__option-wrap">
        {options.map(([value, label]) => {
          const inner = label || value
          return (
            <label className="tf-form-group__option" rel={value} aria-labelledby="gdesc1">
              <input type="radio" name={name} value={value} />
              {inner}
            </label>
          )
        })}
      </div>
    </label>
  )
}

Options.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
}

export default Options
