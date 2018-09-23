
// The similarity map file selection, the presentational component.

import PropTypes from 'prop-types'
import React from 'react'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import InputFile from 'input/InputFile'
import { onToggle } from 'input/inputEvent'

const ZeroReplace = ({id, zero}) => {
    const comp =
        <React.Fragment>
            <Typography variant='caption'>
                Zero-fill empty values
            </Typography>
            <Switch
                id={id + '.zero'}
                checked={zero}
                onChange={onToggle}
                value='zero'
            />
        </React.Fragment>
    return comp
}

const InputFileMatrixZero = ({ data }) => {
    return (
        <InputFile
            data={data}
            lastColumn={
                <ZeroReplace
                    id={data.id}
                    zero={data.zero}
                />
            }
        />
    )
}

/*
*/
InputFileMatrixZero.propTypes = {
    data: PropTypes.object.isRequired,  // values associated with this instance
}

export default InputFileMatrixZero;

