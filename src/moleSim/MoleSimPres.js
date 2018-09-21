
// Molecular similarity map: presentation

import PropTypes from 'prop-types'
import React from 'react'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

//import Email from 'components/Email'
import AnalyzeButton from 'components/AnalyzeButton'
import MoleSimFile from 'moleSim/MoleSimFile'

const gridSize = 4

/*
const email = () => {
    const comp =
        <Grid container
            style={{marginBottom: '1rem', marginLeft: '-1rem'}}
        >
            <Grid item xs={4}>
                <Email />
            </Grid>
        </Grid>
    return comp
}
*/
const Name = ({ name, onMouseOut }) => {
    const comp =
        <Grid container style={{marginTop: '2rem'}}  >
            <Grid item xs={gridSize}>
                <TextField
                    id='moleSimName'
                    label={'Map name *'}
                    style={{ width: '100%' }}
                    defaultValue={name}
                    onMouseOut={onMouseOut}
                />
            </Grid>
        </Grid>
    return comp
}

const MoleSimPres = ({
    name, onNameMouseOut,
    zero, onZeroChange,
    onAnalyzeClick }) => {
    
    return (
        <div className='analyzePage pageBody' style={{ maxWidth: '60rem'}}>
            <Typography
                variant='title'
                style={{ marginBottom: '1rem' }}
            >
                Analyze: Map Molecular Similarity
            </Typography>
            <MoleSimFile />
            <Name
                name={name}
                onNameMouseOut={onNameMouseOut}
            />
            <Typography variant='caption'
                style={{marginTop: '2em'}}
            >
                * Required
            </Typography>
            <AnalyzeButton
                label='Build Map'
                onClick={onAnalyzeClick}
            />
        </div>
    )
}

MoleSimPres.propTypes = {
    name: PropTypes.string.isRequired, // minor map name
    onNameMouseOut: PropTypes.func.isRequired, // upon leaving name field
    zero: PropTypes.bool.isRequired, // zero replace toggle
    onZeroChange: PropTypes.func.isRequired, // upon toggle
    onAnalyzeClick: PropTypes.func.isRequired, // upon analyze button click
}

export default MoleSimPres;
