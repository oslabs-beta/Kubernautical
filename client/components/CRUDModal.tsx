import React, { useEffect, useState, useContext, FC, SyntheticEvent } from 'react';
import { ClusterData, CLusterObj, Props } from '../../types/types';
import { GlobalContext } from './Contexts';
import { v4 as uuidv4 } from 'uuid';
import edit from '../assets/images/edit.png'

const defaultArr: string[] = []
// const defaultObj: CLusterObj = []
const CRUDModal: FC<ClusterData> = () => {
  const { setGlobalNamesapces, globalNamespaces,
    setGlobalServices, globalServices,
    setGlobalClusterData, globalClusterData,
    setShowEditModal, globalClusterContext,
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
    const [form, setForm] = useState('');
    const [form2, setForm2] = useState('');
    //TODO fix the inner text its not great (its actually haunting)
    const name = crudSelection === 'service' ? service : crudSelection === 'deployment' ? deployment : crudSelection === 'namespace' ? ns : null;
    let innerText = modalType === 'create' ? `Enter ${crudSelection} here` : name ? `Are you sure you want to remove ${name}?` : 'Please make a selection';
    crudSelection === 'deployment' && modalType === 'scale' ? innerText = 'Scale Deployment' : null;
    const obj = globalClusterData ? globalClusterData[`${crudSelection}s`].find(({ name }: any) => name === (crudSelection === 'service' ? service : deployment)) : null;
    const [scale, setScale] = useState(obj?.availableReplicas ? obj?.availableReplicas : 0); //!this is also smooth brain
    const oldReplicas = obj?.availableReplicas ? obj?.availableReplicas : 0;
    const crudFunction = async () => {
      try {
        let query = `api/exec/`;
        if (modalType === 'create' && form === '') return alert('Please fill out field')
        // if (modalType === 'scale' && form === '') return alert('Please fill out field')
        switch (crudSelection) {
          case 'namespace':
            query += `ns?namespace=${modalType === 'create' ? form : ns}&crud=${modalType}&context=${globalClusterContext}`;
            break;
          case 'deployment':
            query += `dep?namespace=${ns}&crud=${modalType}&image=${form2}&replicas=${modalType === 'scale' ? scale : ''}&deployment=${form ? form : deployment}&old=${modalType === 'scale' ? oldReplicas : ''}&context=${globalClusterContext}`;
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
                <input className='InvisInput' type='text' placeholder='New Namespace' onChange={(e) => setForm(e.target.value)} />
                <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
              </>
              : crudSelection === 'deployment' ? modalType === 'create' ?
                <>
                  <input className='InvisInput' type='text' placeholder='New Deployment' value={form} onChange={(e) => setForm(e.target.value)} />
                  <input className='InvisInput' type='text' placeholder='Docker Image' value={form2} onChange={(e) => setForm2(e.target.value)} />
                  <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
                </> :
                <>
                  <input className='InvisInput' type='number' placeholder='Scale Deployment' value={scale} onChange={(e) => setScale(Number(e.target.value))} />
                  <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
                </>
                : crudSelection === 'service' ?
                  <>
                    <input className='InvisInput' type='text' placeholder='New Service' onChange={(e) => setForm(e.target.value)} />
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
              <option key={uuidv4()} value={'namespace'}>Select Scope</option>
              <option key={uuidv4()} value={'deployment'}>Deployments</option>
              <option key={uuidv4()} value={'service'}>Services</option>
            </select>
          </div></> : null}
      {crudSelection !== 'namespace' && ns ?
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
            <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('scale'); }}><img className='smallEdit' src={edit} /></button>
            <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('create'); }}>+</button>
            <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('delete'); }}>X</button>
          </div></> : null}
    </div>
  )
}
export default CRUDModal;