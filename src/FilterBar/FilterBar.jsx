import React from 'react'
import styles from './FilterBar.module.css'

import Dropdown from '../Dropdown/Dropdown'
import RangeInput from '../RangeInput/RangeInput'
import { SearchInput } from '../SearchInput/SearchInput'


export default function FilterBar() {
  return (
    <div className={styles.filterContainer}>
        <SearchInput/>
    
        <h3>filters</h3>
        
        <Dropdown name="price">
          <RangeInput/>
        </Dropdown>

        <Dropdown name="age">
          <RangeInput/>
        </Dropdown>

        <Dropdown name="breed">

        </Dropdown>
        
        <Dropdown name="colour">

        </Dropdown>
  
    </div>
  )
}

