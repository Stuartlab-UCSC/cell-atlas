
let renderSeq = 0
export const defaultVariableList = [
]

const cellTypeGene = (
    state = {
        cluster: null,
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        firstTableDisplayed: false,
        geneOrCluster: null,
        geneSelected: null,
        render: renderSeq,
        statsNames: [],
        variableList: defaultVariableList,
    }, action) => {
        switch(action.type) {
        case 'cellTypeGene.cluster.load':
            return {
                ...state,
                cluster: action.value
            }
       case 'cellTypeGene.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'cellTypeGene.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeGene.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'cellTypeGene.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellTypeGene.firstTableDisplayed.set':
            return {
                ...state,
                firstTableDisplayed: true
            }
        case 'cellTypeGene.geneOrCluster.set':
            return {
                ...state,
                geneOrCluster: action.value
            }
        case 'cellTypeGene.geneSelected.uiSet':
            return {
                ...state,
                geneSelected: action.value
            }
        case 'cellTypeGene.render.now':
            return {
                ...state,
                render: renderSeq++
            }
        case 'cellTypeGene.variableList.load':
            return {
                ...state,
                variableList: action.value
            }
        default:
            return state
        }
    }

const cellTypeGeneClusters = (
    state = {
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        genePaste: '',
    }, action) => {
        switch(action.type) {
        case 'cellTypeGeneClusters.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'cellTypeGeneClusters.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeGeneClusters.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'cellTypeGeneClusters.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellTypeGeneClusters.genePaste.shift':
            // Remove the first gene of the list.
            let genes = ''
            const index = state.genePaste.indexOf('\n')
            if (index > -1) {
                genes = state.genePaste.slice(index + 1)
            }
            return {
                ...state,
                genePaste: genes
            }
        case 'cellTypeGeneClusters.genePaste.uiSet':
            return {
                ...state,
                genePaste: action.value
            }
        default:
            return state
        }
    }

const ctgVariable = (
    state = {
        fetchMessage: ' ',
        fetchStatus: 'quiet',
    }, action) => {
        switch(action.type) {
       case 'ctgVariable.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'ctgVariable.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'ctgVariable.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'ctgVariable.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'ctgVariable.type.color':
            return {
                ...state,
                type: 'color'
            }
        case 'ctgVariable.type.size':
            return {
                ...state,
                type: 'size'
            }
        default:
            return state
        }
    }

export { cellTypeGene, cellTypeGeneClusters, ctgVariable}
