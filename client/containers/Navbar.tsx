import React, { type ReactElement, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clusterpic from '../assets/images/clusterPic.png'
import mainDashBoard from '../assets/images/mainDashBoard.png'
import netWork from '../assets/images/network.png'
import edit from '../assets/images/edit.png'
import docs from '../assets/images/docs.png'
import { GlobalContext } from '../components/Contexts'
import gif2 from '../assets/gif3.gif'

export default function Navbar (): ReactElement {
  const {
    globalTimer, setGlobalTimer,
    globalServiceTest, setGlobalServiceTest,
    showEditModal, setShowEditModal,
    ongoingCrudChange
  } = useContext(GlobalContext)
  const [activeTimer, setActiveTimer] = useState(0) //! smooth brain solution
  const navigate = useNavigate()
  function MainDashBoard (): void { navigate('/dashboard') }
  function GoHome (): void { navigate('/') }
  function Network (): void { navigate('/network') }
  function Logs (): void { navigate('/logs') }

  useEffect(() => {
    if ((globalTimer !== undefined) && (globalTimer - Date.now()) < 0) {
      if (setGlobalTimer !== undefined) setGlobalTimer(0)
      if (setGlobalServiceTest !== undefined) setGlobalServiceTest('')
    } else if ((globalTimer !== undefined) && (globalTimer - Date.now()) > 0) {
      setTimeout(() => {
        setActiveTimer(Math.floor((globalTimer - Date.now()) / 1000))
      }, 1000)
    }
  }, [globalTimer, activeTimer, ongoingCrudChange])

  return (
    <div className="navBar">
      <div className="navBarTitle">KUBERNAUTICAL</div>
      <hr className="hr" />
      <button type="button" className="navButton" id="ClusterViewButton" onClick={GoHome}>
        <img className="btn-icon" alt="cluster" src={clusterpic} />
        <p className="btn-text">Cluster View</p>
      </button>

      <button type="button" className="navButton" id="MainDashButton" onClick={MainDashBoard}>
        <img alt="cluster" className="btn-icon" src={mainDashBoard} />
        <p className="btn-text">Main Dashboard</p>
      </button>

      <button type="button" className="navButton" id="NetworkButton" onClick={Network}>
        <img alt="cluster" className="btn-icon" src={netWork} />
        <p className="btn-text">Network Performance</p>
      </button>

      <button type="button" className="navButton" id="LogsButton" onClick={Logs}>
        <img alt="cluster" className="btn-icon" src={docs} />
        <p className="btn-text">Logs</p>
      </button>

      <button
        type="button"
        className="navButton"
        id="EditClusterButton"
        onClick={() => {
          if (setShowEditModal !== undefined) {
            showEditModal === true ? setShowEditModal(false) : setShowEditModal(true)
          }
        }}
      >
        <img alt="cluster" className="btn-icon" src={edit} />
        <p className="btn-text">Edit Cluster</p>
      </button>

      <div className="loadingStatus">
        {globalTimer !== 0 && globalTimer !== undefined
          ? `Load test time remaining: 
          ${Math.floor((globalTimer - Date.now()) / 1000)}s, running on 
          ${globalServiceTest as string}`
          : null}
      </div>
      <div className="loadingStatus">
        {ongoingCrudChange === true ? <img className="loadingGif" alt="loading-gif" src={gif2} /> : null}
      </div>

    </div>
  )
}
