
// Show the available file formats and their details,

import PropTypes from 'prop-types'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Expander from 'components/Expander'
import MoreButton from 'components/MoreButton'
import { data } from 'format/FormatData'

const onMoreClick = ev => {
    console.log('onMoreClick: ID:', ev.target.closest('.moreParent').id)
}

export const Tbd = ({ last, padGrid, contentXs, marginTop }) => {

    // Render the TBD message line at the bottom of the file formats.
    let comp = null
    if (last) {
        if (!marginTop) {
            marginTop = '1rem'
        }
        comp =
            <React.Fragment>
                {padGrid}
                <Grid item xs={contentXs}>
                    <Typography style={{marginBottom: '0rem', marginTop: marginTop}}>
                        TBD indicates this file's format has not yet been determined.
                    </Typography>
                </Grid>
            </React.Fragment>
    }
    return comp
}

const Detail = ({ data, last, padGrid, contentXs}) => {

    // The expanded part of a file format section.
    let comp =
        <Grid container>
            {padGrid}
            <Grid item xs={contentXs}>
                <pre style={{marginBottom: '0rem', marginTop: '0rem'}}>
                    <code>
                        {data.detailExample}
                    </code>
                </pre>
            </Grid>
            <Grid item xs={6}>
                <Typography style={{marginBottom: '0rem', marginTop: '0rem'}}>
                    {data.detailText}
                    <MoreButton
                        id={data.id + '.more'}
                        onClick={onMoreClick}
                    />
                </Typography>
            </Grid>
            <Tbd
                last={last}
                padGrid={padGrid}
                contentXs={contentXs}
            />
        </Grid>
    return comp
}

const getFormatId = (id, stateId) => {
    // Find the particular file format, X, where X is in the stateId as:
    // id.X.expand
    return stateId.slice(id.length + 1, -7)
}

const FormatDetail = ({ id, expand, padXs, contentXs, notLast }) => {

    // Renders one format description section.
    // Note that the summary property of expand is not required and defaults
    // to the summary provided in the format data file
    let dataId = getFormatId(id, expand.id)
    let summary = expand.summary
    if (!summary) {
        summary = data[dataId].summary
    }
    const detail = <Detail data={data[dataId]} last={!notLast} />
    const parentStyle = { marginTop: '-1rem', marginBottom: '-0.5rem' }

    // Find the number of cells in the grid the padding and content should take.
    // Default to 1 cell of padding and 11 cells of content.
    if (padXs === undefined) { // TODO why doesn't default work?
        padXs = 1
    }
    let padGrid = null
    if (padXs) {
        padGrid = <Grid item xs={padXs} />
    }
    if (contentXs === undefined) { // TODO why doesn't default work?
        contentXs = 11
    }
    return (
        <React.Fragment>
            {padGrid}
            <Grid item xs={contentXs}>
                <Expander
                    id={expand.id}
                    summary={summary}
                    expand={expand.value}
                    detail={detail}
                    parentStyle={parentStyle}
                />
            </Grid>
        </React.Fragment>
    )
}

FormatDetail.propTypes = {
    id: PropTypes.string.isRequired, // unique ID for this instance
    expand: PropTypes.object.isRequired, // expand ids and values
    padXs: PropTypes.number,  // number of grid cells for front padding
    contentXs: PropTypes.number, // number of grid cells for the content
}

FormatDetail.defaults = {
    padXs: 1,
    contentXs: 11,
}

export default FormatDetail;

