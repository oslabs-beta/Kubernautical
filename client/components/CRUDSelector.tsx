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

