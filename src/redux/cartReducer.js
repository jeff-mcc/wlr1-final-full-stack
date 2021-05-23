//initial state
const initialState = {
    cart: []
}

//action types
const SET_CART = "SET_CART"

//builders
export function setCart(cart){
    return {
        type: SET_CART,
        payload: cart
    }
}

//reducer
export default function cartReducer(state=initialState,action){
    switch(action.type){
        case SET_CART:
            return {...state,cart: action.payload}
        default:
            return {...state}
    }
}