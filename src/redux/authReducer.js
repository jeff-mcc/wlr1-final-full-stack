//initial state
const initialState = {
    user: null
}

//action types
const SET_USER = "SET_USER"

//action builders
export function setUser(user){
    return {
        type: SET_USER,
        payload: user
    }
}

//reducer
export default function authReducer(state=initialState,action){
    switch(action.type){
        case SET_USER:
            return {...state,user: action.payload}
        default:
            return {...state}
    }
}