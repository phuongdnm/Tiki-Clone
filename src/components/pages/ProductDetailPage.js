import React from 'react'
import NavBar from "../layout/NavBar";


const ProductDetailPage = (props)=> {
    const {productName, productId} = props.match.params;
    console.log(props);
    return (
        <div>
            <NavBar/>
            <h3>This is product detail Page</h3>
            <h1>{productName}</h1>
            <h1>{productId}</h1>
        </div>
    )
};

export default ProductDetailPage

