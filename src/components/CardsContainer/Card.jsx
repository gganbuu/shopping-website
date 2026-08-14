import React from 'react'
import styles from './Card.module.css'
import { Plus } from 'lucide-react'
import { Link } from 'react-router'
import { useContext } from 'react'
import { CartContext, CartDispatchContext } from '../../context/CartContext'
import { API_URL } from '../../services/config'

const Card = ({cat, disabled}) => {
  const cartDispatch = useContext(CartDispatchContext)
  const cartState = useContext(CartContext)
  const cartSetState = new Set([...cartState])
  return (
    <div className={styles.cardContainer}>
      <Link to={`../adopt/${cat.name}`}>
        <img className={styles.cardImage}
        src={`${API_URL}${cat.image_url}`} 
        alt={cat.name}/>
      </Link>
      <div className={styles.nameBreed}>
        <p><strong>{cat.name}</strong></p>
        <em>{cat.breed}</em>
      </div>
      <div className={styles.buttonContainer}>
        <p>${cat.price}</p>
        <button disabled={cartSetState.has(cat.name)} 
                onClick={() => cartDispatch({type:"added-item", name: cat.name})}>
                  <Plus/>
        </button>
      </div>  
    </div>
  )
}

export default Card