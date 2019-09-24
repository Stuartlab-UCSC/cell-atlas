
// Transform the data from the server into the chart format.

import { set as rxSet } from 'state/rx'
import { getCatColormap } from 'color/colorCat'
import { buildBubblesOnLoad } from 'cellTypeWork/transformToBubbles'
import { tsvToArrays } from 'app/util'
import dataStore from 'cellTypeWork/dataStore'
import { getInitialScatterPlot } from 'cellTypeScatter/scatter'

const buildTypeGroups = (cellTypes) => {
    // Find the cell type groups. A groups is defined by contiguous duplicate
    // cell types. The groups will contain the begin and end column positions of
    // each group and look something like: [[1,1], [2,3], [4,6]]
    let groups = []
    let prevLabel
    let begin = 0
    cellTypes.forEach((type, i) => {
        let label = type.label
        if (i === 0) {
            // For the first cell type, just save its label.
            prevLabel = label
            
        // If the label is different from the previous label,
        // or if there is no label...
        } else if (label !== prevLabel || !label || label === '') {
            // The previous group is complete, so save it.
            groups.push([begin, i - 1])
            begin = i
        }
        // Clear any old show flag.
        delete cellTypes[i].show
        prevLabel = label
    })
    // Save the last group.
    groups.push([begin, cellTypes.length - 1])
    
    // Determine which column should display the label.
    groups.forEach(group => {
        cellTypes[group[0]].show = true
    })
    
    return groups
}

const buildClusters = (data) => {
    // Find the clusters and sort them by column position.
    // Clusters are received in tsv format as:
    //      column  cluster cell_count  bar_color  cell_type
    //      0       2       321         0          Ventricular CMs
    //      1       0       456         0          Ventricular CMs
    //      2       1       344         2          Atrial CMs
    // Clusters are saved as:
    //  clusters: [
    //      {
    //          name: 'someName',
    //          cellCount: 101,
    //      },
    //      ...
    //  ]
    //  cellTypes: [
    //      {
    //          label: 'someCellType',
    //          show: true,
    //      }, ...
    //  ]
    //  colorBar: [
    //      '#444444', ...
    //  ]
    
    if (!data || !data.clusters) {
        return
    }
    
    // Initialize the rendering arrays for the clusters.
    const lines = tsvToArrays(data.clusters)
    let clusterCount = lines.length - 1
    let clusters = Array.from(clusterCount)
    let cellTypes = Array.from(clusterCount)

    // Find the data column indices.
    const head = lines[0]
    const iColumn = head.indexOf('column')
    const iName = head.indexOf('cluster')
    const iCellCount = head.indexOf('cell_count')
    const iCellType = head.indexOf('cell_type')
    
    lines.slice(1).forEach((line, i) => {
        const I             = line[iColumn]
        const name          = line[iName]
        const cellCount     = line[iCellCount]
        let cellType        = line[iCellType]

        clusters[I] = {
            name: name,
            cellCount: parseFloat(cellCount),
        }
        
        // Save the cell type label.
        if (cellType) {
            cellType = cellType.trim()
        } else {
            cellType = ''
        }
        cellTypes[I] = { label: cellType }
    })

    const typeGroups = buildTypeGroups(cellTypes)
    return { clusters, cellTypes, typeGroups }
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
    const { clusters, cellTypes, typeGroups } = buildClusters(data)
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
        typeGroups,
        clusters,
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
export { buildTypeGroups }
