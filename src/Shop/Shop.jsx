import React from 'react'
import styles from './Shop.module.css';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import FilterBar from '../FilterBar/FilterBar';
import CardsContainer from '../CardsContainer/CardsContainer';
import { getCats } from './getCats';

import { filtersInitialState, filtersReducer } from './filtersReducer.jsx';

import { useEffect, useState, useReducer } from 'react';


export const Shop = () => {
  const [cats, setCats] = useState([]);
  const [filtersState, filtersDispatch] = useReducer(filtersReducer, filtersInitialState);

  const filteredCats = cats.filter(cat => 
  (filtersState.breeds.size === 0 || filtersState.breeds.has(cat.breed)) &&
  (filtersState.colours.size === 0 || filtersState.colours.has(cat.colour))
  )

  useEffect(() => {
    let ignore = false;
    getCats().then(result => {
      if (!ignore) setCats(result ?? [])
    })
    return () => { ignore = true }
  }, [])

  return (
    <div className={styles.shopPage}>
      <header>
        <NavigationBar data-testid="navigationbar"/>
      </header>
      <main className={styles.shopSection}>
        <FilterBar cats={cats} filtersDispatch={filtersDispatch} filtersState={filtersState}/>
        <CardsContainer cats={filteredCats}/>
      </main>
    </div>
  )
}


