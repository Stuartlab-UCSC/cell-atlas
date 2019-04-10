
// Global dataTable option and theme overrides.

import { onColumnSortChange } from 'gene/sort'
import { maxBubbleDiameter } from 'gene/util'

const themeOverrides = () => {
    const style = {
        cell: {
            width: '0.5rem',
            '&:nth-child(0)': {
                minWidth: '0.5rem',
            },
            '&:nth-child(1)': {
                minWidth: '5rem',
            },
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
        },
        row: {
            height: maxBubbleDiameter,
        },
    }
    let theme = {
        overrides: {
            MUIDataTableBodyCell: {
                root: {...style.cell, borderBottom: 0 },
            },
            MUIDataTableBodyRow: {
                root: style.row,
            },
            MUIDataTableHeadCell: {
                // Set the width of header for size and color.
                root: style.cell,
                //fixedHeader: style.cell,
            },
            MUIDataTableHeadRow: {
                root: style.row,
            },
            MUIDataTableToolbar: {
                left: {
                    position: 'absolute',
                    right: '-4rem',
                    top: '3rem',
                    width: '30rem',
                    zIndex: 200,
                },
            },
            MUIDataTable: {
                responsiveScroll: {
                    maxHeight: 'none',
                },
            },
        }
    }
    return theme
}

const optionOverrideFx = (options) => {
    // Override some standard DataTable options.
    options.elevation = 0
    options.download = false
    options.onColumnSortChange = onColumnSortChange
    options.responsive = 'scroll'
    options.viewColumns = false
    return options
}

export { optionOverrideFx, themeOverrides }
