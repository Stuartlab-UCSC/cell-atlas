
// A table head component with sortable columns.

import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

class SmallButton extends React.Component {
    render() {
        const { action, label, variant, onClick } = this.props
        let labelVal = label || action
        let color = (variant === 'flat') ? 'primary' : 'secondary'
        let style = { margin: (variant === 'flat') ? '0px' : '8px' }
        return (
            <Button
                className='action'
                color={color}
                component='span'
                data-action={action}
                size='small'
                variant={variant}
                style={style}
                onClick={onClick}
            >
                {labelVal}
            </Button>
        )
    }
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
