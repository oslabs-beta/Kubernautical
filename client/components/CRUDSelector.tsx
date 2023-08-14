import React, { FC, useContext } from 'react'
import { GlobalContext } from '../components/Contexts';
import { v4 as uuidv4 } from 'uuid';
import { ClusterData, CLusterObj, Props } from '../../types/types';


//!BRUH IDK IF I CAN DO THIS LMAO 
//TODO Ill come back to this later
//type, globalState
const CrudSelector: FC<Props> = () => {
  //type 
  //state
  //state setter
  const { 
    // setGlobalServices, globalServices,
    setGlobalClusterData, globalClusterData,
    // setShowEditModal, globalClusterContext,
    // setGlobalCrudChange, globalCrudChange,
    // setOngoingCrudChange, ongoingCrudChange
  } = useContext(GlobalContext);

  return (
    <>
      <div className='crudHeader'>Edit Namespaces</div>
      <div className='crudSelector'>
        <select className='containerButton mapButton' value={ns} onChange={(e) => setNs(e.target.value)}>
          <option key={uuidv4()} value={''}>Select Namespace</option>
          {globalClusterData ? globalClusterData.namespaces?.map((el: CLusterObj) => {
            const { name } = el
            if (name === 'prometheus' || name === 'gmp-system') return;
            return (
              <option key={uuidv4()} value={name}>{name}</option>
            )
          }) : null}
        </select>
        <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('create') }} >+</button>
        <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('delete') }} >X</button>
      </div>
    </>
  )
}

export default CrudSelector;

