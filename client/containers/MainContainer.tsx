import React, { FC, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainDashBoard from "./MainDashBoard"
import { Mapothy } from '../components/Mapothy'
import { GlobalContext } from '../components/Contexts';
import NetworkPerformance from './NetworkPerformance'
import CRUDModal from '../components/CRUD/CRUDModal';
import LogsContainer from './LogsContainer'


const MainContainer: FC = () => {
  const {
    showEditModal, setShowEditModal
  } = useContext(GlobalContext);

  return (
    <><div className='centerModal'>{showEditModal ? <CRUDModal /> : <div></div>}</div>
      <div className='mainContainer'>
        <Routes>
          <Route path="/" element={<Mapothy header='Cluster View' />} />
          <Route path="/dashboard" element={<MainDashBoard header="Cluster Health Monitor" />} />
          <Route path="/network" element={<NetworkPerformance header="Network Performance Monitor" />} />
          <Route path="/logs" element={<LogsContainer header="Logs" />} />
        </Routes>
      </div></>
  )
}

export default MainContainer;