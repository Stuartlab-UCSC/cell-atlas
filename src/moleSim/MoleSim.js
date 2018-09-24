
// Molecular similarity map: logic

import { connect } from 'react-redux'
import MoleSimPres from 'moleSim/MoleSimPres'

const mapStateToProps = (state) => {
    const id = 'moleSim'
    const featId = id + '.feature'
    const metaId = id + '.metadata'
    return {
        id: id,
        feature: {
            id: featId,
            file: state[featId + '.file'],
            list: state[featId + '.list'],
            label: 'Feature *',
            url: state[featId + '.url'],
            zero: state[featId + '.zero'],
        },
        metadata: {
            id: metaId,
            file: state[metaId + '.file'],
            list: state[metaId + '.list'],
            label: 'Metadata',
            url: state[metaId + '.url'],
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

