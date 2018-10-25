
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
            {col.label ? col.label : col.id}
        </TableSortLabel>
    return comp
}

const width = (col) => {
    let comp =
        <col style={{width: col.width}} key={col.id} />
    return comp
}

const cell = (col, order, onRequestSort) => {
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
    return (
        <React.Fragment>
            <colgroup>
                {
                    head.map(col => width(col))
                }
            </colgroup>

            <TableHead>
                <TableRow>
                    {
                        head.map(col => cell(col, order, onRequestSort))
                    }
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
