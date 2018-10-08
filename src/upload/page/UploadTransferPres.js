
// Upload a file with progress returned, the presentational component.

import PropTypes from 'prop-types'

const HUB_URL = 'http://localhost:5000'  // TODO
const UPLOAD_MAX_GIGABYTES = 4
const UPLOAD_MAX_BYTES = 1024 * 1024 * 1024 * UPLOAD_MAX_GIGABYTES
//const retryLimit = 3  // TODO

const UploadTransferPres = ({ fileList, onProgress, onLoad, onLoadEnd,
    onAbort, onTimeout, onError }) => {
    
    // Upload one file to the server.
    if (fileList.length < 1) {
        return null
    }
    
    // Only upload the first file in the list during this pass.
    const fileObj = fileList[0].fileObj

    // Check the upload size.
    // TODO should be on the server to catch all clients in one place.
    if (fileObj.size > UPLOAD_MAX_BYTES) {
        const msg = 'Upload failed because file is larger than the ' +
            UPLOAD_MAX_GIGABYTES + ' GB limit.';
        alert('UploadTransferPres.js:', msg)
        return null;
    }

    // Create the request with the proper mime type.
    let xhr = new XMLHttpRequest()
    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary')

    // Attach event listeners.
    xhr.upload.addEventListener("progress", onProgress, false)
    xhr.upload.addEventListener("load", onLoad, false)
    xhr.upload.addEventListener("loadend", onLoadEnd, false)
    xhr.upload.addEventListener("abort", onAbort, false)
    xhr.upload.addEventListener("timeout", onTimeout, false)
    xhr.upload.addEventListener("error", onError, false)

    // Build up the URL.
    const mapId = 'swat_soe.ucsc.edu/map/' // TODO
    const dataId = 'featureSpace/' + mapId + fileObj.name;
    const url = HUB_URL + '/upload/' + dataId;
    xhr.open("POST", url)

    // Use formData to send the file object to the server.
    let formData = new FormData();
    formData.append('file', fileObj);
    xhr.send(formData)
    
    return null
}

UploadTransferPres.propTypes = {
    fileList: PropTypes.array.isRequired,
    onProgress: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    onAbort: PropTypes.func,
    onTimeout: PropTypes.func,
    onError: PropTypes.func,
}

export default UploadTransferPres
