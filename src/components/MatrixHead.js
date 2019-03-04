
// A table head component with sortable columns.

import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const label = (col, order, onRequestSort) => {
    // One displayed header label, which may contain a sort indicator.
    let active = false
    let direction = 'asc'
    if (order) {
        active = (order.columnPosition === col.position)
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

const Width = (col) => {
    // Find the width of one column
    let comp =
        <col style={{width: col.width}} />
    return comp
}

const Cell = ({col, order, onRequestSort}) => {
    // One header cell of the table.
    let comp =
        <TableCell
            data-column_position={col.position}
            data-label={col.label}
        >
            {label(col, order, onRequestSort)}
        </TableCell>
    return comp
}

const MatrixHead = ({ head, order, onRequestSort }) => {
    if (head.length < 1) {
        return null
    }
    return (
        <React.Fragment>
            <colgroup>
            {head.map((col) => (
                <Width
                    col={col}
                    key={col.position}
                 />
            ))}
            </colgroup>
            <TableHead>
                <TableRow>
                    {head.map((col) => (
                        <Cell
                            col={col}
                            order={order}
                            onRequestSort={onRequestSort}
                            key={col.position}
                        />
                    )
                )}
                </TableRow>
            </TableHead>
        </React.Fragment>
    )
}

MatrixHead.propTypes = {
    head: PropTypes.array.isRequired,
    order: PropTypes.object,
    onRequestSort: PropTypes.func,
}

export default MatrixHead
