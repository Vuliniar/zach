import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (msg, msgType) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, msgType, id }
    });

    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), 3000);
};