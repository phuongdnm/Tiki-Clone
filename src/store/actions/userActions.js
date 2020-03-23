import axios from 'axios';
import {message} from 'antd';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';


const api_url = process.env.REACT_APP_API;

// 🔒 admin
export const getAllUsers = () => async (dispatch) => {
    const url = `${api_url}/api/v1/users`;
    console.log(url);
    console.log(`auth is`);

    await axios.get(url)
        .then(res => {
            console.log(res);
            if (!res.data.success) {
                return message.error("Error getting all users");
            }
            dispatch({
                type: GET_ALL_USERS,  //this call test dispatch. to dispsatch to our reducer
                users: res.data.data
            });

            message.success("Got all users");

        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error getting all users");
            }
        );
};

// 🔒 admin
export const getUserById = (id) => async (dispatch) => {

    const url = `${api_url}/api/v1/users/${id}`;
    console.log(url);
    await axios.get(url)
        .then(res => {
            console.log(res);
            if (!res.data.success) {
                return message.error("Error getting user");
            }
            dispatch({
                type: GET_USER_BY_ID,  //this call test dispatch. to dispsatch to our reducer
                user: res.data.data
            });

            return message.success("Got user");
        })
        .catch(err => {
                // axios.defaults.headers.common['Authorization'] = axios.defaults.headers.common['Authorization'].slice(7);
                console.log('Error' + err);
                return message.error("Error getting user");
            }
        );
};

// 🔒 admin
export const createNewUser = (user) => async (dispatch) => {
    const url = `${api_url}/api/v1/users`;
    console.log(url);
    await axios.post(url, user)
        .then(res => {
            console.log(res);
            if (!res.data.success) {
                if (res.data.error === "Duplicated field value in body") {    // username already exists
                    message.destroy();
                    return message.error("Username/Email already exists!");
                }
                message.destroy();
                return message.error("Error creating user");
            }
            dispatch(getAllUsers());
            message.destroy();
            return message.success("User created successfully");
        })
        .catch(err => {
                console.log('Error' + err);
                message.destroy();
                return message.error("Error creating user");
            }
        );
};

// 🔒 admin
export const updateUserById = (user, userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/users/${userId}`;
    console.log(url);
    await axios.put(url, user)
        .then(async (res) => {
            console.log(res);
            if (!res.data.success) {
                message.destroy();
                return message.error("Error updating User");
            }
            await dispatch(getAllUsers());
            message.destroy();
            message.success("User updated successfully");
        })
        .catch(err => {
                console.log('Error' + err);
                message.destroy();
                message.error("Error updating User");
            }
        );
};


// 🔒 admin
export const deleteUserById = (userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/users/${userId}`;
    console.log(url);
    await axios.delete(url)
        .then(res => {
            console.log(res);
            if (!res.data.success) {
                message.destroy();
                return message.error("Error deleting user");
            }
            dispatch(getAllUsers());
            message.destroy();
            message.success("User deleted successfully");
        })
        .catch(err => {
                console.log('Error' + err);
            message.destroy();
            message.error("Error deleting user");
            }
        );
};

