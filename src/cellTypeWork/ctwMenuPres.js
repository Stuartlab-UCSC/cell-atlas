// Presentational component of the Main menu of the cell type worksheet page.

import React from 'react'
import { Drawer, IconButton, MenuItem, MenuList } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
//import InfoIcon from '@material-ui/icons/Info';

import SheetList from 'cellTypeSheet/sheetList'

const Body = ({props}) => {
    // Render the menu.
    const { sheetOwnedByUser, sheetSelected, /*onRemoveClick,*/ onSaveAsClick,
        onSaveClick/*, onUploadClick, onUploadInfoClick*/ } = props
    return (
        <div style={{width: '20rem'}} >
            <div style={{margin: '1rem'}} >
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
                    disabled={!sheetSelected}
                    onClick={onSaveAsClick}
                >
                    Save As
                </MenuItem>
            </MenuList>
        </div>
    )
}
/*
<MenuItem
    disabled = {true}
    onClick={onUploadClick}
>
    Upload Data
    <IconButton
        onClick={onUploadInfoClick}
    >
        <InfoIcon color='primary' />
    </IconButton>
</MenuItem>
<MenuItem
    disabled={!sheetOwnedByUser || !sheetSelected}
    onClick={onRemoveClick}
>
    Remove Worksheet
</MenuItem>
*/

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
            <div style={{
                position: 'relative',
                top: 50,
            }}>
                <Body props={props} />
                <div style={{
                    position: 'absolute',
                    right: 0,
                }} >
                    <IconButton
                        onClick={onMenuClose}
                    >
                        <KeyboardArrowLeftIcon color='primary' />
                    </IconButton>
                </div>
            </div>
        </Drawer>
    )
}

export default CtwMenuPresentation
