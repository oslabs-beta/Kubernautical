
import React, { useEffect, useState, useContext, FC } from 'react';
import { GlobalContext } from '../components/Contexts';
import type { CLusterObj, Props } from '../../types/types';
import Logs from '../components/Logs';
import { v4 as uuidv4 } from 'uuid';


const types = ['error', 'info'];

const LogsContainer: FC<Props> = ({ header }) => {
  const [namespace, setNamespace] = useState('');
  const [nsArr, setNsArr] = useState<string[]>([]);
  const [logType, setLogType] = useState('');
  const [pod, setPod] = useState('');
  const { globalClusterContext, globalClusterData } = useContext(GlobalContext);
  const getNs = async () => {
    try {
      const url = `/api/cluster/namespaces?context=${globalClusterContext}&all=true`;
      const response = await fetch(url);
      const data = (await response.json());
      const arr: string[] = data.map(({ name }: CLusterObj) => name)
      setNsArr(arr)
    } catch (error) {
      console.log('Error fetching logs namespaces:', error);
    }
  };
  useEffect(() => {
    getNs();
  }, []);
  return (
    <>
      <div className='mainHeader'>{header}</div>
      <div className='buttonWrap'>
        <select className='containerButton mapButton buttonLeft' value={namespace} onChange={(e) => setNamespace(e.target.value)}>
          <option value='Cluster'>Select a Namespace</option>
          {nsArr.map((ns: string) => (
            <option key={uuidv4()} value={ns}>
              {ns}
            </option>
          ))}
        </select>
        {namespace && <select className='containerButton mapButton' value={logType} onChange={(e) => setLogType(e.target.value)}>
          <option value=''>Select a Type</option>
          {types.map((type) => (
            <option key={uuidv4()} value={type}>
              {type}
            </option>
          ))}
        </select>}
        <select className='containerButton mapButton' value={logType} onChange={(e) => setLogType(e.target.value)}>
          <option value=''>Select a Type</option>
          {types.map((type) => (
            <option key={uuidv4()} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className='miniContainerLogs'>
        <Logs namespace={namespace} logType={logType} />
      </div>
    </>
  )
}

export default LogsContainer