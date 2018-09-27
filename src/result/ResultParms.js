
// The result page parameter view: logic and state.

import React from 'react'
import Typography from '@material-ui/core/Typography';
import Expander from 'components/Expander'

const Detail = ({ parms }) => {

    // The expanded section.
    // Where text is an array of text lines.
    let comp =
        <span>
            {
                parms.map((line, i) =>
                    <Typography variant='caption' key={i}>
                        {line}
                    </Typography>
                )
            }
        </span>
    return comp
}

const ResultParms = ({ id, subId, parms, expand }) => {

    let comp =
        <Expander
            id={id}
            subId={subId}
            summary='Parameters'
            summaryVariant='body1'
            expand={expand}
            detail={<Detail parms={parms} />}
            parentStyle={{ marginTop: '-0.9rem', width: '9rem' }}
            collapseStyle={{ paddingBottom: '1rem', width: '50rem'}}
        />

    return comp
}

export default ResultParms
