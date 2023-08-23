/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext, type ReactElement } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { LogProps, LogEntry, globalServiceObj } from '../../types/types'
import { GlobalContext } from './Contexts'

function Logs ({ namespace, logType, pod }: LogProps): ReactElement {
  const [data, setData] = useState<LogEntry[]>([])
  const [expandedLog, setExpandedLog] = useState<LogEntry | null>(null)
  const { globalServices } = useContext(GlobalContext)
  let svcArr: globalServiceObj[] | undefined

  const getLogs = async (): Promise<void> => {
    try {
      const localSvc = localStorage.getItem('serviceArr')
      if (localSvc !== null) svcArr = await JSON.parse(localSvc)
      else svcArr = globalServices
      const ep = svcArr?.find(({ name }) => name.slice(0, 12) === 'loki-gateway')?.ip
      const url = `/api/loki/logs?namespace=${namespace}&log=${logType}&pod=${pod}&ep=${ep ?? ''}`
      const response = await fetch(url)
      const newData = (await response.json()).data.result

      setData(newData)
    } catch (error) {
      console.log('Error fetching logs:', error)
    }
  }
  const handleLogClick = (log: LogEntry): void => {
    expandedLog === log ? setExpandedLog(null) : setExpandedLog(log)
  }
  useEffect(() => {
    void getLogs()
  }, [namespace, logType, pod])
  return (
    <div>
      {data?.map((object: any, log) => {
        const { stream, values } = object
        const { namespace, container, job } = stream
        return (
          <div key={uuidv4()} className="log-entry">
            {values.map((value: any) => {
              const i: number = value[1].indexOf('ts=')
              const t = value[1].substring(i + 3, i + 24)
              return (
                <div key={value[0]} className="value-entry">
                  <div className="clickable" onClick={() => { handleLogClick(value[0]) }}>
                    <div>
                      Container:
                      {' '}
                      {container}
                    </div>
                    <div>
                      Log:
                      {' '}
                      {value[1]}
                    </div>
                  </div>
                  {expandedLog === value[0] && (
                    <div className="log-details">
                      <p>
                        Time:
                        {' '}
                        {t}
                      </p>
                      <p>
                        Namespace:
                        {' '}
                        {namespace}
                      </p>
                      <p>
                        Container:
                        {' '}
                        {container}
                      </p>
                      <p>
                        Job:
                        {' '}
                        {job}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Logs
