
// The database favorite logic.

import { connect } from 'react-redux'
import PickList from 'components/PickList'

const mapStateToProps = (state) => {
    return {
        id: 'database_favorites',
        label: 'Favorites',
        list: state.database.favoriteList,
        selected: state.database.favoriteSelected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            const value = ev.target.value
            dispatch({
                type: 'database.query.favoriteSelect',
                value,
            })
            dispatch({
                type: 'database.queryRowCount.favoriteSelect',
                queryString: value,
            })
            dispatch({
                type: 'database.favoriteSelected.uiSelect',
                value,
            })
        },
    }
}

const Favorite = connect(
    mapStateToProps, mapDispatchToProps
)(PickList)

export default Favorite
