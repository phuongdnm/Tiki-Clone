import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import jwt_decode from 'jwt-decode';


import DashboardPage from "./components/pages/DashboardPage";
import HomePage from "./components/pages/HomePage";
import ProductCategoryPage from "./components/pages/ProductCategoryPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import CartPage from "./components/pages/CartPage";
import OrdersPage from "./components/pages/OrdersPage";
import PrivateRoute from "./components/common/PrivateRoute";
import Checkout from "./components/pages/Checkout"

import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import {logoutUser, setCurrentUser} from "./store/actions/authActions";
import {getAllProducts} from "./store/actions/productActions";
import {getCart} from "./store/actions/cartActions";
import {getAllShops} from "./store/actions/shopActions";
import {getAllReviews} from "./store/actions/reviewActions";
import AdminPage from "./components/pages/AdminPage";
import {getAllOrders} from "./store/actions/orderActions";
import UnderDevelopmentPage from "./components/pages/UnderDevelopmentPage";


const actionsOnPageLoad = ()=> {
    store.dispatch(getAllProducts());
    store.dispatch(getCart());
    store.dispatch(getAllShops());
    store.dispatch(getAllOrders());
    store.dispatch(getAllReviews());
// Check for token
    if (localStorage.jwtToken) {
        // Set auth token header auth
        setAuthToken(localStorage.jwtToken);
        // Decode token and get user info and expiration
        const decoded = jwt_decode(localStorage.jwtToken);
        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));
        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // Logout user
            store.dispatch(logoutUser());
            window.location.href = '/login'
        }
    }
};
actionsOnPageLoad();



function App() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} render={(routeProps) => <HomePage {...routeProps} showForm={false} checkIsAdmin={false}/>}/>
                    <Route
                        exact
                        path={"/product/:type"}
                        render={routeProps => <ProductCategoryPage {...routeProps} />}
                    />
                    <PrivateRoute
                        exact
                        path={"/dashboard/:type"}
                        component={DashboardPage}
                    />
                    <PrivateRoute
                        exact
                        path={"/admin"}
                        component={AdminPage}
                        checkIsAdmin
                    />
                    {/*<Route*/}
                    {/*    exact*/}
                    {/*    path={"/admin/register"}*/}
                    {/*    render={(routeProps) => <HomePage {...routeProps} showForm={true} adminForm={true} mustBeLoggedOut={true}/>}*/}
                    {/*/>*/}

                    <Route
                        exact
                        path={"/:productName/:productId"}
                        render={routeProps => <ProductDetailPage {...routeProps} />}
                    />
                    <Route
                        exact
                        path={"/underDevelopment"}
                        render={routeProps => <UnderDevelopmentPage {...routeProps} status={"underDevelopment"}/>}
                    />
                    <Route
                        exact
                        path={"/notFound"}
                        render={routeProps => <UnderDevelopmentPage {...routeProps} status={"notFound"}/>}
                    />
                    <PrivateRoute
                        exact
                        path={"/cart"}
                        component={CartPage}
                    />
                    <PrivateRoute
                        exact
                        path={"/orders"}
                        component={OrdersPage}
                    />
                    <PrivateRoute
                        exact
                        path={"/checkout"}
                        component={Checkout}
                    />
                    <Route
                        render={routeProps => <UnderDevelopmentPage {...routeProps} status={"404"}/>}
                    />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
