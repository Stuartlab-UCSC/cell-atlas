
// Our wrapper around material-ui snackbar.

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import { Button, IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { rxSet } from 'state/rx'


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

const CaSnackbarPres = (props) => {
    const { actionLabel, message, open, onActionClick, onClose } = props
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

CaSnackbarPres.propTypes = {
    open: PropTypes.bool.isRequired, // true means the open the snackbar
    message: PropTypes.string.isRequired, // the message to the user

    actionLabel: PropTypes.string, // the label on the optional action button
    onActionClick: PropTypes.func, // the event handler for the action button
    onClose: PropTypes.func, // the event handler for closing the snackbar
}

const onReallyClose = (reason, onClose) => {
    if (reason === 'clickaway') {
        return
    }
    if (onClose) {
        onClose()
    }
    rxSet('app.snackbar.close')
}

const mapStateToProps = state => {
    return {
        ...state.app.snackbar,
        onClose: (ev, reason) =>
            onReallyClose(reason, state.app.snackbar.onClose),
    }
}

const CaSnackbar = connect(
    mapStateToProps
)(CaSnackbarPres)

export default CaSnackbar
