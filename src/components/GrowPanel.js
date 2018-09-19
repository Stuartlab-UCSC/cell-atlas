
// A panel that expands for details.
// A wrapper around the material-ui Expansion Panel, with our options.

import PropTypes from 'prop-types'
import React from 'react'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'

const details = (id, detail, detailStyle) => {

    // The collapsable area.
    if (!detail) {
        return null
    }
    let style = {...detailStyle, display: 'block'}
    const comp =
        <ExpansionPanelDetails
            data-id={id}
            className='details'
            style={style}
        >
            {detail}
        </ExpansionPanelDetails>
    return comp
}

const GrowPanel = ({detail, summaryText, id, summaryStyle, defaultExpanded,
    detailStyle, onSummaryClick } ) => {
    
    return (
        <div className='summary' data-id={id} key={id} style={{display: 'block'}}>
            <ExpansionPanel defaultExpanded={defaultExpanded}>
                <ExpansionPanelSummary
                    style={summaryStyle}
                    onClick={onSummaryClick}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        {summaryText}
                    </Typography>
                </ExpansionPanelSummary>
                {details(id, detail, detailStyle)}
             </ExpansionPanel>
        </div>
    )
}

GrowPanel.propTypes = {
    detail: PropTypes.node.isRequired,
    summaryText: PropTypes.string.isRequired,
    id: PropTypes.string,
    summaryStyle: PropTypes.object,
    defaultExpanded: PropTypes.bool,
    detailStyle: PropTypes.object,
    onSummaryClick: PropTypes.func,
}

export default GrowPanel;
