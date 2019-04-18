
// The gene chart input header logic.

import { connect } from 'react-redux'

import Presentation from 'cellType/inputHeaderPres'
import { colorRef, sizeRef } from 'cellType/util'
import { onGeneSubmit, serverRequest } from 'cellType/page'

const showVars = (state) => {
    // Show the variable selectors if a fetch has occurred at least once.
    return (state.cellType.firstChartDisplayed)
}

const mapStateToProps = (state) => {
    let sizeList = Object.keys(sizeRef).map(size_by => {
        return { ...sizeRef[size_by], value: size_by }
    })
    const colorValue = state.cellType.color_by
    const sizeValue = state.cellType.size_by
    return {
        showVars: showVars(state),
        colorValue,
        colorTooltip: colorRef[colorValue].tooltip,
        sizeList,
        sizeValue,
        sizeTooltip: sizeRef[sizeValue].tooltip,
        showGene: state.cellType.showGene,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onColorChange: ev => {
            dispatch({
                type: 'cellType.color_by.uiSet',
                value: ev.target.value,
            })
            serverRequest(dispatch)
        },
        onSizeChange: ev => {
            dispatch({
                type: 'cellType.size_by.uiSet',
                value: ev.target.value,
            })
            serverRequest(dispatch)
        },
        onUploadClick: ev => {
            onGeneSubmit(dispatch)
            dispatch({ type: 'cellType.showGene.uploadComplete' })
        },
    }
}

const InputHeader = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default InputHeader
