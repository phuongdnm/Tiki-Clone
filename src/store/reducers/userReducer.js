import {GET_ALL_USERS, GET_USER_BY_ID} from "../actions/userActions";

const initialState = {
    users : null,
    currentUser: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                users: action.users
            };
        case GET_USER_BY_ID:
            return {
                ...state,
                currentUser: action.user
            };

        default:
            return state;
    }
}
