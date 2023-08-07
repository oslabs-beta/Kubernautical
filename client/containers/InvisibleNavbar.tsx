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
        const { globalServices } = useContext(GlobalContext);
        const [vU, setVu] = useState('')
        const [duration, setDuration] = useState('');
        const [loading, setLoading] = useState(false)

        const loadtest = async () => {
            //do we need both inputs
            if (vU !== '' && duration === '' || vU === '' && duration !== '') return alert('Please fill out both fields');
            try {
                const response = await fetch(`/api/k6/test?vus=${vU}&duration=${duration}&ip=${service}`)
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