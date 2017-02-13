'use strict'

import * as React from 'react'
const { PropTypes } = React

export function Options ({ label, name, options, checked, onChange }) {
  const toCheck = checked || options[0][0]

  return (
    <label className="tf-form-group" htmlFor={`input_${name}`}>
      <span className="tf-form-group__label">{label}:</span>
      <div className="tf-form-group__option-wrap">
        {options.map(([value, label]) => {
          const inner = label || value
          return (
            <label className="tf-form-group__option" rel={value}>
              <input type="radio" name={name} value={value} defaultChecked={value === toCheck} onChange={onChange} />
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
  checked: PropTypes.string,
  onChange: PropTypes.func,
}

export default Options
