import {GET_TOP_SOLD_PRODUCTS, GET_TOP_SOLD_PRODUCTS_OF_A_SHOP} from "../actions/statsActions";

const initialState = {
    topProducts : null,
    topProductsOfShop: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TOP_SOLD_PRODUCTS:
            return {
                ...state,
                topProducts: action.topProducts
            };
        case GET_TOP_SOLD_PRODUCTS_OF_A_SHOP:
            return {
                ...state,
                topProductsOfShop: action.productsOfShop
            };

        default:
            return state;
    }
}
