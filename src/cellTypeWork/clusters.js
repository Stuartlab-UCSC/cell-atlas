// The logic for the clusters and their info on the cell type worksheet.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import Presentation from 'cellTypeWork/clustersPres'
import { sortableOnMouseDown, sortableOnMouseLeave, sortableOnMouseOver }
    from 'app/sortable'
import { getGeneTableData } from 'cellTypeGene/table'
import { reorder as cellTypeReorder } from 'cellTypeWork/cellTypes'
import dataStore from 'cellTypeWork/dataStore'

const DOMAIN = 'cellTypeWorkClusters'
const mapStateToProps = (state) => {
    return {
        clusters: dataStore.getClusters(),
        colormap: state.cellTypeWork.colormap,
        dims: state.cellTypeWork.dims,
        mode: state.cellTypeWork.clusterMode,
        render: state.cellTypeWork.render,
        showButton: state.cellTypeWork.clusterButton,
        onMouseLeave: sortableOnMouseLeave,
    }
}

const reorder = (start, end) => {
    // Remove the cluster data from it's current position.
    const clusters = dataStore.getClusters()
    const cluster = clusters[start]
    clusters.splice(start, 1)
    // Insert the cluster data into its new position.
    clusters.splice(end, 0, cluster)
    dataStore.reorderClusters(clusters)
    // Also reorder the cell types the same.
    cellTypeReorder(start, end)
}

const onBodyClickForButton = ev => {
    // If the user clicks anywhere other than the gene stats button or message,
    // hide the button, set the mode to the default of 'sortable'.
    if (!ev.target) {
        return
    } else if (rxGet('cellTypeWork.clusterMode') === 'select') {
        // Click on the button or a cluster is ignored.
        if (ev.target.id === 'cellTypeWorkClusterButton'
            || ev.target.dataset.domain === DOMAIN) {
            return
        }
    } else {
        const parent = ev.target.parentElement
        if (parent && parent.id === 'cellTypeWorkClusterButton') {
            // Click on the button in sortable mode is ignored.
            return
        }
    }
    rxSet('cellTypeWork.clusterButton.hide')
    rxSet('cellTypeWork.clusterMode.sortable')
    document.body.removeEventListener('click', onBodyClickForButton)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGeneStatsButtonClick: ev => {
            // On click of the gene stats button
            // change the cluster mode from 'sortable' to 'select'.
            if (rxGet('cellTypeWork.clusterMode') === 'sortable') {
                dispatch({
                    type: 'cellTypeWork.clusterMode.select',
                })
            }
        },
        onClick: ev => {
            // On click of a cluster, retrieve that cluster's gene stats.
            if (rxGet('cellTypeWork.clusterMode') === 'sortable') {
                return
            }
            const cluster = dataStore.getClusters()[
                ev.target.dataset.position]
            dispatch({
                type: 'cellTypeGene.cluster.uiSet',
                value: cluster.name
            })
            getGeneTableData()
            
            // Change the cluster mode from 'select' to 'sortable'.
            dispatch({
                type: 'cellTypeWork.clusterMode.sortable',
            })
        },
        onMouseOver: ev => {
            // On mouse over any cluster,
            // show the button if the mouse is in sortable mode.
            if (rxGet('cellTypeWork.clusterMode') === 'sortable') {
                sortableOnMouseOver(ev)
                dispatch({ type: 'cellTypeWork.clusterButton.show'})
                // Add a listener for a click anywhere to hide the
                // gene stats button.
                document.body.addEventListener('click', onBodyClickForButton)
            }
        },
        onMouseDown: ev => {
            // Save the info for this cluster for sortable drag and drop.
            if (rxGet('cellTypeWork.clusterMode') === 'sortable') {
                const marker = {
                    width: '2px',
                    height: '20px',
                    topOffset: 0,
                    leftOffset: -1,
                }
                sortableOnMouseDown(
                    ev,
                    dataStore.getClusters().length,
                    DOMAIN,
                    marker,
                    reorder,
                    'x',
                    dispatch,
                )
            }
        },
    }
}

const CellTypes = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default CellTypes
