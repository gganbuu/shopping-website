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
  const prices = cats.map(cat => cat.price);
  const ages = cats.map(cat => cat.age);
  const [minPrice, maxPrice, minAge, maxAge] = [Math.min(...prices), Math.max(...prices), Math.min(...ages), Math.max(...ages)];

  cats.forEach(cat => {
    breeds.add(cat.breed)
    colours.add(cat.colour)
  })
  
  const handleCheckedStatus = (category, value) => {
    return filtersState[category].has(value)
  }

  const handleCheckedBox = (e, category, value) => {
    if (e.target.checked) {
      filtersDispatch({type: 'added-category-filter', category: category, value: value})
    } else {
      filtersDispatch({type: 'removed-category-filter', category: category, value: value})
    }
  }

  const handleNumberFromChange = (e, category) => {
    let value;
    if (e.target.value == '') {
      value = null
    } else {value = e.target.value}
    filtersDispatch({type: 'added-value-from', category: category, value: value})
  }

  const handleNumberToChange = (e, category) => {
    let value;
    if (e.target.value == '') {
      value = null
    } else {value = e.target.value}

    filtersDispatch({type: 'added-value-to', category: category, value: value})
  }  
  return (
    <div className={styles.filterContainer}>
        <SearchInput/>
    
        <h3>filters</h3>

        <Dropdown name="price">
          <RangeInput name="price" 
                      fromOnChange={(e) => handleNumberFromChange(e, "price")}
                      toOnChange={(e) => handleNumberToChange(e, "price")}
                      fromValue={minPrice} 
                      toValue={maxPrice}
                      />
        </Dropdown>

        <Dropdown name="age">
          <RangeInput name="age"
                      fromOnChange={(e) => handleNumberFromChange(e, "age")}
                      toOnChange={(e) => handleNumberToChange(e, "age")}
                      fromValue={minAge} 
                      toValue={maxAge}
                      />
        </Dropdown>

        <Dropdown name="breed">
          {[...breeds].map((breed, index) => <CheckboxContainer checked={handleCheckedStatus("breeds", breed)} 
                                                                onChange={(e) => handleCheckedBox(e, "breeds", breed)} 
                                                                key={index} 
                                                                name={breed}/>)}
        </Dropdown>
        
        <Dropdown name="colour">
          {[...colours].map((colour, index) => <CheckboxContainer checked={handleCheckedStatus("colours", colour)}
                                                                  onChange={(e) => handleCheckedBox(e, "colours", colour)}
                                                                  key={index} 
                                                                  name={colour}/>)}
        </Dropdown>
  
    </div>
  )
}

