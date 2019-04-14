
// The database favorite logic.

import { connect } from 'react-redux'
import FavoritePres from 'database/FavoritePres'

const mapStateToProps = (state) => {
    return {
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
)(FavoritePres)

export default Favorite
