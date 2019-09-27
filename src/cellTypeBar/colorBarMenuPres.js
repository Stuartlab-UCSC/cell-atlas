// The presentational component for the cell type colorBar menu
// on the cell type worksheet.

import React from 'react'
import { ClickAwayListener, MenuItem, MenuList } from '@material-ui/core'
import { CallMerge, CallSplit } from '@material-ui/icons'
import 'cellTypeWork/style.css'

const Body = ({props}) => {
    const { group, ungroup, onGroupClick, onUngroupClick } = props
    const { fontFamily } = props.dims
    const iconStyle = { marginRight: '0.5rem' }
    return (
        <MenuList
            style={{
                padding: 0,
                border: 'solid 1px #888',
                backgroundColor: 'white',
                fontFamily,
                zIndex: 1,
            }}
        >
            <MenuItem
                disabled={!group}
                disableGutters={true}
                style={{ fontSize: 14 }}
                onClick={onGroupClick}
            >
                <CallMerge style={iconStyle} />
                Merge
            </MenuItem>
            <MenuItem
                disabled={!ungroup}
                disableGutters={true}
                style={{ fontSize: 14 }}
                onClick={onUngroupClick}
            >
                <CallSplit style={iconStyle} />
                Unmerge
            </MenuItem>
        </MenuList>
    )
}

const Presentation = (props) => {
    const { menu, onClickAway } = props
    const { colWidth } = props.dims
    if (menu === false) {
        return (null)
    }
    // Put the menu in the center of the columns to which it applies.
    const left = -36 + (colWidth * menu.startCol)
        + (colWidth * (menu.endCol - menu.startCol) / 2)
    return (
        <div
            className='popover_type_group'
            style={{
                position: 'absolute',
                top: 16, //8
                left,
                width: '7rem',
            }}
        >
            <ClickAwayListener onClickAway={onClickAway} >
                <div>
                    <div style={{height: '9px'}} />
                    <Body props={props} />
                </div>
            </ClickAwayListener>
        </div>
    )
}

export default Presentation
