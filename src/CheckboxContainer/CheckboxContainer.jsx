import React, { useState } from 'react'
import styles from './CheckboxContainer.module.css'


const CheckboxContainer = ({name, checked, onChange}) => {
  return (
    <label className={styles.label} htmlFor={name}>
      <input aria-label={name} 
        checked={checked}
        onChange={(e) => onChange(e)}
        type="checkbox"/>
      {name}
    </label>
  )
}

export default CheckboxContainer