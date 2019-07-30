
// The cluster worksheet sheet pick list logic.

import { connect } from 'react-redux'
import PickList from 'components/PickList'
import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/data'
import { getPostWorksheetData } from 'cellTypeWork/worksheet'

const DOMAIN = 'cellTypeSheet'

const USE_TEST_DATA = false
const testData = [
    'pbmc',  // as admin@replace.me
    // test@test.com/test
]
let lastUser = null

const receiveDataFromServer = (data) => {
    const error = rxGet(DOMAIN + '.fetchMessage')
    if (error !== null) {
        alert(error)
    } else if (data) {
        // Transform data from server and save it.
        let sheets = data.map(worksheet => {
            return { value: worksheet, name: worksheet }
        })
        rxSet('cellTypeWork.sheetList.load', { value: sheets })
    }
}

const getSheetListData = () => {
    // Load a new sheetList when the user changes or on initial page load.
    const initialPageLoaded = rxGet('cellTypeWork.initialPageLoaded')
    let user = rxGet('auth.user').name
    if (user === lastUser && initialPageLoaded) {
        return
    }
    if (!initialPageLoaded) {
        rxSet('cellTypeWork.initialPageLoaded.true')
    }
    lastUser = user
    
    // Now get the data.
    const url = '/user/worksheets'
    let options = { credentials: true }
    if (USE_TEST_DATA) {
        receiveData(DOMAIN, testData, receiveDataFromServer, options)
    } else {
        fetchData(DOMAIN, url, receiveDataFromServer, options)
    }
}

const mapStateToProps = (state) => {
    setTimeout(() => getSheetListData() )
    return {
        id: 'cell_type_work_sheet',
        label: 'Cell Type Worksheet',
        list: state.cellTypeWork.sheetList,
        placeholder: 'Select a worksheet',
        selected: state.cellTypeWork.sheetSelected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            const sheet = ev.target.value
            dispatch({
                type: 'cellTypeWork.sheetSelected.uiSelect',
                value: sheet,
            })
            dispatch({ type: 'cellTypeWork.showEditables.show' })
            getPostWorksheetData(sheet)
        },
    }
}

const SheetList = connect(
    mapStateToProps, mapDispatchToProps
)(PickList)

export default SheetList
export { getSheetListData }
