import React from 'react'
import { useState, useEffect, FC } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Props } from '../../types/types';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);


const defaultArr: Number[] = []; //typescript set up for UseState make this in types file
const stringArr: String[] = [];

const LineGraph: FC<Props> = ({ type, title, yAxisTitle, color }) => {
  const [data, setData] = useState(defaultArr);
  const [label, setLabel] = useState(stringArr);
  const [hourSelection, setHourSelection] = useState('24');
  const [scope, setScope] = useState('');
  const [scopeType, setScopeType] = useState('');
  const [nameSpaces, setNameSpaces] = useState(stringArr);


  const getNameSpaces = async () => {
    try {
      const response = await fetch('/api/cluster/namespaces', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json()
      const names: String[] = []
      data.forEach((el: any) => {
        if (el === null) return
        if (el.name)
          names.push(el.name)
      })
      setNameSpaces(names)
    } catch (error) {
      console.log('Error fetching NameSpaces:', error);
    }
  };

  const getData = async () => {

    const time: Number[] = [];
    const specificData: Number[] = [];
    const gigaBytes: Number[] = []

    try {
      const response = await fetch(`/api/prom/metrics?type=${type}&hour=${hourSelection}${scope ? `&scope=${scopeType}&name=${scope}` : ''}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!data[0]) {
        setData([]);
        return;
      }
      data[0].values.forEach((el: [number, string]) => {
        time.push(el[0]);
        specificData.push(Number(el[1]));
      })
      //convert bytes into gigabytes if asking for mem
      if (type === 'mem') {
        specificData.forEach((el: any) => {
          const newEl = el / 1073741824
          gigaBytes.push(newEl)
          setData(gigaBytes)
        })
      } else {
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

  //? add needed watchers to useEffect
  useEffect(() => {
    getData();
    getNameSpaces();
  }, [hourSelection, scope]);
  //*only need to get namespaces once
  useEffect(() => {
    getNameSpaces();
  }, []);

  const dataSet = { // Data for tables
    labels: label, //set data for X Axis
    datasets: [{
      label: title,
      data: data, // set data for Y Axis
      fill: true,
      // backgroundColor: color,   //looks better without fill
      borderColor: color,
      pointBorderColor: color,
      tension: .5,
      pointBorderWidth: 1,
      pointHoverRadius: 4,
      pointRadius: 1,
      borderWidth: 1.5,
    }]
  };
  const options: ChartOptions<'line'> = {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 0.1,
        to: 0,
        loop: true
      }
    },
    plugins: {
      legend: {
        display: true
      },
    },
    responsive: true,
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: yAxisTitle
        }
      },
      x: {
        display: true,
        title: {
          display: true,
          text: `Time(${hourSelection}hrs)`
        }
      }
    }
  }
  return (
    <div className='lineGraph'>
      <div>
        <select value={hourSelection} onChange={(e) => setHourSelection(e.target.value)}>
          <option value='1'>1 hour</option>
          <option value='6'>6 hours</option>
          <option value='12'>12 hours</option>
          <option value='24'>24 hours</option>
        </select>
        <select value={scope} onChange={(e) => { setScope(e.target.value); setScopeType('namespace') }}>
          <option value=''>Cluster</option>
          {nameSpaces.map((el) => {
            return (
              <option value={`${el}`}>{el}</option>
            )
          })}
        </select>
      </div>
      <Line data={dataSet} options={options} />
    </div>
  )
}

export default LineGraph;