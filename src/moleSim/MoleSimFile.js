
// The similarity map analysis file selection, logic and state.

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
            id: 'moleSimFeatureFile',
            list: featureList,
            listValue: 'oneFeatureFile.tsv',
            show: state['moleSim.featureShow'],
            urlValue: 'http://someFeature.com',
        },
        metadata: {
            id: 'moleSimMetadataFile',
            list: metadataList,
            listValue: 'yetAnotherMetadataFile.tsv',
            show: state['moleSim.metadataShow'],
            urlValue: 'http://someMetadata.com',
        },
        zeroReplace: state['moleSim.zeroReplace'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSummaryClick: ev => {
            const id = ev.target.closest('.summary').dataset.id
            dispatch({
                type: (id === 'moleSimMetadataFile') ?
                    'moleSim.metadataShow.toggle' :
                    'moleSim.featureShow.toggle'
            })
        },
        onZeroReplaceChange: (ev) => {
            dispatch ({ type: 'moleSim.zeroReplace.toggle' })
        },
        onChange: (ev, key) => {
            //console.log('onChange key:', key)
        },
        onUpload: (ev, key) => {
            //window)
        },
    }
}

const MoleSimFile = connect(
    mapStateToProps,
    mapDispatchToProps
)(MoleSimFilePres)

export default MoleSimFile

