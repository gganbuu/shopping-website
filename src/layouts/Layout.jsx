import { NavigationBar } from "./NavigationBar/NavigationBar"
import { useContext, useReducer } from 'react';
import { CartProvider } from '../context/CartContext';
import { Outlet } from "react-router";
import { cartReducer, cartInitialState } from "../reducer/cartReducer";

export const Layout = () => {

    return (
        <CartProvider>
            <header>
                <NavigationBar/>
            </header>
            <Outlet/>
        </CartProvider>
    )
}