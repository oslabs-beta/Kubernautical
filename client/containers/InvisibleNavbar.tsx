import React, { FC, useState, useContext, SyntheticEvent, CSSProperties } from 'react'
import { v4 as uuidv4 } from 'uuid';
import type { Props } from '../../types/types';
import { GlobalContext } from '../components/Contexts';


const InvisibleNavbar: FC<Props> = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalPos, setModalPos] = useState(0);

    const openModal = (e: SyntheticEvent) => {
        setModalPos(e.currentTarget.getBoundingClientRect().bottom + 5);
        showModal ? setShowModal(false) : setShowModal(true);
    }

    const Modal: FC<Props> = ({ style }) => {
        const { globalServices, globalTimer, setGlobalTimer, setGlobalServiceTest } = useContext(GlobalContext);
        const [vU, setVu] = useState(0);
        const [duration, setDuration] = useState(0);
        const [service, setService] = useState('');

        const loadtest = async () => {
            if (vU < 0 || duration < 0) return alert('Please choose positive numbers');
            if (vU === 0 && duration === 0 || vU !== 0 && duration === 0 || vU === 0 && duration !== 0) return alert('Please fill out both fields');
            if (globalTimer && (globalTimer - Date.now()) > 0) return alert('Load test is currently running, please wait');
            try {
                const response = await fetch(`/api/k6/test?vus=${vU}&duration=${duration}&ip=${service}`)
                const data = response.json()
                setShowModal(false);
                const filtered = globalServices?.find((gService) => gService?.ip === service)
                setGlobalServiceTest ? setGlobalServiceTest(filtered ? filtered.name : '') : null;
                setGlobalTimer ? setGlobalTimer((Date.now() + (duration * 1000))) : null;
                console.log('Load Testing')
            } catch (error) {
                console.log('error in running load test:', error)
            }
        }
        return (
            <>
                <div className='page-mask'></div>
                <div className='invisModal' style={{ top: style, position: 'absolute' }}>
                    <div>
                        <select className='InvisService' value={service} onChange={(e) => setService(e.target.value)}>
                            <option value=''>Select Service</option>
                            {globalServices ? globalServices.map((el) => {
                                return (
                                    <option key={uuidv4()} value={el.ip}>{el.name}</option>
                                )
                            }) : <div></div>}
                        </select>
                    </div>
                    <input className='InvisInput' type='number' placeholder='Number of VUs' onChange={(e) => setVu(Number(e.target.value))} />
                    <input className='InvisInput' type='number' placeholder='Test Duration' onChange={(e) => setDuration(Number(e.target.value))} />
                    <button className='InvisSubmit' onClick={loadtest}>DDOS me</button>
                    <button className='closeInvisModal' onClick={() => setShowModal(false)} >X</button>
                </div>
            </>
        )
    }
    return (
        <>
            <button onClick={(e) => openModal(e)} className='invisNavButton'>Load Testing</button>
            {showModal ? <Modal style={modalPos} /> : <div></div>}
        </>

    )
}

export default InvisibleNavbar;