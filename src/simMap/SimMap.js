
// The similarity map analysis, logic and state.

import { connect } from 'react-redux'

import SimMapPres from 'simMap/SimMapPres'

const mapStateToProps = (state) => {
    return {
        advanced: false, // TODO
        user: state['user'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAnalyzeClick: ev => {
            console.log('more on dataset-id', ev.target.closest('.details').dataset.id)
        },
    }
}

const SimMap = connect(
    mapStateToProps,
    mapDispatchToProps
)(SimMapPres)

export default SimMap

