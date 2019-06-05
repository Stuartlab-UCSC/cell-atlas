
// The worksheet logic for the cell type worksheet page.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import Presentation from 'cellTypeWork/cellTypesPres'

const mapStateToProps = (state) => {
    return {
        clusters: state.cellTypeWork.data.clusters,
        cellTypes: state.cellTypeWork.data.cellTypes,
        dims: state.cellTypeWork.dims,
        drag: state.cellTypeWork.drag,
    }
}

const svgCursor = (i) => {
    // An attempt to create a cursor from the svg.
    const d = rxGet('cellTypeWork.dims')
    const x = d.geneWidth + d.colWidth * i
    const y = d.cellTypeHeight
    const clusters = rxGet('cellTypeWork.data.clusters')
    const cellType = rxGet('cellTypeWork.data.cellTypes')[i]
    document.body.style.cursor = "url('data:image/svg+xml;utf8," +
        '<svg' +
            ' height=' + d.cellTypeHeight +
            ' width=' + (d.geneWidth + d.bubblesWidth + d.legendWidth) +
        '>' +
            '<text' +
                ' x=' + x +
                ' y=' + y +
                ' fontSize=' + d.fontSize +
                ' fill=' + clusters[i].color +
                " transform='rotate(-45," + x + "," + (y-10) + "') " +
            '>' +
                cellType +
            '</text>' +
        '</svg>' +
        "') 24 24, auto"
//               transform={'rotate(-45,' + x + ',' + (y-10) + ')'}

    //document.body.style.cursor = "url('data:image/svg+xml;utf8," +
    //    svgCursor + "') 24 24, auto"
    //document.body.style.cursor = 'url(svgs/pointer.svg) 9 30 auto'
    //document.body.style.cursor = "url('data:image/svg+xml;utf8,"
    //+ "<svg fill="%23FF0000" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>"
    //+ "') 24 24, auto"

    //url(svgs/pointer.svg) 9 30 auto'
}

const mapDispatchToProps = (dispatch) => {
    return {
    
        onMouseOver: ev => {
            if (rxGet('cellTypeWork.drag.column') === null) {
                document.body.style.cursor = 'grab'
            } else {
                document.body.style.cursor = 'copy'
            }
        },
        
        onMouseLeave: ev => {
            document.body.style.cursor = 'default'
        },
        
        onMouseDown: ev => {
            const i = ev.target.dataset.column
            //svgCursor(i)
            document.body.style.cursor = 'default'

            // Save the page coordinates of where the mouse was pressed down.
            dispatch({
                type: 'cellTypeWork.drag.set',
                value: {
                    column: i,
                    mouseDownX: ev.pageX,
                },
            })
        },
        
        onMouseUp: ev => {
            document.body.style.cursor = 'default'
            const drag = rxGet('cellTypeWork.drag')
            const column = ev.target.dataset.column
            
            // If the mouseUp was on a different column than the mouseDown...
            if (drag.column !== null && drag.column !== column) {
            
                // Remove and insert the cellType in its new place in the list.
                const cellTypes = rxGet('cellTypeWork.data.cellTypes')
                const cellType = cellTypes[drag.column]
                cellTypes.splice(drag.column, 1)
                cellTypes.splice(column, 0, cellType)
                
                // Save the new order.
                dispatch({
                    type: 'cellTypeWork.data.cellTypeReorder',
                    value: cellTypes,
                })
            }
            // Reset the dragging variables.
            dispatch({
                type: 'cellTypeWork.drag.set',
                value: {
                    column: null,
                    mouseDownX: null,
                },
            })
        },
    }
}

const CellTypes = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypes
