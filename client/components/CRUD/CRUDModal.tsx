import React, { useState, type ReactElement } from 'react'
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
      {showModal &&
        (
          <CRUDMini
            ns={ns}
            style={modalPos}
            modalType={modalType}
            setShowModal={setShowModal}
            crudSelection={crudSelection}
            service={service}
            deployment={deployment}
          />
        )}
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
      {ns !== '' &&
        (
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
        )}
      {(crudSelection !== 'namespace' && ns !== '') &&
        (
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
        )}
    </div>
  )
}
export default CRUDModal
