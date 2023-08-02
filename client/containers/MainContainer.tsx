import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {FC} from 'react'
import MainDashBoard from "./MainDashBoard"


const MainContainer: FC = () =>{

  return (
    <>
     <Routes>
      <Route index element={<MainDashBoard />}/>
      <Route path="/dashboard" element={<MainDashBoard />}/>
     </Routes>
    </>
  )
}

export default MainContainer