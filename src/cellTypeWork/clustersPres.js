// The presentational component for the clusters and their info
// on the cell type worksheet.

import React from 'react';
import CellTypes from 'cellTypeBar/cellTypes'
import CellTypesEdit from 'cellTypeBar/cellTypesEdit'
import ClusterNames from 'cellTypeWork/clusterNames'
import ColorBar from 'cellTypeBar/colorBar'

const CellCounts = ({ clusters, topStyle, labelFontSize, labelStyle }) => {
    let tds = []
    clusters.forEach((cluster, i) => {
        tds.push(
            <div key={i} style={{
                ...topStyle,
                transform: 'translate(-2px, 5px) rotate(-90deg)'
            }}>
                {cluster.cellCount}
            </div>
        )
    })
    return (
        <div>
            <div
                style={{
                    ...labelStyle,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginLeft: 2,
                }}
            >
                # of Cells
            </div>
            {tds}
        </div>
    )
}

const Presentation = (props) => {
    const { clusters, colormap, dims, menuPosition, sorting, onMenuClickAway,
        onGeneStatsClick, onMouseDown, onMouseLeave, onMouseOver} = props
    const { colWidth, geneWidth, labelFontSize } = props.dims
    if (!clusters) {
        return (null)
    }
    const topStyle = {
        width: colWidth,
        display: 'inline-block',
    }
    const labelStyle = {
        width: geneWidth,
        textAlign: 'right',
        paddingRight: 20,
        display: 'inline-block',
        fontSize: labelFontSize,
    }
   return (
        <React.Fragment>
            <CellTypes />
            <CellTypesEdit />
            <ColorBar />
            <div style={{
                ...labelStyle,
                height: 15,
                marginTop: 5,
            }} >
                Cluster #
            </div>
            <ClusterNames
                clusters={clusters}
                colormap={colormap}
                dims={dims}
                menuPosition={menuPosition}
                sorting={sorting}
                topStyle={topStyle}
                onGeneStatsClick={onGeneStatsClick}
                onMenuClickAway={onMenuClickAway}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
             />
            <CellCounts
                clusters={clusters}
                topStyle={topStyle}
                labelFontSize={labelFontSize}
                labelStyle={labelStyle}
            />
        </React.Fragment>
    )
}

export default Presentation
