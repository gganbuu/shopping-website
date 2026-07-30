import React from 'react'
import styles from './Shop.module.css';
import { NavigationBar } from '../ NavigationBar/NavigationBar';
import FilterBar from '../FilterBar/FilterBar';
import CardsContainer from '../CardsContainer/CardsContainer';

export const Shop = () => {
  return (
    <div className={styles.shopPage}>
      <header>
        <NavigationBar/>
      </header>
      <main className={styles.shopSection}>
        <FilterBar/>
        <CardsContainer/>
      </main>
    </div>
  )
}

