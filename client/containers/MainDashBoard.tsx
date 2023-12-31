import React, { type ReactElement } from 'react'
import LineGraph from '../components/Graphs/LineGraph'
import GaugeChart from '../components/Graphs/GaugeChart'
import type { Props } from '../../types/types'
import InvisibleNavbar from './InvisibleNavbar/InvisibleNavbar'

function MainDashBoard ({ header }: Props): ReactElement {
  const textColor = 'rgba(255, 255, 255, 0.702)'
  return (
    <>
      <div className="mainHeader">{header}</div>
      <InvisibleNavbar />
      <div className="miniContainerGraph">
        <LineGraph
          title="CPU Usage"
          type="cpu"
          yAxisTitle="CPU Percentage Usage"
          color="rgba(39, 170, 245, 0.8)"
          graphTextColor={textColor}
        />
        <LineGraph
          title="Memory Usage"
          type="mem"
          yAxisTitle="Memory Used (GB)"
          color="rgba(245, 39, 39, 0.8)"
          graphTextColor={textColor}
        />
      </div>
      <div className="miniContainerGraph">
        <GaugeChart
          type="cpu"
          backgroundColor={['rgba(39, 245, 213, 0.3)', 'rgba(39, 245, 127, 0.3)', 'rgba(39, 97, 245, 0.3)']}
          borderColor={['rgba(39, 245, 213, 0.7)', 'rgba(39, 245, 127, 0.7)', 'rgba(39, 97, 245, 0.7)']}
          title="Cpu"
          graphTextColor={textColor}
        />
        <GaugeChart
          type="mem"
          backgroundColor={['rgba(144, 39, 245, 0.3)', 'rgba(245, 39, 178, 0.3)', 'rgba(245, 39, 41, 0.3)']}
          borderColor={['rgba(144, 39, 245, 0.7)', 'rgba(245, 39, 178, 0.7)', 'rgba(245, 39, 41, 0.7)']}
          title="Memory"
          graphTextColor={textColor}
        />
      </div>
    </>

  )
}

export default MainDashBoard
