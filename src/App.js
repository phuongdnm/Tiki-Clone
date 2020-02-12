import React from 'react';
import {Route, Switch} from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import ProductCategoryPage from "./components/pages/ProductCategoryPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import Cart from "./components/Cart";

function App() {
  return (
      <Switch>
          <Route
              exact
              path={"/"}
              render={()=><HomePage/>}
          />
          <Route
              exact
              path={"/product/:type"}
              render={(routeProps)=><ProductCategoryPage {...routeProps}/>}
          />
          <Route
              exact
              path={"/:productName/:productId"}
              render={(routeProps)=><ProductDetailPage {...routeProps}/>}
          />
          <Route
              exact
              path={"/cart"}
              render={(routeProps)=><Cart {...routeProps}/>}
          />
      </Switch>

  );
}

export default App;
