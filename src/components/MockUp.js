
// Mock-up overlay.

import React from 'react'
import Grid from '@material-ui/core/Grid';
import mockUp from 'components/images/mock-up.svg'

const MockUp = () => {
    return (
        <Grid item xs={12}>
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
        </Grid>
    )
}

export default MockUp
