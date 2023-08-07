import React, { FC, useState, SyntheticEvent, CSSProperties } from 'react'
import type { Props } from '../../types/types';

// let defaultCSS : CSSProperties;
const InvisibleNavbar: FC<Props> = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalPos, setModalPos] = useState(0);

    const openModal = (e: SyntheticEvent) => {
        setModalPos(e.currentTarget.getBoundingClientRect().bottom + 5);
        showModal ? setShowModal(false) : setShowModal(true);
    }

    const Modal: FC<Props> = ({ style }) => {
        const [vU, setVu] = useState('')
        const [duration, setDuration] = useState('');
        const loadtest = async () => {
            //do we need both inputs
            if (vU !== '' && duration === '' || vU === '' && duration !== '') return alert('Please fill out both fields');
            try {
                const response = await fetch(`/api/k6/test?vus=${vU}&duration=${duration}`)
                const data = response.json()
                setShowModal(false)
                console.log('Load Testing')
            } catch (error) {
                console.log('error in running load test:', error)
            }
        }
        return (
            <>
                <div className='page-mask'></div>
                <div className='invisModal' style={{ top: style, position: 'absolute' }}>
                    <input type='number' placeholder='Number of VUs' onChange={(e) => setVu(e.target.value)} />
                    <input type='number' placeholder='Test Duration' onChange={(e) => setDuration(e.target.value)} />
                    <button onClick={loadtest}>DDOS me</button>
                    <button onClick={() => setShowModal(false)} >X</button>
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