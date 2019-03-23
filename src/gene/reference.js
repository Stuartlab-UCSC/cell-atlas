
// The name to label, tooltip translations.

import { background } from 'app/themeData'
import colorMix from 'gene/colorMix'

const colorRef = {
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
    log2_change_vs_min: {
        label: 'log2 change vs minimum',
        tooltip: 'min cluster.... mincluster will always be 0',
        //rangeUnit: '>= 0',
    },
    log2_change_vs_next: {
        label: 'log2 change vs next',
        tooltip: "'next' is the level of the second highest cluster, " +
            'therefore the 2nd cluster will always be 1',
        //rangeUnit: '>= 0',
    },
}

const highNegColor = '#0000ff'
const highPosColor = '#ff0000'
const maxRadius = 30

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

const normalizeColorVal = (val) => {
    // The algorithm assumes a range of -1 to 1 and interpolates between two
    // colors. We want to use three colors with positives between two colors
    // and negatives between two other colors. So normalize the value given as
    // 0 to 1 to be between -1 and 1.
    return 2 * val - 1;
}

const getColor = (val) => {
    if (val < 0) {
        return colorMix(normalizeColorVal(-val), background, highNegColor)
    } else {
        return colorMix(normalizeColorVal(val), background, highPosColor)
    }
}

export { colorRef, getColor, maxRadius, sizeRef }
