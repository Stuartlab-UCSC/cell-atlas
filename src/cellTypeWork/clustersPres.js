// The presentational component for the clusters and their info
// on the cell type worksheet.

import React from 'react';
import CellTypes from 'cellTypeWork/cellTypes'
import CellTypesEdit from 'cellTypeWork/cellTypesEdit'
import ColorBar from 'cellTypeWork/colorBar'
const labelFontSize = 16

const ClusterNames = (props) => {
    const { clusters, colormap, topStyle, labelStyle, onMouseDown, onMouseLeave,
        onMouseOver } = props
    let tds = []
    clusters.forEach((cluster, i) => {
        const color = (i % 2 === 0) ? 'black' : 'white'
        tds.push(
            <div
                data-position={i}
                data-domain='cellTypeWorkClusters'
                key={i}
                style={{
                    ...topStyle,
                    background: colormap[i],
                    color: color,
                    cursor: 'grab',
                    userSelect: 'none',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    height: '18px',
                    paddingTop: '3px',
                    marginTop: '-5px',
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
        <div>
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

const CellCounts = ({ clusters, topStyle, labelStyle }) => {
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
    const { clusters, colormap, dims, onMouseDown, onMouseLeave, onMouseOver }
        = props
    const { colWidth, geneWidth } = dims
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
            <ClusterNames
                clusters={clusters}
                colormap={colormap}
                topStyle={topStyle}
                labelStyle={labelStyle}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
            />
            <CellCounts
                clusters={clusters}
                topStyle={topStyle}
                labelStyle={labelStyle}
            />
        </React.Fragment>
    )
}

export default Presentation
