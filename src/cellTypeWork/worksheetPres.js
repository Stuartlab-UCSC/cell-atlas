// The worksheet of the cell type worksheet page.

import React from 'react';
import { fontFamily } from 'app/themeData'
import Clusters from 'cellTypeWork/clusters'
import Bubbles from 'cellTypeWork/bubbles'

const Genes = ({ genes, geneWidth, rowHeight }) => {
    if (!genes) {
        return (null)
    }
    const geneStyle = {
        width: geneWidth,
        textAlign: 'right',
        height: rowHeight,
        paddingRight: 15,
        cursor: 'grab',
    }

    let tds = []
    genes.forEach((label, i) => {
        tds.push(
            <div
                key={i}
                draggable
                style={geneStyle}
            >
                {label}
            </div>
        )
    })
    return (
        <div style={{ display: 'inline-block', verticalAlign: 'top' }} >
            {tds}
        </div>
    )
}

const Presentation = ({ clusters, dims, genes, show }) => {
    if (!show) {
        return (null)
    }
    const { bubblesHeight, bubblesWidth, fontSize, geneWidth, rowHeight } = dims
    if (bubblesHeight === 0 || bubblesWidth === 0) {
        return (null)
    }
    const bubbleStyle = {
        display: 'inline-block',
        height: bubblesHeight,
        width: bubblesWidth,
    }
    const tableStyle = {
        width: geneWidth + bubblesWidth,
        fontFamily: fontFamily,
        fontSize: fontSize,
    }
    return (
        <div style={tableStyle}>
            <Clusters
                clusters={clusters}
                dims={dims}
            />
            <Genes
                genes={genes}
                geneWidth={geneWidth}
                rowHeight={rowHeight}
            />
            <div style={bubbleStyle} >
                <Bubbles />
            </div>
        </div>
    )
}

export default Presentation
