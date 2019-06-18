
// Transform the bubble data from the server into the chart format.

import { get as rxGet, set as rxSet } from 'state/rx'
import { getRangeColor } from 'color/range'
import { sizeToRadius } from 'bubble/util'
import { tsvToArrays } from 'app/util'

const findBubbleData = (bubbles, cluster, gene) => {
    const index = bubbles.findIndex(bubble => {
        return (bubble.gene === gene && bubble.cluster === cluster)
    })
    return bubbles[index]
}

const setDimensions = (data, geneCount, clusterCount, colorRange,
    sizeRange) => {
    // Set the new dimensions.
    const { colWidth, rowHeight } = rxGet('cellTypeWork.dims')
    // Update state.
    rxSet('cellTypeWork.dims.set', {
        bubblesWidth: (clusterCount * colWidth) + (colWidth / 4),
        bubblesHeight: (geneCount * rowHeight) + (colWidth / 4),
        colorRange,
        sizeRange,
    })
}

const setBubbleColorAndRadius = (bubbles, colorRange, sizeRange) => {
    // Set the radius and colorRbg using the colorBy & sizeBy values & ranges.
    console.log('setBubbleColorAndRadius: colorRange:', colorRange)
    for (let i = 0; i < bubbles.length; i++) {
        let bubble = bubbles[i]
        //console.log('bubble.color:', bubble.color)
        bubble.colorRgb =
            getRangeColor(bubble.color, colorRange.min, colorRange.max)
        //console.log('bubble.colorRgb:', bubble.colorRgb)
        bubble.radius = sizeToRadius(bubble.size, sizeRange.min, sizeRange.max)
    }

    return { bubbles, colorRange, sizeRange }
}

const setBubbleColorBy = (gene, bubbles, line, clusters, colorRange) => {
    // Set the primary and colorBy properties of the bubble.
    line.splice(1).forEach((color,j) => {
        console.log('color:', color)
        bubbles.push({
            cluster: clusters[j],
            gene,
            color: parseFloat(color),
        })
        colorRange.max = Math.max(color, colorRange.max)
        colorRange.min = Math.min(color, colorRange.min)
    })
}

const setBubbleSizeBy = (gene, bubbles, line, clusters, sizeRange) => {
    // Set the sizeBy properties of the bubble.
    line.splice(1).forEach((size,j) => {
        const cluster = clusters[j]
        const bubble = findBubbleData(bubbles, cluster, gene)
        bubble.size = parseFloat(size)
        sizeRange.max = Math.max(size, sizeRange.max)
    })
}

const addGeneBubbles = (data) => {
    // Transform the added gene's stats for every cluster.
    // Find the color and size values and store them with
    // cluster and gene names.
    // @param data: received as:
    //      stat        0        1      2    ...
    //      color_by    -.7    .4     .3  ...
    //      size_by     .2     .8     .3  ...
    //      ...
    if (!data) {
        return
    }
    let bubbles = []
    let lines = tsvToArrays(data)
    // TODO: don't rely on position; check the label at lines[0][0] & lines[1][0]
    let clusters = lines[0].slice(1)
    const gene = rxGet('cellTypeGene.geneSelected')
    
    // Save colorBy values.
    let colorRange = rxGet('cellTypeWork.dims.colorRange')
    setBubbleColorBy(gene, bubbles, lines[1], clusters, colorRange)

    // Save sizeBy values.
    let sizeRange = rxGet('cellTypeWork.dims.sizeRange')
    setBubbleSizeBy(gene, bubbles, lines[2], clusters, sizeRange)

    // Find the color and radius to each bubble, including previous bubbles
    // due the possibilty of the color and size ranges changing.
    setBubbleColorAndRadius(
        rxGet('cellTypeWork.data').bubbles.concat(bubbles),
        colorRange, sizeRange
    )
    // Save the new dimensions of the bubble matrix.
    const dataStore = rxGet('cellTypeWork.data')
    setDimensions(
        data,
        dataStore.genes.length + 1, // 1 for the new gene
        dataStore.clusters.length,
        colorRange,
        sizeRange
    )
    rxSet('cellTypeWork.data.newGene', {
        gene,
        bubbles,
    })
    // Notify to re-render worksheet.
    rxSet('cellTypeWork.render.now')
}

const buildBubblesOnLoad = (data) => {
    // Find the color and size values and store them with
    // cluster and gene names.
    // Save the color values along with their gene and cluster.
    // @param data: received as:
    //      Gene    0   1   2  …
    //      ALK     .5  .3  .2 …
    //      TP53    .5  .3  .2 …
    //      …
    if (!data || !data.colors || !data.sizes) {
        return
    }
    let bubbles = []
    let lines = tsvToArrays(data.colors)
    let clusters = lines[0].slice(1)

    // Handle the colorBy values.
    let colorRange = { min: 0, max: 0 }
    lines.slice(1).forEach((line, i) => {
        setBubbleColorBy(line[0], bubbles, line, clusters, colorRange)
    })

    // Size values are received in the same format as color values.
    lines = tsvToArrays(data.sizes)
    clusters = lines[0].slice(1)
    let sizeRange = { min: 0, max: 0 }
    lines.slice(1).forEach((line) => {
        setBubbleSizeBy(line[0], bubbles, line, clusters, sizeRange)
    })

    return setBubbleColorAndRadius(bubbles, colorRange, sizeRange)
}

export { addGeneBubbles, buildBubblesOnLoad, findBubbleData, setDimensions }
