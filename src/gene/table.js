
// The gene page table logic.

import { connect } from 'react-redux'
import React from 'react'

import { Bubble } from 'gene/bubble'
import DataTable from 'components/DataTable'
import { data } from 'gene/page'
import { getColor, maxBubbleDiameter, sizeToRadius } from 'gene/util'
import { onColumnSortChange } from 'gene/sort'

const addColumnOptions = (names) => {
    // Create column options returning a list of column objects.
    const cols = names.map(name => {
        let col = { name }
        if (name === 'color') {
            // The color column is not filterable nor searchable.
            // Show initial sort arrow.
            col.options = {
                filter: false,
                searchable: false,
                sortDirection: 'desc',
            }
        } else if (name === 'size') {
            // The size column is not filterable nor searchable.
            col.options = {
                filter: false,
                searchable: false,
            }
        } else if (name === ' ') {
            // Columns without a header label are not filterable, searchable
            // nor sortable.
            col.options = {
                //column: false,
                filter: false,
                searchable: false,
                sort: false,
            }
        }
        return col
    })
    return cols
}

const transform = (data, state) => {
    // Transform the data received from the server
    // into the structure needed for a dataTable.
    const colorNegMag = state['gene.colorNegMag']
    const colorPosMag = state['gene.colorPosMag']
    let maxClusterCount = 0
    // Outer loop handles each cluster solution.
    let cData = data.cluster_solutions.map((solution, i) => {
        // Inner loop handles each cluster in the solution.
        let row = [solution.dataset_name, solution.cluster_solution_name]
        solution.clusters.forEach((c, j) => {
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
    
    // Build the column header.
    let header = [
        'Dataset',
        'Cluster Solution',
        'color',
        'size',
    ].concat(new Array(maxClusterCount - 4).fill(' '))
    
    return { data: cData, columns: header }
}

const themeOverrides = () => {
    const style = {
        cell: {
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
        },
        row: {
            height: maxBubbleDiameter,
        },
    }
    return {
        overrides: {
            MUIDataTableBodyCell: {
                root: {...style.cell, borderBottom: 0 },
            },
            MUIDataTableBodyRow: {
                root: style.row,
            },
            MUIDataTableHeadCell: {
                // Set the width of header for size and color.
                root: {
                    ...style.cell,
                    '&:nth-child(3)': {
                        width: '3rem',
                    },
                    '&:nth-child(4)': {
                        width: '3rem',
                    },
                },
                //fixedHeader: style.cell,
            },
            MUIDataTableHeadRow: {
                root: style.row,
            },
            MUIDataTableToolbar: {
                left: {
                    position: 'absolute',
                    right: '-4rem',
                    top: '3rem',
                    width: '30rem',
                    zIndex: 200,
                },
            },
            MUIDataTable: {
                responsiveScroll: {
                    maxHeight: 'none',
                },
            },
        }
    }
}

const optionOverrideFx = (options, matchesFound) => {
    // Override some standard DataTable options.
    options.elevation = 0
    options.download = false
    options.responsive = 'scroll'
    options.onColumnSortChange = onColumnSortChange
    return options
}

const mapStateToProps = (state) => {
    const transformed = transform(data, state)
    const columns = addColumnOptions(transformed.columns)
    return {
        columns,
        data: transformed.data,
        optionOverrideFx,
        show: true, //state['gene.showChart'],
        themeOverrides: themeOverrides(),
        sort: state['gene.sort'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const Table = connect(
    mapStateToProps, mapDispatchToProps
)(DataTable)

export default Table
