import { SET_QUEUE } from "./queueActions";
import { DELETE_ITEM_FROM_QUEUE } from "./queueActions";
import { DELETE_ALL_FROM_QUEUE } from "./queueActions";

const initialStateQueue = {
    queue:null
}

const queueReducer = ( state = initialStateQueue, action )=>{
    switch ( action.type ) {
        case SET_QUEUE:
            if(state.queue === null){
                const newQueue = []
                newQueue.push(action.payload)
                return { ...state, queue:newQueue }
            }
            else{
                return { ...state, queue: [...state.queue, action.payload] }
            }

        case DELETE_ITEM_FROM_QUEUE:
            const ind = state.queue.findIndex( (item)=>item.surveyCurr.instanceId === action.payload )
            if(ind!==-1) {
                const newQueue = state.queue
                newQueue.splice(ind, 1)
                if(newQueue.length===0){
                    return {queue: null}
                }
                else{
                    return {...state, queue: newQueue}
                }
            }
            else {
                return state
            }

        case DELETE_ALL_FROM_QUEUE:
            return {queue: null}

        default:
            return state
    }
}

export { queueReducer };
