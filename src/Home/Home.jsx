import React from 'react'
import styles from './Home.module.css'
import { NavigationBar } from '../NavigationBar/NavigationBar';
import heroCat from '../assets/heroCat.png'

export const Home = () => {
  return (
    <>
        <main>
        
          <section className={styles.heroSection}>
            <div className={styles.heroText}>
              <h1>
                <span className={styles.heroBlue}>yarn</span> — for all of your cat needs
              </h1>
              <h2>
                shop now
              </h2>
            </div>
            <img className={styles.heroCat} src={heroCat}/>
          </section>

          <section>

          </section>
        </main>
    </>
  )
}
