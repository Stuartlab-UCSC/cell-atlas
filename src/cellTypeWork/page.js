// Cell type worksheet page logic.

import { connect } from 'react-redux'
import { serverRequest } from 'cellTypeWork/worksheet'
import Presentation from 'cellTypeWork/pagePres'
import dataStore from 'cellTypeWork/dataStore'

const mapStateToProps = (state) => {
    return {
        geneOrClusters: state.cellTypeGene.geneOrClusters,
        bubbleTooltip: state.bubble.tooltip,
        clusterSolution: dataStore.getClusterSolution(),
        dataset: dataStore.getDataset(),
        geneTableExpanded: state.cellTypeGene.expanded,
        scatterExpanded: state.cellTypeScatter.expanded,
        showEditables: state.cellTypeWork.showEditables,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGeneTableExpandChange: ev => {
            dispatch({ type: 'cellTypeGene.expanded.toggle' })
        },
        onScatterExpandChange: ev => {
            dispatch({ type: 'cellTypeScatter.expanded.toggle' })
        },
        onSaveClick: ev => {
            console.log('onSaveClick')
        },
        onUploadClick: ev => {
            dispatch({ type: 'cellTypeWork.showEditables.show' })
            serverRequest(dispatch)
        },
    }
}

const Page = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default Page
