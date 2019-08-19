
// The cell type worksheet gene variable pick list.

import { connect } from 'react-redux'
import PickList from 'components/PickList'
import { get as rxGet } from 'state/rx'
import fetchData, { receiveData } from 'fetch/data'
import worksheetDataStore from 'cellTypeWork/dataStore'
import { bubbleVariableChange } from 'cellTypeWork/transformToBubbles'
import { USE_TEST_DATA } from 'cellTypeWork/sheetList'

const DOMAIN = 'ctgVariable'

const testData =
`gene 1 2 3
gene1 .5 .3 .6`

const receiveDataFromServer = (data) => {
    const error = rxGet(DOMAIN + '.fetchMessage')
    if (error !== null) {
        alert(error)
    } else if (data) {
        // Transform data from server and save it.
        bubbleVariableChange(data, rxGet('ctgVariable.type'))
    }
}

const getData = (varName) => {
    // Load a new gene variable.
    const url =
        '/user/' + rxGet('auth.user').name +
        '/worksheet/' + rxGet('cellTypeWork.sheetSelected') +
        '/var_name/' + varName +
        '/genes/' + worksheetDataStore.getGenes().join()
    const options = { responseType: 'text', credentials: true }
    if (USE_TEST_DATA) {
        receiveData(DOMAIN, testData, receiveDataFromServer, options)
    } else {
        fetchData(DOMAIN, url, receiveDataFromServer, options)
    }
}

const mapStateToPropsColor = (state) => {
    return {
        id: 'ctgVariableColor',
        list: state.cellTypeGene.variableList,
        selected: worksheetDataStore.getColorBy(),
    }
}

const mapStateToPropsSize = (state) => {
    return {
        id: 'ctgVariableSize',
        list: state.cellTypeGene.variableList,
        selected: worksheetDataStore.getSizeBy(),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            const type = (ev.target.name === 'ctgVariableColor')
                ? 'color'
                : 'size'
            // Get the data from server.
            getData(ev.target.value)
            
            // Save the variable type to handle the server response.
            dispatch({ type: 'ctgVariable.type.' + type })
            
            // Save the selected variable to state.
            if (type === 'color') {
                worksheetDataStore.setColorBy(ev.target.value)
            } else {
                worksheetDataStore.setSizeBy(ev.target.value)
            }
        },
    }
}

const ColorSelect = connect(
    mapStateToPropsColor, mapDispatchToProps
)(PickList)

const SizeSelect = connect(
    mapStateToPropsSize, mapDispatchToProps
)(PickList)

export { ColorSelect, SizeSelect }
