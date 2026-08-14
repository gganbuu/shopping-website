import React, { useContext } from 'react'
import styles from './CatPage.module.css'
import { useLoaderData } from 'react-router'
import { CornerDownLeft } from 'lucide-react'
import { Link } from 'react-router'
import { Plus } from 'lucide-react'
import { CartContext, CartDispatchContext } from '../../context/CartContext'

import { API_URL } from '../../services/config'

export const CatPage = () => {
    const cat = useLoaderData();
    const cartDispatch = useContext(CartDispatchContext);
    const cartState = useContext(CartContext);
    const cardSetState = new Set([...cartState]);
    return (
        <div className={styles.catPage}>
            <main className={styles.catPageSection}>
                <Link to='/adopt' className={styles.returnButton}>
                    <CornerDownLeft />
                </Link> 
                <section className={styles.catPageContainer}>
                    <img className={styles.catImage}
                    src={`${API_URL}${cat.image_url}`}/>
                    <article className={styles.catDetails}>
                        <h1>{cat.name}</h1>
                        <div>
                            <h2>Age</h2>
                            <h2 className={styles.regularFont}>{cat.age}</h2>
                        </div>
                        <div>
                            <h2>Breed</h2>
                            <h2 className={styles.regularFont}>{cat.breed}</h2>
                        </div>
                        <div>
                            <h2>Colour</h2>
                            <h2 className={styles.regularFont}>{cat.colour}</h2>
                        </div>
                        <div>
                            <h2>Description</h2>
                            <h2 className={styles.regularFont}>{cat.description}</h2>
                        </div>
                        <div>
                            <h2>Adoption Fee</h2>
                            <h2 className={styles.regularFont}>$ {cat.price}</h2>
                        </div>

                        <div className={styles.buttonContainer}>
                            <h2 className={styles.regularFont}>adopt</h2>
                            <button 
                                    className={styles.addToCart}
                                    disabled={cardSetState.has(cat.name)}
                                    onClick={() => cartDispatch({type:"added-item", name: cat.name})}>
                                <Plus/>
                            </button>
                        </div>
                    </article>
                </section>
            </main>
        </div>
        

    )
}

