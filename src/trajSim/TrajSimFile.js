
// Trajectory similarity analysis file selection: logic

import { connect } from 'react-redux'
import TrajSimFilePres from 'trajSim/TrajSimFilePres'

const cellXbranchList = {
    yours: [
        'oneCellXbranchList.tsv',
        'anotherCellXbranch.tsv',
        'yetAnotherCellXbranch.tsv',
    ],
    public: [
        'exampleCellXbranch.tab',
    ],
}

const geneMatrixTransposedList = {
    yours: [
        'oneGeneMatrixTransposed.tsv',
        'anotherGeneMatrixTransposed.tsv',
        'yetAnotherGeneMatrixTransposed.tsv',
    ],
    public: [
        'exampleGeneMatrixTransposed.tab',
    ],
}

const featureMatrixList = {
    yours: [
        'oneFeatureMatrix.tsv',
        'anotherFeatureMatrix.tsv',
        'yetAnotherFeatureMatrix.tsv',
    ],
    public: [
        'exampleFeatureMatrix.tab',
    ],
}

const mapStateToProps = (state) => {
    return {
        cellXbranch: {
            id: 'trajSim.cellXbranch.expand',
            summaryText: 'Cell by Branch Matrix file *',
            list: cellXbranchList,
            listValue: 'oneCellXbranchFile.tsv',
            show: state['trajSim.cellXbranch.expand'],
            urlValue: 'http://someCellXbranch.com',
        },
        geneMatrixTransposed: {
            id: 'trajSim.geneMatrixTransposed.expand',
            summaryText: 'Gene Matrix Transposed file *',
            list: geneMatrixTransposedList,
            listValue: 'yetAnotherGeneMatrixTransposed.tsv',
            show: state['trajSim.geneMatrixTransposed.expand'],
            urlValue: 'http://someGeneMatrixTransposed.com',
        },
        featureMatrix: {
            id: 'trajSim.featureMatrix.expand',
            summaryText: 'Gene Matrix file *',
            list: featureMatrixList,
            listValue: 'yetAnotherFeatureMatrix.tsv',
            show: state['trajSim.featureMatrix.expand'],
            urlValue: 'http://someFeatureMatrix.com',
        },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSummaryClick: ev => {
            const id = ev.target.closest('.summary').dataset.id
            //console.log('onSummaryClick: id, ev:', id, ev)
            dispatch({ type: id + '.toggle' })
        },
        onChange: (ev, key) => {
            //console.log('onChange: ev:', ev)
        },
    }
}

const TrajSimFile = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrajSimFilePres)

export default TrajSimFile

