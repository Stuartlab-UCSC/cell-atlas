
// A table head component with sortable columns.

import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

class SmallButton extends React.Component {

    render() {
        const { action, onClick } = this.props

        return (
        <Button
            className='action'
            color='primary'
            component='span'
            data-action={action}
            size='small'
            variant='flat'
            onClick={onClick}
        >
            {action}
        </Button>
        )
    }
}

SmallButton.propTypes = {
    action: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default SmallButton
