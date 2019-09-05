
// Our wrapper around material-ui snackbar.

import React from 'react'
import { Button, IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const Action = ({ label, onClick }) => {
    if (!label || !onClick) {
        return null
    }
    return (
        <Button
            color="inherit"
            size="small"
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

const CaSnackbar = ({ actionLabel, message, open, onActionClick, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            ContentProps={{
                'aria-describedby': 'snackbar-id',
            }}
            style={{marginTop: '4rem'}}
            message={<span id='snackbar-id'>
                {message}
            </span>}
            action={[
                <Action
                    key='action'
                    label={actionLabel}
                    onClick={onActionClick}
                />,
                <IconButton
                    key='close'
                    aria-label='close'
                    color='inherit'
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    )
}

export default CaSnackbar
