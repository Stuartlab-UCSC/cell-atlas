
// Simple input components, usually as part of a grid.

import React from 'react'
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { onChange, onToggle } from 'input/inputEvent'

export const TextFieldGrid = ({ id, label, defaultValue, tooltip }) => {

    // Tooltip is optional.
    let title = defaultValue
    if (defaultValue) {
        if (tooltip) {
            title += ': ' + tooltip
        }
    } else if (tooltip) {
            title = tooltip
    }
    const comp =
        <TextField
            id={id}
            label={label}
            style={{ width: '100%' }}
            defaultValue={defaultValue}
            onChange={onChange}
            title={title}
        />
    return comp
}

export const ToggleGrid = ({ id, label, checked, tooltip }) => {

    // Tooltip is optional.
    const comp =
        <React.Fragment>
            <Typography variant='caption' title={tooltip}>
                {label}
            </Typography>
            <Switch
                id={id}
                checked={checked}
                onChange={onToggle}
                title={tooltip}
            />
        </React.Fragment>
    return comp
}
