import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import clusterpic from '../assets/images/clusterPic.png'
import mainDashBoard from '../assets/images/mainDashBoard.png'
import netWork from '../assets/images/network.png'
import { GlobalContext } from '../components/Contexts';

export default function Navbar() {
  const { globalTimer, setGlobalTimer, globalServiceTest, setGlobalServiceTest } = useContext(GlobalContext);
  const [activeTimer, setActiveTimer] = useState(0); //this sucks but im an idiot
  const navigate = useNavigate();
  function MainDashBoard() { navigate('/dashboard') }
  function GoHome() { navigate('/'); }
  function Network() { navigate('/network') }

  useEffect(() => {
    console.log(globalTimer)
    if (globalTimer && (globalTimer - Date.now()) < 0) {
      setGlobalTimer ? setGlobalTimer(0) : null;
      setGlobalServiceTest ? setGlobalServiceTest('') : null;
    }
    setTimeout(() => {
      globalTimer ? setActiveTimer(Math.floor((globalTimer - Date.now()) / 1000)) : null;
    }, 1000)
  }, [globalTimer, activeTimer])

  return (
    <div className='navBar'>
      <div className='navBarTitle'>KUBERNAUTICAL</div>
      <hr className='hr' />
      <button className='navButton' onClick={GoHome}>
        <img className="btn-icon" src={clusterpic} />
        <p className="btn-text">Cluster View</p>
      </button>

      <button className='navButton' onClick={MainDashBoard}>
        <img className="btn-icon" src={mainDashBoard} />
        <p className="btn-text">Main Dashboard</p>
      </button>

      <button className='navButton' onClick={Network}>
        <img className="btn-icon" src={netWork} />
        <p className="btn-text">Network Performance</p>
      </button>
      <div className='loadingStatus'>
        {globalTimer ? `Load test time remaining: ${Math.floor((globalTimer - Date.now()) / 1000)}s, running on ${globalServiceTest}` : null}
      </div>
    </div>
  )
}