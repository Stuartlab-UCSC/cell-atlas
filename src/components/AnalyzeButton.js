
// An analyze button at the bottom of analysis pages.

import PropTypes from 'prop-types'
import React from 'react'
import Button from '@material-ui/core/Button'

const AnalyzeButton = ({ label, onClick }) => {
    return (
        <Button
            variant='contained'
            component='span'
            color='primary'
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

AnalyzeButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default AnalyzeButton;
