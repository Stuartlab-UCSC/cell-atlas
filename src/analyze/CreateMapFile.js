


// The create map analysis section, logic and state.

import { connect } from 'react-redux'

import CreateMapFilePres from 'analyze/CreateMapFilePres'

const featureList = [
    'oneFeatureFile.tsv',
    'anotherFeatureFile.tsv',
    'yetAnotherFeatureFile.tsv',
]

const attrList = [
    'oneAttrFile.tsv',
    'anotherAttrFile.tsv',
    'yetAnotherAttrFile.tsv',
]

const mapStateToProps = (state) => {
    return {
        advanced: false, // TODO
        feature: {
            id: 'feature',
            label: 'Layout input *',
            listValue: 'oneFeatureFile.tsv',
            urlValue: 'http://someFeature.com',
            show: state['createMap.featureShow'],
            list: featureList,
        },
        attr: {
            id: 'attr',
            label: 'Color attributes',
            listValue: 'yetAnotherAttrFile.tsv',
            urlValue: 'http://someAttr.com',
            show: state['createMap.attrShow'],
            list: attrList,
        },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSummaryClick: ev => {
            const id = ev.target.closest('.summary').dataset.id
            dispatch({
                type: (id === 'attr') ?
                    'createMap.attrShow.toggle' : 'createMap.featureShow.toggle'
            })
        },
        onChange: (ev, key) => {
            //console.log('onChange key:', key)
        },
    }
}

// Connect the value props and eventHandler props
// to the presentational component.
const CreateMapFile = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateMapFilePres)

export default CreateMapFile

