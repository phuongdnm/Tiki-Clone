import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS} from './productActions'

import {message} from 'antd';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_USER_INFO = 'SET_CURRENT_USER_INFO';

const api_url = process.env.REACT_APP_API;


// 🔓 Register User
export const registerUser = (userData, history, closeModal) => async (dispatch) => {

    const url = `${api_url}/api/v1/auth/register`;
    await axios.post(url, userData)
        .then(res => {
            if (res.data.success) {
                dispatch(loginUser(userData, history, closeModal));
                message.success("Signed up successfully")
            } else {
                let errors;
                if (res.data.error === "Duplicated field value in body") {    // username already exists
                    errors = {"username": "Username/Email already exists!"}
                } else {
                    let res_ = res.data.error;
                    let res__ = res_.replace('User validation failed: ', '{"') + '"}';
                    let errObj = res__.replace(new RegExp(': ', 'g'), '" : "').replace(new RegExp(', ', 'g'), '", "');
                    errors = JSON.parse(errObj);
                }
                dispatch({
                    type: GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: errors //sets payload to errors coming from server
                });
            }
        })     // redirect to login
        .catch(err => {

                dispatch({
                    type: GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    // payload: {}//sets payload to errors coming from server
                    payload: err.response.data //sets payload to errors coming from server
                });
            }
        );


};

// 🔓  Login - Get user token
export const loginUser = (userData, history, closeModal) => async (dispatch) => {
    // axios.defaults.withCredentials = true;
    const url = `${api_url}/api/v1/auth/login`;
    await axios.post(url, userData)
        .then(res => {
            if (res.data.success) {
                //Save to localStorage
                const {token} = res.data;
                // Set token t  o localStorage
                localStorage.setItem('jwtToken', token);
                // Set token to Auth header. Apply Authorization token to header to every request
                setAuthToken(token);
                // the token includes user info but it is encoded
                // to decode we use jwt-decode
                //Decode token to get user data
                const decoded = jwt_decode(token);
                // Set current user
                dispatch(setCurrentUser(decoded));
                dispatch(setCurrentUserInfo());
                message.success("Login Successful");
                closeModal();
                history.push('/')
            } else {
                let errors;
                if (res.data.error === "Invalid credentials") {    // username already exists
                    errors = {"username": "Username or password is not correct"}
                } else if (res.data.error === "Please provide an email and password") {
                    errors = {"username": "Please provide an email and password!"}
                } else if(res.data.error === "Password is not correct"){
                    errors = {"username": "Password is not correct!"}
                }
                else {
                    let res_ = res.data.error;
                    let res__ = res_.replace('User validation failed: ', '{"') + '"}';
                    let errObj = res__.replace(new RegExp(': ', 'g'), '" : "').replace(new RegExp(', ', 'g'), '", "');
                    errors = JSON.parse(errObj);
                }
                dispatch({
                    type: GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: errors //sets payload to errors coming from server
                });
            }
        })
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err //sets payload to errors coming from server
                })
            }
        );
};



// 🔒 get user info
export const setCurrentUserInfo = () => async (dispatch) => {
    let url = `${api_url}/api/v1/auth/me`;

    axios.get(url)
        .then(res => {
            if (res.data.success) {
                dispatch( {
                    type: SET_CURRENT_USER_INFO,
                    payload: res.data.data
                })
            } else {
                // console.log(res);
            }

        })
        .catch(err => {
            // console.log(err);
        })


};

// 🔒 Set logged  in user
export const setCurrentUser = (decoded) =>  (dispatch) => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
    });
    dispatch(setCurrentUserInfo())
};

// 🔒 Log user out
export const logoutUser = () => async (dispatch) => {
    const url = `${api_url}/api/v1/auth/logout`;
    await axios.get(url)
        .then(res => {
            message.success("Logged user out");
            // Remove token from localStorage
            localStorage.removeItem('jwtToken');
            // Remove auth header for future requests
            setAuthToken(false);
            // Set current user to {} which will set isAuthenticated to false
            dispatch(setCurrentUser({}))

        })
        .catch(err => {
                message.error("Unable to log user out");
            }
        );
};

// 🔓 Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    let url = `${api_url}/api/v1/auth/forgotpassword`;
    await axios.post(url, email)
        .then(res => {
            if (res.data.success) {
                message.success("Email has been sent!");

            } else {
                message.error("Unable to send email!");
            }

        })
        .catch(err => {
            // console.log(err);
            message.error("Unable to send email!");
        })
};


// 🔓 Reset Password
export const resetPassword = (password, resetToken) => async (dispatch) => {
    let url = `${api_url}/api/v1/auth/resetpassword/${resetToken}`;
    await axios.put(url, password)
        .then(res => {
            if (res.data.success) {
                message.success("Password has been changed!");
                dispatch(logoutUser())

            } else {
                message.error("Unable to change password!");
            }

        })
        .catch(err => {
            // console.log(err);
            message.error("Unable to change password!");
        })
};

// 🔒 update User information
export const updateUserInfo = (userDetails) => async (dispatch) => {
    let url = `${api_url}/api/v1/auth/updatedetails`;
    await axios.put(url, userDetails)
        .then(res => {
            if (res.data.success) {
                dispatch(setCurrentUserInfo());
                message.success("User Info updated!");

            } else {
                message.error("Failed to update user info!");
            }

        })
        .catch(err => {
            // console.log(err);
            message.error("Failed to update user info!");
        })
};

// 🔒 change Password
export const changePassword = (password) => async (dispatch) => {
    let url = `${api_url}/api/v1/auth/updatepassword`;
    await axios.put(url, password)
        .then(res => {
            if (res.data.success) {
                message.success("User password updated!");
                dispatch(logoutUser())

            } else {
                message.error("Failed to update user password!");
            }

        })
        .catch(err => {
            // console.log(err);
            message.error("Failed to update user password!");
        })
};

