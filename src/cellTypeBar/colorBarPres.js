// The presentational component for the cell type colorBar
// on the cell type worksheet.

import React from 'react'

const findBorder = (select, i) => {
    // If the segment is in the range of the selection, set its borders.
    const sBorder = 'solid 1px #444'
    let bTop = null
    let bBottom = null
    let bLeft = null
    let bRight = null
    if (select) {
        if (select[0] <= select[1]) {
            if (i >= select[0] && i <= select[1]) {
                bTop = sBorder
                bBottom = sBorder
                if (i === select[0]) {
                    bLeft = sBorder
                }
                if (i === select[1]) {
                    bRight = sBorder
                }
            }
        } else {
            if (i >= select[1] && i <= select[0]) {
                bTop = sBorder
                bBottom = sBorder
                if (i === select[1]) {
                    bLeft = sBorder
                }
                if (i === select[0]) {
                    bRight = sBorder
                }
            }
        }
    }
    return { bTop, bBottom, bLeft, bRight }
}

const ColorBarPres = (props) => {
    const { domain, typeGroups, colormap, select, sorting, onClick, onMouseDown,
        onMouseLeave, onMouseOver, /*cellTypes*/ } = props
    const { colorBarHeight, colWidth, geneWidth } = props.dims
    let tds = []
    typeGroups.forEach((group, i) => {
        const width = colWidth * (group[1] - group[0] + 1)
        const { bTop, bBottom, bLeft, bRight } = findBorder(select, i)
        // Find the middle color of the group.
        const colorIndex = Math.round(((group[1] - group[0]) / 2) + group[0])
        tds.push(
            <div
                key={i}
                style={{
                    position: 'relative',
                    width,
                    display: 'inline-block',
                }}
            >
                <div
                    data-position={i}
                    data-domain={domain}
                    style={{
                        background: colormap[colorIndex],
                        height: colorBarHeight,
                        cursor: (sorting) ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        borderTop: bTop,
                        borderBottom: bBottom,
                        borderLeft: bLeft,
                        borderRight: bRight,
                    }}
                    onClick={onClick}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseOver={onMouseOver}
                />
            </div>
        )
    })
    return (
        <div style={{ paddingLeft: geneWidth }} >
            {tds}
        </div>
    )
}

export default ColorBarPres

