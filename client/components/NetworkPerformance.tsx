import React from 'react'
import LineGraph from './LineGraph'
import { FC} from 'react'
import type { Props } from '../../types/types';

const NetworkPerformance: FC<Props> = ({ header }) => {
  return (

    <>
      <div className='mainHeader'>{header}</div>

      <div className='miniContainerGraph'>
      
        <LineGraph
          title = "KiloBytes Transmitted"
          type = 'trans'
          yAxisTitle='KiloBytes Transmitted'
          color = 'rgba(255, 231, 0, 0.3)'
        />
        <LineGraph
          title = "KiloBytes Recieved"
          type = 'rec'
          yAxisTitle='KiloBytes Recieved'
          color = 'rgba(226, 0, 255, 0.3)'        
        />
       
      </div>
    </>

  )
}

export default NetworkPerformance