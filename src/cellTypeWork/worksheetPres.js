// The worksheet of the cell type worksheet page.

import React from 'react';
import { fontFamily } from 'app/themeData'
import bubbles from 'cellTypeWork/cellTypeWorksheet.png'
import Clusters from 'cellTypeWork/clusters'
//import Bubble from 'bubble/bubble'
//import BubbleTooltip from 'bubble/tooltip'

const colWidth = 14
const rowHeight = 14
const fontSize = 11
const geneWidth = 100
const cellTypeOverflow = 100

const Genes = ({ genes }) => {
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
        <div style={{ display: 'inline-block' }} >
            {tds}
        </div>
    )
}

const Presentation = ({ clusters, genes, show }) => {
    if (!show) {
        return (null)
    }
    let clusterCount = 0
    if (clusters) {
        clusterCount = clusters.length
    }
    let bubblesWidth = clusterCount * colWidth
    let geneCount = 0
    if (genes) {
        geneCount = genes.length
    }
    const bubbleStyle = {
        display: 'inline-block',
        height: geneCount * rowHeight,
        width: bubblesWidth,
    }
    const tableStyle = {
        width: geneWidth + bubblesWidth + cellTypeOverflow,
        fontFamily: fontFamily,
        fontSize: fontSize,
    }
    return (
        <div style={tableStyle}>
            <Clusters
                clusters={clusters}
                geneWidth={geneWidth}
                colWidth={colWidth}
            />
            <Genes genes={genes} />
            <img src={bubbles} alt='bubbles' height={410} width={531} style={bubbleStyle}/>
        </div>
    )
}

export default Presentation
