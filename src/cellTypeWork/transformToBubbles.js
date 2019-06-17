
// Transform the bubble data from the server into the chart format.

import { get as rxGet } from 'state/rx'
import { getRangeColor } from 'color/range'
import { sizeToRadius } from 'bubble/util'
import { tsvToArrays } from 'app/util'

const findBubbleData = (bubbles, cluster, gene) => {
    const index = bubbles.findIndex(bubble => {
        return (bubble.gene === gene && bubble.cluster === cluster)
    })
    return bubbles[index]
}

const setBubbleDims = (bubbles, colorRange, sizeRange) => {
    // Set the radius and colorRbg using the colorBy and sizeBy value ranges.
    for (let i = 0; i < bubbles.length; i++) {
        let bubble = bubbles[i]
        bubble.colorRgb =
            getRangeColor(bubble.color, colorRange.min, colorRange.max)
        bubble.radius = sizeToRadius(bubble.size, sizeRange.min, sizeRange.max)
    }

    return { bubbles, colorRange, sizeRange }
}

const setBubbleColor = (gene, bubbles, line, clusters, colorRange) => {
    line.splice(1).forEach((color,j) => {
        bubbles.push({
            cluster: clusters[j],
            gene,
            color: parseFloat(color),
        })
        colorRange.max = Math.max(color, colorRange.max)
        colorRange.min = Math.min(color, colorRange.min)
    })
}

const setBubbleSize = (gene, bubbles, line, clusters, sizeRange) => {
    line.splice(1).forEach((size,j) => {
        const cluster = clusters[j]
        const bubble = findBubbleData(bubbles, cluster, gene)
        bubble.size = parseFloat(size)
        sizeRange.max = Math.max(size, sizeRange.max)
    })
}

const addGeneBubbles = (data, gene) => {
    // Transform the added gene's stats for every cluster.
    // Find the color and size values and store them with
    // cluster and gene names.
    // @param data: received as:
    //      stat        0        1      2    ...
    //      color_by    -.7    .4     .3  ...
    //      size_by     .2     .8     .3  ...
    //      ...
    // @param gene: the gene whose data is being added
    if (!data) {
        return
    }
    let bubbles = rxGet('cellTypeWork.data').bubbles
    let lines = tsvToArrays(data)
    let clusters = lines[0].slice(1)
    let colorRange = rxGet('cellTypeWork.dims.colorRange')
    
    // Save colorBy values.
    setBubbleColor(gene, bubbles, lines[1], clusters, colorRange)

    // Save sizeBy values.
    let sizeRange = rxGet('cellTypeWork.dims.sizeRange')
    setBubbleSize(gene, bubbles, lines[2], clusters, sizeRange)

    return setBubbleDims(bubbles, colorRange, sizeRange)
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
    let colorRange = { min: 0, max: 0 }
    lines.slice(1).forEach((line, i) => {
        setBubbleColor(line[0], bubbles, line, clusters, colorRange)
    })

    // Size values are received in the same format as color values.
    lines = tsvToArrays(data.sizes)
    clusters = lines[0].slice(1)
    let sizeRange = { min: 0, max: 0 }
    lines.slice(1).forEach((line) => {
        setBubbleSize(line[0], bubbles, line, clusters, sizeRange)
    })
    
    return setBubbleDims(bubbles, colorRange, sizeRange)
}

export { addGeneBubbles, buildBubblesOnLoad, findBubbleData }
