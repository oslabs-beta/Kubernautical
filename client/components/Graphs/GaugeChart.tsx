import React, { FC, useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend,);
import type { Props } from '../../../types/types';

const GaugeChart: FC<Props> = ({ type }) => {
  const [guageData, setGuageData] = useState(0);
  const [memValues, setMemValues] = useState([]);

  const getData = async () => {
    try {
      console.log(type)
      let URL = `/api/prom/${type === 'mem' ? 'mem' : 'metrics'}?type=${type}&hour=24`;
      console.log(URL)
      const response = await fetch(URL);
      const data = await response.json();

      if (!data[0]) { setGuageData(0); return; }

      if (type === 'req') {
        const cpuRequested = Math.round(data[0].values[0][1] * 100) / 100;
        setGuageData(cpuRequested);
      } else if (type === 'mem') {
        setMemValues(data);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
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
        labels: {
          color: 'rgba(255, 255, 255, 0.702)'
        },
        display: true
      },
      title: {
        color: 'rgba(255, 255, 255, 0.702)',
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