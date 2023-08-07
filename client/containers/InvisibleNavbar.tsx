import React, { FC, useState, SyntheticEvent, CSSProperties } from 'react'
import type { Props } from '../../types/types';

// let defaultCSS : CSSProperties;
const InvisibleNavbar: FC<Props> = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalPos, setModalPos] = useState(0);
    const [vU ,setVu]= useState(0)
    const [duration, setDuration ]= useState(0)

    const openModal = (e: SyntheticEvent) => {
        setModalPos(e.currentTarget.getBoundingClientRect().bottom + 5);
        showModal ? setShowModal(false) : setShowModal(true);
    }
    const loadtest = async () =>{
        try {
            const response = await fetch('/api/k6/test')
            const data = response.json()
            setShowModal(false)
            console.log('Load Testing')
            
        } catch (error) {
            console.log('error in running load test:',error)
        }
    }

    const Modal: FC<Props> = ({ style }) => {
        return (
            <>
                <div className='page-mask'></div>
                <div className='invisModal' style={{ top: style, position: 'absolute' }}>
                    <label>How many Users for Test?</label>
                    <input type = 'number' onChange = {(e)=> setVu(Number(e.target.value))}/>
                    <label>How long to run the Test</label>
                    <input type = 'number' onChange = {(e)=> setDuration(Number(e.target.value))}/>
                    <button onClick = {loadtest}>DDOS me</button>
                    <button onClick = {() => setShowModal(false)} >X</button>
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