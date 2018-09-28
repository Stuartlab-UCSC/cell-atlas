
// Show the upload file formats available and their details, logic.

import { connect } from 'react-redux'

import Format from 'format/Format'

const mapStateToProps = (state) => {
    return {
        id: 'upload',
        expand: [
            { id: 'upload.format.expand',
                value: state['upload.format.expand']},
            { id: 'upload.featureMatrix.expand',
                value: state['upload.featureMatrix.expand']},
            { id: 'upload.fullSimilarity.expand',
                value: state['upload.fullSimilarity.expand']},
            { id: 'upload.sparseSimilarity.expand',
                value: state['upload.sparseSimilarity.expand']},
            { id: 'upload.xyPositions.expand',
                value: state['upload.xyPositions.expand']},
            { id: 'upload.metadata.expand',
                value: state['upload.metadata.expand']},
            { id: 'upload.trajectory.expand',
                value: state['upload.trajectory.expand']},
        ],
        xsTotal: 12,
    }
}

const UploadFormat = connect(
    mapStateToProps,
)(Format)

export default UploadFormat
