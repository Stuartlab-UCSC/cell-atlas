
// The cluster worksheet sheet pick list logic.

import { connect } from 'react-redux'
import PickList from 'components/PickList'

const mapStateToProps = (state) => {
    return {
        id: 'cell_type_work_sheet',
        label: 'Worksheets',
        list: state.cellTypeWork.sheetList,
        selected: state.cellTypeWork.sheetSelected,
        //list: state.database.favoriteList,
        //selected: state.database.favoriteSelected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            const value = ev.target.value
            dispatch({
                type: 'cellTypeWork.sheetSelected.uiSelect',
                value,
            })
        },
    }
}

const SheetList = connect(
    mapStateToProps, mapDispatchToProps
)(PickList)

export default SheetList
