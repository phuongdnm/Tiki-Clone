import React, {useEffect} from 'react'
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import AdminDashBoard from "../UI/AdminDashboard";
import * as userActions from "../../store/actions/userActions";
import {useDispatch} from "react-redux";


const AdminPage = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(userActions.getAllUsers());
    },[]);
    return (
        <div style={{ backgroundColor: "#EEEEEE"}}>
            < NavBar {...props}/>
            <AdminDashBoard index={1}/>
            < Footer/>
        </div>
    )
};

export default AdminPage;
