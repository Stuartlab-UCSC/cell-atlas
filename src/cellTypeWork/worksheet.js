
// The worksheet logic for the cell type worksheet page.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData from 'fetch/data'
import dataStore from 'cellTypeWork/dataStore'
import WorksheetPresentation from 'cellTypeWork/worksheetPres'
import transformToChart from 'cellTypeWork/transformToChart'
import testData from 'cellTypeWork/testData'

const USE_TEST_DATA = false

const clearContextElements = (except) => {
    // All context-specific element will be hidden except for the one specified.
    // @param except: a domain
    if (except !== 'cellTypeWorkCellTypes') {
        rxSet('cellTypeWork.cellTypeInput.hide')
    }
    if (except !== 'cellTypeWorkClusters') {
         rxSet('cellTypeWork.clusterMenu.close')
    }
    if (except !== 'cellTypeWorkColorBar') {
        rxSet('cellTypeWork.colormapPicker.hide')
    }
    if (except !== 'cellTypeWorkGenes') {
         rxSet('cellTypeWork.geneMenu.close')
    }
}

const receiveDataFromServer = (data, error) => {
    // Handle the data received from the server.
    if (!error && data !== null) {
        transformToChart(data)
    }
    rxSet('cellTypeWork.showChart.toQuietStatus')
}

// A test stub in place of server query.
const fetchTestData = (id, url, receiveFx) => {
    rxSet('cellTypeWork.fetchStatus.waiting')
    rxSet('cellTypeWork.fetchMessage.set', { value: 'waiting for data...' })
    //setTimeout(() => {
        receiveFx(testData)
        rxSet('cellTypeWork.fetchMessage.clear')
        rxSet('cellTypeWork.fetchStatus.quiet')
    //}, 1000)
}

const getPostWorksheetData = (worksheet, optionsIn) => {
    // Request the data from, or save the data to the server.
    let options = optionsIn || {}
    options.credentials = true
    rxSet('cellTypeWork.showChart.toRequestStatus')
    const url =
        '/user/' + rxGet('auth.user').name +
        '/worksheet/' + worksheet || rxGet('cellTypeWork.sheetSelected')
    if (USE_TEST_DATA && !options.method) {
        // This is only for GETS.
        fetchTestData('cellTypeWork', url, receiveDataFromServer, options)
    } else {
        // Only GET test data, but always POST real data.
        fetchData('cellTypeWork', url, receiveDataFromServer, options)
    }
}

const mapStateToProps = (state) => {
    return {
        data: dataStore.get(),
        dims: state.cellTypeWork.dims,
        fetchMessage: state.cellTypeWork.fetchMessage,
        render: state.cellTypeWork.render,
        show: state.cellTypeWork.showEditables,
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
)(WorksheetPresentation)

export default Worksheet

export { clearContextElements, getPostWorksheetData }
