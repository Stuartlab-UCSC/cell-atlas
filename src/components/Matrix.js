
// A table component with sortable columns.

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import MatrixHead from 'components/MatrixHead'

const styles = theme => ({
    row: {
        '&:nth-of-type(even)': {
            backgroundColor: 'rgba(127,127,127,0.2)',
        },
    },
})

const dataVal = (val, j, numeric, chip) => {
    let style = null
    let formattedVal = val
    if (chip) {
        if (chip.column === j) {
            formattedVal =
                <Chip
                    label={val}
                    style = {{backgroundColor: chip.color, marginTop: '-0.5rem'}}
                />
        }
    } else if (val === undefined) {
        formattedVal = null
    } else if (numeric) {

        // Insert commas.
        formattedVal = val.toLocaleString()
    } else if (val === 'TBD') {

        // Give this one a different font.
        formattedVal =
            <Typography variant='caption'>
                {val}
            </Typography>
    }
    const comp =
        <TableCell
            numeric={numeric}
            key={j}
            style={style}
        >
            {formattedVal}
        </TableCell>
    return comp
}

const arrayDataRow = (row, i, head, classes, isArray) => {
    const comp =
        <TableRow
            className={classes.row}
            hover
            tabIndex={-1}
            key={i}
            data-position={i}
            data-id={row.id}
        >
            {head.map((col, j) =>
                dataVal(row[j], j)
            )}
        </TableRow>
    return comp
}

const dataRow = (row, i, head, classes) => {
    //TODO merge w/dataRow.
    const comp =
        <TableRow
            className={classes.row}
            hover
            tabIndex={-1}
            key={i}
            data-position={i}
            data-id={row.id}
        >
            {head.map((col, j) =>
                dataVal(row[col.id], j, col.numeric, row.chip)
            )}
        </TableRow>
    return comp
}

const tableBody = (data, head, classes) => {
    let comp
    if (typeof(data) === 'string') {
        // With string data, just display that string. Probably an error msg.
        comp =
            <TableBody>
                <TableRow
                    className={classes.row}
                    tabIndex={-1}
                >
                    <TableCell colSpan={2}>
                        {data}
                    </TableCell>
                </TableRow>
            </TableBody>
    } else if (Array.isArray(data[0])) {
        // Data is an array of arrays.
        comp =
            <TableBody>
                {data.map((row, i) =>
                    arrayDataRow(row, i, head, classes)
                )}
            </TableBody>

    } else {
        // Data must be an array of objects.
        comp =
            <TableBody>
                {data.map((row, i) =>
                    dataRow(row, i, head, classes)
                )}
            </TableBody>
    }

    return comp
}

const Matrix = ({ table, head, width, classes, onRequestSort }) => {
    return (
        <Paper style={{width: width, overflowX: 'auto'}}>
            <Table
                aria-labelledby="tableTitle"
            >
                <MatrixHead
                    head={head}
                    order={table.order}
                    onRequestSort={onRequestSort}
                />
                {tableBody(table.data, head, classes)}
            </Table>
        </Paper>
    )
}

Matrix.propTypes = {
    table: PropTypes.object.isRequired,
    head: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    width: PropTypes.node,
    onRequestSort: PropTypes.func,
}

export default withStyles(styles)(Matrix)
