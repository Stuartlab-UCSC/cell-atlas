
// Cell type sheet page state.

import { fontFamily } from 'app/themeData'

let renderSeq = 0  // A change here causes the worksheet to re-rendered
const defaultDims = {
    bubblesHeight: 0,
    bubblesWidth: 0,
    cellTypesHeight: 130,
    cellTypeLength: 156,
    clusterBarHeight: 22,
    colorBarHeight: 18,
    colorRange:{},
    colWidth: 18,
    clusterMarginTop: 10,
    initialPageLoaded: false,
    fontFamily,
    fontSize: 14,
    geneWidth: 130,
    NaNcolor: false,
    labelFontSize: 19,
    legendWidth: 130,
    rowHeight: 18,
    sizeRange:{},
}

const State = (
    state = {
        colormap: [],
        dims: defaultDims,
        fetchMessage: ' ',
        fetchStatus: 'quiet',
        geneMenu: null,
        menu: false,
        render: renderSeq++,
        showChart: false,
        topDrawer: true,
    }, action) => {
        switch(action.type) {
        case 'cellTypeWork.colormap.create':
            return {
                ...state,
                colormap: action.value
            }
        case 'cellTypeWork.dims.default':
            return {
                ...state,
                dims: defaultDims
            }
        case 'cellTypeWork.dims.set':
            return {
                ...state,
                dims: {
                    ...state.dims,
                    bubblesWidth: action.bubblesWidth,
                    bubblesHeight: action.bubblesHeight,
                    colorRange: action.colorRange,
                    sizeRange: action.sizeRange,
                    NaNcolor: action.NaNcolor,
                }
            }
        case 'cellTypeWork.fetchMessage.set':
            return {
                ...state,
                fetchMessage: action.value
            }
        case 'cellTypeWork.fetchMessage.clear':
        case 'cellTypeWork.fetchMessage.sheetRemove':
            return {
                ...state,
                fetchMessage: null
            }
        case 'cellTypeWork.fetchStatus.waiting':
            return {
                ...state,
                fetchStatus: 'waiting'
            }
        case 'cellTypeWork.fetchStatus.quiet':
            return {
                ...state,
                fetchStatus: 'quiet'
            }
        case 'cellTypeWork.geneMenu.irrelevant':
        case 'cellTypeWork.geneMenu.remove':
        case 'cellTypeWork.geneMenu.scatter':
        case 'cellTypeWork.geneMenu.sorting':
            return {
                ...state,
                geneMenu: null
            }
        case 'cellTypeWork.geneMenu.open':
            return {
                ...state,
                geneMenu: parseInt(action.value, 10),
            }
        case 'cellTypeWork.initialPageLoaded.true':
            return {
                ...state,
                initialPageLoaded: true
            }
        case 'cellTypeWork.menu.show':
            return {
                ...state,
                menu: true
            }
        case 'cellTypeWork.menu.hide':
            return {
                ...state,
                menu: false
            }
        case 'cellTypeWork.render.now':
            return {
                ...state,
                render: renderSeq++
            }
        case 'cellTypeWork.showChart.sheetRemove':
        case 'cellTypeWork.showChart.toRequestStatus':
            return {
                ...state,
                showChart: false
            }
        case 'cellTypeWork.showChart.loaded':
            return {
                ...state,
                showChart: true
            }
        case 'cellTypeWork.topDrawer.open':
            return {
                ...state,
                topDrawer: true
            }
        case 'cellTypeWork.topDrawer.close':
            return {
                ...state,
                topDrawer: false
            }
        default:
            return state
        }
    }

export default State
