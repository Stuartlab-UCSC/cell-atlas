
// The gene name input logic.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import Presentation from 'components/geneNamePres'

const isValidGeneName = (dispatch, id) => {
    if (rxGet('geneName.' + id + '.name').length < 1) {
        dispatch({
            type: 'geneName.errorMessage.set',
            value: 'a gene name is required',
            id,
        })
        return false
    }
    dispatch({ type: 'geneName.errorMessage.clear', id })
    return true
}

const mapStateToProps = (state) => {
    const route = window.location.pathname
    let id = 'gene' // home page uses same state as gene page
    if (route === '/prototypes/cellType') {
        id = 'cellType'
    }
    return {
        id,
        helperInLabel: state.geneName[id].helperInLabel,
        errorMessage: state.geneName[id].errorMessage,
        value: state.geneName[id].name,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNameChange: ev => {
            dispatch({
                type: 'geneName.name.uiSet',
                value: ev.target.value,
                id: ev.currentTarget.dataset.id,
            })
            /* for cellType:
            // TODO do we need both of these?
            dispatch({
                type: 'cellType.colorBy.uiSet',
                value: ev.target.value,
            })
            */
        },
    }
}

const GeneName = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GeneName
export { isValidGeneName }

