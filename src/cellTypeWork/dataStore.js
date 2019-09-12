
// Store the chart data and handle all updates to it.

const defaultData = {
    group: null,
    dataset: '',
    description: '',
    clusterSolution: '',
    colorBy: '',
    sizeBy: '',
    bubbles: [],
    cellTypes: [],
    typeGroups: [],
    clusters: [],
    genes: [],
}

class DataStore {
    constructor(data) {
        this.data = data
    }

    addGene(gene, bubbles) {
        this.data.genes.push(gene)
        this.data.bubbles = bubbles
    }

    changeCellType(cellType, position) {
        this.data.cellTypes[position] = cellType
    }

    get() {
        return this.data
    }
    
    getBubbles() {
        return this.data.bubbles
    }
    
    getCellTypes() {
        return this.data.cellTypes
    }
    
    getClusterSolution() {
        return this.data.clusterSolution || ''
    }
    
    getClusters() {
        return this.data.clusters
    }
    
    getColorBy() {
        return this.data.colorBy
    }
    
    getDataset() {
        return this.data.dataset  || ''
    }
    
    getDescription() {
        return this.data.description || ''
    }
    
    getGenes() {
        return this.data.genes
    }
    
    getGeneTableUrl() {
        return this.data.geneTableUrl
    }
    
    getSizeBy() {
        return this.data.sizeBy
    }
    
    getSourceUser() {
        return this.data.sourceUser
    }
    
    getSourceWorksheet() {
        return this.data.sourceWorksheet
    }
    
    getTypeGroups = () => {
        return this.data.typeGroups
    }

    load(data) {
        this.data = data
    }

    removeGene(genePosition, bubbles) {
        // Remove the gene and replace the bubbles.
        this.data.genes.splice(genePosition, 1)
        this.bubbles = bubbles
    }

    reorderCellTypes(cellTypes) {
        this.data.cellTypes = cellTypes
    }
    
    reorderClusters(clusters) {
        this.data.clusters = clusters
    }

    reorderGenes(genes) {
        this.data.genes = genes
    }
    
    reorderTypeGroups(value) {
        this.data.typeGroups = value
    }
    
    setBubbles(bubbles) {
        this.data.bubbles = bubbles
    }

    setColorBy = (value) => {
        this.data.colorBy = value
    }

    setDefaults() {
        this.data = defaultData
    }

    setSizeBy = (value) => {
        this.data.sizeBy = value
    }
    
    setTypeGroups = (value) => {
        this.data.typeGroups = value
    }
}

let dataStore = new DataStore(defaultData)

export default dataStore
