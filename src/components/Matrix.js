
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

const WIDTH = '100%'
const MIN_WIDTH = 1020

function getSorting(order, orderBy) {
    return order === 'desc' ?
        (a, b) => ((b[orderBy] > a[orderBy]) ? 1 : -1) :
        (a, b) => ((b[orderBy] < a[orderBy]) ? 1 : -1)
}

const styles = theme => ({
  root: {
    width: WIDTH,
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: MIN_WIDTH,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
})

const Matrix = ({ data, head, order, classes, onRequestSort }) => {
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <MatrixHead
              head={head}
              order={order.direction}
              orderBy={order.property}
              onRequestSort={onRequestSort}
            />
            <TableBody>
              {data
                .sort(getSorting(order.direction, order.property))
                .map(n => {
                  return (
                    <TableRow
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
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    )
}

Matrix.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Matrix)
