// Presentational component of the Main menu of the cell type worksheet page.

import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

const Menu = ({props}) => {
    // Render the menu upon opening.
    const { menuShow, sheetOwnedByUser, onClickAway, onSaveAsClick, onSaveClick,
        onUploadClick } = props
    if (!menuShow) {
        return (null)
    }
    const style = {
        position: 'fixed',
        top: 60,
        left: 48,
        border: 'solid 1px #888',
        backgroundColor: 'white',
        zIndex: 1,
    }
    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <MenuList style={style}>
                <MenuItem
                    disabled={!sheetOwnedByUser}
                    onClick={onSaveClick}
                >
                    Save
                </MenuItem>
                <MenuItem
                    onClick={onSaveAsClick}
                >
                    Save As
                </MenuItem>
                <MenuItem
                    disabled = {true}
                    onClick={onUploadClick}
                >
                    Upload Data
                </MenuItem>
            </MenuList>
        </ClickAwayListener>
    )
}

const CtwMenuPresentation = (props) => {
    const { onMenuClick } = props
    const style = {
        margin: -12,
        marginTop: -30,
        marginBottom: -30,
    }
        return (
            <React.Fragment>
                <IconButton
                    style={style}
                    onClick={onMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu props={props}/>
            </React.Fragment>
        )
}

export default CtwMenuPresentation
