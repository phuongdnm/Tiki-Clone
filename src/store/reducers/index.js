import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cartReducer from './cartReducer'
import productReducer from './productReducer'
import shopReducer from "./shopReducer";
import orderReducer from "./orderReducer";
import reviewReducer from "./reviewReducer";
import userReducer from "./userReducer";
import statsReducer from "./statsReducer";
export default combineReducers({
    auth: authReducer,       // to call is from our component we use this.props.auth
    users: userReducer,
    errors: errorReducer,
    cart: cartReducer,
    products: productReducer,
    shops: shopReducer,
    orders: orderReducer,
    reviews: reviewReducer,
    stats:statsReducer,
});
