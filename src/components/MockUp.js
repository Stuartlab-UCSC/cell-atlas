
// Mock-up overlay.

import React from 'react'
import mockUp from 'components/images/mock-up.svg'

const MockUp = () => {
    return (
        <img
            src={mockUp}
            alt={'mock-up'}
            height={'500px'}
            style={{
                position: 'absolute',
                top: '50px',
                left: '300px',
                zIndex: -1,
            }}
        />
    )
}

export default MockUp
