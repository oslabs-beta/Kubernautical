import React, { useContext, type SyntheticEvent, type ReactElement } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GlobalContext } from '../Contexts'
import { type CLusterObj, type SelectorProps } from '../../../types/types'
import { capitalize } from '../helperFunctions'
import edit from '../../assets/images/edit.png'

function CrudSelector (
  {
    type,
    state,
    stateSetter,
    showModal,
    setShowModal,
    modalPos,
    setModalPos,
    modalType,
    setModalType,
    crudSelection,
    setCrudSelection,
    ns
  }: SelectorProps
): ReactElement {
  const { globalClusterData } = useContext(GlobalContext)

  const openModal = (e: SyntheticEvent): void => {
    setModalPos(e.currentTarget.getBoundingClientRect().bottom + 5)
    showModal ? setShowModal(false) : setShowModal(true)
  }
  if (type === 'scope') {
    return (
      <>
        <div
          className="crudHeader"
        >
          Select Scope

        </div>
        <div
          className="crudSelector"
        >
          <select
            className="containerButton mapButton"
            value={crudSelection}
            onChange={(e) => { setCrudSelection(e.target.value) }}
          >
            <option
              key={uuidv4()}
              value="namespace"
            >
              Select Scope

            </option>
            <option
              key={uuidv4()}
              value="deployment"
            >
              Deployments

            </option>
            <option
              key={uuidv4()}
              value="service"
            >
              Services

            </option>
          </select>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="crudHeader">
        Edit
        {' '}
        {capitalize(type)}
        s
      </div>
      <div className="crudSelector">
        <select
          className="containerButton mapButton"
          value={state}
          onChange={(e) => { stateSetter(e.target.value) }}
        >
          <option key={uuidv4()} value="">
            Select
            {' '}
            {capitalize(type)}
          </option>
          {globalClusterData?.[`${type}s`]?.filter((el: CLusterObj) => {
            const { name, namespace } = el
            if (type === 'namespace' && (name === 'prometheus' || name === 'gmp-system')) return false
            if ((type === 'deployment' || type === 'service') && namespace !== ns) return false
            return true
          }).map(({ name }: CLusterObj) => (
            <option
              key={uuidv4()}
              value={name}
            >
              {name}

            </option>
          ))}
        </select>
        <button
          type="button"
          className="crudDelete"
          onClick={(e) => { openModal(e); setModalType('edit'); setCrudSelection(type) }}
        >
          <img alt="edit" className="smallEdit" src={edit} />

        </button>
        <button
          type="button"
          className="crudDelete"
          onClick={(e) => { openModal(e); setModalType('create'); setCrudSelection(type) }}
        >
          +

        </button>
        <button
          type="button"
          className="crudDelete"
          onClick={(e) => { openModal(e); setModalType('delete'); setCrudSelection(type) }}
        >
          X

        </button>
      </div>
    </>
  )
}

export default CrudSelector
