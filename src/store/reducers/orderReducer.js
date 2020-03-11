import {GET_SINGLE_ORDER_BY_ID, GET_ALL_ORDERS_OF_A_SHOP, GET_ALL_ORDERS, GET_MY_ORDERS} from "../actions/orderActions";

const initialState = {
    allOrders: null,
    allShopOrders: null,
    currentOrder: null,
    myOrders: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ORDERS_OF_A_SHOP:
            return {
                ...state,
                allShopOrders: action.orders
            };
        case GET_SINGLE_ORDER_BY_ID:
            return {
                ...state,
                currentOrder: action.order
            };
        case GET_ALL_ORDERS:
            return {
                ...state,
                allOrders: action.orders
            };
        case GET_MY_ORDERS:
            return {
                ...state,
                myOrders: action.orders
            };

        default:
            return state;
    }
}
