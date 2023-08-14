import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import clusterpic from '../assets/images/clusterPic.png'
import mainDashBoard from '../assets/images/mainDashBoard.png'
import netWork from '../assets/images/network.png'
import edit from '../assets/images/edit.png'
import logo from '../assets/images/ourlogo.png'
import { GlobalContext } from '../components/Contexts';
import gif2 from '../assets/gif3.gif'

export default function Navbar() {
  const { globalTimer, setGlobalTimer,
    globalServiceTest, setGlobalServiceTest,
    showEditModal, setShowEditModal,
    ongoingCrudChange
  } = useContext(GlobalContext);
  const [activeTimer, setActiveTimer] = useState(0); //!smooth brain solution
  const navigate = useNavigate();
  function MainDashBoard() { navigate('/dashboard') }
  function GoHome() { navigate('/'); }
  function Network() { navigate('/network') }
  function Logs() { navigate('/logs') }

  useEffect(() => {
    if (globalTimer && (globalTimer - Date.now()) < 0) {
      setGlobalTimer ? setGlobalTimer(0) : null;
      setGlobalServiceTest ? setGlobalServiceTest('') : null;
    }
    globalTimer ? setTimeout(() => {
      globalTimer ? setActiveTimer(Math.floor((globalTimer - Date.now()) / 1000)) : null;
    }, 1000) : null;
  }, [globalTimer, activeTimer, ongoingCrudChange])

  return (
    <div className='navBar'>
      <div className='navBarTitle'>KUBERNAUTICAL</div>
      <hr className='hr' />
      <button className='navButton' id='ClusterViewButton' onClick={GoHome}>
        <img className="btn-icon" src={clusterpic} />
        <p className="btn-text">Cluster View</p>
      </button>

      <button className='navButton' id='MainDashButton' onClick={MainDashBoard}>
        <img className="btn-icon" src={mainDashBoard} />
        <p className="btn-text">Main Dashboard</p>
      </button>

      <button className='navButton' id='NetworkButton' onClick={Network}>
        <img className="btn-icon" src={netWork} />
        <p className="btn-text">Network Performance</p>
      </button>

      {/* get an image for logs */}
      <button className='navButton' id='LogsButton' onClick={Logs}>
        <img className="btn-icon" src={netWork} />
        <p className="btn-text">Logs</p>
      </button>

      <button className='navButton' id='EditClusterButton' onClick={() => { setShowEditModal ? showEditModal ? setShowEditModal(false) : setShowEditModal(true) : null }}>
        <img className="btn-icon" src={edit} />
        <p className="btn-text">Edit Cluster</p>
      </button>

      <div className='loadingStatus'>
        {globalTimer ? `Load test time remaining: ${Math.floor((globalTimer - Date.now()) / 1000)}s, running on ${globalServiceTest}` : null}
      </div>

      <div className='loadingStatus'>
        {ongoingCrudChange ? <img className='loadingGif' src={gif2} /> : null}
      </div>

    </div>
  )
}