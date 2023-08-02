import React from 'react'
import { useState, useEffect, FC } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Props } from '../../types/types';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const defaultArr: Number[] = []; //typescript set up for UseState make this in types file

const LineGraph: FC<Props> = ({ type, title }) => {
  const [data, setData] = useState(defaultArr);
  const [label, setLabel] = useState(defaultArr);
  const [finalData, setFinalData] = useState(defaultArr)

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
      setLabel(time);
      setData(specificData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  //convert bytes into Gigabytes
  const gigaBytes: number[] = []
  data.forEach((el: any) => {
    const newEl = el / 1073741824 //converts bytes into Gigabytes
    gigaBytes.push(newEl)
  })

  // make strings readable time
  const timeLabels: string[] = [];
  label.forEach((el: any) => {
    const date: Date = new Date(1000 * el); // Convert seconds to milliseconds for Date Function
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
    timeLabels.push(formattedTime);
  });

  //check what data you're passing
  useEffect(() => {
    if (type === 'mem') { setFinalData(gigaBytes) }
    if (type === 'cpu') { setFinalData(data) }
  }, [data]);

  const dataSet = { // Data for tables
    labels: timeLabels, //set data for y Axis
    datasets: [{
      label: title,
      data: finalData, // set data for x Axis
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