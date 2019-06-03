// The cell type labels on the cell type worksheet page.

import React from 'react';

const CellTypes = ({ clusters, dims }) => {
    const { colWidth, geneWidth, labelFontSize } = dims
    
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
    
    let types = []
    clusters.forEach((cluster, i) => {
        types.push(
            <div
                key={i}
                draggable
                style={{
                    ...topStyle,
                    color: cluster.color,
                    height: 40,
                    whiteSpace: 'nowrap',
                    cursor: 'grab',
                    transform: 'translate(16px ,23px) rotate(-45deg)',
                }}
            >
                {cluster.cellType}
            </div>
        )
    })
    return (
        <div>
            <div style={labelStyle}>
                Cell-type
            </div>
            {types}
        </div>
    )
}

export default CellTypes
