
// An area with a summary line and an expandable detail section.

import PropTypes from 'prop-types'
import React from 'react'

import Collapse from '@material-ui/core/Collapse'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

const Expander = ({id, detail, expand, summary, summaryVarient, onClick}) => {
    const comp =
        <div id={id} className='parent'>
            <Typography variant={summaryVarient} style={{display: 'inline'}}>
                {summary}
            </Typography>
            <IconButton
                onClick={onClick}
                aria-expanded={expand}
                aria-label="Show more"
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
    onClick: PropTypes.func.isRequired, // function upon click of expand icon
    
    summaryVarient: PropTypes.string, // typography varient of summary text
}

export default Expander;
