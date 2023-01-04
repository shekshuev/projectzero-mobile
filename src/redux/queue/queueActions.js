export const SET_QUEUE = 'SET_QUEUE'
export const DELETE_ITEM_FROM_QUEUE = 'DELETE_FROM_QUEUE'
export const DELETE_ALL_FROM_QUEUE = 'DELETE_ALL_FROM_QUEUE'

export const setQueue = queue => dispatch => {
    dispatch({
        type: SET_QUEUE,
        payload:queue
    })
}

export const deleteItemFromQueue = item => dispatch => {
    dispatch({
        type: DELETE_ITEM_FROM_QUEUE,
        payload:item
    })
}

export const deleteAllFromQueue = (queue=[]) => dispatch => {
    dispatch({
        type: DELETE_ALL_FROM_QUEUE,
        payload:queue
    })
}
