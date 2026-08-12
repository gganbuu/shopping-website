import React from 'react'
import styles from './RangeInput.module.css'



const RangeInput = ({name, fromValue, toValue, toOnChange, fromOnChange}) => {
    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <label htmlFor="from">from</label> 

                <input aria-label={name + "-from"} 
                       name="from" 
                       type="number" 
                       placeholder={fromValue} 
                       onChange={(e) => fromOnChange(e)}/>
                <label htmlFor="to">to </label>

                <input aria-label={name + "-to"} 
                       name="to" 
                       type="number" 
                       placeholder={toValue} 
                       onChange={(e) => toOnChange(e)}/>
            </div>
        </div>
    )
}

export default RangeInput