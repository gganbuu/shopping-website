import { cartReducer, cartInitialState } from "../src/Cart/cartReducer";
import { useReducer } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from 'react'

const Test = () => {
    const [cartState, cartDispatch] = useReducer(cartReducer, [])
    return (
        <>
            <ul aria-label="cartState">{cartState && cartState.map(name => <li key={name}>{name}</li>)}</ul>

            <button aria-label="add" onClick={() => cartDispatch({type: "added-item", name: "Milo"})}>add</button>
            <button aria-label="add2" onClick={() => cartDispatch({type: "added-item", name: "Luna"})}>add2</button>
            <button aria-label="remove" onClick={() => cartDispatch({type: "removed-item", name: "Milo"})}>remove</button>
            <button aria-label="clearall" onClick={() => cartDispatch({type: "cleared-all"})}>clear all</button>
        </>
    )
}


describe("testing cart dispatch functions", () => {
    test("test add items", async () => {
        render(<Test/>)
        await userEvent.click(screen.getByRole('button', {name: "add"}))
        expect(screen.getByText("Milo")).toBeInTheDocument()
        
    })
    test("test remove items", async () => {
        render(<Test/>)
        await userEvent.click(screen.getByRole('button', {name: "add"}))
        expect(screen.queryByText("Milo")).toBeInTheDocument()

        await userEvent.click(screen.getByRole('button', {name: "remove"}))
        expect(screen.queryByText("Milo")).not.toBeInTheDocument()
    })
    test("remove all items", async () => {
        render(<Test/>)
        await userEvent.click(screen.getByRole('button', {name: "add"}))
        await userEvent.click(screen.getByRole('button', {name: "add2"}))
        expect(screen.queryByText("Milo")).toBeInTheDocument()
        expect(screen.queryByText("Luna")).toBeInTheDocument()

        await userEvent.click(screen.getByRole('button', {name: "clearall"}))
        expect(screen.queryByText("Milo")).not.toBeInTheDocument()
        expect(screen.queryByText("Luna")).not.toBeInTheDocument()
    })
})