import { SET_LOCATION } from "./locationActions";

const initialStateLocation = {
    location:''
}

const locationReducer = ( state = initialStateLocation, action )=>{
    switch (action.type) {
        case SET_LOCATION:
            return { ...state, location:action.payload }
        default:
            return state
    }
}

export {locationReducer};

