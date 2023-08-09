import React from 'react'
import LineGraph from './LineGraph'
import { FC } from 'react'
import type { Props } from '../../../types/types';
import InvisibleNavbar from '../../containers/InvisibleNavbar';

const NetworkPerformance: FC<Props> = ({ header }) => {
  return (

    <>
      <div className='mainHeader'>{header}</div>
      <InvisibleNavbar />
      <div className='miniContainerGraph'>

        <LineGraph
          title="KiloBytes Transmitted"
          type='trans'
          yAxisTitle='KiloBytes Transmitted'
          color='rgba(255, 231, 0, 1)'
          graphTextColor='rgba(255, 255, 255, 0.702)'
        />
        <LineGraph
          title="KiloBytes Recieved"
          type='rec'
          yAxisTitle='KiloBytes Recieved'
          color='rgba(226, 0, 255, 1)'
          graphTextColor='rgba(255, 255, 255, 0.702)'
        />

      </div>
    </>

  )
}

export default NetworkPerformance
