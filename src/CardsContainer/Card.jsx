import React from 'react'
import styles from './Card.module.css'
import { Plus } from 'lucide-react'
import { Link } from 'react-router'

const Card = ({cat}) => {
  return (
    <div className={styles.cardContainer}>
      <Link to={`../adopt/${cat.name}`}>
        <img className={styles.cardImage}
        src={cat.image_url} 
        alt={cat.name}/>
      </Link>
      <div className={styles.nameBreed}>
        <p><strong>{cat.name}</strong></p>
        <em>{cat.breed}</em>
      </div>
      <div className={styles.buttonContainer}>
        <p>${cat.price}</p>
        <button><Plus/></button>
      </div>
    </div>
  )
}

export default Card