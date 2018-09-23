
// Molecular similarity map: presentation

import PropTypes from 'prop-types'
import React from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

//import Email from 'components/Email'
import AnalyzeButton from 'components/AnalyzeButton'
import InputFile from 'input/InputFile'
import InputFileMatrixZero from 'input/InputFileMatrixZero'
import { TextFieldGrid } from 'input/inputGrid'

const MoleSimPres = ({ id, feature, metadata, name, onAnalyzeClick }) => {
    return (
        <div className='analyzePage pageBody'>
            <Grid container spacing={32}>
                <Grid item xs={12}>
                    <Typography
                        variant='title'
                        style={{ marginBottom: '1rem' }}
                    >
                        Analyze: Map Molecular Similarity
                    </Typography>
                </Grid>
                <InputFileMatrixZero data={feature} />
                <InputFile data={metadata} />
                <Grid item xs={5}>
                    <TextFieldGrid
                        id={id + '.name'}
                        label='Map name *'
                        defaultValue={name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='caption'>
                        * Required
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <AnalyzeButton
                        label='Build Map'
                        onClick={onAnalyzeClick}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

MoleSimPres.propTypes = {
    name: PropTypes.string.isRequired, // minor map name
    onAnalyzeClick: PropTypes.func.isRequired, // upon analyze button click
}

export default MoleSimPres;
