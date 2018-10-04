
// Trajectory similarity analysis page: logic

import { connect } from 'react-redux'
import TrajSimPres from 'trajSim/TrajSimPres'

const mapStateToProps = (state) => {
    const id = 'trajSim'
    const cellId = id + '.cellXbranch'
    const transId = id + '.geneMatrixTransposed'
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
            expand: [{
                id: cellId + '.expand',
                value: state[cellId + '.expand'],
                summary: 'Format',
            }],
        },
        geneMatrixTransposed: {
            id: transId,
            file: state[transId + '.file'],
            list: state[transId + '.list'],
            label: 'Gene Matrix Transposed *',
            url: state[transId + '.url'],
            expand: [{
                id: transId + '.expand',
                value: state[transId + '.expand'],
                summary: 'Format',
            }],
        },
        featureMatrix: {
            id: featId,
            file: state[featId + '.file'],
            list: state[featId + '.list'],
            label: 'Marker Gene Matrix *',
            url: state[featId + '.url'],
            expand: [{
                id: featId + '.expand',
                value: state[featId + '.expand'],
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

const TrajSim = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrajSimPres)

export default TrajSim
