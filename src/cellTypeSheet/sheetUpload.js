
import { connect } from 'react-redux'
import fetchData from 'fetch/data'
import { rxGet, rxSet } from 'state/rx'
import { getWorksheetData } from 'cellTypeWork/worksheet'
import UploadPres from 'cellTypeSheet/sheetUploadPres'

const DOMAIN = 'cellTypeSheetUpload'

const receiveFromServer = (data) => {
    const error = rxGet('cellTypeSheetUpload.fetchMessage')
    if (error) {
        rxSet('app.snackbar.open', { message: error, severity: 'error' })
    } else {
        // Get the worksheet from the server.
        getWorksheetData(rxGet('cellTypeSheetUpload.name'))
    }
}

const mapStateToProps = (state) => {
    return {
        method: state.cellTypeSheetUpload.method,
        dataset: state.cellTypeSheetUpload.dataset,
        description: state.cellTypeSheetUpload.description,
        group: state.cellTypeSheetUpload.group,
        name: state.cellTypeSheetUpload.name,
        open: state.cellTypeSheetUpload.open,
        buttonEnabled: state.cellTypeSheetUpload.button,
    }
}

const buildUrl = () => {
    let url = '/user/worksheet/' + rxGet('cellTypeSheetUpload.name')
    let prefix = '/?'
    const parms = ['group', 'method', 'dataset', 'description']
    parms.forEach(parm => {
        let val = rxGet('cellTypeSheetUpload.' + parm)
        if (val && val !== null) {
            val = val.trim()
            if (val.length > 0) {
                let name = parm
                if (parm === 'method') {
                    name = 'cluster_name'
                }
                url += prefix + name + '=' + val
                prefix = '&'
            }
        }
    })
    return url
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: ev => {
            // Close the dialog and the main menu.
            dispatch({ type: 'cellTypeSheetUpload.open.close' })
            dispatch({ type: 'cellTypeWork.menu.hide' })
        },
        onMethodChange: ev => {
            dispatch({
                type: 'cellTypeSheetUpload.method.uiSet',
                value: ev.target.value
            })
        },
        onDatasetChange: ev => {
            dispatch({
                type: 'cellTypeSheetUpload.dataset.uiSet',
                value: ev.target.value
            })
        },
        onDescriptionChange: ev => {
            dispatch({
                type: 'cellTypeSheetUpload.description.uiSet',
                value: ev.target.value
            })
        },
        onFileChange: ev => {
            // Upload the file.
            // Prepare for the fetch.
            const url = buildUrl()
            const files = ev.target.files
            let data = new FormData()
            data.append('documents', files[0])
            let options = {
                credentials: true,
                method: 'POST',
                uploadFile: data,
            }
            // Let the user know the upload has started.
            dispatch({
                type: 'app.snackbar.open',
                message: 'Uploading. On completion the new worksheet will ' +
                'load. To use the Cell Atlas in the mean time, open it in ' +
                'another tab.',
                severity: 'fromDirectRequest',
                actionLabel: 'New Tab',
                onActionClick: () => window.open(process.env.REACT_APP_VIEW_URL,
                    '_blank'),
            })
            // Clear the file name for the next upload and close the dialog.
            document.getElementById('celltypework-upload-input').value = null
            dispatch({ type: 'cellTypeSheetUpload.open.close' })
            
            // Actually start the upload.
            fetchData(DOMAIN, url, receiveFromServer, options)
        },
        onGroupChange: ev => {
            dispatch({
                type: 'cellTypeSheetUpload.group.uiSet',
                value: ev.target.value
            })
        },
        onInfoClick: ev => {
            dispatch({ type: 'cellTypeSheetUpload.helpOpen.now' })
        },
        onNameChange: ev => {
            const value = ev.target.value
            dispatch({
                type: 'cellTypeSheetUpload.name.uiSet',
                value: value
            })
            if (value.length) {
                dispatch({ type: 'cellTypeSheetUpload.button.enable' })
            } else {
                dispatch({ type: 'cellTypeSheetUpload.button.disable' })
            }
        },
    }
}

const Upload = connect(
    mapStateToProps, mapDispatchToProps
)(UploadPres)

export default Upload
