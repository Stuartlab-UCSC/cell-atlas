
// Our wrapper around material-ui snackbar.

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { rxGet, rxSet } from 'state/rx'


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

/* BOOTSTRAP BANNER COLORS
For colors use mui styles on a SnackbarContent component.
#2B5E91  dk green, info  fg
#D8EECE  lt green, info  bg
#775B2A     brown, warn  fg
#F9F5D9    yellow, warn  bg
#993031       red, error fg
#EDD4D5      pink, error bg
*/

const anchorOrigins = {
    fromDirectRequest: { vertical: 'top', horizontal: 'center' },
    info: { vertical: 'bottom', horizontal: 'center' },
    warning: { vertical: 'bottom', horizontal: 'center' },
    error: { vertical: 'top', horizontal: 'center' },
}

const prefix = {
    fromDirectRequest: 'Information: ',
    info: 'Information: ',
    warning: 'Warning: ',
    error: 'Error: ',
}

const CaSnackbarPres = (props) => {
    const { actionLabel, message, open, severity, onActionClick, onClose }
        = props
    let variant = severity || 'info'
    let autoHideDuration = 6000
    let marginTop = 0
    let TransitionProps={
        direction: 'up',
        //style: { transformOrigin: '0 0 0' }
    }
    if (variant === 'error' || variant === 'fromDirectRequest') {
        autoHideDuration = null
        marginTop = '3rem'
        TransitionProps={
            direction: 'down',
            //exit: false,
            //style: { transformOrigin: 'center top 0' }
        }
    }

    return (
        <Snackbar
            open={open}
            anchorOrigin={anchorOrigins[variant]}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            message={prefix[variant] + message}
            style={{marginTop}}
            TransitionProps={TransitionProps}
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

const mapDispatchToProps = dispatch => {
    return {
        onActionClick: () => {
            const onActionClick = rxGet('app.snackbar').onActionClick
            dispatch({ type: 'app.snackbar.close' })
            if (onActionClick) {
                onActionClick()
            }
        },
    }
}

const CaSnackbar = connect(
    mapStateToProps, mapDispatchToProps
)(CaSnackbarPres)

export default CaSnackbar
