
// Select files for upload, the presentation component.

import PropTypes from 'prop-types'
import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const styles = theme => ({
    input: {
        display: 'none',
    },
    button: {
        marginBottom: theme.spacing.unit * 2,
    },
});

const UploadFilePres = ({ classes, onChange} ) => (
    <div>
        <input
            className={classes.input}
            id='uploadFileInput'
            multiple
            type='file'
            onChange={onChange}
        />
        <label htmlFor='uploadFileInput'>
            <Button
                className={classes.button}
                variant='contained'
                component='span'
                color='primary'
            >
            SELECT FILES
            </Button>
        </label>
    </div>
)

UploadFilePres.propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func,
}

export default withStyles(styles)(UploadFilePres);
