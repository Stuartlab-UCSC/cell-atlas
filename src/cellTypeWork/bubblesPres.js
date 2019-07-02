
// The bubble matrix presentational component for the cell type worksheet page.

import React from 'react'
import Typography from '@material-ui/core/Typography'
import Bubble from 'bubble/bubble'
import { findBubbleData } from 'cellTypeWork/transformToBubbles'

const ManyBubbles = ({ data, dims }) => {
    const { bubbles, colorBy, clusters, genes, sizeBy } = data
    const { colWidth, rowHeight } = dims
    let bubbleList = []
    genes.forEach((gene,i) => {
        clusters.forEach((cluster,j) => {
            const bubble = findBubbleData(bubbles, cluster.name, gene)
            if (!bubble) {
               console.error('no bubble data for gene, cluster:', gene, cluster)
            }
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

const Presentation = ({ data, dims, geneCluster, onMouseOver }) => {
    const { bubblesHeight, bubblesWidth } = dims
    const { clusters, genes } = data
    if (clusters.length < 1) {
        return (null)
    }
    if (genes.length < 1 && geneCluster) {
        return (
            <Typography style={{
                marginLeft: '2rem',
                marginTop: '2rem',
                color: 'red',
            }}>
    Add a marker gene for cluster <b>{geneCluster}</b> from the table below
            </Typography>
        )
    }

    return (
        <svg
            height={bubblesHeight}
            width={bubblesWidth}
            style={{display: 'inline-block'}}
            onMouseOver={onMouseOver}
        >
            <ManyBubbles data={data} dims={dims} />
        </svg>
    )
}

export default Presentation
