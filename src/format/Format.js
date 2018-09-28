
// Show the file formats available and their details,
// the presentational component.

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

const Detail = ({ format }) => {

    // The expanded part of the panel.
    let comp =
        <Grid container>
            <Grid item xs={1} />
            <Grid item xs={5}>
                <pre style={{marginBottom: '0rem', marginTop: '0rem'}}>
                    <code>
                        {format.detailExample}
                    </code>
                </pre>
            </Grid>
            <Grid item xs={6}>
                <Typography style={{marginBottom: '0rem', marginTop: '0rem'}}>
                    {format.detailText}
                    <MoreButton
                        id={format.id + '.more'}
                        onClick={onMoreClick}
                    />
                </Typography>
            </Grid>
        </Grid>
    return comp
}

const getFormatId = (id, stateId) => {
    return stateId.slice(id.length + 1, -7)
}

const EachFormat = ({ id, expand }) => {

    // Render each file format section.
    const comp =
        <React.Fragment>
            {expand.map((state, i) =>
                <React.Fragment key={state.id}>
                    <Grid item xs={1} />
                    <Grid item xs={11}>
                        <Expander
                            id={state.id}
                            summary={data[getFormatId(id, state.id)].summary}
                            expand={expand[i].value}
                            detail={<Detail format={data[getFormatId(id, state.id)]}/>}
                            parentStyle={{ marginTop: '-1rem', marginBottom: '-0.5rem' }}
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
        return (
            <React.Fragment>
                <Grid item xs={xsPad} />
                <Grid item xs={12-xsPad}>
                    <Expander
                        id={group.id}
                        summary={data.format.summary}
                        expand={group.value}
                        detail={
                            <Grid container>
                            <EachFormat
                                id={id}
                                expand={expand.slice(1)}
                            />
                            </Grid>
                        }
                    />
                </Grid>
            </React.Fragment>
        )
    } else {
        return (
            <EachFormat
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

