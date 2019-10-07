
// The presentational component for the cell type colorBar menu
// on the cell type worksheet.

import React from 'react'
import { ClickAwayListener, MenuItem, MenuList } from '@material-ui/core'
import { Add, GridOn, Info } from '@material-ui/icons'
import { primaryColor } from 'app/themeData'
import 'cellTypeWork/style.css'

const MenuOption = ({enabled, label, Icon, onClick}) => {
    if (!enabled) {
        return null
    }
    // For some reason the click event is not being generated,
    // so we'll use the mouseDown event instead.
    return (
        <MenuItem
            disableGutters={true}
            style={{ fontSize: 14 }}
            onMouseDown={onClick}
        >
            <Icon style={{
                color: primaryColor,
                marginRight: '0.5rem'
            }} />
            {label}
        </MenuItem>
    )
}

const Body = ({props}) => {
    const { geneStats, makeType, selectInfo, onGeneStatsClick, onMakeTypeClick,
        onSelectInfoClick } = props
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
            <MenuOption
                label='Gene Stats'
                enabled={geneStats}
                Icon={GridOn}
                onClick={onGeneStatsClick}
            />
            <MenuOption
                label='Make Cell Type'
                enabled={makeType}
                Icon={Add}
                onClick={onMakeTypeClick}
            />
            <MenuOption
                label='Multi-Cluster Cell Type...'
                enabled={selectInfo}
                Icon={Info}
                onClick={onSelectInfoClick}
            />
        </MenuList>
    )
}

const ClusterBarMenuPres = (props) => {
    let { menu, selectInfo, onClickAway } = props
    const { colWidth } = props.dims
    if (!menu) {
        return null
    }

    // Put the menu in the center of the columns to which it applies.
    const left = -66 + (colWidth * menu.startCol)
        + (colWidth * (menu.endCol - menu.startCol) / 2)
    return (
        <div
            className='popover_clusters'
            style={{
                position: 'absolute',
                top: 16,
                left,
                width: (selectInfo) ? '13rem' : '9.5rem',
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

export default ClusterBarMenuPres
