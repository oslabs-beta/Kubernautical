import React from 'react'
import LineGraph from '../components/LineGraph'
import { FC,useState } from 'react'
import type { Props } from '../../types/types';

const MainDashBoard: FC<Props> = ({ header }) => {
const [hourSelection,setHourSelection] = useState('24')

function setHour(hour:string){
  setHourSelection(hour)
}

  return (
   
    <>
      <div className='mainHeader'>{header}</div>

      <div className='miniContainer'>
        <div>
          <select value = {hourSelection} onChange = {(e)=>setHour(e.target.value)}>
            <option value = '1'>1 hour</option>
            <option value = '6'>6 hours</option>
            <option value = '12'>12 hours</option>
            <option value = '24'>24 hours</option>
          </select>
        </div>

        <LineGraph
          title="CPU Usage"
          type="cpu"
          yAxisTitle='CPU Percentage Usage'
          color='aqua'
          hour = {hourSelection} />
        <LineGraph
          title="Memory Usage"
          type="mem"
          yAxisTitle='Memory Used (GB)'
          color='orange'
          hour = {hourSelection} />
      </div>
    </>

  )
}

export default MainDashBoard