
// A simple pick list, no search.

import React from 'react'
import FormControl from "@material-ui/core/FormControl/FormControl"
import Input from "@material-ui/core/Input/Input"
import InputLabel from "@material-ui/core/InputLabel"
import NativeSelect from '@material-ui/core/NativeSelect'

const PickList = ({id, label, list, selected, onChange}) => {
    if (!list) {
        list = []
    }
    return (
        <FormControl style={{ width: '100%' }}>
            <InputLabel>
                {label}
            </InputLabel>
            <NativeSelect
                value={selected}
                onChange={onChange}
                label={label}
                input={<Input />}
                placeholder='Select a worksheet'
            >
                {list.map((opt, i) => (
                    <option
                        value={opt.value}
                        data-id={id}
                        key={i}>
                        {opt.name}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    )
}

export default PickList
