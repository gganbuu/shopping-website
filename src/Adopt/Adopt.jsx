import React from 'react'
import styles from './Adopt.module.css';
import { NavigationBar } from '../NavigationBar/NavigationBar.jsx';
import FilterBar from '../FilterBar/FilterBar.jsx';
import CardsContainer from '../CardsContainer/CardsContainer.jsx';
import { filterCats } from './filterCats.js';
import { filtersInitialState, filtersReducer } from './filtersReducer.jsx';

import { useEffect, useState, useReducer } from 'react';
import { useLoaderData } from 'react-router';


export const Adopt = () => {
  const cats = useLoaderData();
  const [filtersState, filtersDispatch] = useReducer(filtersReducer, filtersInitialState);
  const filteredCats = filterCats(cats, filtersState)

  

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


