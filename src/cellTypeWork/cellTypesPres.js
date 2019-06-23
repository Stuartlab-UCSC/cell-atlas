// The presentational component for the svg cell types
// on the cell type worksheet page.

import React from 'react'
import { DOMAIN } from 'cellTypeWork/cellTypes'

const CellType = ({ i, color, value, props }) => {
    // A cell type text area.
    const { onMouseOver } = props
    const { cellTypesHeight, colWidth, fontSize, geneWidth } = props.dims
    const x = geneWidth + colWidth * i
    const y = cellTypesHeight
    return (
        <g
            transform={'rotate(-45,' + x + ',' + (y-10) + ')'}
        >
            <text
                data-position={i}
                data-domain={DOMAIN}
                x={x}
                y={y}
                fontSize={fontSize}
                fill={color}
                style={{
                    userSelect: 'none',
                    cursor: 'grab',
                    zIndex: 3,
                }}
                onMouseOver={onMouseOver}
            >
                {value}
            </text>
        </g>
    )
}

const CellTypes = (props) => {
    const { colormap, cellTypes } = props
    const { bubblesWidth, cellTypesHeight, geneWidth, labelFontSize,
        legendWidth } = props.dims

    let types = []
    cellTypes.forEach((cellType, i) => {
        types.push(
            <CellType
                key={i}
                i={i}
                color={colormap[i]}
                value={cellType}
                props={props}
            />
        )
    })

    return (
        <svg
            height={cellTypesHeight}
            width={geneWidth + bubblesWidth + legendWidth}
        >
            <text
                x='0'
                y='70'
                fontSize={labelFontSize}
            >
                Cell Types
            </text>
            {types}
        </svg>
    )
}

export default CellTypes

