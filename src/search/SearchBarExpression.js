// Search bar expression:
// logic and presentational component for the expression searchbar.

import React from "react";
import { connect } from 'react-redux'
import SearchReactSelect from 'search/SearchReactSelect'
import theme from 'app/theme'

const SearchBarExpressionPres = ({ list, value, onSelect, theme }) => {
    return (
        <SearchReactSelect
            placeholder='gene or gene module'
            value={value}
            list={list}
            classes={{}}
            theme={theme}
            onChange={onSelect}
            style={{display: 'inline-block'}}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        list: state['searchExpression.list'],
        value: state['searchExpression.value'],
        theme,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelect: (action, value) => {
            dispatch({
                type: 'searchExpression.value.uiSet',
                value: value.value
            })
        },
    }
}

const SearchBarExpression = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBarExpressionPres)

export default SearchBarExpression
