
let renderSeq = 0  // A change here causes the gene table to re-rendered

const cellTypeGene = (
    state = {
        cluster: null,
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        firstTableDisplayed: false,
        geneSelected: null,
        render: renderSeq,
        statsNames: [],
    }, action) => {
        switch(action.type) {
        case 'cellTypeGene.cluster.uiSet':
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
        default:
            return state
        }
    }

let newDataSeq = 0
const cellTypeGeneClusters = (
    state = {
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        newData: newDataSeq,
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
        default:
            return state
        }
    }

export { cellTypeGene, cellTypeGeneClusters}
