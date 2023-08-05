import React, { useState } from 'react';
import './sass/App.scss';
import MainContainer from './containers/MainContainer';
import Navbar from './containers/Navbar';
import { GlobalContext } from './components/Contexts';

const stringArr: String[] = [];

const App = () => {
  const [globalNameSpaces, setGlobalNameSpaces] = useState(stringArr)
  return (
    <div className='App'>
      <GlobalContext.Provider value={{globalNameSpaces,setGlobalNameSpaces}}>
        <Navbar />
        <MainContainer />
      </GlobalContext.Provider>
    </div>
  );
};

export default App;