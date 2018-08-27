
// A small button used in tables and other insignificant places.
// Where variant is 'flat' for tables or the default for small buttons outside
// of tables.

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'

const SmallButton = ({ action, label, variant, linkTo, href, onClick }) => {
    const labelVal = label || action
    const color = (variant === 'flat') ? 'primary' : 'secondary'
    if (linkTo) {
        return (
            <Button
                className='action'
                color={color}
                component={Link}
                to={linkTo}
                data-action={action}
                size='small'
                variant={variant}
                onClick={onClick}
            >
                {labelVal}
            </Button>
        )
    } else {
        return (
            <Button
                className='action'
                color={color}
                data-action={action}
                href={href}
                size='small'
                variant={variant}
                onClick={onClick}
            >
                {labelVal}
            </Button>
        )
    }
}

SmallButton.propTypes = {
    action: PropTypes.string.isRequired,
    href: PropTypes.string,
    label: PropTypes.string,
    linkTo: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func,
}

SmallButton.defaultProps = {
    variant: 'outlined',
}

export default SmallButton
