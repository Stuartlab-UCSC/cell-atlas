
// Transform the data from the server into the chart format.

import { set as rxSet } from 'state/rx'
import { getCatColormap } from 'color/colorCat'
import { buildBubblesOnLoad } from 'cellTypeWork/transformToBubbles'
import { tsvToArrays } from 'app/util'
import dataStore from 'cellTypeWork/dataStore'
import { getInitialScatterPlot } from 'cellTypeScatter/scatter'

const buildClusters = (data) => {
    // Find the clusters and sort them by column position.
    // Clusters are received in tsv format as:
    //      column  cluster cell_count  bar_color  hide_cell_type   cell_type
    //      0       2       321         0                           Ventricular CMs
    //      1       0       456         2          x                Ventricular CMs
    //      2       1       344         1          x                Atrial CMs
    
    if (!data || !data.clusters) {
        return
    }
    
    // Initialize the rendering arrays for the clusters, cellTypes and colorBar.
    const lines = tsvToArrays(data.clusters)
    let clusterCount = lines.length - 1
    let clusters = Array.from(clusterCount)
    let cellTypes = Array.from(clusterCount)
    let colorBar = Array.from(clusterCount)

    // Find the data column indices.
    const head = lines[0]
    const iColumn = head.indexOf('column')
    const iName = head.indexOf('cluster')
    const iCellCount = head.indexOf('cell_count')
    const iColorBar = head.indexOf('bar_color')
    const iHideCellType = head.indexOf('hide_cell_type')
    const iCellType = head.indexOf('cell_type')
    
    lines.slice(1).forEach((line, i) => {
        const I               = line[iColumn]
        const inName          = line[iName]
        const inCellCount     = line[iCellCount]
        const inColorBar      = line[iColorBar]
        const inHideCellType  = line[iHideCellType]
        const inCellType      = line[iCellType]
        
        clusters[I] = {
            name: inName,
            cellCount: parseFloat(inCellCount),
        }
        
        // If this column's cell type is to be hidden, set the label to null.
        if (inHideCellType) {
            cellTypes[I] = null
        } else {
            cellTypes[I] = inCellType
        }

        // If a color is not given for a segment of the colorBar,
        // use the column position's color.
        if (inColorBar === null || inColorBar === undefined) {
            colorBar[I] = I
        } else {
            colorBar[I] = parseFloat(inColorBar)
        }
    })

    return {colorBar, clusters, cellTypes }
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

const transfromToChart = (data) => {
    // Transform the format from the server response to worksheet chart.
    rxSet('cellTypeWork.dims.default')
    const { colorBar, clusters, cellTypes } = buildClusters(data)
    const genes = buildGenes(data)
    const bubbles = buildBubblesOnLoad(data, clusters.length, genes.length)

    // Update the chart data.
    dataStore.load({
        group:           data.group,
        dataset:         data.dataset_name,
        description:     data.description,
        clusterSolution: data.cluster_solution_name,
        colorBy:         data.color_by,
        sizeBy:          data.size_by,
        geneTableUrl:    data.gene_table_url,
        scatterplotUrl:  data.scatterplot_url,
        sourceUser:      data.source_user,
        sourceWorksheet: data.source_worksheet_name,
        bubbles,
        cellTypes,
        clusters,
        colorBar,
        genes,
    })
    
    // Create and update the colormap which will be static for this data load.
    let clusterCount = 0
    if (clusters) {
        clusterCount = clusters.length
    }
    const colormap = getCatColormap('elie', clusterCount)
    rxSet('cellTypeWork.colormap.create', { value: colormap })
    
    // Initialize the variable selection list to include just those selected.
    rxSet('cellTypeGene.variableList.initialSelect', {
        value: [
            {
                value: data.color_by,
                name: data.color_by,
            },
            {
                value: data.size_by,
                name: data.size_by,
            }
        ]
    })

    // Notify to re-render worksheet.
    rxSet('cellTypeWork.render.now')

    // Load the initial scatterplot. The receive function then requests the
    // initial gene table.
    getInitialScatterPlot(clusters, colormap, data.scatterplot_url)
}

export default transfromToChart
