import React from 'react'
import { BrandLogo } from '../BrandLogo/BrandLogo'
import styles from './NavigationBar.module.css'

import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'


export const NavigationBar = () => {
  return (
    <nav>
      <div className={styles.navInnerContainer}>
        <BrandLogo/>
        <div className={styles.links}>
          <Link to="about">About</Link>
          <Link to="/">Home</Link>
          <Link to="shop">Shop</Link>
        </div>
        <div className={styles.loginCart}>
          <ShoppingBag/>
          Log In / Sign Up
        </div>
      </div>
    </nav>
  )
}
