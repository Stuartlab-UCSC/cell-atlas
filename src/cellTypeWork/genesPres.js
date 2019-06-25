// The worksheet of the cell type worksheet page.

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import 'cellTypeWork/style.css'

function GenesPresentation(props) {
    const ContextMenu = () => {
        const { menuPosition, onScatterPlotClick, onRemoveClick, onMenuClickAway
            } = props
        if (menuPosition === null) {
            return (null)
        }
        return (
            <Popper
                open={true}
                anchorEl={anchorRef[menuPosition].current}
                placement='right'
                className='popover_genes'
                style={{
                    width: '120px',
                    marginLeft: -8,
                }}
            >
                <ClickAwayListener onClickAway={onMenuClickAway}>
                    <MenuList
                        style={{
                            backgroundColor: 'white',
                            marginTop: 33,
                            marginLeft: 8,
                            padding: 0,
                            border: 'solid 1px #888',
                            borderRadius: 5,
                        }}
                    >
                        <MenuItem
                            data-position={menuPosition}
                            style={{
                                padding: '3 0',
                                fontSize: 12,
                            }}
                            onClick={onScatterPlotClick}
                        >
                            SCATTERPLOT
                        </MenuItem>
                        <MenuItem
                            data-position={menuPosition}
                            style={{
                                padding: '3 0',
                                fontSize: 12,
                            }}
                            onClick={onRemoveClick}
                        >
                            REMOVE
                        </MenuItem>
                    </MenuList>
                </ClickAwayListener>
            </Popper>
        )
    }


    const { genes, sorting, onMouseDown, onMouseLeave, onMouseOver } = props

    // Make references for each gene to anchor its context menu.
    let anchorRef =
        Array.from({length: genes.length}, v => React.useRef(null))

    const { geneWidth, rowHeight } = props.dims
    let tds = []
    genes.forEach((label, i) => {
        tds.push(
            <div
                data-position={i}
                data-domain='cellTypeWorkGenes'
                key={i}
                ref={anchorRef[i]}
                style={{
                    width: geneWidth,
                    paddingRight: 10,
                    height: rowHeight,
                    textAlign: 'right',
                    cursor: (sorting) ? 'grabbing' : 'grab',
                    userSelect: 'none',
                }}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
            >
                {label}
            </div>
        )
    })

    // Render the cluster bar.
    return (
        <div style={{
            display: 'inline-block',
            verticalAlign: 'top',
            marginTop: 3
        }} >
            <ContextMenu />
            {tds}
        </div>
    )
}

export default GenesPresentation
