
// The name to label, tooltip translations.

import colorMix from 'gene/colorMix'
import { background } from 'app/themeData'
import { get as rxGet } from 'state/rx'

const maxBubbleDiameter = 16 // pixel width
const minBubbleDiameter = 5  // pixel width
const negMagColor = '#0000ff'
const posMagColor = '#ff0000'

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

const normalizeColorVal = (val, colorNegMag, colorPosMag) => {
    // The algorithm assumes a range of -1 to 1 and interpolates between two
    // colors. We want to use three colors with positives between two colors
    // and negatives between two other colors. So normalize the value given as
    // any real number to be between -1 and 1.
    // We assume if colorNegMag exists, it is the negative of colorPosMag.
    let norm
    if (colorNegMag < 0) {
        if (val < 0) {
            norm = (colorPosMag - val) / (colorPosMag - colorNegMag) * 4 - 3
        } else {
            norm = (val - colorNegMag) / (colorPosMag - colorNegMag) * 4 - 3
            // normalize 0 to 1: (val - colorNegMag) / (colorPosMag - colorNegMag)
            // normalize -1 to 1: (4 * norm1) - 3
        }
    } else {
        // Normalize when there are no negative values.
        norm = (val - colorNegMag) / (colorPosMag - colorNegMag) * 2 - 1
    }
    return norm
}

const getColor = (val) => {
    const zeroColor = background
    const colorNegMag = rxGet('gene.colorNegMag')
    const colorPosMag = rxGet('gene.colorPosMag')

    if (val < 0) {
        return colorMix(normalizeColorVal(val, colorNegMag, colorPosMag),
            zeroColor, negMagColor)
    } else {
        return colorMix(normalizeColorVal(val, colorNegMag, colorPosMag),
                zeroColor, posMagColor)
    }
}

const stringToPrecision = (x, p) => {
    // Given a string number, return a string number
    // with the precision, p, which defaults to 3.
    p = p || 3
    return parseFloat(x).toPrecision(p)
}

const area = (radius) => {
    // Return area given a radius.
    return Math.PI * radius**2
}

const radius = (area) => {
    // Return the radius given an area.
    return Math.sqrt(area / Math.PI)
}

const sizeToRadius = (size) => {
    const minArea = area(minBubbleDiameter / 2)
    return radius(
        (area(maxBubbleDiameter / 2) - minArea) * size
            / rxGet('gene.sizeMag') + minArea)
}

export { colorRef, getColor, maxBubbleDiameter, minBubbleDiameter, sizeRef,
    sizeToRadius, stringToPrecision }
