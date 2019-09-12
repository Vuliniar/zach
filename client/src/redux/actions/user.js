import axios from 'axios';
import { GET_USERS, ADD_USER, ADD_HOBBY, REMOVE_HOBBY } from './types';
import { setAlert } from './alert';

// Defining config with headers. We could have created axios default interceptors
// but for this small test there is no need.
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('/users');

        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (err) {
        dispatch(setAlert('Server error! Could not get users.'));
    }
}

export const addUser = (name) => async dispatch => {
    const body = JSON.stringify({ name, hobbies: [] });

    try {
        const res = await axios.post('/users', body, config);

        dispatch({
            type: ADD_USER,
            payload: res.data
        });

        dispatch(setAlert('User added!', 'success'));
    } catch (err) {
        dispatch(setAlert('Could not add the user', 'warning'));
    }
};

export const handleHobby = (name, userID, hobbies, adding = true) => async dispatch => {
    const body = JSON.stringify({ name, hobbies });

    try {
        const res = await axios.put(`/users/${userID}`, body, config);

        dispatch({
            type: adding ? ADD_HOBBY : REMOVE_HOBBY,
            payload: {
                userID,
                data: res.data
            }
        });

        dispatch(setAlert(adding ? 'Hobby added!' : 'Hobby removed!', 'success'));
        
    } catch (err) {
        dispatch(setAlert(adding ? 'Could not add the hobby' : 'Could not remove the hobby', 'warning'));
    }
};