
// The gene page component logic.

import { connect } from 'react-redux'

import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData from 'fetch/fetchData'
import testData from 'cellType/data'
import { summarizeCats, clearCats, catAttrs, gatherUniqueCats }
    from 'cellType/colorCat'
import Presentation from 'cellType/pagePres'
import { serverRequest } from 'cellType/inputHeader'
import { sortBy } from 'cellType/sort'
import { isValidGeneName } from 'cellType/geneName'

const USE_TEST_DATA = false
let data // the store for data outside of redux state

const findDerivedData = (solutions) => {
    // Find the values that are derived from the data.
    clearCats()
    let colorNegMag = 0
    let colorPosMag = 0
    let sizeMag = 0
    solutions.forEach((soln, i) => {
        
        // Find the unique categorical values.
        gatherUniqueCats({
            datasetName: soln.dataset.name,
            cluster_solution_name: soln.cluster_solution_name,
            species: soln.dataset.species,
            organ: soln.dataset.organ,
            study: soln.dataset.study,
        })

        // Find the color and size magnitudes.
        solutions[i].clusters.forEach((cluster) => {
            colorPosMag = Math.max(cluster.color, colorPosMag)
            colorNegMag = Math.min(cluster.color, colorNegMag)
            sizeMag = Math.max(cluster.size, sizeMag)
        })
    })
    
    // Assign colors to the categories & get a list of attrs with single values.
    const sameValueColumns = summarizeCats()

    rxSet('cellType.sameValueColumns.found', { value: sameValueColumns })
    
    // Save the magnitudes found.
    let mag
    let negMag
    if (colorNegMag < 0) {
        // Adjust the endpoints to be the same distance from zero.
        mag = Math.max(colorPosMag, -colorNegMag)
        negMag = -mag
    } else {
        // All values are positive.
        mag = colorPosMag
        negMag = 0
    }
    rxSet('cellType.colorNegMag.set', { value: negMag })
    rxSet('cellType.colorPosMag.set', { value: mag })
    rxSet('cellType.sizeMag.set', { value: sizeMag })
}

const receiveDataFromServer = (dataIn) => {
    // Handle the data received from the server.
    data = dataIn.resource  // save to our data area
    sortBy(data.cluster_similarities, 'size', 'descending')
    findDerivedData(data.cluster_similarities)
    rxSet('cellType.showChart.toQuietStatus')
    rxSet('cellType.firstChartDisplayed.set')
}


// A test stub in place of server query.
const fetchTestData = (gene, url, receiveFx) => {
    rxSet('cellType.fetchStatus.waiting')
    rxSet('cellType.fetchMessage.set', { value: 'waiting for data...' })
    setTimeout(() => {
        receiveFx(testData)
        rxSet('cellType.fetchMessage.clear')
        rxSet('cellType.fetchStatus.quiet')
    }, 1000)
}

const getData = () => {
    // Request the data from the server.
    let url =
        '/dotplot/cluster_solution/someUserClusterSolution' + // TODO
        '/color/' + rxGet('cellType.geneName')
        // /dotplot/cluster_solution/<cluster_solution_name>/color/<gene-name>
    if (USE_TEST_DATA) {
        fetchTestData('cellType', url, receiveDataFromServer)
    } else {
        fetchData('cellType', url, receiveDataFromServer)
    }
}

const mapStateToProps = (state) => {
    return {
        bubbleTooltip: state['cellType.bubbleTooltip'],
        catAttrs,
        data,
        message: state['cellType.fetchMessage'],
        sameValueColumns: state['cellType.sameValueColumns'],
        showChart: state['cellType.showChart'],
    }
}

const onSubmitClick = (dispatch) => {
    if (isValidGeneName(dispatch)) {
        serverRequest(dispatch)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const CellType = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export { getData, data, onSubmitClick, serverRequest }

export default CellType
