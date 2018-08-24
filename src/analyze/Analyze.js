

// The analyze page.

import React from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography';

import CreateMap from 'analyze/CreateMap'

const AnalyzePres = ({classes}) => (
    <div className='analyzePage pageBody'>
        <Typography
            variant='title'
            style={{ marginBottom: '1rem' }}
        >
            Analyze: Create a Map
        </Typography>
        <CreateMap />
    </div>
)

const Analyze = connect(
)(AnalyzePres)

export default Analyze
