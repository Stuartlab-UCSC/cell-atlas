
// Show the upload file formats available and their details,
// the presentational component.

import PropTypes from 'prop-types'
import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Expander from 'components/Expander'
import MoreButton from 'components/MoreButton'

import { data } from 'upload/UploadFormatData'

const Detail = ({format, onMoreClick}) => {

    // The expanded part of the panel.
    let comp =
        <Grid container style={{marginLeft: '2rem'}}>
            <Grid item xs={5}>
                <pre style={{marginBottom: '0rem', marginTop: '0rem'}}>
                    <code>
                        {format.detailExample}
                    </code>
                </pre>
            </Grid>
            <Grid item xs={5} style={{marginLeft: '1rem', marginRight: '0rem'}}>
                <Typography style={{marginRight: '-6rem'}}>
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

const ChildPanel = ({ format, expand, onMoreClick }) => {
    
    // Skip the main panel, we already did that.
    if (format.id === 'upload.format.expand') {
        return null
    }
    expand = expand || false
    let comp =
        <Expander
            id={format.id}
            summary={format.summary}
            expand={expand || false}
            detail={<Detail format={format} onMoreClick={onMoreClick} />}
            collapseStyle={{ marginBottom: '-1rem'}}
        />
    return comp
}

const MainDetail = ({ expand, onMoreClick }) => {
    const margin = '0.5rem'
    const comp =
        <div style={{ marginTop: margin, marginLeft: '2rem', marginBottom: margin }}>
            {
                data.map((format, i) =>
                    <ChildPanel
                        format={format}
                        key={format.id}
                        expand={expand[format.id]}
                        onMoreClick={onMoreClick}
                    />
                )
            }
        </div>
    return comp
}

const UpdateFormatPres = ({ expand, onMoreClick } ) => {
    return (
        <Expander
            id={data[0].id}
            summary={data[0].summary}
            expand={expand[data[0].id]}
            detail={<MainDetail expand={expand} onMoreClick={onMoreClick}/>}
            collapseStyle={{ marginBottom: '-1rem'}}
        />
    )
}

UpdateFormatPres.propTypes = {
    expand: PropTypes.object.isRequired,
    onMoreClick: PropTypes.func.isRequired,
}

export default UpdateFormatPres;

