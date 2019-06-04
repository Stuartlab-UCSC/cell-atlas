// The cell type labels on the cell type worksheet page.

import React from 'react';

const CellTypes = ({ clusters, dims }) => {
    const { cellTypeHeight, bubblesWidth, colWidth, fontSize, geneWidth,
        labelFontSize, legendWidth } = dims
    
    let types = []
    clusters.forEach((cluster, i) => {
        const x = geneWidth + colWidth * i
        const y = cellTypeHeight
        types.push(
            <text
                key={i}
                x={x}
                y={y}
                fontSize={fontSize}
                fill={cluster.color}
                transform={'rotate(-45,' + x + ',' + (y-10) + ')'}
            >
                {cluster.cellType}
            </text>
        )
    })

    return (
        <svg
            height={cellTypeHeight}
            width={geneWidth + bubblesWidth + legendWidth}
        >
            <text
                x='0'
                y='28'
                fontSize={labelFontSize}
            >
                Cell Types
            </text>
            {types}
        </svg>
    )
}

export default CellTypes
