

// The trajectory similarity analysis, logic and state.

import { connect } from 'react-redux'
import TypePsychPres from 'typePsych/TypePsychPres'

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

const TypePsych = connect(
    mapStateToProps,
    mapDispatchToProps
)(TypePsychPres)

export default TypePsych
