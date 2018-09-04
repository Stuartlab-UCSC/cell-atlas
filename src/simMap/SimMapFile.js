
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
            list: featureList,
            listValue: 'oneFeatureFile.tsv',
            show: state['simMap.featureShow'],
            urlValue: 'http://someFeature.com',
        },
        metadata: {
            id: 'simMapMetadataFile',
            list: metadataList,
            listValue: 'yetAnotherMetadataFile.tsv',
            show: state['simMap.metadataShow'],
            urlValue: 'http://someMetadata.com',
        },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSummaryClick: ev => {
            const id = ev.target.closest('.summary').dataset.id
            dispatch({
                type: (id === 'simMapMetadataFile') ?
                    'simMap.metadataShow.toggle' :
                    'simMap.featureShow.toggle'
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

