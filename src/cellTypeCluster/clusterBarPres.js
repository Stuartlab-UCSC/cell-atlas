// The presentational component for the clusters and their info
// on the cell type worksheet.

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { Add, GridOn } from '@material-ui/icons'
import { primaryColor } from 'app/themeData'
import 'cellTypeWork/style.css'

const Menu = ({i, props}) => {
    const { typeGroups, menuPosition } = props
    if (menuPosition === null || menuPosition === undefined
        || menuPosition !== i) {
        return (null)
    }
    const { onGeneStatsClick, onNewTypeClick, onMenuClickAway } = props
    const { fontFamily } = props.dims
    const iconStyle = { marginRight: '0.5rem', color: primaryColor }
    
    // Render the 'new cell type' if the cluster belongs to a cell type group
    // with more than one cluster.
    let newType = typeGroups.find(group => {
        return (i >= group[0] && i <= group[1] && group[0] !== group[1])
    })
    if (newType === undefined) {
        newType = null
    } else {
        newType = (
            <MenuItem
                data-position={menuPosition}
                disableGutters={true}
                style={{ fontSize: 14 }}
                onClick={onNewTypeClick}
            >
                <Add style={iconStyle} />
                New Cell Type
            </MenuItem>
        )
    }
    
    return (
        <div
            className='popover_clusters'
            style={{
                position: 'absolute',
                top: 8,
                left: -44,
                width: '9rem',
            }}
        >
            <div style={{height: '8px'}} />
            <ClickAwayListener onClickAway={onMenuClickAway}>
                <MenuList
                    style={{
                        marginTop: 9,
                        padding: 0,
                        border: 'solid 1px #888',
                        backgroundColor: 'white',
                        fontFamily,
                        zIndex: 1,
                    }}
                >
                    <MenuItem
                        data-position={menuPosition}
                        disableGutters={true}
                        style={{ fontSize: 14 }}
                        onClick={onGeneStatsClick}
                    >
                        <GridOn style={iconStyle} />
                        Gene Stats
                    </MenuItem>
                    {newType}
                </MenuList>
            </ClickAwayListener>
        </div>
    )
}

const ColorBarPres= (props) => {
    // Render each cluster.
    const { topStyle, clusters, colormap, sorting, onClick, onMouseMove,
        onMouseOver } = props
    const { colWidth, clusterBarHeight, fontFamily, fontSize } = props.dims
    
    let cursor = (sorting) ? 'grabbing' : 'grab'
    if (onClick) {
        // If we have an onClick handler, this is not sortable.
        cursor = 'pointer'
    }
    const topStyle1 = {
        ...topStyle,
        width: colWidth,
        display: 'inline-block',
        position: 'relative',
    }
    let clusterList = []
    clusters.forEach((cluster, i) => {
        const color = (i % 2 === 0) ? 'black' : 'white'
        clusterList.push(
            <div
                key={i}
                style={topStyle1}
            >
                <div
                    data-position={i}
                    data-cluster={cluster.name}
                    data-domain='cellTypeCluster'
                    style={{
                        background: colormap[i],
                        color: color,
                        fontFamily,
                        fontSize,
                        verticalAlign: 'middle',
                        paddingTop: 3,
                        marginTop: -5,
                        height: clusterBarHeight,
                        textAlign: 'center',
                        cursor: cursor,
                        userSelect: 'none',
                    }}
                    onClick={onClick}
                    onMouseMove={onMouseMove}
                    onMouseOver={onMouseOver}
                >
                    {cluster.name}
                </div>
                <Menu i={i} props={props} />
            </div>
        )
    })
    return clusterList
}

export default ColorBarPres
