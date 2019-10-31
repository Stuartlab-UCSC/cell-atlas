
// Transform the working data into the format to store on the server.

import dataStore from 'cellTypeWork/dataStore'
import { get as rxGet } from 'state/rx'
import { buildGeneTableUrl } from 'cellTypeGene/ctgFetch'
import { buildScatterPlotUrl } from 'cellTypeScatter/scatter'
import { findBubbleData } from  'cellTypeWork/transformToBubbles'

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
    //      {
    //          cellType: 'someCellType',
    //          hideCellType: 'x',
    //      }, ...
    //  ]
    //  colorBar: [
    //      '#444444', ...
    //  ]
    //
    // Clusters are transformed to:
    //  clusters:
    //      column   cluster  cell_count  cell_type
    //      0        2        321         Ventricular CMs
    //      1        0        456         Ventricular CMs
    //      2        1        344         Atrial CMs

    // Build the cluster tsv lines.
    const { clusters, cellTypes } = data
    let tsvLines = clusters.map((cluster, i) => {
        const line = [i, cluster.name, cluster.cellCount, cellTypes[i].label ]
        return line.join('\t')
    })
    
    // The header.
    tsvLines.unshift(
        ['column\tcluster\tcell_count\tcell_type'])
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
        group: data.group,
        source_user: data.sourceUser || rxGet('auth.user').name,
        source_worksheet_name:
            data.sourceWorksheet || rxGet('cellTypeSheet.selected'),
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
