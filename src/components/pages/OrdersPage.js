import React from 'react'
import NavBar from "../layout/NavBar";
import AccountDashBoard from "../UI/AccountDashboard";
import Footer from "../layout/Footer";


const OrdersPage = (props) => {
    return (
        <div>
            < NavBar {...props}/>
            < AccountDashBoard index={2}/>
            < Footer/>

        </div>
    )
};

export default OrdersPage;

