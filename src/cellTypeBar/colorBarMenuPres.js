// The presentational component for the cell type colorBar menu
// on the cell type worksheet.

import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import 'cellTypeWork/style.css'

const Body = ({props}) => {
    const { group, ungroup, onGroupClick, onUngroupClick } = props
    const { fontFamily } = props.dims
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
                style={{ fontSize: 14 }}
                onClick={onGroupClick}
            >
                Group
            </MenuItem>
            <MenuItem
                disabled={!ungroup}
                style={{ fontSize: 14 }}
                onClick={onUngroupClick}
            >
                Ungroup
            </MenuItem>
        </MenuList>
    )
}

const Presentation = (props) => {
    const { menu } = props
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
                width: '6rem',
            }}
        >
            <div>
                <div style={{height: '8px'}} />
                <Body props={props} />
            </div>
        </div>
    )
}

export default Presentation
