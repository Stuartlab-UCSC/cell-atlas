
// The gene page.

import { connect } from 'react-redux'


import { set as rxSet } from 'state/rx'
//import fetchData from 'fetch/fetch'
import testData from 'gene/data'
import Presentation from 'gene/pagePres'
import { findColorVarMagnitudes } from 'gene/reference'

let data = testData // TODO until server is going 
let prevFetchStatus = 'quiet'

const sortClustersBySize = (dataIn) => {
    // Sort the clusters within this solution by size.
    let data = dataIn.slice()
    data.sort(((a, b) => { return b.size - a.size }))
    return data
}

const sortSolutionsBySize = (solutions) => {
    // Sort the solutions by cluster sizes within the solution.
    const compare = (a, b) => {
        for (var i = 0; i < a.clusters.length; i++) {
            if (b === undefined || b === null) {
                break;
            }
            if (a.clusters[i].size !== b.clusters[i].size) {
                return b.clusters[i].size - a.clusters[i].size
            }
        }
        return 0
    }
    solutions.sort(compare)
    return solutions
}

const sortBySize = (solutions) => {
    solutions.forEach((solution, i) => {
        // Sort the clusters within this solution by size.
        solutions[i].clusters =
            sortClustersBySize(solution.clusters)
    })
    // Sort the solutions by cluster sizes within the solution.
    sortSolutionsBySize(solutions)
}

const receiveData = (data) => {
    // Handle the data received from the server.
    sortClustersBySize(data.cluster_solutions)
    findColorVarMagnitudes(data.cluster_solutions)
    rxSet('gene.fetchMessage.clear')
    rxSet('gene.fetchStatus.quiet')
}

const getData = () => {
    // Request the data from the server.
    rxSet('gene.fetchStatus.waiting')
    rxSet('gene.fetchMessage.set', { value: 'waiting for data...' })
    setTimeout(() => { receiveData(testData) }, 1000)
    /*
    let url =
        'gene/' + rxGet('gene.name') +
        '/size-by/' + rxGet('gene.size_by') +
        '/color-by/' + rxGet('gene.color_by') +
  
    //fetchData('gene', url, receiveData)
    */
}

const mapStateToProps = (state) => {
    // Handle any changes to the fetch status.
    let dataReady = false
    const status = state['gene.fetchStatus']
     if (status !== prevFetchStatus) {
        if (status === 'request') {
            //console.log('mapStateToProps:status:', status)
            getData()
        } else if (status === 'quiet') {
            //console.log('mapStateToProps:status:', status)
            dataReady = true
        }
        prevFetchStatus = status
    }
    //console.trace('mapStateToProps:message:', state['gene.fetchMessage'])
    sortBySize(data.cluster_solutions)

    return {
        data,
        expandedChart: state['gene.expanded'],
        message: state['gene.fetchMessage'],
        dataReady,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onExpandClick: ev => {
            dispatch({ type: 'gene.expanded.toggle' })
        },
    }
}


const GeneCharts = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GeneCharts
