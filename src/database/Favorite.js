
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
                type: 'database.query.favoriteSelect',
                value,
            })
            dispatch({
                type: 'database.query.rowCount.favoriteSelect',
                queryString: value,
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
