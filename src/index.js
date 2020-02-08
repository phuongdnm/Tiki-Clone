// Import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar'

// Create a react component
const App = () => {
  return (
    <Navbar>
    </Navbar>

  );
};

// Take the react component and show it on the screen
ReactDOM.render(<App />, document.querySelector('#root'));
