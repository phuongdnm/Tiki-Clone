import React from 'react'
import NavBar from "../layout/NavBar";


const ProductCategoryPage = (props) => {
    const {type} = props.match.params;
    return (
        <div>
            <NavBar/>
            <h3>This is Product category  Page</h3>
            <h1>{type}</h1>
        </div>

    )
};

export default ProductCategoryPage

