
// The gene name input logic.

import { connect } from 'react-redux'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import { get as rxGet } from 'state/rx'
import { onSubmitClick } from 'cellType/page'

const Presentation = (props) => {
    const { errorMessage, value, onNameBlur, onNameChange, onNameKeyPress,
        helperInLabel } = props
    let error = false
    let label = 'Gene'
    let helperText = 'HUGO, Ensembl or Entrez'
    if (helperInLabel) {
        helperText = null
        label = 'Gene  (HUGO, Ensembl or Entrez)'
    }
    if (errorMessage) {
        error = true
        label = errorMessage
    }
    return (
        <TextField
            label={label}
            value={value}
            error={error}
            helperText={helperText}
            onBlur={onNameBlur}
            onChange={onNameChange}
            onKeyPress={onNameKeyPress}
            autoFocus={true}
            style={{ width: '100%' }}
        />
    )
}

const isValidGeneName = (dispatch) => {
    if (rxGet('cellType.geneName').length < 1) {
        dispatch({
            type: 'cellType.geneNameErrorMessage.set',
            value: 'a gene name is required',
        })
        return false
    }
    return true
}

const mapStateToProps = (state) => {
    return {
        helperInLabel: state.cellType.geneNameHelperInLabel,
        errorMessage: state.cellType.geneNameErrorMessage,
        value: state.cellType.geneName,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNameChange: ev => {
            // TODO do we need both of these?
            dispatch({
                type: 'cellType.geneName.uiSet',
                value: ev.target.value,
            })
            dispatch({
                type: 'cellType.color_by.uiSet',
                value: ev.target.value,
            })
        },
        onNameKeyPress: ev => {
            // Clicking on Enter will trigger a server request.
            if (ev.key === 'Enter') {
                dispatch({
                    type: 'cellType.geneNameErrorMessage.clear',
                })
                onSubmitClick(dispatch)
            }
        },
    }
}

const GeneName = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GeneName
export { isValidGeneName } 
 
