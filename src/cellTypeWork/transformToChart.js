
// Transform the data from the server into the chart format.

import { set as rxSet } from 'state/rx'
import { getCatColormap } from 'color/colorCat'

const tsvToArrays = (tsv) => {
    const lines = tsv.split('\n')
    let arrays = []
    lines.forEach(line => {
        const cols = line.split('\t')
        arrays.push(cols)
    })
    return arrays
}

const buildClusters = (data) => {
    // Find the clusters and sort them by column position.
    if (!data || !data.clusters) {
        return
    }
    // Clusters are received with positional columns,
    // cluster names, cell counts, cell type colorbar and cell type:
    //      column  cluster cell_count  bar_color   cell_type
    //      0       2       321         0           Ventricular CMs
    //      1       0       456         4
    //      2       1       344         3           Atrial CMs
    const lines = tsvToArrays(data.clusters)
    const clusterCount = lines.length - 1
    let clusters = Array.from(clusterCount)
    const colormap = getCatColormap('hexmap', clusterCount)
    lines.slice(1).forEach((line,i) => {
        clusters[line[0]] = {
            name: line[1],
            cellCount: line[2],
            barColor: colormap[line[3]],
            cellType: line[4],
            color: colormap[i],
        }
    })

    return clusters
}

const buildGenes = (data) => {
    // Find the genes and sort them by row position.
    if (!data || !data.genes) {
        return
    }
    // Genes are received with positional rows and genes:
    //      row     gene
    //      3       ALK
    //      2       TP53
    //      ...
    let lines = tsvToArrays(data.genes).slice(1)
    let genes = Array.from(lines.length)
    lines.forEach((line) => {
        genes[line[0]] = line[1]
    })

    return genes
}

const buildBubbles = (data) => {
    // Find the color and size values and store them with
    // cluster and gene names.
    if (!data || !data.clusters || !data.genes || !data.colors || !data.sizes) {
        return
    }
    // Save the color values along with their gene and cluster.
    // Color values are received with cluster names across the top as:
    //      Gene    0   1   2   …
    //      ALK     .5  .3  .2 …
    //      TP53    .5  .3  .2 …
    //      …
    let bubbles = []
    let line = tsvToArrays(data.colors)
    let clusters = line[0].slice(1)
    line.slice(1).forEach((line) => {
        const gene = line[0]
        line.splice(1).forEach((color,j) => {
            bubbles.push({
                cluster: clusters[j],
                gene,
                color,
            })
        })
    })

    // Size values are received in the same format as color values.
    line = tsvToArrays(data.sizes)
    clusters = line[0].slice(1)
    line.slice(1).forEach((line) => {
        const gene = line[0]
        line.splice(1).forEach((size,j) => {
            const cluster = clusters[j]
            const index = bubbles.findIndex(bubble => {
                return (bubble.gene === gene && bubble.cluster === cluster)
            })
            bubbles[index].size = size
         })
    })

    //console.log('bubbles:', bubbles)

    return bubbles
}

const transfromToChart = (data) => {
    // Transform the format from the server response to worksheet chart.
    rxSet('cellTypeWork.data.default')
    rxSet('cellTypeWork.data.load', { value: {
        dataset:         data.dataset_name,
        clusterSolution: data.cluster_solution_name,
        sizeBy:          data.size_by,
        colorBy:         data.color_by,
        clusters:        buildClusters(data),
        genes:           buildGenes(data),
        //bubbles:         buildBubbles(data),
    }})
}

export default transfromToChart
