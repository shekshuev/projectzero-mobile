import { SET_SURVEY } from "./surveyActions";

const initialStateSurvey = {
    survey:''
}

const surveyReducer = ( state = initialStateSurvey, action )=>{
    switch (action.type) {
        case SET_SURVEY:
            return { ...state, survey:action.payload }
        default:
            return state
    }
}

export {surveyReducer};
