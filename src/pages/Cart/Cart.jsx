import React, { useEffect, useState, useContext } from 'react'
import styles from './Cart.module.css';
import { getCat, getCats} from '../../services/getCat.js';
import { Trash } from 'lucide-react';
import Card from '../../components/CardsContainer/Card';
import { CartContext, CartDispatchContext } from '../../context/CartContext.jsx';
import { ComponentButton } from '../../components/ComponentButton/ComponentButton.jsx';

export const Cart = () => {
    const cartState = useContext(CartContext)
    const cartDispatch = useContext(CartDispatchContext)

    const [cats, setCats] = useState([])

    const subTotal = cats.map(cat => cat.price)
                         .reduce((acc, curr) => acc + curr, 0);

    const GST = subTotal * 0.1;
    const handlingFees = 10;
    const miscFees = 5;
    const total = subTotal + GST + handlingFees + miscFees

    useEffect(() => {
        let ignore = false
        const loadCats = async () => {
            const results = await getCats(cartState)
            if (!ignore) setCats(results)
            
        }
        loadCats()
        return () => ignore = true
    }, [cartState])



    return (
        <main className={styles.cartContainer}>
            <div className={styles.adoptionCart}>
                <div className={styles.titleAndButtonContainer}>
                    <h1>Adoption Cart</h1>
                    <ComponentButton name="clear cart" handleClick={() => cartDispatch({type: "cleared-all"})}/>
                </div>
                {cats.map(cat => <AdoptionCard key={cat.name} cat={cat}/>)}
            </div>
            <div className={styles.checkOut}>
                <div className={styles.subTotalContainer}>
                    <span className={styles.subTotalTitle}>Subtotal</span>
                    <span className={styles.subTotalValue}>$ {subTotal}</span>
                    <span className={styles.GSTTitle}>GST (10%)</span>
                    <span className={styles.GSTValue}>$ {GST}</span>
                    <span className={styles.GSTTitle}>Handling fees</span>
                    <span className={styles.GSTValue}>$ {handlingFees}</span>
                    <span className={styles.GSTTitle}>Misc fees</span>
                    <span className={styles.GSTValue}>$ {miscFees}</span>
                </div>
                <hr />
                <div className={styles.totalContainer}>
                    <span>Total</span>
                    <span>$ {total}</span>
                </div>
            </div>
        </main>
    )
}

const AdoptionCard = ({cat}) => {
    const cartDispatch = useContext(CartDispatchContext)
    return (
        <div className={styles.adoptionCardContainer}>
            <div className={styles.adoptionCardInfo}>
                <div className={styles.adoptionCardImageName}>
                    <img src={cat.image_url} alt={cat.name}/>
                    <h2>{cat.name}</h2>
                </div>
                <span>$ {cat.price}</span>
            </div>
            <button onClick={() => cartDispatch({type: "removed-item", name: cat.name})}><Trash/></button>
        </div>
    )
}

