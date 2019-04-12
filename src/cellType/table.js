
// The gene page table logic.

import { connect } from 'react-redux'
import React from 'react'

import { Bubble } from 'cellType/bubble'
import DataTable from 'components/DataTable'
import { data } from 'cellType/page'
import { getColor, sizeToRadius } from 'cellType/util'
import { optionOverrideFx, themeOverrides } from 'cellType/tableOverrides'
import colorCat from 'cellType/colorCat'
import { catAttrs } from 'cellType/colorCat'

const columnHeads = (maxClusterCount, state) => {
    // Find the column headers.
    let heads = [
        'datasetName',
        'compared to cluster',
        'cluster_solution_name',
        'species',
        'organ',
        'study',
        'color',
        'size'
    ]
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

const categoryOptions = (name, state) => {
    // Category columns' values display as colors rather than text.
    // Columns containing all the same value are not displayed.
    const sameValueColumns = state['cellType.sameValueColumns']
    let col = { name, options: {} }
    if (Object.keys(sameValueColumns).includes(name)) {
        col.options.display = 'excluded'
    } else {
        col.options.customBodyRender = customBodyRender
    }
    return col
}

const columnOptions = (maxClusterCount, state) => {
    // Create column options returning a list of column objects.
    const heads = columnHeads(maxClusterCount, state)
    return heads.map(name => {
        let col = { name }
        switch (name) {
        case 'color':
            // The color column is not filterable nor searchable.
            // Show initial sort arrow.
            col.options = {
                filter: false,
                searchable: false,
            }
            break
        case 'size':
            // The size column is not filterable nor searchable.
            col.options = {
                filter: false,
                searchable: false,
                sortDirection: 'desc',
            }
            break
        case ' ':
            // Columns without a header label are not filterable, searchable
            // nor sortable.
            col.options = {
                //column: false,
                filter: false,
                searchable: false,
                sort: false,
            }
            break
        default:
            if (catAttrs.includes(name)) {
                col = categoryOptions(name, state)
            }
        }
        return col
    })
}

const transform = (data, state) => {
    // Transform the data received from the server
    // into the structure needed for a dataTable.
    const colorNegMag = state['cellType.colorNegMag']
    const colorPosMag = state['cellType.colorPosMag']
    let maxClusterCount = 0
    // Outer loop handles each cluster solution.
    let cData = data.cluster_similarities.map((soln, i) => {
        // Inner loop handles each cluster in the solution.
        let row = [
            soln.dataset.name,
            soln.compared_to_cluster,
            soln.cluster_solution_name,
            soln.dataset.species,
            soln.dataset.organ,
            soln.dataset.study,
        ]
        soln.clusters.forEach((c, j) => {
            row.push(
                <Bubble
                    cell_count={c.cell_count}
                    color={c.color}
                    color_by={data.color_by}
                    colorRgb={getColor(c.color, colorNegMag, colorPosMag)}
                    name={c.name}
                    radius={sizeToRadius(c.size)}
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

const mapStateToProps = (state) => {
    const transformed = transform(data, state)
    const columns = columnOptions(transformed.maxClusterCount, state)
    return {
        columns,
        data: transformed.data,
        optionOverrideFx,
        show: true, // TODO state['cellType.showChart'],
        themeOverrides: themeOverrides(),
        sort: state['cellType.sort'],
    }
}

const Table = connect(
    mapStateToProps
)(DataTable)

export default Table
