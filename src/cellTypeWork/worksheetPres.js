// The worksheet of the cell type worksheet page.

import React from 'react';
import Typography from '@material-ui/core/Typography'

import { fontFamily } from 'app/themeData'
import Legend from 'components/legend'
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

const Legends = ({ data, dims }) => {
    const { colorRange, legendWidth, sizeRange } = dims
    const { colorBy, sizeBy } = data
    return (
        <div style={{display: 'inline-block', width: legendWidth, marginTop: -20}} >
            <Typography align='center'>
                {colorBy}
            </Typography>
            <Legend
                flavor='colorBubble'
                min={colorRange.min}
                max={colorRange.max}
            />
            <Typography align='center' style={{marginTop: 10}}>
                {sizeBy}
            </Typography>
            <Legend
                flavor='sizeBubble'
                min={sizeRange.min}
                max={sizeRange.max}
            />
        </div>
    )
}

const Presentation = ({ data, dims, show }) => {
    if (!show) {
        return (null)
    }
    const { clusters, genes } = data
    const { bubblesHeight, bubblesWidth, fontSize, geneWidth, legendWidth,
        rowHeight } = dims
    if (bubblesHeight === 0 || bubblesWidth === 0) {
        return (null)
    }
    const bubbleStyle = {
        display: 'inline-block',
        height: bubblesHeight,
        width: bubblesWidth,
        verticalAlign: 'top',
    }
    const tableStyle = {
        width: geneWidth + bubblesWidth + legendWidth,
        fontFamily: fontFamily,
        fontSize: fontSize,
    }
    return (
        <div id='worksheetPres' style={tableStyle}>
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
            <Legends data={data} dims={dims} />
        </div>
    )
}

export default Presentation
