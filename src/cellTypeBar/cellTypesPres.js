// The presentational component for the svg cell types
// on the cell type worksheet page.

import React from 'react'
import ColorBar from 'cellTypeBar/colorBar'
import CellTypesEdit from 'cellTypeBar/cellTypesEdit'
import { DOMAIN } from 'cellTypeBar/cellTypes'

const CellType = ({ i, color, value, props }) => {
    // A cell type text area.
    const { cellTypesHeight, colWidth, fontSize, geneWidth } = props.dims
    const x = geneWidth + colWidth * i
    const y = cellTypesHeight
    return (
        <g
            transform={'rotate(-45,' + (x+3) + ',' + (y-12) + ')'}
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
                value={cellType.show ? cellType.label : null }
                props={props}
            />
        )
    })

    return (
        <React.Fragment>
            <svg
                height={cellTypesHeight}
                width={geneWidth + bubblesWidth + legendWidth}
            >
                <text
                    x='24'
                    y='120'
                    fontSize={labelFontSize}
                >
                    Cell Types
                </text>
                {types}
            </svg>
            <CellTypesEdit />
            <ColorBar />
        </React.Fragment>
    )
}

export default CellTypes

