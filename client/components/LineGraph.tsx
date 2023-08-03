import React from 'react'
import { useState, useEffect, FC } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Props } from '../../types/types';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const defaultArr: Number[] = []; //typescript set up for UseState make this in types file
const stringArr: String[] = []
const LineGraph: FC<Props> = ({ type, title, yAxisTitle,color,hour }) => {
  const [data, setData] = useState(defaultArr);
  const [label, setLabel] = useState(stringArr);
  console.log(type, title, yAxisTitle,color,hour)
  const getData = async () => {
    try {
      const response = await fetch(`/api/prom/metrics?type=${type}&hour=${hour}`, {
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
      //set Unix time to Hours and Minutes
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
      fill: true,
      backgroundColor:color,
      borderColor: color,
      pointBorderColor:color,
      tension: .5,
      pointBorderWidth:1,
      pointHoverRadius:4,
      pointRadius:1,
      borderWidth:1.5,
    }]
  };
  const options: ChartOptions<'line'> = {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: .1,
        to: 0,
        loop: true
      }
    },
    plugins:{
      legend: {
        display:true
      }
    },
    responsive:true,
    scales:{
      y:{
        display:true,
        title:{
          display:true,
          text:yAxisTitle
        }
      },
      x:{
        display:true,
        title:{
          display:true,
          text: 'Time(24hrs)'
        }
      }
    }
  }

  return (
    <div className='lineGraph'>
      <Line data={dataSet} options={options} />
    </div>
  )

}

export default LineGraph;