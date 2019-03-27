
// Logic to search for a gene.

import { connect } from 'react-redux'

import { get as rxGet } from 'state/rx'
import Presentation from 'gene/geneNamePres'
import { colorRef, sizeRef } from 'gene/reference'

let colorList = null
let sizeList = null

const mapStateToProps = (state) => {
    colorList = colorList || Object.keys(colorRef).map(color_by => {
        return { ...colorRef[color_by], value: color_by }
    })
    sizeList = sizeList || Object.keys(sizeRef).map(size_by => {
        return { ...sizeRef[size_by], value: size_by }
    })
    // Don't show variable selectors if on the home page or if there is
    // a fetch message to display. A null fetch message means an initial
    // valid fetch has been received.
    let selectors = (window.location.pathname === '/' ||
        state['gene.fetchMessage'] !== null)
        ? null
        : {
            colorList: colorList,
            colorValue: state['gene.color_by'],
            sizeList: sizeList,
            sizeValue: state['gene.size_by'],
        }
    return {
        errorMessage: state['gene.name.errorMessage'],
        selectors,
        value: state['gene.name'],
    }
}

const serverRequest = (dispatch) => {
    if (rxGet('gene.name').length < 1) {
        dispatch({
            type: 'gene.name.errorMessage.set',
            value: 'a gene name is required',
        })
    } else {
        //console.log('server request made')
        dispatch({ type: 'gene.fetchStatus.request' })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNameBlur: ev => {
            serverRequest(dispatch)
        },
        onNameChange: ev => {
            dispatch({
                type: 'gene.name.uiSet',
                value: ev.target.value,
            })
        },
        onNameKeyPress: ev => {
            if (ev.key === 'Enter') {
                ev.target.blur()
            }
        },
        onButtonClick: ev => {
            serverRequest(dispatch)
            if (window.location.pathname === '/') {
                // We are querying from the home page, so set the home redirect
                // so the next render of home will redirect to the gene chart
                // page.
                dispatch({type: 'home.redirect.set'})
            }
        },
        onColorChange: ev => {
            console.log('onColorChange')
            dispatch({
                type: 'gene.color_by.uiSet',
                value: ev.target.value,
            })
            serverRequest(dispatch)
        },
        onSizeChange: ev => {
            console.log('onSizeChange: value:', ev.target.value)
            dispatch({
                type: 'gene.size_by.uiSet',
                value: ev.target.value,
            })
            serverRequest(dispatch)
        },
    }
}

const GeneName = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GeneName
