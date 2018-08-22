
// A multi-file selection tool with selection from a list or URL entry.

import PropTypes from 'prop-types'
import React from 'react'

import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'

import GrowPanel from 'components/GrowPanel'
import SmallButton from 'components/SmallButton'

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'flex-start',
        //justifyContent: 'space-around',
        //flexWrap: 'wrap',
        //flexDirection: 'column',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        //width: 300,
        //flexBasis: 200,
    },
});

const ListSelect = ({ id, value, list, classes, onChange }) => {
    let comp =
        <TextField
            label='From uploaded and system files'
            value={value}
            select
            multiple
            className={classNames(classes.margin, classes.textField)}
            helperText='Multiple allowed'
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

const DetailColumnOne = ({id, listValue, list, classes, onChange}) => {
    console.log('DetailColumnOne:classes:', classes)

    let comp =
        <React.Fragment>
            <div>
                <ListSelect
                    id={id}
                    value={listValue}
                    list={list}
                    classes={classes}
                    onChange={onChange}
                />
            </div>
            <div>
                <SmallButton
                    action='upload'
                    label='Upload More'
                    onClick={ () => {} }
                />
            </div>
        </React.Fragment>
    return comp
}

const Detail = (id, listValue, urlValue, list, classes, show, onChange) => {
    console.log('Detail:classes:', classes)
    if (!show) {
        return null
    }
    let comp =
        <div>
            <Grid container
                classes={classes.margin}
            >
                <Grid item xs={6}>
                    <DetailColumnOne
                        id={id}
                        listValue={listValue}
                        list={list}
                        classes={classes}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='From URLs'
                        defaultValue={urlValue}
                        className={classNames(classes.margin, classes.textField)}
                        multiline={true}
                        rows={3}
                    helperText='Multiple allowed, one URL per line'
                        onChange={onChange}
                    />
                </Grid>
            </Grid>
        </div>
    return comp
}

const FileSelect = ({ id, listValue, urlValue, list, show, classes, onChange,
    growPanel }) => (

    <GrowPanel
        id={id}
        summaryText={growPanel.label}
        detail={Detail(id, listValue, urlValue, list, classes, show, onChange)}
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
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(FileSelect)
