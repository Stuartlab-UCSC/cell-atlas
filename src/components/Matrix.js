
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

const Matrix = ({ data, head, order, width, classes, onRequestSort }) => {
    return (
        <Paper style={{width: width}}>
            <Table aria-labelledby="tableTitle">
                <MatrixHead
                    head={head}
                    order={order}
                    onRequestSort={onRequestSort}
                />
                <TableBody>
                    {data
                        .sort(getSorting(order.direction, order.property))
                        .map(n => {
                            return (
                                <TableRow
                                    className={classes.row}
                                    hover
                                    tabIndex={-1}
                                    key={n.id}
                                >
                                <TableCell>{n.name}</TableCell>
                                <TableCell>{n.format}</TableCell>
                                <TableCell numeric>{n.size}</TableCell>
                                <TableCell>{n.date}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </Paper>
    )
}

Matrix.propTypes = {
  data: PropTypes.array.isRequired,
  head: PropTypes.array.isRequired,
  order: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
}

export default withStyles(styles)(Matrix)
