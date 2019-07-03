// The worksheet of the cell type worksheet page.

import React from 'react';
import Typography from '@material-ui/core/Typography'

import Legend from 'components/legend'
import Clusters from 'cellTypeWork/clusters'
import Bubbles from 'cellTypeWork/bubbles'
import Genes from 'cellTypeWork/genes'

const Legends = ({ data, dims }) => {
    if (data.genes.length < 1) {
        return null
    }
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

const WorksheetPresentation = ({ data, dims, fetchMessage, show }) => {
    if (!show) {
        return (null)
    }
    if (fetchMessage) {
        return (
            <Typography style={{marginTop: 40}}>
                {fetchMessage}
            </Typography>
        )
    }
    const { bubblesHeight, bubblesWidth, fontFamily, fontSize, legendWidth,
        geneWidth } = dims
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
        fontFamily,
        fontSize,
        position: 'relative',
        marginTop: -15,
    }
    return (
        <div id='worksheetPres' style={tableStyle}>
            <Clusters />
            <Genes/>
            <div style={bubbleStyle} >
                <Bubbles />
            </div>
            <Legends data={data} dims={dims} />
        </div>
    )
}

export default WorksheetPresentation
