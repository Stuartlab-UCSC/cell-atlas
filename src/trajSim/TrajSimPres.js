
// Trajectory similarity analysis page: presentation

import PropTypes from 'prop-types'
import React from 'react'

import AnalyzeButton from 'components/AnalyzeButton'
import AnalyzeHead from 'components/AnalyzeHead'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

import InputFile from 'input/InputFile'
import { TextFieldGrid } from 'input/inputGrid'
import Format from 'format/FormatDetail'
import MockUp from 'app/MockUp'

const TrajSimPres = ({ id, cellXbranch, geneMatrixTransposed, featureMatrix,
    algorithm, description, name, species, tissue, onAnalyzeClick }) => {

    return (
        <Grid container className='pageBody' spacing={32} style={{marginTop: '-2.5rem'}}>
            <AnalyzeHead
                id={id}
                title='Trajectory Similarity'
                xs={4}
            />
            <MockUp />
            <InputFile data={cellXbranch} />
            <Format id={id} expand={cellXbranch.expand} />
            <InputFile data={geneMatrixTransposed} />
            <Format id={id} expand={geneMatrixTransposed.expand} />
            <InputFile data={featureMatrix} />
            <Format id={id} expand={featureMatrix.expand} />
            <Grid item xs={3}>
                <TextFieldGrid
                    id={id + '.species'}
                    label='Species *'
                    defaultValue={species}
                />
            </Grid>
            <Grid item xs={3}>
                <TextFieldGrid
                    id={id + '.tissue'}
                    label='Tissue *'
                    defaultValue={tissue}
                />
            </Grid>
            <Grid item xs={3}>
                <TextFieldGrid
                    id={id + '.name'}
                    label='Name *'
                    defaultValue={name}
                />
            </Grid>
            <Grid item xs={3}>
                <TextFieldGrid
                    id={id + '.algorithm'}
                    label='Algorithm'
                    defaultValue={algorithm}
                />
            </Grid>
            <Grid item xs={12}>
                <TextFieldGrid
                    id={id + '.description'}
                    label='Description'
                    defaultValue={description}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='caption'>
                    * Required
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <AnalyzeButton
                    label='Analyze'
                    onClick={onAnalyzeClick}
                />
            </Grid>
        </Grid>
    )
}

TrajSimPres.propTypes = {
    id: PropTypes.string.isRequired, // ID of this page state
    cellXbranch: PropTypes.object.isRequired, // data for this file
    geneMatrixTransposed: PropTypes.object.isRequired, // data for this file
    featureMatrix: PropTypes.object.isRequired, // data for this file
    species: PropTypes.string.isRequired, // species from which the data came
    tissue: PropTypes.string.isRequired, // tissue from which the data came
    onAnalyzeClick: PropTypes.func.isRequired, // upon analyze button click

    algorithm: PropTypes.string, // the algorithm used to TODO
    description: PropTypes.string, // description of the data
    name: PropTypes.string, // users name of this analysis run
}

export default TrajSimPres
