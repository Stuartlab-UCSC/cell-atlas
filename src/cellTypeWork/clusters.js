// The logic for the clusters and their info on the cell type worksheet.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import Presentation from 'cellTypeWork/clustersPres'
import { sortableOnMouseDown, sortableOnMouseLeave, sortableOnMouseOver }
    from 'app/sortable'
import { reorder as cellTypeReorder } from 'cellTypeWork/cellTypes'

const mapStateToProps = (state) => {
    const data = state.cellTypeWork.data
    return {
        barColors: data.barColors,
        clusters: data.clusters,
        colormap: state.cellTypeWork.colormap,
        dims: state.cellTypeWork.dims,
        onMouseLeave: sortableOnMouseLeave,
        onMouseOver: sortableOnMouseOver,
    }
}

const reorder = (start, end) => {
    // Remove and insert the cluster column in its new place in the list.
    const clusters = rxGet('cellTypeWork.data.clusters')
    const cluster = clusters[start]
    clusters.splice(start, 1)
    clusters.splice(end, 0, cluster)
    rxSet('cellTypeWork.data.clusterReorder', {value: clusters})
    // Also reorder the cell types the same.
    cellTypeReorder(start, end)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseDown: ev => {

            const marker = {
                width: '2px',
                height: '20px',
                topOffset: 0, // -20,
                leftOffset: 0, // 3,
            }
            sortableOnMouseDown(
                ev,
                rxGet('cellTypeWork.data.clusters').length,
                'clusters',
                marker,
                reorder,
                'x',
                dispatch,
            )
        },
    }
}

const CellTypes = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypes
