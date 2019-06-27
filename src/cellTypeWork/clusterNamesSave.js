// The presentational component for the clusters and their info
// on the cell type worksheet.

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import 'cellTypeWork/style.css'

const Menu = ({i, props}) => {
    const { menuPosition, onGeneStatsClick, onMenuClickAway } = props
    if (menuPosition === null || menuPosition !== i) {
        return (null)
    }
    return (
        <div
            className='popover_clusters'
            style={{
                position: 'absolute',
                top: 14,
                left: -45,
                width: '105px',
            }}
        >
            <ClickAwayListener onClickAway={onMenuClickAway}>
                <MenuList
                    style={{
                        marginTop: 8,
                        padding: 0,
                        border: 'solid 1px #888',
                        backgroundColor: 'white',
                        zIndex: 1,
                    }}
                >
                    <MenuItem
                        data-position={menuPosition}
                        style={{ fontSize: 14 }}
                        onClick={onGeneStatsClick}
                    >
                        Gene Stats
                    </MenuItem>
                </MenuList>
            </ClickAwayListener>
        </div>
    )
}

const ClusterNames = ({ topStyle, props }) => {
    // Render each cluster.
    const { clusters, colormap, sorting, onMouseDown, onMouseLeave, onMouseOver
        } = props
    
    let clusterList = []
    clusters.forEach((cluster, i) => {
        const color = (i % 2 === 0) ? 'black' : 'white'
        clusterList.push(
            <div
                key={i}
                style={{
                    ...topStyle,
                    position: 'relative',
                }}
            >
                <div
                    data-position={i}
                    data-domain='cellTypeWorkClusters'
                    style={{
                        background: colormap[i],
                        color: color,
                        verticalAlign: 'middle',
                        paddingTop: 3,
                        marginTop: -5,
                        height: 18,
                        textAlign: 'center',
                        cursor: (sorting) ? 'grabbing' : 'grab',
                        userSelect: 'none',
                    }}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
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

export default ClusterNames
