
// The create map analysis section, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames';

//import Divider from '@material-ui/core/Divider';
//import InputAdornment from '@material-ui/core/InputAdornment';
//import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import CreateMapFile from 'analyze/CreateMapFile'

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'flex-start',
        //justifyContent: 'space-around',
        //flexWrap: 'wrap',
        //flexDirection: 'column',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        //width: 300,
        //flexBasis: 200,
    },
    user: {
        maxWidth: '200px',
    }
});

const MapName = (user, classes) => {
    let comp =
        <React.Fragment>
            <Typography
                align='right'
                variant='subheading'
                className='user'
                color='textSecondary'
                style={{
                    display: 'inline',
                }}
            >
                {user + '/'}
            </Typography>
            <TextField
                id='mapName'
                label='Map name *'
                className={classNames(classes.margin, classes.textField)}
                defaultValue='map'
                helperText='some helper text'
            />
        </React.Fragment>

    return comp
}

const BasicOptions = (user, advanced, classes, onAnalyzeClick) => {
    if (advanced) {
        return null
    }
    let comp =
        <React.Fragment>
            <CreateMapFile />
            <MapName />
            <hr/>
    
            <Typography variant='caption'>
                * Required
            </Typography>
        </React.Fragment>

    return comp
}

const CreateMapPres = ({ user, advanced, classes, onAnalyzeClick } ) => (
    
    <div style={{ width: '1200px' }}>
        {BasicOptions(user, advanced, classes, onAnalyzeClick)}
    </div>
)

CreateMapPres.propTypes = {
    user: PropTypes.string.isRequired,
    advanced: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    onAnalyzeClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(CreateMapPres);
