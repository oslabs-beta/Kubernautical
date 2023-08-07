import React, { FC, useState, useContext, SyntheticEvent, CSSProperties } from 'react'
import { v4 as uuidv4 } from 'uuid';
import type { Props } from '../../types/types';
import { GlobalContext } from '../components/Contexts';

// let defaultCSS : CSSProperties;
const InvisibleNavbar: FC<Props> = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalPos, setModalPos] = useState(0);

    const openModal = (e: SyntheticEvent) => {
        setModalPos(e.currentTarget.getBoundingClientRect().bottom + 5);
        showModal ? setShowModal(false) : setShowModal(true);
    }
    const loadtest = async () => {
        try {
            const response = await fetch('/api/k6/test')
            const data = response.json()
            setShowModal(false)
            console.log('Load Testing')

        } catch (error) {
            console.log('error in running load test:', error)
        }
    }

    const Modal: FC<Props> = ({ style }) => {
        const { globalServices } = useContext(GlobalContext);
        const [vU, setVu] = useState('')
        const [duration, setDuration] = useState('');
        const [service, setService] = useState('');
        const loadtest = async () => {
            //do we need both inputs
            if (vU !== '' && duration === '' || vU === '' && duration !== '') return alert('Please fill out both fields');
            try {
                const response = await fetch(`/api/k6/test?vus=${vU}&duration=${duration}&ip=${service}`)
                const data = response.json()
                setShowModal(false)
                console.log('Load Testing')
            } catch (error) {
                console.log('error in running load test:', error)
            }
        }

        const imgSrc = '../assets/images/network.png'
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
                    <input className='InvisInput' type='number' placeholder='Number of VUs' onChange={(e) => setVu(e.target.value)} />
                    <input className='InvisInput' type='number' placeholder='Test Duration' onChange={(e) => setDuration(e.target.value)} />
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