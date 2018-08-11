
import PropTypes from 'prop-types'
import React from 'react'

import Collapse from '@material-ui/core/Collapse';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
    summary: {
        cursor: 'pointer',
        '&:hover': {
            color: blue[700],
        },
    },
    summaryText: {
        display: 'inline-block',
        '&:hover': {
            color: blue[700],
        },
    },
    icon: {
        marginBottom: theme.spacing.unit / -2,
        marginLeft: theme.spacing.unit / 2,
        cursor: 'pointer',
    },
    details: {
        marginLeft: theme.spacing.unit * 4,
    },
});

const details = (id, detail, detailShow, classes) => {

    // The collapsable area.
    let comp =
        <Collapse
            in={detailShow}
            className={classes.details}
        >
            <div
                data-id={id}>
                {detail}
            </div>
        </Collapse>
    return comp
}

const icon = (id, detailShow, classes) => {
    let comp = null
    if (detailShow) {
        comp =
            <ExpandLessIcon
                data-id={id}
                className={classes.icon}
            >
            </ExpandLessIcon>
    } else {
        comp =
            <ExpandMoreIcon
                data-id={id}
                className={classes.icon}
            >
            </ExpandMoreIcon>
    }
    return comp
}

const GrowPanel = ({ id, summaryText, detail, detailShow, classes,
    onClick } ) => (
    
    <div>
        <div
            className={classes.summary}
            onClick={onClick}
        >
            <Typography
                data-id={id}
                className={classes.summaryText}
            >
                {summaryText}
            </Typography>
            {icon(id, detailShow, classes)}
        </div>
        {details(id, detail, detailShow, classes)}
    </div>
)

GrowPanel.propTypes = {
    id: PropTypes.string.isRequired,
    summaryText: PropTypes.string.isRequired,
    //detail: PropTypes.object.isRequired,
    detailShow: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(GrowPanel);
