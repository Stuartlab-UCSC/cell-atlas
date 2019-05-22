// Cell type worksheet page logic.

import { connect } from 'react-redux'
import Presentation from 'cellTypeWork/pagePres'

const mapStateToProps = (state) => {
    return {
        clusterSolution: 'louvain100pcs',
        dataset: 'Heart of Cells in vivo, in vitro',
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
        },
    }
}

const Page = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default Page
