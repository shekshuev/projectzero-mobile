export const SET_LANGUAGE = 'SET_LANGUAGE'

export const setLanguage = language => dispatch => {
    dispatch({
        type: SET_LANGUAGE,
        payload:language
    })
}
