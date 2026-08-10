import React from 'react'
import styles from './FilterBar.module.css'

import Dropdown from '../Dropdown/Dropdown'
import RangeInput from '../RangeInput/RangeInput'
import { SearchInput } from '../SearchInput/SearchInput'
import CheckboxContainer from '../CheckboxContainer/CheckboxContainer'

import { useEffect } from 'react'

export default function FilterBar({cats, filtersDispatch, filtersState}) {
  const breeds = new Set([]);
  const colours = new Set([]);

  cats.forEach(cat => {
    breeds.add(cat.breed)
    colours.add(cat.colour)
  })
  
  const handleValue = (category, value) => {
    return filtersState[category].has(value)
  }

  const handleCheckedBox = (e, category, value) => {
    if (e.target.checked) {
      filtersDispatch({type: 'added-filter', category: category, value: value})
    } else {
      filtersDispatch({type: 'removed-filter', category: category, value: value})
    }
  }


  
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
          {[...breeds].map((breed, index) => <CheckboxContainer checked={handleValue("breeds", breed)} 
                                                                onChange={(e) => handleCheckedBox(e, "breeds", breed)} 
                                                                key={index} 
                                                                name={breed}/>)}
        </Dropdown>
        
        <Dropdown name="colour">
          {[...colours].map((colour, index) => <CheckboxContainer checked={handleValue("colours", colour)}
                                                                  onChange={(e) => handleCheckedBox(e, "colours", colour)}
                                                                  key={index} 
                                                                  name={colour}/>)}
        </Dropdown>
  
    </div>
  )
}

