
// The table component for the cell type worksheet gene table.

import { connect } from 'react-redux'
import React from 'react'
import DataTable from 'components/DataTable'
import sheetDataStore from 'cellTypeWork/dataStore'
import dataStore from 'cellTypeGene/ctgDataStore'
import { optionOverrideFx, themeOverrideFx } from 'cellTypeGene/tableOverrides'
import { getDataForAllClusters } from 'cellTypeGene/addGene'
import { getGeneScatterPlot } from 'cellTypeScatter/scatter'

const Presentation = (props) => {
    // Rendering of the gene table.
    const { columns, data, header, fetchMessage, optionOverrideFx, themeOverrideFx }
        = props
    return (
        <div>
            <DataTable
                header={header}
                data={data}
                columns={columns}
                message={fetchMessage}
                optionOverrideFx={optionOverrideFx}
                themeOverrideFx={themeOverrideFx}
            />
        </div>
    )
}

const onCellClick = (colData, cellMeta) => {
    const { colIndex } = cellMeta
    const gene = colData.props['data-gene']
    if (colIndex === 0) {
        // Scatterplot button clicked.
        getGeneScatterPlot(gene)
    } else if (colIndex === 1) {
        // Add gene button clicked.
        // Don't add a gene that is already there.
        const geneAlreadyThere = sheetDataStore.getGenes().find(
            geneInWorksheet => {
                return gene === geneInWorksheet
            }
        )
        if (geneAlreadyThere) {
            alert(gene + ' is already in the worksheet.')
        } else {
            getDataForAllClusters(gene)
        }
    }
}

const mapStateToProps = (state) => {
    const table = dataStore.get()
    const cluster = state.cellTypeGene.cluster
    return {
        cluster,
        columns: table.columns,
        data: table.data,
        fetchMessage: state.cellTypeGene.fetchMessage,
        optionOverrideFx,
        themeOverrideFx,
    }
}

const CtgTable = connect(
    mapStateToProps
)(Presentation)

export default CtgTable
export { onCellClick }
