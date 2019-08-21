
// Cell type worksheet gene filter.

import React from 'react';
import TextField from '@material-ui/core/TextField'
import { get as rxGet, set as rxSet } from 'state/rx'

const filterOn = (filter) => {
    // The function called by datatables when the gene filter box is opened.
    // This works with the filter as text or as an array. Datatables puts an
    // empty string in the first element of the array when the filter is not on.
    return (filter !== undefined
        && filter.length > 0
        && filter[0] !== '')
        ? 'Filtering by gene'
        : false
}

/*
const filterOut = (gene, filterArray) => {
    // This doesn't seem to work with serverSide and custom filtering.
    // This determines whether a gene is filtered out.
    // So returns true when the name doesn't pass the filter.
    // @param gene: a gene name
    // @param filterArray: gene filter as an array of genes
    
    // If the filter is empty, every value passes the filter.
    if (!filterOn(filterArray)) {
        return false
    }
    
    // Return false when the gene is in the filter.
    return (filterArray[0].search(gene.toUpperCase()) === -1)
}
*/

const Display = (filterArray, onDTchange, index, column) => {
    // Render the gene filter area.
    // @param filterArray: filter list for each column as an array of arrays
    // @param onDTchange: the mui-datatables function to call after we've
    //                    rebuilt the gene filter list
    // @param index: the column index of the gene column
    // @param column: column metadata
    
    // On each change of the text field...
    const onChange = (ev) => {
        // Update the text field value in state.
        const value = ev.target.value
        rxSet('cellTypeGene.filterText.uiSet', { value })
        // Tell datatables there is a filter change
        onDTchange([value.toUpperCase()], index, column);
    }
    
    // 'Genes within free-form text'
    return (
        <div>
            <TextField
                label='Genes'
                multiline
                placeholder='free-form text'
                rows={4}
                value={rxGet('cellTypeGene.filterText')}
                margin='dense'
                autoFocus={true}
                onChange={onChange}
            />
        </div>
    )
}

const ctgFilter = (filterText) => {
    // Define the dataTable options for filtering the genes.
    const options = {
        filter: true,
        //filterList: filterText,
        filterType: 'custom',
        customFilterListRender: v => { return filterOn(v) },
        filterOptions: {
            //names: filterText,
            //logic: filterOut,
            display: Display,
        },
        sort: false,
    }
    return options
}

export default ctgFilter
export { filterOn }
