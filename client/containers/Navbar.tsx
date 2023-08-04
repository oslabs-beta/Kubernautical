import React from 'react';
import { useNavigate } from 'react-router-dom'
import clusterpic from '../assets/images/clusterPic.png'
import mainDashBoard from '../assets/images/mainDashBoard.png'

export default function Navbar() {
  const navigate = useNavigate();

  function MainDashBoard() {
    navigate('/dashboard')
  }
  function GoHome() {
    navigate('/');
  }
  return (
    <div className='navBar'>
      <div className='navBarTitle'>KUBERNAUTICAL</div>

      <button className='navButton' onClick={MainDashBoard}>
        <img className="btn-icon" src={mainDashBoard} />
        <p className="btn-text">Main Dashboard</p></button>
      <button className='navButton' onClick={GoHome}>
        <img className="btn-icon" src={clusterpic} />
        <p className="btn-text">Cluster View</p>
      </button>

    </div>
  )
}