
// The similarity map analysis, logic and state.

import { connect } from 'react-redux'
import MoleSimPres from 'moleSim/MoleSimPres'

const mapStateToProps = (state) => {
    return {
        advanced: false, // TODO
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAnalyzeClick: ev => {
            console.log('analyze button was clicked')
        },
    }
}

const MoleSim = connect(
    mapStateToProps,
    mapDispatchToProps
)(MoleSimPres)

export default MoleSim

