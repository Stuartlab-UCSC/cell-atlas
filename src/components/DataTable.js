
// Presentational component for a dataTable.

import React from 'react'
import Typography from "@material-ui/core/Typography/Typography";
import MUIDataTable from 'lib/MUIDataTable/MUIDataTable'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { integerToCommaInteger } from 'app/util'

const Header = ({ header }) => {
    const headerStyle = {
        position: 'relative',
        top: '-2rem',
        left: '-22rem',
    }
    return (
        <Typography variant='body2' style={headerStyle}>
            {header}
        </Typography>
    )
}

const onCellClick = (link) => {
    // Open any link in a new tab.
    if (link.slice(0,4).toLowerCase() === 'http') {
        window.open(link)
    }
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

const setCellPropsFx = (value) => {
    // Make anything starting with 'http' look like a link.
    if (typeof value === 'string' && value.slice(0,4).toLowerCase() === 'http') {
        return { style: {
            textDecoration: 'underline',
            cursor: 'pointer',
            wordBreak: 'break-all',
            '&:hover': {
                color: 'blue' // doesn't work for some reason
            }
        }}
    }
    return {}
}

const formatHttpColumns = (columns) => {
    // If the columns not have a setCellProps function defined, then define it
    // to make http links look like http links. Set it for all columns so we
    // don't have to identify those columns that have http links.
    return columns.map(col => {
        let colObj = col
        if (typeof col === 'string') {
            // Convert this name to an object.
            colObj = { name: col, options: { setCellProps: setCellPropsFx } }
        } else if (col.options === undefined) {
            colObj.options = {setCellProps: setCellPropsFx}
        } else if (col.options.setcellProps === undefined) {
            colObj.options.setCellProps = setCellPropsFx
        }
        return colObj
    })
}

const buildOptions = (data, header, optionOverrideFx) => {
    let options = {
        customToolbar: () => {
            return (
                <Header header={header} />
            )
        },
        downloadOptions: {
            filename: 'stuartCellAtlas.tsv',
            separator: '\t',
            quotes: false,
        },
        filterType: 'multiselect',
        print: false,
        responsive: 'scroll',
        rowsPerPage: 50,
        rowsPerPageOptions: [25, 50, 100],
        selectableRows: false,
        textLabels: {
            toolbar: {
                downloadCsv: 'Download TSV',
                filterTable: 'Filters',
                viewColumns: 'Columns',
            },
        },
        onCellClick: onCellClick,
    }
    if (optionOverrideFx) {
        options = optionOverrideFx(options, integerToCommaInteger(data.length))
    }
    return options
}

const Table = ({ header, props }) => {
    const { title, columns, data, optionOverrideFx } = props
    const columnObjs = formatHttpColumns(columns)

    let comp =
        <MUIDataTable
            title={title}
            columns={columnObjs}
            data={data}
            options={ buildOptions(data, header, optionOverrideFx) }
        />
    return comp
}

const WithStyling = ({ header, props }) => {
    // TODO this may be better with setRowProps and setBodyProps.
    const { style } = props
    const getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTableBodyCell: {
                root: style.cell,
            },
            MUIDataTableBodyRow: {
                root: style.row,
            },
            MUIDataTableHeadCell: {
                root: style.cell,
                fixedHeader: style.cell,
            },
            MUIDataTableHeadRow: {
                root: style.row,
            },
            // Toolbar is specific to gene chart, but may be OK here.
            MUIDataTableToolbar: {
                actions: {
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0rem',
                },
                left: {
                    position: 'absolute',
                    right: '-4rem',
                    top: '3rem',
                    width: '30rem',
                    zIndex: 200,
                },
            },
            MuiTableCell: {
                root: style.cell,
                head: style.cell,
            },
            MuiTableRow: {
                root: style.row,
            },
            // Toolbar is specific to gene chart, but may be OK here.
            MuiToolbar: {
                root: {
                    position: 'relative',
                },
            },
        },
    })
    
    let comp =
        <MuiThemeProvider theme={getMuiTheme()}>
            <Table
                header={header}
                props={props}
            />
        </MuiThemeProvider>
    return comp
}

const DatasetTable = (props) => {
    const { data, header, style, status } = props

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

        if (style === undefined) {
            // Render the table without any additional styling.
            return (
                <div style={{position: 'relative'}}>
                    <Table
                        header={headerOut}
                        props={props}
                    />
                </div>
            )
        } else {
            // Render the table with the additional styling.
            return (
                <WithStyling
                    header={headerOut}
                    props={props}
                />
            )
        }
    // Otherwise render nothing.
    } else {
        return null
    }
}

export default DatasetTable
