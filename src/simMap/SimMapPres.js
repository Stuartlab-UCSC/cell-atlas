
// The similarity map, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import Email from 'components/Email'
import SimMapFile from 'simMap/SimMapFile'

const ZeroFill = (zeroCheck, zeroOnChange) => {
    const comp =
        <Grid container
            style={{marginLeft: '-1rem'}}
        >
            <Grid item xs={5}>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={zeroCheck}
                                onChange={zeroOnChange}
                                value="checkedA"
                            />
                        }
                        label="Fill empty feature values with zero"
                    />
                </FormGroup>
            </Grid>
        </Grid>
    return comp
}

const email = () => {
    const comp =
        <Grid container
            style={{marginBottom: '1rem', marginLeft: '-1rem'}}
        >
            <Grid item xs={5}>
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
            <Grid item xs={5}>
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
            {ZeroFill()}
        </React.Fragment>
    return comp
}

const SimMapPres = ({ zeroCheck, advanced, onZeroChange,
    onAnalyzeClick } ) => (
    
    <div className='analyzePage pageBody' style={{ width: '50rem' }}>
        <Typography
            variant='title'
            style={{ marginBottom: '1rem' }}
        >
            Analyze: Create a Map
        </Typography>
        {BasicOptions({ zeroCheck, advanced, onZeroChange,
            onAnalyzeClick })}
        <Typography variant='caption'
            style={{marginTop: '1em'}}
        >
            * Required
        </Typography>
    </div>
)

SimMapPres.propTypes = {
    advanced: PropTypes.bool,
    onAnalyzeClick: PropTypes.func.isRequired,
}

export default SimMapPres;
