import React, { useEffect, useState, useContext, FC, SyntheticEvent } from 'react';
import { ClusterData, CLusterObj, Props } from '../../types/types';
import { GlobalContext } from './Contexts';
import { v4 as uuidv4 } from 'uuid';

const defaultArr: string[] = []
// const defaultObj: CLusterObj = []
const CRUDModal: FC<ClusterData> = () => {
  const { setGlobalNamesapces, globalNamespaces,
    setGlobalServices, globalServices,
    setGlobalClusterData, globalClusterData,
    setShowEditModal,
    setGlobalCrudChange, globalCrudChange,
    setOngoingCrudChange, ongoingCrudChange
  } = useContext(GlobalContext);
  const [ns, setNs] = useState('');
  const [service, setService] = useState('');
  const [deployment, setDeployment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [crudSelection, setCrudSelection] = useState('namespace');
  const [modalPos, setModalPos] = useState(0);
  const [modalType, setModalType] = useState('');

  //?-----------------------------------------------------Modal Component--------------------------------------------------------------->
  const Modal: FC<Props> = ({ style }) => {
    const [nsInner, setNsInner] = useState('');
    //TODO fix the inner text its not great (its actually haunting)
    const name = crudSelection === 'service' ? service : crudSelection === 'deployment' ? deployment : crudSelection === 'namespace' ? ns : null;
    let innerText = modalType === 'create' ? `Enter ${crudSelection} here` : name ? `Are you sure you want to remove ${name}?` : 'Please make a selection';
    crudSelection === 'deployment' && modalType === 'create' ? innerText = 'Scale Deployment' : null;
    const obj = globalClusterData ? globalClusterData[`${crudSelection}s`].find(({ name }: any) => name === (crudSelection === 'service' ? service : deployment)) : null;
    const [scale, setScale] = useState(obj?.availableReplicas ? obj?.availableReplicas : 0); //!this is also smooth brain
    const oldReplicas = obj?.availableReplicas ? obj?.availableReplicas : 0;
    console.log(obj?.availableReplicas)
    const crudFunction = async () => {
      try {
        let query = `api/exec/`;
        // if (modalType === 'create' && nsInner === '') return alert('Please fill out field')
        switch (crudSelection) {
          case 'namespace':
            query += `ns?namespace=${modalType === 'create' ? nsInner : ns}&crud=${modalType}`;
            break;
          case 'deployment':
            query += `dep?namespace=${ns}&crud=scale&replicas=${scale}&deployment=${deployment}&old=${oldReplicas}`;
            break;
          case 'service':

            break;

          default:
            break;
        }
        const response = await fetch(query);
        setGlobalCrudChange ? globalCrudChange ? setGlobalCrudChange(false) : setGlobalCrudChange(true) : null;
        setOngoingCrudChange ? setOngoingCrudChange(false) : null;
        if (!response.ok) throw new Error();
      } catch (error) {
        throw error;
      }
    }


    // modalType === 'service' || modalType === 'deployment' :
    //TODO make a helper function to search global state

    return ( //TODO please refactor this it hurts my soul 
      <>
        <div className='page-mask'></div>
        <div className='invisModal' style={{ top: style, position: 'absolute' }}>
          <div className='crudHeader'>{innerText}</div>
          {modalType === 'delete' ?
            <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
            : crudSelection === 'namespace' ?
              <>
                <input className='InvisInput' type='text' placeholder='New Namespace' onChange={(e) => setNsInner(e.target.value)} />
                <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
              </>
              : crudSelection === 'deployment' ?
                <>
                  <input className='InvisInput' type='number' placeholder='Scale Deployment' value={scale} onChange={(e) => setScale(Number(e.target.value))} />
                  <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
                </>
                : crudSelection === 'service' ?
                  <>
                    <input className='InvisInput' type='text' placeholder='New Service' onChange={(e) => setNsInner(e.target.value)} />
                    <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
                  </>
                  : null
          }
          <button className='closeInvisModal' onClick={() => setShowModal(false)} >X</button>
        </div>
      </>
    )
  }
  const openModal = (e: SyntheticEvent) => {
    setModalPos(e.currentTarget.getBoundingClientRect().bottom + 5);
    showModal ? setShowModal(false) : setShowModal(true);
  }
  //TODO modularize this list its garbonzo beans
  //?-----------------------------------------------------CRUDModal Return--------------------------------------------------------------->
  return (
    <div className='invisModal editModal'>
      {showModal ? <Modal style={modalPos} type='service' /> : null}
      <div className='crudHeader'>Cluster Editor</div>
      <hr className='hrCrud' />
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
      {ns ?
        <>
          <div className='crudHeader'>Select Scope</div>
          <div className='crudSelector'>
            <select className='containerButton mapButton' value={crudSelection} onChange={(e) => setCrudSelection(e.target.value)}>
              <option key={uuidv4()} value={''}>Select Scope</option>
              <option key={uuidv4()} value={'deployment'}>Deployments</option>
              <option key={uuidv4()} value={'service'}>Services</option>
            </select>
          </div></> : null}
      {crudSelection !== 'namespace' ?
        <>
          <div className='crudHeader'>Edit {crudSelection}s</div>
          <div className='crudSelector'>
            <select className='containerButton mapButton' value={crudSelection === 'service' ? service : deployment} onChange={(e) => { crudSelection === 'service' ? setService(e.target.value) : setDeployment(e.target.value) }}>
              <option key={uuidv4()} value={''}>Select {crudSelection}</option>
              {globalClusterData ? globalClusterData[`${crudSelection}s`]?.map((el: CLusterObj) => {
                const { name, namespace } = el;
                if (namespace === ns)
                  return (<option key={uuidv4()} value={name}>{name}</option>);
              }) : null}
            </select>
            <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('create'); }}>+</button>
            <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('delete'); }}>X</button>
          </div></> : null}
    </div>
  )
}
export default CRUDModal;