import React from 'react'
import styles from './Dropdown.module.css'
import { useState } from 'react'
import { ChevronDown as DropDownIcon } from 'lucide-react'
import { Minus as MinusIcon } from 'lucide-react'

const Dropdown = ({name, children}) => {
    const [open, setOpen] = useState(false)  
    
    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <div className={styles.dropDownContainer}>
            <label htmlFor={name} className={styles.dropDownName}>
                <h3>{name}</h3>
                <button aria-label={name} onClick={handleOpen}>{!open ? <DropDownIcon/> : <MinusIcon/>}</button>
            </label>
            {open && children}
        </div>
    )
    
}

export default Dropdown
