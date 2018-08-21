

// The create map analysis section, logic and state.

import { connect } from 'react-redux'

import CreateMapPres from 'analyze/CreateMapPres'

const mapStateToProps = (state) => {
    return {
        advanced: false, // TODO
        user: state['user'],
        classes: {
            root: 'root',
            margin: 'margin',
            textField: 'textField',
            user: 'user',
        },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAnalyzeClick: ev => {
            console.log('more on dataset-id', ev.target.closest('.details').dataset.id)
        },
    }
}

// Connect the value props and eventHandler props
// to the presentational component.
const CreateMap = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateMapPres)

export default CreateMap

