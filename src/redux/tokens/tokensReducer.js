import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from "./tokensActions";

const initialStateTokens = {
    accessToken:'',
    refreshToken:''
}

const tokensReducer = ( state = initialStateTokens, action )=>{
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return { ...state, accessToken:action.payload }
        case SET_REFRESH_TOKEN:
            return { ...state, refreshToken:action.payload }
        default:
            return state
    }
}

export {tokensReducer};

