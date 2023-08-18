import React, { useState, useContext, type ReactElement } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type ClusterData, CLusterObj, type Props } from '../../../types/types'
import { GlobalContext } from '../Contexts'
// import { capitalize } from '../helperFunctions';
import CrudSelector from './CRUDSelector'

// const defaultArr: string[] = []
// const defaultObj: CLusterObj = []
function CRUDModal (): ReactElement {
  const {
    setGlobalServices, globalServices,
    setGlobalClusterData, globalClusterData,
    setShowEditModal, globalClusterContext,
    setGlobalCrudChange, globalCrudChange,
    setOngoingCrudChange, ongoingCrudChange
  } = useContext(GlobalContext)
  const [ns, setNs] = useState('')
  const [service, setService] = useState('')
  const [deployment, setDeployment] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [crudSelection, setCrudSelection] = useState('namespace')
  const [modalPos, setModalPos] = useState(0)
  const [modalType, setModalType] = useState('')

  // ?---------------------------------Modal Component--------------------------------------------->
  function Modal ({ style }): ReactElement {
    const [form, setForm] = useState('')
    const [form2, setForm2] = useState('')
    const [exposeType, setExposeType] = useState('')
    const [targetPort, setTargetPort] = useState(0)
    const [port, setPort] = useState(0)
    // dynamically set inner text for modal
    const name = crudSelection === 'service' ? service : crudSelection === 'deployment' ? deployment : crudSelection === 'namespace' ? ns : null
    let innerText = modalType === 'create' ? `Enter ${crudSelection} here` : name ? `Are you sure you want to remove ${name}?` : 'Please make a selection'
    // completely different modal for some selections
    crudSelection === 'deployment' && modalType === 'edit' ? innerText = 'Scale Deployment' : null
    // service expose
    const obj = (globalClusterData != null) ? globalClusterData[`${crudSelection}s`].find(({ name }: any) => name === (crudSelection === 'service' ? service : deployment)) : null
    const [scale, setScale] = useState(obj?.availableReplicas ? obj?.availableReplicas : 0) //! this is also smooth brain
    const oldReplicas = obj?.availableReplicas ? obj?.availableReplicas : 0

    const crudFunction = async () => {
      try {
        let query = 'api/crud/'
        if (modalType === 'create' && form === '') { alert('Please fill out all fields'); return }
        // if (modalType === 'edit' && form === '') return alert('Please fill out all fields')
        switch (crudSelection) {
          case 'namespace':
            query += `ns?namespace=${modalType === 'create' ? form : ns}&crud=${modalType}&context=${globalClusterContext}`
            break
          case 'deployment':
            let type = ''
            if (modalType === 'edit') {
              if (scale !== oldReplicas) type = 'scale'
              if (form2 && exposeType) type = 'expose'
            } else { type = modalType }
            query += `dep?namespace=${ns}&crud=${type}&${type === 'expose' ? `name=${form2}` : `image=${form2}`}
            &replicas=${scale}&deployment=${form || deployment}&old=${oldReplicas}
            &context=${globalClusterContext}&port=${port}&targetPort=${targetPort}&type=${exposeType}`
            break
          case 'service':
            query += `svc?namespace=${ns}&crud=${modalType}&service=${service}&context=${globalClusterContext}
            &port=${port}&targetPort=${targetPort}`
            break

          default:
            break
        }
        const response = await fetch(query)
        if (setGlobalCrudChange != null) globalCrudChange ? setGlobalCrudChange(false) : setGlobalCrudChange(true)
        if (setOngoingCrudChange != null) setOngoingCrudChange(false)
        if (!response.ok) throw new Error()
      } catch (error) {
        throw error
      }
    }

    return ( // could still be improved upon
      <>
        <div className="page-mask" />
        <div className="crudMini" style={{ top: style, position: 'absolute' }}>
          <div className="crudHeader">{innerText}</div>
          {modalType === 'create' && (
            <>
              <input className="InvisInput" type="text" placeholder={`New ${crudSelection}`} onChange={(e) => { setForm(e.target.value) }} required />
              <div>
                {crudSelection !== 'namespace' &&
                  <input className="InvisInput" type="text" placeholder={crudSelection === 'service' ? 'Service Test' : 'Docker Image'} value={form2} onChange={(e) => { setForm2(e.target.value) }} required />}
              </div>
            </>
          )}
          {(modalType === 'edit' && crudSelection === 'deployment') && (
            <>
              <input className="InvisInput" type="number" placeholder="Scale Deployment" value={scale} onChange={(e) => { setScale(Number(e.target.value)) }} />
              <div className="crudHeader">Expose as Service</div>
              <input className="InvisInput" type="text" placeholder="Service Name" value={form2} onChange={(e) => { setForm2(e.target.value) }} />
              <select className="InvisInput" value={exposeType} onChange={(e) => { setExposeType(e.target.value) }}>
                <option key={uuidv4()} value="">Select Exposure</option>
                <option key={uuidv4()} value="LoadBalancer">Load Balancer</option>
                <option key={uuidv4()} value="ClusterIP">Cluster IP</option>
                <option key={uuidv4()} value="NodePort">Node Port</option>
              </select>
              <div className="portsDiv">
                <div style={{ width: '70%' }}>Port: </div>
                <input className="InvisInput portsEdit" type="number" value={port} onChange={(e) => { setPort(Number(e.target.value)) }} />
              </div>
              <div className="portsDiv">
                <div style={{ width: '70%' }}>Target Port: </div>
                <input className="InvisInput portsEdit" type="number" value={targetPort} onChange={(e) => { setTargetPort(Number(e.target.value)) }} />
              </div>
            </>
          )}
          <button className="InvisSubmit" onClick={() => { crudFunction(); (setShowEditModal != null) ? setShowEditModal(false) : null; (setOngoingCrudChange != null) ? setOngoingCrudChange(true) : null }}>Finalize</button>
          <button className="closeInvisModal" onClick={() => { setShowModal(false) }}>X</button>
        </div>
      </>
    )
  }
  // ?-------------------------------CRUDModal Return-------------------------------------------->
  return (
    <div className="invisModal editModal">
      {showModal ? <Modal style={modalPos} type="service" /> : null}
      <div className="crudHeader">Cluster Editor</div>
      <hr className="hrCrud" />
      <CrudSelector
        type="namespace"
        state={ns}
        stateSetter={setNs}
        showModal={showModal}
        setShowModal={setShowModal}
        modalPos={modalPos}
        setModalPos={setModalPos}
        modalType={modalType}
        setModalType={setModalType}
        setCrudSelection={setCrudSelection}
      />
      {ns
        ? (
          <CrudSelector
            type="scope"
            state={ns}
            stateSetter={setNs}
            showModal={showModal}
            setShowModal={setShowModal}
            modalPos={modalPos}
            setModalPos={setModalPos}
            modalType={modalType}
            setModalType={setModalType}
            crudSelection={crudSelection}
            setCrudSelection={setCrudSelection}
          />
          )
        : null}
      {crudSelection !== 'namespace' && ns
        ? (
          <CrudSelector
            ns={ns}
            type={`${crudSelection}`}
            state={crudSelection === 'service' ? service : deployment}
            stateSetter={crudSelection === 'service' ? setService : setDeployment}
            showModal={showModal}
            setShowModal={setShowModal}
            modalPos={modalPos}
            setModalPos={setModalPos}
            modalType={modalType}
            setModalType={setModalType}
            setCrudSelection={setCrudSelection}
          />
          )
        : null}
    </div>
  )
}
export default CRUDModal
