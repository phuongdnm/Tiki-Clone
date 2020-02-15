import React from 'react'
import NavBar from "../layout/NavBar";
import ProductCategoryDeal from "../ProductCategoryDeal";
import ProductNavigation from "../ProductNavigation";
import Footer from '../layout/Footer';


const HomePage = (props) => {
    return (
        <div style={{width: "100%", height: "100%", backgroundColor: "#F4F4F4"}}>
            <NavBar/>
            <ProductNavigation/>
            <ProductCategoryDeal/>

            <h3>This is Home Page</h3>
            <Footer/>

        </div>
    )
}

export default HomePage

