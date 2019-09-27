// The worksheet of the cell type worksheet page.

import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { DeleteOutline, ScatterPlot } from '@material-ui/icons'
import { primaryColor } from 'app/themeData'
import 'cellTypeWork/style.css'

const Menu = ({ gene, i, props }) => {
    // Render a menu on hover.
    const { menuPosition, onMenuClickAway, onRemoveClick, onScatterClick }
        = props
    const { geneWidth } = props.dims
    if (menuPosition === null || menuPosition !== i) {
        return (null)
    }
    const iconStyle = { color: primaryColor, marginRight: '0.5rem' }
    return (
        <div
            className='popover_genes'
            style={{
                position: 'absolute',
                top: -28,
                left: geneWidth - 7,
                width: '7rem',
            }}
        >
            <ClickAwayListener onClickAway={onMenuClickAway}>
                <MenuList
                    style={{
                        marginTop: 0,
                        marginLeft: 8,
                        padding: 0,
                        border: 'solid 1px #888',
                        backgroundColor: 'white',
                        zIndex: 1,
                    }}
                >
                    <MenuItem
                        data-gene={gene}
                        data-position={menuPosition}
                        disableGutters={true}
                        style={{ fontSize: 14 }}
                        onClick={onScatterClick}
                    >
                        <ScatterPlot style={iconStyle} />
                        Map
                    </MenuItem>
                    <MenuItem
                        data-gene={gene}
                        data-position={menuPosition}
                        disableGutters={true}
                        style={{ fontSize: 14 }}
                        onClick={onRemoveClick}
                    >
                        <DeleteOutline style={iconStyle} />
                        Remove
                    </MenuItem>
                </MenuList>
            </ClickAwayListener>
        </div>
    )
}

const GeneList = ({ props }) => {
    const { genes, sorting, onMouseMove, onMouseOver } = props
    const { geneWidth, rowHeight } = props.dims
    
    // Build the labels.
    let geneList = []
    genes.forEach((gene, i) => {
        geneList.push(
            <div key={i} style={{position: 'relative'}} >
                <div
                    data-gene={gene}
                    data-position={i}
                    data-domain='cellTypeWorkGenes'
                    style={{
                        width: geneWidth,
                        paddingRight: 10,
                        height: rowHeight,
                        textAlign: 'right',
                        cursor: (sorting) ? 'grabbing' : 'grab',
                        userSelect: 'none',
                    }}
                    onMouseMove={onMouseMove}
                    onMouseOver={onMouseOver}
                >
                    {gene}
                </div>
                <Menu gene={gene} i={i} props={props} />
            </div>
        )
    })
    return geneList
}

const GenesPresentation = (props) => {
    // Render the gene list.
    return (
        <div style={{
            display: 'inline-block',
            verticalAlign: 'top',
            marginTop: 3
        }} >
            <GeneList props={props} />
        </div>
    )
}

export default GenesPresentation
