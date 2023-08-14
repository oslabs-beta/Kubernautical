import React, { FC, useState, useEffect, useContext } from 'react';
import { GlobalContext } from './Contexts';
import type { Props, LogEntry } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { AnySrvRecord } from 'dns';



const Logs: FC<Props> = ({ namespace }) => {
  const [data, setData] = useState<LogEntry[]>([]);
  const [expandedLog, setExpandedLog] = useState<LogEntry | null>(null);;

  const getLogs = async () => {
    try {
      console.log('namespace:', namespace)
      const url = `/api/loki/logs?namespace=${namespace}`;
      const response = await fetch(url);
      const data = (await response.json()).data.result;
      console.log('data:', data);

      setData(data);
    } catch (error) {
      console.log('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    getLogs();
  },[namespace]);


  const handleLogClick = (log: LogEntry) => {
    setExpandedLog(prevLog => (prevLog === log ? null : log));
  };


  return (
    <div className='log-container Logs'>
      {data.map((object: any, log) => {
        const {stream, values} = object;
        return (
          <div key={uuidv4()} className='log-entry'>
              {values.map((value: any) => (
                <div key={uuidv4()} className='value-entry'>
                  <div className='clickable' onClick={() => handleLogClick(object)}>
                    <div>Time: {value[0]}</div>
                    <div>Log: {value[1]}</div>
                  </div>
              
            {expandedLog === object && (
              <div className='log-details'>
                <p>Namespace: {stream.namespace}</p>
                <p>Container: {stream.container}</p>
                <p>Job: {stream.job}</p>
                </div>
                )}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};



export default Logs



  // result.map((container) => {
  //   const {stream, values} = container;
  //   const{container, filename, job, namespace} = stream;
  //   return (
  //     <div>
  //       {values.map((log) => {
  //         return (
  //           <>
  //           <div>{namespace}</div>
  //           <div>{log[0], log[1]}</div>
  //           </>
  //         )
  
  //       })}
  //     </div>
  //   )
  // })