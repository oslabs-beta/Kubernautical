import React, { FC, useState, useEffect, useContext } from 'react';
import type { Props, LogEntry } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';


const Logs: FC<Props> = ({ namespace }) => {
  const [data, setData] = useState<LogEntry[]>([]);
  const [expandedLog, setExpandedLog] = useState<LogEntry | null>(null);

  const getLogs = async () => {
    try {
      const url = `/api/loki/logs?namespace=${namespace}`;
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
  }, [namespace]);
  return (
    <div>
      {data.map((object: any, log) => {
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