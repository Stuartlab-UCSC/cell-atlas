
// An area with a summary line and an expandable detail section.

import PropTypes from 'prop-types'
import React from 'react'

import Collapse from '@material-ui/core/Collapse'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import { set as rxSet } from 'app/rx'

const margin = '-0.5rem'

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

const Expander = ({id, subId, detail, expand, summary, summaryVarient}) => {
    const comp =
        <div id={id + '.' + subId} className='expandParent' data-id={id} data-subid={subId}>
            <Typography variant={summaryVarient} style={{display: 'inline', marginTop: '-3rem', marginBottom: '-1rem'}}>
                {summary}
            </Typography>
            <IconButton
                onClick={onClick}
                aria-expanded={expand}
                aria-label="Show more"
                style={{marginTop: margin, marginBottom: margin}}
            >
                {expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <Collapse in={expand} timeout="auto" unmountOnExit>
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
