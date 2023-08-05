import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title, Tooltip, Legend,ChartOptions,ChartData,} from 'chart.js';
ChartJS.register( CategoryScale,LinearScale, BarElement, Title,Tooltip,Legend);


const BarGraph = () =>{
const labels = [1,2,3,4,5,6,7]; // x Axis values
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40], // y Axis Values
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)', // color inside bar
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)', // color border
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

return(
  <Bar data = {data}/>
)
}

export default BarGraph