// The worksheet of the cell type worksheet page.

import React from 'react'

const Presentation = (props) => {
    const { genes, dims, onMouseDown, onMouseLeave, onMouseOver } = props
    if (!genes) {
        return (null)
    }
    const { geneWidth, rowHeight } = dims
    const geneStyle = {
        width: geneWidth,
        textAlign: 'right',
        height: rowHeight,
        paddingRight: 10,
        cursor: 'grab',
        userSelect: 'none',
    }

    let tds = []
    genes.forEach((label, i) => {
        tds.push(
            <div
                data-position={i}
                data-domain='cellTypeWorkGenes'
                key={i}
                style={geneStyle}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
            >
                {label}
            </div>
        )
    })
    return (
        <div style={{
            display: 'inline-block',
            verticalAlign: 'top',
            marginTop: '3px'
        }} >
            {tds}
        </div>
    )
}

export default Presentation
