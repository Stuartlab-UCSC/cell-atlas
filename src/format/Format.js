
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

    // The expanded part of a format section.
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
    return stateId.slice(id.length + 1, -7)
}

const EachFormat = ({ id, expand, last }) => {

    // Render each file format section.
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

    // Render a single format section or all of the child format sections.
    const comp =
        <React.Fragment>
            {expand.map((state, i) =>
                <React.Fragment key={state.id}>
                    <Grid item xs={1} />
                    <Grid item xs={11}>
                        <EachFormat
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

const Format = ({ id, expand, xsTotal } ) => {
    
    // Render one or more file format sections, with/without a group section.
    
    // Is there a group section?
    const groupId = 'format'
    const group = expand.find(state => {
        return groupId === getFormatId(id, state.id)
    })
    
    let xsPad = false
    if (xsTotal < 12) {
        xsPad = 12 - xsTotal
    }

    if (group) {
        let summary = expand[0].summary
        if (!summary) {
            summary = data.format.summary
        }
        
        return (
            <React.Fragment>
                <Grid item xs={xsPad} />
                <Grid item xs={12-xsPad}>
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
                </Grid>
            </React.Fragment>
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

Format.propTypes = {
    expand: PropTypes.array.isRequired,
}

export default Format;

