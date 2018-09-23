
// Show the upload file formats available and their details,
// the presentational component.

import PropTypes from 'prop-types'
import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import GrowPanel from 'components/GrowPanel'
import MoreButton from 'components/MoreButton'

const detail = (item, onMoreClick) => {

    // The expanded part of the panel.
    let comp =
        <Grid container style={{marginLeft: '2rem'}}>
            <Grid item xs={5}>
                <pre style={{marginBottom: '0rem', marginTop: '0rem'}}>
                    <code>
                        {item.detailExample}
                    </code>
                </pre>
            </Grid>
            <Grid item xs={5} style={{marginLeft: '1rem', marginRight: '0rem'}}>
                <Typography style={{marginRight: '-6rem'}}>
                    {item.detailText}
                    <MoreButton
                        onClick={onMoreClick}
                    />
                </Typography>
            </Grid>
        </Grid>
    return comp
}

const childPanel = (item, i, defaultExpanded, onExpandClick, onMoreClick) => {
    
    // Skip the info for the main panel.
    //if (!defaultExpanded || item.id === 'main') {
    if (item.id === 'main') {
        return null
    }
    defaultExpanded = defaultExpanded || false
    let comp =
        <GrowPanel
            id={item.id}
            key={i}
            summaryText={item.summaryText}
            detail={detail(item, onMoreClick)}
            defaultExpanded={defaultExpanded || false}
            detailStyle={{}}
            onClick={onExpandClick}
        />
    return comp
}

const UpdateFormatPres = ({ info, defaultExpanded, onExpandClick,
    onMoreClick } ) => {
    
    return (
    <div style={{ marginBottom: '1rem' }}>
        <GrowPanel
            id={info[0].id}
            summaryText={info[0].summaryText}
            defaultExpanded={defaultExpanded['main']}
            detailStyle={{marginLeft: '2rem'}}
            onExpandClick={onExpandClick}
            detail={
                info.map((item, i) =>
                    childPanel(item, i, defaultExpanded[item.id],
                        onExpandClick, onMoreClick)
                )
            }
        >
        </GrowPanel>
    </div>
    )
}

UpdateFormatPres.propTypes = {
    info: PropTypes.array.isRequired,
    defaultExpanded: PropTypes.object.isRequired,
    onExpandClick: PropTypes.func.isRequired,
    onMoreClick: PropTypes.func.isRequired,
}

export default UpdateFormatPres;

