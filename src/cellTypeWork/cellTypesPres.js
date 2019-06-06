// The cell type labels on the cell type worksheet page.

import React from 'react'

const CellTypes = ({ clusters, cellTypes, dims, onMouseOver, onMouseLeave, onMouseDown }) => {
    const { cellTypeHeight, bubblesWidth, colWidth, fontSize, geneWidth,
        labelFontSize, legendWidth } = dims
    
    let types = []
    cellTypes.forEach((cellType, i) => {
        const x = geneWidth + colWidth * i
        const y = cellTypeHeight
        
        types.push(                
            <text
                data-position={i}
                data-domain='cellTypes'
                key={i}
                x={x}
                y={y}
                fontSize={fontSize}
                fill={clusters[i].color}
                transform={'rotate(-45,' + x + ',' + (y-10) + ')'}
                style={{userSelect: 'none', cursor: 'grab'}}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
                onMouseDown={onMouseDown}
            >
                {cellType}
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
