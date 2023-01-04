export const SET_LOCATION = 'SET_LOCATION'

export const setLocation = location => dispatch => {
    dispatch({
        type: SET_LOCATION,
        payload:location
    })
}
