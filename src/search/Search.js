// Search page: logic

import { connect } from 'react-redux'
import SearchPres from 'search/SearchPres'

const mapStateToProps = (state) => {
    return {
        results: state['search.results'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (action, value) => {

            // Update the home search state and the search page search state.
            dispatch({
                type: 'search.value.uiSetHome',
                value: value.value
            })
        },
    }
}

const Search = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPres)

export default Search

