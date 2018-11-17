
// Navigation bar presentation.

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ToggleButton from '@material-ui/lab/ToggleButton';

class NavBarList extends React.Component {

    constructor (props) {
        super(props)
        this.color = 'rgba(127,127,127,1)'
    }

     onListHeadClick = ev => {

        // Handle a click on a menu option that has a list of options.
        // Open the menu.
        const id = ev.target.closest('.listHead').dataset.id
        let openState = this.props.open
        openState[id] = true
        this.setState({ open: openState })
    }

    List = () => {
        const id = this.props.id
        const list = this.props.list
        const open = this.props.open[id] // list of options for a menu item
        const menuGrow = id + 'MenuGrow'
        const comp =
            <Popper
                open={open}
                anchorEl={this.anchorEl}
                transition
                disablePortal
                placement='bottom-start'
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id={menuGrow}
                        className={'listBody'}
                        data-id={id}
                        style={{ transformOrigin: 'top' }}
                    >
                        <Paper style={{ backgroundColor: this.color }}>
                            <ClickAwayListener
                                onClickAway={this.props.onAnyClick}
                            >
                                {list}
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        return comp
    }

    ListHead = () => {
        const id = this.props.id
        const label = this.props.label
        const open = this.props.open[id] // list of options for a menu item
        const menuGrow = id + 'MenuGrow'
        const comp =
            <ToggleButton
                className='listHead'
                data-id={id}
                buttonRef={node => {
                    this.anchorEl = node;
                }}
                aria-owns={open ? menuGrow : null}
                aria-haspopup="true"
                style={{
                    textTransform: 'none',
                    color: this.color,
                    height: '40px',
                    fontWeight: 400,
                }}
                value=''
                onClick={this.onListHeadClick}
            >
                {label}
            </ToggleButton>
        return comp
    }
    render() {
        return (
            <React.Fragment>
                <this.ListHead />
                <this.List />
             </React.Fragment>
        )
    }
}

export default NavBarList
