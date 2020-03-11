import {
    GET_ALL_REVIEWS,
    GET_ALL_USER_REVIEWS,
    GET_PRODUCT_REVIEWS,
    GET_SINGLE_REVIEW_BY_ID
} from "../actions/reviewActions";

const initialState = {
    reviews: null,
    currentReview: null,
    allReviews: null,
    userReviews: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_REVIEWS:
            return {
                ...state,
                reviews: action.reviews
            };
        case GET_SINGLE_REVIEW_BY_ID:
            return {
                ...state,
                currentReview: action.review
            };
        case GET_ALL_REVIEWS:
            return {
                ...state,
                allReviews: action.reviews
            };
        case GET_ALL_USER_REVIEWS:
            return {
                ...state,
                userReviews: action.reviews
            };

        default:
            return state;
    }
}
