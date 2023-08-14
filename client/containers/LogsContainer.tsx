
import React, { useEffect, useState, useContext, FC } from 'react';
import { GlobalContext } from '../components/Contexts';

import type { Props } from '../../types/types';
import Logs from '../components/Logs';


const LogsContainer: FC<Props> = ({ header }) => {
  const [namespace, setNamespace] = useState('Cluster');
  const { globalNamespaces } = useContext(GlobalContext);

  return (
    <>
      <div className='mainHeader'>{header}</div>
      
      <div style={{ position: 'relative', zIndex: 3, right: '28.5%' }}>
                <select 
                  className='containerButton mapButton' 
                  value={namespace} 
                  onChange={(e) => setNamespace(e.target.value)}>

                    <option value='Cluster'>Select a Namespace</option>
                    {globalNamespaces?.map((ns) => (
                      <option key={ns} value={ns}>
                        {ns}
                      </option>
                    ))}
              </select>
      </div>
      <div className='miniContainerLogs'>
      
        <Logs namespace={namespace}/>
    

      </div>
    </>
  )
}

export default LogsContainer