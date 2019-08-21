
// The gene table component for the cell type worksheet.

import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Add, ScatterPlot } from '@material-ui/icons'

const setGeneLinkProps = (cellValue, rowIndex, columnIndex) => {
    // Make the gene name look like a link.
    return { style: {
            textDecoration: 'underline',
            cursor: 'pointer',
            color: '#3f51b5',  // same as the icons in the table
        }}
}

const setScatterProps = (cellValue, rowIndex, columnIndex) => {
    // Center the scatter plot icon in the column.
    return { style: { marginLeft: 10 }}
}

const makeAbutton = (columns, data, name) => {
    // Insert a new column with a button.
    
    // Add a duplicate of the gene to the beginning of each row that gets
    // converted to a button.
    for (let i = 0; i < data.length; i++) {
        const gene = data[i][0]
        data[i].unshift(gene)
    }
    // Add the column info for the conversion to be performed on the value.
    columns.unshift(
        {
            name,
            options: {
                filter: false,
                searchable: false,
                sort: false,
                viewColumns: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <IconButton
                        data-gene={value}
                        size='small'
                        color='primary'
                        style={{
                            marginTop: -10,
                            marginLeft: -15,
                        }}
                    >
                        {(name === 'Add')
                            ? <Add />
                            : <ScatterPlot />}
                    </IconButton>
                )
            }
        }
    )
}

const makeButtons = (columns, data) => {
    // Make the gene link look like a link.
    columns[0].options.setCellProps = setGeneLinkProps
    
    makeAbutton(columns, data, 'Add')
    makeAbutton(columns, data, 'Map')
    
    // Center the scatter plot icon in the column.
    columns[0].options.setCellProps = setScatterProps
}

export default makeButtons
