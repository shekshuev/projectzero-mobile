export const SET_SURVEY = 'SET_SURVEY'

export const setSurvey = survey => dispatch => {
    dispatch({
        type: SET_SURVEY,
        payload:survey
    })
}
