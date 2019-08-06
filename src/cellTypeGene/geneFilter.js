
// Cell type worksheet gene filter.

import React from 'react';
import TextField from '@material-ui/core/TextField'
import { get as rxGet, set as rxSet } from 'state/rx'

const filterOn = (filterText) => {
    // This works with the filter as text or as an array.
    return (filterText !== undefined
        && filterText.length > 0
        && filterText[0] !== '')
        ? 'Filtering'
        : false
}

const filterOut = (gene, filterArray) => {
    // This determines whether a gene is filtered out.
    // So returns true when the name doesn't pass the filter.
    // @param gene: a gene name
    // @param filterArray: gene filter as an array of genes
    
    // If the filter has at least one element, return false.
    if (!filterOn(filterArray)) {
        return false
    }
    
    // Return false when the gene is in the filter list.
    const index = filterArray.findIndex(listGene => {
        return listGene.toUpperCase() === gene.toUpperCase()
    })
    return index === -1
}

const parse = (filterText) => {
    // Parse the new value of the text field into any array of gene names.
    // TODO allow free-form text.
    // @param filterText: the new value of the text field
    
    // Update the text field value in state.
    console.log('parse: filterText:', filterText)
    rxSet('cellTypeGene.filterText.uiSet', { value: filterText })
    // Return as an array.
    return filterText.split('\n')
}

const Display = (filterArray, onDTchange, index, column) => {
    // Render the gene filter area.
    // @param filterArray: filter list for each column as an array of arrays
    // @param onDTchange: the mui-datatables function to call after we've
    //                    rebuilt the gene filter list
    // @param index: the column index of the gene column
    // @param column: column metadata
    
    // On each change of the text field...
    const onChange = (ev) => {
        const newArray = parse(ev.target.value)
        onDTchange(newArray, index, column);
    }
    
    // 'Genes within free-form text'
    return (
        <div>
            <TextField
                label='One gene per line'
                multiline
                rows={4}
                value={rxGet('cellTypeGene.filterText')}
                margin='dense'
                autoFocus={true}
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
        customFilterListRender: v => { return filterOn(v) },
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
export { filterOn }
