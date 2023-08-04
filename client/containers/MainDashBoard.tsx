import React from 'react'
import LineGraph from '../components/LineGraph'
import GaugeChart from '../components/GaugeChart'
import { FC, useState } from 'react'
import type { Props } from '../../types/types';

const MainDashBoard: FC<Props> = ({ header }) => {
  return (

    <>
      <div className='mainHeader'>{header}</div>

      <div className='miniContainer'>

        <LineGraph
          title="CPU Usage"
          type="cpu"
          yAxisTitle='CPU Percentage Usage'
          color='rgba(0,255,255,.5)'
        />
        <LineGraph
          title="Memory Usage"
          type="mem"
          yAxisTitle='Memory Used (GB)'
          color='rgba(0,255,0,.5)'
        />
      </div>
    </>

  )
}

export default MainDashBoard