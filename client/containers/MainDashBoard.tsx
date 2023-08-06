import React from 'react'
import LineGraph from '../components/Graphs/LineGraph'
// import GaugeChart from '../components/GaugeChart'
// import BarGraph from '../components/BarGraph'
import { FC, useState } from 'react'
import type { Props } from '../../types/types';

const MainDashBoard: FC<Props> = ({ header }) => {
  return (
//age of cluster
//stacked bar chart on how much usage each namespace is taking
//
    <>
      <div className='mainHeader'>{header}</div>
      <div className='miniContainerGraph'>
        <GaugeChart
        type = "req"
        />
        <LineGraph
          title="CPU Usage"
          type="cpu"
          yAxisTitle='CPU Percentage Usage'
          color='rgba(39, 170, 245, 0.3)'
        />
        <LineGraph
          title="Memory Usage"
          type="mem"
          yAxisTitle='Memory Used (GB)'
          color='rgba(0, 255, 66, 0.3)'
        />
      </div>
    </>

  )
}

export default MainDashBoard