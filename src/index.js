// Import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'

// Import page component
import {HomePage, CategoryPage, DetailPage, CartPage} from './components'
// Create a react component
const App = () => {
  return (
    <Router>
      <Route path="/home" exact component={HomePage}/>
      <Route path="/home/category" exact component={CategoryPage}/>
      <Route path="/home/category/:id" exact component={DetailPage}/>
      <Route path="/home/cart" exact component={CartPage}/>
      
    </Router>
  );
};

// Take the react component and show it on the screen
ReactDOM.render(<App />, document.querySelector('#root'));
