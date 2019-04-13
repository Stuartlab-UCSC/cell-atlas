
// Global dataTable option and theme overrides.

import { onColumnSortChange } from 'gene/sort'
import { maxBubbleDiameter } from 'gene/util'

const wideCell = {
    minWidth: '5rem',
    paddingRight: '0.5rem',
}
const narrowCell = {
    paddingRight: '0.5rem',
    //maxWidth: '30px',
}
const themeOverrides = () => {
    const style = {
        cell: {
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: 0,
            width: '0.5rem',
            '&:nth-child(2)': wideCell,
            '&:nth-child(4)': wideCell,
            '&:nth-child(6)': narrowCell,
            '&:nth-child(8)': narrowCell,
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
