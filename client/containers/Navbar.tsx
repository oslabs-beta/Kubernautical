import React from 'react';
import {useNavigate} from 'react-router-dom'

export default function Navbar(){
const navigate = useNavigate();

function MainDashBoard(){
  navigate('/dashboard')
}
  return(
    <div>
     <ul>
      <li>
       <button onClick={MainDashBoard}>Main Dashboard</button>
      </li>
     </ul>
    </div>
  )
}