
// Presentational component for a dataTable.

import React from 'react'
import Typography from "@material-ui/core/Typography/Typography";
import MUIDataTable from 'lib/MUIDataTable/MUIDataTable'
import { integerToCommaInteger } from 'app/util'

const Header = ({ header }) => {
    const headerStyle = {
        position: 'relative',
        top: '-2.2rem',
        left: '-16rem',
    }
    return (
        <Typography variant='body2' style={headerStyle}>
            {header}
        </Typography>
    )
}

const onCellClick = (link) => {
    window.open(link)
}

const getMessage = (status) => {
    // Build a message depending on the table query status.
    let text = null
    if (typeof status === 'object' && status.message) {
        text = status.message
    } else if (status === 'waiting') {
        text = 'waiting for data...'
    }
    return text
}

const DatasetTable = ({ title, header, columns, data, status }) => {

    // If there is a message, render it rather than the data.
    const message = getMessage(status)
    if (message) {
        return (
            <Typography>
                {message}
            </Typography>
        )
        
    // If there is data, render the table.
    } else if (data.length > 0) {
 
        // Default the header if one was not provided.
        const headerOut = header ||
            (integerToCommaInteger(data.length) + ' matches found')

        return (
            <div style={{position: 'relative'}}>
                <MUIDataTable
                    title={title}
                    columns={columns}
                    data={data}
                    options={{
                        customToolbar: () => {
                            return (
                                <Header header={headerOut}/>
                            );
                        },
                        downloadOptions: {
                            filename: 'stuartCellAtlas.tsv',
                            separator: '\t',
                            quotes: false,
                        },
                        filterType: 'multiselect',
                        print: false,
                        responsive: 'scroll',
                        selectableRows: false,
                        textLabels: {
                            toolbar: {
                                downloadCsv: 'Download TSV',
                                filterTable: 'Filters',
                                viewColumns: 'Columns',
                            },
                        },
                        onCellClick: onCellClick,
                    }}
                />
            </div>
        )
    // Otherwise render nothing.
    } else {
        return null
    }
}

export default DatasetTable
