
const State = (
    state = {
        //fetchMessage: ' ',
        //fetchStatus: 'initial',
        cluster: '',
        firstRender: true,
        getTable: false,
        //showChart: false,
    }, action) => {
        switch(action.type) {
/*
        case 'cellTypeGene.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeGene.fetchMessage.clear':
            return {
                ...state,
                fetchMessage: null
            }
        case 'cellTypeGene.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellTypeGene.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
*/
        case 'cellTypeGene.cluster.uiSet':
            //console.log('cellTypeGene.cluster.uiSet:value', action.value)
            return {
                ...state,
                geneCluster: action.value
            }
        case 'cellTypeGene.firstRender.rendered':
            return {
                ...state,
                firstRender: false
            }
        case 'cellTypeGene.getTable.true':
            return {
                ...state,
                getGeneTable: true
            }
/*
        case 'cellTypeGene.showChart.sorting':
            return {
                ...state,
                showChart: false
            }
        case 'cellTypeGene.showChart.toQuietStatus':
            return {
                ...state,
                showChart: true
            }
        case 'cellTypeGene.showChart.toRequestStatus':
            return {
                ...state,
                showChart: false
            }
*/        default:
            return state
        }
    }

export default State
