// The presentational component for the clusters and their info
// on the cell type worksheet.

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import 'cellTypeWork/style.css'

function ClusterNames({ labelStyle, topStyle, props }) {
    const ContextMenu = () => {
        const { menuPosition, onGeneStatsClick, onMenuClickAway } = props
        if (menuPosition === null) {
            return (null)
        }
        return (
            <Popper
                open={true}
                anchorEl={anchorRef[menuPosition].current}
                placement='bottom'
                className='popover_clusters'
                style={{ width: '105px' }}
            >
                <ClickAwayListener onClickAway={onMenuClickAway}>
                    <MenuList
                        style={{
                            backgroundColor: 'white',
                            marginTop: 8,
                            padding: 0,
                            border: 'solid 1px #888',
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
            </Popper>
        )
    }

    // Render each cluster.
    const { clusters, colormap, sorting, onMouseDown, onMouseLeave, onMouseOver
        } = props
    
    // Make references for each cluster to anchor its context menu.
    let anchorRef =
        Array.from({length: clusters.length}, v => React.useRef(null))
    
    let tds = []
    clusters.forEach((cluster, i) => {
        const color = (i % 2 === 0) ? 'black' : 'white'
        tds.push(
            <div
                data-position={i}
                data-domain='cellTypeWorkClusters'
                key={i}
                ref={anchorRef[i]}
                style={{
                    ...topStyle,
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
        )
    })
    // Render the cluster bar.
    return (
        <div>
            <ContextMenu />
            <div style={{
                ...labelStyle,
                height: 15,
                marginTop: 5,
            }} >
                Cluster #
            </div>
            {tds}
        </div>
    )
}
export default ClusterNames
