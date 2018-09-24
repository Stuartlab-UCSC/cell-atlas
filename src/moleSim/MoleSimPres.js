
// Molecular similarity map: presentation

import PropTypes from 'prop-types'
import React from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

import AnalyzeButton from 'components/AnalyzeButton'
import AnalyzeHead from 'components/AnalyzeHead'
import InputFile from 'input/InputFile'
import InputFileMatrixZero from 'input/InputFileMatrixZero'
import { TextFieldGrid } from 'input/inputGrid'

const MoleSimPres = ({ id, feature, metadata, name, onAnalyzeClick }) => {
    return (
        <Grid container className='pageBody' spacing={32} style={{marginTop: '-2.5rem'}}>
            <AnalyzeHead
                id={id}
                title='Map Molecular Similarity'
                xs={5}
                height='130px'
                imageTop='0.5rem'
                imageBottom='-4.5rem'
            />
            <InputFileMatrixZero data={feature} />
            <InputFile data={metadata} lastColumn={<br />} />
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
    )
}

MoleSimPres.propTypes = {
    id: PropTypes.string.isRequired, // ID of page
    feature: PropTypes.object.isRequired, // feature data
    metadata: PropTypes.object.isRequired, // metadata data
    name: PropTypes.string.isRequired, // minor map name
    onAnalyzeClick: PropTypes.func.isRequired, // upon analyze button click
}

export default MoleSimPres;
