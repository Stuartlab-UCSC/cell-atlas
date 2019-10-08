// The presentational component for the cell type colorBar menu
// on the cell type worksheet.

import React from 'react'
import { ClickAwayListener, MenuItem, MenuList } from '@material-ui/core'
import { ScatterPlot } from '@material-ui/icons'
import { primaryColor } from 'app/themeData'
import 'cellTypeWork/style.css'

const Body = ({props}) => {
    const { onMapClick } = props
    const { fontFamily } = props.dims
    const iconStyle = { color: primaryColor, marginRight: '0.5rem' }
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
                disabled={true}
                disableGutters={true}
                style={{ fontSize: 14 }}
                onClick={onMapClick}
            >
                <ScatterPlot style={iconStyle} />
                Map
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
    const left = -30 + (colWidth * menu.startCol)
        + (colWidth * (menu.endCol - menu.startCol) / 2)
    return (
        <div
            className='popover_type_group'
            style={{
                position: 'absolute',
                top: -53,
                left,
                width: '5rem',
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
