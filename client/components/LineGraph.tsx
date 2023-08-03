import React from 'react'
import { useState, useEffect, FC } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Props } from '../../types/types';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const defaultArr: Number[] = []; //typescript set up for UseState make this in types file
const stringArr: String[] = []
const LineGraph: FC<Props> = ({ type, title }) => {
  const [data, setData] = useState(defaultArr);
  const [label, setLabel] = useState(stringArr);

  const getData = async () => {
    try {
      const response = await fetch(`/api/prom/metrics?type=${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const time: Number[] = [];
      const specificData: Number[] = [];
      data[0].values.forEach((el: [number, string]) => {
        time.push(el[0]);
        specificData.push(Number(el[1]));
      })

      //convert bytes into gigabytes if asking for mem
      const gigaBytes: Number[] = []
      if (type === 'mem'){
        specificData.forEach((el:any)=>{
          const newEl = el / 1073741824 
          gigaBytes.push(newEl)
          setData(gigaBytes)
        })
      }else{
        setData(specificData)
      }
      //set time
      const timeLabels: String[] = [];
      time.forEach((el: any) => {
        const date: Date = new Date(1000 * el); // Convert seconds to milliseconds for Date Function
        const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
        timeLabels.push(formattedTime);
        setLabel(timeLabels);
      });
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const dataSet = { // Data for tables
    labels: label, //set data for y Axis
    datasets: [{
      label: title,
      data: data, // set data for x Axis
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      yAxisType: 'Cpu Usage Pecent',
      xAxisType: 'Time'
    }]
  };

  return (
    <div className='lineGraph'>
      <Line data={dataSet} />
    </div>
  )

}

export default LineGraph;