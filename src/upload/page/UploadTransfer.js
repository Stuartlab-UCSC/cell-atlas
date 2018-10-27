
// Upload a file with progress returned.

import { connect } from 'react-redux'
import { get as rxGet } from 'state/rx'
import UploadTransferPres from 'upload/page/UploadTransferPres'
import { isoToday } from 'app/util'

const mapStateToProps = (state) => {
    return {
        fileList: state['upload.fileList'],
        userSpace: 'swat_soe.ucsc.edu',
    }
}

const currentFileId = () => {
    return rxGet('upload.fileList')[0].id
}

const mapDispatchToProps = (dispatch) => {
    return {
        onProgress: ev => {
            if (ev.lengthComputable) {
                dispatch({
                    type: 'upload.progress.update',
                    loaded: ev.loaded,
                    total: ev.total,
                })
            }
        },
        onLoad: ev => {
    
            // A successful upload.
            dispatch({
                type: 'upload.table.success',
                id: currentFileId(),
                date: isoToday(),
            })
        },
        onLoadEnd: ev => {
            
            // Upload of file is complete, after success or failure.
            // Start the next upload.
            dispatch({
                type: 'upload.fileList.pop',
            })
        },
        onTimeout: ev => {
            dispatch({
                type: 'upload.table.timeout',
                id: currentFileId(),
            })
        },
        onAbort: ev => {
            console.log('onAbort:ev.loaded,total:', ev.loaded, ev.total)
        },
        onError: ev => {
            dispatch({
                type: 'upload.table.error',
                id: currentFileId(),
            })
        },
    }
}

const UploadTransfer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadTransferPres)

export default UploadTransfer
