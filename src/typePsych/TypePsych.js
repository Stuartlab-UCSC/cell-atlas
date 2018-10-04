

// The trajectory similarity analysis, logic and state.

import { connect } from 'react-redux'
import TypePsychPres from 'typePsych/TypePsychPres'

const mapStateToProps = (state) => {
    const id = 'typePsych'
    const clusId = id + '.clusters'
    const geneId = id + '.geneMatrix'
    const metaId = id + '.metadata'
    return {
        clusters: {
            id: clusId,
            file: state[clusId + '.file'],
            list: state[clusId + '.list'],
            label: 'Cluster Reference *',
            url: state[clusId + '.url'],
            expand: [{
                id: clusId + 'expand',
                value: state[clusId + '.expand'],
                summary: 'Format',
            }],
        },
        geneMatrix: {
            id: geneId,
            file: state[geneId + '.file'],
            list: state[geneId + '.list'],
            label: 'Gene Matrix *',
            url: state[geneId + '.url'],
            expand: [{
                id: geneId + '.expand',
                value: state[geneId + '.expand'],
                summary: 'Format',
            }],
        },
        metadata: {
            id: metaId,
            file: state[metaId + '.file'],
            list: state[metaId + '.list'],
            label: 'Metadata *',
            url: state[metaId + '.url'],
            expand: [{
                id: metaId + '.expand',
                value: state[metaId + '.expand'],
                summary: 'Format',
            }],
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
