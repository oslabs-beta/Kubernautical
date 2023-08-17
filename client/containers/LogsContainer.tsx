
import React, { useEffect, useState, useContext, FC } from 'react';
import { GlobalContext } from '../components/Contexts';
import type { CLusterObj, Props } from '../../types/types';
import Logs from '../components/Logs';
import { v4 as uuidv4 } from 'uuid';


const types = ['error', 'info'];

const LogsContainer: FC<Props> = ({ header }) => {
  const [namespace, setNamespace] = useState('gmp-system');
  const { globalClusterData } = useContext(GlobalContext);
  const [logType, setLogType] = useState('info');

  return (
    <>
      <div className='mainHeader'>{header}</div>
      <div className='buttonWrap'>
        <select className='containerButton mapButton buttonLeft' value={namespace} onChange={(e) => setNamespace(e.target.value)}>
          <option value='Cluster'>Select a Namespace</option>
          {globalClusterData?.namespaces?.map((ns: CLusterObj) => {
            const { name } = ns;
            return (
              <option key={uuidv4()} value={name}>
                {name}
              </option>
            )
          })}
        </select>
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