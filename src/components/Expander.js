
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

const Expander = ({id, subId, detail, expand, summary, summaryVarient,
    parentStyle, collapseStyle}) => {
    
    parentStyle = parentStyle || { marginTop: '-0.9rem'}
    collapseStyle = collapseStyle || { marginBottom: '1rem' }
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
                variant={summaryVarient}
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
    id: PropTypes.string.isRequired, // unique ID, recommend using state ID
    detail: PropTypes.node.isRequired, // function to display expandable section
    expand: PropTypes.bool.isRequired, // true means section is to be expanded
    summary: PropTypes.string.isRequired, // text to display in top section
    
    summaryVarient: PropTypes.string, // typography varient of summary text
}

export default Expander;
