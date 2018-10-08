
// Select a file format from a list.

import PropTypes from 'prop-types'
import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { onChange } from 'input/inputEvent'
import { formats } from 'format/FormatData'

const OptGroup = ({ id, label, list }) => {
    const comp =
        <optgroup label={label}>
            {list.map((opt, i) => (
                <option
                    value={opt}
                    data-id={id}
                    key={i}>
                    {opt}
                </option>
            ))}
        </optgroup>
    return comp
}

const FormatSelect = ({ id, value, type }) => {

    // Render a two-tiered select list for a file format.
    const comp =
        <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor="name-native">
                    File Format *
            </InputLabel>
            <NativeSelect
                value={value}
                onChange={onChange}
                name="File Format"
                input={<Input id={id} />}
            >
                <option value='none' disabled>
                        Select a format
                </option>
                {formats[type].map((group, i) => (
                    <OptGroup
                        id={id}
                        label={group.label}
                        list={group.formats}
                        key={i}
                    />
                ))}
            </NativeSelect>
        </FormControl>
    return comp
}

FormatSelect.propTypes = {
    id: PropTypes.string.isRequired, // uploaded file list ID
    value: PropTypes.string.isRequired, // current value selected
    type: PropTypes.string.isRequired, // format type: reference / analysisInput
}

export default FormatSelect
