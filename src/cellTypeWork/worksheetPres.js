// The worksheet of the cell type worksheet page.

import React from 'react';
import Typography from '@material-ui/core/Typography'

import Legend from 'components/legend'
import Clusters from 'cellTypeWork/clusters'
import Bubbles from 'cellTypeWork/bubbles'
import Genes from 'cellTypeWork/genes'
import { ColorSelect, SizeSelect } from 'cellTypeGene/variableSelect'

const Legends = ({ data, dims }) => {
    if (data.genes.length < 1) {
        return null
    }
    const { colorRange, NaNcolor, legendWidth, sizeRange } = dims
    return (
        <div style={{
            display: 'inline-block',
            width: legendWidth - 10,
            marginTop: -20,
            marginLeft: 10,
        }} >
            <ColorSelect />
            <Legend
                flavor='colorBubble'
                min={colorRange.min}
                max={colorRange.max}
                NaNcolor={NaNcolor}
            />
            <SizeSelect />
            <Legend
                flavor='sizeBubble'
                min={sizeRange.min}
                max={sizeRange.max}
            />
        </div>
    )
}

const WorksheetPresentation = ({ data, dims, fetchMessage }) => {
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
    const chartStyle = {
        width: geneWidth + bubblesWidth + legendWidth,
        fontFamily,
        fontSize,
        position: 'relative',
        marginTop: -30,
    }
    return (
        <div id='worksheetPres' style={chartStyle}>
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
