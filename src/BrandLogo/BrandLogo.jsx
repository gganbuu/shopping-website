import React from 'react'
import styles from './BrandLogo.module.css';


export const BrandLogo = () => {
  return (
    <div className={styles.brandLogoContainer}>
        <div className={styles.brandLogoShape}></div>
        <h1>yarn</h1>
    </div>
  )
}
