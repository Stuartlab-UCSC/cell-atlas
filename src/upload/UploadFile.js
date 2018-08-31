
// Select files for upload, logic and state.

import { connect } from 'react-redux'
import UploadFilePres from 'upload/UploadFilePres'
import { get as rxGet } from 'app/rx'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (ev) => {
            
            // Save the file list in state after converting
            // it to an array of file objects.
            let fileListObj = ev.target.files
            let fileList = []
            for (let key in fileListObj) {
                if (!isNaN(key)) {
                    fileList.push(fileListObj[key])
                }
            }
            dispatch({
                type: 'upload.fileList.selected',
                fileList,
            })
            
            // Add each file to the table state.
            for (let fileEntry in fileList) {

                // Get an ID for this file and increment the ID in state.
                const id = rxGet('upload.idSeq')
                dispatch({ type: 'upload.idSeq.assign' })
                
                // Add this file to the table state.
                let file = fileList[fileEntry]
                dispatch({
                    type: 'upload.table.uploading',
                    id,
                    data: {
                        id,
                        name: file.name,
                        size: file.size,
                        status: 'Uploading',
                    }
                })
            }
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
