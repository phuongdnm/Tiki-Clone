import axios from 'axios';
import {message} from 'antd';

export const GET_ALL_SHOPS = 'GET_ALL_SHOPS';
export const GET_SHOP_BY_ID = 'GET_SHOP_BY_ID';


const api_url = process.env.REACT_APP_API;

// 🔓
export const getAllShops = () => async (dispatch) => {

    const url = `${api_url}/api/v1/shops`;
    await axios.get(url)
        .then(res => {
            dispatch({
                type: GET_ALL_SHOPS,  //this call test dispatch. to dispsatch to our reducer
                shops: res.data.data
            });
            // message.success("Got shops");
        })
        .catch(err => {
                message.error("Error getting shops");
            }
        );

};

// 🔓
export const getShopById = (id) => async (dispatch) => {

    const url = `${api_url}/api/v1/shops/${id}`;
    await axios.get(url)
        .then(res => {
            dispatch({
                type: GET_SHOP_BY_ID,  //this call test dispatch. to dispsatch to our reducer
                currentShop: res.data.data
            });

            // message.success("Got shop");
        })
        .catch(err => {
                message.error("Error getting shop");
            }
        );
};

// 🔒
export const createNewShop = (shop) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops`;
    await axios.post(url, shop)
        .then(res => {
            if(!res.data.success) {
                return  message.error("Error creating shop");
            }
            dispatch(getAllShops());
            message.success("shop created successfully");
        })
        .catch(err => {
                message.error("Error creating shop");
            }
        );
};

// 🔒
export const updateShopById = (shop, shopId) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}`;
    await axios.put(url, shop)
        .then(res => {
            dispatch(getAllShops());
            message.success("shop updated successfully");
        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error updating shop");
            }
        );
};


// 🔒
export const deleteShopById = (shopId) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}`;
    await axios.delete(url)
        .then(res => {
            if(!res.data.success) {
                return  message.error("Error deleting shop");
            };
            dispatch(getAllShops());
            message.success("shop deleted successfully");
        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error deleting shop");
            }
        );
};

