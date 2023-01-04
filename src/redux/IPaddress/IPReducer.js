import { SET_IP } from "./IPActions";

const initialStateIP = {
    IPaddress:''
}

const IPReducer = ( state = initialStateIP, action )=>{
    switch (action.type) {
        case SET_IP:
            return { ...state, IPaddress:action.payload }
        default:
            return state
    }
}

export {IPReducer};
