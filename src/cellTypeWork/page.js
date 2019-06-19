// Cell type worksheet page logic.

import { connect } from 'react-redux'
import { serverRequest } from 'cellTypeWork/worksheet'
import Presentation from 'cellTypeWork/pagePres'
import dataStore from 'cellTypeWork/dataStore'

const mapStateToProps = (state) => {
    return {
        bubbleTooltip: state.bubble.tooltip,
        clusterSolution: dataStore.getClusterSolution(),
        dataset: dataStore.getDataset(),
        showSave: state.cellTypeWork.showSave,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveClick: ev => {
            console.log('onSaveClick')
        },
        onUploadClick: ev => {
            dispatch({ type: 'cellTypeWork.showSave.show' })
            serverRequest(dispatch)
        },
    }
}

const Page = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default Page
