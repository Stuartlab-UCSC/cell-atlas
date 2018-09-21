
// Trajectory similarity analysis page: presentation

import PropTypes from 'prop-types'
import React from 'react'

import AnalyzeButton from 'components/AnalyzeButton'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import TrajSimFile from 'trajSim/TrajSimFile'

const gridSize = 4

const Algorithm = ({ algorithm, onMouseOut }) => {
    const comp =
        <Grid container style={{marginTop: '2rem'}}  >
            <Grid item xs={gridSize}>
                <TextField
                    id='trajSim.algorithm'
                    label={'Algorithm'}
                    style={{ width: '100%' }}
                    defaultValue={algorithm}
                    onMouseOut={onMouseOut}
                />
            </Grid>
        </Grid>
    return comp
}
const SpeciesTissue = ({ species, tissue, onMouseOut }) => {
    const comp =
        <Grid container style={{marginTop: '2rem'}}  >
            <Grid item xs={gridSize}>
                <TextField
                    id='trajSim.species'
                    label={'Species *'}
                    style={{ width: '100%' }}
                    defaultValue={species}
                    onMouseOut={onMouseOut}
                />
            </Grid>
            <Grid item xs={gridSize}>
                <TextField
                    id='trajSim.tissue'
                    label={'Tissue *'}
                    style={{ width: '100%' }}
                    defaultValue={tissue}
                    onMouseOut={onMouseOut}
                />
            </Grid>
        </Grid>
    return comp
}

const NameDescription = ({ name, description, onMouseOut }) => {
    const comp =
        <Grid container style={{marginTop: '2rem'}}  >
            <Grid item xs={gridSize}>
                <TextField
                    id='trajSim.name'
                    label={'Name for this analysis'}
                    style={{ width: '100%' }}
                    defaultValue={name}
                    onMouseOut={onMouseOut}
                />
            </Grid>
            <Grid item xs>
                <TextField
                    id='trajSim.description'
                    label={'Description'}
                    style={{ width: '100%' }}
                    defaultValue={description}
                    onMouseOut={onMouseOut}
                />
            </Grid>
        </Grid>
    return comp
}

const TrajSimPres = ({ algorithm, description, name, species, tissue,
    onMouseOut, onAnalyzeClick }) => {
    
    return (
        <div className='pageBody'>
            <Typography
                variant='title'
                style={{ marginBottom: '1rem' }}
            >
                Analyze: Trajectory Similarity
            </Typography>
            <TrajSimFile />
            <SpeciesTissue
                species={species}
                tissue={tissue}
                onMouseOut={onMouseOut}
            />
            <Algorithm
                algorithm={algorithm}
                onMouseOut={onMouseOut}
            />
            <NameDescription
                name={name}
                description={description}
                onMouseOut={onMouseOut}
            />
            <Typography variant='caption'
                style={{marginTop: '2em'}}
            >
                * Required
            </Typography>
            <AnalyzeButton
                label='Analyze'
                onClick={onAnalyzeClick}
            />
        </div>
    )
}

TrajSimPres.propTypes = {
    species: PropTypes.string.isRequired, // species from which the data came
    tissue: PropTypes.string.isRequired, // tissue from which the data came
    onAnalyzeClick: PropTypes.func.isRequired, // upon analyze button click

    algorithm: PropTypes.string, // the algorithm used to TODO
    description: PropTypes.string, // description of the data
    name: PropTypes.string, // users name of this analysis run
    onNameMouseOut: PropTypes.func, // upon leaving name field
}

export default TrajSimPres
