
import { connect } from 'react-redux'
import fetchData from 'fetch/data'
import { rxGet, rxSet } from 'state/rx'
import UploadPres from 'cellTypeSheet/uploadPres'

const DOMAIN = 'cellTypeSheetUpload'

const receiveFromServer = (data) => {
    console.log('receiveFromServer: data:', data)
    const error = rxGet('cellTypeSheetUpload.fetchMessage')
    console.log('error:', error)
    if (error) {
        rxSet('app.snackbar.open', { message: error, severity: 'error' })
    } else {
        rxSet('app.snackbar.open', { message: 'Uploaded' })
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps: state.cellTypeSheetUpload.open:',
        state.cellTypeSheetUpload.open)
    return {
        group: state.cellTypeSheetUpload.group,
        name: state.cellTypeSheetUpload.name,
        open: state.cellTypeSheetUpload.open,
        buttonEnabled: state.cellTypeSheetUpload.button,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onClose: ev => {
            // Close the dialog and the main menu.
            dispatch({ type: 'cellTypeSheetUpload.open.close' })
            dispatch({ type: 'cellTypeWork.menu.hide' })
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
            // Upload the file after giving the user a message.
            console.log('onFileChange')
            const files = ev.target.files
            console.log('files:', files)
            const url = '/user/worksheet/' + rxGet('cellTypeSheetUpload.name')
            let data = new FormData()
            // TODO check when there are no files, like the file was unselected?
            data.append('documents', files[0])

            let options = {
                credentials: true,
                method: 'POST',
                uploadFile: data,
            }
            // Let the user know the upload has started.
            dispatch({
                type: 'app.snackbar.open',
                message: 'When the file has finished uploading, this page ' +
                'will automatically load the new worksheet. In the mean ' +
                'time, if you want to continue using the Cell Atlas, open ' +
                'another instance in another tab.',
                severity: 'fromDirectRequest',
            })
            
            // Clear the file name for another upload and close the dialog.
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
            console.log('onUploadInfoClick')
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
