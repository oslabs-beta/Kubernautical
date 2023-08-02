import React from 'react';
import './sass/App.scss';
import MainContainer from './containers/MainContainer';
import Navbar from './containers/Navbar';
const App = () => {
  return (
    <div className='App'>
        <Navbar/>
        <MainContainer/>
    </div>
  );
};

export default App;