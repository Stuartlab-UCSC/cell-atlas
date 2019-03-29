
// The gene name input logic.

import { connect } from 'react-redux'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import { serverRequest } from 'gene/inputHeader'

const Presentation = (props) => {
    const { errorMessage, value, onNameBlur, onNameChange, onNameKeyPress }
        = props
    let error = false
    let label = 'Gene'
    if (errorMessage) {
        error = true
        label = errorMessage
    }
    return (
        <TextField
            label={label}
            value={value}
            error={error}
            helperText='HUGO, Ensembl or Entrez'
            onBlur={onNameBlur}
            onChange={onNameChange}
            onKeyPress={onNameKeyPress}
            autoFocus={true}
            style={{ width: '100%' }}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state['gene.name.errorMessage'],
        value: state['gene.name'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNameBlur: ev => {
            serverRequest(dispatch)
        },
        onNameChange: ev => {
            dispatch({
                type: 'gene.name.uiSet',
                value: ev.target.value,
            })
        },
        onNameKeyPress: ev => {
            if (ev.key === 'Enter') {
                ev.target.blur()
            }
        },
    }
}

const GeneName = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GeneName
