
// The name to label, tooltip translations.

import colorMix from 'gene/colorMix'
import { background } from 'app/themeData'

const maxBubbleSize = 30 // pixel width
const minBubbleSize = 5  // pixel width
const negMagColor = '#0000ff'
const posMagColor = '#ff0000'
const sizeUnit = 'area' // or 'width' this does not make a difference

let colorMag = 0
let colorNegMag = 0
let colorPosMag = 0
let sizeMag = 0

const colorRef = {
    log2_change_vs_next: {
        label: 'log2 change vs next',
        tooltip: "'next' is the level of the second highest cluster, " +
            'therefore the 2nd cluster will always be 1',
        //rangeUnit: '>= 0',
    },
    log2_change_vs_min: {
        label: 'log2 change vs minimum',
        tooltip: 'min cluster.... mincluster will always be 0',
        //rangeUnit: '>= 0',
    },
    z_stat: {
        label: 'z-stat',
        tooltip: 'z-test statistic',
        //rangeUnit: 'real number',
    },
    t_stat: {
        label: 't-stat',
        tooltip: 't statistic of gene expression in/out of cluster',
        //rangeUnit: 'real number',
    },
}

const sizeRef = {
    sensitivity: {
        label: 'sensitivity',
        tooltip: '(n cells with >1 reads) / (n cells IN cluster) ',
        //rangeUnit: '0-1 proportion',
    },
    specificity: {
        label: 'specificity',
        tooltip: '(n cells with <1 reads) / (n cells OUT cluster)',
        //rangeUnit: '0-1 proportion',
    },
    precision: {
        label: 'precision',
        tooltip: '(n reads in cluster) / (total cells > 1)',
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
            // normalize between 0 and 1: (val - colorNegMag) / (colorPosMag - colorNegMag)
            // normalize between -1 and 1: (4 * norm1) - 3
        }
    } else {
        // Normalize when there are no negative values.
        norm = (val - colorNegMag) / (colorPosMag - colorNegMag) * 2 - 1
    }
    return norm
}

const getColor = (val) => {
    const zeroColor = background
    if (val < 0) {
        return colorMix(
            normalizeColorVal(val, colorNegMag, colorPosMag), zeroColor, negMagColor)
    } else {
        return colorMix(
            normalizeColorVal(val, colorNegMag, colorPosMag), zeroColor, posMagColor)
    }
}

const findColorVarMagnitudes = (solutions) => {
    // Find the magnitudes of sizes and colors.
    solutions.forEach((solution, i) => {
        solutions[i].clusters.forEach((cluster) => {
            colorPosMag = Math.max(cluster.color, colorPosMag)
            colorNegMag = Math.min(cluster.color, colorNegMag)
            sizeMag = Math.max(cluster.size, sizeMag)
        })
    })
    // Adjust the endpoints to be the same distance from zero.
    const mag = Math.max(colorPosMag, -colorNegMag)
    colorPosMag = mag
    colorNegMag = -mag
}

const stringToPrecision = (x, p) => {
    // Given a string number, return a string number with the specified
    // precision which defaults to 3.
    p = p || 3
    return parseFloat(x).toPrecision(p)
}

export { colorMag, colorRef, findColorVarMagnitudes, getColor,
    maxBubbleSize, minBubbleSize, colorNegMag, colorPosMag, sizeMag, sizeRef,
    sizeUnit, stringToPrecision }
