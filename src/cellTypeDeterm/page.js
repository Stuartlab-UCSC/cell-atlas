// cell type determination plot page.

import React from 'react';
import Typography from '@material-ui/core/Typography'

import MockUp from 'components/MockUp'
import screenShot from 'images/cellTypeDeterm.png'

const PageTitle = () => {
    return (
            <Typography
                variant='h6'
            >
                Cell Type Determination Plot
            </Typography>
    )
}

const Page = () => {
    return (
        <div>
            <PageTitle />
            <img
                src={screenShot}
                alt='screenShot'
                height={400}
            />
            <MockUp zIndex={1} style={{marginTop: -80}}/>
        </div>
    )
}

export default Page
