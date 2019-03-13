
// The database page table.

import React from 'react'
import { connect } from 'react-redux'
import MUIDataTable from 'lib/MUIDataTable/MUIDataTable'
import Typography from "@material-ui/core/Typography/Typography";

import { get as rxGet } from 'state/rx'
import { helperGetData } from 'state/matrixHelper'

const DatabaseTablePres = ({message, columns, data, options}) => {
    if (message) {
        return (
            <Typography>
                {message}
            </Typography>
        )
    } else if (data.length > 0) {
        return (
            <MUIDataTable
                title=''
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
    } else {
        return null
    }
}

const mapStateToProps = (state) => {
    let status = state['database.tableStatus']
    let data = state['database.tableData']
    let message = null
    if (status === 'requesting') {
        message = 'waiting for requested data...'
    } else if (status !== 'quiet') {
        // We'll assume there is a message to display.
        message = status
    }
    return {
        message,
        columns: state['database.tableColumn'],
        data,
    }
}

const DatabaseTable = connect(
    mapStateToProps,
)(DatabaseTablePres)

export const getData = (download) => {
    helperGetData('database', encodeURI('/sql/' + rxGet('database.query')))
}

export default DatabaseTable
