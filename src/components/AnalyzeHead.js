

// Analyze page header.

import PropTypes from 'prop-types'
import React from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

import moleSim from 'home/images/moleSim2.svg'
import trajSim from 'home/images/trajSim.svg'
import typePsych from 'home/images/typePsych.svg'

const images = { moleSim, trajSim, typePsych}

const AnalyzeHead = ({ id, title, xs, height, imageTop, imageBottom }) => {
    height = height || '100px'
    imageTop = imageTop || '0rem'
    imageBottom = imageBottom || '-3rem'
    return (
        <React.Fragment>
            <Grid item xs={5}>
                <Typography
                    variant='title'
                    style={{ marginTop: '1.5rem', }}
                >
                    {'Analyze: ' + title}
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <img
                    src={images[id]}
                    alt={id}
                    height={height}
                    style={{
                        float: 'right',
                        marginTop: imageTop,
                        marginBottom: imageBottom,
                    }}
                />
            </Grid>
            <Grid item xs={2} />
         </React.Fragment>
    )
}
/*

*/
AnalyzeHead.propTypes = {
    id: PropTypes.string.isRequired, // page ID
    title: PropTypes.string.isRequired, // sub-title under main title
    xs: PropTypes.number.isRequired, // xs size for the sub-title
}

export default AnalyzeHead;
