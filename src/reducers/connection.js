import { CONNECTION_SET_STATUS } from "../actions/connection";


const initialState = {
    status: true
}


export const connectionReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONNECTION_SET_STATUS:
            return {
                ...state,
                status: action.payload,
            }
        default:
            return state;
    }
}