
// Simple input components as part of a grid.

import React from 'react'
import TextField from '@material-ui/core/TextField';
import { onChange } from 'input/inputEvent'

export const TextFieldGrid = ({ id, label, defaultValue }) => {
    const comp =
        <TextField
            id={id}
            label={label}
            style={{ width: '100%' }}
            defaultValue={defaultValue}
            onChange={onChange}
        />
    return comp
}


