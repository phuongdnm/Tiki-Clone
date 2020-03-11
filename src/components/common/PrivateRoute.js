import React from 'react';
import {Route} from 'react-router-dom';
import { useSelector} from 'react-redux';
import HomePage from "../pages/HomePage";


const PrivateRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
    return (
        // if user is authenticated render that route else redirect to '/login
        <Route
            {...rest}
            render={props =>
                isLoggedIn ?
                    <Component {...props}/> :
                    <>
                        < HomePage {...props} showForm={true}/>
                    </>


            }
        />
    )
};


export default PrivateRoute
