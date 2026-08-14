import React from 'react'
import styles from './ComponentButton.module.css'

export const ComponentButton = ({name, handleClick}) => {
    return (
        <button className={styles.styledButton} onClick={() => handleClick()}>
            {name}
        </button>
    )
}
