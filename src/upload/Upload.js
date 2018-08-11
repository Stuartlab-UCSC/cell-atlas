
import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import UploadFile from 'upload/UploadFile'
import UploadFormat from 'upload/UploadFormat'

const styles = theme => ({
    title: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
});

const UploadPres = ({classes}) => (
    <div className='uploadPage pageBody'>
        <Typography
            variant='title'
            className={classes.title}
        >
            Upload Files
        </Typography>
        <UploadFile />
        <UploadFormat />
    </div>
)

const mapStateToProps = (state) => {
    return {
        classes: {
            title: 'title',
        },
    }
}

const Upload = connect(
    mapStateToProps
)(withStyles(styles)(UploadPres))

export default Upload
