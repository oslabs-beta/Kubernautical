import React from 'react';
import { useNavigate } from 'react-router-dom'
import clusterpic from '../assets/images/clusterPic.png'
import mainDashBoard from '../assets/images/mainDashBoard.png'
import netWork from '../assets/images/network.png'

export default function Navbar() {
  const navigate = useNavigate();

  function MainDashBoard() {
    navigate('/dashboard')
  }
  function GoHome() {
    navigate('/');
  }
  function Network(){
    navigate('/network')
  }
  return (
    <div className='navBar'>
      <div className='navBarTitle'>KUBERNAUTICAL</div>

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

    </div>
  )
}