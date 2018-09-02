
// A table head component with sortable columns.

import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const label = (col, order, onRequestSort) => {
    let active = false
    let direction = 'asc'
    if (order) {
        active = (order.property === col.id)
        direction = order.direction
    }

    let comp =
       <TableSortLabel
            active={active}
            direction={direction}
            onClick={onRequestSort}
        >
            {col.label}
        </TableSortLabel>
    return comp
}

const cell = (col, order, onRequestSort) => {
    let sortDirection = false
    if (order && order.property === col.id) {
        sortDirection = order.direction
    }
    let comp =
        <TableCell
            key={col.id}
            data-id={col.id}
            numeric={col.numeric}
            padding={col.disablePadding ? 'none' : 'default'}
            sortDirection={sortDirection}
        >
            {label(col, order, onRequestSort)}
        </TableCell>
    return comp
}

const MatrixHead = ({ head, order, onRequestSort }) => {
    return (
        <TableHead>
            <TableRow>
                {
                    head.map(col => cell(col, order, onRequestSort))
                }
            </TableRow>
        </TableHead>
    )
}

MatrixHead.propTypes = {
    head: PropTypes.array.isRequired,
    order: PropTypes.object,
    onRequestSort: PropTypes.func,
}

export default MatrixHead
