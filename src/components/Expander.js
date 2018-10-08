
// An area with a summary line and an expandable detail section.

import PropTypes from 'prop-types'
import React from 'react'

import Collapse from '@material-ui/core/Collapse'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import { set as rxSet } from 'app/rx'

const onClick = (ev) => {

    // Click of the expand icon.
    const data = ev.target.closest('.expandParent').dataset
    const type = data.id  + '.toggle'
    const subId = data.subid

    if (subId) {
        rxSet(type, { id: subId })
    } else {
        rxSet(type)
    }
}

const Expander = ({id, subId, detail, expand, summary, summaryVariant,
    parentStyle, collapseStyle}) => {
    
    const sumStyle = { display: 'inline' }
    const comp =
        <div
            id={id + '.' + subId}
            className='expandParent'
            data-id={id}
            data-subid={subId}
            style={parentStyle}
        >
            <Typography
                variant={summaryVariant}
                style={sumStyle}
            >
                {summary}
            </Typography>
            <IconButton
                onClick={onClick}
                aria-expanded={expand}
                aria-label="Show more"
            >
                {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <Collapse
                in={expand}
                timeout="auto"
                unmountOnExit
                style={collapseStyle}
            >
                {detail}
            </Collapse>
        </div>
    return comp
}

Expander.propTypes = {
    // Unique ID, or the first part of the unique ID if subIDs are provided.
    id: PropTypes.string.isRequired,
    subId: PropTypes.string, // unique ID, could be state ID
    detail: PropTypes.node.isRequired, // function to display expandable section
    expand: PropTypes.bool.isRequired, // true means section is to be expanded
    summary: PropTypes.string.isRequired, // text to display in top section
    summaryVariant: PropTypes.string, // typography varient of summary text
    parentStyle: PropTypes.object, // style for the outer div
    collapseStyle: PropTypes.object, // style for the collapsible section
}

Expander.defaults = {
    subId: null,
    parentStyle: { marginTop: '-0.9rem'},
    collapseStyle: { marginBottom: '1rem' },
}

export default Expander;
