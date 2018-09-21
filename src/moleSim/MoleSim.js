
// Molecular similarity map: logic

import { connect } from 'react-redux'
import MoleSimPres from 'moleSim/MoleSimPres'

const mapStateToProps = (state) => {
    return {
        name: state['moleSim.name'],
        zero: state['moleSim.zero'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNameMouseOut: ev => {
            const id = ev.target.id
            if (id && ev.target.id === 'moleSimName') {
                dispatch({
                    type: 'moleSim.name.uiSet',
                    value: ev.target.value,
                })
            }
        },
        onZeroChange: ev => {
            const id = ev.target.id
            if (id && ev.target.id === 'moleSimZero') {
                dispatch({
                    type: 'moleSim.zero.uiSet',
                    value: ev.target.value,
                })
            }
        },
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

