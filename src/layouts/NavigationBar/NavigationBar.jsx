import React from 'react'
import { BrandLogo } from '../../components/BrandLogo/BrandLogo'
import styles from './NavigationBar.module.css'

import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'

export const NavigationBar = () => {
  const cartState = useContext(CartContext)
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
          <Link to="../cart">
            <div className={styles.shoppingBagContainer}>
              <ShoppingBag/>
              {cartState.length > 0 && (<div className={styles.shoppingBagCount}>{cartState.length}</div>)}
            </div>
          </Link>
          log in / sign up
        </div>
      </div>
    </nav>
  )
}
