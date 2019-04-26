// cell type determination plot page.

import React from 'react';
import Typography from '@material-ui/core/Typography'

// Graphic is editable at
// https://docs.google.com/presentation/d/1bdiV-5pV3M44E7M2roNnGv_jXN8HW91VRKjmEvGiB6M
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
