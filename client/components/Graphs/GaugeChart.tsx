/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext, type ReactElement } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { humanReadable } from '../helperFunctions'
import type { GaugeGraphProps, globalServiceObj } from '../../../types/types'
import { GlobalContext } from '../Contexts'

ChartJS.register(ArcElement, Tooltip, Legend)

const numberArr: number[] = []
const stringArr: string[] = []
function GaugeChart (
  {
    type,
    borderColor,
    backgroundColor,
    title,
    graphTextColor
  }: GaugeGraphProps
): ReactElement {
  const { globalServices } = useContext(GlobalContext)
  const [guageData, setGuageData] = useState(numberArr)
  const [guageName, setGuageName] = useState(stringArr)
  let svcArr: globalServiceObj[] | undefined

  const getData = async (): Promise<void> => {
    try {
      const localSvc = localStorage.getItem('serviceArr')
      if (localSvc !== null) svcArr = await JSON.parse(localSvc)
      else svcArr = globalServices
      const ep = svcArr?.find(({ name }) => name.slice(0, 17) === 'prometheus-server')?.ip ?? ''
      const URL = `/api/prom/${type === 'mem' ? 'mem' : 'cpu'}?type=${type}&hour=24&notTime=true&ep=${ep}`
      const response = await fetch(URL)
      const data = await response.json()
      if (data[0] === undefined) { setGuageData([0]); return }
      const dataArr: number[] = []
      const dataNames: string[] = []
      data.forEach((el: any) => {
        const key = Object.keys(el)[0]
        dataArr.push(el[key])
        dataNames.push(humanReadable(key))
      })
      setGuageData(dataArr)
      setGuageName(dataNames)
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }
  useEffect(() => {
    void getData()
  }, [])

  const data = {
    labels: guageName,
    datasets: [{
      label: 'Percentage',
      data: guageData,
      backgroundColor,
      borderColor,
      circumference: 180,
      rotation: 270,
      cutout: '60%'
    }]
  }

  const options = {
    // aspectRatioL:2,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: graphTextColor
        },
        display: true
      },
      title: {
        color: graphTextColor,
        display: true,
        text: title
      }
    }
  }

  return (
    <div className="guageGraph">
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default GaugeChart
