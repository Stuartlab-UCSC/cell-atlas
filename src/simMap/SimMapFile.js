
// The similarity map analysis file selection, logic and state.

import { connect } from 'react-redux'

import SimMapFilePres from 'simMap/SimMapFilePres'

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
            id: 'simMapFeatureFile',
            label: 'Layout features *',
            listValue: 'oneFeatureFile.tsv',
            urlValue: 'http://someFeature.com',
            show: state['createMap.featureShow'],
            list: featureList,
        },
        metadata: {
            id: 'simMapMetadataFile',
            label: 'Coloring metadata',
            listValue: 'yetAnotherMetadataFile.tsv',
            urlValue: 'http://someMetadata.com',
            show: state['createMap.metadataShow'],
            list: metadataList,
        },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSummaryClick: ev => {
            const id = ev.target.closest('.summary').dataset.id
            dispatch({
                type: (id === 'simMapMetadataFile') ?
                    'createMap.metadataShow.toggle' :
                    'createMap.featureShow.toggle'
            })
        },
        onChange: (ev, key) => {
            //console.log('onChange key:', key)
        },
        onUpload: (ev, key) => {
            //window)
        },
    }
}

const SimMapFile = connect(
    mapStateToProps,
    mapDispatchToProps
)(SimMapFilePres)

export default SimMapFile

