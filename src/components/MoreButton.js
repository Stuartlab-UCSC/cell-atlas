
// A button used to activate the text: "More..."

import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

const MoreButton = ({ id, onClick }) => {
    return (
        <span id={id} className='moreParent'>
            <Button
                color='primary'
                component='span'
                size='small'
                variant='flat'
                style={{
                    verticalAlign: 'top',
                    marginTop: '-0.3rem',
                }}
                onClick={onClick}
            >
                More...
            </Button>
        </span>
    )
}

MoreButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default MoreButton
