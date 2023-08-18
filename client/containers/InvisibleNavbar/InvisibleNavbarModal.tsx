import React, { useState, useContext, type ReactElement } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { InvisibleNavbarModalProps } from '../../../types/types'
import { GlobalContext } from '../../components/Contexts'

function InvisibleNavbarModal (
  {
    style,
    setShowModal
  }: InvisibleNavbarModalProps
): ReactElement {
  const {
    globalServices,
    globalTimer, setGlobalTimer,
    setGlobalServiceTest
  } = useContext(GlobalContext)
  const [vU, setVu] = useState(0)
  const [duration, setDuration] = useState(0)
  const [service, setService] = useState('')

  const loadtest = async (): Promise<void> => {
    if (vU < 0 || duration < 0) { alert('Please choose positive numbers'); return }
    if (vU === 0 || duration === 0) { alert('Please fill out both fields'); return }
    if (globalTimer !== 0) { alert('Load test is currently running, please wait'); return }
    try {
      const response = await fetch(`/api/k6/test?vus=${vU}&duration=${duration}&ip=${service}`)
      const data = response.json()
      console.log(data)
      setShowModal(false)
      const filtered = globalServices?.find((gService) => gService?.ip === service)
      if (setGlobalServiceTest !== undefined) setGlobalServiceTest(filtered?.name ?? '')
      if (setGlobalTimer !== undefined) setGlobalTimer((Date.now() + (duration * 1000)))
    } catch (error) {
      console.log('error in running load test:', error)
    }
  }
  return (
    <>
      <div
        className="page-mask"
      />
      <div
        className="invisModal"
        style={{ top: style, position: 'absolute' }}
      >
        <div>
          <select
            className="InvisService"
            value={service}
            onChange={(e) => { setService(e.target.value) }}
          >
            <option value="">Select Service</option>
            {(globalServices != null)
              ? globalServices.map((el) => (
                <option key={uuidv4()} value={el.ip}>{el.name}</option>
              ))
              : <div />}
          </select>
        </div>
        <input
          className="InvisInput"
          type="number"
          placeholder="Number of VUs"
          onChange={(e) => { setVu(Number(e.target.value)) }}
        />
        <input
          className="InvisInput"
          type="number"
          placeholder="Test Duration"
          onChange={(e) => { setDuration(Number(e.target.value)) }}
        />
        <button
          type="button"
          className="InvisSubmit"
          onClick={() => { void loadtest() }}
        >
          DDOS me

        </button>
        <button
          type="button"
          className="closeInvisModal"
          onClick={() => { setShowModal(false) }}
        >
          X

        </button>
      </div>
    </>
  )
}

export default InvisibleNavbarModal
