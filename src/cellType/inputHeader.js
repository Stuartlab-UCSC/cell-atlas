
// The gene chart input header logic.

import { connect } from 'react-redux'

import { set as rxSet } from 'state/rx'
import Presentation from 'cellType/inputHeaderPres'
import { sizeRef } from 'cellType/util'
import { getData } from 'cellType/page'

const serverRequest = (dispatch) => {
    dispatch({ type: 'cellType.showChart.toRequestStatus' })
    getData()
}

const showVars = (state) => {
    // Show the variable selectors if not on the home page and
    // a fetch has occurred at least once.
    return (window.location.pathname !== '/' &&
         state['cellType.firstChartDisplayed'])
}

const mapStateToProps = (state) => {
    let sizeList = Object.keys(sizeRef).map(size_by => {
        return { ...sizeRef[size_by], value: size_by }
    })
    const colorValue = state['cellType.color_by']
    const sizeValue = state['cellType.size_by']
    rxSet('geneName.helperInLabel.true')
    return {
        showVars: showVars(state),
        colorValue,
        colorTooltip: null,
        sizeList,
        sizeValue,
        sizeTooltip: sizeRef[sizeValue].tooltip,
        showGene: state['cellType.showGene'],
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
            dispatch({ type: 'cellType.showGene.uploadComplete' })
        },
    }
}

const InputHeader = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export { serverRequest, showVars }

export default InputHeader
