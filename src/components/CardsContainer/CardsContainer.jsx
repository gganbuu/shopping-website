import React, { useContext } from 'react'
import styles from './CardsContainer.module.css'
import Card from './Card'


// just for creating styling 

const CardsContainer = ({cats}) => {
  
  return (
    <div className={styles.cardsContainer}>
      {cats.map(cat => {
        return <Card key={cat.name} cat={cat}></Card>
      })}
    </div>
  )
}

export default CardsContainer