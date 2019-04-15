
// Gene name state.

import { onGeneSubmit as geneSubmit } from 'gene/page'
import { onGeneSubmit as cellTypeSubmit } from 'cellType/page'

const State = (
    state = {
        cellType: {
            name: '',
            helperInLabel: true,
            onReturnClick: cellTypeSubmit,
        },
        gene: {
            name: '',
            onReturnClick: geneSubmit,
        },
    }, action) => {
        let nState = { ...state }
        switch(action.type) {
        case 'geneName.name.uiSet':
            nState[action.id] = {
                ...state[action.id],
                name: action.value
            }
            return nState
        case 'geneName.errorMessage.clear':
            nState[action.id] = {
                ...state[action.id],
                errorMessage: null
            }

            return nState
        case 'geneName.errorMessage.set':
            nState[action.id] = {
                ...state[action.id],
                errorMessage: action.value
            }
            return nState
        default:
            return state
        }
    }

export default State
