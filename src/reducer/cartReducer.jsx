export const cartInitialState = []

export const cartReducer = (state, action) => {
    switch (action.type) {
        case "added-item": {
            const newState = [...state]
            newState.push(action.name)
            return newState
        }
        case "removed-item": {
            const newState = [...state]
            return newState.filter(name => name != action.name)
        }
        case "cleared-all": {
            return []
        }
    }
} 