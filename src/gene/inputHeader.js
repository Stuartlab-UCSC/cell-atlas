
// The gene chart input header logic.

import { connect } from 'react-redux'

import Presentation from 'gene/inputHeaderPres'
import { colorRef, sizeRef } from 'gene/util'
import { serverRequest } from 'gene/page'

const showVars = (state) => {
    // Show the variable selectors if not on the home page and
    // a fetch has occurred at least once.
    return (window.location.pathname !== '/' && state.gene.firstChartDisplayed)
}

const mapStateToProps = (state) => {
    let colorList = Object.keys(colorRef).map(colorBy => {
        return { ...colorRef[colorBy], value: colorBy }
    })
    let sizeList = Object.keys(sizeRef).map(sizeBy => {
        return { ...sizeRef[sizeBy], value: sizeBy }
    })
    const colorValue = state.gene.colorBy
    const sizeValue = state.gene.sizeBy
    return {
        showVars: showVars(state),
        colorList,
        colorValue,
        colorTooltip: colorRef[colorValue].tooltip,
        sizeList,
        sizeValue,
        sizeTooltip: sizeRef[sizeValue].tooltip,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onColorChange: ev => {
            dispatch({
                type: 'gene.colorBy.uiSet',
                value: ev.target.value,
            })
            serverRequest(dispatch)
        },
        onSizeChange: ev => {
            dispatch({
                type: 'gene.sizeBy.uiSet',
                value: ev.target.value,
            })
            serverRequest(dispatch)
        },
    }
}

const InputHeader = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default InputHeader
