
// Store the chart data and handle all updates to it.

const defaultData = {
    dataset: '',
    clusterSolution: '',
    colorBy: '',
    sizeBy: '',
    bubbles: [],
    cellTypes: [],
    clusters: [],
    colorBar: [],
    genes: [],
}
/*
var apple = {
    type: "macintosh",
    color: "red",
    getInfo() {
        return this.color + ' ' + this.type + ' apple';
    }
}
*/
class DataStore {
    constructor(data) {
        this.data = data
    }

    addGene(gene, bubbles) {
        this.data.genes.push(gene)
        this.data.bubbles = bubbles
    }
    /*
        case 'cellTypeWork.data.newGene':
            newState = {...state, data: state.data}
            newState.data.bubbles = newState.data.bubbles.concat(action.bubbles)
            newState.data.genes = newState.data.genes.concat(action.gene)
            return newState
    */
    changeCellType(cellType, position) {
        this.data.cellTypes[position] = cellType

    }
    /*
            case 'cellTypeWork.data.cellTypeChange':
                newState = {
                    ...state,
                    data: state.data,
                }
                newState.data.cellTypes[action.position] = action.value
                return newState

    */
    changeColorBarSegment(barPosition, color, colormap) {
        // The colorbar segment takes on the index of the colormap member
        // that matches the color of the picked color.
        const index = colormap.findIndex(colorMapColor => {
            return (color === colorMapColor)
        })
        this.data.colorBar[barPosition] = index
    }
    /*
            case 'cellTypeWork.data.colorBar.uiSet':
                // The colorbar segment takes on the index of the colormap member
                // that matches the color of the picked color.
                const index = action.colormap.findIndex(color => {
                    return (color === action.color)
                })
                newState = {
                    ...state,
                    data: state.data,
                }
                newState.data.colorBar[action.position] = index
                return newState
    */
    get() {
        return this.data
    }
    getBubbles() {
        return this.data.bubbles
    }
    getCellTypes() {
        return this.data.cellTypes
    }
    getClusters() {
        return this.data.clusters
    }
    getColorBar() {
        return this.data.colorBar
    }
    getGenes() {
        return this.data.genes
    }
    load(data) {
        this.data = data
    }
    /*
            case 'cellTypeWork.data.load':
                console.log('cellTypeWork.data.load:', action.value)
                return {
                    ...state,
                    data: action.value
                }
    */
    reorderCellTypes(cellTypes) {
        this.data.cellTypes = cellTypes
    }
    /*
            case 'cellTypeWork.data.cellTypeReorder':
                return {
                    ...state,
                    data: {
                        ...state.data,
                        cellTypes: [...action.value]
                    }
                }
    */
    reorderClusters(clusters) {
        this.data.clusters = clusters
    }
    /*
            case 'cellTypeWork.data.clusterReorder':
                return {
                    ...state,
                    data: {
                        ...state.data,
                        clusters: [...action.value]
                    }
                }
    */
    reorderGenes(genes) {
        this.data.genes = genes
    }
    /*
            case 'cellTypeWork.data.geneReorder':
                return {
                    ...state,
                    data: {
                        ...state.data,
                        genes: [...action.value]
                    }
                }
    */
    setColorBar(position, color, colormap) {
        const index = colormap.findIndex(ccolor => {
            return (ccolor === color)
        })
        this.data.colorBar[position] = index
    }
    /*
            case 'cellTypeWork.data.colorBar.uiSet':
            // The colorbar segment takes on the index of the colormap member
            // that matches the color of the picked color.
            const index = action.colormap.findIndex(color => {
                return (color === action.color)
            })
            newState = {
                ...state,
                data: state.data,
            }
            newState.data.colorBar[action.position] = index
            return newState
    */
    setDefaults() {
        this.data = defaultData
    }
    /*
            case 'cellTypeWork.data.default':
                return {
                    ...state,
                    data: defaultData
                }
    */
}

let dataStore = new DataStore(defaultData)

export default dataStore
/*
export { addGene, changeColorBarSegment, changeCellType, getDataStore,
    loadDataStore, reorderCellTypes, reorderClusters, reorderGenes,
    setDefaultDataStore }
*/
