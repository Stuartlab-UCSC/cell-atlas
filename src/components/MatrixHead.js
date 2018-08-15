
// A table head component with sortable columns.

import React from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

class MatrixHead extends React.Component {

    render() {
        const { head, order, onRequestSort } = this.props

        return (
            <TableHead>
                <TableRow>
                    {head.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                data-id={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ?
                                    'none' : 'default'}
                                sortDirection={order.property === row.id ?
                                    order.direction : false}
                            >
                                <TableSortLabel
                                    active={order.property === row.id}
                                    direction={order.direction}
                                    onClick={onRequestSort}
                                >
                                    {row.label}
                                </TableSortLabel>
                            </TableCell>
                        )
                    }, this)}
                </TableRow>
            </TableHead>
        )
    }
}

MatrixHead.propTypes = {
    head: PropTypes.array.isRequired,
    order: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
}

export default MatrixHead
