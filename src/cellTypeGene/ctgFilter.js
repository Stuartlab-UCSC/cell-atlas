
// Cell type worksheet gene filter.

import React from 'react';
import TextField from '@material-ui/core/TextField'
import { get as rxGet, set as rxSet } from 'state/rx'

const setGeneLinkProps = (cellValue, rowIndex, columnIndex) => {
    // Make the gene name look like a link.
    return { style: {
            textDecoration: 'underline',
            cursor: 'pointer',
            color: '#3f51b5',  // same as the icons in the table
        }}
}

const filterOn = (filter) => {
    // The function called by datatables when the gene filter box is opened.
    // This works with the filter as text or as an array. Datatables puts an
    // empty string in the first element of the array when the filter is not on.
    return (filter !== undefined
        && filter.length > 0
        && filter[0] !== '')
        ? 'filtering by gene'
        : false
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

const customFilterListRender = v => {
    return filterOn(v)
}

const ctgFilter = () => {
    // Define the dataTable column options for filtering the genes.
    const options = {
        // The rendering of the gene filter box.
        // customFilterListRender makes chip not display if there is no
        // filterList option.
        customFilterListRender: customFilterListRender,
        
        filter: true,  // enable filtering for this column
        
        // filterList causes chip to display when text.length, but the actual
        // text is not used anywhere visible.
        filterList: '',
        
        filterOptions: {
            //names: filterText,
            //logic: filterOut,
            display: Display,  // the rendering method of filter box
        },
        filterType: 'custom',
        setCellProps: setGeneLinkProps,
        sort: true,
        viewColumns: false,
    }

    return options
}

export default ctgFilter
