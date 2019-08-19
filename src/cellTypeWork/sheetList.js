
// The cluster worksheet sheet pick list logic.

import { connect } from 'react-redux'
import PickList from 'components/PickList'
import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/data'
import { getWorksheetData } from 'cellTypeWork/worksheet'

const USE_TEST_DATA = true
const DOMAIN = 'cellTypeSheet'

const testData = [
    'pbmc',  // as admin@replace.me
    // test@test.com/test
]
let prevUser = null

const receiveDataFromServer = (data) => {
    // Transform data from server into that needed for the pick list.
    const error = rxGet(DOMAIN + '.fetchMessage')
    if (error !== null) {
        alert(error)
    } else if (data) {
        const user = rxGet('auth.user').name
        // Find the worksheets owned by the user.
        let userSheets = data.filter(sheet => {
            const i = sheet.indexOf('/')
            return (i < 0 || sheet.slice(0, i) === user)
        })
        userSheets.sort()
        // Find the worksheets owned by others.
        let otherSheets = data.filter(sheet => {
            const i = sheet.indexOf('/')
            return (i > -1 && sheet.slice(0, i) !== user)
        })
        otherSheets.sort()
        // Transform the sheets owned by the user, stripping off the user name.
        let sheets = userSheets.map(sheet => {
            const i = sheet.indexOf('/')
            const name = sheet.slice(i+1)
            return { value: name, name: name }
        })
        // Transform the sheets owned by others.
        sheets.push(...otherSheets.map(name => {
            return { value: name, name: name }
        }))
        rxSet('cellTypeWork.sheetList.load', { value: sheets })
    }
}

const getSheetListData = () => {
    // Load a new sheetList when the user changes or on initial page load.
    const initialPageLoaded = rxGet('cellTypeWork.initialPageLoaded')
    let user = rxGet('auth.user').name
    if (user === prevUser && initialPageLoaded) {
        return
    }
    if (!initialPageLoaded) {
        rxSet('cellTypeWork.initialPageLoaded.true')
    }
    prevUser = user
    
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
            dispatch({
                type: 'cellTypeWork.sheetOwnedByUser.set',
                value: (sheet.indexOf('/') < 0),
            })
            dispatch({ type: 'cellTypeWork.showEditables.show' })
            getWorksheetData(sheet)
        },
    }
}

const SheetList = connect(
    mapStateToProps, mapDispatchToProps
)(PickList)

export default SheetList
export { getSheetListData, USE_TEST_DATA }
