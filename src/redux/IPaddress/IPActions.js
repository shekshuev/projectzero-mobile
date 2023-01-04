export const SET_IP = 'SET_IP'

export const setIP = IP => dispatch => {
    dispatch({
        type: SET_IP,
        payload:IP
    })
}
