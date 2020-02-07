// Import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';


// Create a react component
const App = () => {
  return (
    <Button variant="contained" color="primary">
      Hello World!
    </Button>
  );
};

// Take the react component and show it on the screen
ReactDOM.render(<App />, document.querySelector('#root'));
