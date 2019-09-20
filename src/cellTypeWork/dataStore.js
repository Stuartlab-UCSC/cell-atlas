
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

    changeCellType(label, position) {
        this.data.cellTypes[position].label = label
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

    setBubbles(bubbles) {
        this.data.bubbles = bubbles
    }

    setCellTypes(cellTypes) {
        this.data.cellTypes = cellTypes
    }
    
    setClusters(clusters) {
        this.data.clusters = clusters
    }

    setColorBy = (value) => {
        this.data.colorBy = value
    }

    setDefaults() {
        this.data = defaultData
    }

    setGenes(genes) {
        this.data.genes = genes
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
