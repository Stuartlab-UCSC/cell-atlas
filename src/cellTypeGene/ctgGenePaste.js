
// Cell type worksheet page logic.

import React from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { getGenesForAllClusters } from 'cellTypeGene/addGene'

const Presentation = ({ show, genes, onChange, onClick }) => {
    if (!show) {
        return null
    }
    return (
        <form
            style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                label="Add Genes"
                placeholder="Enter genes, one per line"
                multiline
                rows={2}
                margin="normal"
                value={genes}
                onChange={onChange}
            />
            <Button
                variant='contained'
                component='span'
                size='small'
                onClick={onClick}
                style={{width: '100%', marginTop: '1rem' }}
            >
                Add Genes
            </Button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        genes: state.cellTypeGeneClusters.genePaste,
        show: state.cellTypeWork.showEditables,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            dispatch({
                type: 'cellTypeGeneClusters.genePaste.uiSet',
                value: ev.target.value
            })
        },
        onClick: ev => {

            getGenesForAllClusters()
        },
    }
}

const GenePaste = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GenePaste
