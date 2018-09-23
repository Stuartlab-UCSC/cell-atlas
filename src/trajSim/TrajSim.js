
// Trajectory similarity analysis page: logic

import { connect } from 'react-redux'
import TrajSimPres from 'trajSim/TrajSimPres'

const mapStateToProps = (state) => {
    const id = 'trajSim'
    const cellId = id + '.cellXbranch'
    const geneId = id + '.geneMatrixTransposed'
    const featId = id + '.featureMatrix'
    return {
        id: id,
        algorithm: state[id + '.algorithm'],
        description: state[id + '.description'],
        name: state[id + 'name'],
        species: state[id + '.species'],
        tissue: state[id + '.tissue'],
        cellXbranch: {
            id: cellId,
            file: state[cellId + '.file'],
            list: state[cellId + '.list'],
            label: 'Cell by Branch Matrix *',
            url: state[cellId + '.url'],
        },
        geneMatrixTransposed: {
            id: geneId,
            file: state[geneId + '.file'],
            list: state[geneId + '.list'],
            label: 'Gene Matrix Transposed *',
            url: state[geneId + '.url'],
        },
        featureMatrix: {
            id: featId,
            file: state[featId + '.file'],
            list: state[featId + '.list'],
            label: 'Gene Matrix *',
            url: state[featId + '.url'],
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

const TrajSim = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrajSimPres)

export default TrajSim
