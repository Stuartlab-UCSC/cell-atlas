
// A multi-file selection tool with selection from a list or URL entry,
// presentational component.

import PropTypes from 'prop-types'
import React from 'react'

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import { onChange } from 'input/inputEvent'
import SmallButton from 'components/SmallButton'
import { TextFieldGrid } from 'input/inputGrid'

const OptGroup = ({ label, list }) => {
    const comp =
        <optgroup label={label}>
            {list.map((option, i) => (
                <option value={option.value} key={i}>
                    {option.label}
                </option>
            ))}
        </optgroup>
    return comp
}

const ListSelect = ({ id, value, list }) => {
   
    // Define a two-tiered select list for user files and public files.
    const comp =
        <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor="name-native">Files</InputLabel>
            <NativeSelect
                value={value}
                onChange={onChange}
                name="Files"
                input={<Input id={id + '.file'} />}
            >
                {list.map((group, i) => (
                    <OptGroup
                        label={group.label}
                        list={group.list}
                        key={i}
                    />
                ))}
            </NativeSelect>
        </FormControl>
    return comp
}

const InputFile = ({ data, lastColumn }) => {
    return (
        <React.Fragment>
            <Grid item xs={1}>
                {data.label}
            </Grid>
            <Grid item xs={4}>
                <ListSelect
                    id={data.id}
                    value={data.file}
                    list={data.list}
                />
            </Grid>
            <Grid item xs={1}>
                <SmallButton
                    action='upload'
                    label='Upload More'
                    linkTo='/upload'
                    style={{textAlign: 'center'}}
                />
            </Grid>
            <Grid item xs={4}>
                <TextFieldGrid
                    id={data.id + '.url'}
                    label='or URL'
                    defaultValue={data.url}
                />
            </Grid>
            <Grid item xs={2}>
                {lastColumn}
            </Grid>
        </React.Fragment>
    )
}

InputFile.propTypes = {
    data: PropTypes.object.isRequired,  // values associated with this instance
    lastColumn: PropTypes.node,  // last column component
}

export default InputFile
