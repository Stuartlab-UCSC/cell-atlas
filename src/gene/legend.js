
// Logic for the gene page legend.

import { connect } from 'react-redux'

import data from 'gene/data'
import Presentation from 'gene/legendPres'
import { colorRef, getColor, maxRadius, sizeRef } from 'gene/reference'

let sizes = null
let colorLabels = null

const findNegatives = (data) => {
    return data.cluster_solutions.some((solution) => {
        return solution.clusters.some((cluster) => {
            return cluster.color < 0
        })
    })
}

const findColorLabels = (hasNegatives) => {
    return (hasNegatives)
        ? ['1', '0.5', '0', '-0.5', '-1']
        : ['1', '0.75', '0.5', '0.25', '0']
}

const findSizes = (labels) => {
    return labels.map(label => {
        return parseFloat(label) * maxRadius
    })
}

const findColors = (labels) => {
    return labels.map(label => {
        return getColor(parseFloat(label))
    })
}

const mapStateToProps = (state) => {
    const sizeLabels = ['1', '0.75', '0.5', '0.25']
    sizes = sizes || findSizes(sizeLabels)
    const hasNegatives = findNegatives(data)
    colorLabels = colorLabels || findColorLabels(hasNegatives)
    
    return {
        colorBy: colorRef[state['gene.color_by']].label,
        colorLabels,
        colors: findColors(colorLabels),
        geneLabel: 'ALK', // TODO state['gene.name'],
        hasNegatives,
        sizeBy: sizeRef[state['gene.size_by']].label,
        sizeLabels,
        sizes,
    }
}

const Legend = connect(
    mapStateToProps
)(Presentation)

export default Legend
