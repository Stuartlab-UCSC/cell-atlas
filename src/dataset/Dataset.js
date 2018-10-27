

// The dataset page.

import React from 'react'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import DatasetTable from 'dataset/DatasetTable'

const DatasetPres = ({classes}) => {
    return (
        <Grid container spacing={16}
            className='pageBody'
        >
            <Grid item xs={12}>
                <Typography variant='title'>
                    Datasets
                </Typography>
            </Grid>
            <Grid item>
                <DatasetTable />
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        classes: {
            title: 'title',
        },
    }
}

const Dataset = connect(
    mapStateToProps
)(DatasetPres)

export default Dataset
