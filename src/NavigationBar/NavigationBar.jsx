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
          <Link to="../about">about</Link>
          <Link to="/">home</Link>
          <Link to="../adopt">adopt</Link>
        </div>
        <div className={styles.loginCart}>
          <ShoppingBag/>
          log in / sign up
        </div>
      </div>
    </nav>
  )
}
