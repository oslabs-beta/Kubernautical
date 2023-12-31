import React, { type ReactElement, useState } from 'react'
import { type globalServiceObj, type ClusterData } from '../types/types'
import './sass/App.scss'
import MainContainer from './containers/MainContainer'
import Navbar from './containers/Navbar'
import { GlobalContext } from './components/Contexts'

const serviceArr: globalServiceObj[] = []
const defaultClusterData: ClusterData = {}
function App (): ReactElement {
  const [globalServices, setGlobalServices] = useState(serviceArr)
  const [globalTimer, setGlobalTimer] = useState(0)
  const [globalServiceTest, setGlobalServiceTest] = useState('')
  const [globalClusterContext, setGlobalClusterContext] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [globalCrudChange, setGlobalCrudChange] = useState(false)
  const [ongoingCrudChange, setOngoingCrudChange] = useState(false)
  const [globalClusterData, setGlobalClusterData] = useState(defaultClusterData)
  return (
    <>
      <div className="App">
        <GlobalContext.Provider
          value={{
            globalServices,
            setGlobalServices,
            globalTimer,
            setGlobalTimer,
            globalServiceTest,
            setGlobalServiceTest,
            showEditModal,
            setShowEditModal,
            globalClusterData,
            setGlobalClusterData,
            globalCrudChange,
            setGlobalCrudChange,
            ongoingCrudChange,
            setOngoingCrudChange,
            globalClusterContext,
            setGlobalClusterContext
          }}
        >
          <Navbar />
          <MainContainer />
        </GlobalContext.Provider>
      </div>
      <footer className="footer">@2023 Kubernautical™ | All Rights Reserved </footer>
    </>
  )
}

export default App
