// file name can be anything
import {SET_CURRENT_USER, SET_CURRENT_USER_INFO} from '../actions/authActions'

import isEmpty from '../../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    userData: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:  // to set current user in state
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),   // if isEmpty is true we are not authenticated and vice versa
                user: action.payload
            };
        case SET_CURRENT_USER_INFO:
            return{
                ...state,
               userData: action.payload
            };
        default:
            return state;
    }
}
