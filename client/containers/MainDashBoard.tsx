import React from 'react'
import LineGraph from '../components/LineGraph'
import { FC } from 'react'
import type { Props } from '../../types/types';

const MainDashBoard: FC<Props> = ({ header }) => {
  return (



    <>
      <div className='mainHeader'>{header}</div>

      <div className='miniContainer'>

        <LineGraph
          title="CPU Usage"
          type="cpu" />
        <LineGraph
          title="Memory Usage"
          type="mem" />

      </div>
    </>




  )
}

export default MainDashBoard