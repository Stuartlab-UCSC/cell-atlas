

// The gene page table logic.


import React from 'react'

import Bubble from 'bubble/bubble'
import { sizeToRadius } from 'bubble/util'
import { getRangeColor } from 'color/range'
import colorCat from 'color/colorCat'
import { coloredAttrs } from 'color/colorCat'

const DATASET_NAME_ONLY = false  // false: data includes only dataset_name

const columnHeads = (id, maxClusterCount) => {
    // Find the column headers.
    let heads = [
        'datasetName',
        'cluster_solution_name',
        'species',
        'organ',
        'study',
        'color',
        'size'
    ]
    if (DATASET_NAME_ONLY) {
        heads = [
            'dataset',
            'cluster_solution_name',
            'color',
            'size'
        ]
    }
    if (id === 'cellType') {
        heads.splice(1, 1, 'compared_to_cluster')
    }
    // Set the rest of the bubble column headers to blank.
    return heads.concat(new Array(maxClusterCount - 2).fill(' '))
}

const customBodyRender = (value, tableMeta) => {
    const attr = tableMeta.columnData.name
    let comp = null
    if (attr) {
        comp =
            <div
                style={{
                    backgroundColor: colorCat[attr][value],
                    width: '1rem',
                    height: 28,
                }}
            />
    }
    return comp
}

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
    if (id === 'cellType') {
        if (name === 'size') {
            info.options.sortDirection = 'desc'
        }
    } else if (name === 'color') {
        info.options.sortDirection = 'desc'
    }
    return info
}

const columnOptions = (id, maxClusterCount, state) => {
    // Create column options as a list of objects.
    const heads = columnHeads(id, maxClusterCount)
    const sameValueColumns = state[id].sameValueColumns
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
            col.options.customBodyRender = customBodyRender
        }
        return col
    })
}

const tableTransform = (id, data, state) => {
    // Transform the data received from the server
    // into the structure needed for a dataTable.
    const color = state[id].colorRange
    let maxClusterCount = 0
    // Outer loop handles each cluster solution.
    const solutions = (id === 'cellType')
        ? data.cluster_similarities
        : data.cluster_solutions
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
            row.splice(1, 1, soln.compared_to_cluster)
        }
        if (DATASET_NAME_ONLY) {
            row = [soln.dataset.name, soln.cluster_solution_name]
        }
        const bub = state[id].bubbleRange
        soln.clusters.forEach((c, j) => {
            row.push(
                <Bubble
                    cell_count={c.cell_count}
                    color={c.color}
                    color_by={data.color_by}
                    colorRgb={getRangeColor(c.color, color.min, color.max)}
                    name={c.name}
                    radius={sizeToRadius(c.size, bub.min, bub.max)}
                    size={c.size}
                    size_by={data.size_by}
                />
            )
            maxClusterCount = Math.max(j + 1, maxClusterCount)
        })
        return row
    })
    return { data: cData, maxClusterCount }
}

export { columnOptions, tableTransform }
