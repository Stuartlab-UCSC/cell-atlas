
// Select a file from a list or URL entry.

import PropTypes from 'prop-types'
import React from 'react'

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';

import { onChange } from 'input/inputEvent'
import SmallButton from 'components/SmallButton'
import { TextFieldGrid } from 'input/inputGrid'

const OptGroup = ({ label, list }) => {
    const comp =
        <optgroup label={label}>
            {list.map((option, i) => (
                <option value={option.value} key={i} title={option.title}>
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
                        title={group.title}
                        key={i}
                    />
                ))}
            </NativeSelect>
        </FormControl>
    return comp
}

const InputFile = ({ data, lastColumn }) => {
    let xs = 5
    let column = null
    if (lastColumn) {
        xs = 4
        column =
            <Grid item xs={2}>
                {lastColumn}
            </Grid>
    }
    return (
        <React.Fragment>
            <Grid item xs={1}>
                <Typography>
                    {data.label}
                </Typography>
            </Grid>
            <Grid item xs={xs}>
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
                    title={'Upload another file'}
                />
            </Grid>
            <Grid item xs={xs}>
                <TextFieldGrid
                    id={data.id + '.url'}
                    label='or URL'
                    defaultValue={data.url}
                />
            </Grid>
            {column}
        </React.Fragment>
    )
}

InputFile.propTypes = {
    data: PropTypes.object.isRequired,  // values associated with this instance
    lastColumn: PropTypes.node,  // last column component
}

export default InputFile
