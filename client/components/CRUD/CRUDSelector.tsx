import React, { FC, useContext, useState, SyntheticEvent } from 'react'
import { GlobalContext } from '../Contexts';
import { v4 as uuidv4 } from 'uuid';
import { CLusterObj, SelectorProps } from '../../../types/types';
import { capitalize } from '../helperFunctions';
import edit from '../../assets/images/edit.png'

const CrudSelector: FC<SelectorProps> = (
  { type,
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
  }) => {

  const { globalClusterData } = useContext(GlobalContext);

  const openModal = (e: SyntheticEvent) => {
    setModalPos(e.currentTarget.getBoundingClientRect().bottom + 5);
    showModal ? setShowModal(false) : setShowModal(true);
  }
  if (type === 'scope') return (
    <>
      <div className='crudHeader'>Select Scope</div>
      <div className='crudSelector'>
        <select className='containerButton mapButton' value={crudSelection} onChange={(e) => setCrudSelection(e.target.value)}>
          <option key={uuidv4()} value={'namespace'}>Select Scope</option>
          <option key={uuidv4()} value={'deployment'}>Deployments</option>
          <option key={uuidv4()} value={'service'}>Services</option>
        </select>
      </div></>
  )
  return (
    <>
      <div className='crudHeader'>Edit {capitalize(type)}s</div>
      <div className='crudSelector'>
        <select className='containerButton mapButton' value={state} onChange={(e) => stateSetter(e.target.value)}>
          <option key={uuidv4()} value={''}>Select {capitalize(type)}</option>
          {globalClusterData && globalClusterData[`${type}s`]?.map((el: CLusterObj) => {
            const { name, namespace } = el
            if (type === 'namespace' && (name === 'prometheus' || name === 'gmp-system')) return;
            if ((type === 'deployment' || type === 'service') && namespace !== ns) return;
            return (
              <option key={uuidv4()} value={name}>{name}</option>
            )
          })}
        </select>
        <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('edit'); setCrudSelection(type) }}><img className='smallEdit' src={edit} /></button>
        <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('create'); setCrudSelection(type) }} >+</button>
        <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('delete'); setCrudSelection(type) }} >X</button>
      </div>
    </>
  )
}

export default CrudSelector;


//? Deprecated deployment selector
// <>
//   <div className='crudHeader'>Edit {crudSelection}s</div>
//   <div className='crudSelector'>
//     <select className='containerButton mapButton' value={crudSelection === 'service' ? service : deployment} onChange={(e) => { crudSelection === 'service' ? setService(e.target.value) : setDeployment(e.target.value) }}>
//       <option key={uuidv4()} value={''}>Select {crudSelection}</option>
//       {globalClusterData ? globalClusterData[`${crudSelection}s`]?.map((el: CLusterObj) => {
//         const { name, namespace } = el;
//         if (namespace === ns)
//           return (<option key={uuidv4()} value={name}>{name}</option>);
//       }) : null}
//     </select>
//     <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('scale'); }}><img className='smallEdit' src={edit} /></button>
//     <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('create'); }}>+</button>
//     <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('delete'); }}>X</button>
//   </div></>

//? Deprecated namespace selector
{/* <div className='crudHeader'>Edit Namespaces</div>
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
      </div> */}

      //? Deprecated smaller modal
    //   {modalType === 'delete' ?
    //   <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
    //   : crudSelection === 'namespace' ?
    //     <>
    //       <input className='InvisInput' type='text' placeholder='New Namespace' onChange={(e) => setForm(e.target.value)} />
    //       <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
    //     </>
    //     : crudSelection === 'deployment' ? modalType === 'create' ?
    //       <>
    //         <input className='InvisInput' type='text' placeholder='New Deployment' value={form} onChange={(e) => setForm(e.target.value)} />
    //         <input className='InvisInput' type='text' placeholder='Docker Image' value={form2} onChange={(e) => setForm2(e.target.value)} />
    //         <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
    //       </> :
    //       <>
    //         <input className='InvisInput' type='number' placeholder='Scale Deployment' value={scale} onChange={(e) => setScale(Number(e.target.value))} />
    //         <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
    //       </>
    //       : crudSelection === 'service' ?
    //         <>
    //           <input className='InvisInput' type='text' placeholder='New Service' onChange={(e) => setForm(e.target.value)} />
    //           <button className='InvisSubmit' onClick={() => { crudFunction(); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
    //         </>
    //         : null
    // }