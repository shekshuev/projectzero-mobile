export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN'

export const setAccessToken = accessToken => dispatch => {
    dispatch({
        type: SET_ACCESS_TOKEN,
        payload:accessToken
    })
}

export const setRefreshToken = refreshToken => dispatch => {
    dispatch({
        type: SET_REFRESH_TOKEN,
        payload:refreshToken
    })
}


