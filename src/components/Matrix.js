
// A table component with sortable columns.

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import MatrixHead from 'components/MatrixHead'

function getSorting(order, orderBy) {
    return order === 'desc' ?
        (a, b) => ((b[orderBy] > a[orderBy]) ? 1 : -1) :
        (a, b) => ((b[orderBy] < a[orderBy]) ? 1 : -1)
}

const styles = theme => ({
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
})

const dataVal = (val, j, numeric, background) => {

    // Set the background color if one was supplied for this column.
    let style = null
    if (background) {
        if (background.column === j) {
            style = {backgroundColor: background.color}
        }
    }
    const comp =
        <TableCell
            numeric={numeric}
            key={j}
            style={style}
        >
            {val}
        </TableCell>
    return comp
}

const dataRow = (row, i, head, classes) => {
    const comp =
        <TableRow
            className={classes.row}
            hover
            tabIndex={-1}
            key={i}
            data-id={row.name}
        >
            {head.map((col, j) =>
                dataVal(row[col.id], j, col.numeric, row.background)
            )}
        </TableRow>
    return comp
}

const Matrix = ({ data, head, order, width, classes, onRequestSort }) => {
    data.sort(getSorting(order.direction, order.property))
    return (
        <Paper style={{width: width}}>
            <Table
                aria-labelledby="tableTitle"
            >
                <MatrixHead
                    head={head}
                    order={order}
                    onRequestSort={onRequestSort}
                />
                <TableBody>
                    {data.map((row, i) =>
                        dataRow(row, i, head, classes)
                    )}
                </TableBody>
            </Table>
        </Paper>
    )
}

Matrix.propTypes = {
    data: PropTypes.array.isRequired,
    head: PropTypes.array.isRequired,
    order: PropTypes.object.isRequired,
    width: PropTypes.node,
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
}

export default withStyles(styles)(Matrix)
