import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import ProductCategoryPage from "./components/pages/ProductCategoryPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import Cart from "./components/UI/Cart";
import OrdersPage from "./components/pages/OrdersPage";
// import Login from "./components/user/Login";

function App() {
  return (
    <Switch>
      <Route exact path={"/"} render={() => <HomePage />} />
      <Route
        exact
        path={"/product/:type"}
        render={routeProps => <ProductCategoryPage {...routeProps} />}
      />
      <Route
        exact
        path={"/:productName/:productId"}
        render={routeProps => <ProductDetailPage {...routeProps} />}
      />
      <Route
        exact
        path={"/cart"}
        render={routeProps => <Cart {...routeProps} />}
      />
      <Route
        exact
        path={"/orders"}
        render={routeProps => <OrdersPage {...routeProps} />}
      />
      {/* <Route
        exact
        path={"/login"}
        render={routeProps => <Login {...routeProps} />}
      /> */}
    </Switch>
  );
}

export default App;
