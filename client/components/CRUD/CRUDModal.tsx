import React, { useState, useContext, type ReactElement } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type ClusterData, CLusterObj, type Props } from '../../../types/types'
import { GlobalContext } from '../Contexts'
// import { capitalize } from '../helperFunctions';
import CrudSelector from './CRUDSelector'
import CRUDMini from './CRUDMini'

function CRUDModal (): ReactElement {
  const [ns, setNs] = useState('')
  const [service, setService] = useState('')
  const [deployment, setDeployment] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [crudSelection, setCrudSelection] = useState('namespace')
  const [modalPos, setModalPos] = useState(0)
  const [modalType, setModalType] = useState('')

  return (
    <div className="invisModal editModal">
      {showModal
        ? (
          <CRUDMini
            style={modalPos}
            modalType={modalType}
            setShowModal={setShowModal}
          />
          )
        : null}
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
