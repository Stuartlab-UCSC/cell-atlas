
// The bubble table logic.

import React from 'react'

import { get as rxGet } from 'state/rx'
import Bubble from 'bubble/bubble'
import { maxDiameter, sizeToRadius } from 'bubble/util'
import { getRangeColor } from 'color/range'
import { coloredAttrs } from 'color/colorCat'
import ColorColumn from 'bubble/colorColumn'

import { FIXED_BUBBLE_SIZE_AT_MAX } from 'cellType/page'

const DATASET_NAME_ONLY = false  // false: data includes only dataset_name

const columnInfo = (id, name) => {
    let columnInfo = {
        ' ': {
            name: ' ',
            options: {
                filter: false,
                searchable: false,
                sort: false,
            },
        },
        cluster_solution_name: {
            name: 'cluster solution',
            options: {},
        },
        color: {
            name: 'color',
            options: {
                filter: false,
                searchable: false,
            },
        },
        downloadButton: {
            name: 'download',
            options: {
                filter: false,
                searchable: false,
                sort: false,
            },
        },
        dataset_name: {
            name: 'dataset',
            options: {},
        },
        size: {
            name: 'size',
            options: {
                filter: false,
                searchable: false,
            },
        },
    }
    let info = columnInfo[name]
    if (!info) {
        return null
    }
    // The default sort depending on page and column name.
    if (id === 'cellType') {
        if (name === 'size') {
            info.options.sortDirection = 'desc'
        }
    } else if (name === 'color') {
        info.options.sortDirection = 'desc'
    }
    return info
}

const columnOptions = (id, heads, state) => {
    // Create column options as a list of objects.
    const sameValueColumns = state
        ? state[id].sameValueColumns
        : rxGet(id + '.sameValueColumns')
    return heads.map(name => {
        let col = columnInfo(id, name) || { name, options: {} }
            
        // Some columns have custom info.
        if (columnInfo[name]) {
            col = columnInfo[name]
        }
        // Don't show columns with all the same value.
        if (Object.keys(sameValueColumns).includes(name)) {
            col.options.display = 'excluded'
        }
        // Colored columns get custom rendering.
        if (coloredAttrs.includes(name)) {
            col.options.customBodyRender = ColorColumn
        }
        return col
    })
}

const tableTransform = (id, data, colorRef, sizeRef, state) => {
    // Transform the data received from the server
    // into the structure needed for a dataTable.
    const color = state ? state[id].colorRange : rxGet(id + '.colorRange')
    let maxClusterCount = 0
    // Outer loop handles each cluster solution.
    const solutions = (id === 'cellType')
        ? data.cluster_similarities
        : data.cluster_solutions
    let clusterHeads = []
    let cData = solutions.map((soln, i) => {
        // Inner loop handles each cluster in the solution.
        let row = [
            soln.dataset.name,
            soln.cluster_solution_name,
            soln.dataset.species,
            soln.dataset.organ,
            soln.dataset.study,
        ]
        if ((id === 'cellType')) {
            row.splice(1, 0, soln.compared_to_cluster)
        }
        if (DATASET_NAME_ONLY) {
            row = [soln.dataset.name, soln.cluster_solution_name]
        }
        const bub = state? state[id].bubbleRange : rxGet(id + '.bubbleRange')
        soln.clusters.forEach((c, j) => {
            // Save the cluster header labels
            if (i === 0) {
                clusterHeads.push(c.name)
            }
            let radius
            if (id === 'cellType' && FIXED_BUBBLE_SIZE_AT_MAX) {
                radius = maxDiameter / 2
            } else {
                radius = sizeToRadius(c.size, bub.min, bub.max)
            }
                
            row.push(
                <Bubble
                    cell_count={c.cell_count}
                    color={c.color}
                    color_by={colorRef[data.color_by].label}
                    colorRgb={getRangeColor(c.color, color.min, color.max)}
                    name={c.name}
                    radius={radius}
                    size={c.size}
                    size_by={sizeRef[data.size_by].label}
                />
            )
            maxClusterCount = Math.max(j + 1, maxClusterCount)
        })
        return row
    })
    return { data: cData, maxClusterCount, clusterHeads }
}

export { columnOptions, tableTransform }
