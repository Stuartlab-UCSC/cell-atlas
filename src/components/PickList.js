
// A simple pick list, no search.

import React from 'react'
import FormControl from '@material-ui/core/FormControl/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const Label = ({ label }) => {
    if (!label) {
        return (null)
    }
    return (
        <InputLabel>
            {label}
        </InputLabel>
    )
}

const HelperText = ({ helperText }) => {
    if (!helperText) {
        return (null)
    }
    return (
        <FormHelperText>
            {helperText}
        </FormHelperText>
    )
}

const PickList = ({id, helperText, label, list, selected, onChange}) => {
    if (!list) {
        list = []
    }
    if (!selected) {
        selected = 'none'
    }
    return (
        <FormControl>
            <Label label={label} />
            <Select
                value={selected}
                onChange={onChange}
                name={label}
                displayEmpty
                style={{width: '100%'}}
            >
                {list.map((item, i) => (
                    <MenuItem
                        value={item.value}
                        key={i}
                    >
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
            <HelperText helperText={helperText} />
        </FormControl>
    )
}

export default PickList
