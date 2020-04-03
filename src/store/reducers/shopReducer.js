import {GET_ALL_SHOPS, GET_SHOP_BY_ID} from "../actions/shopActions";

const initialState = {
    shops : null,
    currentShop: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SHOPS:
            return {
                ...state,
                shops: action.shops
            };
        case GET_SHOP_BY_ID:
            return {
                ...state,
                currentShop: action.shop
            };

        default:
            return state;
    }
}
