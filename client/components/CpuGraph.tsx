import React from 'react'
import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



const defaultArr: Number[] = []; //typescript set up for UseState

export default function CpuGraph() {
  const [data, setData] = useState(defaultArr);
  const [label, setLabel] = useState(defaultArr);

  const getData = async () => {
    try {
      const response = await fetch('/api/prom/metrics?type=cpu', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('backend cpu:', data[0].values);
      const time: Number[] = [];
      const cpuUsage: Number[] = [];
      data[0].values.forEach((el: [number, string]) => {
        time.push(el[0]);
        cpuUsage.push(Number(el[1]));
      })

      setLabel(time);
      setData(cpuUsage);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const data1 = {
    labels: label,
    datasets: [{
      label: 'My First Dataset',
      data: data, // set data to cpuUsage
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <div>
      <Line data={data1} />
    </div>
  )

}