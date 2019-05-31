
// The bubble matrix presentational component for the cell type worksheet page.

import React from 'react';
import Bubble from 'bubble/bubble'
import { findBubbleData } from 'cellTypeWork/transformToChart'

const ManyBubbles = ({ data, dims }) => {
    const { bubbles, colorBy, clusters, genes, sizeBy } = data
    const { colWidth, rowHeight } = dims
    let bubbleList = []
    genes.forEach((gene,i) => {
        clusters.forEach((cluster,j) => {
            const bubble = findBubbleData(bubbles, cluster.name, gene)
            bubbleList.push(
                <Bubble
                    key={'[' + i.toString() + ',' + j.toString()+ ']'}
                    color={bubble.color}
                    colorBy={colorBy}
                    colorRgb={bubble.colorRgb}
                    offsetX={colWidth * j}
                    offsetY={rowHeight * i}
                    radius={bubble.radius}
                    size={bubble.size}
                    sizeBy={sizeBy}
                    justCircleElement={true}
                />
            )
        })
    })
    return (
        <React.Fragment>
            {bubbleList}
        </React.Fragment>
    )
}

const Presentation = ({ data, dims }) => {
    const { bubblesHeight, bubblesWidth } = dims
    if (!data.genes.length || !data.clusters.length) {
        return (null)
    }
    return (
        <svg
            height={bubblesHeight}
            width={bubblesWidth}
            style={{display: 'inline-block'}}
        >
            <ManyBubbles data={data} dims={dims} />
        </svg>
    )
}

export default Presentation
