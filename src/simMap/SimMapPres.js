
// The similarity map, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import SimMapFile from 'simMap/SimMapFile'

const ZeroFill = (zeroCheck, zeroOnChange) => {
    const comp =
        <Grid container
            style={{marginLeft: '-1rem'}}
        >
            <Grid item xs={5}>
            <Typography
                variant='caption'
                style={{marginTop: '1rem'}}
            >
                Missing values
            </Typography>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={zeroCheck}
                            onChange={zeroOnChange}
                            value="checkedA"
                        />
                    }
                    label="Replace with zero"
                />
            </FormGroup>
            </Grid>
        </Grid>
    return comp
}

const MapName = (user) => {
    const comp =
        <Grid container
            style={{marginLeft: '-1rem'}}
        >
            <Grid item xs={5}>
                <TextField
                    id='mapName'
                    label={'Map name: ' + user + '/ *'}
                    style={{ width: '100%' }}
                    defaultValue='map'
                />
            </Grid>
        </Grid>
    return comp
}

const BasicOptions = ({ user, zeroCheck, advanced, onZeroChange,
    onAnalyzeClick }) => {
    
    if (advanced) {
        return null
    }
    const comp =
        <React.Fragment>
            <SimMapFile />
            {MapName(user)}
            {ZeroFill()}
        </React.Fragment>
    return comp
}

const SimMapPres = ({ user, zeroCheck, advanced, onZeroChange,
    onAnalyzeClick } ) => (
    
    <div className='analyzePage pageBody' style={{ width: '50rem' }}>
        <Typography
            variant='title'
            style={{ marginBottom: '1rem' }}
        >
            Analyze: Create a Map
        </Typography>
        {BasicOptions({ user, zeroCheck, advanced, onZeroChange,
            onAnalyzeClick })}
        <Typography variant='caption'
            style={{marginTop: '1em'}}
        >
            * Required
        </Typography>
    </div>
)

SimMapPres.propTypes = {
    user: PropTypes.string.isRequired,
    advanced: PropTypes.bool,
    onAnalyzeClick: PropTypes.func.isRequired,
}

export default SimMapPres;
