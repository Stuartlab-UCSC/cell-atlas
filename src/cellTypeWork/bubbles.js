
// The bubble matrix logic for the cell type worksheet page.

import { connect } from 'react-redux'

import Presentation from 'cellTypeWork/bubblesPres'

const mapStateToProps = (state) => {
    return {
        data: state.cellTypeWork.data,
        dims: state.cellTypeWork.dims,
    }
}

const Bubbles = connect(
    mapStateToProps
)(Presentation)

export default Bubbles

