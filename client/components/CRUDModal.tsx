import React, { useEffect, useState, useContext, FC, SyntheticEvent } from 'react';
import { ClusterData, CLusterObj, Props } from '../../types/types';
import { GlobalContext } from './Contexts';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';

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
  const [showModal, setShowModal] = useState(false);
  const [modalPos, setModalPos] = useState(0);
  const [modalType, setModalType] = useState('');

  //?-----------------------------------------------------Modal Component--------------------------------------------------------------->
  const Modal: FC<Props> = ({ style }) => {
    //TODO yeah this doesnt work ver well i hate it
    //TODO figure out global re renders for mapothy (global state)
    const [nsInner, setNsInner] = useState('');
    const name = modalType.slice(4) === 'service' ? service : ns ? ns : null;
    const innerText = modalType.slice(0, 4) === 'add' ? 'Enter namespace here' : name ? `Are you sure you want to remove ${name}?` : 'Please make a selection';


    const crudFunction = async (crud: string) => {
      try {
        if (crud === 'create' && nsInner === '') return alert('Please fill out field')
        // switch (modalType.slice(4)) {
        //   case value:

        //     break;

        //   default:
        //     break;
        // }
        const response = await fetch(`api/exec/ns?namespace=${crud === 'create' ? nsInner : ns}&crud=${crud}`)
        setGlobalCrudChange ? globalCrudChange ? setGlobalCrudChange(false) : setGlobalCrudChange(true) : null;
        setOngoingCrudChange ? setOngoingCrudChange(false) : null;
        if (!response.ok) throw new Error();
      } catch (error) {
        throw error;
      }
    }
    return (
      <>
        <div className='page-mask'></div>
        <div className='invisModal' style={{ top: style, position: 'absolute' }}>
          <div>{innerText}</div>
          {modalType.slice(0, 3) === 'add' ?
            <>
              <input className='InvisInput' type='text' placeholder='New Namespace' onChange={(e) => setNsInner(e.target.value)} />
              <button className='InvisSubmit' onClick={() => { crudFunction('create'); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
            </>
            : <button className='InvisSubmit' onClick={() => { crudFunction('delete'); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>}
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

      <div className='crudHeader'>Edit Namespaces</div>
      <div className='crudSelector'>
        <select className='containerButton mapButton' value={ns} onChange={(e) => setNs(e.target.value)}>
          <option key={uuidv4()} value={''}>Select Namespace</option>
          {globalNamespaces ? globalNamespaces.map((el) => {
            if (el === 'prometheus' || el === 'gmp-system') return;
            return (
              <option key={uuidv4()} value={el}>{el}</option>
            )
          }) : null}
        </select>
        <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('add-namespace') }} >+</button>
        <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('namespace') }} >X</button>
      </div>
      {ns ?
        <>
          <div className='crudHeader'>Edit Services</div><div className='crudSelector'>
            <select className='containerButton mapButton' value={service} onChange={(e) => setService(e.target.value)}>
              <option key={uuidv4()} value={''}>Select Service</option>
              {globalClusterData ? globalClusterData.deployments?.map((el: CLusterObj) => {
                const { name, namespace } = el;
                if (namespace === ns)
                  return (<option key={uuidv4()} value={name}>{name}</option>);
              }) : null}
            </select>
            <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('add-service'); }}>+</button>
            <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('service'); }}>X</button>
          </div></> : null}
    </div>
  )
}
export default CRUDModal;