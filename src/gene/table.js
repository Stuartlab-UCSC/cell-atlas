
// The gene page table logic.

import { connect } from 'react-redux'

import { set as rxSet }  from 'state/rx'
import { tableTransform, columnOptions } from 'bubble/table'
import DataTable from 'components/DataTable'
import { data } from 'gene/page'
import { bubbleOptionOverrideFx, bubbleThemeOverrides }
    from 'bubble/tableOverrides'
import sortBy from 'bubble/sortBy'

const onColumnSortChange = (column, direction) => {
    if (column !== 'color' && column !== 'size') {
        return
    }
    sortBy(data.cluster_solutions, column, direction)
    rxSet('gene.sort.uiSet', { column, direction })
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
    const transformed = tableTransform('gene', data, state)
    const columns = columnOptions('gene', transformed.maxClusterCount, state)
    return {
        columns,
        data: transformed.data,
        optionOverrideFx,
        show: true, //state.gene.showChart,
        themeOverrides: themeOverrides(),
        sort: state.gene.sort,
    }
}

const Table = connect(
    mapStateToProps
)(DataTable)

export default Table
