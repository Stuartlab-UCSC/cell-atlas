// cell type determination plot page.

import React from 'react';
import Typography from '@material-ui/core/Typography'

import screenShot from 'images/pipeline.png'

const PageTitle = () => {
    return (
            <Typography
                variant='h6'
                style={{marginBottom: 10}}
            >
                Analysis Pipeline
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
        </div>
    )
}

export default Page
