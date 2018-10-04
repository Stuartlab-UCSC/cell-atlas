
// Molecular similarity map: logic

import { connect } from 'react-redux'
import MoleSimPres from 'moleSim/MoleSimPres'

const mapStateToProps = (state) => {
    const id = 'moleSim'
    const featId = id + '.feature'
    const metaId = id + '.metadata'
    return {
        feature: {
            id: featId,
            file: state[featId + '.file'],
            list: state[featId + '.list'],
            label: 'Feature *',
            url: state[featId + '.url'],
            zero: state[featId + '.zero'],
            expand: [
                {
                    id: 'moleSim.format.expand',
                    value: state['moleSim.format.expand'],
                    summary: 'Formats',
                },
                {
                    id: 'moleSim.featureMatrix.expand',
                    value: state['moleSim.featureMatrix.expand']
                },
                {
                    id: 'moleSim.fullSimilarity.expand',
                    value: state['moleSim.fullSimilarity.expand']
                },
                {
                    id: 'moleSim.sparseSimilarity.expand',
                    value: state['moleSim.sparseSimilarity.expand']
                },
                {
                    id: 'moleSim.xyPositions.expand',
                    value: state['moleSim.xyPositions.expand']
                },
            ],
        },
        metadata: {
            id: metaId,
            file: state[metaId + '.file'],
            list: state[metaId + '.list'],
            label: 'Metadata',
            url: state[metaId + '.url'],
            expand: [{
                id: metaId + '.expand',
                value: state[metaId + '.expand'],
                summary: 'Format',
            }],
        },
        name: state['moleSim.name'],
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

