import React, { useState, type SyntheticEvent, type ReactElement } from 'react'
import InvisibleNavbarModal from './InvisibleNavbarModal'

function InvisibleNavbar (): ReactElement {
  const [showModal, setShowModal] = useState(false)
  const [modalPos, setModalPos] = useState(0)

  const openModal = (e: SyntheticEvent): void => {
    setModalPos(e.currentTarget.getBoundingClientRect().bottom + 5)
    showModal ? setShowModal(false) : setShowModal(true)
  }
  return (
    <>
      <button type="button" onClick={(e) => { openModal(e) }} className="invisNavButton">Load Testing</button>
      {showModal
        ? (
          <InvisibleNavbarModal
            style={modalPos}
            setShowModal={setShowModal}
          />
          )
        : <div />}
    </>

  )
}

export default InvisibleNavbar
