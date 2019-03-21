
// The name to label, tooltip, range and units translation.
const ref = {
    sensitivity: {
        type: 'size_var',
        label: 'sensitivity',
        tooltip: '(+1 read considered a guess) / n cells IN cluster',
        rangeUnit: '0-1 proportion',
    },
    specificity: {
        type: 'size_var',
        label: 'specificity',
        tooltip: '(+1 read considered a guess) + (n reads < 1 out of cluster ' +
            '/ n cells OUT of cluster)',
        rangeUnit: '0-1 proportion',
    },
    precision: {
        type: 'size_var',
        label: 'precision',
        tooltip: 'n reads in cluster / total cells > 1',
        rangeUnit: '0-1 proportion',
    },
    z_stat: {
        type: 'color_var',
        label: 'z-stat',
        tooltip: 'z-test statistic',
        rangeUnit: 'real number',
    },
    t_stat: {
        type: 'color_var',
        label: 't-stat',
        tooltip: 't statistic of gene expression in/out of cluster',
        rangeUnit: 'real number',
    },
    log2_change_vs_min: {
        type: 'color_var',
        label: 'log2 change vs minimum',
        tooltip: 'min cluster.... mincluster will always be 0',
        rangeUnit: '>= 0',
    },
    log2_change_vs_next: {
        type: 'color_var',
        label: 'log2 change vs next',
        tooltip: "'next' is the level of the second highest cluster, " +
            'therefore the 2nd cluster will always be 1',
        rangeUnit: '>= 0',
    },
}

export default ref
