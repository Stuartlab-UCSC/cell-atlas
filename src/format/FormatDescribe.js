
// Show the file formats available and their details,

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

const Tbd = ({ last, marginTop }) => {

    // Render the TBD message line at the bottom of the file formats.
    let comp = null
    if (last) {
        if (!marginTop) {
            marginTop = '1rem'
        }
        comp =
            <React.Fragment>
                <Grid item xs={1} />
                <Grid item xs={11}>
                    <Typography style={{marginBottom: '0rem', marginTop: marginTop}}>
                        TBD indicates this file's format has not yet been determined.
                    </Typography>
                </Grid>
            </React.Fragment>
    }
    return comp
}

const Detail = ({ data, last }) => {

    // The expanded part of a file format section.
    let comp =
        <Grid container>
            <Grid item xs={1} />
            <Grid item xs={5}>
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
            <Tbd last={last} />
        </Grid>
    return comp
}

const getFormatId = (id, stateId) => {
    // Find the particular file format, X, where X is in the stateId as:
    // id.X.expand
    return stateId.slice(id.length + 1, -7)
}

const OneFormat = ({ id, expand, last }) => {

    // Render one file format section.
    let dataId = getFormatId(id, expand.id)
    let summary = expand.summary
    if (!summary) {
        summary = data[dataId].summary
    }
    const comp =
        <Expander
            id={expand.id}
            summary={summary}
            expand={expand.value}
            detail={<Detail data={data[dataId]} last={last} />}
            parentStyle={{ marginTop: '-1rem', marginBottom: '-0.5rem' }}
        />
    
    return comp
}

const AllFormats = ({ id, expand }) => {

    // If a group is included this renders all fo the child formats. Without a
    // group provided, this renders all of the format sections.
    const comp =
        <React.Fragment>
            {expand.map((state, i) =>
                <React.Fragment key={state.id}>
                    <Grid item xs={1} />
                    <Grid item xs={11}>
                        <OneFormat
                            id={id}
                            expand={expand[i]}
                            last={(expand.length === 1)}
                        />
                    </Grid>
                </React.Fragment>
            )}
        </React.Fragment>
    return comp
}

const FormatDescribe = ({ id, expand } ) => {
    
    // Render one or more file format sections, with/without a group section.
    // This function adds the group section if there is one, then renders the
    // rest of the formats requested.
    
    // Find the optional group for this instance by looking for a state variable
    // with the name: id + '.format.expand'.
    //console.log('FormatDescribe: expand:', expand)
    const group = expand.find(state => {
        return getFormatId(id, state.id) === 'format'
    })

    if (group) {
        let summary = expand[0].summary
        if (!summary) {
            summary = data.format.summary
        }
        
        return (
            <Expander
                id={group.id}
                summary={summary}
                expand={group.value}
                detail={
                    <Grid container>
                        <AllFormats
                            id={id}
                            expand={expand.slice(1)}
                        />
                        <Tbd last={true} marginTop='0rem' />
                    </Grid>
                }
            />
        )
    } else {
        return (
            <AllFormats
                id={id}
                expand={expand}
            />
        )
    }
}

FormatDescribe.propTypes = {
    expand: PropTypes.array.isRequired, // expand ids and values
    id: PropTypes.string.isRequired, // unique ID for this instance
}

FormatDescribe.default = {
    xsTotal: false,
}
export default FormatDescribe;

