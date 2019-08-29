
let renderSeq = 0
export const defaultVariableList = [
]

const cellTypeGene = (
    state = {
        cluster: null,
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        filter: '',
        filterText: '',
        firstTableDisplayed: false, // the first gene table for this worksheet
        geneOrCluster: null,
        geneSelected: null,
        render: renderSeq,
        show: false,
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
        case 'cellTypeGene.filterText.init':
        case 'cellTypeGene.filterText.reset':
        case 'cellTypeGene.filterText.uiResetPressed':
            return {
                ...state,
                filterText: ''
            }
        case 'cellTypeGene.filterText.uiSet':
            return {
                ...state,
                filterText: action.value
            }
        case 'cellTypeGene.firstTableDisplayed.reset':
            return {
                ...state,
                firstTableDisplayed: false
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
        case 'cellTypeGene.show.now':
            return {
                ...state,
                show: true
            }
        case 'cellTypeGene.show.hide':
            return {
                ...state,
                show: false
            }
        case 'cellTypeGene.variableList.initialSelect':
            return {
                ...state,
                variableList: action.value
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
        filterList: [],
        filterText: '',
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
        case 'cellTypeGeneClusters.filterList.set':
            // The list of valid filtering genes.
            return {
                ...state,
                filterList: action.value
            }
        case 'cellTypeGeneClusters.filterText.uiSet':
            // The filtering genes text as entered by user.
            return {
                ...state,
                filterText: action.value
            }
        default:
            return state
        }
    }

const ctgVariable = (
    state = {
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        type: null,
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
