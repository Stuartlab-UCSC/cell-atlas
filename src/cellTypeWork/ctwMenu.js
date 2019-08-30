// Logic component of the Main menu of the cell type worksheet page.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import { cleanName } from 'app/util'
import { postWorksheetData } from 'cellTypeWork/worksheet'
import CtwMenuPres from 'cellTypeWork/ctwMenuPres'

const onSaveAsSubmit = (name, dispatch) => {
    // Is the name empty?
    const cleanedName = cleanName(name)
    if (name === undefined || name === '') {
        nameIt(dispatch, name, true, 'A name is required to save.')
        
    // Did the user confirm to overwrite an existing worksheet?
    } else if (name === rxGet('cellTypeWork.sheetSaveAs')) {
        postWorksheetData(name)
        
    // Does the name have any dirty characters it it?
    } else if (name !== cleanedName) {
        // Save this name for later.
        alert(
            'Invalid characters were replaced and the worksheet was saved as: '
            + cleanedName)
        dispatch({
            type: 'cellTypeWork.sheetSaveAs.cleanedNameSet',
            value: cleanedName
        })
        postWorksheetData(cleanedName)
        /*
        // The name in the dialog won't change to the clean name, so skip this.
        nameIt(dispatch, cleanedName, true,
            'Unacceptable characters were replaced with "_"')
        */

    // The usual situation, this is not a confirmation.
    } else {
        // Save this name for later.
        dispatch({
            type: 'cellTypeWork.sheetSaveAs.uiSet',
            value: name
        })
        // Check for the worksheet already existing.
        const found = rxGet('cellTypeWork.sheetList').find(sheet => {
            return (name === sheet.value)
        })
        if (found) {
            // Ask the user to confirm overwrite of an existing worksheet.
            nameIt(dispatch, name, true,
                'A worksheet by that name already exists, overwrite it?')
        } else {
            // Save the new worksheet.
            postWorksheetData(name)
        }
    }
}

const nameIt = (dispatch, name, error, helperText) => {
    dispatch({
        type: 'namerDialog.useNow',
        error,
        helperText,
        name,
        message: 'Save worksheet as:',
        onSubmit: onSaveAsSubmit,
    })
}

const mapStateToProps = (state) => {
    return {
        background: 'white',
        menuShow: state.cellTypeWork.menu,
        sheetOwnedByUser: state.cellTypeWork.sheetOwnedByUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBackdropClick: ev => {
            dispatch({ type: 'cellTypeWork.menu.hide' })
        },
        onMenuClose: ev => {
            dispatch({ type: 'cellTypeWork.menu.hide'})
        },
        onSaveAsClick: ev => {
            // Name the worksheet.
            dispatch({ type: 'cellTypeWork.menu.hide' })
            nameIt(dispatch)
        },
        onSaveClick: ev => {
            dispatch({ type: 'cellTypeWork.menu.hide' })
            postWorksheetData(rxGet('cellTypeWork.sheetSelected'))
        },
        onUploadClick: ev => {
            dispatch({ type: 'cellTypeWork.menu.hide' })
        },
        onUploadInfoClick: ev => {
            dispatch({ type: 'cellTypeWork.menu.hide' })
        },
    }
}
const CtwMenu = connect(
    mapStateToProps, mapDispatchToProps
)(CtwMenuPres)

export default CtwMenu
