export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const GET_CART = 'GET_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product: product
    }
};

export const removeFromCart = productId => {
    return {
        type: REMOVE_FROM_CART,
        pid: productId
    }
};

export const deleteFromCart = productId => {
    return {
        type: DELETE_FROM_CART,
        pid: productId
    }
};
export const getCart = () => {
    let cart = {};
    try {
        cart = JSON.parse(localStorage.getItem('cart'));
    }catch (e) {
        console.log(e);
    }
    return {
        type: GET_CART,
        cart: cart
    }
};

export const clearCart = ()=>{
    try {
        localStorage.removeItem('cart');
    }catch (e) {
        console.log(e);
    }
    return{
        type: CLEAR_CART,
        cart: null
    }
};
