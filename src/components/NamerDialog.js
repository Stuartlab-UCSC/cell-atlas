
import React from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { get as rxGet } from 'state/rx'

const NamerDialogPres = ({ open, onTextChange, onClose, onSubmit }) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle id="form-dialog-title">
                    Name this item
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="namerDialog"
                        fullWidth
                        onChange={onTextChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Name It
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        open: state['namerDialog.open'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTextChange: ev => {
            dispatch({
                type: 'namerDialog.name.change',
                value: ev.target.value,
            })
        },
        onSubmit: ev => {
            dispatch({ type: 'namerDialog.open.false' })
            const name = rxGet('namerDialog.name')
            rxGet('namerDialog.onSubmit')(name, dispatch)
        },
        onClose: ev => {
            dispatch({ type: 'namerDialog.open.false' })
        },
    }
}

const NamerDialog = connect(
    mapStateToProps, mapDispatchToProps
)(NamerDialogPres)

export default NamerDialog
