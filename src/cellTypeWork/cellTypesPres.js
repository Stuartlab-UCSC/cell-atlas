// The presentational component for the svg cell types
// on the cell type worksheet page.

import React from 'react'
import { DOMAIN } from 'cellTypeWork/cellTypes'

const Highlight =  ({ i, props }) => {
    // The text highlighting.
    const { showHighlight, onMouseLeave, onMouseOver } = props
    const { cellTypesHeight, cellTypeLength, colWidth, fontSize, geneWidth }
        = props.dims
    const x = geneWidth + colWidth * i
    const y = cellTypesHeight
    if (i === showHighlight) {
        // Show the highlight.
        return (
            <rect
                data-position={i}
                data-domain={DOMAIN}
                x={x}
                y={y+2-fontSize}
                width={cellTypeLength}
                height={fontSize-2}
                fill='#eeeeee'
                style={{userSelect: 'none', cursor: 'grab', zIndex: -10000}}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            />
        )
    } else {
        // Make the highlight invisible.
        return (
            <rect
                data-position={i}
                data-domain={DOMAIN}
                x={x}
                y={y-fontSize}
                width={cellTypeLength}
                height={fontSize-2}
                fill='transparent'
                style={{userSelect: 'none', cursor: 'grab', zIndex: 2}}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            />
        )
    }
}

const CellType = ({ i, color, value, props }) => {
    // A cell type text area.
    const { onMouseDown, onMouseLeave, onMouseOver } = props
    const { cellTypesHeight, colWidth, fontSize, geneWidth } = props.dims
    const x = geneWidth + colWidth * i
    const y = cellTypesHeight
    return (
        <g
            transform={'rotate(-45,' + x + ',' + (y-10) + ')'}
        >
            <Highlight i={i} props={props} />
            <text
                data-position={i}
                data-domain={DOMAIN}
                x={x}
                y={y}
                fontSize={fontSize}
                fill={color}
                style={{userSelect: 'none', cursor: 'grab', zIndex: 3}}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
                onMouseDown={onMouseDown}
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

