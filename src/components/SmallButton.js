
// A small button used in tables and other insignificant places.
// Where variant is 'flat' for tables or the default for small buttons outside
// of tables.

import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

const SmallButton = ({ action, label, variant, onClick }) => {
    const labelVal = label || action
    const color = (variant === 'flat') ? 'primary' : 'secondary'
    return (
        <Button
            className='action'
            color={color}
            component='span'
            data-action={action}
            size='small'
            variant={variant}
            onClick={onClick}
        >
            {labelVal}
        </Button>
    )
}

SmallButton.propTypes = {
    action: PropTypes.string.isRequired,
    label: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

SmallButton.defaultProps = {
    variant: 'outlined',
}

export default SmallButton
