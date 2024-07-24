const initialState = {
    displayValue: '0',
    currentFunction: "none",
    storedValue: 0,
    decimalMode: false,
    clearRegister: false
}
  
// Use the initialState as a default value
export default function rootReducer(state = initialState, action: any) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {   // Do something here based on the different types of actions
        case 'setDisplayValue':
            return {
                ...state,
                displayValue: action.payload
            }
        case 'setCurrentFunction':
            return {
                ...state,
                currentFunction: action.payload
            }
        case 'setStoredValue':
            return {
                ...state,
                storedValue: action.payload
            }
        case 'setDecimalMode':
            return {
                ...state,
                decimalMode: action.payload
            }
        case 'setClearRegister':
            return {
                ...state,
                clearRegister: action.payload
            }
        default:   // If this reducer doesn't recognize the action type, or doesn't care about this specific action, return the existing state unchanged
            return state
    }
}