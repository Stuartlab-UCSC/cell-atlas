
// An analyze button at the bottom of analysis pages.

import PropTypes from 'prop-types'
import React from 'react'
import Button from '@material-ui/core/Button'

const AnalyzeButton = ({ label, onClick, style }) => {
    style = style || { marginTop: '2rem' }
    return (
        <Button
            variant='contained'
            component='span'
            color='primary'
            onClick={onClick}
            style={style}
        >
            {label}
        </Button>
    )
}

AnalyzeButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,
}

export default AnalyzeButton;
