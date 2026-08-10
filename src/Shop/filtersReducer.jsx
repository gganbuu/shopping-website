export const filtersInitialState = {breeds: new Set([]),
                                    colours: new Set([]),
                                    price: [],
                                    age: [],
                                   }

export const filtersReducer = (state, action) => {
    switch(action.type) {
        case 'added-filter': {
            const categoryState = new Set(state[action.category])
            categoryState.add(action.value)
            return {...state, [action.category]: categoryState}
        }
        case 'removed-filter': {
            const categoryState = new Set(state[action.category])
            categoryState.delete(action.value)
            return {...state, [action.category]: categoryState}
        }
        case 'clear': {
            return filtersInitialState;
        }
    }
    
}


