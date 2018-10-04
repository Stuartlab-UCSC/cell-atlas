
import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import AnalyzeButton from 'components/AnalyzeButton'
import AnalyzeHead from 'components/AnalyzeHead'
import Format from 'format/Format'
import InputFile from 'input/InputFile'

const TypePsychPres = ({ clusters, geneMatrix, metadata, onAnalyzeClick }) => {
    const id = 'typePsych'
    return (
        <Grid container className='pageBody' spacing={32} style={{marginTop: '-2.5rem'}}>
            <AnalyzeHead
                id={id}
                title='Cell Type Psychic *'
                xs={4}
            />
            <InputFile data={clusters} />
            <Format id={id} expand={clusters.expand} xsTotal={11} />
            <InputFile data={geneMatrix} />
            <Format id={id} expand={geneMatrix.expand} xsTotal={11} />
            <InputFile data={metadata} />
            <Format id={id} expand={metadata.expand} xsTotal={11} />
            <Grid item xs={12}>
                <Typography variant='caption'>
                    * Required
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <AnalyzeButton
                    label='Analyze'
                    onClick={onAnalyzeClick}
                />
            </Grid>
        </Grid>
    )
}

export default TypePsychPres
