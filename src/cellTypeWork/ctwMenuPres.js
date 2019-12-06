// Presentational component of the Main menu of the cell type worksheet page.

import React from 'react'
import { Drawer, IconButton, MenuItem, MenuList, Typography }
    from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import SheetList from 'cellTypeSheet/sheetList'

const Body = ({props}) => {
    // Render the menu.
    const { sheetOwnedByUser, sheetSelected, uploadInProgress, username,
        onRemoveClick, onSaveAsClick, onSaveClick, onUploadClick } = props
    return (
        <div style={{width: '20rem'}} >
            <div style={{margin: '1rem', marginTop: -30}} >
                <Typography style={{fontSize: '1.1rem'}}>
                    Open
                </Typography>
                <SheetList />
            </div>
            <MenuList style={{ padding: 0, }}>
                <MenuItem
                    disabled={!sheetOwnedByUser || !sheetSelected}
                    onClick={onSaveClick}
                >
                    Save
                </MenuItem>
                <MenuItem
                    disabled={username === null || !sheetSelected}
                    onClick={onSaveAsClick}
                >
                    Save As
                </MenuItem>
                <MenuItem
                    disabled = {username === null || uploadInProgress || !sheetSelected}
                    onClick={onUploadClick}
                >
                    {(uploadInProgress) ? 'Upload In Progress' : 'Upload Data'}
                </MenuItem>
                <MenuItem
                    disabled={!sheetOwnedByUser || !sheetSelected}
                    onClick={onRemoveClick}
                >
                    Remove Worksheet
                </MenuItem>
            </MenuList>
        </div>
    )
}
//                    style={{display: 'None'}}

const CtwMenuPresentation = (props) => {
    // Render the modal upon opening.
    const { background, menuShow, onBackdropClick, onMenuClose } = props
    if (!menuShow) {
        return (null)
    }
    return (
        <Drawer
            open={menuShow}
            ModalProps={{
                BackdropProps: { style: { background: 'rgb(127,127,127,0.5)' }},
                onBackdropClick,
            }}
            PaperProps={{ style: { background: background }}}
        >
            <div>
                <div style={{
                    width: '100%',
                    textAlign: 'right',
                }} >
                    <IconButton
                        onClick={onMenuClose}
                    >
                        <KeyboardArrowLeftIcon color='primary' />
                    </IconButton>
                </div>
                <Body props={props} />
            </div>
        </Drawer>
    )
}

export default CtwMenuPresentation
