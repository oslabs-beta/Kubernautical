import React from 'react';
import { useNavigate } from 'react-router-dom'

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
      <div>NAVBAR</div>

      <button className='navButton' onClick={MainDashBoard}>Main Dashboard</button>
      <button className='navButton' onClick={GoHome}>Cluster View</button>

    </div>
  )
}