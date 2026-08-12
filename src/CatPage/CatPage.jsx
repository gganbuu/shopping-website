import React from 'react'
import styles from './CatPage.module.css'
import { useLoaderData } from 'react-router'
import { CornerDownLeft } from 'lucide-react'
import { NavigationBar } from '../NavigationBar/NavigationBar'
import { Link } from 'react-router'
import { Plus } from 'lucide-react'

export const CatPage = () => {
    const cat = useLoaderData();
    return (
        <div className={styles.catPage}>
            <header>
                <NavigationBar/>
            </header>
            <main className={styles.catPageSection}>
                <Link to='/adopt' className={styles.returnButton}>
                    <CornerDownLeft />
                </Link>
                <section className={styles.catPageContainer}>
                    <img className={styles.catImage}
                    src={cat.image_url}/>
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
                            <button className={styles.addToCart}>
                                <Plus/>
                            </button>
                        </div>
                    </article>
                </section>
            </main>
        </div>
        

    )
}

