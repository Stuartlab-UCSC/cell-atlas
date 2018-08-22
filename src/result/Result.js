

// The upload page.

import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ResultTable from 'result/ResultTable'

const styles = theme => ({
    title: {
        marginBottom: theme.spacing.unit * 2,
    },
});

const ResultPres = ({classes}) => (
    <div className='resultPage pageBody'>
        <Typography
            variant='title'
            className={classes.title}
        >
            Analysis Results
        </Typography>
        <ResultTable />
    </div>
)

const mapStateToProps = (state) => {
    return {
        classes: {
            title: 'title',
        },
    }
}

const Result = connect(
    mapStateToProps
)(withStyles(styles)(ResultPres))

export default Result
