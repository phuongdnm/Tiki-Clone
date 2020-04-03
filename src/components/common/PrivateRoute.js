import React from 'react';
import {Route} from 'react-router-dom';
import { useSelector} from 'react-redux';
import HomePage from "../pages/HomePage";


const PrivateRoute = ({component: Component, checkIsAdmin, ...rest}) => {
    const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
    const isAdmin = useSelector(state => !!state.auth.userData.role ? state.auth.userData.role === "admin" : null);

    if (isAdmin && isLoggedIn && !!checkIsAdmin) {      // if you are an admin and logged in

        return (
            <Route
                {...rest}
                render={props => <Component {...props}/>}
            />
        )
    } else if (isLoggedIn && !isAdmin && isAdmin!== null && !!checkIsAdmin) {  // if you are not an admin and logged in
        return (
            <Route
                {...rest}
                render={props => < HomePage {...props} showForm={false} checkIsAdmin={true}/>}
            />
        )
    }
    // user is logged in or logged out
    return (
        // if user is authenticated render that route else redirect to home page with login form
        <>
            <Route
                {...rest}
                render={props =>
                    isLoggedIn ?
                        <Component {...props}/> :
                        <>
                            < HomePage {...props} showForm={true} checkIsAdmin={false}/>
                        </>
                }
            />
        </>
    )

};



export default PrivateRoute
