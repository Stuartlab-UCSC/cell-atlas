
// The gene page table logic.

import { connect } from 'react-redux'
import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/CloudDownload';

import { get as rxGet, set as rxSet }  from 'state/rx'
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
let transformed

const optionOverrideFx = (options) => {
    options = bubbleOptionOverrideFx(options)
    options.onColumnSortChange = onColumnSortChange
    return options
}

const getThemeOverrides = () => {
    return bubbleThemeOverrides()
}

const downloadButtonRender = (value, tableMeta) => {
    // This renders the download button in a row.
    let comp = null
    if (tableMeta.rowData) {
        const href =
            process.env.REACT_APP_DATA_URL +
            '/dataset/' + tableMeta.rowData[0] +
            '/cluster-solution/' + tableMeta.rowData[1] +
            '/cell-assignments'
        const style = {
            marginBottom: -12,
            marginRight: -12,
            marginTop: -12,
        }
        comp =
            <IconButton
                href={href}
                download
                target='_blank'
                style={style}
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

const tableRefresh = (newData) => {
    if (rxGet('gene.firstChartDisplayed')) {
        // Initialize
        themeOverrides = getThemeOverrides()
    }
    const s = rxGet('gene.sort')
    rxSet('gene.showChart.sorting')
    sortBy(data.cluster_solutions, s.column, s.direction)
    transformed = tableTransform('gene', data, colorRef, sizeRef)
    chartData = transformed.data
    if (newData) {
        // Find the column info for new data.
        columns = columnOptions(
            'gene', columnHeads(transformed.maxClusterCount))
        // Set the render function for the download button
        // which is the last column in the table.
        columns[columns.length - 1].options.customBodyRender
            = downloadButtonRender
    }
    rxSet('gene.showChart.toQuietStatus')
}

const tableNewData = (data) => {
    // Executed whenever we get new data from the server.
    if (rxGet('gene.firstChartDisplayed')) {
        // Initialize
        themeOverrides = getThemeOverrides()
    }
    tableRefresh(true)
}

const onColumnSortChange = (column, direction) => {
    if (column !== 'color' && column !== 'size') {
        return
    }
    rxSet('gene.sort.uiSet', { column, direction })
    tableRefresh()
}

const mapStateToProps = (state) => {
    return {
        columns,
        data: chartData,
        optionOverrideFx,
        show: state.gene.showChart,
        themeOverrides,
    }
}

const Table = connect(
    mapStateToProps
)(DataTable)

export default Table

export { tableNewData }
