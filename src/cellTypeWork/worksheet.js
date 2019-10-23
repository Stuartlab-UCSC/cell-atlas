
// The worksheet logic for the cell type worksheet page.

import { connect } from 'react-redux'
import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData from 'fetch/data'
import dataStore from 'cellTypeWork/dataStore'
import WorksheetPresentation from 'cellTypeWork/worksheetPres'
import transformToChart from 'cellTypeWork/transformToChart'
import testData from 'cellTypeWork/testData'
import transformToServerStore from 'cellTypeWork/transformToServerStore'
import { USE_TEST_DATA } from 'cellTypeSheet/sheetList'

const DOMAIN = 'cellTypeWork'

const clearContextElements = (except) => {
    // All context-specific element will be hidden except for the one specified.
    // @param except: the only domain to not clear, optional
    //console.error('clearContextElements: except:', except)
    // Wait a bit so the previous domain has a chance to finish what it's doing.
    setTimeout(() => {
        if (except !== 'cellTypeBarLabels') {
            rxSet('cellTypeBar.labelInput.irrelevant')
        }
        if (except !== 'cellTypeBar') {
            rxSet('cellTypeBar.menu.irrelevant')
        }
        if (except !== 'cellTypeCluster') {
            rxSet('cellTypeCluster.menu.irrelevant')
        }
        if (except !== 'cellTypeWorkGenes') {
             rxSet('cellTypeWork.geneMenu.irrelevant')
        }
    }, 100)
}

const addWorksheetToList = (worksheet) => {
    // Add the worksheet name to the pick-list.
    rxSet('cellTypeSheet.list.saveAsSheetLoaded',
        { value: worksheet })
    rxSet('cellTypeSheet.selected.saveAsSheetLoaded',
        { value: worksheet })
    rxSet('cellTypeSheet.ownedByUser.saveAsSheetLoaded',
        { value: worksheet })
}

const receivePostConfirmFromServer = () => {
    // Handle the post results received from the server.
    const error = rxGet(DOMAIN + '.fetchMessage')
    if (error === null) {
        // Look for the worksheet name in the 'save as' state.
        let worksheet = rxGet('cellTypeSheet.saveAs')
        if (worksheet) {
            addWorksheetToList(worksheet)
        }
    }
    // Clear the saveAs text on success or error.
    rxSet('cellTypeSheet.saveAs.clear')
}

const receiveDataFromServer = (data) => {
    // Handle the data received from the server.
    const error = rxGet(DOMAIN +'.fetchMessage')
    if (error) {
        rxSet('app.snackbar.open', {
            message: error,
            severity: 'error',
        })
        // Clear the upload name so we don't try to add it to the list later.
        rxSet('cellTypeSheetUpload.name.clear')
        
        // Clear the selection in the list since there will be no charts.
        rxSet('cellTypeSheet.selected.clearBeforeGet')
    }
    if (data === null) {
        return
    }
    
    // Save the data in the form needed for the UI.
    transformToChart(data)

    // Look for the worksheet name in the 'upload' state.
    let worksheet = rxGet('cellTypeSheetUpload.name')
    if (worksheet) {
        addWorksheetToList(worksheet)
        
        // Clear the upload name so we don't try to add it to the list later.
        rxSet('cellTypeSheetUpload.name.clear')
    }
    
    // Notify to re-render worksheet.
    rxSet('cellTypeWork.render.now')
    rxSet('cellTypeWork.showChart.loaded')

    // Set this as the selected sheet.
    rxSet('cellTypeSheet.ownedByUser.sheetLoaded',
        { value: rxGet('cellTypeSheet.selected') })
    
    // Indicate the first gene table for this worksheet has not displayed.
    rxSet('cellTypeGene.firstTableDisplayed.reset')
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
    if (!worksheetIn) {
        return
    }
    
    // Clear the old scatterplot and gene table.
    rxSet('cellTypeScatter.showChart.getNewWorksheet')
    rxSet('cellTypeGene.show.getNewWorksheet')
    
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
        show: state.cellTypeWork.showChart,
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
