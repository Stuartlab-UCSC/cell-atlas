
// Show the upload file formats available and their details, logic and state.

import { connect } from 'react-redux'

import UploadFormatPres from 'upload/UploadFormatPres'

const mapStateToProps = (state) => {
    return {
        expand: {
            'upload.format.expand': state['upload.format.expand'],
            'upload.featureMatrix.expand': state['upload.featureMatrix.expand'],
            'upload.fullSimilarity.expand': state['upload.fullSimilarity.expand'],
            'upload.sparseSimilarity.expand': state['upload.sparseSimilarity.expand'],
            'upload.xyPositions.expand': state['upload.xyPositions.expand'],
            'upload.metadata.expand': state['upload.metadata.expand'],
            'upload.trajectory.expand': state['upload.trajectory.expand'],
        },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMoreClick: ev => {
            console.log('onMoreClick: ID:', ev.target.closest('.moreParent').id)
        },
    }
}

const UploadFormat = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadFormatPres)

export default UploadFormat
