// The presentational component for the cell type colorBar
// on the cell type worksheet.

import React from 'react'
import Menu from 'cellTypeBar/colorBarMenu'

const ColorBarPres = (props) => {
    const { domain, typeGroups, colormap, sorting, onClick, onMouseDown,
        onMouseMove, onMouseOver } = props
    const { colorBarHeight, colWidth, geneWidth } = props.dims
    let tds = []
    typeGroups.forEach((group, i) => {
        const width = colWidth * (group[1] - group[0] + 1)
        let borderLeft = (i > 0) ? 'solid 1px #888' : null
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
                        borderLeft,
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
                <Menu />
            </div>
        </div>
    )
}

export default ColorBarPres
