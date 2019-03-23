
// The gene page.

import { connect } from 'react-redux'


import { set as rxSet } from 'state/rx'
//import fetchData from 'fetch/fetch'
import data from 'gene/data'
import { setData } from 'gene/data'
import Presentation from 'gene/pagePres'

let prevFetchStatus = 'quiet'

const sortClustersBySize = (dataIn) => {
    let data = dataIn.slice()
    data.sort(((a, b) => { return b.size - a.size }))
    return data
}
/*
const sortSolutionsBySize = (dataIn) => {
    const compare = (a, b) => {
        for (var i = 0; i < data.solutions.length; i++) {
            if (b.clusters[i].size !== a.clusters[i].size) {
                return b.clusters[i].size - a.clusters[i].size
            }
        }
    }
 
    let data = dataIn.slice()
    data.cluster_solutions.sort(compare)
    return data
}
*/
const sortBySize = (dataIn) => {
    let solutions = dataIn.cluster_solutions.slice()
    solutions.forEach((solution, i) => {
        data.cluster_solutions.clusters = sortClustersBySize(solution.clusters)
    })
    //data.solutions = sortSolutionsBySize(data.solutions)
    return data
}

const receiveData = (dataIn) => {
    const newData = sortClustersBySize(dataIn)
    setData(newData)
    rxSet('gene.fetchStatus.quiet')
}

const getData = () => {
    receiveData(data)
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
    let message = null
    const status = state['gene.fetchStatus']
    if (status !== prevFetchStatus) {
        if (typeof status === 'object' && status.message) {
            message = status.message
        } else if (status === 'waiting') {
            message = 'waiting for data...'
        } else if (status === 'request') {
            getData()
        } else if (status === 'quiet') {
            dataReady = true
        }
        prevFetchStatus = status
    }
    setData(sortBySize(data)) // TODO until server is going

    return {
        message,
        dataReady,
        data,
    }
}

const GeneCharts = connect(
    mapStateToProps
)(Presentation)

export default GeneCharts
