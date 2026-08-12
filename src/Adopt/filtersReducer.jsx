export const filtersInitialState = {breeds: new Set([]),
                                    colours: new Set([]),
                                    price: {min: null, max: null},
                                    age: {min: null, max: null},
                                   }

export const filtersReducer = (state, action) => {
    switch(action.type) {
        case 'added-category-filter': {
            const categoryState = new Set(state[action.category])
            categoryState.add(action.value)
            return {...state, [action.category]: categoryState}
        }
        case 'removed-category-filter': {
            const categoryState = new Set(state[action.category])
            categoryState.delete(action.value)
            return {...state, [action.category]: categoryState}
        }
        case 'added-value-from': {
            const categoryState = {...state[action.category]}
            categoryState.min = action.value
            return {...state, [action.category]: categoryState}
        }
        case 'added-value-to': {
            const categoryState = {...state[action.category]}
            categoryState.max = action.value
            return {...state, [action.category]: categoryState}
        }
        case 'clear-all-filters': {
            // return filtersInitialState;
        }
    }
    
}


