import React from 'react'
import { Chart as ChartJS, ArcElement,Tooltip,Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement,Tooltip, Legend);

const GaugeChart = () => {

  const data = {
    labels:['Yes','No'], // this is Memory Used vs how much is left
    datasets: [{
      label:'Poll',
      data:[5,12], // data here Memory Percentage out of how much is left
      backgroundColor:['black','red'],
      borderColor:['black','red'],
      circumference:180,
      rotation:270
    }]
  }
  return(
    <Doughnut data = {data}/>
  )
}



export default GaugeChart