import {ADD_TO_CART, DELETE_FROM_CART, GET_CART, REMOVE_FROM_CART, CLEAR_CART} from "../actions/cartActions";
import CartItem from "../../models/cart-item";


const initialState = {
    items: {},
    totalAmount_discounted: 0,
    totalAmount: 0
};



export default (state=initialState, action)=>{
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prod = action.product;
            const prodId = prod.id;
            // const disPrice = prodPrice;
            let disPrice = parseFloat(prodPrice) - (parseFloat(prodPrice) * (parseFloat(prod.discount) / 100));
            if(isNaN(disPrice)){
                disPrice = prodPrice
            }

            let updatedOrNewCartItem;
            if(state.items[prodId]){
                // already have the item in the cart
                updatedOrNewCartItem= new CartItem(
                    state.items[addedProduct.id].quantity +1,
                    prodPrice,
                    disPrice,
                    prod,
                    prodId,
                    state.items[addedProduct.id].sum_discounted +  disPrice,
                    state.items[addedProduct.id].sum +  prodPrice
                    // state.items[addedProduct.id].sum + prodPrice
                );
            }else{
                // add new item
                updatedOrNewCartItem = new CartItem(1, prodPrice,  disPrice,  prod, prodId, disPrice, prodPrice);
            }
            let st =  {
                ...state,
                items: {...state.items, [prodId]: updatedOrNewCartItem},
                totalAmount_discounted: state.totalAmount_discounted + disPrice,
                totalAmount: state.totalAmount + prodPrice
            };
            localStorage.setItem('cart', JSON.stringify(st));

            return st;

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const currentQty = selectedCartItem.quantity;

            let updatedCartItems;
            if(currentQty > 1){
                // need to reduce it, not erase it
                const updatedCartItem = new CartItem(selectedCartItem.quantity -1, selectedCartItem.productPrice, selectedCartItem.discountedPrice, selectedCartItem.product,
                    selectedCartItem.productId, selectedCartItem.sum_discounted - selectedCartItem.discountedPrice, selectedCartItem.sum - selectedCartItem.productPrice);
                // selectedCartItem.productId, selectedCartItem.sum - selectedCartItem.productPrice);
                updatedCartItems = {...state.items, [action.pid]: updatedCartItem}
            }else {
                // erase it
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pid]     // delete product from object
            }
            let st_ =  {
                ...state,
                items: updatedCartItems,
                totalAmount_discounted: state.totalAmount_discounted - selectedCartItem.discountedPrice,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
                // totalAmount: state.totalAmount - selectedCartItem.productPrice
            };
            localStorage.setItem('cart', JSON.stringify(st_));
            return st_;
        case DELETE_FROM_CART:
            const selectedCartItem_ = state.items[action.pid];
            let updatedCartItems_;


            // erase it
            updatedCartItems_ = {...state.items};
            delete updatedCartItems_[action.pid];     // delete product from object
            let st__ =  {
                ...state,
                items: updatedCartItems_,
                totalAmount_discounted: state.totalAmount_discounted - selectedCartItem_.discountedPrice,
                totalAmount: state.totalAmount - selectedCartItem_.productPrice
            };
            localStorage.setItem('cart', JSON.stringify(st__));
            return st__;

        case GET_CART:
            if(action.cart != null){
                return {
                    ...state,
                    items: action.cart.items,
                    totalAmount: action.cart.totalAmount,
                    totalAmount_discounted: action.cart.totalAmount_discounted
                }
            }else {
                return {
                    ...state
                }
            }
        case CLEAR_CART:
            if(action.cart === null){
                return {
                    items: {},
                    totalAmount_discounted: 0,
                    totalAmount: 0
                }
            }
        default:
            return {
                ...state
            }
    }
}
