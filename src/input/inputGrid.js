
// Simple input components, style for being within a grid item.

import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { onChange, onToggle } from 'input/inputEvent'

export const TextFieldGrid = ({ id, label, defaultValue, tooltip, style }) => {

    if (!style) {
        style = {}
    }
    style.width = '100%'
    
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
            defaultValue={defaultValue}
            onChange={onChange}
            title={title}
            style={style}
        />
    return comp
}

export const ToggleGrid = ({ id, label, checked, tooltip }) => {

    // Tooltip is optional.
    const comp =

      <FormControl component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
                <Switch
                    id={id}
                    checked={checked}
                    onChange={onToggle}
                    title={tooltip}
                />
            }
            label={label}
        />
        </FormGroup>
        </FormControl>
    return comp
}
