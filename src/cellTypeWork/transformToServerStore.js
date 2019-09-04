
// Transform the working data into the format to store on the server.

import dataStore from 'cellTypeWork/dataStore'
import { get as rxGet } from 'state/rx'
import { buildGeneTableUrl } from 'cellTypeGene/ctgFetch'
import { buildScatterPlotUrl } from 'cellTypeScatter/scatter'
import { findBubbleData } from  'cellTypeWork/transformToBubbles'

const buildClusterLines = (data) => {
    // Pull all of the cluster data together with one line per cluster.
    const { clusters, cellTypes, colorBar } = data
    
    let prevColor = null
    let label = null
    let group = []
    let lines = []
    // Walk through the clusters, looking for a change in the colorBar to
    // delineate cell type groups belonging to one cell type.
    // Note the clusters, cellTypes and colorBar are in order of columns.
    clusters.forEach((cluster, i) => {
        // Save all of this cluster's data except for the cell type and the
        // hide flag.
        lines.push([i, cluster.name, cluster.cellCount, colorBar[i]])
        
        if (colorBar[i] !== prevColor) {
            // The colorBar has changed color, so we've captured all of the
            // clusters for the group. So set the cell type for each cluster
            // in the group.
            group.forEach(columnIndex => {
                lines[columnIndex].push(label)
            })
            // Reset our accumulators.
            prevColor = colorBar[i]
            group = []
            label = null
        }
        
        // Save this cluster's column index in the group list.
        group.push(i)
        
        // Find hideCellType flag and save it to the line.
        if (cellTypes[i]) {
            if (label) {
                alert('there may only be one cell type label in the same ' +
                    'cell type group')
                // TODO should we bail from the save?
                // TODO should we tell user the competing labels?
            } else {
                // Hang onto the cell type label for this group.
                label = cellTypes[i]
            }
            lines[i].push(null)  // don't hide the cell type label
        } else {
            // With no cell type label, mark this label as hidden.
            lines[i].push('x')
        }
    })
    // Save the labels for the last cell type group.
    group.forEach(columnIndex => {
        lines[columnIndex].push(label)
    })
    return lines
}

const buildClusters = (data) => {
    // The transformation is from the chart form of:
    //  clusters: [
    //      {
    //          name: 'someName',
    //          cellCount: 101,
    //      },
    //      ...
    //  ]
    //  cellTypes: [
    //      'someCellType', ...
    //  ]
    //  colorBar: [
    //      '#444444', ...
    //  ]
    //
    // to this tsv form:
    //  clusters:
    //      column   cluster  cell_count  bar_color  cell_type        hide_cell_type
    //      0        2        321         0          Ventricular CMs
    //      1        0        456         4          Ventricular CMs  x
    //      2        1        344         3          Atrial CMs       x
    // Gather the column, cluster, cellCount, colorBar, and cellTypes.
    const clusterLines = buildClusterLines(data)
    
    // Build the cluster tsv lines.
    let tsvLines = clusterLines.map((cluster, i) => {
        return [cluster].join('\t')
    })
    
    // The header.
    tsvLines.unshift(
        ['column\tcluster\tcell_count\tbar_color\thide_cell_type\t,cell_type'])
    // Transform the lines to tsv.
    return tsvLines.join('\n')
}

const buildGenes = (data) => {
    // Transform this form:
    //  genes: [gene1, gene1, ...]
    //
    // to this tsv form:
    //  genes:
    //      row  gene
    //      3    ALK
    //      2    TP53
    //      ...'
    let tsvLines = data.genes.map((gene, i) => {
        return [i, gene].join('\t')
    })
    // The header.
    tsvLines.unshift(['row\tgene'])
    // Transform the lines to tsv.
    return tsvLines.join('\n')
}

const buildColorsAndSizes = (data) => {
    // Transfrom this form:
    //  bubbles: [
    //      {
    //          gene: 'someGene',
    //          cluster: 'someCluster',
    //          colorBy:
    //          sizeBy:
    //      },
    //      ...
    //  ]
    // to this tsv form:
    //  colors:
    //      gene 0 1 2 …
    //      ALK .5 .3 .2 …
    //      TP53 .5 .3 .2 …
    //      ...
    //  sizes:
    //      gene 0 1 2 …
    //      ALK .5 .3 .2 …
    //      TP53 .5 .3 .2 …
    //      ...
    const { bubbles, clusters, genes } = data
    let colors = []
    let sizes = []
    genes.forEach((gene, i) => {
        let colorLine = [gene]
        let sizeLine = [gene]
        clusters.forEach((cluster, j) => {
            const bubble = findBubbleData(bubbles, cluster.name, gene)
            colorLine.push(bubble.color)
            sizeLine.push(bubble.size)
        })
        colors.push(colorLine.join('\t'))
        sizes.push(sizeLine.join('\t'))
    })
    // The header.
    let headerLine = clusters.map(cluster => {
        return cluster.name
    })
    headerLine.unshift('gene')
    const headerTsv = headerLine.join('\t')
    colors.unshift(headerTsv)
    sizes.unshift(headerTsv)
    // Transform the lines to tsv .
    return { colors: colors.join('\n'), sizes: sizes.join('\n') }
}

const transformToServerStore = () => {
    let data = dataStore.get()
    let { colors, sizes } = buildColorsAndSizes(data)
    let payload = {
        source_user: data.sourceUser || rxGet('auth.user').name,
        source_worksheet_name:
            data.sourceWorksheet || rxGet('cellTypeWork.sheetSelected'),
        role: 'worksheet',
        dataset_name: data.dataset,
        cluster_solution: data.clusterSolution,
        size_by: data.sizeBy,
        color_by: data.colorBy,
        gene_table_url: buildGeneTableUrl(rxGet('cellTypeGene.cluster'), true),
        scatterplot_url:
            buildScatterPlotUrl(rxGet('cellTypeScatter.gene'), true),
        clusters: buildClusters(data),
        genes: buildGenes(data),
        colors,
        sizes,
    }
    return payload
}

export default transformToServerStore
