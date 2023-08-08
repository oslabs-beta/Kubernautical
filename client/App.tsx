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
  const [globalTimer, setGlobalTimer] = useState(0);
  const [globalServiceTest, setGlobalServiceTest] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      <div className='App'>
        <GlobalContext.Provider
          value={{
            globalNamespaces, setGlobalNamesapces,
            globalServices, setGlobalServices,
            globalTimer, setGlobalTimer,
            globalServiceTest, setGlobalServiceTest,
            showEditModal, setShowEditModal
          }}>
          <Navbar />
          <MainContainer />
        </GlobalContext.Provider>
      </div>
      <footer className='footer'>@2023 Kubernautical™ | All Rights Reserved </footer>
    </>
  );
};

export default App;