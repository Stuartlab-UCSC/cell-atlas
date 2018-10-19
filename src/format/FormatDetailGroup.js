
// Show the file formats available and their details,

import PropTypes from 'prop-types'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import FormatDetail from 'format/FormatDetail'
import { Tbd } from 'format/FormatDetail'
import Expander from 'components/Expander'

const AllFormats = ({ id, expand }) => {

    //console.log('AllFormats: id, expand:', id, expand)
// FormatDetail = ({ id, expand, padXs, contentXs,
    // Render all of the formats in the group.
    const comp =
        <React.Fragment>
            {expand.map((state, i) =>
                <React.Fragment key={state.id}>
                        <FormatDetail
                            id={id}
                            expand={expand[i]}
                            notLast={true}
                        />
                </React.Fragment>
            )}
        </React.Fragment>
    return comp
}

const FormatDetailGroup = ({ id, expand } ) => {

    //console.log('FormatDetailGroup: id, expand:', id, expand)
    //console.log('FormatDetailGroup: expand[0]:',  expand[0])
    const padGrid = <Grid item xs={1} />
    return (
        <Expander
            id={expand[0].id}
            summary={expand[0].summary}
            expand={expand[0].value}
            detail={
                <Grid container>
                    <AllFormats
                        id={id}
                        expand={expand.slice(1)}
                    />
                    <Tbd
                        padGrid={padGrid}
                        contentXs={11}
                        last={true} />
                 </Grid>
            }
        />
    )
}

FormatDetailGroup.propTypes = {
    id: PropTypes.string.isRequired, // unique ID for this instance
}

export default FormatDetailGroup;

