import React from 'react'
import NavBar from "../layout/NavBar";
import AccountDashBoard from "../UI/AccountDashboard";
import Footer from "../layout/Footer";


const DashboardPage = (props) => {
    const {type} = props.match.params;
    return (
        <div>
            < NavBar {...props}/>
            < AccountDashBoard index={parseInt(type)}/>
            < Footer/>

        </div>
    )
};

export default DashboardPage;

