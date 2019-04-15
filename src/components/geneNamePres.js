
// The gene name input presentation.

import React from 'react'
import TextField from '@material-ui/core/TextField'


const Presentation = (props) => {
    const { errorMessage, id, value, onNameBlur, onNameChange,
        onNameKeyPress, helperInLabel } = props
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
            data-id={id}
            label={label}
            value={value}
            error={error}
            helperText={helperText}
            inputProps={{'data-id': id}}
            onBlur={onNameBlur}
            onChange={onNameChange}
            onKeyPress={onNameKeyPress}
            autoFocus={true}
            style={{ width: '100%' }}
        />
    )
}

export default Presentation
