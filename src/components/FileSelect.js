
// A multi-file selection tool with selection from a list or URL entry.

import PropTypes from 'prop-types'
import React from 'react'

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import GrowPanel from 'components/GrowPanel'
import SmallButton from 'components/SmallButton'

const ListSelect = ({ id, value, list, onChange }) => {
    const comp =
        <TextField
            label='Files'
            value={value}
            select
            style={{ width: '100%' }}
            onChange={onChange(id)}
        >
            {list.map(option => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
          ))}
        </TextField>
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
                    onClick={ () => {} }
                />
            </div>
        </React.Fragment>
    return comp
}

const Detail = (id, listValue, urlValue, list, show, onChange) => {
    if (!show) {
        return null
    }
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
                        label='URL'
                        defaultValue={urlValue}
                        style={{ width: '100%' }}
                        onChange={onChange}
                    />
                </Grid>
            </Grid>
        </div>
    return comp
}

const FileSelect = ({ id, listValue, urlValue, list, show, onChange,
    growPanel }) => (

    <GrowPanel
        id={id}
        summaryText={growPanel.label}
        detail={Detail(id, listValue, urlValue, list, show, onChange)}
        detailShow={show}
        dividerShow={growPanel.dividerShow}
        classes={growPanel.classes}
        onClick={growPanel.onClick}
    />
)

FileSelect.propTypes = {
    id: PropTypes.string.isRequired,
    listValue: PropTypes.string.isRequired,
    urlValue: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    show: PropTypes.bool,
    growPanel: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default FileSelect
