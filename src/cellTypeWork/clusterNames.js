// The presentational component for the clusters and their info
// on the cell type worksheet.

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import 'cellTypeWork/style.css'

function ClusterNames({ labelStyle, topStyle, props }) {
    const { clusters, colormap, menuPosition, sorting,
        onGeneStatsClick, onMenuClickAway, onMouseDown, onMouseLeave,
        onMouseOver } = props
    
    // Make references for each cluster to anchor its context menu.
    let anchorRef =
        Array.from({length: clusters.length}, v => React.useRef(null))
        
    const ContextMenu = () => {
        if (menuPosition === null) {
            return (null)
        }
        return (
            <Popper
                open={true}
                anchorEl={anchorRef[menuPosition].current}
                placement='top'
                className='popover_clusters'
                style={{ width: '105px' }}
            >
                <ClickAwayListener onClickAway={onMenuClickAway}>
                    <MenuList
                        style={{
                            backgroundColor: 'white',
                            marginBottom: 8,
                            padding: 0,
                            border: 'solid 1px #888',
                            borderRadius: 5,
                        }}
                    >
                        <MenuItem
                            data-position={menuPosition}
                            style={{
                                padding: '3 0',
                                fontSize: 12,
                            }}
                            onClick={onGeneStatsClick}
                        >
                            GENE STATS
                        </MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Popper>
        )
    }

    // Render each cluster.
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
                    cursor: (sorting) ? 'grabbing' : 'grab',
                    userSelect: 'none',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    height: 18,
                    paddingTop: 3,
                    marginTop: -5,
                }}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
            >
                {cluster.name}
            </div>
        )
    })
    return (
        // Render the cluster bar.
        <div>
            <ContextMenu />
            <div
                style={{
                    ...labelStyle,
                    height: 15,
                    marginTop: 5,
                }}
            >
                Cluster #
            </div>
            {tds}
        </div>
    )
}
export default ClusterNames
