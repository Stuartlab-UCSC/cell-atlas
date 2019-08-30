
// The cluster worksheet sheet pick list logic.

import { connect } from 'react-redux'
import PickList from 'components/PickList'
import { get as rxGet, set as rxSet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/data'
import { getWorksheetData } from 'cellTypeWork/worksheet'

const USE_TEST_DATA = false
const DOMAIN = 'cellTypeSheet'

const testData = [
    'public/publicDataset',
    'other/testDataOther',
    'admin@replace.me/pbmc',
]
let prevUser = null

const findSelected = (sheets) => {
    // Get the most recently used worksheet, or the first in the list.
    let selected = rxGet('cellTypeWork.sheetSelected')
    if (!selected) {
        if (sheets.length) {
            selected = sheets[0].name
        }
        rxSet('cellTypeWork.sheetSelected.firstSheet', { value: selected })
    }

    if (selected) {
        getWorksheetData(selected)
    }
}

const receiveDataFromServer = (data) => {
    // Transform data from server into that needed for the pick list.
    const error = rxGet(DOMAIN + '.fetchMessage')
    if (error !== null) {
        alert(error)
        return
    } else if (!data || data.length < 1) {
        alert('No worksheet names were received from the server.')
        return
    }
    const user = rxGet('auth.user').name
    
    // Bin the sheets into one of user, other, or public so they may be sorted
    // within each group, and rendered as groups.
    let names = {
        user: [],
        other: [],
        public: []
    }
    data.forEach(sheet => {
        const i = sheet.indexOf('/')
        if (i < 0) {
            // An old way to store worksheet names is without the slash.
            names.user.push(sheet.slice(i+1))
        } else {
            const userPart = sheet.slice(0, i)
            if (userPart === user) {
                // Strip the user name from those owned by the user.
                names.user.push(sheet.slice(i+1))
            } else if (userPart === 'public') {
                names.public.push(sheet)
            } else {
                names.other.push(sheet)
            }
        }
    })
    
    // Sort each list and transform into the form wanted by the widget.
    let sheets = []
    const lists = ['user', 'other', 'public']
    lists.forEach(list => {
        names[list].sort()
        console.log('list, names[list]:', list, names[list])
        sheets.push(...names[list].map(name => {
            return { value: name, name: name }
        }))
    })
    
    // Save to state
    rxSet('cellTypeWork.sheetList.load', { value: sheets })

    // Get the selected sheet.
    findSelected(sheets)
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
    // TODO there must be a better way to do this.
    // maybe setting something in auth.user?
    setTimeout(() => getSheetListData() )

    return {
        id: 'cell_type_work_sheet',
        label: 'Open a Worksheet',
        list: state.cellTypeWork.sheetList,
        selected: state.cellTypeWork.sheetSelected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            // Close the menu.
            dispatch({ type: 'cellTypeWork.menu.hide' })
            
            // Save the sheet selected.
            const sheet = ev.target.value
            dispatch({
                type: 'cellTypeWork.sheetSelected.uiSelect',
                value: sheet,
            })
            
            // Send the sheet name to state and let it decide if it
            // is owned by the current user.
            dispatch({
                type: 'cellTypeWork.sheetOwnedByUser.uiSelect',
                value: sheet
            })
            
            getWorksheetData(sheet)
        },
    }
}

const SheetList = connect(
    mapStateToProps, mapDispatchToProps
)(PickList)

export default SheetList
export { getSheetListData, USE_TEST_DATA }
