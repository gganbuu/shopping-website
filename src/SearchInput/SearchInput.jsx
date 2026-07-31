import React from 'react'
import styles from './SearchInput.module.css'
import { Search as SearchIcon } from 'lucide-react'

export const SearchInput = () => {
  return (
    <div className={styles.searchContainer}>
        <button><SearchIcon/></button> 
        <input type="text"
        placeholder="search for..."/>        
    </div>
  )
}

