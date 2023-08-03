import React from 'react'
import LineGraph from '../components/LineGraph'
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
          color='aqua'
        />
        <LineGraph
          title="Memory Usage"
          type="mem"
          yAxisTitle='Memory Used (GB)'
          color='orange'
        />
      </div>
    </>

  )
}

export default MainDashBoard