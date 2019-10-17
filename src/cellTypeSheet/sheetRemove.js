// Cell type worksheet: remove a worksheet.

import { rxGet, rxSet} from 'state/rx'
import fetchData from 'fetch/data'
import dataStore from 'cellTypeWork/dataStore'

const DOMAIN = 'cellTypeSheetRemove'

const receiveDeleteConfirmFromServer = () => {
    // Handle the DELETE results received from the server.
    const error = rxGet(DOMAIN + '.fetchMessage')
    
    if (error === null) {
        // Remove the sheet from the sheetRemove state.
        rxSet('cellTypeSheetRemove.name.removedFromServer')
    } else {
        // Restore the sheet name to the sheet list, but leave unselected.
        rxSet('cellTypeSheet.list.sheetRemoveUndo',
            { value: rxGet('cellTypeSheetRemove.name')})

        // Display a message about the error.
        rxSet('app.snackbar.open', {
            message: 'Worksheet was not removed due to error: ' + error,
            severity: 'error',
        })
        // Remove the sheet from the sheetRemove state.
        rxSet('cellTypeSheetRemove.name.serverError')
    }
}

const requestRemoveOnServer = (dispatch) => {
    // One way or another the confirmation dialog closed without an undo, so
    // this is a confirmation the remove really was intended.
    // Request removal of the worksheet on the server now.
    //receiveDeleteConfirmFromServer()
    const url =
        '/user/' + rxGet('auth.user').name +
        '/worksheet/' + rxGet('cellTypeSheetRemove.name')
    let options = { credentials: true, method: 'DELETE' }
    fetchData(DOMAIN, url, receiveDeleteConfirmFromServer, options)
}

const onUndoClick = () => {
    // The undo button was clicked on the confirmation dialog, so add the
    // sheet back to the worksheet list, but do not select anything.
    rxSet('cellTypeSheet.list.sheetRemoveUndo',
        { value: rxGet('cellTypeSheetRemove.name') })
    // Remove the sheet from the sheetRemove state.
    rxSet('cellTypeSheetRemove.name.undo')
    // Display a message confirming undop.
    rxSet('app.snackbar.open', { message:
        'The worksheet was not removed. Select it from the list to see it.'
    })
}

const sheetRemove = (dispatch) => {
    // Remove the worksheet from view, and show the 'undo' dialog, but do not
    // request removal on the server until the dialog closes without an 'undo'.
    
    // Save the selected sheet name.
    const selected = rxGet('cellTypeSheet.selected')
    dispatch({
        type: 'cellTypeSheetRemove.name.menuOptionClick',
        value: selected
    })

    // Cause the 'remove worksheet undo' message to render.
    dispatch({
        type: 'app.snackbar.open',
        message: selected + ' has been removed.',
        actionLabel: 'Undo',
        onActionClick: onUndoClick,
        onClose: requestRemoveOnServer,
    })

    // Hide this worksheet along with other charts and fetch messages.
    dispatch({ type: 'cellTypeScatter.showChart.sheetRemove' })
    dispatch({ type: 'cellTypeWork.fetchMessage.sheetRemove' })
    dispatch({ type: 'cellTypeGene.show.sheetRemove' })
    dispatch({ type: 'cellTypeScatter.fetchMessage.sheetRemove' })
    dispatch({ type: 'cellTypeWork.showChart.sheetRemove' })
    dispatch({ type: 'cellTypeGene.fetchMessage.sheetRemove' })
    
    // Remove the sheet from the sheet list.
    dispatch({
        type: 'cellTypeSheet.list.sheetRemove',
        value: selected
    })
    dispatch({ type: 'cellTypeSheet.selected.sheetRemove' })
    
    // Set the render data to defaults so no leftover info shows.
    dataStore.setDefaults()
}

export default sheetRemove
