
// The bubble matrix logic for the cell type worksheet page.

import { connect } from 'react-redux'
import Presentation from 'cellTypeWork/bubblesPres'
import dataStore from 'cellTypeWork/dataStore'
import { clearContextElements } from 'cellTypeWork/worksheet'

const mapStateToProps = (state) => {
    return {
        data: dataStore.get(),
        dims: state.cellTypeWork.dims,
        geneCluster: state.cellTypeGene.cluster,
        render: state.cellTypeWork.render,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseOver: ev => {
            clearContextElements()
        },
    }
}

const Bubbles = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default Bubbles

