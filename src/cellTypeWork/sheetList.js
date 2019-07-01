
// The cluster worksheet sheet pick list logic.

import { connect } from 'react-redux'
import PickList from 'components/PickList'
import { getPostWorksheetData } from 'cellTypeWork/worksheet'

const mapStateToProps = (state) => {
    return {
        id: 'cell_type_work_sheet',
        label: 'Worksheet',
        list: state.cellTypeWork.sheetList,
        placeholder: 'Select a worksheet',
        render: state.cellTypeWork.render,
        selected: state.cellTypeWork.sheetSelected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            const sheet = ev.target.value
            dispatch({
                type: 'cellTypeWork.sheetSelected.uiSelect',
                value: sheet,
            })
            dispatch({ type: 'cellTypeWork.showEditables.show' })
            getPostWorksheetData(sheet)
        },
    }
}

const SheetList = connect(
    mapStateToProps, mapDispatchToProps
)(PickList)

export default SheetList
