import axios from 'axios';
import {message} from 'antd';

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const GET_PRODUCTS_BY_SHOP_ID = 'GET_PRODUCTS_BY_SHOP_ID';
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


const api_url = process.env.REACT_APP_API;


// 🔓
export const getAllProducts = () => async (dispatch) => {

    const url = `${api_url}/api/v1/products`;
    console.log(url);
    await axios.get(url)
        .then(res => {
            dispatch({
                type: GET_ALL_PRODUCTS,  //this call test dispatch. to dispsatch to our reducer
                products: res.data.data
            });
            // message.success("Got products");
        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error getting products");
            }
        );
};

// 🔓
export const getProductById = (id) => async (dispatch) => {

    const url = `${api_url}/api/v1/products/${id}`;
    await axios.get(url)
        .then(res => {
            console.log(res);
            if(res.data.statusText === "Not Found"){
                message.error("Error getting product");
                dispatch({
                    type: GET_PRODUCT_BY_ID,  //this call test dispatch. to dispsatch to our reducer
                    product: null
                });
                return
            }
            dispatch({
                type: GET_PRODUCT_BY_ID,  //this call test dispatch. to dispsatch to our reducer
                product: res.data.data
            });
            // message.success("Got product");

        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error getting product");
            }
        );
};

// 🔓
export const getProductsByShopId = (shopId) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}/products`;
    await axios.get(url)
        .then(res => {
            dispatch({
                type: GET_PRODUCTS_BY_SHOP_ID,  //this call test dispatch. to dispsatch to our reducer
                products: res.data.data
            });

            // message.success("Got products");


        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error getting products");
            }
        );
};

// 🔒
export const createProduct = (product, shopId, photo) => async (dispatch) => {
    const url = `${api_url}/api/v1/shops/${shopId}/products`;
    await axios.post(url, product)
        .then(async res => {
            if(!res.data.success){
                return  message.error("Error creating product");
            }
            if(photo !== null){
                await dispatch(updateProductPhoto(photo, res.data.data.id));
            }
            await dispatch(getAllProducts());

            return message.success("Created product");

        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error creating product");
            }
        );
};

// 🔒
export const updateProductById = (product, productId, photo) => async (dispatch) => {
    const url = `${api_url}/api/v1/products/${productId}`;
    await axios.put(url, product)
        .then(async res => {
            if(!res.data.success) {
                return  message.error("Error updating product");
            }
            if(photo !== null){
                await dispatch(updateProductPhoto(photo, res.data.data.id));
            }
            await dispatch(getAllProducts());

            message.success("Updated product");

        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error updating product");
            }
        );
};

// 🔒
export const deleteProductById = (productId) => async (dispatch) => {
    const url = `${api_url}/api/v1/products/${productId}`;
    await axios.delete(url)
        .then(res => {
            dispatch(getAllProducts());
            dispatch(getProductById(productId));
            message.success("Deleted product");

        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error deleting product");
            }
        );
};

// 🔒
export const updateProductPhoto = (photo, productId) => async (dispatch) => {
    const formData = new FormData();
    formData.append('file', photo);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const url = `${api_url}/api/v1/products/${productId}/photo`;
    await axios.put(url, formData, config)
        .then(res => {
            if(!res.data.success) {
                return  message.error("Error updating product photo");
            }
            dispatch(getAllProducts());
            message.success("Updated product photo");

        })
        .catch(err => {
                console.log('Error' + err);
                message.error("Error updating product photo");
            }
        );
};

