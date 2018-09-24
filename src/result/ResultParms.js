
// The result page parameter view: logic and state.

import React from 'react'
import Typography from '@material-ui/core/Typography';
import Expander from 'components/Expander'

const Detail = ({ text }) => {

    // The expanded section.
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

const ResultParms = ({ id, subId, text, expand }) => {

    console.log('ResultParms: id, subId:', id, subId)
    
    let comp =
        <Expander
            id={id}
            subId={subId}
            summary='Parameters'
            summaryVariant='body1'
            expand={expand}
            detail={<Detail text={text} />}
        />

    return comp
}

export default ResultParms
