
// The trajectory similarity file selection, logic and state.

import { connect } from 'react-redux'

import TrajSimFilePres from 'trajSim/TrajSimFilePres'

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
            id: 'trajSimFeatureFile',
            list: featureList,
            listValue: 'oneFeatureFile.tsv',
            show: state['trajSim.featureShow'],
            urlValue: 'http://someFeature.com',
        },
        metadata: {
            id: 'trajSimMetadataFile',
            list: metadataList,
            listValue: 'yetAnotherMetadataFile.tsv',
            show: state['trajSim.metadataShow'],
            urlValue: 'http://someMetadata.com',
        },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSummaryClick: ev => {
            const id = ev.target.closest('.summary').dataset.id
            dispatch({
                type: (id === 'trajSimMetadataFile') ?
                    'trajSim.metadataShow.toggle' :
                    'trajSim.featureShow.toggle'
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

const TrajSimFile = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrajSimFilePres)

export default TrajSimFile

