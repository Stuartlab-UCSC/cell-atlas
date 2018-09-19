
// The similarity map, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import Email from 'components/Email'
import SimMapFile from 'simMap/SimMapFile'

const email = () => {
    const comp =
        <Grid container
            style={{marginBottom: '1rem', marginLeft: '-1rem'}}
        >
            <Grid item xs={4}>
                <Email />
            </Grid>
        </Grid>
    return comp
}

const mapName = () => {
    const comp =
        <Grid container
            style={{marginLeft: '-1rem'}}
        >
            <Grid item xs={4}>
                <TextField
                    id='mapName'
                    label={'Map name: *'}
                    style={{ width: '100%' }}
                    defaultValue='map'
                />
            </Grid>
        </Grid>
    return comp
}

const BasicOptions = ({ zeroCheck, advanced, onZeroChange,
    onAnalyzeClick }) => {
    
    if (advanced) {
        return null
    }
    const comp =
        <React.Fragment>
            <SimMapFile />
            {email()}
            {mapName()}
        </React.Fragment>
    return comp
}

const SimMapPres = ({ zeroCheck, advanced, onZeroChange, onAnalyzeClick } ) => (
    
    <div className='analyzePage pageBody' style={{ maxWidth: '60rem'}}>
        <Typography
            variant='title'
            style={{ marginBottom: '1rem' }}
        >
            Analyze: Map Molecular Similarity
        </Typography>
        {BasicOptions({ zeroCheck, advanced, onZeroChange,
            onAnalyzeClick })}
        <Typography variant='caption'
            style={{marginTop: '1em'}}
        >
            * Required
        </Typography>
        <Button
            variant='contained'
            component='span'
            color='primary'
            onClick={onAnalyzeClick}
            style={{ marginTop: '1rem' }}
        >
            Build Map
        </Button>
    </div>
)

SimMapPres.propTypes = {
    advanced: PropTypes.bool,
    onAnalyzeClick: PropTypes.func.isRequired,
}

export default SimMapPres;
