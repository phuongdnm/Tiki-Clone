import axios from 'axios';
import {message} from 'antd';

export const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS';
export const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';
export const GET_ALL_USER_REVIEWS = 'GET_ALL_USER_REVIEWS';
export const GET_SINGLE_REVIEW_BY_ID = 'GET_SINGLE_REVIEW_BY_ID';


const api_url = process.env.REACT_APP_API;

// 🔓
export const getProductReviews = (productId) => async (dispatch) => {

    const url = `${api_url}/api/v1/products/${productId}/reviews`;
    console.log(url);
    await axios.get(url)
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_PRODUCT_REVIEWS,  //this call test dispatch. to dispsatch to our reducer
                reviews: res.data.data
            });

            message.success("Got reviews");


        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error getting reviews");
            }
        );

};

// 🔓
export const getAllReviews = () => async (dispatch) => {
    const url = `${api_url}/api/v1/reviews`;
    console.log(url);
    await axios.get(url)
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_ALL_REVIEWS,  //this call test dispatch. to dispsatch to our reducer
                reviews: res.data.data
            });
            message.success("Got reviews");
        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error getting reviews");
            }
        );
};

export const getAllUserReviews = (userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/reviews`;
    console.log(url);
    await axios.get(url)
        .then(res => {
            console.log(res);
            const myReviews = res.data.data.filter(review => review.user === userId);
            dispatch({
                type: GET_ALL_USER_REVIEWS,  //this call test dispatch. to dispsatch to our reducer
                reviews: myReviews
            });
            message.success("Got reviews");
        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error getting reviews");
            }
        );
};


// 🔒
export const getReviewById = (reviewId) => async (dispatch) => {
    const url = `${api_url}/api/v1/reviews/${reviewId}`;
    console.log(url);
    await axios.get(url)
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_SINGLE_REVIEW_BY_ID,  //this call test dispatch. to dispsatch to our reducer
                review: res.data.data
            });

            message.success("Got review");


        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error getting review");
            }
        );

};

// 🔒
export const addNewReview = (review, productId) => async (dispatch) => {

    const url = `${api_url}/api/v1/products/${productId}/reviews`;
    axios.defaults.headers.common['Authorization'] = "Bearer "+axios.defaults.headers.common['Authorization'];

    console.log(url);
    await axios.post(url, review)
        .then(res => {
            axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
            console.log(res);
            dispatch(getProductReviews(productId));
            message.success("Got review");
        })
        .catch(err => {
            axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
            console.log('Error' + err);
                message.error("Error getting review");
            }
        );

};

// 🔒
export const updateReviewById = (review, reviewId, productId, userId) => async (dispatch) => {

    const url = `${api_url}/api/v1/reviews/${reviewId}`;
    axios.defaults.headers.common['Authorization'] = "Bearer "+axios.defaults.headers.common['Authorization'];

    console.log(url);
    await axios.put(url, review)
        .then(res => {
            console.log( axios.defaults.headers.common['Authorization'])
            axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
            console.log(res);
            dispatch(getProductReviews(productId));
            dispatch(getAllUserReviews(userId));
            message.success("Updated review");
        })
        .catch(err => {
            axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
            console.log('Error' + err);
                message.error("Error updating review");
            }
        );

};

// 🔒
export const deleteReviewById = (reviewId, productId, userId) => async (dispatch) => {

    const url = `${api_url}/api/v1/reviews/${reviewId}`;
    axios.defaults.headers.common['Authorization'] = "Bearer "+axios.defaults.headers.common['Authorization'];
    console.log(url);
    await axios.delete(url)
        .then(res => {
            axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
            console.log(res);
            dispatch(getProductReviews(productId));
            dispatch(getAllUserReviews(userId));
            message.success("Deleted review");
        })
        .catch(err => {
            axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
            console.log('Error' + err);
                message.error("Error deleting review");
            }
        );
};
