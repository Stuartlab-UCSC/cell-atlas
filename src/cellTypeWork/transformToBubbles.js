
// Transform the bubble data from the server into the chart format.

import { get as rxGet, set as rxSet } from 'state/rx'
import {getCatColormap } from 'color/colorCat'
import { sizeToRadius } from 'bubble/util'
import { tsvToArrays } from 'app/util'
import dataStore from 'cellTypeWork/dataStore'

// colorScale is the array of colors for the bubbles.
let colorScale = []

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

const getColorScale = (colorRange) => {
    // Find the final color range.
    // Put zero is in the middle of the color range by using the largest
    // magnitude to find the two endpoints of the color range.
    const magnitude = Math.max(
        Math.abs(colorRange.min), Math.abs(colorRange.max))
    colorRange.min = -magnitude
    colorRange.max = magnitude

    // Create the color scale for the bubble colors.
    return getCatColormap('expression', 101)
}

const setDimsAndColor = (bubbles, clusterCount, geneCount) => {
    
    // Find the color and size ranges.
    let colorRange = { min: 0, max: 0 }
    let sizeRange = { min: 0, max: 0 }
    bubbles.forEach(bubble => {
        colorRange.max = Math.max(bubble.color, colorRange.max)
        colorRange.min = Math.min(bubble.color, colorRange.min)
        sizeRange.max = Math.max(bubble.size, sizeRange.max)
    })

    // Update the dimensions state.
    const { colWidth, rowHeight } = rxGet('cellTypeWork.dims')
    rxSet('cellTypeWork.dims.set', {
        bubblesWidth: (clusterCount * colWidth) + (colWidth / 4),
        bubblesHeight: (geneCount * rowHeight) + (colWidth / 4),
        colorRange,
        sizeRange,
    })
    
    // Build the color scale colormap from the color range.
    colorScale = getColorScale(colorRange)
    
    // Set the color and radius of each bubble
    for (let i = 0; i < bubbles.length; i++) {
        let bubble = bubbles[i]
        bubble.colorRgb = getRangeColor(bubble.color, colorRange.min,
            colorRange.max)
        bubble.radius = sizeToRadius(bubble.size, sizeRange.min, sizeRange.max)
    }

    return bubbles
}

const addBubblesWithColorBy = (gene, bubbles, line, clusters) => {
    // Set the primary and colorBy properties of the bubble.
    line.splice(1).forEach((color,j) => {
        bubbles.push({
            cluster: clusters[j],
            gene,
            color: parseFloat(color),
        })
    })
}

const findBubbleIndex = (bubbles, cluster, gene) => {
    // Find the index of a bubble by its cluster name and gene.
    return bubbles.findIndex(bubble => {
        return (bubble.gene === gene && bubble.cluster === cluster)
    })
}

const findBubbleData = (bubbles, cluster, gene) => {
    // Find a bubble by its cluster name and gene.
    return bubbles[findBubbleIndex(bubbles, cluster, gene)]
}

const setBubbleValue = (gene, bubbles, line, clusters, type) => {
    // Set the colorBy or sizeBy values of the bubble.
    line.splice(1).forEach((value, j) => {
        const cluster = clusters[j]
        const bubble = findBubbleData(bubbles, cluster, gene)
        bubble[type] = parseFloat(value)
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

    // Find the clusters in the header.
    let clusters = lines[0].slice(1)
    const gene = rxGet('cellTypeGene.geneSelected')
    
    // Find the colorBy and sizeBy lines.
    let colorByLine = 1
    let sizeByLine = 2
    if (lines[2][0] === dataStore.getColorBy()) {
        colorByLine = 2
        sizeByLine = 1
    }

    // Save colorBy values.
    addBubblesWithColorBy(gene, bubbles, lines[colorByLine], clusters)

    // Save sizeBy values.
    setBubbleValue(gene, bubbles, lines[sizeByLine], clusters, 'sizeBy')

    // Add these bubbles to the existing bubbles.
    bubbles = dataStore.getBubbles().concat(bubbles)

    // Find the dimensions and add the colors and sizes to the bubbles.
    bubbles = setDimsAndColor(bubbles,
        dataStore.getClusters().length,
        dataStore.getGenes().length + 1)

    // Save the new genes and bubbles
    dataStore.addGene(gene, bubbles)

    // Notify to re-render worksheet.
    rxSet('cellTypeWork.render.now')
}

const bubbleVariableChange = (data, type) => {
    // When a new variable is selected apply the values to the bubbles.
    // @param data: received as:
    //      Gene    0   1   2  …
    //      ALK     .5  .3  .2 …
    //      TP53    .5  .3  .2 …
    //      …
    // @param type: one of color, size
    
    // Find the clusters in the header.
    const lines = tsvToArrays(data)
    const clusters = lines[0].slice(1)

    const genes = dataStore.getGenes()
    let bubbles = dataStore.getBubbles()
    
    // Save the values for each bubble.
    lines.slice(1).forEach((line, i) => {
        setBubbleValue(line[0], bubbles, line, clusters, type)
    })
    
    // Find the dimensions and add the colors and sizes to the bubbles.
    bubbles = setDimsAndColor(bubbles, clusters.length, genes.length - 1)
    dataStore.setBubbles(bubbles)

    // Notify to re-render worksheet.
    rxSet('cellTypeWork.render.now')
}

const removeGeneBubbles = (genePosition) => {
    // Find the ranges, colors, & sizes of bubbles after some bubbles have
    // been removed.
    // @param gene: gene to remove
    
    // Remove the gene's bubbles.
    let bubbles = dataStore.getBubbles()
    const genes = dataStore.getGenes()
    const gene = genes[genePosition]
    const clusters = dataStore.getClusters()
    clusters.forEach(cluster => {
        const index = findBubbleIndex(bubbles, cluster.name, gene)
        bubbles.splice(index, 1)
    })

    // Find the dimensions and add the colors and sizes to the bubbles.
    bubbles = setDimsAndColor(bubbles, clusters.length, genes.length - 1)

    // Remove the gene and save the bubbles in the data store.
    dataStore.removeGene(genePosition, bubbles)

    // Notify to re-render worksheet.
    rxSet('cellTypeWork.render.now')
}

const buildBubblesOnLoad = (data, clusterCount, geneCount) => {
    // Find the color and size values and store them with
    // cluster and gene names.
    // Save the color values along with their gene and cluster.
    // @param data.colors: received as:
    //      Gene    0   1   2  …
    //      ALK     .5  .3  .2 …
    //      TP53    .5  .3  .2 …
    //      …
    // @param data.sizes: in the same format as above.
    if (!data || !data.colors || !data.sizes) {
        return
    }
    let bubbles = []
    let lines = tsvToArrays(data.colors)
    let clusters = lines[0].slice(1)

    // Handle the colorBy values.
    lines.slice(1).forEach((line, i) => {
        addBubblesWithColorBy(line[0], bubbles, line, clusters)
    })
    // Size values are received in the same format as color values.
    lines = tsvToArrays(data.sizes)
    clusters = lines[0].slice(1)
    lines.slice(1).forEach((line) => {
        setBubbleValue(line[0], bubbles, line, clusters, 'size')
    })
    // Find the dimensions and add the colors and sizes to the bubbles.
    return setDimsAndColor(bubbles, clusterCount, geneCount)
}

export { addGeneBubbles, bubbleVariableChange, buildBubblesOnLoad,
    findBubbleIndex, findBubbleData, removeGeneBubbles }
