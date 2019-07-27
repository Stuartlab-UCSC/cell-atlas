
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

    changeColorBarSegment(barPosition, color, colormap) {
        // The colorbar segment takes on the index of the colormap member
        // that matches the color of the picked color.
        const index = colormap.findIndex(colorMapColor => {
            return (color === colorMapColor)
        })
        this.data.colorBar[barPosition] = index
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
        return this.data.clusterSolution
    }
    
    getClusters() {
        return this.data.clusters
    }
    
    getColorBy() {
        return this.data.colorBy
    }
    
    getColorBar() {
        return this.data.colorBar
    }
    
    getDataset() {
        return this.data.dataset
    }
    
    getGenes() {
        return this.data.genes
    }
    
    getSizeBy() {
        return this.data.sizeBy
    }
    
    load(data) {
        this.data = data
    }

    reorderCellTypes(cellTypes) {
        this.data.cellTypes = cellTypes
    }
    
    removeGene(genePosition, bubbles) {
        // Remove the gene and replace the bubbles.
        this.data.genes.splice(genePosition, 1)
        this.bubbles = bubbles
    }

    reorderClusters(clusters) {
        this.data.clusters = clusters
    }

    reorderGenes(genes) {
        this.data.genes = genes
    }
    
    setBubbles(bubbles) {
        this.data.bubbles = bubbles
    }

    setColorBar(position, color, colormap) {
        const index = colormap.findIndex(ccolor => {
            return (ccolor === color)
        })
        this.data.colorBar[position] = index
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
}

let dataStore = new DataStore(defaultData)

export default dataStore
