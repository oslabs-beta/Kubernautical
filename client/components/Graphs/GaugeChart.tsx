import React, { FC, useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend,);
import type { Props } from '../../../types/types';

const numberArr:Number[] = []
const stringArr:String[] = []
const GaugeChart: FC<Props> = ({type,borderColor,backgroundColor,title,graphTextColor}) => {
  const [guageData, setGuageData] = useState(numberArr);
  const [guageName, setGuageName] = useState(stringArr);

  const getData = async () => {
    try {
      let URL = `/api/prom/${type === 'mem' ? 'mem' : 'metrics'}?type=${type}&hour=24&notTime=true`;
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data)
      if (!data[0]) { setGuageData([0]); return; }
      let dataArr:Number[] = []
      let dataNames:String[] = []
      data.forEach((el:any)=>{
        for(const key in el){
          const value = el[key]
          dataArr.push(value)
          dataNames.push(key)
        }
      })
      setGuageData(dataArr)
      setGuageName(dataNames)
      
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
 
  const data = {
    labels: guageName,
    datasets: [{
      label: 'Percentage',
      data: guageData,
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