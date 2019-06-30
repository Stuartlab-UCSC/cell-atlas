
import React from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { get as rxGet } from 'state/rx'

const NamerDialogPres = (props) => {
    let {error, helperText, message, name, open, onTextChange, onTextKeyPress,
        onClose, onSubmit } = props
    name = name || ''
    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle id="form-dialog-title">
                    {message}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        defaultValue={name}
                        error={error}
                        fullWidth
                        helperText={helperText}
                        id="namerDialog"
                        margin="dense"
                        onChange={onTextChange}
                        onKeyPress={onTextKeyPress}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        color="primary"
                        variant='contained'
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { error, helperText, name, message, open } = state.namerDialog
    return {
        error,
        helperText,
        name,
        message,
        open,
    }
}

const onSubmit = (dispatch) => {
    dispatch({ type: 'namerDialog.open.false' })
    const name = rxGet('namerDialog.name')
    rxGet('namerDialog.onSubmit')(name, dispatch)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTextKeyPress: ev => {
            if (ev.key === 'Enter') {
                onSubmit(dispatch)
            }
        },
        onTextChange: ev => {
            dispatch({
                type: 'namerDialog.name.change',
                value: ev.target.value,
            })
        },
        onSubmit: ev => {
            onSubmit(dispatch, ev)
        },
        onClose: ev => {
            dispatch({ type: 'namerDialog.open.false' })
        },
    }
}

const NamerDialog = connect(
    mapStateToProps, mapDispatchToProps
)(NamerDialogPres)

const defaultState = {
    name: null,
    message: 'Name this',
    onSubmit: null,
    open: false,
}
const namerDialogState = (
    state = defaultState, action) => {
        switch(action.type) {
        case 'namerDialog.name.change':
            return {
                ...state,
                name: action.value
            }
        case 'namerDialog.useNow':
            return {
                error: action.error,
                helperText: action.helperText,
                name: action.name,
                message: action.message,
                open: true,
                onSubmit: action.onSubmit,
            }
        case 'namerDialog.open.false':
            return {
                ...state,
                open: false,
            }
        default:
            return state
        }
    }


export default NamerDialog
export { namerDialogState } 
