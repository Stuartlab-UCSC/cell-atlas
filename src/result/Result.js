

// The result page.

import React from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography';

import ResultTable from 'result/ResultTable'

const ResultPres = ({classes}) => (
    <div className='resultPage pageBody'>
        <Typography
            variant='title'
            style={{marginBottom: '1rem' }}
        >
            Analysis Results
        </Typography>
        <ResultTable />
    </div>
)

const mapStateToProps = (state) => {
    return {
        classes: {
            title: 'title',
        },
    }
}

const Result = connect(
    mapStateToProps
)(ResultPres)

export default Result
