/* eslint-disable no-shadow */
import React, { useState, useContext, type ReactElement } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type MiniProps } from '../../../types/types'
import { GlobalContext } from '../Contexts'

function CRUDMini (
  {
    style,
    setShowModal,
    modalType,
    crudSelection,
    ns,
    service,
    deployment
  }: MiniProps
): ReactElement {
  const {
    globalClusterData,
    setShowEditModal, globalClusterContext,
    setGlobalCrudChange, globalCrudChange,
    setOngoingCrudChange
  } = useContext(GlobalContext)
  const [form, setForm] = useState('')
  const [form2, setForm2] = useState('')
  const [exposeType, setExposeType] = useState('')
  const [targetPort, setTargetPort] = useState(0)
  const [port, setPort] = useState(0)
  // dynamically set inner text for modal
  let name
  if (crudSelection === 'service') name = service
  if (crudSelection === 'deployment') name = deployment
  if (crudSelection === 'namespace') name = ns
  let innerText
  if (modalType === 'create') innerText = `Enter ${crudSelection} here`
  if (modalType === 'delete') innerText = name === undefined ? 'Please make a selection' : `Are you sure you want to remove ${name}?`
  // completely different text for some selections
  if (crudSelection === 'deployment' && modalType === 'edit') innerText = 'Scale Deployment'
  // dynamically find the obj selected for changes
  const obj = (globalClusterData !== undefined) ? globalClusterData[`${crudSelection}s`].find(({ name }: any) => name === (crudSelection === 'service' ? service : deployment)) : null
  // assign previous variable for curent scale of deployment
  const oldReplicas = obj?.availableReplicas ?? 0
  const [scale, setScale] = useState(oldReplicas)

  const crudFunction = async (): Promise<void> => {
    try {
      let query = 'api/crud/'
      let type = ''
      if (modalType === 'create' && form === '') { alert('Please fill out all fields'); return }
      // build query string for back-end operations based on user input
      switch (crudSelection) {
        case 'namespace':
          query += `ns?namespace=${modalType === 'create' ? form : ns}&crud=${modalType}&context=${globalClusterContext ?? ''}`
          break
        case 'deployment':
          if (modalType === 'edit') {
            if (scale !== oldReplicas) type = 'scale'
            if (form2 !== '' && exposeType !== '') type = 'expose'
          } else { type = modalType }
          query += `dep?namespace=${ns}&crud=${type}&${type === 'expose' ? `name=${form2}` : `image=${form2}`}
            &replicas=${scale as string}&deployment=${deployment !== '' ? deployment : ''}&old=${oldReplicas as string}
            &context=${globalClusterContext ?? ''}&port=${port}&targetPort=${targetPort}&type=${exposeType}`
          break
        case 'service':
          query += `svc?namespace=${ns}&crud=${modalType}&service=${service}&context=${globalClusterContext ?? ''}
            &port=${port}&targetPort=${targetPort}`
          break
        default:
          break
      }
      const response = await fetch(query)
      if (setGlobalCrudChange !== undefined) {
        globalCrudChange === true ? setGlobalCrudChange(false) : setGlobalCrudChange(true)
      }
      if (setOngoingCrudChange !== undefined) setOngoingCrudChange(false)
      if (!response.ok) throw new Error()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        className="page-mask"
      />
      <div
        className="crudMini"
        style={{ top: style, position: 'absolute' }}
      >
        <div
          className="crudHeader"
        >
          {innerText}

        </div>
        {modalType === 'create' && (
        <>
          <input
            className="InvisInput"
            type="text"
            placeholder={`New ${crudSelection}`}
            onChange={(e) => { setForm(e.target.value) }}
            required
          />
          <div>
            {crudSelection !== 'namespace' && (
            <input
              className="InvisInput"
              type="text"
              placeholder={crudSelection === 'service' ? 'Service Test' : 'Docker Image'}
              value={form2}
              onChange={(e) => { setForm2(e.target.value) }}
              required
            />
            )}
          </div>
        </>
        )}
        {(modalType === 'edit' && crudSelection === 'deployment') && (
        <>
          <input
            className="InvisInput"
            type="number"
            placeholder="Scale Deployment"
            value={scale}
            onChange={(e) => { setScale(Number(e.target.value)) }}
          />
          <div
            className="crudHeader"
          >
            Expose as Service

          </div>
          <input
            className="InvisInput"
            type="text"
            placeholder="Service Name"
            value={form2}
            onChange={(e) => { setForm2(e.target.value) }}
          />
          <select
            className="InvisInput"
            value={exposeType}
            onChange={(e) => { setExposeType(e.target.value) }}
          >
            <option
              key={uuidv4()}
              value=""
            >
              Select Exposure

            </option>
            <option
              key={uuidv4()}
              value="LoadBalancer"
            >
              Load Balancer

            </option>
            <option
              key={uuidv4()}
              value="ClusterIP"
            >
              Cluster IP

            </option>
            <option
              key={uuidv4()}
              value="NodePort"
            >
              Node Port

            </option>
          </select>
          <div
            className="portsDiv"
          >
            <div
              style={{ width: '70%' }}
            >
              Port:
              {' '}

            </div>
            <input
              className="InvisInput portsEdit"
              type="number"
              value={port}
              onChange={(e) => { setPort(Number(e.target.value)) }}
            />
          </div>
          <div
            className="portsDiv"
          >
            <div
              style={{ width: '70%' }}
            >
              Target Port:
              {' '}

            </div>
            <input
              className="InvisInput portsEdit"
              type="number"
              value={targetPort}
              onChange={(e) => { setTargetPort(Number(e.target.value)) }}
            />
          </div>
        </>
        )}
        <button
          type="button"
          className="InvisSubmit"
          onClick={() => {
            void crudFunction()
            if (setShowEditModal !== undefined) setShowEditModal(false)
            if (setOngoingCrudChange !== undefined) setOngoingCrudChange(true)
          }}
        >
          Finalize

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
export default CRUDMini
