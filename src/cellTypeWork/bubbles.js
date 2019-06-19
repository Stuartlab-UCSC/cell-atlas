
// The bubble matrix logic for the cell type worksheet page.

import { connect } from 'react-redux'
import Presentation from 'cellTypeWork/bubblesPres'
import dataStore from 'cellTypeWork/dataStore'

const mapStateToProps = (state) => {
    return {
        data: dataStore.get(),
        dims: state.cellTypeWork.dims,
        render: state.cellTypeWork.render,
    }
}

const Bubbles = connect(
    mapStateToProps
)(Presentation)

export default Bubbles

