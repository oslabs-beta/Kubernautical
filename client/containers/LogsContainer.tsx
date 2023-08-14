
import React, { useEffect, useState, useContext, FC } from 'react';
import { GlobalContext } from '../components/Contexts';
import type { CLusterObj, Props } from '../../types/types';
import Logs from '../components/Logs';
import { v4 as uuidv4 } from 'uuid';


const LogsContainer: FC<Props> = ({ header }) => {
  const [namespace, setNamespace] = useState('Cluster');
  const { globalClusterData } = useContext(GlobalContext);

  return (
    <>
      <div className='mainHeader'>{header}</div>
      <div style={{ position: 'relative', zIndex: 3, right: '28.5%' }}>
        <select
          className='containerButton mapButton'
          value={namespace}
          onChange={(e) => setNamespace(e.target.value)}>
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
      </div>
      <div className='miniContainerLogs'>
        <Logs namespace={namespace} />
      </div>
    </>
  )
}

export default LogsContainer