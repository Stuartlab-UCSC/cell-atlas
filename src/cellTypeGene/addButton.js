
// The gene table component for the cell type worksheet.

import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { set as rxSet } from 'state/rx'
import { getDataForAllClusters } from 'cellTypeGene/addGene'

const onAddClick = (gene, tableMeta) => {
    // Save the gene selected.
    rxSet('cellTypeGene.geneSelected.uiSet', { value: gene })
    // Request the gene values for all clusters.
    getDataForAllClusters(gene)
}

const makeAddButtons = (columns, data) => {
    // Insert a new column for adding the gene to the worksheet
    // and set some column options
    
    // Don't show the gene in the columns selector.
    if (!columns[0].options) {
        columns[0].options = {}
    }
    columns[0].options.viewColumns = false
    
    // Add a duplicate of the gene to the beginning of each row that gets
    // converted to an add button.
    for (let i = 0; i < data.length; i++) {
        const gene = data[i][0]
        data[i].unshift(gene)
    }
    // Add the column info for the conversion to be performed on the value.
    columns.unshift(
        {
            name: "Add",
            options: {
                filter: false,
                searchable: false,
                sort: false,
                viewColumns: false,
                customBodyRender: (value, tableMeta, updateValue) => (
                    <IconButton
                        size='small'
                        color='primary'
                        style={{
                            marginTop: -10,
                            marginLeft: -15,
                        }}
                        onClick={event => onAddClick(value, tableMeta)}
                    >
                        <AddIcon />
                    </IconButton>
                )
            }
        }
    )
}

export default makeAddButtons
