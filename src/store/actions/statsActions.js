import axios from 'axios';
import {message} from 'antd';

export const GET_TOP_SOLD_PRODUCTS = 'GET_TOP_SOLD_PRODUCTS';
export const GET_TOP_SOLD_PRODUCTS_OF_A_SHOP = 'GET_TOP_SOLD_PRODUCTS_OF_A_SHOP';


const api_url = process.env.REACT_APP_API;

// 🔓
export const getTopSoldProducts= (limit="5", sort="order") => async (dispatch) => {

    const url = `${api_url}/api/v1/stats/products?limit=${limit}&sort=${sort}`;
    await axios.get(url)
        .then(res => {
            if(!res.data.success){
                return message.error("Error getting products");
            }
            dispatch({
                type: GET_TOP_SOLD_PRODUCTS,  //this call test dispatch. to dispsatch to our reducer
                topProducts: res.data.data
            });

            message.success("Got top Products");
        })
        .catch(err => {
                message.error("Error getting products");
            }
        );

};

// 🔓
export const getTopSoldProductsOfShop= (shopId, limit="5") => async (dispatch) => {

    const url = `${api_url}/api/v1/shops/${shopId}/stats?limit=${limit}`;
    await axios.get(url)
        .then(res => {
            if(!res.data.success){
                return message.error("Error getting products");
            }
            dispatch({
                type: GET_TOP_SOLD_PRODUCTS_OF_A_SHOP,  //this call test dispatch. to dispsatch to our reducer
                productsOfShop: res.data.data
            });

            message.success("Got Products");
        })
        .catch(err => {
                message.error("Error getting products");
            }
        );
};
