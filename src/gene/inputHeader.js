
// The gene chart input header logic.

import { connect } from 'react-redux'

import { get as rxGet } from 'state/rx'
import Presentation from 'gene/inputHeaderPres'
import { colorRef, sizeRef } from 'gene/util'
import { getData } from 'gene/page'

const serverRequest = (dispatch) => {
    if (rxGet('gene.name').length < 1) {
        dispatch({
            type: 'gene.nameErrorMessage.set',
            value: 'a gene name is required',
        })
    } else {
        dispatch({ type: 'gene.showChart.toRequestStatus' })
        getData()
    }
}

const showVars = (state) => {
    // Show the variable selectors if not on the home page and
    // a fetch has occurred at least once.
    return (window.location.pathname !== '/' &&
         state.gene.firstChartDisplayed)
}

const mapStateToProps = (state) => {
    let colorList = Object.keys(colorRef).map(color_by => {
        return { ...colorRef[color_by], value: color_by }
    })
    let sizeList = Object.keys(sizeRef).map(size_by => {
        return { ...sizeRef[size_by], value: size_by }
    })
    const colorValue = state.gene.color_by
    const sizeValue = state.gene.size_by
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
                type: 'gene.color_by.uiSet',
                value: ev.target.value,
            })
            serverRequest(dispatch)
        },
        onSizeChange: ev => {
            dispatch({
                type: 'gene.size_by.uiSet',
                value: ev.target.value,
            })
            serverRequest(dispatch)
        },
    }
}

const InputHeader = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export { serverRequest, showVars }

export default InputHeader
