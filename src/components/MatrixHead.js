
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
                    {head.map(col => {
                        return (
                            <TableCell
                                key={col.id}
                                data-id={col.id}
                                numeric={col.numeric}
                                padding={col.disablePadding ?
                                    'none' : 'default'}
                                sortDirection={order.property === col.id ?
                                    order.direction : false}
                            >
                                <TableSortLabel
                                    active={order.property === col.id}
                                    direction={order.direction}
                                    onClick={onRequestSort}
                                >
                                    {col.label}
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
