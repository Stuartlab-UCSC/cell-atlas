
// The trajectory similarity analysis, logic and state.

import { connect } from 'react-redux'
import TrajSimPres from 'trajSim/TrajSimPres'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAnalyzeClick: ev => {
            console.log('analyze button was clicked')
        },
    }
}

const TrajSim = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrajSimPres)

export default TrajSim
