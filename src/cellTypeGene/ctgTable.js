
// The table component for the cell type worksheet gene table.

import { connect } from 'react-redux'
import React from 'react'
import DataTable from 'components/DataTable'
import sheetDataStore from 'cellTypeWork/dataStore'
import dataStore from 'cellTypeGene/ctgDataStore'
import { optionOverrideFx, themeOverrideFx } from 'cellTypeGene/tableOverrides'
import { getGeneForAllClusters } from 'cellTypeGene/addGene'
import { getGeneScatterPlot } from 'cellTypeScatter/scatter'

const Presentation = (props) => {
    // Rendering of the gene table.
    const { columns, data, header, fetchMessage, optionOverrideFx, show,
        themeOverrideFx } = props
    let table = (null)
    if (show) {
        table = (
            <DataTable
                show={show}
                header={header}
                data={data}
                columns={columns}
                message={fetchMessage}
                optionOverrideFx={optionOverrideFx}
                themeOverrideFx={themeOverrideFx}
            />
        )
    }
    const muiDataTablesMaxHeight = 599
    return (
        <div id='ctgTableScroller' style={{minHeight: muiDataTablesMaxHeight}}>
            {table}
        </div>
    )
}

const geneAlreadyThere = (gene) => {
    const isThere = sheetDataStore.getGenes().find(
        geneInWorksheet => {
            return gene === geneInWorksheet
        })
    const boolIsThere = (isThere !== undefined)
    if (boolIsThere) {
        alert(gene + ' is already in the worksheet.')
    }
    return boolIsThere
}

const onCellClick = (colData, cellMeta) => {
    // Handle a click on any cell.
    const { colIndex } = cellMeta
    
    // Handle a non-clickable cell.
    if (colIndex > 2) {
        return
    }

    // Handle scatterplot button click.
    if (colIndex === 0) {
        const gene = colData.props['data-gene']
        getGeneScatterPlot(gene)
        
    // Handle add button click.
    } else if (colIndex === 1) {
        // Don't add a gene that is already there.
        const gene = colData.props['data-gene']

        if (!geneAlreadyThere(gene)) {
            getGeneForAllClusters(gene)
        }
    
    // Handle gene name click.
    } else if (colIndex === 2) {
        const link =
            'https://www.genecards.org/cgi-bin/carddisp.pl?gene=' + colData
        window.open(link, '_blank')
    }
}

const mapStateToProps = (state) => {
    const table = dataStore.get()
    return {
        columns: table.columns,
        data: table.display,
        show: state.cellTypeGene.show,
        //fetchMessage: state.cellTypeGene.fetchMessage,
        render: state.cellTypeGene.render,
        optionOverrideFx,
        themeOverrideFx,
    }
}

const CtgTable = connect(
    mapStateToProps
)(Presentation)

export default CtgTable
export { geneAlreadyThere, onCellClick }
