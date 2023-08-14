import React, { useState, useEffect, useContext, FC } from 'react';
import { GlobalContext } from '../Contexts';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { CLusterObj, Props } from '../../../types/types';
import { v4 as uuidv4 } from 'uuid';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);


const defaultArr: Number[] = []; //typescript set up for UseState make this in types file
const stringArr: String[] = [];

const LineGraph: FC<Props> = ({ type, title, yAxisTitle, color, graphTextColor }) => {
  const { globalClusterData, globalServices } = useContext(GlobalContext);
  const [data, setData] = useState(defaultArr);
  const [label, setLabel] = useState(stringArr);
  const [hourSelection, setHourSelection] = useState('24');
  const [scope, setScope] = useState('');
  const [scopeType, setScopeType] = useState('');

  const getData = async () => {
    const time: Number[] = [];
    const specificData: Number[] = [];
    const gigaBytes: Number[] = []
    const kiloBytes: Number[] = []

    try {
      const ep = globalServices?.find(({ name }) => name.slice(0, 17) === 'prometheus-server')?.ip;
      const response = await fetch(`/api/prom/metrics?ep=${ep}&type=${type}&hour=${hourSelection}${scope ? `&scope=${scopeType}&name=${scope}` : ''}`, {
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
      } else if (type === 'trans' || type === 'rec') { // convert bytes into kilobytes if asking for trans or rec
        specificData.forEach((el: any) => {
          const newEl = el / 1000
          kiloBytes.push(newEl)
          setData(kiloBytes)
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
  }, [hourSelection, scope]);

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
      pointBackgroundColor: 'white',
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
        labels: {
          color: graphTextColor
        },
        display: true

      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: graphTextColor
        },
        grid: {
          display: true,
          color: `rgba(128, 128, 128, 0.1)`
        },
        display: true,
        title: {
          display: true,
          text: yAxisTitle,
          color: graphTextColor
        }
      },
      x: {
        ticks: {
          color: graphTextColor
        },
        grid: {
          display: false,
          color: `rgba(128, 128, 128, 0.1)`
        },
        display: true,
        title: {
          display: true,
          text: `Time(${hourSelection}hrs)`,
          color: 'rgba(255, 255, 255, 0.702)'
        }
      }
    }
  }
  return (
    <div className='lineGraph'>
      <div>
        <select className='containerButton' id='hourDropDown' value={hourSelection} onChange={(e) => setHourSelection(e.target.value)}>
          <option value='1'>1 hour</option>
          <option value='6'>6 hours</option>
          <option value='12'>12 hours</option>
          <option value='24'>24 hours</option>
        </select>
        <select className='containerButton' value={scope} onChange={(e) => { setScope(e.target.value); setScopeType('namespace') }}>
          <option value=''>Cluster</option>
          {globalClusterData?.namespaces?.map((el: CLusterObj) => {
            const { name } = el;
            return (
              <option key={uuidv4()} value={`${name}`}>{name}</option>
            )
          })}
        </select>
      </div>
      <Line data={dataSet} options={options} />
    </div>
  )
}

export default LineGraph;