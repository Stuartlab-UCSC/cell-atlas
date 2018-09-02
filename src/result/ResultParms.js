
// The result page parameter view: logic and state.

import React from 'react'
import Typography from '@material-ui/core/Typography';
import GrowPanel from 'components/GrowPanel'

const createDetail = (text) => {

    // The expanded part of a GrowPanel.
    // Where text is an array of text lines.
    let comp =
        <div>
            {
                text.map((line, i) =>
                    <Typography variant='caption' key={i}>
                        {line}
                    </Typography>
                )
            }
        </div>
    return comp
}

const ResultParms = (id, text, detailShow, classes, onSummaryClick ) => {
    let comp =
        <GrowPanel
            id={id}
            data={{ id: id }}
            summaryText='Parameters'
            detail={createDetail(text)}
            detailShow={detailShow}
            summaryStyle={{ marginTop: '-0.35rem' }}
            detailStyle={{ marginLeft: '0px', marginBottom: '1rem' }}
            classes={classes}
            onClick={onSummaryClick}
        />

    return comp
}

export default ResultParms
