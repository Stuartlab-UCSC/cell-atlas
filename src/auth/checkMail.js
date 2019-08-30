
import { connect } from 'react-redux'
import React from 'react'
import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const CheckMailPres = ({ open, onClose }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            style={{marginTop: '4rem'}}
            message={<span id="message-id">
                Check your email for a verification link to sign on.
            </span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    )
}

const mapStateToProps = state => {
    return {
        open: state.auth.checkMail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClose: (ev, reason) => {
            if (reason === 'clickaway') {
                return
            }
            dispatch({ type: 'auth.checkMail.reset' })
        },
    }
}

const CheckMail = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckMailPres)

export default CheckMail
