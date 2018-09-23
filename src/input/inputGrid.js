
// Simple input components, usually as part of a grid.

import React from 'react'
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { onChange, onToggle } from 'input/inputEvent'

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

export const ToggleGrid = ({ id, label, checked }) => {
    const comp =
        <React.Fragment>
            <Typography variant='caption'>
                {label}
            </Typography>
            <Switch
                id={id}
                checked={checked}
                onChange={onToggle}
            />
        </React.Fragment>
    return comp
}
