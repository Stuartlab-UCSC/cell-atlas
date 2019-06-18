// The presentational component for the svg cell types
// on the cell type worksheet page.

import React from 'react'
import { DOMAIN } from 'cellTypeWork/cellTypes'

const Highlight =  ({ i, props }) => {
    // The text highlighting.
    const { mode, showHighlight, onClick, onMouseLeave, onMouseOver } = props
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
                style={{
                    userSelect: 'none',
                    cursor: (mode === 'select') ? 'pointer' : 'grab',
                    zIndex: -10000,
                }}
                onClick={mode === 'select' ? onClick : null}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            />
        )
    } else {
        // Make the highlight invisible.
        // We have this duplicate because for some reason changing the fill
        // doesn't work.
        return (
            <rect
                data-position={i}
                data-domain={DOMAIN}
                x={x}
                y={y+2-fontSize}
                width={cellTypeLength}
                height={fontSize-2}
                fill='transparent'
                style={{
                    userSelect: 'none',
                    cursor: (mode === 'select') ? 'pointer' : 'grab',
                    zIndex: 2,
                }}
                onClick={mode === 'select' ? onClick : null}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
            />
        )
    }
}

const CellType = ({ i, color, value, props }) => {
    // A cell type text area.
    const { mode, onClick, onMouseDown, onMouseLeave, onMouseOver } = props
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
                style={{
                    userSelect: 'none',
                    cursor: (mode === 'select') ? 'pointer' : 'grab',
                    zIndex: 3,
                }}
                onClick={mode === 'select' ? onClick : null}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
                onMouseDown={mode === 'select' ? null : onMouseDown}
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

