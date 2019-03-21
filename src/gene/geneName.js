
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

    let selectors = (window.location.pathname === '/')
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
        value: state['gene.name.value'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNameChange: ev => {
            dispatch({
                type: 'gene.name.value.uiSet',
                value: ev.target.value,
            })
        },
        onButtonClick: ev => {
            if (rxGet('gene.name.value').length < 1) {
                dispatch({
                    type: 'gene.name.errorMessage.set',
                    value: 'a gene must be entered',
                })
            } else {
                dispatch({ type: 'gene.fetchStatus.request' })
                dispatch({ type: 'gene.name.errorMessage.clear' })
            }
        },
        onColorChange: ev => {
            console.log('onColorChange')
            dispatch({
                type: 'gene.color_by.uiSet',
                value: ev.target.value,
            })
        },
        onSizeChange: ev => {
            console.log('onSizeChange: value:', ev.target.value)
            dispatch({
                type: 'gene.size_by.uiSet',
                value: ev.target.value,
            })
        },
    }
}

const GeneName = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GeneName
