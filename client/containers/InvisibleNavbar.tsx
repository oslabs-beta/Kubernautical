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
        return (
            <>
                <div className='page-mask'></div>
                <div className='invisModal' style={{ top: style, position: 'absolute' }}>
                    Showing
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