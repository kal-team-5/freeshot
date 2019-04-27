import { GET_ERRORS } from './types';
import axios from 'axios';

//Register user
export const registerUser = (userData, history) => dispatch => {
    axios.post('/freeshot/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}