// Logic component of the Main menu of the cell type worksheet page.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import { cleanName } from 'app/util'
import { postWorksheetData } from 'cellTypeWork/worksheet'
import sheetRemove from 'cellTypeSheet/sheetRemove'
import CtwMenuPres from 'cellTypeWork/ctwMenuPres'

const onSaveAsSubmit = (name, dispatch) => {
    // Is the name empty?
    const cleanedName = cleanName(name)
    if (name === undefined || name === '') {
        nameIt(dispatch, name, true, 'A name is required to save.')
        
    // Did the user confirm to overwrite an existing worksheet?
    } else if (name === rxGet('cellTypeSheet.saveAs')) {
        postWorksheetData(name)
        
    // Does the name have any dirty characters it it?
    } else if (name !== cleanedName) {
        // Save this name for later.
        alert(
            'Invalid characters were replaced and the worksheet was saved as: '
            + cleanedName)
        dispatch({
            type: 'cellTypeSheet.saveAs.cleanedNameSet',
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
            type: 'cellTypeSheet.saveAs.uiSet',
            value: name
        })
        // Check for the worksheet already existing.
        const found = rxGet('cellTypeSheet.list').find(sheet => {
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
        sheetOwnedByUser: state.cellTypeSheet.ownedByUser,
        sheetSelected: state.cellTypeSheet.selected,
    }
}

const close = (dispatch) => {
    dispatch({ type: 'cellTypeWork.menu.hide' })
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBackdropClick: ev => {
            close(dispatch)
        },
        onMenuClose: ev => {
            close(dispatch)
        },
        onRemoveClick: ev => {
            sheetRemove(dispatch)
        },
        onSaveAsClick: ev => {
            // Name the worksheet.
            close(dispatch)
            nameIt(dispatch)
        },
        onSaveClick: ev => {
            close(dispatch)
            postWorksheetData(rxGet('cellTypeSheet.selected'))
        },
        onUploadClick: ev => {
            close(dispatch)
        },
        onUploadInfoClick: ev => {
            close(dispatch)
        },
    }
}
const CtwMenu = connect(
    mapStateToProps, mapDispatchToProps
)(CtwMenuPres)

export default CtwMenu
