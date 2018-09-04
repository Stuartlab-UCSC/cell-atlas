
// A multi-file selection tool with selection from a list or URL entry.

import PropTypes from 'prop-types'
import React from 'react'

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';

import GrowPanel from 'components/GrowPanel'
import SmallButton from 'components/SmallButton'

const ListSelect = ({ id, value, list, onChange }) => {

    // Define a two-tiered select list for user files and public files.
    const comp =
        <FormControl style={{ width: '100%' }}>
            <InputLabel htmlFor="name-native">Files</InputLabel>
            <NativeSelect
                value={value}
                onChange={onChange(id)}
                name="Files"
                input={<Input id="name-native" />}
            >
                <optgroup label="Yours">
                    {list.yours.map((option, i) => (
                        <option value={option} key={i}>
                            {option}
                        </option>
                    ))}
                </optgroup>
                <optgroup label="Public">
                   {list.public.map((option, i) => (
                        <option value={option} key={i}>
                            {option}
                        </option>
                    ))}
                </optgroup>
            </NativeSelect>
        </FormControl>
    return comp
}

const DetailColumnOne = ({id, listValue, list, onChange}) => {
    const comp =
        <React.Fragment>
            <ListSelect
                id={id}
                value={listValue}
                list={list}
                onChange={onChange}
            />
            <div style={{ marginTop: '1rem' }}>
                <SmallButton
                    action='upload'
                    label='Upload More'
                    linkTo='/upload'
                />
            </div>
        </React.Fragment>
    return comp
}

const Detail = (id, listValue, urlValue, list, onChange) => {
    const comp =
        <div>
            <Grid container>
                <Grid item xs={5}
                    style={{marginLeft: '0px'}}
                >
                    <DetailColumnOne
                        id={id}
                        listValue={listValue}
                        list={list}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        label='or URL'
                        defaultValue={urlValue}
                        style={{ width: '100%' }}
                        onChange={onChange}
                    />
                </Grid>
            </Grid>
        </div>
    return comp
}

const FileSelect = ({ id, listValue, urlValue, list, label, defaultExpanded,
    onChange, onSummaryClick }) => {

    return (
    <GrowPanel
        defaultExpanded={defaultExpanded}
        detail={Detail(id, listValue, urlValue, list, onChange)}
        detailStyle={{marginLeft: '2rem'}}
        id={id}
        summaryText={label}
        onSummaryClick={onSummaryClick}
    />
    )
}

FileSelect.propTypes = {
    // Required
    list: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    // Not required
    defaultExpanded: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    listValue: PropTypes.string,
    urlValue: PropTypes.string,
    onSummaryClick: PropTypes.func,
}

export default FileSelect
