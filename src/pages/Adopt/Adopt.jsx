import React from 'react'
import styles from './Adopt.module.css';
import FilterBar from '../../components/FilterBar/FilterBar.jsx';
import CardsContainer from '../../components/CardsContainer/CardsContainer.jsx';
import { filterCats } from './filterCats.js';
import { filtersInitialState, filtersReducer } from '../../hooks/filtersReducer.jsx';

import { useEffect, useState, useReducer } from 'react';
import { useLoaderData } from 'react-router';


export const Adopt = () => {
  const cats = useLoaderData();
  const [filtersState, filtersDispatch] = useReducer(filtersReducer, filtersInitialState);
  const filteredCats = filterCats(cats, filtersState)

  

  return (
    <div className={styles.shopPage}>
      <main className={styles.shopSection}>
        <FilterBar cats={cats} filtersDispatch={filtersDispatch} filtersState={filtersState}/>
        <CardsContainer cats={filteredCats}/>
      </main>
    </div>
  )
}


