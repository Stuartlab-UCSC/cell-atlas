
// Mock-up overlay.

import React from 'react'
import Grid from '@material-ui/core/Grid';
import mockUp from 'app/images/mock-up.svg'

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
                }}
            />
        </Grid>
    )
}

export default MockUp
