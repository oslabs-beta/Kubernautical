import React, { FC, useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend,);
import type { Props } from '../../../types/types';
import { totalmem } from 'os';

const GaugeChart: FC<Props> = ({type,borderColor,backgroundColor,title,graphTextColor}) => {
  const [guageData, setGuageData] = useState(0);
  const [memValues, setMemValues] = useState([]);

  const getData = async () => {
    try {
      let URL = '';
      if (type === 'req') {
        URL = `/api/prom/metrics?type=req&hour=24`;
      } else if (type === 'test') {
        URL = `/api/prom/mem?type=mem&hour=24`;
      }
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      
      if (!data[0]) {
        setGuageData(0);
        return;
      }
      if (type === 'req') {
        const cpuRequested = Math.round(data[0].values[0][1] * 100) / 100;
        setGuageData(cpuRequested);

      } else if (type === 'test') {

        setMemValues(data);
    } 
  } catch (error) {
    console.log('Error fetching data:', error);
  }
    
  }
  useEffect(() => {
    getData();
  }, [type]);
  // { cpuReq: Number, cpuUsed: Number, cpuAvailable:number}
  const allocatable: number = Math.round((100 - guageData) * 100) / 100

  // const memLabels = memValues.length > 0 ? memValues.map(val => val < 1 ? '<1%' : `${Math.round(val)}%`): [];
  const memLabels = memValues.length > 0 ? memValues.map(val => val < 1 ? '<1%' : `${Number(val).toFixed(2)}%`) : [];
  // console.log('memLabels:', memLabels);

  const data = {
    labels: memValues.length > 0 ? memLabels : [`${guageData}%`, `${allocatable}%`],
    // labels: [`${guageData}%`, `${allocatable}%`], // this is Memory Used vs how much is left
    datasets: [{
      label: 'Percentage',
      data: memValues.length > 0 ? memValues : [guageData, allocatable],
      // data: [guageData, allocatable], // data here Memory Percentage out of how much is left
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      circumference: 180,
      rotation: 270,
      cutout: '60%',
    }]
  }

  const options = {
    // aspectRatioL:2,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels:{
          color:graphTextColor
        },
        display: true
      },
      title: {
        color:graphTextColor,
        display: true,
        text: title
      }
    }
  }

  return (
    <div className='guageGraph'>
      <Doughnut data={data} options={options} />
    </div>
  )
}



export default GaugeChart