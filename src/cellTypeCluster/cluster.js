// The logic for the clusters and their info on the cell type worksheet.

import { connect } from 'react-redux'
import { rxSet } from 'state/rx'
import Presentation from 'cellTypeCluster/clusterPres'
import { buildTypeGroups } from 'cellTypeWork/transformToChart'

import dataStore from 'cellTypeWork/dataStore'
import { scatterColumnsReordered } from 'cellTypeScatter/scatter'

const mapStateToProps = (state) => {
    return {
        clusters: dataStore.getClusters(),
        dims: state.cellTypeWork.dims,
        render: state.cellTypeWork.render,
    }
}

const reorderColumns = (order) => {
    // Reorder columns given an array of new positions indexed
    // by the old positions.

    // Reorder the clusters.
    const oldClusters = dataStore.getClusters()
    const newClusters = oldClusters.map((cluster, oldC) => {
        return oldClusters[order[oldC]]
    })
    dataStore.setClusters(newClusters)

    // Update the scatter plot to the new colors.
    scatterColumnsReordered()

    // Reorder the cell Types.
    const oldCellTypes = dataStore.getCellTypes()
    const newCellTypes = oldCellTypes.map((type, oldC) => {
        return oldCellTypes[order[oldC]]
    })
    dataStore.setCellTypes(newCellTypes)

    // Rebuild the cell type groups.
    dataStore.setTypeGroups(buildTypeGroups(newCellTypes))
    
    // Re-render.
    rxSet('cellTypeWork.render.now')
}

const Clusters = connect(
    mapStateToProps
)(Presentation)

export default Clusters
export { reorderColumns }
