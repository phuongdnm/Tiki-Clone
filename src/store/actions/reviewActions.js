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
    await axios.get(url)
        .then(res => {
            dispatch({
                type: GET_PRODUCT_REVIEWS,  //this call test dispatch. to dispsatch to our reducer
                reviews: res.data.data
            });

            // message.success("Got reviews");


        })
        .catch(err => {
                message.error("Error getting reviews");
            }
        );

};

// 🔓
export const getAllReviews = () => async (dispatch) => {
    const url = `${api_url}/api/v1/reviews`;
    await axios.get(url)
        .then(res => {
            dispatch({
                type: GET_ALL_REVIEWS,  //this call test dispatch. to dispsatch to our reducer
                reviews: res.data.data
            });
            // message.success("Got reviews");
        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error getting reviews");
            }
        );
};

export const getAllUserReviews = (userId) => async (dispatch) => {
    const url = `${api_url}/api/v1/reviews`;
    await axios.get(url)
        .then(res => {
            const myReviews = res.data.data.filter(review => review.user === userId);
            dispatch({
                type: GET_ALL_USER_REVIEWS,  //this call test dispatch. to dispsatch to our reducer
                reviews: myReviews
            });
            // message.success("Got reviews");
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
    await axios.get(url)
        .then(res => {
            dispatch({
                type: GET_SINGLE_REVIEW_BY_ID,  //this call test dispatch. to dispsatch to our reducer
                review: res.data.data
            });

            // message.success("Got review");


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

    await axios.post(url, review)
        .then(res => {

            if(!res.data.success) {
                return message.error("Error adding review");
            };
            dispatch(getProductReviews(productId));
            // message.success("Got review");
        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error adding review");
            }
        );

};

// 🔒
export const updateReviewById = (review, reviewId, productId, userId) => async (dispatch) => {

    const url = `${api_url}/api/v1/reviews/${reviewId}`;

    await axios.put(url, review)
        .then(res => {
            // axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
            if(!res.data.success) {
                return message.error("Error updating review");
            }
            if(productId !== undefined && userId !== undefined){
                dispatch(getProductReviews(productId));
                dispatch(getAllUserReviews(userId));
            }
            dispatch(getAllReviews());
            message.success("Updated review");
        })
        .catch(err => {
                // axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
                console.log('Error' + err);
                message.error("Error updating review");
            }
        );

};

// 🔒
export const deleteReviewById = (reviewId, productId, userId) => async (dispatch) => {

    const url = `${api_url}/api/v1/reviews/${reviewId}`;
    await axios.delete(url)
        .then(res => {
            if(!res.data.success) {
                return message.error("Error deleting review");
            };
            if(productId !== undefined && userId !== undefined){
                dispatch(getProductReviews(productId));
                dispatch(getAllUserReviews(userId));
            }
            dispatch(getAllReviews());
            message.success("Deleted review");
        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error deleting review");
            }
        );
};
