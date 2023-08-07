import React, { useState, createContext, Dispatch, SetStateAction } from 'react';
import { globalServiceObj } from '../types/types';
import './sass/App.scss';
import MainContainer from './containers/MainContainer';
import Navbar from './containers/Navbar';
import { GlobalContext } from './components/Contexts';



const stringArr: string[] = [];
const serviceArr: globalServiceObj[] = [];
const App = () => {
  const [globalNamespaces, setGlobalNamesapces] = useState(stringArr);
  const [globalServices, setGlobalServices] = useState(serviceArr);
  return (
    <>
      <div className='App'>
        <GlobalContext.Provider value={{ globalNamespaces, setGlobalNamesapces, globalServices, setGlobalServices }}>
          <Navbar />
          <MainContainer />
        </GlobalContext.Provider>
      </div>
    </>
  );
};

export default App;