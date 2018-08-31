
// Upload a file with progress returned.

import { connect } from 'react-redux'
import { get as rxGet } from 'app/rx'
import UploadTransferPres from 'upload/UploadTransferPres'

const mapStateToProps = (state) => {
    return {
        fileList: state['upload.fileList'],
        /*
        userSpace: 'swat_soe.ucsc.edu',
        sourceFile: state[''],
        targetFile the base file name of the file to save
        */
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onProgress: ev => {
            //console.log('onProgress:ev.loaded,total:', ev.loaded, ev.total)
            //console.log('ev:', ev)
            // TODO what is the file identifier?
            /*
            if (ev.lengthComputable) {
                dispatch({
                    type: 'upload.progress',
                    loaded: ev.loaded,
                    total: ev.total,
                })
            }
            */
        },
        onLoad: ev => {
        
            // This is a successful upload.
            //console.log('onLoad:ev.loaded,total:', ev.loaded, ev.total)
            //console.log('ev:', ev)
            //const fileObj = rxGet('upload.fileList')[0]
            //console.log('fileObj:', fileObj)
            /*
            dispatch({
                type: 'upload.table.success',
                name: rx.get('upload.fileList')[0].name }
            }
            */
        },
        onLoadEnd: ev => {
            
            // Upload is complete, success or failure.
            // So start the next upload if there is one.
            
            /*
            dispatch({
                type: 'upload.fileList.pop',
            })
            */
        },
        onTimeout: ev => {
            console.log('onTimeout:ev.loaded,total:', ev.loaded, ev.total)
            console.log('ev:', ev)
        },
        onAbort: ev => {
            console.log('onAbort:ev.loaded,total:', ev.loaded, ev.total)
            console.log('ev:', ev)
        },
        onError: ev => {
            console.log('onAbort:ev.loaded,total:', ev.loaded, ev.total)
            console.log('ev:', ev)
            /*
            var error = normalizeErrorResponse(errorIn, url);
            error.error = 'Uploading ' + opts.sourceFile.name +
                ' failed with: ' + error.error;
            if (opts.error) {
                opts.error(error);
            }
            rx.set('uploading.done');
            */
        },
    }
}

const UploadTransfer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadTransferPres)

export default UploadTransfer
