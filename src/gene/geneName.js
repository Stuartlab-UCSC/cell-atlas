
// Search for a gene.

import React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import { get as rxGet } from 'state/rx'

const Presentation = (props) => {
    const { value, errorMessage, onNameChange, onButtonClick } = props
    let error = false
    let label = 'Gene (Ensembl, Entrez or HUGO)'
    if (errorMessage) {
        error = true
        label = errorMessage
    }
    return (
        <React.Fragment>
            <Grid item xs={5}>
                <Typography variant='subtitle1' align='right'>
                    Compare gene expression across datasets
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <TextField
                    label={label}
                    value={value}
                    error={error}
                    onChange={onNameChange}
                    autoFocus={true}
                    style={{ width: '100%' }}
                />
            </Grid>
            <Grid item xs={2}>
                <Button
                    variant='contained'
                    component='span'
                    size='small'
                    color='primary'
                    onClick={onButtonClick}
                >
                    Find Datasets
                </Button>
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        value: state['geneName.value'],
        errorMessage: state['geneName.errorMessage'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNameChange: ev => {
            dispatch({
                type: 'geneName.value.uiSet',
                value: ev.target.value,
            })
        },
        onButtonClick: ev => {
            console.log('onButtonClick')
            if (rxGet('geneName.value').length < 1) {
                dispatch({
                    type: 'geneName.errorMessage.set',
                    value: 'a gene must be entered',
                })
            } else {
                dispatch({ type: 'gene.fetchStatus.preRequest' })
                dispatch({ type: 'geneName.errorMessage.clear' })
            }
        },
    }
}

const GeneName = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GeneName
