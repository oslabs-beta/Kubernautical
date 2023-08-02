import React, { useEffect, useState, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';




export const Mapothy = () => {

    const elements = ['fuck you'];
    const styleSheet = {};

    return (
        <CytoscapeComponent
            elements={elements}
            stylesheet={styleSheet}
            style={{
                width: '100%',
                height: '65rem',
                border: 'solid',
                objectFit: 'cover',
            }}
        ></CytoscapeComponent>

    )
}