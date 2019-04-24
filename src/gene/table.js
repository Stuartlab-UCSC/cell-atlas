
// The gene page table logic.

import { connect } from 'react-redux'
import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/CloudDownload';

import { get as rxGet, set as rxSet }  from 'state/rx'
import { fetchAndDownload } from 'app/download'
import { tableTransform, columnOptions } from 'bubble/table'
import DataTable from 'components/DataTable'
import { data } from 'gene/page'
import { bubbleOptionOverrideFx, bubbleThemeOverrides }
    from 'bubble/tableOverrides'
import sortBy from 'bubble/sortBy'
import { colorRef, sizeRef } from 'gene/util'

let columns  // column metadata
let chartData // data in the format to be rendered
let themeOverrides  // theme overrides of the default material UI theme

const onColumnSortChange = (column, direction) => {
    if (column !== 'color' && column !== 'size') {
        return
    }
    sortBy(data.cluster_solutions, column, direction)
    rxSet('gene.sort.uiSet', { column, direction })
}

const optionOverrideFx = (options) => {
    options = bubbleOptionOverrideFx(options)
    options.onColumnSortChange = onColumnSortChange
    return options
}

const getThemeOverrides = () => {
    return bubbleThemeOverrides()
}

const onDownloadClick = (ev) => {
    const d = ev.currentTarget.dataset
    fetchAndDownload(d.dataset + '__' + d.cluster_solution + '.tsv', 'someUrl')
}

const downloadButtonRender = (value, tableMeta) => {
    // This renders the download button in a row.
    let comp = null
    if (tableMeta.rowData) {
        const style = {
            marginBottom: -12,
            marginRight: -12,
            marginTop: -12,
        }
        comp =
            <IconButton
                data-dataset={tableMeta.rowData[0]}
                data-cluster_solution={tableMeta.rowData[1]}
                style={style}
                onClick={onDownloadClick}
            >
                <DownloadIcon />
            </IconButton>
    }
    return comp
}

const columnHeads = (maxClusterCount) => {
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
    heads = heads.concat(new Array(maxClusterCount - 2).fill(' '))
    //heads.push('downloadButton')
    return heads
}

const tableNewData = (data) => {
    // Executed whenever we get new data from the server.
    if (rxGet('gene.firstChartDisplayed')) {
        // Initialize
        themeOverrides = getThemeOverrides()
    }
    const transformed = tableTransform('gene', data, colorRef, sizeRef)
    chartData = transformed.data
    columns = columnOptions('gene', columnHeads(transformed.maxClusterCount))
    // Set the render function for the download button
    // which is the last column in the table.
    columns[columns.length - 1].options.customBodyRender = downloadButtonRender
}

const mapStateToProps = (state) => {
    return {
        columns,
        data: chartData,
        optionOverrideFx,
        show: true, //state.gene.showChart,
        themeOverrides,
        sort: state.gene.sort,
    }
}

const Table = connect(
    mapStateToProps
)(DataTable)

export default Table

export { tableNewData }
