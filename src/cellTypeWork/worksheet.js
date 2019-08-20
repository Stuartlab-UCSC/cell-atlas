
// The worksheet logic for the cell type worksheet page.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData from 'fetch/data'
import dataStore from 'cellTypeWork/dataStore'
import WorksheetPresentation from 'cellTypeWork/worksheetPres'
import transformToChart from 'cellTypeWork/transformToChart'
import testData from 'cellTypeWork/testData'
import transformToServerStore from 'cellTypeWork/transformToServerStore'
import { USE_TEST_DATA } from 'cellTypeWork/sheetList'

const DOMAIN = 'cellTypeWork'

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
const receivePostConfirmFromServer = () => {
    // Handle the post results received from the server.
    const error = rxGet(DOMAIN + '.fetchMessage')
    if (error === null) {
        // Look for the worksheet name in the 'save as' state.
        let worksheet = rxGet('cellTypeWork.sheetSaveAs')
        if (worksheet) {
            // Add the worksheet name to the pick-list.
            rxSet('cellTypeWork.sheetList.saveAsWorksheetLoaded',
                { value: worksheet })
            rxSet('cellTypeWork.sheetSelected.saveAsWorksheetLoaded',
                { value: worksheet })
            rxSet('cellTypeWork.sheetOwnedByUser.saveAsWorksheetLoaded',
                { value: worksheet })
        }
    }
    // Clear the saveAs text on success or error.
    rxSet('cellTypeWork.sheetSaveAs.clear')
}

const receiveDataFromServer = (data) => {
    // Handle the data received from the server.
    const error = rxGet(DOMAIN +'.fetchMessage')
    if (error === null && data !== null) {
        transformToChart(data)
    }
    rxSet('cellTypeWork.showChart.toQuietStatus')
}

// A test stub in place of server query.
const fetchTestData = (id, url, receiveFx) => {
    rxSet('cellTypeWork.fetchStatus.waiting')
    rxSet('cellTypeWork.fetchMessage.set', { value: 'waiting for data...' })
    //setTimeout(() => {
        rxSet('cellTypeWork.fetchMessage.clear')
        rxSet('cellTypeWork.fetchStatus.quiet')
        receiveFx(testData)
    //}, 1000)
}

const getWorksheetData = (worksheetIn) => {
    // Request the data from the server.
    rxSet('cellTypeWork.showChart.toRequestStatus')
    // Initialize the variables as if the user owns the worksheet.
    let user = rxGet('auth.user').name
    let worksheet = worksheetIn
    const i = worksheetIn.indexOf('/')
    if (i > -1) {
        // The another user owns the worksheet
        user = worksheetIn.slice(0, i)
        worksheet = worksheetIn.slice(i + 1)
    }
    const url =
        '/user/' + user +
        '/worksheet/' + worksheet
    let options = { credentials: true }
    if (USE_TEST_DATA) {
        fetchTestData('cellTypeWork', url, receiveDataFromServer, options)
    } else {
        fetchData('cellTypeWork', url, receiveDataFromServer, options)
    }
}

const postWorksheetData = (worksheet) => {
    // Save the data to the server.
    const url =
        '/user/' + rxGet('auth.user').name +
        '/worksheet/' + worksheet
    const options = {
        credentials: true,
        method: 'POST',
        payload: transformToServerStore()
    }
    fetchData('cellTypeWork', url, receivePostConfirmFromServer, options)
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

export { clearContextElements, getWorksheetData, postWorksheetData }
