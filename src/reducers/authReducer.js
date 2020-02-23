import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    SESSION_EXPIRED
} from '../actions/types';

const initialState = {

    token: localStorage.getItem('token'),
    isAuthinticated: false,
    isLoading: false,
    msg: '',
    id: localStorage.getItem('id'),
    first_name: localStorage.getItem('first_name'),
    last_name: localStorage.getItem('last_name'),
    email: localStorage.getItem('email')
}

export default function (state = initialState, action) {
    switch (action.type) {

        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case USER_LOADED:
            return {
                ...state,
                isAuthinticated: true,
                isLoading: false,
                user: action.payload
            }

        /**
                         * Setting user data into the localstorage for refresh retaining purpose
                         */
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('id', action.payload.id);
            localStorage.setItem('first_name', action.payload.first_name);
            localStorage.setItem('last_name', action.payload.last_name);
            localStorage.setItem('email', action.payload.email);
            return {
                ...state,
                ...action.payload,
                isAuthinticated: true,
                isLoading: false,
                msg: action.payload.msg,
            }


        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case SESSION_EXPIRED:
            localStorage.clear();
            return {
                ...state,
                isAuthinticated: false,
                isLoading: false,
                token: null,
                msg: null,
                id: null,
                first_name: null,
                last_name: null,
                email: null
            }

        default:
            return state;
    }
}