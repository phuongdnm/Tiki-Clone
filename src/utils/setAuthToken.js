import axios from 'axios';

axios.defaults.validateStatus = (status) => {
    return status < 600; // Reject only if the status code is greater than or equal to 500
};

const setAuthToken = (token) => {
    if (token) {
        // Apply Authorization token to header to every request
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.common['Bearer'] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
        delete axios.defaults.headers.common['Bearer'];
    }
};

export default setAuthToken;
