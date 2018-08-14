
// Select files for upload, logic and state.

import { connect } from 'react-redux'

import UploadFilePres from 'upload/UploadFilePres'

const mapStateToProps = (state) => {
    return {
        classes: { button: 'button', input: 'input' },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            const files = ev.target.files
            dispatch({
                type: 'upload.file.selected',
                files: files,
            })
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
