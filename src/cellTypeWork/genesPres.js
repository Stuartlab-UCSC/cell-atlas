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
    //console.log('genesPres 11 menuPosition:', menuPosition)
    if (!genes) {
        return (null)
    }
    // Make references for each gene to anchor its context menu.
    let anchorRef =
        Array.from({length: genes.length}, v => React.useRef(null))

    const { geneWidth, rowHeight } = props.dims
    const geneStyle = {
        width: geneWidth,
        textAlign: 'right',
        height: rowHeight,
        paddingRight: 10,
        cursor: (sorting) ? 'grabbing' : 'grab',
        userSelect: 'none',
    }

    let tds = []
    genes.forEach((label, i) => {
        tds.push(
            <div
                data-position={i}
                data-domain='cellTypeWorkGenes'
                key={i}
                ref={anchorRef[i]}
                style={geneStyle}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
            >
                {label}
            </div>
        )
    })

    let comp = (
        <div style={{
            display: 'inline-block',
            verticalAlign: 'top',
            marginTop: '3px'
        }} >
            <ContextMenu />
            {tds}
        </div>
    )
    //console.log('genesPres last comp:', comp)
    return comp
}

export default GenesPresentation
