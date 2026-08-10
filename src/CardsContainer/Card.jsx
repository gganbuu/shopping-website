import React from 'react'
import styles from './Card.module.css'
import MiloImage from '../assets/milo_cropped.jpg'
import { Plus } from 'lucide-react'


const Card = ({cat}) => {
  return (
    <div className={styles.cardContainer}>
      <img src={cat.image_url} alt={cat.name}/>
      <div className={styles.nameBreed}>
        <p>meet <strong>{cat.name}!</strong></p>
        <em>{cat.breed}</em>
      </div>
      <div className={styles.buttonContainer}>
        <p>${cat.cost}</p>
        <button><Plus/></button>
      </div>
    </div>
  )
}

export default Card