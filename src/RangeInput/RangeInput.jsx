import React from 'react'
import styles from './RangeInput.module.css'



const RangeInput = () => {
    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <label htmlFor="from">from</label>  
                <input type="number"/>
                <label htmlFor="to">to </label>
                <input type="number"/>
            </div>
            <button>filter</button>
        </div>
    )
}

export default RangeInput