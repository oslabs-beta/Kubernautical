import React from 'react'
import LineGraph from '../components/LineGraph'
import {FC} from 'react'

const MainDashBoard: FC = () =>{

  return (
    <>
    <LineGraph
      title = "CPU Usage"
      type = "cpu"
      />
      <LineGraph
      title = "Memory Usage"
      type = "mem"
      />
    </>
  )
}

export default MainDashBoard