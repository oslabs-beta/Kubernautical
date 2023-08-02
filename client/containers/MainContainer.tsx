import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { FC } from 'react'
import MainDashBoard from "./MainDashBoard"
import { Mapothy } from '../components/2D/Mapothy'


const MainContainer: FC = () => {

  return (
    <>
      <Routes>
        <Route index element={<Mapothy />} />
        <Route path="/dashboard" element={<MainDashBoard />} />
        <Route path="/" element={<Mapothy />} />
      </Routes>
    </>
  )
}

export default MainContainer