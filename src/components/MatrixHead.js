
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
        active = (order.property === col.id)
        direction = order.direction
    }

    let comp =
       <TableSortLabel
            active={active}
            direction={direction}
            onClick={onRequestSort}
        >
            {col.label ? col.label : col.id}
        </TableSortLabel>
    return comp
}

const Width = (col) => {
    // Find the width of one column
    let comp =
        <col style={{width: col.width}} key={col.id} />
    return comp
}

const Cell = ({col, order, onRequestSort}) => {
    // One header cell of the table.
    let comp =
        <TableCell
            key={col.id}
            data-id={col.id}
            numeric={col.numeric}
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
            {head.map((col, i) => (
                <Width
                    col={col}
                    key={i}
                 />
            ))}
            </colgroup>
            <TableHead>
                <TableRow>
                    {head.map((col, i) => (
                        <Cell
                            col={col}
                            order={order}
                            onRequestSort={onRequestSort}
                            key={i}
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
