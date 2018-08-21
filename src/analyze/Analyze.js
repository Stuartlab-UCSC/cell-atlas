

// The analyze page.

import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CreateMap from 'analyze/CreateMap'

const styles = theme => ({
    title: {
        marginBottom: theme.spacing.unit * 2,
    },
});

const AnalyzePres = ({classes}) => (
    <div className='analyzePage pageBody'>
        <Typography
            variant='title'
            className={classes.title}
        >
            Analyze: Create a Map
        </Typography>
        <CreateMap />
    </div>
)
//

const mapStateToProps = (state) => {
    return {
        classes: {
            title: 'title',
        },
    }
}

const Analyze = connect(
    mapStateToProps
)(withStyles(styles)(AnalyzePres))

export default Analyze
