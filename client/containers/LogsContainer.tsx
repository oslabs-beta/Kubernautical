import React, { useEffect, useState, useContext, type ReactElement } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GlobalContext } from '../components/Contexts'
import type { CLusterObj, Props } from '../../types/types'
import Logs from '../components/Logs'

const types = ['error', 'info']

function LogsContainer ({ header }: Props): ReactElement {
  const [ns, setNs] = useState('default')
  const [nsArr, setNsArr] = useState<string[]>([])
  const [pod, setPod] = useState('')
  const [podArr, setPodArr] = useState<string[]>([])
  const [logType, setLogType] = useState('')
  const { globalClusterContext, globalClusterData } = useContext(GlobalContext)
  const getNs = async (): Promise<void> => {
    try {
      const tempPodArr = globalClusterData?.pods
        ?.filter(({ namespace }: CLusterObj) => namespace === ns)
        .map(({ name }: CLusterObj) => name)
      const url = `/api/cluster/namespaces?context=${globalClusterContext ?? ''}&all=true`
      const response = await fetch(url)
      const data = (await response.json())
      const arr: string[] = data.map(({ name }: CLusterObj) => name)
      setPodArr(tempPodArr)
      setNsArr(arr)
      setPod('')
    } catch (error) {
      console.log('Error fetching logs namespaces:', error)
    }
  }
  useEffect(() => {
    void getNs()
  }, [ns])
  return (
    <>
      <div className="mainHeader">{header}</div>
      <div className="buttonWrap">
        <select className="containerButton mapButton buttonLeft" value={ns} onChange={(e) => { setNs(e.target.value) }}>
          <option value="Cluster">Select a Namespace</option>
          {nsArr?.map((nS: string) => (
            <option key={uuidv4()} value={nS}>
              {nS}
            </option>
          ))}
        </select>
        {(ns !== '') && (
        <select className="containerButton mapButton" value={pod} onChange={(e) => { setPod(e.target.value) }}>
          <option value="">Select a Pod</option>
          {podArr?.map((el) => (
            <option key={uuidv4()} value={el}>
              {el}
            </option>
          ))}
        </select>
        )}
        <select className="containerButton mapButton" value={logType} onChange={(e) => { setLogType(e.target.value) }}>
          <option value="">Select a Type</option>
          {types.map((type) => (
            <option key={uuidv4()} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="miniContainerLogs">
        <Logs namespace={ns} logType={logType} pod={pod} />
      </div>
    </>
  )
}

export default LogsContainer
