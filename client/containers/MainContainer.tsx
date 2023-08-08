import React, { FC, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainDashBoard from "./MainDashBoard"
import { Mapothy } from '../components/Mapothy'
import { GlobalContext } from '../components/Contexts';
import NetworkPerformance from '../components/Graphs/NetworkPerformance'
import EditModal from '../components/EditModal';

const MainContainer: FC = () => {
  const { globalTimer, setGlobalTimer,
    globalServiceTest, setGlobalServiceTest,
    showEditModal, setShowEditModal
  } = useContext(GlobalContext);

  return (
    <><div>{showEditModal ? <EditModal /> : <div></div>}</div><div className='mainContainer'>
      <Routes>
        <Route path="/" element={<Mapothy header='Cluster View' />} />
        <Route path="/dashboard" element={<MainDashBoard header="Cluster Health Monitor" />} />
        <Route path="/network" element={<NetworkPerformance header="Network Performance Monitor" />} />
      </Routes>
    </div></>
  )
}

export default MainContainer;