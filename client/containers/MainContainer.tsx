import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainDashBoard from "./MainDashBoard"
import { Mapothy } from '../components/Mapothy'
import NetworkPerformance from '../components/Graphs/NetworkPerformance'
const MainContainer: FC = () => {

  return (
    <div className='mainContainer'>
      <Routes>
        {/* <Route index element={<Mapothy />} /> not necessary, default route handles this */}
        <Route path="/" element={<Mapothy header='Cluster View' />} />
        <Route path="/dashboard" element={<MainDashBoard header="Cluster Health Monitor" />} />
        <Route path="/network" element={<NetworkPerformance header = "Network Performance Monitor"/>}/>
      </Routes>
    </div>
  )
}

export default MainContainer;