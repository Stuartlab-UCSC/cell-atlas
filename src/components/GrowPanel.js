
// A panel that expands for details.
// Much like a material-ui Expansion Panel, but more control over spacing.

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
});

const details = (id, detail, detailShow, detailStyle, classes) => {
    // The collapsable area.
    if (!detail) {
        return null
    }
    
    const comp =
        <Collapse
            in={detailShow}
            data-id={id}
            style={detailStyle}
        >
            <div>{detail}</div>
        </Collapse>
    return comp
}

const icon = (detailShow, classes) => {

    // The up or down expansion icon.
    let comp = null
    if (detailShow) {
        comp =
            <ExpandLessIcon className={classes.icon}></ExpandLessIcon>
    } else {
        comp =
            <ExpandMoreIcon className={classes.icon}></ExpandMoreIcon>
    }
    return comp
}

const Hr = ({ show }) => {
    let comp = null
    if (show) {
        comp = <div><hr/></div>
    }
    return comp
}

const GrowPanel = ({ id, summaryText, detail, detailShow, dividerShow,
    summaryStyle, detailStyle, classes, onClick } ) => (

    <div>
        <div
            className={classes.summary}
            data-id={id}
            style={summaryStyle}
            onClick={onClick}
        >
            <Typography className={classes.summaryText}>
                {summaryText}
            </Typography>
            {icon(detailShow, classes)}
        </div>
        {details(id, detail, detailShow, detailStyle, classes)}
        <Hr show={dividerShow} />
    </div>
)

GrowPanel.propTypes = {
    id: PropTypes.string.isRequired,
    summaryText: PropTypes.string.isRequired,
    detail: PropTypes.node,
    detailShow: PropTypes.bool.isRequired,
    summaryStyle: PropTypes.object,
    detailStyle: PropTypes.object,
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(GrowPanel);
