import React, { useState, createContext, Dispatch, SetStateAction  } from 'react';
import './sass/App.scss';
import MainContainer from './containers/MainContainer';
import Navbar from './containers/Navbar';
import { GlobalContext } from './components/Contexts';



const stringArr: string[] = [];

const App = () => {
  const [globalNamespaces, setGlobalNamesapces] = useState(stringArr);
  return (
    <div className='App'>
      <GlobalContext.Provider value={{ globalNamespaces, setGlobalNamesapces }}>
        <Navbar />
        <MainContainer />
      </GlobalContext.Provider>
    </div>
  );
};

export default App;