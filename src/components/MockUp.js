
// Mock-up overlay.

import React from 'react'
import mockUp from 'components/images/mock-up.svg'

const MockUp = ({ zIndex, style }) => {
    zIndex = zIndex || -1
    let sstyle = {
        ...style,
        position: 'absolute',
        top: '50px',
        left: '300px',
        zIndex: zIndex,
    }
    return (
        <img
            src={mockUp}
            alt={'mock-up'}
            height={'500px'}
            style={sstyle}
        />
    )
}

export default MockUp
