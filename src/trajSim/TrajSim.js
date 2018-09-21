
// Trajectory similarity analysis page: logic

import { connect } from 'react-redux'
import TrajSimPres from 'trajSim/TrajSimPres'

const mapStateToProps = (state) => {
    return {
        algorithm: state['trajSim.algorithm'],
        description: state['trajSim.description'],
        name: state['trajSim.name'],
        species: state['trajSim.species'],
        tissue: state['trajSim.tissue'],
    }
}

const mouseOutIds = ['algorithm', 'description', 'name', 'species', 'tissue']

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseOut: ev => {
            const id = ev.target.id
            if (id) {
                const which = id.substring(id.indexOf('.') + 1)
                if (mouseOutIds.indexOf(which) > -1) {
                    dispatch({
                        type: id + '.uiSet',
                        value: ev.target.value,
                    })
                }
            }
        },
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
