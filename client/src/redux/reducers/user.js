import { GET_USERS, ADD_USER, ADD_HOBBY, REMOVE_HOBBY } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_USERS:
            return [
                ...state,
                ...payload
            ]
        case ADD_USER:
            return [
                ...state,
                payload
            ]
        case ADD_HOBBY:
        case REMOVE_HOBBY:
            const newState = JSON.parse(JSON.stringify(state));
            newState[payload.userID - 1] = payload.data;
            return [
                ...newState
            ]
        default:
            return state;
    }
}