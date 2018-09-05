
// The similarity map analysis, logic and state.

import { connect } from 'react-redux'

import SimMapPres from 'simMap/SimMapPres'

const mapStateToProps = (state) => {
    return {
        advanced: false, // TODO
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAnalyzeClick: ev => {
            console.log('Build Map button was clicked')
        },
    }
}

const SimMap = connect(
    mapStateToProps,
    mapDispatchToProps
)(SimMapPres)

export default SimMap

