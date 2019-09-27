// The presentational component for the cell type colorBar
// on the cell type worksheet.

import React from 'react'
import Menu from 'cellTypeBar/colorBarMenu'

const findBorder = (select, i) => {
    // If the segment is in the range of the selection, set its borders.
    const border = 'solid 1px #888'
    const sBorder = 'solid 2px #000'
    let bTop = null
    let bBottom = null
    let bLeft = (i > 0) ? border : null
    let bRight = null
    if (select) {
        if (select[0] <= select[1]) {
        // The first index is the begin segment.
            if (i >= select[0] && i <= select[1]) {
                // This segment is within the selection.
                bTop = sBorder
                bBottom = sBorder
                if (i === select[0]) {
                    bLeft = sBorder
                }
                if (i === select[1]) {
                    bRight = sBorder
                }
            }
        // The last index is the begin segment.
        } else if (i >= select[1] && i <= select[0]) {
            // This segment is within the selection.
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
    return { bTop, bBottom, bLeft, bRight }
}

const ColorBarPres = (props) => {
    const { domain, typeGroups, colormap, select, sorting, onClick, onMouseDown,
        onMouseMove, onMouseOver } = props
    const { colorBarHeight, colWidth, geneWidth } = props.dims
    let tds = []
    typeGroups.forEach((group, i) => {
        const width = colWidth * (group[1] - group[0] + 1)
        const { bTop, bBottom, bLeft, bRight } = findBorder(select, i)
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
                        background: colormap[group[0]],
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
                    onMouseMove={onMouseMove}
                    onMouseOver={onMouseOver}
                />
            </div>
        )
    })
    return (
        <div style={{
            position: 'relative',
            marginLeft: geneWidth,
        }}>
            <div>
                {tds}
            </div>
            <Menu />
        </div>
    )
}

export default ColorBarPres
