
// The result page parameter view: logic and state.

import React from 'react'
import Typography from '@material-ui/core/Typography';
import GrowPanel from 'components/GrowPanel'

const createDetail = (text) => {

    // The expanded part of a GrowPanel.
    // Where text is an array of text lines.
    let comp =
        <span>
            {
                text.map((line, i) =>
                    <Typography variant='caption' key={i}>
                        {line}
                    </Typography>
                )
            }
        </span>
    return comp
}


const ResultParms = (id, text, defaultExpanded, classes, onParmClick ) => {
    let comp =
        <GrowPanel
            id={id}
            data={{ id: id }}
            summaryText='Parameters'
            summaryStyle={{ marginTop: '-1rem',padding: '0rem', paddingLeft: '1rem' }}
            detail={createDetail(text)}
            defaultExpanded={defaultExpanded}
            detailStyle={{ marginBottom: '1rem' }}
            classes={classes}
            onSummaryClick={onParmClick}
        />

    return comp
}

export default ResultParms
