

// The trajectory similarity analysis, logic and state.

import { connect } from 'react-redux'
import TypePsychPres from 'typePsych/TypePsychPres'

const mapStateToProps = (state) => {
    const id = 'typePsych'
    const geneId = id + '.geneMatrix'
    return {
        geneMatrix: {
            id: geneId,
            file: state[geneId + '.file'],
            list: state[geneId + '.list'],
            label: 'Clustered Gene Matrix *',
            url: state[geneId + '.url'],
        },
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
