// Search bar: logic and presentational component.

import React from "react";
import { connect } from 'react-redux'
import SearchReactSelect from 'search/SearchReactSelect'

const SearchBarPres = ({ list, value, onSelect }) => {
    return (
        <SearchReactSelect
            placeholder='gene, gene module or cell type'
            value={value}
            list={list}
            classes={{}}
            onChange={onSelect}
            style={{display: 'inline-block'}}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        list: state['search.list'],
        value: state['search.value'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (action, value) => {
            if (window.location.pathname === '/') {

                // We are searching from the home page, so set the home redirect
                // so the next render of home will redirect to the search page.
                dispatch({type: 'home.redirect.set'})
            }
            dispatch({
                type: 'search.value.uiSet',
                value: value.value
            })
        },
    }
}

const SearchBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBarPres)

export default SearchBar
