
// A table head component with sortable columns.

import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'

class MatrixHead extends React.Component {

  render() {
    const { head, order, orderBy, onRequestSort } = this.props

    return (
      <TableHead>
        <TableRow>
          {head.map(row => {
            return (
              <TableCell
                key={row.id}
                data-id={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={onRequestSort}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

MatrixHead.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
}

export default MatrixHead
