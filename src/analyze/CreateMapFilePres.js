
// Create map, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'
//import classNames from 'classnames';

//import Divider from '@material-ui/core/Divider';
//import InputAdornment from '@material-ui/core/InputAdornment';
//import MenuItem from '@material-ui/core/MenuItem';
//import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'
//import Typography from '@material-ui/core/Typography'

import FileSelect from 'components/FileSelect'

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

const File = ({ advanced, info, classes, onSummaryClick, onChange }) => {
    let comp =
        <div>
            <FileSelect
                id={info.id}
                list={info.list}
                listValue={info.listValue}
                urlValue={info.urlValue}
                show={info.show}
                classes={classes}
                onChange={onChange}
                growPanel={{
                    label: info.label,
                    dividerShow: true,
                    classes: {
                        icon: 'icon',
                        margin: 'margin',
                        summary: 'summary',
                        summaryText: 'summaryText',
                        details: 'details',
                    },
                    onClick: onSummaryClick,
                }}
            />
        </div>
    return comp
}

const CreateMapFilePres = ({ advanced, feature, attr, classes, onSummaryClick,
    onChange }) => (
    
    <div>
        <File
            advanced={advanced}
            info={feature}
            classes={classes}
            onSummaryClick={onSummaryClick}
            onChange={onChange}
        />
        <File
            advanced={advanced}
            info={attr}
            classes={classes}
            onSummaryClick={onSummaryClick}
            onChange={onChange}
        />
    </div>
)

CreateMapFilePres.propTypes = {
    advanced: PropTypes.bool,
    feature: PropTypes.object.isRequired,
    attr: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    onSummaryClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(CreateMapFilePres);
