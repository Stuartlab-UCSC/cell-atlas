// Presentational component of the Main menu of the cell type worksheet page.

import React from 'react'
import { Drawer, IconButton, MenuItem, MenuList } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const Menu = ({props}) => {
    // Render the menu.
    const { sheetOwnedByUser, onSaveAsClick, onSaveClick, onUploadClick }
        = props
    return (
        <MenuList style={{ padding: 0, }}>
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
    )
}

const Modal = ({props}) => {
    // Render the modal upon opening.
    const { background, menuShow, onMenuClose } = props
    if (!menuShow) {
        return (null)
    }
    return (
        <Drawer
            open={menuShow}
            ModalProps={{ hideBackdrop: true }}
            PaperProps={{ style: {background} }}
        >
            <div style={{
                position: 'relative',
                top: 50,
            }}>
                <Menu props={props} />
                <div style={{
                    position: 'absolute',
                    right: 0,
                }} >
                    <IconButton
                        onClick={onMenuClose}
                    >
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                </div>
            </div>
        </Drawer>
    )
}

const CtwMenuPresentation = (props) => {
    return (
        <React.Fragment>
            <Modal props={props}/>
        </React.Fragment>
    )
}

export default CtwMenuPresentation
