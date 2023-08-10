import React, { FC, useContext } from 'react'
import { GlobalContext } from '../components/Contexts';
import { v4 as uuidv4 } from 'uuid';


//!BRUH IDK IF I CAN DO THIS LMAO 
//TODO Ill come back to this later
//type, globalState
const CrudSelector: FC = () => {

    return (
        <>

            {/* <div className='crudHeader'>Edit Namespaces</div><div className='crudSelector'>
                <select className='containerButton mapButton' value={ns} onChange={(e) => setNs(e.target.value)}>
                    <option key={uuidv4()} value={''}>Select Namespace</option>
                    {globalNamespaces ? globalNamespaces.map((el) => {
                        if (el === 'prometheus' || el === 'gmp-system')
                            return;
                        return (
                            <option key={uuidv4()} value={el}>{el}</option>
                        );
                    }) : null}
                </select>
                <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('add-namespace'); }}>+</button>
                <button className='crudDelete' onClick={(e) => { openModal(e); setModalType('namespace'); }}>X</button>
            </div> */}

        </>
    )
}

export default CrudSelector;


{/* <div className='crudHeader'>Edit {crudSelection}s</div>
<div className='crudSelector'>
  <select className='containerButton mapButton' value={crudSelection === 'service' ? service : deployment} onChange={(e) => { crudSelection === 'service' ? setService(e.target.value) : setDeployment(e.target.value) }}>
    <option key={uuidv4()} value={''}>Select {crudSelection}</option>
    {globalClusterData ? globalClusterData[`${crudSelection}s`]?.map((el: CLusterObj) => {
      const { name, namespace } = el;
      if (namespace === ns)
        return (<option key={uuidv4()} value={name}>{name}</option>);
    }) : null}
  </select>
  <button className='crudDelete' onClick={(e) => { openModal(e); setModalType(`add-${crudSelection}`); }}>+</button>
  <button className='crudDelete' onClick={(e) => { openModal(e); setModalType(`${crudSelection}`); }}>X</button>
</div> */}


{/* <div className='crudHeader'>Select Scope</div>
<div className='crudSelector'>
  <select className='containerButton mapButton' value={crudSelection} onChange={(e) => setCrudSelection(e.target.value)}>
    <option key={uuidv4()} value={''}>Select Scope</option>
    <option key={uuidv4()} value={'deployment'}>Deployments</option>
    <option key={uuidv4()} value={'service'}>Services</option>
  </select>
</div> */}




// const Modal: FC<Props> = ({ style }) => {
//   const [nsInner, setNsInner] = useState('');
//   const name = modalType[1] === 'service' ? service : ns ? ns : null;
//   const innerText = modalType[0] === 'create' ? `Enter ${modalType[1]} here` : name ? `Are you sure you want to remove ${name}?` : 'Please make a selection';
//   console.log(modalType)
//   const crudFunction = async (crud: string) => {
//     try {
//       if (crud === 'create' && nsInner === '') return alert('Please fill out field')
//       // switch (modalType.slice(4)) {
//       //   case value:

//       //     break;

//       //   default:
//       //     break;
//       // }
//       const response = await fetch(`api/exec/ns?namespace=${crud === 'create' ? nsInner : ns}&crud=${crud}`)
//       setGlobalCrudChange ? globalCrudChange ? setGlobalCrudChange(false) : setGlobalCrudChange(true) : null;
//       setOngoingCrudChange ? setOngoingCrudChange(false) : null;
//       if (!response.ok) throw new Error();
//     } catch (error) {
//       throw error;
//     }
//   }


//   // modalType === 'service' || modalType === 'deployment' :


//   return ( //TODO please refactor this it hurts my soul 
//     <>
//       <div className='page-mask'></div>
//       <div className='invisModal' style={{ top: style, position: 'absolute' }}>
//         <div className='crudHeader'>{innerText}</div>
//         {modalType[0] === 'create' ?
//           <>
//             <input className='InvisInput' type='text' placeholder='New Namespace' onChange={(e) => setNsInner(e.target.value)} />
//             <button className='InvisSubmit' onClick={() => { crudFunction('create'); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>
//           </>
//           : <button className='InvisSubmit' onClick={() => { crudFunction('delete'); setShowEditModal ? setShowEditModal(false) : null; setOngoingCrudChange ? setOngoingCrudChange(true) : null }}>Finalize</button>}
//         <button className='closeInvisModal' onClick={() => setShowModal(false)} >X</button>
//       </div>
//     </>
//   )
// }
