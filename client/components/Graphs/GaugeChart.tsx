import React, { FC, useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend,);
import type { Props } from '../../../types/types';

const GaugeChart: FC<Props> = (type, labels,) => {
  const [guageData, setGuageData] = useState(0);

  const getData = async () => {
    try {
      const response = await fetch(`/api/prom/metrics?type=req&hour=24`, {
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

      const cpuRequested = Math.round(data[0].values[0][1] * 100) / 100
      setGuageData(cpuRequested)
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const allocatable: number = Math.round((100 - guageData) * 100) / 100

  const data = {
    labels: [`${guageData}%`, `${allocatable}%`], // this is Memory Used vs how much is left
    datasets: [{
      label: 'Percentage',
      data: [guageData, allocatable], // data here Memory Percentage out of how much is left
      backgroundColor: ['rgba(250, 0, 133, .05)', 'rgba(70, 0, 250, .05)'],
      borderColor: ['rgba(250, 0, 133, .67)', 'rgba(70, 0, 250, .67)'],
      borderWidth: 5,
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
          color:'rgba(255, 255, 255, 0.702)'
        },
        display: true
      },
      title: {
        color:'rgba(255, 255, 255, 0.702)',
        display: true,
        text: 'Total Cores Requested   Total Cores Allocatable',
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