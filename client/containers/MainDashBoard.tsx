import LineGraph from '../components/Graphs/LineGraph'
import GaugeChart from '../components/Graphs/GaugeChart'
// import BarGraph from '../components/BarGraph'
import React, { FC, useState } from 'react'
import type { Props } from '../../types/types';
import InvisibleNavbar from './InvisibleNavbar';

// const LoadingBar: FC<Props> = ({ style }) => {
//   return (
//     <div className='outerProgress' style={{ position: 'absolute', top: 10 }}>
//       <div>Load Test Running:</div>
//       <div className="container">
//         <div className="progress2 progress-moved">
//           <div className="progress-bar2">
//           </div>
//         </div>
//       </div >
//     </div>
//   )
// }
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
      </div>
    </>

  )
}

export default MainDashBoard