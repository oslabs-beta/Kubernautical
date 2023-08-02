import React from 'react';
import './style.css';
import MainContainer from './containers/MainContainer';
import Navbar from './containers/Navbar';
const App = () => {
  return (
    <div>
        <Navbar/>
        <MainContainer/>
    </div>
  );
};

export default App;