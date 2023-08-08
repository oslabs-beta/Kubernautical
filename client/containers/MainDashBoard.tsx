import LineGraph from '../components/Graphs/LineGraph'
import GaugeChart from '../components/Graphs/GaugeChart'
import EditModal from '../components/EditModal';
import React, { FC } from 'react'
import type { Props } from '../../types/types';
import InvisibleNavbar from './InvisibleNavbar';


const MainDashBoard: FC<Props> = ({ header }) => {

  return (
    //age of cluster
    //stacked bar chart on how much usage each namespace is taking
    //
    <>
      <div className='mainHeader'>{header}</div>
      <InvisibleNavbar />
      <div className='miniContainerGraph'>
        <LineGraph
          title="CPU Usage"
          type="cpu"
          yAxisTitle='CPU Percentage Usage'
          color='rgba(39, 170, 245, .8)'
        />
        <LineGraph
          title="Memory Usage"
          type="mem"
          yAxisTitle='Memory Used (GB)'
          color='rgba(0, 255, 66, .8)'
        />
      </div>
      <div className='miniContainerGraph gaugeContainer'>
        <GaugeChart
          type="req"
        />
        <GaugeChart
          type="mem"
        />
      </div>
    </>

  )
}

export default MainDashBoard