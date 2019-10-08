// The presentational component for the clusters and their info
// on the cell type worksheet.

import React from 'react'
import Menu from 'cellTypeCluster/clusterBarMenu'
import { findBorder } from 'helpers/select'
import 'cellTypeWork/style.css'

const ClusterBarPres= (props) => {
    // Render each cluster.
    const { clusters, colormap, select, sorting, topStyle, onClick,
        onMouseDown, onMouseMove, onMouseOver } = props
    const { colWidth, clusterBarHeight, fontFamily, fontSize } = props.dims
    
    let cursor = 'pointer'
    // If there is a mouseMove handler then show the move cursor.
    if (onMouseMove) {
        cursor = (sorting) ? 'grabbing' : 'grab'
    }
    const topStyle1 = {
        ...topStyle,
        width: colWidth,
        display: 'inline-block',
        position: 'relative',
        zIndex: 0,
    }

    let clusterList = []
    clusters.forEach((cluster, i) => {
        const color = (i % 2 === 0) ? 'black' : 'white'
        const { bTop, bBottom, bLeft, bRight } = findBorder(select, i)
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
                         borderBottom: bBottom,
                         borderLeft: bLeft,
                         borderRight: bRight,
                         borderTop: bTop,
                         boxSizing: 'border-box',
                         marginTop: -5,
                         color,
                         cursor,
                         fontFamily,
                         fontSize,
                         height: clusterBarHeight,
                         lineHeight: clusterBarHeight + 'px',
                         textAlign: 'center',
                         userSelect: 'none',
                    }}
                    onClick={onClick}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseOver={onMouseOver}
                >
                    {cluster.name}
                </div>
            </div>
        )
    })
    return (
        <div style={{
            position: 'relative',
            display: 'inline-block',
        }}>
            <div>
                {clusterList}
            </div>
            {onMouseOver ? ( <Menu /> ) : null}
        </div>
    )
}

export default ClusterBarPres
