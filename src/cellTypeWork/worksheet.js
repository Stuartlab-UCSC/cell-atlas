
// The worksheet logic for the cell type worksheet page.

import { connect } from 'react-redux'
import { set as rxSet } from 'state/rx'
import fetchData from 'fetch/data'
import dataStore from 'cellTypeWork/dataStore'
import Presentation from 'cellTypeWork/worksheetPres'
//import getGeneTableData from 'cellTypeGene/table'
import transformToChart from 'cellTypeWork/transformToChart'
import testData from 'cellTypeWork/testData'

const USE_TEST_DATA = false

const clearContextElements = (dispatch, except) => {
    if (except !== 'cellTypes') {
        dispatch({ type: 'cellTypeWork.cellTypeInput.hide' })
    }
    if (except !== 'clusters') {
         dispatch({ type: 'cellTypeWork.contextMenu.close' })
    }
}

const receiveDataFromServer = (data) => {
    // Handle the data received from the server.
    
    // Kick off the request for the gene table for cluster
    if (data && data.gene_table_url) {
        console.log('data.gene_table_url:', data.gene_table_url)
        //getGeneTableData(data.gene_table_url)
    }
    rxSet('cellTypeWork.showChart.loading')
    transformToChart(data)
    rxSet('cellTypeWork.showChart.toQuietStatus')
    rxSet('cellTypeWork.firstChartDisplayed.now')
}

// A test stub in place of server query.
const fetchTestData = (id, url, receiveFx) => {
    //console.log('fetchTestData: id, url, receiveFx:', id, url, receiveFx)
    rxSet('cellTypeWork.fetchStatus.waiting')
    rxSet('cellTypeWork.fetchMessage.set', { value: 'waiting for data...' })
    //setTimeout(() => {
        receiveFx(testData)
        rxSet('cellTypeWork.fetchMessage.clear')
        rxSet('cellTypeWork.fetchStatus.quiet')
    //}, 1000)
}

const getData = () => {
    // Request the data from the server.
    let url = '/user/{user}/worksheet/worksheet1'
    if (USE_TEST_DATA) {
        fetchTestData('cellTypeWork', url, receiveDataFromServer)
    } else {
        fetchData('cellTypeWork', url, receiveDataFromServer)
    }
}

const serverRequest = (dispatch) => {
    dispatch({ type: 'cellTypeWork.showChart.toRequestStatus' })
    getData()
}

const mapStateToProps = (state) => {
    return {
        data: dataStore.get(),
        dims: state.cellTypeWork.dims,
        fetchMessage: state.cellTypeWork.fetchMessage,
        render: state.cellTypeWork.render,
        show: state.cellTypeWork.showSave,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            const value = ev.target.value
            dispatch({
                type: 'cellTypeWork.solutionRowCount.select',
                queryString: value,
            })
            dispatch({
                type: 'cellTypeWork.solutionSelected.uiSelect',
                value,
            })
        },
    }
}

const Worksheet = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default Worksheet

export { clearContextElements, serverRequest }
