import { SET_LANGUAGE } from "./languageActions";

const initialStateLanguage = {
    language:'ru'
}

const languageReducer = ( state = initialStateLanguage, action )=>{
    switch (action.type) {
        case SET_LANGUAGE:
            return { ...state, language:action.payload }
        default:
            return state
    }
}

export {languageReducer};

