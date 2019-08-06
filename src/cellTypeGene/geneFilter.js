
// Cell type worksheet gene filter.

import React from 'react';
import TextField from '@material-ui/core/TextField'
import { get as rxGet, set as rxSet } from 'state/rx'

const filterOut = (gene, filters) => {
    // This determines whether a gene name is filtered out.
    // So returns true when the name doesn't pass the filter.
    if (filters.length < 1 || filters[0] === '') {
        return false
    }
    let index = filters.findIndex(listGene => {
        return listGene.toUpperCase() === gene.toUpperCase()
    })
    return index === -1
}

const parse = (list, value) => {
    // TODO allow free-form text.
    
    // Update the text field value.
    rxSet('cellTypeGene.filterText.uiSet', { value })
    // Return as an array.
    return value.split('\n')
}

const Display = (filterList, onDTchange, index, column) => {
    // Render the gene filter area.
    // @param filterList: filterLists for each column as an array of arrays
    // @param onDTchange: the mui-datatables function to call after we've
    //                    rebuilt the gene filter list
    // @param index: the column index of the gene column
    // @param column: column metadata
    
    let prevList = filterList[index]
    
    // On each change of the text field...
    const onChange = (ev) => {
        const newList = parse(prevList, ev.target.value)
        onDTchange(newList, index, column);
    }
    
    let value = rxGet('cellTypeGene.filterText')
    
    // 'Genes within free-form text'
    return (
        <div>
            <TextField
                label='One gene per line'
                multiline
                rows={4}
                value={value}
                margin='dense'
                onChange={onChange}
            />
        </div>
    )
}

const geneFilter = (filterText) => {
    // Define the dataTable options for filtering the genes.
    const options = {
        filter: true,
        filterList: filterText,
        filterType: 'custom',
        customFilterListRender: v => 'Filter',
        filterOptions: {
            names: filterText,
            logic: filterOut,
            display: Display,
        },
        sort: false,
    }
    return options
}

export default geneFilter
