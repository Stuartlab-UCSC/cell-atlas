
// Gene chart input header presentational component.

import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography'
//import GeneName from 'components/geneName'

const UploadButton = ({ onClick }) => {
    let comp =
        <Button
            variant='contained'
            component='span'
            size='small'
            color='primary'
            style={{width: '13rem'}}
            onClick={onClick}
        >
            Upload Cluster Solution
        </Button>
    return comp
}

const ColorBy = ({show, tooltip}) => {
    let comp = null
    if (show) {
        comp =
            <Typography title={tooltip} style={{marginTop: '1rem'}}>
                Similarity
            </Typography>
    }
    return comp
}

/*
const SizeBy = ({show, tooltip}) => {
    let comp = null
    if (show) {
        comp =
            <Typography title={tooltip} style={{marginTop: '1rem'}}>
                Similarity
            </Typography>
    }
    return comp
}
*/
/*
const GeneNameCheck = ({show}) => {
    if (false) {
        return (<GeneName />)
    }
    return null
}
*/
const Presentation = (props) => {
    const { colorTooltip, showVars, /*sizeTooltip,*/ /*showGene,*/
        onUploadClick } = props
    const top = '-2.5rem'
    return (
        <Grid container spacing={16}
            alignItems='center'
            style={{height: 111, minHeight: 111}}
        >
            <Grid item xs={3} style={{marginTop: top}}>
                <UploadButton onClick={onUploadClick} />
            </Grid>
            <Grid item xs={3} style={{marginTop: top}}>
                <ColorBy show={showVars} tooltip={colorTooltip} />
            </Grid>
            <Grid item xs={3} style={{marginTop: top}} >
            </Grid>
           <Grid item xs={3} />
        </Grid>
    )
}

export default Presentation
