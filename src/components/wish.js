
// Make a wish.

import { connect } from 'react-redux'
import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField }
    from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import fetch from 'fetch/data'

import { rxGet } from 'state/rx'

const DOMAIN = 'wish'
const Make = ({ props }) => {
    const { wishText, onClose, onSendClick, onTextChange, onTextKeyPress } = props
    return (
        <Dialog
            open={true}
            onClose={onClose}
        >
            <DialogTitle id="form-dialog-title">
                What do you wish for?
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    defaultValue={wishText}
                    fullWidth
                    id="wishDialog"
                    margin="dense"
                    multiline={true}
                    rows={3}
                    onChange={onTextChange}
                    onKeyPress={onTextKeyPress}
                />
            </DialogContent>
            <DialogActions>
                 <Button
                    onClick={onSendClick}
                    color="primary"
                    variant='contained'
                >
                    <StarBorderIcon style={{marginRight: '0.5rem'}} />
                    Wish
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const WishPres = (props) => {
    const { wishOpen, onWishClick } = props
    if (wishOpen) {
        return (
            <Make props={props} />
        )
    } else {
        return (
            <Button
                color="primary"
                size="small"
                variant='outlined'
                onClick={onWishClick}
                style={{zIndex: 1}}
            >
                <StarBorderIcon style={{marginRight: '0.5rem'}} />
                Make a Wish
            </Button>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        wishText: state.wish.text,
        wishOpen: state.wish.open,
    }
}

const onSubmit = (dispatch) => {
    dispatch({ type: 'wish.open.close' })
    const text = rxGet('wish.text')
    fetch(DOMAIN, '/mail-admin/' + text)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: ev => {
            dispatch({ type: 'wish.open.close' })
        },
        onSendClick: ev => {
            onSubmit(dispatch)
        },
        onTextChange: ev => {
            dispatch({
                type: 'wish.text.change',
                value: ev.target.value
            })
        },
        onTextKeyPress: ev => {
            if (ev.key === 'Enter') {
                onSubmit(dispatch)
            }
        },
        onWishClick: ev => {
            dispatch({ type: 'wish.text.clear' })
            dispatch({ type: 'wish.open.now' })
        },
    }
}

const Wish = connect(
    mapStateToProps, mapDispatchToProps
)(WishPres)

const State = (
state = {
    fetchMessage: ' ',
    fetchStatus: 'quiet',
    show: false,
    text: '',
}, action) => {
    switch(action.type) {
    case 'wish.fetchMessage.set':
        return {
            ...state,
            fetchMessage: action.value
        }
    case 'wish.fetchMessage.clear':
        return {
            ...state,
            fetchMessage: null
        }
    case 'wish.fetchStatus.waiting':
        return {
            ...state,
            fetchStatus: 'waiting'
        }
    case 'wish.fetchStatus.quiet':
        return {
            ...state,
            fetchStatus: 'quiet'
        }
    case 'wish.open.now':
        return {
            ...state,
            open: true
        }
    case 'wish.open.close':
        return {
            ...state,
            open: false
    }
    case 'wish.text.change':
        return {
            ...state,
            text: action.value
        }
    case 'wish.text.clear':
        return {
            ...state,
            text: ''
        }
    default:
        return state
    }
}

export default Wish
export { State }
