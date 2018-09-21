
// Molecular similarity map file selection: logic

import { connect } from 'react-redux'

import MoleSimFilePres from 'moleSim/MoleSimFilePres'

const featureList = {
    yours: [
        'oneFeatureFile.tsv',
        'anotherFeatureFile.tsv',
        'yetAnotherFeatureFile.tsv',
    ],
    public: [
        'exampleFeature.tab',
    ],
}
const metadataList = {
    yours: [
        'oneMetadataFile.tsv',
        'anotherMetadataFile.tsv',
        'yetAnotherMetadataFile.tsv',
    ],
    public: [
        'exampleMetadata.tab',
    ],
}

const mapStateToProps = (state) => {
    return {
        advanced: false, // TODO
        feature: {
            id: 'moleSimFeature',
            summaryText: 'Layout Features *',
            list: featureList,
            listValue: 'oneFeatureFile.tsv',
            show: state['moleSim.feature.expand'],
            urlValue: 'http://someFeature.com',
        },
        metadata: {
            id: 'moleSimMetadata',
            summaryText: 'Coloring Metadata *',
            list: metadataList,
            listValue: 'yetAnotherMetadataFile.tsv',
            show: state['moleSim.metadata.expand'],
            urlValue: 'http://someMetadata.com',
        },
        zero: state['moleSim.zero'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSummaryClick: ev => {
            const id = ev.target.closest('.summary').dataset.id
            //console.log('onSummaryClick')
            dispatch({
                type: (id === 'moleSimMetadata') ?
                    'moleSim.metadata.expand.toggle' :
                    'moleSim.feature.expand.toggle'
            })
        },
        onZeroChange: (ev) => {
            dispatch ({ type: 'moleSim.zero.toggle' })
        },
        onChange: (ev, key) => {
            //console.log('onChange')
        },
    }
}

const MoleSimFile = connect(
    mapStateToProps,
    mapDispatchToProps
)(MoleSimFilePres)

export default MoleSimFile

