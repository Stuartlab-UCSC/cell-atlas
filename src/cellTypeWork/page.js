// Cell type worksheet page logic.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import { cleanName } from 'app/util'
import Presentation from 'cellTypeWork/pagePres'
import { getPostWorksheetData } from 'cellTypeWork/worksheet'
import dataStore from 'cellTypeWork/dataStore'
import transformToServerStore from 'cellTypeWork/transformToServerStore'

const onSaveSubmit = (name, dispatch) => {
    // Add to, or move it to the top of the pick list on the page.
    dispatch({
        type: 'cellTypeWork.sheetList.new',
        value: name
    })
    // Save the worksheet on the server.
    getPostWorksheetData(null,
        { method: 'POST', payload: transformToServerStore() })
}

const onSaveAsSubmit = (name, dispatch) => {
    // Is the name empty?
    const cleanedName = cleanName(name)
    if (name === undefined || name === '') {
        nameIt(dispatch, name, true, 'A name is required to save.')

        
    // Did the user confirm to overwrite an existing worksheet?
    } else if (name === rxGet('cellTypeWork.sheetSaveAs')) {
        onSaveSubmit(name, dispatch)
        
    // Does the name have any dirty characters it it?
    } else if (name !== cleanedName) {
        onSaveSubmit(cleanedName, dispatch)
        /*
        // The name in the dialog it not changing to the clean name, so skip.
        nameIt(dispatch, cleanedName, true,
            'Unacceptable characters were replaced with "_"')
        */

    // The usual situation, this is not a confirmation.
    } else {
        // Check for the worksheet already existing.
        const found = rxGet('cellTypeWork.sheetList').find(sheet => {
            return (name === sheet.value)
        })
        if (found) {
            // Save this name for later.
            dispatch({
                type: 'cellTypeWork.sheetSaveAs.uiSet',
                value: name
            })
            // Ask the user to confirm overwrite of an existing worksheet.
            nameIt(dispatch, name, true,
                'A worksheet by that name already exists, overwrite it?')
           } else {
            // Overwrite the existing worksheet.
            onSaveSubmit(name, dispatch)
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
        geneOrClusters: state.cellTypeGene.geneOrClusters,
        bubbleTooltip: state.bubble.tooltip,
        clusterSolution: dataStore.getClusterSolution(),
        dataset: dataStore.getDataset(),
        showEditables: state.cellTypeWork.showEditables,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveAsClick: ev => {
            // Save the name in case it already exists, we'll confirm overwrite.
            dispatch({ type: 'cellTypeWork.sheetSaveAs.clear'  })
            nameIt(dispatch)
        },
        onSaveClick: ev => {
            onSaveSubmit(rxGet('cellTypeWork.sheetSelected'), dispatch)
        },
        onUploadClick: ev => {
        },
    }
}

const Page = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default Page
