
// The cellType page table logic.

import { connect } from 'react-redux'

import { set as rxSet }  from 'state/rx'
import { tableTransform, columnOptions } from 'bubble/table'
import DataTable from 'components/DataTable'
import { data } from 'cellType/page'
import { bubbleOptionOverrideFx, bubbleThemeOverrides }
    from 'bubble/tableOverrides'
import sortBy from 'bubble/sortBy'

const onColumnSortChange = (column, direction) => {
    if (column !== 'color' && column !== 'size') {
        return
    }
    sortBy(data.cluster_similarities, column, direction)
    rxSet('cellType.sort.uiSet', { column, direction })
}

const optionOverrideFx = (options) => {
    options = bubbleOptionOverrideFx(options)
    options.onColumnSortChange = onColumnSortChange
    return options
}

const themeOverrides = () => {
    return bubbleThemeOverrides()
}

const mapStateToProps = (state) => {
    const transformed = tableTransform('cellType', data, state)
    const columns = columnOptions(
        'cellType', transformed.maxClusterCount, state)
    return {
        columns,
        data: transformed.data,
        optionOverrideFx,
        show: true, //state.cellType.showChart,
        themeOverrides: themeOverrides(),
        sort: state.cellType.sort,
    }
}

const Table = connect(
    mapStateToProps
)(DataTable)

export default Table
