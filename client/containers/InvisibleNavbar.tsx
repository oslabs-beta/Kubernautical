import React, { FC, useState, SyntheticEvent, CSSProperties, useEffect } from 'react'
import type { Props } from '../../types/types';
import loadingImage from '../assets/images/network.png'

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
        const [vU, setVu] = useState('')
        const [duration, setDuration] = useState('');
        const [loading, setLoading] = useState(false)

        const loadtest = async () => {
            //do we need both inputs
            if (vU !== '' && duration === '' || vU === '' && duration !== '') return alert('Please fill out both fields');
            try {
                const response = await fetch(`/api/k6/test?vus=${vU}&duration=${duration}`)
                const data = response.json()
                setShowModal(false)
                setLoading(true)
                console.log('Load Testing')
            } catch (error) {
                console.log('error in running load test:', error)
            }
        }
  
        const toMilliseconds = Number(duration)* 1000

        useEffect(()=>{
            console.log('hello')
            setTimeout(()=>{
                setLoading(false)
            },toMilliseconds)
        },[loading])

        const imgSrc = '../assets/images/network.png'
        return (
            <>
                <div className='page-mask'></div>
                <div className='invisModal' style={{ top: style, position: 'absolute' }}>
                    {loading?(
                        <img height = '200px' width = '200px'src = {imgSrc}/>
                    ):''}
                    <input className = 'InvisInput' type='number' placeholder='Number of VUs' onChange={(e) => setVu(e.target.value)} />
                    <input className = 'InvisInput' type='number' placeholder='Test Duration' onChange={(e) => setDuration(e.target.value)} />
                    <button className = 'InvisSubmit' onClick={loadtest}>DDOS me</button>
                    <button className = 'closeInvisModal'onClick={() => setShowModal(false)} >X</button>
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