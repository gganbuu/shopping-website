import { createContext, useReducer } from "react";
import { cartReducer, cartInitialState } from "../reducer/cartReducer";

export const CartContext = createContext(null)
export const CartDispatchContext = createContext(null)

export function CartProvider({ children }) {
    const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
    return (
        <CartContext value={cartState}>
            <CartDispatchContext value={cartDispatch}>
                {children}
            </CartDispatchContext>
        </CartContext>
    )

    
}
