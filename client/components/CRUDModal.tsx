import React, { useEffect, useState, useContext, FC, SyntheticEvent } from 'react';
import { ClusterData, CLusterObj, Props } from '../../types/types';
import { GlobalContext } from './Contexts';
import { v4 as uuidv4 } from 'uuid';

const CRUDModal: FC<ClusterData> = () => {
  const { setGlobalNamesapces, globalNamespaces,
    setGlobalServices, globalServices,
    globalClusterData, setGlobalClusterData
  } = useContext(GlobalContext);
  const [ns, setNs] = useState('');
  const [service, setService] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalPos, setModalPos] = useState(0);
  const [modalType, setModalType] = useState('');

  const Modal: FC<Props> = ({ style }) => {
    //TODO yeah this doesnt work
    const name = modalType === 'service' ? service : ns ? ns : '';
    const innerText = name ? `Are you sure you want to remove ${name}?` : 'Please make a selection';
    return (
      <>
        <div className='page-mask'></div>
        <div className='invisModal' style={{ top: style, position: 'absolute' }}>
          <div>{innerText}</div>
          <button className='InvisSubmit'>DDOS me</button>
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
  return (
    <div className='invisModal editModal'>
      {showModal ? <Modal style={modalPos} type='service' /> : null}
      <div className='crudHeader'>Make Changes to Your Cluster</div>
      <div className='crudSelector'>
        <select className='containerButton mapButton' value={ns} onChange={(e) => setNs(e.target.value)}>
          <option key={uuidv4()} value={''}>Select Namespace</option>
          {globalNamespaces ? globalNamespaces.map((el) => {
            return (
              <option key={uuidv4()} value={el}>{el}</option>
            )
          }) : null}
        </select>
        <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('namespace') }} >X</button>
      </div>
      {ns !== '' ?
        <div className='crudSelector'>
          <select className='containerButton mapButton' value={service} onChange={(e) => setService(e.target.value)}>
            <option key={uuidv4()} value={''}>Select Service</option>
            {globalClusterData ? globalClusterData.deployments?.map((el: CLusterObj) => {
              const { name, namespace } = el;
              if (namespace === ns) return (<option key={uuidv4()} value={name}>{name}</option>)
              else return;
            }) : null}
          </select>
          <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('service') }}>X</button>
        </div> : null}
    </div>
  )
}
export default CRUDModal;