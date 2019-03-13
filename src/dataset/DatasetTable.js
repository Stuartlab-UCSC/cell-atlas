
// The dataset page table.

import React from 'react'
import { connect } from 'react-redux'
import MUIDataTable from 'lib/MUIDataTable/MUIDataTable'

import { helperGetData } from 'state/matrixHelper'

const noFilterColumns = [
    'id',
    'uuid',
    'name',
    'cell_count',
    'description',
    'data_source_url',
    'publication_url',
]

const DatasetTablePres = ({columns, data, options}) => {
    return (
        <MUIDataTable
            title='Datasets'
            data={data}
            columns={columns}
            options={{
                downloadOptions: {
                    filename: 'stuartCellAtlas.tsv',
                    separator: '\t',
                    quotes: false,
                },
                filterType: 'checkbox',
                print: false,
                responsive: 'scroll',
                selectableRows: false,
                textLabels: {
                    toolbar: {
                        downloadCsv: 'Download TSV',
                    },
                },
            }}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        columns: state['dataset.tableColumn'],
        data: state['dataset.tableData'],
    }
}

const DatasetTable = connect(
    mapStateToProps,
)(DatasetTablePres)

export const getData = (download) => {
    helperGetData('dataset', encodeURI('/sql/select * from dataset'),
        noFilterColumns)
}

export default DatasetTable
