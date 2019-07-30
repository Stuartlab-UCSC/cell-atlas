
// The name to label, tooltip translations.

const maxDiameter = 18 // pixel width
const minDiameter = 6  // pixel width

const areaFromRadius = (radius) => {
    // Return area given a radius.
    return Math.PI * radius**2
}

const minArea = areaFromRadius(minDiameter / 2)
const maxArea = areaFromRadius(maxDiameter / 2)

const radiusFromArea = (area) => {
    // Return the radius given an area.
    return Math.sqrt(area / Math.PI)
}

const sizeToRadius = (size, min, max) => {
    const normSize = (size - min) / (max - min)
    return radiusFromArea(((maxArea - minArea) * normSize) + minArea)
}

// Color references anad size references for name to label translations
// and for tooltip translations.
const colorRef = {
    log2_fold_change_vs_next: {
        label: 'log2 fold change vs next',
        tooltip: 'log2 fold change against the cluster with the second ' +
            'highest average expression',
        //rangeUnit: '>= 0',
    },
    log2_fold_change_vs_min: {
        label: 'log2 fold change vs minimum',
        tooltip: 'log2 fold change against the cluster with the lowest ' +
            'average expression',
        //rangeUnit: '>= 0',
    },
    z_stat: {
        label: 'proportions z test statistic',
        tooltip: 'z-test statistic when evaluated the proportion of +1 reads ' +
            'inside the cluster with the proportion of +1 reads outside the ' +
            'cluster',
        //rangeUnit: 'real number',
    },
    t_stat: {
        label: 't test statistic',
        tooltip: 't statistic when evaluating the gene expression of the ' +
            'cluster vs all other clusters',
        //rangeUnit: 'real number',
    },
    mean_expression: {
        label: 'mean expression',
        tooltip: 'mean of expression within the cluster',
        //rangeUnit: '>= 0',
    },
}

const sizeRef = {
    sensitivity: {
        label: 'support',
        tooltip: '(n cells with +1 reads in cluster) / (n cells in cluster)',
        //rangeUnit: '0-1 proportion',
    },
    specificity: {
        label: 'specificity',
        tooltip: '(n cells with no expression out of cluster) / (n cells out ' +
            'of cluster)',
        //rangeUnit: '0-1 proportion',
    },
    precision: {
        label: 'uniqueness',
        tooltip: '(n cells with +1 reads in cluster) / (all n cells with +1 ' +
            'reads)',
         //rangeUnit: '0-1 proportion',
    },
    accuracy: {
        label: 'association',
        tooltip: '(n cells with +1 reads in cluster) +  (n cells with no ' +
            ' expression out of cluster)  / (total number of cells )',
         //rangeUnit: '0-1 proportion',
    },
}

export { colorRef, sizeRef, maxDiameter, sizeToRadius }
