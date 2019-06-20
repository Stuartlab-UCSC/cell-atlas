
// Transform the bubble data from the server into the chart format.

import { get as rxGet, set as rxSet } from 'state/rx'
import {getCatColormap } from 'color/colorCat'
import { sizeToRadius } from 'bubble/util'
import { tsvToArrays } from 'app/util'
import dataStore from 'cellTypeWork/dataStore'

// colorScale is the array of colors for the bubbles.
let colorScale = []

const setDimensions = (geneCount, clusterCount, colorRange, sizeRange) => {
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

const getRangeColor = (value, min, max) => {
    // Get the color of this value in a colorScale of colors between 0 and 100.
    // Due to rounding, the value may be just outside the min or max,
    // so set that value to the min or max.
    if (value < min) {
        value = min
    } else if (value > max) {
        value = max
    }

    // Normalize the value between 0 and 99 to find the color on the colorScale.
    const norm = value / (max - min) * 100 + 50
    // Return the color at that index.
    return colorScale[Math.floor(norm)]}

const setBubbleColorAndRadius = (bubbles, colorRange, sizeRange) => {
    // Set the radius and colorRbg using the colorBy & sizeBy values & ranges.
    for (let i = 0; i < bubbles.length; i++) {
        let bubble = bubbles[i]
        bubble.colorRgb = getRangeColor(bubble.color, colorRange.min,
            colorRange.max)
        bubble.radius = sizeToRadius(bubble.size, sizeRange.min, sizeRange.max)
    }

    return bubbles
}

const getColorScale = (colorRange) => {
    // Find the final color range.
    // Put zero is in the middle of the color range by using the largest
    // magnitude to find the two endpoints of the color range.
    const magnitude = Math.abs(colorRange.min, colorRange.max)
    colorRange.min = -magnitude
    colorRange.max = magnitude

    // Create the color scale for the bubble colors.
    return getCatColormap('expression', 101)
}

const setDimsAndColor = (bubbles, colorRange, sizeRange, clusterCount,
    geneCount) => {
    // Finalize the colorRange and get the colorScale.
    colorScale = getColorScale(colorRange)
    
    // Find the color and radius to each bubble, including previous bubbles
    // due the possibilty of the color and size ranges changing.
    setBubbleColorAndRadius(bubbles, colorRange, sizeRange)
    
    // Save the new dimensions of the bubble matrix.
    setDimensions(
        geneCount,
        clusterCount,
        colorRange,
        sizeRange
    )
    return bubbles
}

const setBubbleColorBy = (gene, bubbles, line, clusters, colorRange) => {
    // Set the primary and colorBy properties of the bubble.
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

const findBubbleData = (bubbles, cluster, gene) => {
    const index = bubbles.findIndex(bubble => {
        return (bubble.gene === gene && bubble.cluster === cluster)
    })
    return bubbles[index]
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

    // Add these bubbles to the existing bubbles.
    bubbles = dataStore.getBubbles().concat(bubbles)

    // Find the dimensions and add the colors and sizes to the bubbles.
    bubbles = setDimsAndColor(bubbles, colorRange, sizeRange,
        dataStore.getClusters().length,
        dataStore.getGenes().length + 1)

    // Save the new genes and bubbles
    dataStore.addGene(gene, bubbles)

    // Notify to re-render worksheet.
    rxSet('cellTypeWork.render.now')
}

const buildBubblesOnLoad = (data, clusterCount, geneCount) => {
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
    // Find the dimensions and add the colors and sizes to the bubbles.
    return setDimsAndColor(bubbles, colorRange, sizeRange,
        clusterCount, geneCount)
}

export { addGeneBubbles, buildBubblesOnLoad, findBubbleData }
