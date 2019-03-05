
// The database favorite logic.

import { connect } from 'react-redux'
import FavoritePres from 'database/FavoritePres'

const mapStateToProps = (state) => {
    return {
        list: state['databaseFavorite.list'],
        selected: state['databaseFavorite.selected'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            const value = ev.target.value
            dispatch({
                type: 'database.query.favoriteSelected',
                value,
            })
            dispatch({
                type: 'database.query.rowCount.favoriteSelect',
                value: value.split('\n').length,
            })
            dispatch({
                type: 'databaseFavorite.selected.uiSelect',
                value,
            })
        },
    }
}

const Favorite = connect(
    mapStateToProps, mapDispatchToProps
)(FavoritePres)

export default Favorite
