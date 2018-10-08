
// A small button used in tables and other insignificant places.
// Where variant is 'flat' for tables or the default for small buttons outside
// of tables.

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'

const SmallButton = ({ id, action, label, variant, linkTo, href, style, title,
    onClick }) => {
    
    const labelVal = label || action
    const color = (variant === 'flat') ? 'primary' : 'secondary'
    
    // Separate those with a link and those without because we cannot supply
    // a null or undefined value to the "component" property. Note that link
    // is more responsive than href.
    if (linkTo) {
        return (
            <Button
                className='action'
                color={color}
                component={Link}
                to={linkTo}
                data-action={action}
                data-id={id}
                size='small'
                style={style}
                variant={variant}
                title={title}
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
                data-id={id}
                href={href}
                size='small'
                variant={variant}
                title={title}
                onClick={onClick}
            >
                {labelVal}
            </Button>
        )
    }
}

SmallButton.propTypes = {
    action: PropTypes.string.isRequired,
    id: PropTypes.string,
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
