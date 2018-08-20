

// The upload page.

import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import JobTable from 'job/JobTable'

const styles = theme => ({
    title: {
        marginBottom: theme.spacing.unit * 2,
    },
});

const JobPres = ({classes}) => (
    <div className='jobPage pageBody'>
        <Typography
            variant='title'
            className={classes.title}
        >
            Analysis Jobs
        </Typography>
        <JobTable />
    </div>
)

const mapStateToProps = (state) => {
    return {
        classes: {
            title: 'title',
        },
    }
}

const Job = connect(
    mapStateToProps
)(withStyles(styles)(JobPres))

export default Job
