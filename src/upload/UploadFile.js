
// Select files for upload, logic and state.

import { connect } from 'react-redux'
import UploadFilePres from 'upload/UploadFilePres'
import { get as rxGet } from 'app/rx'

const mapStateToProps = (state) => {
    return {
        email: state['user.email'],
    }
}
let savedFilesObjs = []

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (ev) => {
            
            // Add each file to the table while transforming the list into
            // a standard array of {id: uploadFileId, fileObj: fileObj }.
            let fileListObj = ev.target.files
            savedFilesObjs.push(fileListObj)
            console.log('fileListObj:', fileListObj)
            let fileList = []
            for (let key in fileListObj) {
                if (!isNaN(key)) {

                    // Get an ID for this file and increment the ID in state.
                    const id = rxGet('upload.idSeq')
                    dispatch({ type: 'upload.idSeq.assign' })
                    
                    // Add this id and fileObj to a normal array.
                    const fileObj = Object.assign(fileListObj[key])
                    fileList.push({ id, fileObj })
                    
                    // Add this file to the table state.
                    dispatch({
                        type: 'upload.table.uploading',
                        data: {
                            id: parseInt(id, 10),
                            name: fileObj.name,
                            size: fileObj.size,
                        }
                    })
                }
            }
            
            // Reset the progress indicator.
            dispatch({ type: 'upload.progress.reset'})
            
            // Save the fileList to state.
            dispatch({
                type: 'upload.fileList.selected',
                fileList,
            })
            
            // Reset the files value on the element.
            try {
                ev.target.value = ''; //for IE11, latest Chrome/Firefox/Opera...
            } catch(err) { }
            console.log('savedFilesObjs:', savedFilesObjs)

        },
    }
}

// Connect the value props and eventHandler props
// to the presentational component.
const UploadFile = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadFilePres)

export default UploadFile
