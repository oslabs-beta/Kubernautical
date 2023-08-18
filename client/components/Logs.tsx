import React, { FC, useState, useEffect, useContext } from 'react';
import type { Props, LogEntry, globalServiceObj } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from './Contexts';

const Logs: FC<Props> = ({ namespace, logType, pod }) => {
  const [data, setData] = useState<LogEntry[]>([]);
  const [expandedLog, setExpandedLog] = useState<LogEntry | null>(null);
  const { globalServices } = useContext(GlobalContext)
  let svcArr: globalServiceObj[] | undefined;

  const getLogs = async () => {
    try {
      console.log(globalServices)
      const localSvc = localStorage.getItem('serviceArr');
      if (localSvc) svcArr = await JSON.parse(localSvc);
      else svcArr = globalServices;
      const ep = svcArr?.find(({ name }) => name.slice(0, 12) === 'loki-gateway')?.ip;
      console.log(ep)
      const url = `/api/loki/logs?namespace=${namespace}&log=${logType}&pod=${pod}&ep=${ep}`;
      const response = await fetch(url);
      const data = (await response.json()).data.result;

      setData(data);
    } catch (error) {
      console.log('Error fetching logs:', error);
    }
  };
  const handleLogClick = (log: LogEntry) => {
    expandedLog === log ? setExpandedLog(null) : setExpandedLog(log);
  };
  useEffect(() => {
    getLogs();
  }, [namespace, logType, pod]);
  return (
    <div>
      {data && data.map((object: any, log) => {
        const { stream, values } = object;
        const { namespace, container, node_name, pod, job } = stream;
        return (
          <div key={uuidv4()} className='log-entry'>
            {values.map((value: any) => {
              const i = value[1].indexOf('ts=');
              const t = value[1].substring(i + 3, i + 24)
              return (
                <div key={value[0]} className='value-entry'>
                  <div className='clickable' onClick={() => handleLogClick(value[0])}>
                    <div>Container: {container}</div>
                    <div>Log: {value[1]}</div>
                  </div>
                  {expandedLog === value[0] && (
                    <div className='log-details'>
                      <p>Time: {t}</p>
                      <p>Namespace: {namespace}</p>
                      <p>Container: {container}</p>
                      <p>Job: {job}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Logs;
