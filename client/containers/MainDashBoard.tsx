import LineGraph from '../components/Graphs/LineGraph'
import GaugeChart from '../components/Graphs/GaugeChart'
import { GlobalContext } from '../components/Contexts';
import React, { FC, useContext, useEffect } from 'react'
import type { Props, globalServiceObj } from '../../types/types';
import InvisibleNavbar from './InvisibleNavbar';


const MainDashBoard: FC<Props> = ({ header }) => {
  const textColor = 'rgba(255, 255, 255, 0.702)';
  let svcArr: globalServiceObj[] | undefined;
  let ep: string | undefined;
  const { globalClusterData, globalServices } = useContext(GlobalContext); //TODO pass clusterData as well

  const checkLocal = async () => {
    const localSvc = localStorage.getItem('serviceArr');
    if (localSvc) {
      svcArr = await JSON.parse(localSvc);
    }
    else svcArr = globalServices;
    ep = svcArr?.find(({ name }) => name.slice(0, 17) === 'prometheus-server')?.ip;
    console.log(ep)
  }
  useEffect(() => {
    checkLocal();
  }, []);
  return (
    <>
      <div className='mainHeader'>{header}</div>
      <InvisibleNavbar />
      <div className='miniContainerGraph'>
        <LineGraph
          title="CPU Usage"
          type="cpu"
          yAxisTitle='CPU Percentage Usage'
          color='rgba(39, 170, 245, 0.8)'
          graphTextColor={textColor}
          ep={ep}
        />
        <LineGraph
          title="Memory Usage"
          type="mem"
          yAxisTitle='Memory Used (GB)'
          color='rgba(245, 39, 39, 0.8)'
          graphTextColor={textColor}
          ep={ep}
        />
      </div>
      <div className='miniContainerGraph'>
        <GaugeChart
          type="cpu"
          backgroundColor={['rgba(39, 245, 213, 0.3)', 'rgba(39, 245, 127, 0.3)', 'rgba(39, 97, 245, 0.3)']}
          borderColor={['rgba(39, 245, 213, 0.7)', 'rgba(39, 245, 127, 0.7)', 'rgba(39, 97, 245, 0.7)']}
          title='Cpu'
          graphTextColor={textColor}
          ep={ep}
        />
        <GaugeChart
          type="mem"
          backgroundColor={['rgba(144, 39, 245, 0.3)', 'rgba(245, 39, 178, 0.3)', 'rgba(245, 39, 41, 0.3)']}
          borderColor={['rgba(144, 39, 245, 0.7)', 'rgba(245, 39, 178, 0.7)', 'rgba(245, 39, 41, 0.7)']}
          title='Memory'
          graphTextColor={textColor}
          ep={ep}
        />
      </div>
    </>

  )
}

export default MainDashBoard