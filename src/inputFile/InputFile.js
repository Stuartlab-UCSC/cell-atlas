
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

const ThirdColumn = ({ column }) => {
    if (!column) {
        return null
    }
    const comp =
        <Grid item xs>
            {column}
        </Grid>
    return comp
}

const Detail = ({ data, gridSize, thirdColumn, onChange}) => {
    
    let xs = gridSize || 5
    const buttonGridStyle = {
        marginTop: (thirdColumn) ? '-0.5rem' : '0.5em',
        marginBottom: '0.5rem',
    }
    const comp =
        <div>
            <Grid container>
                <Grid item xs={xs}>
                    <ListSelect
                        id={data.id}
                        value={data.listValue}
                        list={data.list}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={xs}>
                    <TextField
                        label='or URL'
                        defaultValue={data.urlValue}
                        style={{ width: '100%' }}
                        onChange={onChange}
                    />
                </Grid>
                <ThirdColumn column={thirdColumn} />
            </Grid>
            <Grid container style={buttonGridStyle}>
                <Grid item xs={xs}>
                    <SmallButton
                        action='upload'
                        label='Upload More'
                        linkTo='/upload'
                    />
                </Grid>
            </Grid>
        </div>
    return comp
}

const InputFilePres = ({ data, gridSize, thirdColumn, onChange,
    onSummaryClick }) => {

    return (
        <GrowPanel
            defaultExpanded={data.show}
            detail={Detail({data, gridSize, thirdColumn, onChange})}
            detailStyle={{}}
            id={data.id}
            summaryText={data.summaryText}
            onSummaryClick={onSummaryClick}
        />
    )
}

InputFilePres.propTypes = {
    data: PropTypes.object.isRequired,  // values associated with this instance
    onChange: PropTypes.func.isRequired, // on file selection changing
    gridSize: PropTypes.number, // with rows being 12 units wide
    thirdColumn: PropTypes.node, // any component to be in the 3rd column
    onSummaryClick: PropTypes.func, // clicks on the header of collapsable
}

export default InputFilePres
